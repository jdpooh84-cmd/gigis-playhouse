#!/usr/bin/env python3
"""Regenerate EP01 dialogue VO with the creator's locked ElevenLabs voices.

Reads the locked voice map + the EP01 line ledger, and for every spoken line
calls the ElevenLabs TTS API directly (the creator's private-account voices are
not reachable via Higgsfield). Saves one mp3 per clip to _staging/vo_el/ and
writes a manifest with ffprobed durations.

Auth: ELEVENLABS_API_KEY must be present in the environment (set as an env
secret — never pasted in chat / never printed here).
Usage:
  python3 scripts/generate_elevenlabs_vo.py            # all spoken lines
  python3 scripts/generate_elevenlabs_vo.py EP01-NP-C01   # single line (key test)
"""
import json, os, subprocess, sys

EP = "sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing"
OS_ = "sunny-and-the-crew/production-os"
OUT = os.environ.get("VO_OUT", "_staging/vo_el")   # override for pilots
MODEL = "eleven_multilingual_v2"          # handles Leo's Spanish; warm kid delivery
FMT = "mp3_44100_128"

vmap = json.load(open(f"{OS_}/voice_map_elevenlabs.json"))["voice_map"]
CREW_VOICE = vmap["Sunny"]                # in-world kid leads the group lines (no narrator)
# Phonetic respell for TTS ONLY (script + captions keep the clean hyphenated names).
# The name-clap lines are syllabic caps that TTS otherwise spells out letter-by-letter.
NAMEFIX = {"SUN-NY": "SUH-nee", "MI-MI": "MEE-mee", "MI-A": "MEE-ah",
           "LE-O": "LEE-oh", "PI-PA": "PEE-pah", "KO-DA": "Koh-duh"}

led = json.load(open(os.environ.get("VO_LEDGER", f"{EP}/ep01_vo_ledger.json")))
_rows = led.get("lines", []) + led.get("added_lines", [])
rows = [r for r in _rows if (r.get("render_text") or "").strip()]

def voice_for(speaker):
    if speaker == "Crew":
        return CREW_VOICE
    return vmap.get(speaker)

def tts_text(speaker, text):
    # phonetic respell for every syllable-clap name so TTS says the name, not letters
    for k, v in NAMEFIX.items():
        text = text.replace(k, v)
    if speaker == "Koda":
        text = text.replace("Koda", "Koh-duh")     # any natural mention of his name
    return text

key = next((os.environ[n] for n in
            ("ELEVENLABS_API_KEY", "XI_API_KEY", "ELEVEN_API_KEY",
             "ELEVENLABS_KEY", "ELEVEN_LABS_API_KEY", "ELEVENLABS_APIKEY")
            if os.environ.get(n)), None)
if not key:
    sys.exit("no ElevenLabs API key in env (checked ELEVENLABS_API_KEY / XI_API_KEY / "
             "ELEVEN_API_KEY / ELEVENLABS_KEY / ELEVEN_LABS_API_KEY) — set it as an env secret, then re-run.")

os.makedirs(OUT, exist_ok=True)
only = sys.argv[1] if len(sys.argv) > 1 else None
manifest = []
missing_voice = []
for r in rows:
    cid = r["clip_id"]
    if only and cid != only:
        continue
    spk = r["speaker"]
    vid = voice_for(spk)
    if not vid:
        missing_voice.append((cid, spk)); continue
    text = tts_text(spk, r["render_text"])
    dst = f"{OUT}/{cid}.mp3"
    payload = json.dumps({
        "text": text,
        "model_id": MODEL,
        "voice_settings": {"stability": 0.45, "similarity_boost": 0.8, "style": 0.35, "use_speaker_boost": True},
    })
    # curl keeps the key in an env-referenced header; never echoed
    r2 = subprocess.run(
        ["curl", "-sS", "-w", "%{http_code}", "-o", dst,
         "-X", "POST", f"https://api.elevenlabs.io/v1/text-to-speech/{vid}?output_format={FMT}",
         "-H", "xi-api-key: " + key, "-H", "Content-Type: application/json",
         "-d", payload],
        capture_output=True, text=True)
    code = (r2.stdout or "")[-3:]
    sz = os.path.getsize(dst) if os.path.exists(dst) else 0
    if code != "200" or sz < 1000:
        body = open(dst).read()[:300] if sz and sz < 2000 else "(binary/empty)"
        sys.exit(f"TTS FAIL {cid} spk={spk} http={code} size={sz} :: {body}")
    try:  # ffprobe may be absent on lean runners; duration is re-probed at build time
        dur = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                              "-of", "default=nokey=1:noprint_wrappers=1", dst],
                             capture_output=True, text=True).stdout.strip()
    except FileNotFoundError:
        dur = ""
    manifest.append({"clip_id": cid, "speaker": spk, "voice_id": vid,
                     "file": dst, "dur": float(dur) if dur else None, "text": text})
    print(f"  {cid:16s} {spk:6s} {vid[:8]}.. {dur}s  {text[:40]!r}")

if missing_voice:
    print("NO VOICE MAPPED:", missing_voice)
if not only:
    json.dump({"model": MODEL, "clips": manifest}, open(f"{OUT}/manifest.json", "w"), indent=1, ensure_ascii=False)
    print(f"wrote {OUT}/manifest.json — {len(manifest)} lines")
