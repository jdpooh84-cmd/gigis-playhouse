# 27 — Internal AI Voiceover Plan (no manual ElevenLabs)
Status: LOCKED 2026-07-13 (creator directive: VO must be generated INSIDE the pipeline; creator will not hand-run ElevenLabs). Owner: Voice Director & Audio Wrangler. Replaces "creator records VO" with an automated step. Audio is the timing master.

## 0. ENGINE — Higgsfield, internal
- **TTS:** `generate_audio` with `model: seed_audio` (ByteDance Seed Audio 1.0). No ElevenLabs, no external tool, no creator clicks. (`text2speech_v2` variants incl. elevenlabs exist as fallbacks only; default is `seed_audio`.)
- **Per-character voices:** `create_voice` once per character → a locked **voice element** (voice_id). Reused across all 30+ episodes exactly like the visual element UUIDs. Registry lives in `characters.json` under each character as `voice_id` + `voice_type:"element"`.
- **Tuning knobs** (seed_audio, verified 2026-07-13): `speech_rate` is an INTEGER −50..100 (0 = natural default, positive = faster; NOT a multiplier). Preschool default **0**; use small positive (**+5…+8**) for energetic/song lines; never negative (that re-creates the slow feel). Also `pitch_rate` (−12..12), `loudness_rate` (−50..100), `sample_rate`, `format`. Sunny slightly brighter than Nana.

## 1. ONE-TIME SETUP (Voice Director, before EP-batch)
1. Build a locked voice element per speaking character (Sunny, Leo, Mia, Koda, Nana, Ava, Mayor Mary, Rena, Rico) via `create_voice`; log `voice_id` to `characters.json`. Creator approves the voice pilot ONCE (single 5-min approval), then it is permanent canon.
2. Record the approved `voice_id` set in `production_rules.json → voice_registry`.

## 2. PER-EPISODE VO GENERATION (Phase 3 — automated)
Input: `dialogue_map.json` (from §26). For each row:
1. `generate_audio(model:seed_audio, voice_id:<speaker element>, voice_type:"element", prompt:<text>, speech_rate:<tier>)`.
2. **ffprobe the real duration** of each line (never trust estimates — same discipline as song durations).
3. Insert `pause_after_s` as literal silence.
4. Concatenate per section into `vo_<SEC>.wav`; write **actual** per-line + per-section durations to the Voice & Audio Ledger.

## 3. AUDIO IS THE TIMING MASTER (drives the cut, not the reverse)
- The **VO+music timeline sets each clip's slot length**, not a guessed manifest number. After VO render, the Assembly Engineer rebuilds each clip's `dur` from: `dur = spoken_line_length + pause_after_s` (dialogue clips) or the beat grid (song clips). The section spec (`_staging/ep01_section_urls.json`) is regenerated from these real audio lengths before the CI build.
- Track layout unchanged (06 §9): **A1 music** (timing master, never nudged), A2 beds, **A3 VO**, A4 SFX. 3.0s pauses are silent on all tracks.
- Because slots are cut to spoken length, motion no longer stretches to fill dead time — this **removes a second slow-mo cause** (clips no longer padded).

## 4. LIP SYNC (Lip Sync Director, scoped)
- After VO lock, run Higgsfield **`dubbing`** on direct-address close-ups + ~6 song hero shots only (role #6 scope). Pilot one clip first; reject uncanny mouths; never spend on wides. (HeyGen/HyperFrames is an optional alternate lip-sync engine if authorized; Higgsfield dubbing is primary.)

## 5. FAILURE HANDLING (Troubleshooting Agent)
- seed_audio refusal / bad take → regenerate that line only; if a voice element is unavailable, fall back to `text2speech_v2` (seed_speech) with the same text, log it.
- Any line whose ffprobe length would break the 10–15 min band → Episode Architect trims the text, never the pause.

## 6. WHAT THE CREATOR DOES
Approve the 9 voices once (one pilot listen). Everything after — script→VO→timing→lip-sync — is automated inside the pipeline.
