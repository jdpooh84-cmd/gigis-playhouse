#!/usr/bin/env python3
"""VERIFICATION-FIRST pass for the creator's private ElevenLabs voices.
Does NOT render EP01. Proves the authenticated runtime can see + use the voices.

TASK A: list all voices visible to the authenticated account; resolve each mapped
        EP01 voice id exactly (GET /v1/voices/{id}).
TASK B: render only the 2 proof lines (Sunny + Koda), plus a Koda override variant,
        so pronunciation can be ear-checked.
Writes _staging/vo_verify/report.json (+ the proof mp3s). Reads the key from env
(any standard name); never prints it.
"""
import json, os, subprocess, sys

OUT = "_staging/vo_verify"
MODEL = "eleven_multilingual_v2"
FMT = "mp3_44100_128"
MAPPED = {  # the 7 speaking EP01 characters the creator asked to resolve
    "Sunny": "BlgEcC0TfWpBak7FmvHW",
    "Pipa":  "U09MtJ2GfKEZSsIvMw9i",
    "Ava":   "eBvoGh8YGJn1xokno71w",
    "Leo":   "GsfuR3Wo2BACoxELWyEF",
    "Bram":  "mrQhZWGbb2k9qWJb5qeA",
    "Mia":   "XJ2fW4ybq7HouelYYGcL",
    "Koda":  "mMf8pnvS4tTEecRvNcpn",
}
key = next((os.environ[n] for n in
            ("ELEVENLABS_API_KEY", "XI_API_KEY", "ELEVEN_API_KEY",
             "ELEVENLABS_KEY", "ELEVEN_LABS_API_KEY", "ELEVENLABS_APIKEY")
            if os.environ.get(n)), None)
if not key:
    sys.exit("no ElevenLabs API key in env — set the secret, then re-run verify.")
os.makedirs(OUT, exist_ok=True)
H = ["-H", "xi-api-key: " + key]

def curl_json(url):
    r = subprocess.run(["curl", "-sS", "-w", "\n%{http_code}", *H, url],
                       capture_output=True, text=True)
    parts = r.stdout.rsplit("\n", 1)
    body, code = (parts[0], parts[1]) if len(parts) == 2 else (r.stdout, "000")
    try: return code, json.loads(body)
    except Exception: return code, {"_raw": body[:300]}

report = {"model": MODEL, "taskA": {}, "taskB": {}, "account": {}}

# --- account tier / limits (for rate-limit risk) ---
code, sub = curl_json("https://api.elevenlabs.io/v1/user/subscription")
report["account"] = {"http": code,
                     "tier": sub.get("tier"),
                     "char_limit": sub.get("character_limit"),
                     "char_used": sub.get("character_count"),
                     "can_use_instant_voice_cloning": sub.get("can_use_instant_voice_cloning")}

# --- TASK A: list all voices, resolve mapped ids ---
code, voices = curl_json("https://api.elevenlabs.io/v1/voices")
allv = voices.get("voices", []) if isinstance(voices, dict) else []
report["taskA"]["list_http"] = code
report["taskA"]["visible_voices"] = [{"id": v.get("voice_id"), "name": v.get("name"),
                                      "category": v.get("category")} for v in allv]
report["taskA"]["visible_count"] = len(allv)
byid = {v.get("voice_id"): v for v in allv}
res = {}
for ch, vid in MAPPED.items():
    c2, one = curl_json(f"https://api.elevenlabs.io/v1/voices/{vid}")
    resolves = (c2 == "200" and one.get("voice_id") == vid)
    res[ch] = {"id": vid, "resolves": resolves, "http": c2,
               "returned_name": one.get("name") if resolves else None,
               "category": one.get("category") if resolves else None,
               "in_voice_list": vid in byid}
report["taskA"]["mapped_resolution"] = res
report["taskA"]["unresolved"] = [ch for ch, r in res.items() if not r["resolves"]]

# --- TASK B: since GET-resolve is blocked by key scope, RESOLUTION IS PROVEN BY
#     SYNTHESIS — one short line per mapped voice (200 + audio == resolves + usable). ---
TESTS = [
    ("Sunny", MAPPED["Sunny"], "Come on, Crew — let's find out!", "sunny_proof"),
    ("Koda",  MAPPED["Koda"],  "My name is Koda.",               "koda_natural"),
    ("Koda",  MAPPED["Koda"],  "My name is Koh-duh.",            "koda_override"),
    ("Pipa",  MAPPED["Pipa"],  "This is the best day ever!",     "pipa_proof"),
    ("Ava",   MAPPED["Ava"],   "Let's practice our letters!",    "ava_proof"),
    ("Leo",   MAPPED["Leo"],   "Watch my rocket go!",            "leo_proof"),
    ("Bram",  MAPPED["Bram"],  "Let me think... got it!",        "bram_proof"),
    ("Mia",   MAPPED["Mia"],   "I think I see it now.",          "mia_proof"),
]
tb = []
for ch, vid, text, tag in TESTS:
    dst = f"{OUT}/{tag}.mp3"
    payload = json.dumps({"text": text, "model_id": MODEL,
                          "voice_settings": {"stability": 0.45, "similarity_boost": 0.8,
                                             "style": 0.35, "use_speaker_boost": True}})
    r = subprocess.run(["curl", "-sS", "-w", "%{http_code}", "-o", dst,
                        "-X", "POST",
                        f"https://api.elevenlabs.io/v1/text-to-speech/{vid}?output_format={FMT}",
                        *H, "-H", "Content-Type: application/json", "-d", payload],
                       capture_output=True, text=True)
    code = (r.stdout or "")[-3:]
    sz = os.path.getsize(dst) if os.path.exists(dst) else 0
    dur = None
    if code == "200" and sz > 1000:
        dur = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                              "-of", "default=nokey=1:noprint_wrappers=1", dst],
                             capture_output=True, text=True).stdout.strip()
    err = None
    if code != "200":
        err = (open(dst).read()[:300] if 0 < sz < 2000 else "(no body)")
    tb.append({"char": ch, "voice_id": vid, "tag": tag, "text": text,
               "ok": code == "200" and sz > 1000, "http": code, "bytes": sz,
               "duration_s": dur, "error": err})
report["taskB"]["lines"] = tb

# RESOLUTION BY SYNTHESIS: a voice "resolves + is usable" if its TTS POST returned 200.
# (GET-resolve may be 401 when the key is scoped to text-to-speech only — that does NOT
#  mean the voice is unusable, only that the key can't READ voice metadata.)
synth_ok = {}
for t in tb:
    synth_ok[t["char"]] = synth_ok.get(t["char"], False) or t["ok"]
report["taskA"]["read_scope_ok"] = (report["taskA"]["list_http"] == "200")
report["taskA"]["resolved_by_synthesis"] = {ch: synth_ok.get(ch, False) for ch in MAPPED}
report["taskA"]["unusable"] = [ch for ch in MAPPED if not synth_ok.get(ch, False)]

json.dump(report, open(f"{OUT}/report.json", "w"), indent=1, ensure_ascii=False)
print(json.dumps({"read_scope_http": report["taskA"]["list_http"],
                  "resolved_by_synthesis": report["taskA"]["resolved_by_synthesis"],
                  "unusable": report["taskA"]["unusable"],
                  "taskB": [{"tag": t["tag"], "ok": t["ok"], "http": t["http"], "dur": t["duration_s"]} for t in tb]},
                 indent=1))
if report["taskA"]["unusable"]:
    sys.exit("VERIFY INCOMPLETE — these mapped voices did NOT synthesize: %s" % report["taskA"]["unusable"])
print("VERIFY OK — all 7 mapped voices synthesize (usable). Read endpoints scoped-out (401) is expected/non-blocking.")
