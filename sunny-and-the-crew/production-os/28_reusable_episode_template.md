# 28 — Sunny Episode Template (reusable, 30+ episodes, overnight-autonomous)
Status: LOCKED 2026-07-13. The single spec an episode is stamped from. Supersedes ad-hoc per-episode structure; extends 04_episode_template with motion (25), dialogue (26), and internal VO (27). Designed to run overnight with the creator only approving Phase-0 decisions.

## 1. FIXED STRUCTURE (5 delivered sections / 6 story parts)
| SEC | Part | Content | Default motion tier | Target |
|---|---|---|---|---|
| SEC-01 | P1 THEME | THEME-INTRO-MASTER (locked, never regenerated) | — | 0:44.78 |
| SEC-02 | P2 STORY SETUP | object-first discovery, warm mistake, concept reveal, call-and-response | **B** (dialogue) | 2:00–2:45 |
| SEC-03 | P3 practice/game + song lead-in | echo practice, word hunt, movement game, crew requests song | **A** (active) | 2:45–3:40 |
| SEC-04 | P4 SONG | Suno song, beat-mapped, movement cue every chorus | **A** | actual Suno len |
| SEC-05 | P5+P6 REFLECTION+OUTRO | recap moves, praise, take-home mission, catchphrase, sting | **B→C** | ~2:00 |
Total 10:00–15:00. SEC-02/03/05 are the stretch levers.

## 2. DIALOGUE BEATS
The 11-beat arc from 26 (setup→explore→warm mistake→lesson→CTA+3s pause→song transition | recap→praise→mission→catchphrase→sting). All lines say-what-you-see, ≤8 words. Source = `dialogue_map.json`.

## 3. MOTION BEATS
Per 25: real-time (1.0×) default; tier per clip in `motion_tier`; **`speedramp:"off"`** on every seedance call; "gentle/slow" banned as motion verbs on tier A/B; ≤1 justified SLOMO/episode; full-body mirrored framing on any imitable move; kling3_0 escalation for dance hero shots.

## 4. SONG INTEGRATION
Per 06 + 25 §6: song locked in Suno first, ffprobed, `song_sections.json` from the real waveform; cuts land on downbeats; action peaks hit the beat; movement cue every chorus; audio reuse OK on the movement reprise, clip reuse NEVER.

## 5. INTERNAL VO + TIMING
Per 27: `seed_audio` TTS from locked per-character voice elements; ffprobe every line; **audio timeline sets clip slot lengths**; A1 music timing master; scoped Higgsfield dubbing on close-ups. No ElevenLabs, no manual creator audio work.

## 6. REFLECTION BEAT
Recap re-does the episode's moves at real speed (not a slow montage); explicit viewer praise; take-home mission as a gift; locked catchphrase; Heart-Pop allowed; goodbye wave (tier C); logo sting.

## 7. QA REQUIREMENTS (Continuity Guardian + validator, blocking)
Per-clip gate, before its video is spent AND before section assembly:
- Canon/safety (existing): anatomy (one head, Mia 2 pigtails), Mimi smallest / Nana tallest, no Bella+Gabriel, Mayor Mary auburn, Rena left-cheek, no cars / brands / age-words / "Pixar", locked element IDs, no on-screen text.
- **NEW motion gate:** `motion_tier` set; `speedramp:"off"` present; no banned slow words on tier A/B without `slomo_justification`; ≤1 SLOMO/episode; movement clips full-body framed.
- **NEW say-what-you-see gate:** every dialogue line's `action_verb` matches its clip's `visual_action`.
- **NEW audio-timing gate:** section `dur`s regenerated from ffprobed VO/beat lengths, not estimates; section ffprobe within tolerance.

## 8. OVERNIGHT-AUTONOMOUS RUN ORDER (unblocked)
Phase 0 creator locks (structure, catchphrase, voices — one-time) → then autonomous: P1 design + `dialogue_map.json` → P2 prompt build (validator gate) → **P3 audio-first (seed_audio VO + Suno beds, ffprobe ledger)** → P4 generation (`speedramp:"off"`, tier-correct, 8 concurrent, 429 queue, nsfw rephrase) → P5 QA gates (motion + say-what-you-see + canon) → P6 scoped lip-sync → P7 CI section assembly (static-ffmpeg + veryfast, per hardened workflow) → P8 Make one-shot delivery + dedupe. Troubleshooting Agent always on. Human fallback: assemble SEC-01..05 in Premiere/Canva in number order.

## 9. STAMPING A NEW EPISODE
Copy `episode_template.json`; set lesson/topic, catchphrase, song; run Episode Architect to emit `dialogue_map.json` + manifest with `motion_tier`/`slomo_justification`/`action_verb` per clip; everything else inherits from 25–28 automatically.
