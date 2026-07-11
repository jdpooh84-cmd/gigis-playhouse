# EP01 "A Is Amazing" — Assembly Plan (10-15 min build)
Generated 2026-07-10 | Total runtime: 10:20.66 (620.66s) | 156 clips | 40 segments

> Companion files (this folder): `song_sections.json`, `lyrics.txt`,
> `cue_sheet_episode_01.json`, `clip_manifest_episode_01.json`, `new_assets_episode_01.md`
> Rules of record: `production_rules.json`, `show_bible.json` — simple cuts only, no clip loops,
> no silent black gaps, no random filler.

---

## 1. Timeline overview

| # | Block | Start | End | Dur | Audio on timeline | Clips |
|---|---|---|---|---|---|---|
| P1 | Theme song | 0:00.00 | 0:45.00 | 45.00s | `sunny-and-the-crew-THEME.mp3` (full, 0:44 + 1s sting hold) | T01-T19 (19, fixed cuts) |
| P2 | Cold open / story setup | 0:45.00 | 2:16.00 | 91.00s | Dialogue VO only (no bed) | EP01-P2-C01..C23 (23) |
| P3 | Song lead-in | 2:16.00 | 2:45.00 | 29.00s | Dialogue VO; star-burst SFX at 2:41 | EP01-P3-C01..C06 (6) |
| P4A | A Is Amazing — full song | 2:45.00 | 4:29.83 | 104.83s | `a-is-amazing.mp3` play 1 — starts EXACTLY at 2:45.00 | A01-A28 reused + 1 new (29) |
| P4B | Echo & Practice | 4:29.83 | 5:41.83 | 72.00s | NEW `a-practice-bed.mp3` + VO | EP01-P4-C30..C45 (16) |
| P4C | A-Word Hunt | 5:41.83 | 7:21.83 | 100.00s | NEW `a-word-hunt-bed.mp3` + VO | EP01-P4-C46..C67 (22) |
| P4D | Sing-along reprise | 7:21.83 | 9:06.66 | 104.83s | `a-is-amazing.mp3` play 2 — starts EXACTLY at 7:21.83 | EP01-P4-C68..C91 (24, all new) |
| P5 | Wrap-up | 9:06.66 | 10:12.66 | 66.00s | Dialogue VO (intimate, no bed) | EP01-P5-C01..C15 (15) |
| P6 | Closing sting | 10:12.66 | 10:20.66 | 8.00s | Outro-melody ukulele sting; hit on logo landing | EP01-P6-C01..C02 (2) |

## 2. Audio layout (audio-first — lay music before conforming picture)

1. **Track A1 (music):** THEME at 0:00.00; `a-is-amazing.mp3` at 2:45.00 and again at 7:21.83; ukulele sting at 10:12.66. The two song plays are the timing masters — never nudge them; conform picture to them.
2. **Track A2 (beds):** practice bed under 4:29.83-5:41.83; hunt bed under 5:41.83-7:21.83. Duck beds -12dB under VO.
3. **Track A3 (VO/dialogue):** per clip manifest `lyric_or_dialogue` lines. The four 3-second response holds (P2-B6, P4B x2 within SOUND/APPLE, P4B-AIRPLANE, P4C x3) must stay SILENT on all tracks — the pause is the pedagogy.
4. **Track A4 (SFX):** crunch SFX on P4A A04 "crunch" beat; star-burst whoosh at 2:41 and 2:45; ukulele hit at logo landing (~10:16.66).
5. Song boundaries inside each play come from `song_sections.json` (ACTUAL render: 104.83s; music ends at 102.86s of each play — the last ~1.9s of each play is the natural silence tail, covered by outro clips, no black frames).

## 3. Clip conform order

Concatenate clips in `clip_manifest_episode_01.json` order (clip IDs are already timeline-sorted; starts/ends are absolute episode timecodes). All transitions are **simple cuts** except:
- Star burst (white flash) into 2:45.00 (P3 -> P4A) — built into clip EP01-P3-C06.
- Warm fade to black over the final 1s inside EP01-P6-C02.
Reused A01-A28 are 5s masters — trim each to the manifest duration (trim tail, keep beat-sync head), e.g. A02 5.00s -> 3.60s.

## 4. Build sequence (Higgsfield `explainer_video`, per production pipeline)

Assemble in 8 blocks matching the table above (respects the per-block audio model of `explainer_video`; minItems=2 workaround: pair small blocks):
1. Generate the 109 remaining new clips (see `new_assets_episode_01.md`, regenerated 2026-07-11 with v2 locked elements; batch order in `production_package/batch_plan.md`) — images first (nano_banana_2, one per clip, CHARACTER LOCK header), then videos in timeline order.
2. Block-assemble: P1 = PREPEND `sunny-and-the-crew/theme-song/THEME-INTRO-MASTER.mp4` unmodified (DONE — never regenerate) | P2+P3(VO) | P4A = `EP01-song-section-SYNCED.mp4` (DONE, 104.83s) | P4B(bed) | P4C(bed) | P4D(song) | P5(VO) | P6(sting).
3. Final concat of the 8 block outputs in order — verify no black frames at seams.
4. QC pass (checklist below), then deliver via Make.com to Drive `FINALS — READY TO UPLOAD` as `EP01-A-Is-Amazing-FINAL.mp4` (Made for Kids on YouTube upload).

## 5. Export settings

- 1920x1080 (16:9), 30 fps, H.264 High profile, ~12 Mbps VBR, AAC 320kbps 48kHz stereo, MP4.
- Loudness: -14 LUFS integrated (YouTube), true peak <= -1.0 dBTP.

## 6. Self-check results (validated by generator script)

| Check | Result |
|---|---|
| Runtime 10-15 min (never under 10) | PASS — 10:20.66 |
| All 6 parts present, in order | PASS — P1..P6 |
| Every clip 3-5s (theme cuts exempt as locked fixed timing) | PASS — 137/137 non-theme clips in band |
| No timeline gaps or overlaps | PASS — continuous 0.00 -> 620.66 |
| No clip used twice (no-loop rule) | PASS — 28 reused job IDs all unique, 128 new all unique |
| Learning goal introduced / reinforced / recapped | PASS — intro P2-B5/B6; reinforced P4A song + P4B phonics/echo + P4C hunt + P4D movement reprise; recapped P5 with take-home challenge |
| Asset reuse before generation | PASS — all 28 existing song clips reused; theme prompts reused from theme bible; only genuinely new segments get new assets |
| Padding rules | PASS — all extension segments are structured participatory/educational beats (echo practice, hunt mini-game, movement reprise); zero random filler |
| Ends with Sunny wave goodbye | PASS — P5-GOODBYE + P6 sting |
| CHARACTER LOCK header on every new prompt | PASS — embedded in all 109 prompts; theme prompts carry their own in the theme bible |

**Known open dependencies (updated 2026-07-11 — not blockers to planning, blockers to generation):**
1. Two new Suno beds (specs in `new_assets_episode_01.md`) must be generated and locked into `music_library.json`.
2. ~~Theme clips~~ DONE — THEME-INTRO-MASTER.mp4 assembled and locked (repo + Drive 1fvGvI8ERWGlC5PD7_7TxqPeoXZFqmhEg).
3. ~~Element IDs pending~~ DONE — all 14 characters have LOCKED elements in characters.json (Koda/Mimi/Pipa/Bram v2 creator designs, 2026-07-10).
4. `song_sections.json` internal boundaries are best-effort signal analysis — ear-verify chorus/verse edges before final beat-sync polish (intro end 7.0s and verse2 end 55.5s are high-confidence anchors).
5. VO recording — 62 lines per `production_package/vo_script.md` (voice casting/generation is a creator decision; see production-os/22_voice_music_consistency.md).
6. Runtime decision: 10:20.66 targets the 10-min floor with margin while conserving generation credits (109 new clips remaining). A 15-min variant would need roughly 55-60 additional clips (e.g., a second hunt round + a slowed recap verse); flag if wanted.
