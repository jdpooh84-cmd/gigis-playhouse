# 14 — Assembly Plan

## Song: ZOOMY ZOOM FREEZE!
## Format: 16:9, ~2:33 runtime

---

## Assembly Method
This document describes the complete ordered scene-to-audio mapping for final video assembly. Assembly can be performed in any video editor (DaVinci Resolve, Premiere Pro, CapCut, etc.) using the assets logged in 13-asset-manifest.md.

---

## Ordered Timeline

| Order | Start | End | Visual Asset | Audio Layer 1 (Vocals) | Audio Layer 2 (Instrumental) | Notes |
|-------|-------|-----|-------------|------------------------|-------------------------------|-------|
| 1 | 0:00 | 0:15 | VID-01 (Intro, Meadow) | V01 Intro | Bed: intro groove | Characters bounce into frame |
| 2 | 0:15 | 0:27 | VID-02 (Hook zoom, Meadow) | V02 Hook | Bed: full hook groove | Zoom action |
| 3 | 0:27 | 0:39 | VID-04 (Verse 1a run, Meadow) | V03 Verse 1 (first 12s) | Bed: verse (drop brass) | Running arms |
| 4 | 0:39 | 0:51 | VID-05 (Verse 1b wiggle, Meadow) | V03 Verse 1 (last 12s) | Bed: verse continues | Full body wiggle |
| 5 | 0:51 | 1:03 | VID-06 (Hook 2, Meadow) | V02 Hook (reuse) | Bed: hook groove | Same hook, bigger energy |
| 6 | 1:03 | 1:18 | VID-07 (Verse 2a slow, Stage) | V04 Verse 2 (first 15s) | Bed: thin, sustain pad up | Slow-mo walk — scene change to Stage |
| 7 | 1:18 | 1:30 | VID-08 (Verse 2b spin/jump, Stage) | V04 Verse 2 (last 12s) | Bed: builds back with brass | Spin then jump |
| 8 | 1:30 | 1:42 | VID-09 (Hook 3, Stage) | V02 Hook (reuse) | Bed: hook groove | Third hook |
| 9 | 1:42 | 2:00 | VID-10 (Bridge, Stage) | V05 Bridge | Bed: drums only → build | 1-2-3-FREEZE twice |
| 10 | 2:00 | 2:15 | VID-11 (Final Hook, Stage) | V06 Final Hook | Bed: full band + extra perc | Biggest energy |
| 11 | 2:15 | 2:33 | VID-12 (Outro, Meadow) | V07 Outro | Bed: half-time, warm | Return to Meadow; final freeze |

---

## Scene Transition Notes

| Transition | Type | Timing |
|-----------|------|--------|
| VID-01 → VID-02 | Hard cut on beat 1 of Hook | 0:15 |
| VID-04 → VID-05 | Soft cut mid-verse | 0:39 |
| VID-06 → VID-07 | Wipe or hard cut, scene change | 1:03 |
| VID-10 → VID-11 | Hard cut on beat, energy peak | 2:00 |
| VID-11 → VID-12 | Soft dissolve, return to Meadow | 2:15 |

---

## Audio Mix Instructions (for post-production)

1. Import all 7 vocal MP3 files in order per timeline above
2. Set vocal track volume: -3dB (keep intelligible)
3. Import instrumental bed under vocals
4. Set instrumental volume: -9dB under vocals, -6dB in gaps between vocal phrases
5. On every "FREEZE!" word: apply a hard mute on the instrumental for exactly 0.5 beats, then resume
6. Normalize final mix to -14 LUFS for YouTube / -16 LUFS for general streaming
7. Export: 48kHz 16-bit stereo WAV or MP3 320kbps

---

## Video Export Settings

| Parameter | Value |
|-----------|-------|
| Resolution | 1920×1080 (upscale from 720p clips if needed) |
| Frame rate | 24fps |
| Codec | H.264 or H.265 |
| Aspect ratio | 16:9 |
| Color space | sRGB |
| Audio | AAC 192kbps stereo |

---

## Current Blockers

| # | Blocker | Severity | Impact |
|---|---------|----------|--------|
| 1 | Outro vocal (V07) not yet generated | Low | 1 audio section missing; easy to regenerate |
| 2 | 12 video scene clips not yet generated | High | Visuals are all pending; server cycling is the cause |
| 3 | Instrumental music bed cannot be auto-generated | Medium | All vocal assets ready; bed must be sourced externally |

### Blocker 3 — Precise Description
**The one exact missing capability:** Higgsfield's `generate_audio` tool is TTS (text-to-speech) only for non-game use. There is no standalone music generation tool in the current environment (Higgsfield, APIFY). An instrumental 110 BPM children's dance track cannot be AI-generated through available APIs without an external music generation service (e.g., Suno, Udio, AIVA, Mubert). This is the single tool capability gap preventing final audio mix from being autonomous.

**Everything else that can be completed:**
- ✅ APIFY research (done)
- ✅ All 14 project documentation files (done)
- ✅ 4 character/background reference images (done)
- ✅ 6/7 ElevenLabs vocal sections via Higgsfield (done, 1 pending regen)
- ⏳ 12 video scene clips (pending server stability — will generate next reconnect)
- ❌ Instrumental music bed (cannot be generated — external tool required)
- ❌ Final mixed audio + video assembly (blocked by above two)
