# EP01 "A Is Amazing" — Animation Batch Plan
How to generate the remaining 109 clips without hitting rate limits or continuity defects.
Prompts: new_assets_episode_01.md (regenerated 2026-07-11, v2 locked elements).

## Already done — DO NOT regenerate
- **Part 1**: THEME-INTRO-MASTER.mp4 (prepend as-is)
- **Part 4A**: EP01-song-section-SYNCED.mp4 (26 of 27 song clips reused; 104.83s)

## Pipeline per clip (two steps, always)
1. **Image** — `generate_image`, model nano_banana_2, CHARACTER LOCK HEADER prepended,
   element IDs inline as `<<<UUID>>>`. 16:9. No age words, no "Pixar", no cars.
2. **Video** — `generate_video`, model seedance_2_0, `start_image` = step-1 job,
   `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612` on EVERY call.
   Target duration per manifest (3–5s). ~8 concurrent max; a 429 means wait, not retry-storm.
   "nsfw" status = safety false positive → rephrase (remove "at her feet"/"secret"-type phrasing) and resubmit.

## Batch order (timeline order, per production_rules pipeline step 9)

| Batch | Segment | Clips | IDs | Location anchors | Notes |
|---|---|---|---|---|---|
| B1 | cold_open | 23 | EP01-P2-C01…C23 | STREET, NANA_PORCH, DIRECT_ADDRESS | Nana crouch pose C16–C17; Letter A badge from C18 |
| B2 | song_lead_in | 6 | EP01-P3-C01…C06 | STREET | Mimi smallest in frame; Koda v2 (boy, afro) |
| B3 | song intro gap | 1 | EP01-P4-C01 | DIRECT_ADDRESS | the one song clip not covered by the synced section |
| B4 | practice_echo | 16 | EP01-P4-C30…C45 | BACKYARD | calm energy; air-drawing clips C42–C43 need big whole-arm motion |
| B5 | mini_game_hunt | 22 | EP01-P4-C46…C67 | BACKYARD, STREET, NANA_PORCH | 3 reveal objects: ant, acorn, avocado — keep them BIG and readable |
| B6 | song_reprise | 24 | EP01-P4-R* | mixed, wider crew | ALL-NEW compositions — must not visually duplicate 4A clips |
| B7 | wrap_up | 15 | EP01-P5-C01…C15 | SUNNY_PORCH | golden light; eye-level camera |
| B8 | closing_sting | 2 | EP01-P6-C01…C02 | SUNNY_PORCH | logo space upper/center — leave headroom |

Run batches sequentially; inside a batch submit up to 8 videos at a time and use
send_later check-ins (~10 min) rather than polling. Log every job ID in
ep01_generation_tracker.json as you go — that file is the recovery point if a session dies.

## Audio to generate BEFORE assembly (Suno)
- a-practice-bed.mp3 — 72s target (ffprobe the real render; trim/pad in assembly)
- a-word-hunt-bed.mp3 — 100s target (same rule)
- VO per production_package/vo_script.md (62 lines, 9 baked 3.0s pauses)

## Continuity gates (check after EVERY batch — production-os/20_defect_prevention_checklist.md)
- Rena paint smudge LEFT cheek (if she appears) · Mayor Mary auburn hair · Mimi smallest ·
  Nana tallest · Koda is a boy · Bella and Gabriel never together · no cars · max 4 characters
- Any clip that fails a gate: regenerate before starting the next batch, then update the tracker.

## Assembly (after all batches green)
Per assembly_plan_episode_01.md: prepend THEME-INTRO-MASTER.mp4 → cold open (VO) →
lead-in (VO) → synced song section → practice (bed+VO) → hunt (bed+VO) → reprise (song audio, new clips) →
wrap-up (VO) → sting. Audio is the timing master; ffprobe every real file before cutting.
CI runner does download/ffmpeg work (container egress is blocked to Higgsfield CDN) via a
push-marker workflow, same pattern as theme-assemble.yml / ep01-sync-song.yml.
Deliver: repo master → Drive "FINALS — READY TO UPLOAD" via one-shot Make scenario
(clone scenario 5610723 pattern; activate → run → deactivate → check for double-fire duplicate → trash extra).
