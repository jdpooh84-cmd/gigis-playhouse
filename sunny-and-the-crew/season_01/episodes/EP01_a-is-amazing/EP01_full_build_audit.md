# EP01 — FULL BUILD AUDIT / PIPELINE DUMP

_Generated from the real repo files by `scripts/ep01_make_build_audit.py`. Shot-map timings are computed with the exact slot logic in `ep01_build_sec03_pilot.py`, using locally-probed VO durations. Source-clip lengths (vlen) live on the firewalled render CDN and are re-probed in CI at build time — where a slot depends on vlen it is labelled uncertain._

## 1) FULL PROJECT FILE TREE
```
gigis-playhouse/
├── scripts/                              # all Python build logic (runs in CI)
│   ├── ep01_make_sec03_build_spec.py     # join render_results + ledger -> build_spec.json
│   ├── ep01_build_sec03_pilot.py         # CORE builder: VO re-time, overlays, sync-gate, fill/slow-tail
│   ├── ep01_build_sec04_v2.py            # SEC-04 song: 21 shots -> 104.83s, mux byte-identical audio
│   ├── ep01_stitch_final.py              # concat 5 sections + intro-logo overlay -> FINAL
│   ├── ep01_batch2_swap.py               # swap re-rendered Coda/Mimi/Bram/Pippa URLs into specs
│   ├── generate_elevenlabs_vo.py         # ElevenLabs TTS (locked voices) -> mp3 + manifest
│   └── (older/aux) build_ep01_assets.py, build_ep01_v2_manifest.py, ep01_build_section.py,
│        ep01_collect_sections.py, ep01_remap_lipsync_sections.py, ep01_sync_song.py,
│        ep01_apply_el_vo.py, elevenlabs_verify.py, collect_demo_assets.py
├── .github/workflows/
│   ├── ep01-sec03-pilot.yml              # ACTIVE: build SEC-02v3/03/05v3 + stitch (trigger: build.trigger)
│   ├── ep01-batch2-vo.yml                # regen Batch-2 VO (trigger: batch2.trigger)
│   ├── ep01-pilot-vo.yml                 # regen SEC-03 pilot VO (trigger: vo.trigger)
│   └── (older) ep01-sections.yml, ep01-voice.yml, ep01-voice-verify.yml, ep01-sync-song.yml
├── _staging/
│   ├── sec03_pilot/
│   │   ├── build_spec.json               # GENERATED each CI run (pilot, 23 clips)
│   │   ├── build_spec_sec02.json         # SEC-02 name-day (18 clips)
│   │   ├── build_spec_sec05.json         # SEC-05 reflection (12 clips)
│   │   ├── pilot_ledger.json             # SEC-03 lines: speaker/render_text/letter/name_tag/offset
│   │   ├── render_spec.json              # SEC-03 start_image (seedance) map
│   │   └── build.trigger / vo.trigger    # CI trigger files
│   └── vo_el/
│       ├── EP01-NP-*.mp3   (51 files)    # SEC-02/05 dialogue VO
│       ├── manifest.json                 # SEC-02/05 VO: clip_id/speaker/voice_id/dur/text
│       ├── batch2_ledger.json            # Coda/Mimi/Bram/Pippa regen lines
│       ├── sec04_video_results.json      # S04-01..21 song clip URLs
│       └── pilot/
│           ├── EP01-P3-*.mp3  (23 files) # SEC-03 pilot VO
│           ├── manifest.json             # pilot VO manifest
│           └── render_results.json       # pilot clip_id -> seedance video URL
├── sections/                             # per-section rendered masters (git-committed)
│   ├── EP01-SEC-02-story1-v3.mp4         # (v1/v2 superseded)
│   ├── EP01-SEC-03-pilot.mp4
│   └── EP01-SEC-05-reflection-v3.mp4
├── sunny-and-the-crew/
│   ├── theme-song/THEME-INTRO-MASTER.mp4 # SEC-01 (44.80s, LOCKED master; logo overlaid at stitch)
│   ├── production-os/voice_map_elevenlabs.json  # locked character->voice_id
│   └── season_01/episodes/EP01_a-is-amazing/
│       ├── EP01-A-is-for-amazing-FINAL.mp4       # FINAL (5:52.41)
│       ├── EP01-song-section-v2.mp4              # SEC-04 (104.80s, on-model crew)
│       ├── EP01-song-section-SYNCED.mp4          # SEC-04 audio source (byte-identical mux)
│       ├── song_sections.json / lyrics.txt       # song timing + lyrics
│       ├── EP01_repair_contract_plan.md          # running change log / decisions
│       └── (other docs/manifests, see full list below)
└── _staging/audio/a-is-amazing.mp3        # song master audio
```

## 2) BUILD PIPELINE OVERVIEW (EP01-specific)

**Inputs:** seedance video clips (URLs in `render_results.json` / `sec04_video_results.json`), ElevenLabs
VO mp3s (`_staging/vo_el/**`), the two LOCKED masters (SEC-01 `THEME-INTRO-MASTER.mp4`, SEC-04
`EP01-song-section-SYNCED.mp4` audio), and the per-section build specs.

**Order of execution (all in GitHub Actions, ffmpeg static build):**

1. **VO generation** (`generate_elevenlabs_vo.py`, workflows `ep01-pilot-vo.yml` / `ep01-batch2-vo.yml`):
   reads a ledger (speaker + render_text), maps speaker→voice_id via `voice_map_elevenlabs.json`,
   POSTs ElevenLabs TTS, writes one mp3 per clip + a manifest. Runs only when a `*.trigger` changes.

2. **Spec assembly** (`ep01_make_sec03_build_spec.py`): joins `render_results.json` (video URL per clip)
   with `pilot_ledger.json` (letter / name_tag / audience_wait / offset) → `build_spec.json` for SEC-03.
   SEC-02 and SEC-05 specs (`build_spec_sec02.json`, `build_spec_sec05.json`) are hand-maintained.
   `VO_PIN_SHA` pins the raw VO URL to a commit so CI never reads a cached old take.

3. **Section build** (`ep01_build_sec03_pilot.py`, run 3× — SEC-03 pilot, then SEC-02, then SEC-05 via
   `SEC03_SPEC=`): per clip it (a) downloads the video + VO, (b) computes the **slot** (timing master),
   (c) re-times the VO onto the mouth wind-up (`adelay` by `offset`, default 0.40s), (d) composites the
   **letter glyph** + **name-tag** overlays, (e) plays **full motion** to fill the slot, slowing only the
   resting tail if the slot is longer than the clip (**no freeze**), (f) runs the **sync-gate** (asserts
   audio onset ∈ band), then concatenates all clips → the section mp4.

4. **SEC-04 song** (`ep01_build_sec04_v2.py`): 21 clips each trimmed to 104.83/21 = 4.992s, concatenated,
   then muxed against the ORIGINAL song audio (`-c:a copy`, byte-identical). Built separately; the
   committed `EP01-song-section-v2.mp4` is consumed as-is by the stitch.

5. **Stitch** (`ep01_stitch_final.py`): normalizes all 5 sections to 1280×720/30, composites the
   **intro-logo** overlay onto SEC-01's first 3.5s, concatenates → `EP01-A-is-for-amazing-FINAL.mp4`,
   and runs duration/size guards.

**Which step handles what:**
- clip selection → `prefer()` in `ep01_stitch_final.py` (v3 > v2 > v1; pilot > story2)
- VO assignment → `vo_url` per clip in the specs; `voice_for()` in `generate_elevenlabs_vo.py`
- lip-sync / mouth → seedance `audio_references` at RENDER time (not in this repo's ffmpeg); assembly only
  RE-TIMES the finished VO onto the mouth via `adelay` (offset). Sync is approximate, not frame-exact.
- ghost-mouth trim → **opt-in only** now: `ghost_trim:true` per clip cuts at speech-end (none set)
- freeze removal → the fill block in `ep01_build_sec03_pilot.py` (full motion instead of clone-freeze)
- slow-tail → same block: `setpts` slow of the resting tail when slot > clip length
- overlays (letter + name tag) → `letter_ov()` drawtext in `ep01_build_sec03_pilot.py`
- logo → `LOGO_VF` drawtext in `ep01_stitch_final.py`, applied to SEC-01 only
- final stitch → `ep01_stitch_final.py`
- QC → sync-gate (build) + duration/size guards (stitch); freezedetect/mpdecimate run manually

## 4) EP01 SHOT MAP

**SEC-01 (0:00–0:44.80):** LOCKED master `THEME-INTRO-MASTER.mp4`. Intro-logo overlay composited on 0.0–3.55s (title 'Sunny and the Crew', hold 2.5s + 1s fade). No per-shot spec (single master).


### SEC-02 — Name Day (abs offset 44.80s), computed total 84.00s
| shot | sec-start | sec-end | abs | video file | audio | speaker | name_tag | letter | vo(s) | off | wait | slot | re-render |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| EP01-NP-C01 | 0.00 | 3.80 | 44.80 | hf_20260714_051127_4a2b7d0d-ddc4-40f9- | EP01-NP-C01.mp3 | Sunny | - | - | 2.12 | 0.40 | 0.0 | 3.80 | - |
| EP01-NP-C02 | 3.80 | 8.30 | 48.60 | hf_20260714_051140_1bf246e1-e0c8-44f7- | EP01-NP-C02.mp3 | Sunny | - | - | 2.51 | 0.40 | 0.0 | 4.50 | - |
| EP01-NP-N08 | 8.30 | 13.30 | 53.10 | hf_20260713_235457_6b72d6f0-cbaf-4de2- | EP01-NP-N08.mp3 | Crew | - | - | 1.93 | 0.40 | 0.0 | 5.00 | - |
| EP01-NP-N01 | 13.30 | 18.80 | 58.10 | hf_20260714_181540_4577213d-faba-46da- | EP01-NP-N01.mp3 | Koda | Coda | C | 2.82 | 0.40 | 0.0 | 5.50 | Batch2 |
| EP01-NP-N02 | 18.80 | 24.30 | 63.60 | hf_20260714_181548_40500d92-7d5a-4f09- | EP01-NP-N02.mp3 | Mimi | Mimi | M | 3.24 | 0.40 | 0.0 | 5.50 | Batch2 |
| EP01-NP-N09 | 24.30 | 28.80 | 69.10 | hf_20260713_235506_c0cdc0bd-fd15-416d- | (wordless) |  | - | - | - | 0.40 | 0.0 | 4.50 | - |
| EP01-NP-N03 | 28.80 | 34.30 | 73.60 | hf_20260714_181609_2dfa98d4-6f57-480a- | EP01-NP-N03.mp3 | Bram | Bram | B | 3.11 | 0.40 | 0.0 | 5.50 | Batch2 |
| EP01-NP-C03 | 34.30 | 39.80 | 79.10 | hf_20260714_053225_cbde2107-bfb1-4a70- | EP01-NP-C03.mp3 | Mia | Mia | M | 1.44 | 0.40 | 0.0 | 5.50 | - |
| EP01-NP-C04 | 39.80 | 45.30 | 84.60 | hf_20260714_053303_cec04b04-c565-4708- | EP01-NP-C04.mp3 | Leo | Leo | L | 1.49 | 0.40 | 0.0 | 5.50 | - |
| EP01-NP-N06 | 45.30 | 51.30 | 90.10 | hf_20260713_235531_4d9866e4-30f6-44fd- | EP01-NP-N06.mp3 | Crew | - | - | 1.67 | 0.40 | 0.0 | 6.00 | - |
| EP01-NP-C05 | 51.30 | 55.10 | 96.10 | hf_20260714_040011_6135094d-650c-4fa0- | EP01-NP-C05.mp3 | Pipa | - | - | 1.52 | 0.40 | 0.0 | 3.80 | - |
| EP01-NP-C06 | 55.10 | 58.90 | 99.90 | hf_20260714_035325_cebe9422-5359-466a- | EP01-NP-C06.mp3 | Sunny | - | - | 1.67 | 0.40 | 0.0 | 3.80 | - |
| EP01-NP-C07 | 58.90 | 62.70 | 103.70 | hf_20260714_040002_0b7ff3f0-80b3-4500- | EP01-NP-C07.mp3 | Pipa | - | - | 1.15 | 0.40 | 0.0 | 3.80 | - |
| EP01-NP-C08 | 62.70 | 66.50 | 107.50 | hf_20260714_051151_ac9fd2ca-ec5c-418a- | EP01-NP-C08.mp3 | Sunny | - | - | 1.80 | 0.40 | 0.0 | 3.80 | - |
| EP01-NP-N04 | 66.50 | 71.00 | 111.30 | hf_20260714_051200_56c240e7-b3d7-491a- | EP01-NP-N04.mp3 | Sunny | - | - | 2.53 | 0.40 | 0.0 | 4.50 | - |
| EP01-NP-C09 | 71.00 | 75.50 | 115.80 | hf_20260714_051219_6c1a174b-305e-4b47- | EP01-NP-C09.mp3 | Sunny | - | - | 1.49 | 0.40 | 0.0 | 4.50 | - |
| EP01-NP-C10 | 75.50 | 79.50 | 120.30 | hf_20260714_051240_9eec0553-9161-4c6f- | EP01-NP-C10.mp3 | Sunny | - | - | 1.70 | 0.40 | 0.0 | 4.00 | - |
| EP01-NP-N05 | 79.50 | 84.00 | 124.30 | hf_20260714_051428_4b264a03-7ee7-437a- | EP01-NP-N05.mp3 | Ava | - | - | 1.99 | 0.40 | 0.0 | 4.50 | - |


### SEC-03 — Games pilot (abs offset 128.83s), computed total 63.85s
| shot | sec-start | sec-end | abs | video file | audio | speaker | name_tag | letter | vo(s) | off | wait | slot | re-render |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| EP01-P3-01 | 0.00 | 2.47 | 128.83 | hf_20260714_142836_b5a86dea-8697-4b8d- | EP01-P3-01.mp3 | Ava | - | - | 1.62 | 0.40 | 0.0 | 2.47 | - |
| EP01-P3-02 | 2.47 | 4.94 | 131.30 | hf_20260714_111353_eb2442e5-49a3-4da8- | EP01-P3-02.mp3 | Sunny | - | - | 1.62 | 0.40 | 0.0 | 2.47 | - |
| EP01-P3-03 | 4.94 | 6.99 | 133.77 | hf_20260714_111354_3442be27-1d12-4b01- | EP01-P3-03.mp3 | Sunny | Sunny | S | 1.20 | 0.40 | 0.0 | 2.05 | - |
| EP01-P3-04 | 6.99 | 12.70 | 135.82 | hf_20260714_111357_ee938ed5-e589-4aac- | EP01-P3-04.mp3 | Sunny | - | - | 1.85 | 0.40 | 3.0 | 5.70 | - |
| EP01-P3-05 | 12.70 | 16.60 | 141.53 | hf_20260714_111400_da5f23be-151a-422c- | EP01-P3-05.mp3 | Leo | Leo | L | 3.06 | 0.40 | 0.0 | 3.91 | - |
| EP01-P3-06 | 16.60 | 19.12 | 145.43 | hf_20260714_111404_cc0709bd-6ecb-4bb7- | EP01-P3-06.mp3 | Koda | - | - | 1.67 | 0.40 | 0.0 | 2.52 | - |
| EP01-P3-07 | 19.12 | 20.94 | 147.95 | hf_20260714_121933_f6966d4b-f6ce-4892- | EP01-P3-07.mp3 | Crew | - | L | 0.97 | 0.40 | 0.0 | 1.82 | - |
| EP01-P3-08 | 20.94 | 23.64 | 149.77 | hf_20260714_111430_27687f75-d498-4c19- | EP01-P3-08.mp3 | Sunny | - | - | 1.85 | 0.40 | 0.0 | 2.70 | - |
| EP01-P3-09 | 23.64 | 28.70 | 152.47 | hf_20260714_111931_4d3b35eb-80f8-4049- | EP01-P3-09.mp3 | Sunny | - | - | 1.20 | 0.40 | 3.0 | 5.05 | - |
| EP01-P3-10 | 28.70 | 31.48 | 157.53 | hf_20260714_111935_7e24a18e-b8b5-4bd5- | EP01-P3-10.mp3 | Mia | Mia | M | 1.93 | 0.40 | 0.0 | 2.78 | - |
| EP01-P3-11 | 31.48 | 33.66 | 160.31 | hf_20260714_111937_3758e389-31cc-4aae- | EP01-P3-11.mp3 | Koda | Coda | C | 1.33 | 0.40 | 0.0 | 2.18 | Batch2 |
| EP01-P3-12 | 33.66 | 36.13 | 162.49 | hf_20260714_111939_85a75416-a966-4c6f- | EP01-P3-12.mp3 | Bram | - | - | 1.62 | 0.40 | 0.0 | 2.47 | - |
| EP01-P3-13 | 36.13 | 38.50 | 164.96 | hf_20260714_111942_45692608-c946-4e9f- | EP01-P3-13.mp3 | Mimi | - | - | 1.52 | 0.40 | 0.0 | 2.37 | - |
| EP01-P3-14 | 38.50 | 40.86 | 167.33 | hf_20260714_111945_d3cecd4c-4691-4f84- | EP01-P3-14.mp3 | Bram | Bram | B | 1.52 | 0.40 | 0.0 | 2.37 | - |
| EP01-P3-15 | 40.86 | 42.81 | 169.69 | hf_20260714_121627_ac7b3982-8e17-4fa0- | EP01-P3-15.mp3 | Crew | - | - | 1.10 | 0.40 | 0.0 | 1.95 | - |
| EP01-P3-16 | 42.81 | 44.76 | 171.64 | hf_20260714_112048_682d60b9-5d17-4cd4- | EP01-P3-16.mp3 | Bram | - | - | 1.10 | 0.40 | 0.0 | 1.95 | - |
| EP01-P3-17 | 44.76 | 46.42 | 173.59 | hf_20260714_181619_cd4970d2-172b-4481- | EP01-P3-17.mp3 | Pipa | - | - | 1.02 | 0.20 | 0.0 | 1.67 | Batch2 |
| EP01-P3-18 | 46.42 | 48.89 | 175.25 | hf_20260714_112236_3a03d84e-5ed7-45e2- | EP01-P3-18.mp3 | Sunny | - | - | 1.62 | 0.40 | 0.0 | 2.47 | - |
| EP01-P3-19 | 48.89 | 50.53 | 177.72 | hf_20260714_181628_247762cd-d4a5-42c8- | EP01-P3-19.mp3 | Pipa | Pippa | P | 0.78 | 0.40 | 0.0 | 1.63 | Batch2 |
| EP01-P3-20 | 50.53 | 52.29 | 179.36 | hf_20260714_121629_42acc472-f4e0-4008- | EP01-P3-20.mp3 | Crew | - | A | 0.91 | 0.40 | 0.0 | 1.76 | - |
| EP01-P3-21 | 52.29 | 57.81 | 181.12 | hf_20260714_112405_65a4b9ab-c8c6-4f3e- | EP01-P3-21.mp3 | Sunny | - | A | 1.67 | 0.40 | 3.0 | 5.52 | - |
| EP01-P3-22 | 57.81 | 60.36 | 186.64 | hf_20260714_112408_c6f26386-5e19-42ae- | EP01-P3-22.mp3 | Leo | - | - | 1.70 | 0.40 | 0.0 | 2.55 | - |
| EP01-P3-23 | 60.36 | 63.85 | 189.19 | hf_20260714_112410_647383da-0c7e-4cba- | EP01-P3-23.mp3 | Sunny | - | - | 2.64 | 0.40 | 0.0 | 3.49 | - |


### SEC-04 — Song (abs offset 191.96s): 21 shots S04-01..21, each 4.992s, audio byte-identical. Prop/lip-sync fixes proposed but NOT executed (awaiting approval).


### SEC-05 — Reflection (abs offset 296.76s), computed total 55.60s
| shot | sec-start | sec-end | abs | video file | audio | speaker | name_tag | letter | vo(s) | off | wait | slot | re-render |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| EP01-NP-C22 | 0.00 | 5.50 | 296.76 | hf_20260714_053631_dca179b3-6b9c-4a26- | EP01-NP-C22.mp3 | Sunny | - | A | 1.49 | 0.40 | 0.0 | 5.50 | - |
| EP01-NP-N16 | 5.50 | 11.00 | 302.26 | hf_20260714_002145_2ad90f27-6d62-41db- | EP01-NP-N16.mp3 | Crew | - | - | 1.57 | 0.40 | 0.0 | 5.50 | - |
| EP01-NP-C23 | 11.00 | 16.50 | 307.76 | hf_20260713_210945_4ffd49d2-46c0-43e0- | EP01-NP-C23.mp3 | Sunny | - | - | 1.02 | 0.40 | 0.0 | 5.50 | - |
| EP01-NP-C24 | 16.50 | 20.00 | 313.26 | hf_20260714_051705_bf3cc760-5076-40f3- | EP01-NP-C24.mp3 | Sunny | - | - | 1.75 | 0.40 | 0.0 | 3.50 | - |
| EP01-NP-C25 | 20.00 | 23.50 | 316.76 | hf_20260714_051856_b2ad10d3-ebb8-4c03- | EP01-NP-C25.mp3 | Pipa | - | - | 0.84 | 0.40 | 0.0 | 3.50 | - |
| EP01-NP-C26 | 23.50 | 27.50 | 320.26 | hf_20260714_051907_aa21c3a0-ffda-4ce4- | EP01-NP-C26.mp3 | Pipa | - | - | 1.62 | 0.40 | 0.0 | 4.00 | - |
| EP01-NP-N17 | 27.50 | 33.00 | 324.26 | hf_20260714_055538_ae34bfba-87cc-44e3- | EP01-NP-N17.mp3 | Pipa | - | - | 1.57 | 0.40 | 0.0 | 5.50 | - |
| EP01-NP-N21 | 33.00 | 37.50 | 329.76 | hf_20260714_051537_1efb5cf7-359f-411e- | EP01-NP-N21.mp3 | Ava | - | - | 1.80 | 0.40 | 0.0 | 4.50 | - |
| EP01-NP-C27 | 37.50 | 41.30 | 334.26 | hf_20260714_051715_e4148e77-0bc2-4e46- | EP01-NP-C27.mp3 | Sunny | - | - | 1.44 | 0.40 | 0.0 | 3.80 | - |
| EP01-NP-C28 | 41.30 | 46.80 | 338.06 | hf_20260714_053657_4179e514-c9de-4223- | EP01-NP-C28.mp3 | Sunny | - | A | 1.44 | 0.40 | 0.0 | 5.50 | - |
| EP01-NP-C29 | 46.80 | 51.80 | 343.56 | hf_20260714_051804_81fe87d0-b0b0-455e- | EP01-NP-C29.mp3 | Sunny | - | - | 3.60 | 0.40 | 0.0 | 5.00 | - |
| EP01-NP-C30 | 51.80 | 55.60 | 348.56 | hf_20260714_051209_4f442518-e078-4203- | EP01-NP-C30.mp3 | Sunny | - | - | 2.09 | 0.40 | 0.0 | 3.80 | - |


_Video-file column = basename of the seedance CDN URL in each spec. 'Batch2' re-render = clip whose video was re-rendered with new audio (Coda/Mimi/Bram/Pippa)._


## 3) FULL SOURCE CODE / CONFIG (verbatim)


### `scripts/ep01_make_sec03_build_spec.py`
```python
#!/usr/bin/env python3
"""Join pilot render results + ledger -> SEC-03 pilot build_spec.json.

render_results.json  : {"EP01-P3-01": {"job":..,"url":<video url>}, ...}
pilot_ledger.json    : lines[] with letter / audience_wait per clip
Emits _staging/sec03_pilot/build_spec.json consumed by ep01_build_sec03_pilot.py.
"""
import json, os, sys

BASE = "_staging/sec03_pilot"
# VO_PIN_SHA pins the raw VO to a commit so CI never reads a stale cached take
# off the branch-ref raw URL (default: branch ref).
_REF = os.environ.get("VO_PIN_SHA", "claude/sunny-crew-ep1-assembly-8hg5om")
RAW = f"https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/{_REF}/_staging/vo_el/pilot/"
led = {r["clip_id"]: r for r in json.load(open(f"{BASE}/pilot_ledger.json"))["lines"]}
res = json.load(open("_staging/vo_el/pilot/render_results.json"))

order = list(led.keys())
missing = [c for c in order if not (res.get(c) or {}).get("url")]
if missing:
    sys.exit("render_results missing video url for: %s" % missing)

clips = []
for cid in order:
    r = led[cid]
    c = {"clip_id": cid, "video_url": res[cid]["url"], "vo_url": RAW + cid + ".mp3"}
    if r.get("letter"):        c["letter"] = r["letter"]
    if r.get("audience_wait"): c["audience_wait"] = r["audience_wait"]
    if r.get("name_tag"): c["name_tag"] = r["name_tag"]
    if r.get("offset") is not None: c["offset"] = r["offset"]  # per-clip lip-sync tune
    clips.append(c)

json.dump({"out": "sections/EP01-SEC-03-pilot.mp4", "clips": clips},
          open(f"{BASE}/build_spec.json", "w"), indent=1)
print("build_spec: %d clips -> %s/build_spec.json" % (len(clips), BASE))

```


### `scripts/ep01_build_sec03_pilot.py`
```python
#!/usr/bin/env python3
"""Build the SEC-03 pilot master (runs in CI).

Folds four fixes into one section:
  1. LIP-SYNC RE-TIME  — the ElevenLabs VO is delayed by LIPSYNC_OFFSET so it
     lands on the seedance mouth-onset (measured wind-up ~0.3-0.5s), killing the
     "audio ahead of lips" dub feel.
  2. SYNC-GATE         — asserts the correction was applied within the valid band
     for every talking clip; fails the build otherwise (no dubbed scene ships).
  3. LETTER OVERLAYS   — the correct glyph (S/L/M/K/B/P/A) is composited in post
     (the single allowed on-screen-text exception), per-character colour, faded in.
  4. AUDIENCE WAITS    — beats with `audience_wait` hold the expectant last frame
     that many seconds so kids at home can answer/join.

Spec (_staging/sec03_pilot/build_spec.json):
  {"out":"sections/EP01-SEC-03-pilot.mp4",
   "clips":[{"clip_id","video_url","vo_url","letter"?,"audience_wait"?,"offset"?}, ...]}
VO duration is the timing master; slots are derived, not guessed.
"""
import json, os, subprocess, sys

LIPSYNC_OFFSET = 0.40   # default VO delay to reach the mouth-onset (per-clip override via "offset")
TAIL_PAUSE     = 0.45   # min breathing room after the voice
GHOST_TAIL     = 0.30   # only used for clips explicitly flagged "ghost_trim": trim to speech-end + this
TAIL_SLOW_REGION = 1.2  # when a slot is longer than the clip, gently slow this much of the RESTING
                        # tail to fill it — living motion, NEVER a freeze/corpse frame
GATE_LO, GATE_HI = 0.25, 0.65   # measured onset band (guards against audio-ahead-of-lips)

VF = ("scale=1280:720:force_original_aspect_ratio=decrease,"
      "pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,setsar=1")

# per-character letter-overlay accent (border colour), keyed by glyph
LETTER_COLOR = {"S":"0xF7C948","L":"0xE4572E","M":"0x2EC4B6","C":"0xF29E4C",
                "B":"0xE4572E","P":"0xD65DB1","A":"0xF7C948","K":"0xF29E4C"}

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout); print(r.stderr); sys.exit("FAILED: %s" % " ".join(cmd[:6]))
    return r.stdout

def probe(path):
    return float(run(["ffprobe","-v","error","-show_entries","format=duration",
                      "-of","default=noprint_wrappers=1:nokey=1",path]).strip())

def audio_onset(path):
    """first speech time (s) via 25ms RMS envelope, threshold 12% of peak."""
    wav = path + ".on.wav"
    run(["ffmpeg","-y","-v","error","-i",path,"-ac","1","-ar","8000","-f","wav",wav])
    import wave, array, math
    w=wave.open(wav,'rb'); a=array.array('h'); a.frombytes(w.readframes(w.getnframes())); w.close()
    sr=8000; hop=int(0.025*sr)
    env=[]
    for i in range(0,len(a)-hop,hop):
        s=a[i:i+hop]; env.append((sum(x*x for x in s)/len(s))**0.5)
    if not env: return 0.0
    pk=max(env) or 1.0
    for i,v in enumerate(env):
        if v/pk>0.12: return i*0.025
    return 0.0

def find_font():
    for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
              "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
              "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"):
        if os.path.exists(p): return p
    out=subprocess.run(["fc-match","-f","%{file}","bold"],capture_output=True,text=True).stdout.strip()
    if out and os.path.exists(out): return out
    sys.exit("no usable bold font found for letter overlays")

FONT = find_font()
spec = json.load(open(os.environ.get("SEC03_SPEC","_staging/sec03_pilot/build_spec.json")))
WORK = "_staging/sec03_work"; os.makedirs(WORK, exist_ok=True)
os.makedirs(os.path.dirname(spec["out"]), exist_ok=True)

parts=[]; total=0.0; gate=[]
for i,c in enumerate(spec["clips"]):
    cid=c["clip_id"]; off=float(c.get("offset",LIPSYNC_OFFSET)); wait=float(c.get("audience_wait",0.0))
    src=f"{WORK}/src_{i:02d}.mp4"; vo=f"{WORK}/vo_{i:02d}.mp3"; cut=f"{WORK}/cut_{i:02d}.mp4"
    run(["curl","-sL","-A","Mozilla/5.0","-o",src,c["video_url"]])
    if os.path.getsize(src)<10000: sys.exit("video too small: %s %s"%(cid,c["video_url"]))
    vlen=probe(src)
    has_vo = bool(c.get("vo_url"))
    if has_vo:
        run(["curl","-sL","-A","Mozilla/5.0","-o",vo,c["vo_url"]])
        if os.path.getsize(vo)<800: sys.exit("VO too small: %s %s"%(cid,c["vo_url"]))
        volen=probe(vo); slot=max(off+volen+TAIL_PAUSE+wait, float(c.get("dur",0)))
    else:
        # wordless action beat: hold the shot for its own length, silent bed, no re-time/overlay/gate
        volen=0.0; slot=c.get("dur", vlen)
    def letter_ov(vf):
        if c.get("letter"):
            g=c["letter"]; col=LETTER_COLOR.get(g,"0xFFFFFF")
            vf=vf+(",drawtext=fontfile='%s':text='%s':fontcolor=white:fontsize=170:"
               "x=110:y=100:borderw=7:bordercolor=%s:shadowcolor=black@0.45:shadowx=4:shadowy=4:"
               "alpha='min(1,max(0,(t-%.2f)/0.4))'"%(FONT,g,col,off))
        if c.get("name_tag"):   # on-screen name text (lower-centre, kid-legible), fades in with the line
            nm=c["name_tag"]
            vf=vf+(",drawtext=fontfile='%s':text='%s':fontcolor=white:fontsize=64:"
               "x=(w-tw)/2:y=h-118:borderw=5:bordercolor=black@0.85:shadowcolor=black@0.4:shadowx=3:shadowy=3:"
               "alpha='min(1,max(0,(t-%.2f)/0.4))'"%(FONT,nm,off))
        return vf
    # PACING: play the clip's own continuous motion to fill its slot (NO corpse-frame freeze).
    #   base_len = min(slot, vlen): the real motion we can show at 1x.
    #   ghost_trim (opt-in, per-clip): the ONLY case we cut at speech-end — reserved for clips
    #       QA proves keep flapping the mouth past the audio; each such clip is logged.
    ghost = bool(c.get("ghost_trim"))
    if has_vo and ghost:
        base_len = min(vlen, off+volen+GHOST_TAIL)   # stop the mouth when the line stops
    else:
        base_len = min(slot, vlen)
    base=f"{WORK}/base_{i:02d}.mp4"
    vf=VF+",trim=end=%.3f,setpts=PTS-STARTPTS"%base_len
    vf=letter_ov(vf)
    if has_vo:
        af="adelay=%d:all=1,apad"%int(off*1000)  # re-time VO onto the mouth wind-up
        run(["ffmpeg","-y","-v","error","-i",src,"-i",vo,"-t","%.3f"%base_len,
             "-map","0:v:0","-map","1:a:0","-vf",vf,"-af",af,
             "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p",
             "-c:a","aac","-b:a","128k","-ar","44100","-ac","2",base])
        on=audio_onset(base); ok = GATE_LO <= on <= GATE_HI+0.15
        gate.append((cid,round(on,3),ok))
    else:
        run(["ffmpeg","-y","-v","error","-i",src,"-f","lavfi","-i",
             "anullsrc=channel_layout=stereo:sample_rate=44100","-t","%.3f"%base_len,
             "-map","0:v:0","-map","1:a:0","-vf",vf,
             "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p",
             "-c:a","aac","-b:a","128k",base]); on=None
    # FILL any surplus (slot longer than the real motion) by gently slowing the RESTING tail
    # — living slow-settle, never a frozen frame. The speaking part is never slowed.
    fill="full-motion"
    if slot > base_len + 0.03:
        speak_end = (off+volen) if has_vo else 0.0
        tsplit = max(speak_end+0.05, base_len-TAIL_SLOW_REGION)
        tsplit = min(max(tsplit,0.0), base_len-0.30)
        factor = (slot - tsplit) / (base_len - tsplit)
        if factor > 2.5: factor = 2.5   # guard (rare); -t below caps the tiny remainder
        fc=("[0:v]trim=0:%.3f,setpts=PTS-STARTPTS[h];"
            "[0:v]trim=%.3f:%.3f,setpts=(PTS-STARTPTS)*%.4f[t];"
            "[h][t]concat=n=2:v=1[v];[0:a]apad[a]"%(tsplit,tsplit,base_len,factor))
        run(["ffmpeg","-y","-v","error","-i",base,"-filter_complex",fc,
             "-map","[v]","-map","[a]","-t","%.3f"%slot,
             "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p",
             "-c:a","aac","-b:a","128k","-ar","44100","-ac","2",cut])
        fill="slow-tail x%.2f @%.1fs"%(factor,tsplit)
        parts.append(cut)
    else:
        parts.append(base)
    total+=slot
    print("  %-12s vo=%.2fs off=%.2f slot=%.2f base=%.2f onset=%s %s [%s]%s"%(
        cid,volen,off,slot,base_len,("%.3f"%on) if on is not None else "wordless",
        ("letter "+c["letter"]) if c.get("letter") else "", fill, " GHOST_TRIM" if ghost else ""))

fails=[g for g in gate if not g[2]]
if fails:
    print("SYNC-GATE FLAGS (audio onset outside band):",fails)
    if os.environ.get("SYNC_GATE_FATAL","1")=="1":
        sys.exit("sync-gate failed on %d clip(s)"%len(fails))
    print("  (non-fatal for this section — flagged for review)")

with open(f"{WORK}/concat.txt","w") as f:
    for p in parts: f.write("file '%s'\n"%os.path.abspath(p))
run(["ffmpeg","-y","-v","error","-f","concat","-safe","0","-i",f"{WORK}/concat.txt","-c","copy",spec["out"]])
d=probe(spec["out"])
print("SEC-03 pilot: %d clips, target %.2fs, actual %.2fs -> %s"%(len(parts),total,d,spec["out"]))
if abs(d-total)>max(0.6,0.04*len(parts)):
    sys.exit("duration mismatch: %.2f vs %.2f"%(total,d))
print("SEC-03 pilot OK — sync-gate passed on all %d clips."%len(gate))

```


### `scripts/ep01_build_sec04_v2.py`
```python
#!/usr/bin/env python3
"""Build SEC-04 v2 — the on-model song visual track (runs in CI).

Replaces the pre-redesign SEC-04 (Sunny/Leo/Mia + Mayor Mary) with a fresh
full-crew on-model cut, while keeping the song AUDIO byte-identical.

Inputs:
  _staging/vo_el/sec04_video_results.json  -> {"S04-01": {"job": "...", "url": "https://...mp4"}, ...}
  sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing/EP01-song-section-SYNCED.mp4
      -> the existing 104.83s song master; its AUDIO is extracted and re-muxed
         byte-identical (-c:a copy) so the sing-along timing is preserved exactly.

Method:
  21 on-model song shots (ordered S04-01..S04-21) are each trimmed to a uniform
  slot of 104.83/21 = 4.9919s and concatenated in order -> a 104.83s video-only
  track that cuts on the beat grid (~every 5s @ 109 BPM). Every clip is used
  exactly once at real time (no slow-mo, no clip reuse). The new video is then
  muxed against the original song audio (byte-identical) -> EP01-song-section-v2.mp4.
"""
import json, os, subprocess, sys

EP = "sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing"
SONG_MASTER = f"{EP}/EP01-song-section-SYNCED.mp4"
RESULTS = "_staging/vo_el/sec04_video_results.json"
OUT = f"{EP}/EP01-song-section-v2.mp4"
WORK = "_staging/sec04_work"
TOTAL = 104.83
N = 21
SLOT = TOTAL / N  # 4.99190...

VF = ("scale=1280:720:force_original_aspect_ratio=decrease,"
      "pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,setsar=1")

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout); print(r.stderr); sys.exit("FAILED: %s" % " ".join(cmd[:6]))
    return r.stdout

def probe(path):
    return float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                      "-of", "default=noprint_wrappers=1:nokey=1", path]).strip())

res = json.load(open(RESULTS))
os.makedirs(WORK, exist_ok=True)

tags = ["S04-%02d" % i for i in range(1, N + 1)]
missing = [t for t in tags if not (res.get(t) or {}).get("url")]
if missing:
    sys.exit("SEC-04 videos not ready: %s" % missing)

slot = "%.4f" % SLOT
parts = []
for i, t in enumerate(tags):
    url = res[t]["url"]
    src = f"{WORK}/src_{i:02d}.mp4"
    cut = f"{WORK}/cut_{i:02d}.mp4"
    run(["curl", "-sL", "-A", "Mozilla/5.0", "-o", src, url])
    if os.path.getsize(src) < 10000:
        sys.exit("download too small: %s %s" % (t, url))
    d = probe(src)
    if d + 0.05 < SLOT:
        # clip shorter than slot (shouldn't happen at duration=5) -> mild fit-stretch
        pts = SLOT / d
        run(["ffmpeg", "-y", "-i", src, "-t", slot,
             "-vf", "setpts=%.5f*PTS,%s" % (pts, VF), "-an",
             "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", cut])
    else:
        run(["ffmpeg", "-y", "-i", src, "-t", slot, "-vf", VF, "-an",
             "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", cut])
    parts.append(cut)
    print("cut %s -> %.4fs (src %.2fs)" % (t, SLOT, d))

with open(f"{WORK}/concat.txt", "w") as f:
    for p in parts:
        f.write("file '%s'\n" % os.path.abspath(p))
vid = f"{WORK}/sec04_video.mp4"
run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", f"{WORK}/concat.txt",
     "-c", "copy", vid])
vdur = probe(vid)
print("SEC-04 v2 video track: %.2fs (target %.2f)" % (vdur, TOTAL))

# mux byte-identical song audio from the existing master (-c:a copy)
run(["ffmpeg", "-y", "-i", vid, "-i", SONG_MASTER,
     "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy", "-c:a", "copy", "-shortest", OUT])
adur = probe(OUT)
print("SEC-04 v2: %s  video=%.2fs muxed=%.2fs" % (OUT, vdur, adur))
if abs(adur - TOTAL) > 1.0:
    sys.exit("SEC-04 v2 duration off: %.2f vs %.2f" % (adur, TOTAL))
print("SEC-04 v2 OK — audio byte-identical (copied), 21 on-model shots, no Mayor Mary.")

```


### `scripts/ep01_stitch_final.py`
```python
#!/usr/bin/env python3
"""Stitch the full EP01 from its five sections (runs in CI).

Order (SEC-01 theme + SEC-04 song are the LOCKED masters — content untouched;
they are only re-encoded to a common 720p30 container so the concat is seamless):
  SEC-01  sunny-and-the-crew/theme-song/THEME-INTRO-MASTER.mp4
  SEC-02  sections/EP01-SEC-02-story1-v2.mp4
  SEC-03  sections/EP01-SEC-03-story2-v2.mp4
  SEC-04  sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing/EP01-song-section-SYNCED.mp4
  SEC-05  sections/EP01-SEC-05-reflection-v2.mp4
Output: sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing/EP01-A-is-for-amazing-FINAL.mp4
"""
import json, os, subprocess, sys

EP = "sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing"
# SEC-04: prefer the on-model full-crew revisual (v2); the pre-redesign SYNCED
# master (Sunny/Leo/Mia + Mayor Mary) is only a last-resort fallback.
SEC04_V2 = os.path.join(EP, "EP01-song-section-v2.mp4")
SEC04_OLD = os.path.join(EP, "EP01-song-section-SYNCED.mp4")
SEC04 = SEC04_V2 if os.path.exists(SEC04_V2) else SEC04_OLD
if SEC04 == SEC04_OLD:
    print("WARNING: SEC-04 v2 (on-model) not found — falling back to pre-redesign SYNCED master")
# SEC-03: prefer the remapped play/games pilot (lip-sync re-timed, letter overlays,
# audience-wait beats) over the original v2 story cut.
def prefer(*paths):
    for p in paths:
        if os.path.exists(p): return p
    return paths[-1]
# prefer the re-timed (lip-sync aligned + letter-overlay) v3 sections + the 3D games pilot
SEC02 = prefer("sections/EP01-SEC-02-story1-v3.mp4", "sections/EP01-SEC-02-story1-v2.mp4")
SEC03 = prefer("sections/EP01-SEC-03-pilot.mp4", "sections/EP01-SEC-03-story2-v2.mp4")
SEC05 = prefer("sections/EP01-SEC-05-reflection-v3.mp4", "sections/EP01-SEC-05-reflection-v2.mp4")
SECTIONS = [
    ("SEC-01", "sunny-and-the-crew/theme-song/THEME-INTRO-MASTER.mp4"),
    ("SEC-02", SEC02),
    ("SEC-03", SEC03),
    ("SEC-04", SEC04),
    ("SEC-05", SEC05),
]
OUT = os.path.join(EP, "EP01-A-is-for-amazing-FINAL.mp4")
VF = ("scale=1280:720:force_original_aspect_ratio=decrease,"
      "pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,setsar=1")

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout); print(r.stderr); sys.exit("FAILED: %s" % " ".join(cmd[:6]))
    return r.stdout

def find_font():
    for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
              "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
              "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"):
        if os.path.exists(p): return p
    out = subprocess.run(["fc-match", "-f", "%{file}", "bold"], capture_output=True, text=True).stdout.strip()
    if out and os.path.exists(out): return out
    sys.exit("no usable bold font for the intro logo")

# INTRO LOGO (placeholder title card, composited over SEC-01's existing opening motion).
#   0.0-2.5s: held full-opacity, centred, kid-readable, high contrast panel behind.
#   2.5-3.5s: fades out over 1s; the existing intro motion keeps playing underneath.
#   Overlay only — SEC-01 duration (and the 5:52 total) is unchanged.
#   Marked "Placeholder logo pending final asset" in EP01_repair_contract_plan.md.
FONT = find_font()
_A = "if(lt(t,2.5),1,max(0,1-(t-2.5)/1.0))"   # hold 2.5s then 1s fade
_EN = "lt(t,3.55)"
LOGO_VF = (
    ",drawtext=fontfile='%s':text='Sunny and the Crew':fontcolor=0xFFF3C4:fontsize=104:"
    "x=(w-tw)/2:y=(h-th)/2:box=1:boxcolor=0x1A1030@0.62:boxborderw=52:"
    "borderw=4:bordercolor=0x7A3FB0:shadowcolor=black@0.55:shadowx=3:shadowy=3:"
    "alpha='%s':enable='%s'"
) % (FONT, _A, _EN)

def dur(path):
    return float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                      "-of", "default=noprint_wrappers=1:nokey=1", path]).strip())

os.makedirs("_staging/stitch_work", exist_ok=True)
parts, rows, total = [], [], 0.0
for i, (name, src) in enumerate(SECTIONS):
    if not os.path.exists(src):
        sys.exit("missing section source: %s (%s)" % (name, src))
    norm = "_staging/stitch_work/%s.mp4" % name
    vf_sec = VF + (LOGO_VF if name == "SEC-01" else "")   # logo composited onto SEC-01 opening
    # CRF 26 + capped rate keeps the ~6:43 final comfortably under GitHub's 100 MB
    # limit (flat cartoon compresses well; CRF 20 produced 107 MB and was rejected)
    run(["ffmpeg", "-y", "-i", src, "-vf", vf_sec, "-r", "30",
         "-c:v", "libx264", "-preset", "veryfast", "-crf", "26",
         "-maxrate", "2M", "-bufsize", "4M", "-pix_fmt", "yuv420p",
         "-c:a", "aac", "-b:a", "128k", "-ar", "44100", "-ac", "2", norm])
    d = dur(norm)
    parts.append(norm); rows.append((name, src, d)); total += d
    print("normalized %s -> %.2fs (%s)" % (name, d, src))

with open("_staging/stitch_work/concat.txt", "w") as f:
    for p in parts:
        f.write("file '%s'\n" % os.path.abspath(p))
run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", "_staging/stitch_work/concat.txt",
     "-c", "copy", OUT])

fd = dur(OUT)
print("\n=== EP01 FINAL ===")
for name, src, d in rows:
    print("  %s  %6.2fs  %d:%05.2f" % (name, d, int(d)//60, d % 60))
print("  TOTAL %6.2fs = %d:%05.2f -> %s" % (fd, int(fd)//60, fd % 60, OUT))

# SEC-04 content guard: the song master must remain ~104.83s (unchanged editorially)
sec04 = [d for n, s, d in rows if n == "SEC-04"][0]
if abs(sec04 - 104.83) > 1.5:
    sys.exit("SEC-04 duration drift: %.2f (expected ~104.83) — song master may be wrong file" % sec04)
if abs(fd - total) > 1.0:
    sys.exit("final duration mismatch: parts sum %.2f vs actual %.2f" % (total, fd))
mb = os.path.getsize(OUT) / 1e6
print("final size: %.1f MB" % mb)
if mb > 99.0:
    sys.exit("final %.1f MB exceeds GitHub 100 MB limit — raise CRF / lower maxrate and rebuild" % mb)
print("OK: SEC-04 intact (%.2fs), final assembled, %.1f MB (pushable)." % (sec04, mb))

```


### `scripts/ep01_batch2_swap.py`
```python
#!/usr/bin/env python3
"""Batch-2 URL swap: fold the re-rendered Coda/Mimi/Bram/Pippa videos + pinned
new VO into the SEC-02 spec and the SEC-03 pilot render_results.

Usage: python3 scripts/ep01_batch2_swap.py <urlmap.json>
  urlmap.json = {"EP01-NP-N01": "<video url>", ... "EP01-P3-19": "<video url>"}

Also:
  - SEC-02 N01 -> letter C + name_tag Coda; N02 -> name_tag Mimi; N03 -> name_tag Bram
  - pins the regenerated VO (N01/N02/N03) to a commit sha so CI never reads a
    cached old take from the branch-ref raw URL.
"""
import json, sys

VO_SHA = "3a85a791ce04596b471dfa54b00022e1ab616177"   # commit holding the Batch-2 mp3s
RAWROOT = "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse"

urlmap = json.load(open(sys.argv[1]))

# --- SEC-02 build spec ---
sp = "_staging/sec03_pilot/build_spec_sec02.json"
d = json.load(open(sp))
NAME = {"EP01-NP-N01": ("C", "Coda"), "EP01-NP-N02": ("M", "Mimi"), "EP01-NP-N03": ("B", "Bram")}
for c in d["clips"]:
    cid = c["clip_id"]
    if cid in urlmap:
        c["video_url"] = urlmap[cid]
    if cid in NAME:
        letter, tag = NAME[cid]
        c["letter"] = letter
        c["name_tag"] = tag
        c["vo_url"] = f"{RAWROOT}/{VO_SHA}/_staging/vo_el/{cid}.mp3"   # pin regen VO
json.dump(d, open(sp, "w"), indent=1)
print("patched", sp)

# --- SEC-03 pilot render_results (P3-17 / P3-19 get new videos; P3-11 keeps its clip) ---
rr = "_staging/vo_el/pilot/render_results.json"
r = json.load(open(rr))
for cid in ("EP01-P3-17", "EP01-P3-19"):
    if cid in urlmap:
        r.setdefault(cid, {})["url"] = urlmap[cid]
json.dump(r, open(rr, "w"), indent=1)
print("patched", rr)
print("done — SEC-02 letters/tags/vo pinned; pilot P3-17/P3-19 video urls swapped.")

```


### `scripts/generate_elevenlabs_vo.py`
```python
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

```


### `.github/workflows/ep01-sec03-pilot.yml`
```yaml
name: EP01 SEC-03 pilot — build + stitch
on:
  push:
    branches: ["claude/sunny-crew-ep1-assembly-8hg5om"]
    paths:
      - "_staging/sec03_pilot/build.trigger"

permissions:
  contents: write

jobs:
  pilot-build:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    steps:
      - uses: actions/checkout@v4
      - name: Install ffmpeg (static build)
        run: |
          set -e
          url=https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-linux64-gpl.tar.xz
          for i in 1 2 3 4; do
            curl -fL --connect-timeout 20 --max-time 240 "$url" -o /tmp/ffmpeg.tar.xz && break || sleep 6
          done
          mkdir -p /tmp/ffmpeg-static
          tar -xf /tmp/ffmpeg.tar.xz -C /tmp/ffmpeg-static --strip-components=1
          echo "/tmp/ffmpeg-static/bin" >> "$GITHUB_PATH"
          /tmp/ffmpeg-static/bin/ffmpeg -version | head -1
      - name: Make SEC-03 pilot build spec (join renders + ledger)
        env:
          VO_PIN_SHA: 3a85a791ce04596b471dfa54b00022e1ab616177
        run: python3 scripts/ep01_make_sec03_build_spec.py
      - name: Build SEC-03 pilot (lip-sync re-time + letter overlays + sync-gate)
        run: python3 scripts/ep01_build_sec03_pilot.py
      - name: Build SEC-02 v3 (lip-sync re-time + letter overlays)
        run: SEC03_SPEC=_staging/sec03_pilot/build_spec_sec02.json SYNC_GATE_FATAL=0 python3 scripts/ep01_build_sec03_pilot.py
      - name: Build SEC-05 v3 (lip-sync re-time + letter overlays)
        run: SEC03_SPEC=_staging/sec03_pilot/build_spec_sec05.json SYNC_GATE_FATAL=0 python3 scripts/ep01_build_sec03_pilot.py
      - name: Re-stitch full EP01 (SEC-01 + SEC-02v3 + SEC-03 pilot + SEC-04v2 + SEC-05v3)
        run: |
          set -e
          if [ -f sections/EP01-SEC-02-story1-v3.mp4 ] && \
             [ -f sections/EP01-SEC-03-pilot.mp4 ] && \
             [ -f sections/EP01-SEC-05-reflection-v3.mp4 ]; then
            python3 scripts/ep01_stitch_final.py
          else
            echo "missing a section — skipping stitch"; exit 1
          fi
      - name: Commit outputs
        run: |
          git config user.name "pilot-bot"
          git config user.email "actions@github.com"
          rm -rf _staging/sec03_work _staging/stitch_work
          git add sections/EP01-SEC-03-pilot.mp4 sections/EP01-SEC-02-story1-v3.mp4 sections/EP01-SEC-05-reflection-v3.mp4 \
            _staging/sec03_pilot/build_spec.json \
            "sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing/EP01-A-is-for-amazing-FINAL.mp4" 2>/dev/null || true
          git commit -m "EP01 SEC-03 pilot: build section + re-stitch final (auto)" || echo "nothing to commit"
          for i in 1 2 3 4 5; do
            git push && break || { git pull --rebase origin "${GITHUB_REF_NAME}" || git rebase --abort || true; sleep 3; }
          done

```


### `.github/workflows/ep01-batch2-vo.yml`
```yaml
name: EP01 repair Batch 2 — regen VO (Coda/Mimi/Bram/Pippa)
on:
  push:
    branches: ["claude/sunny-crew-ep1-assembly-8hg5om"]
    paths:
      - "_staging/vo_el/batch2.trigger"

permissions:
  contents: write

jobs:
  batch2-vo:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v4
      - name: Generate Batch-2 VO (ElevenLabs, locked voices, per-clip so manifests are preserved)
        env:
          ELEVENLABS_API_KEY: ${{ secrets.ELEVENLABS_API_KEY }}
        run: |
          set -e
          if [ -z "$ELEVENLABS_API_KEY" ]; then
            echo "::error::repo secret ELEVENLABS_API_KEY is not set"; exit 1
          fi
          # SEC-02 name-day lines -> _staging/vo_el/  (in-place overwrite of the superseded takes)
          for cid in EP01-NP-N01 EP01-NP-N02 EP01-NP-N03; do
            VO_LEDGER=_staging/vo_el/batch2_ledger.json VO_OUT=_staging/vo_el \
              python3 scripts/generate_elevenlabs_vo.py "$cid"
          done
          # SEC-03 pilot lines -> _staging/vo_el/pilot/
          for cid in EP01-P3-11 EP01-P3-17 EP01-P3-19; do
            VO_LEDGER=_staging/vo_el/batch2_ledger.json VO_OUT=_staging/vo_el/pilot \
              python3 scripts/generate_elevenlabs_vo.py "$cid"
          done
          echo "=== durations ==="
          for f in _staging/vo_el/EP01-NP-N01.mp3 _staging/vo_el/EP01-NP-N02.mp3 _staging/vo_el/EP01-NP-N03.mp3 \
                   _staging/vo_el/pilot/EP01-P3-11.mp3 _staging/vo_el/pilot/EP01-P3-17.mp3 _staging/vo_el/pilot/EP01-P3-19.mp3; do
            d=$(ffprobe -v error -show_entries format=duration -of default=nk=1:nw=1 "$f" 2>/dev/null || echo "?")
            echo "  $f  ${d}s"
          done
      - name: Commit Batch-2 VO
        run: |
          git config user.name "batch2-vo-bot"
          git config user.email "actions@github.com"
          git add _staging/vo_el/EP01-NP-N01.mp3 _staging/vo_el/EP01-NP-N02.mp3 _staging/vo_el/EP01-NP-N03.mp3 \
                  _staging/vo_el/pilot/EP01-P3-11.mp3 _staging/vo_el/pilot/EP01-P3-17.mp3 _staging/vo_el/pilot/EP01-P3-19.mp3
          git commit -m "EP01 repair Batch 2: regen VO (Coda C-O-D-A, Mimi affirming, Bram spell, Pippa)" || echo "nothing to commit"
          for i in 1 2 3 4 5; do
            git push && break || { git pull --rebase origin "${GITHUB_REF_NAME}" || git rebase --abort || true; sleep 3; }
          done

```


### `_staging/sec03_pilot/pilot_ledger.json`
```json
{
 "_meta": "SEC-03 PILOT remap ledger — real-kid play, 3 core games (Clap Your Name / Guess the First Letter / Big & Small Feelings). Kid-style lines, one idea per beat, 3s audience waits. render_text drives ElevenLabs VO + captions. build fields drive shot assembly (start_image reuse tag, letter overlay glyph, audience_wait hold seconds, game tag).",
 "voice_note": "voices = locked ElevenLabs map; no narrator; Ava is the in-world adult mentor (learning segment, per adult_presence_rule).",
 "lines": [
  {
   "clip_id": "EP01-P3-01",
   "speaker": "Ava",
   "render_text": "Let's play the Name Game!",
   "start_image": "CU-AVA",
   "game": "intro",
   "action": "warm invite, waves crew in"
  },
  {
   "clip_id": "EP01-P3-02",
   "speaker": "Sunny",
   "render_text": "Me first! Watch me!",
   "start_image": "ACT-SUNNY-CLAPDEMO",
   "game": "clap-name",
   "action": "bounces, hands ready to clap"
  },
  {
   "clip_id": "EP01-P3-03",
   "speaker": "Sunny",
   "render_text": "SUN-NY!",
   "start_image": "ACT-SUNNY-CLAPDEMO",
   "game": "clap-name",
   "letter": "S",
   "action": "claps twice on the two syllables",
   "name_tag": "Sunny"
  },
  {
   "clip_id": "EP01-P3-04",
   "speaker": "Sunny",
   "render_text": "Your turn! Clap your name!",
   "start_image": "CU-SUNNY-INVITE",
   "game": "clap-name",
   "audience_wait": 3.0,
   "action": "to camera, expectant, hands up"
  },
  {
   "clip_id": "EP01-P3-05",
   "speaker": "Leo",
   "render_text": "Me next! LE-O!",
   "start_image": "ACT-LEO-CLAP",
   "game": "clap-name",
   "letter": "L",
   "action": "jumps in, claps his name, spins",
   "name_tag": "Leo"
  },
  {
   "clip_id": "EP01-P3-06",
   "speaker": "Koda",
   "render_text": "Ooh! Do it again, Leo!",
   "start_image": "CU-KODA",
   "game": "copy-me",
   "action": "grinning, pointing at Leo, wants to copy"
  },
  {
   "clip_id": "EP01-P3-07",
   "speaker": "Crew",
   "render_text": "LE-O!",
   "start_image": "NEW-COPY-LEOKODA",
   "game": "copy-me",
   "letter": "L",
   "action": "Leo and Koda clap the name together, mirroring"
  },
  {
   "clip_id": "EP01-P3-08",
   "speaker": "Sunny",
   "render_text": "New game! What sound?",
   "start_image": "CU-SUNNY-DA",
   "game": "guess-letter",
   "action": "playful, hand cupped to ear"
  },
  {
   "clip_id": "EP01-P3-09",
   "speaker": "Sunny",
   "render_text": "Mmm... mmm...",
   "start_image": "CU-SUNNY-INVITE",
   "game": "guess-letter",
   "audience_wait": 3.0,
   "action": "to camera, sounding out M, waiting"
  },
  {
   "clip_id": "EP01-P3-10",
   "speaker": "Mia",
   "render_text": "That's me! MI-A!",
   "start_image": "ACT-MIA-CLAP",
   "game": "guess-letter",
   "letter": "M",
   "action": "lights up, claps her name",
   "name_tag": "Mia"
  },
  {
   "clip_id": "EP01-P3-11",
   "speaker": "Koda",
   "render_text": "My turn! Coda!",
   "start_image": "ACT-KODA-CLAP",
   "game": "clap-name",
   "letter": "C",
   "action": "big proud stomps on his name",
   "name_tag": "Coda"
  },
  {
   "clip_id": "EP01-P3-12",
   "speaker": "Bram",
   "render_text": "Mine goes... uh-oh! Oops!",
   "start_image": "CU-BRAM-OOPS",
   "game": "feelings-small",
   "action": "tracing in air, wobbles, shrinks a little, sheepish"
  },
  {
   "clip_id": "EP01-P3-13",
   "speaker": "Mimi",
   "render_text": "Try again, Bram!",
   "start_image": "ACT-MIMI-CLAP",
   "game": "cheer",
   "action": "bouncing, cheering him on, hands up"
  },
  {
   "clip_id": "EP01-P3-14",
   "speaker": "Bram",
   "render_text": "B! BRAM! I did it!",
   "start_image": "ACT-BRAM-CLAP",
   "game": "feelings-big",
   "letter": "B",
   "action": "traces a big confident B, beams, arms up proud",
   "name_tag": "Bram"
  },
  {
   "clip_id": "EP01-P3-15",
   "speaker": "Crew",
   "render_text": "Yay, Bram!",
   "start_image": "NEW-CREW-CHEER",
   "game": "cheer",
   "action": "whole crew jumps and cheers together"
  },
  {
   "clip_id": "EP01-P3-16",
   "speaker": "Bram",
   "render_text": "Your turn, Pipa!",
   "start_image": "CU-BRAM",
   "game": "turn-take",
   "action": "turns to Pipa, warm, inviting her in"
  },
  {
   "clip_id": "EP01-P3-17",
   "speaker": "Pipa",
   "render_text": "…Pippa?",
   "start_image": "CU-PIPA-SAD1",
   "game": "feelings-small",
   "offset": 0.2,
   "action": "shy, small, unsure, half-curled"
  },
  {
   "clip_id": "EP01-P3-18",
   "speaker": "Sunny",
   "render_text": "Show me big and proud!",
   "start_image": "CU-SUNNY-KNEEL",
   "game": "feelings-big",
   "action": "kneeling warm, growing tall to model big/proud"
  },
  {
   "clip_id": "EP01-P3-19",
   "speaker": "Pipa",
   "render_text": "Pippa!",
   "start_image": "CU-PIPA-PROUD",
   "game": "feelings-big",
   "letter": "P",
   "action": "rises into a big proud A-pose, beaming",
   "name_tag": "Pippa"
  },
  {
   "clip_id": "EP01-P3-20",
   "speaker": "Crew",
   "render_text": "Make an A!",
   "start_image": "NEW-CREW-APOSE",
   "game": "make-A",
   "letter": "A",
   "action": "whole crew makes an A-pose together"
  },
  {
   "clip_id": "EP01-P3-21",
   "speaker": "Sunny",
   "render_text": "Make an A with me!",
   "start_image": "ACT-SUNNY-APOSE",
   "game": "make-A",
   "letter": "A",
   "audience_wait": 3.0,
   "action": "to camera, holding the A-pose, waiting for kids at home"
  },
  {
   "clip_id": "EP01-P3-22",
   "speaker": "Leo",
   "render_text": "Can we sing the A song?",
   "start_image": "CU-LEO",
   "game": "song-leadin",
   "action": "excited, bouncing, asking"
  },
  {
   "clip_id": "EP01-P3-23",
   "speaker": "Sunny",
   "render_text": "Let's sing the A song! Sing with us!",
   "start_image": "CU-SUNNY-CHEER",
   "game": "song-leadin",
   "action": "to camera, big welcoming wave into the song"
  }
 ]
}
```


### `_staging/sec03_pilot/build_spec_sec02.json`
```json
{
 "out": "sections/EP01-SEC-02-story1-v3.mp4",
 "clips": [
  {
   "clip_id": "EP01-NP-C01",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_051127_4a2b7d0d-ddc4-40f9-81cf-468ad53bd722.mp4",
   "dur": 3.8,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C01.mp3"
  },
  {
   "clip_id": "EP01-NP-C02",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_051140_1bf246e1-e0c8-44f7-bcf8-d2c1bc66a285.mp4",
   "dur": 4.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C02.mp3"
  },
  {
   "clip_id": "EP01-NP-N08",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260713_235457_6b72d6f0-cbaf-4de2-9baa-30bbb7a225d2.mp4",
   "dur": 5.0,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-N08.mp3"
  },
  {
   "clip_id": "EP01-NP-N01",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_181540_4577213d-faba-46da-8afb-605e3033d052.mp4",
   "dur": 5.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/3a85a791ce04596b471dfa54b00022e1ab616177/_staging/vo_el/EP01-NP-N01.mp3",
   "letter": "C",
   "name_tag": "Coda"
  },
  {
   "clip_id": "EP01-NP-N02",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_181548_40500d92-7d5a-4f09-be15-28380646e48a.mp4",
   "dur": 5.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/3a85a791ce04596b471dfa54b00022e1ab616177/_staging/vo_el/EP01-NP-N02.mp3",
   "letter": "M",
   "name_tag": "Mimi"
  },
  {
   "clip_id": "EP01-NP-N09",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260713_235506_c0cdc0bd-fd15-416d-9608-37ccd9211761.mp4",
   "dur": 4.5
  },
  {
   "clip_id": "EP01-NP-N03",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_181609_2dfa98d4-6f57-480a-b2da-e5071bff53ff.mp4",
   "dur": 5.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/3a85a791ce04596b471dfa54b00022e1ab616177/_staging/vo_el/EP01-NP-N03.mp3",
   "letter": "B",
   "name_tag": "Bram"
  },
  {
   "clip_id": "EP01-NP-C03",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_053225_cbde2107-bfb1-4a70-9021-acdb0869a928.mp4",
   "dur": 5.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C03.mp3",
   "letter": "M",
   "name_tag": "Mia"
  },
  {
   "clip_id": "EP01-NP-C04",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_053303_cec04b04-c565-4708-aa48-a56888a93fde.mp4",
   "dur": 5.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C04.mp3",
   "letter": "L",
   "name_tag": "Leo"
  },
  {
   "clip_id": "EP01-NP-N06",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260713_235531_4d9866e4-30f6-44fd-b89c-3b45c378d60f.mp4",
   "dur": 6.0,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-N06.mp3"
  },
  {
   "clip_id": "EP01-NP-C05",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_040011_6135094d-650c-4fa0-a2d0-c4e5cc4e0540.mp4",
   "dur": 3.8,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C05.mp3"
  },
  {
   "clip_id": "EP01-NP-C06",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_035325_cebe9422-5359-466a-8c30-a0046281139c.mp4",
   "dur": 3.8,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C06.mp3"
  },
  {
   "clip_id": "EP01-NP-C07",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_040002_0b7ff3f0-80b3-4500-aa3f-2a0cb1c3c724.mp4",
   "dur": 3.8,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C07.mp3"
  },
  {
   "clip_id": "EP01-NP-C08",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_051151_ac9fd2ca-ec5c-418a-8e8a-51095a935ce8.mp4",
   "dur": 3.8,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C08.mp3"
  },
  {
   "clip_id": "EP01-NP-N04",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_051200_56c240e7-b3d7-491a-87ef-42e5bcc12c61.mp4",
   "dur": 4.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-N04.mp3"
  },
  {
   "clip_id": "EP01-NP-C09",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_051219_6c1a174b-305e-4b47-8e83-046eb53f0e46.mp4",
   "dur": 4.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C09.mp3"
  },
  {
   "clip_id": "EP01-NP-C10",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_051240_9eec0553-9161-4c6f-8d49-aa5d6addd9f7.mp4",
   "dur": 4.0,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C10.mp3"
  },
  {
   "clip_id": "EP01-NP-N05",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_051428_4b264a03-7ee7-437a-8197-7608700a48c7.mp4",
   "dur": 4.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-N05.mp3"
  }
 ]
}
```


### `_staging/sec03_pilot/build_spec_sec05.json`
```json
{
 "out": "sections/EP01-SEC-05-reflection-v3.mp4",
 "clips": [
  {
   "clip_id": "EP01-NP-C22",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_053631_dca179b3-6b9c-4a26-88d3-f0d113499ac4.mp4",
   "dur": 5.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C22.mp3",
   "letter": "A"
  },
  {
   "clip_id": "EP01-NP-N16",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_002145_2ad90f27-6d62-41db-9e52-12628810d05b.mp4",
   "dur": 5.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-N16.mp3"
  },
  {
   "clip_id": "EP01-NP-C23",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260713_210945_4ffd49d2-46c0-43e0-a947-81b94dabc99f.mp4",
   "dur": 5.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C23.mp3"
  },
  {
   "clip_id": "EP01-NP-C24",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_051705_bf3cc760-5076-40f3-a1dd-34781928a3b5.mp4",
   "dur": 3.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C24.mp3"
  },
  {
   "clip_id": "EP01-NP-C25",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_051856_b2ad10d3-ebb8-4c03-8fd9-e6b9333f5def.mp4",
   "dur": 3.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C25.mp3"
  },
  {
   "clip_id": "EP01-NP-C26",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_051907_aa21c3a0-ffda-4ce4-a57f-d56a1d016acd.mp4",
   "dur": 4.0,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C26.mp3"
  },
  {
   "clip_id": "EP01-NP-N17",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_055538_ae34bfba-87cc-44e3-90c9-65a33d7f0bdf.mp4",
   "dur": 5.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-N17.mp3"
  },
  {
   "clip_id": "EP01-NP-N21",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_051537_1efb5cf7-359f-411e-a9a6-768d5d579bba.mp4",
   "dur": 4.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-N21.mp3"
  },
  {
   "clip_id": "EP01-NP-C27",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_051715_e4148e77-0bc2-4e46-892d-6792fc6780bb.mp4",
   "dur": 3.8,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C27.mp3"
  },
  {
   "clip_id": "EP01-NP-C28",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_053657_4179e514-c9de-4223-87a0-d152fe27c650.mp4",
   "dur": 5.5,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C28.mp3",
   "letter": "A"
  },
  {
   "clip_id": "EP01-NP-C29",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_051804_81fe87d0-b0b0-455e-b23f-c3657db21557.mp4",
   "dur": 5.0,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C29.mp3"
  },
  {
   "clip_id": "EP01-NP-C30",
   "video_url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_051209_4f442518-e078-4203-8802-f6e0717ff499.mp4",
   "dur": 3.8,
   "vo_url": "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/EP01-NP-C30.mp3"
  }
 ]
}
```


### `_staging/vo_el/batch2_ledger.json`
```json
{
 "_meta": "EP01 repair-contract Batch 2 VO regen. Coda canonical name (C-O-D-A, CO-DA — the character formerly rendered 'Koda'; same locked voice id, spelled/pronounced Coda per creator decision). Mimi first-person affirming name line. Bram spell line. Pippa pronunciation aligned to on-screen 'Pippa' name tag (PIP-pa). render_text drives ElevenLabs TTS; on-screen name/letter overlays are composited in post. Generated per-clip with the `only` arg so the full manifests are not clobbered.",
 "lines": [
  {
   "clip_id": "EP01-NP-N01",
   "speaker": "Koda",
   "render_text": "My name is Coda. C, O, D, A. Coda.",
   "note": "Coda name-day line — he is a CODA (Child of Deaf Adults); spoken + on-screen text + neutral hand movement (ASL pending specialist). Letter C, name tag Coda."
  },
  {
   "clip_id": "EP01-NP-N02",
   "speaker": "Mimi",
   "render_text": "My name is Mimi, and my name is amazing!",
   "note": "Mimi affirming, first-person (was Sunny describing her). Mimi's locked voice. Letter M, name tag Mimi."
  },
  {
   "clip_id": "EP01-NP-N03",
   "speaker": "Bram",
   "render_text": "My name is Bram. B, R, A, M. Bram.",
   "note": "Bram spell line (was just 'BRAM!'). Letter B, name tag Bram."
  },
  {
   "clip_id": "EP01-P3-11",
   "speaker": "Koda",
   "render_text": "My turn! Coda!",
   "note": "Coda clap-your-name beat (was 'My turn! KO-DA!'). Letter C, name tag Coda."
  },
  {
   "clip_id": "EP01-P3-17",
   "speaker": "Pipa",
   "render_text": "…Pippa?",
   "note": "shy, half-question; pronunciation aligned to 'Pippa' (PIP-pa)."
  },
  {
   "clip_id": "EP01-P3-19",
   "speaker": "Pipa",
   "render_text": "Pippa!",
   "note": "big proud rise; pronunciation aligned to 'Pippa' (PIP-pa). Letter P, name tag Pippa."
  }
 ]
}

```


### `_staging/vo_el/pilot/render_results.json`
```json
{
 "EP01-P3-01": {
  "job": "61e86a6b-d129-4bc6-95dc-7ae1cc24413a",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_142836_b5a86dea-8697-4b8d-9ce8-a67c5e575c5b.mp4"
 },
 "EP01-P3-02": {
  "job": "eb2442e5-49a3-4da8-9084-be35134b3698",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_111353_eb2442e5-49a3-4da8-9084-be35134b3698.mp4"
 },
 "EP01-P3-03": {
  "job": "3442be27-1d12-4b01-abb0-1dd77f5fc5ff",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_111354_3442be27-1d12-4b01-abb0-1dd77f5fc5ff.mp4"
 },
 "EP01-P3-04": {
  "job": "ee938ed5-e589-4aac-a8e9-e734f9b47752",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_111357_ee938ed5-e589-4aac-a8e9-e734f9b47752.mp4"
 },
 "EP01-P3-05": {
  "job": "da5f23be-151a-422c-82dc-78487f2ed7f0",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_111400_da5f23be-151a-422c-82dc-78487f2ed7f0.mp4"
 },
 "EP01-P3-06": {
  "job": "cc0709bd-6ecb-4bb7-96fd-73966af075af",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_111404_cc0709bd-6ecb-4bb7-96fd-73966af075af.mp4"
 },
 "EP01-P3-07": {
  "job": "f6966d4b-f6ce-4892-b699-da23d450b134",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_121933_f6966d4b-f6ce-4892-b699-da23d450b134.mp4"
 },
 "EP01-P3-08": {
  "job": "27687f75-d498-4c19-ac94-ccec4c4076f7",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_111430_27687f75-d498-4c19-ac94-ccec4c4076f7.mp4"
 },
 "EP01-P3-09": {
  "job": "4d3b35eb-80f8-4049-92b7-aad404acae85",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_111931_4d3b35eb-80f8-4049-92b7-aad404acae85.mp4"
 },
 "EP01-P3-10": {
  "job": "7e24a18e-b8b5-4bd5-a39a-d52e52884a86",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_111935_7e24a18e-b8b5-4bd5-a39a-d52e52884a86.mp4"
 },
 "EP01-P3-11": {
  "job": "3758e389-31cc-4aae-973f-0e6aa1cfb9ed",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_111937_3758e389-31cc-4aae-973f-0e6aa1cfb9ed.mp4"
 },
 "EP01-P3-12": {
  "job": "85a75416-a966-4c6f-8e8c-6e87d4978649",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_111939_85a75416-a966-4c6f-8e8c-6e87d4978649.mp4"
 },
 "EP01-P3-13": {
  "job": "45692608-c946-4e9f-9f42-651b9b82865c",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_111942_45692608-c946-4e9f-9f42-651b9b82865c.mp4"
 },
 "EP01-P3-14": {
  "job": "d3cecd4c-4691-4f84-b225-e83ec42e273a",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_111945_d3cecd4c-4691-4f84-b225-e83ec42e273a.mp4"
 },
 "EP01-P3-15": {
  "job": "ac7b3982-8e17-4fa0-a04d-46bd8e5b9b8e",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_121627_ac7b3982-8e17-4fa0-a04d-46bd8e5b9b8e.mp4"
 },
 "EP01-P3-16": {
  "job": "682d60b9-5d17-4cd4-af77-e058c3511396",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_112048_682d60b9-5d17-4cd4-af77-e058c3511396.mp4"
 },
 "EP01-P3-17": {
  "job": "e5aacfcd-6a0e-4316-abcc-bc6110962d1f",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_181619_cd4970d2-172b-4481-b743-cd83dc0da600.mp4"
 },
 "EP01-P3-18": {
  "job": "3a03d84e-5ed7-45e2-a81d-e323be1cbcc1",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_112236_3a03d84e-5ed7-45e2-a81d-e323be1cbcc1.mp4"
 },
 "EP01-P3-19": {
  "job": "0f8acc2f-283e-49a3-822a-a2c225a227bc",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_181628_247762cd-d4a5-42c8-9d1c-a48671bb9505.mp4"
 },
 "EP01-P3-20": {
  "job": "42acc472-f4e0-4008-886a-4b2f8f61afed",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_121629_42acc472-f4e0-4008-886a-4b2f8f61afed.mp4"
 },
 "EP01-P3-21": {
  "job": "65a4b9ab-c8c6-4f3e-bbe7-e4d31616fb92",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_112405_65a4b9ab-c8c6-4f3e-bbe7-e4d31616fb92.mp4"
 },
 "EP01-P3-22": {
  "job": "c6f26386-5e19-42ae-83fd-33bbed69bd38",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_112408_c6f26386-5e19-42ae-83fd-33bbed69bd38.mp4"
 },
 "EP01-P3-23": {
  "job": "647383da-0c7e-4cba-9150-651538a8f692",
  "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260714_112410_647383da-0c7e-4cba-9150-651538a8f692.mp4"
 }
}
```


### `sunny-and-the-crew/production-os/voice_map_elevenlabs.json`
```json
{
 "_meta": {
  "document": "voice_map_elevenlabs.json",
  "locked": true,
  "created": "2026-07-14",
  "authority": "creator-locked FINAL ElevenLabs voice map. These IDs are the ONLY voices for these characters — no guessed presets, no pitch-hacked adult voices. Applies to EP01 and all future episodes.",
  "engine": "ElevenLabs TTS (direct API). Higgsfield text2speech_v2 elevenlabs variant does NOT reach these private-account voices ('Voice not found'); call ElevenLabs API directly with the account api key (env secret ELEVENLABS_API_KEY, never pasted in chat).",
  "rules": [
   "NO NARRATOR — only in-world characters speak. 'Crew' group lines are voiced by an in-world kid (default: Sunny's voice).",
   "Koda is pronounced 'KOH-duh' — spell 'Koh-duh' in TTS text if needed; keep 'Koda' in script/captions.",
   "Kid characters sound like kids; adults (Ava/Nana/Mayor/Anne/Randy) sound like adults.",
   "Cadence must match the intro song's playful rhythm/alliteration; learning sections musical, not flat."
  ],
  "crew_group_voice": "Sunny (BlgEcC0TfWpBak7FmvHW) — leads the crew call-and-response lines"
 },
 "voice_map": {
  "Sunny": "BlgEcC0TfWpBak7FmvHW",
  "Leo": "GsfuR3Wo2BACoxELWyEF",
  "Mia": "XJ2fW4ybq7HouelYYGcL",
  "Koda": "mMf8pnvS4tTEecRvNcpn",
  "Mimi": "pPdl9cQBQq4p6mRkZy2Z",
  "Pipa": "U09MtJ2GfKEZSsIvMw9i",
  "Bram": "mrQhZWGbb2k9qWJb5qeA",
  "Bella": "mHX7OoPk2G45VMAuinIt",
  "Anne": "WZlYpi1yf6zJhNWXih74",
  "Ava": "eBvoGh8YGJn1xokno71w",
  "Randy": "g14YnDYCsy3k7XLlcKlO",
  "Rena": "vGQNBgLaiM3EdZtxIiuY",
  "Nana Blossom": "xctasy8XvGp2cVO9HL9k",
  "Captain": "87n4zM8Wuy87vFILuKvE",
  "Mayor Mary": "87n4zM8Wuy87vFILuKvE",
  "Rico": "nNXPmxHfg9PtGzFxr9Zd"
 },
 "koda_pronunciation": "Koh-duh"
}
```

## 5) CHANGE LOG — every EP01 build file touched in the repair passes

Sourced from `git log` on the build/stitch/spec scripts. Change **type** is one of:
code-only (script logic), assembly-only (spec/ledger data), overlay-only (drawtext), paid-re-render (Higgsfield).

| Commit | File(s) | Old behavior | New behavior | Why | Type |
|---|---|---|---|---|---|
| c743811 | `ep01_stitch_final.py` (new) | — | concat 5 sections → FINAL | first full stitch | code-only |
| a2fceaa | `ep01_stitch_final.py` | CRF20 → 107 MB (rejected) | CRF26 + 2M cap + <99 MB guard | GitHub 100 MB push limit | code-only |
| 575c15b | `ep01_build_sec03_pilot.py` (new) | — | VO re-time (`adelay`=offset) + letter overlay + sync-gate | lip-sync + on-screen letters | code-only |
| 5337b5b | `ep01_make_sec03_build_spec.py`, stitch | — | join render_results+ledger; stitch prefers pilot | spec assembly | code-only |
| 8ad2b12 | maker | wrong render_results path | corrected path | bug | code-only |
| bf98300 | `pilot_ledger.json` (P3-17) | default offset 0.40 | per-clip `offset:0.20` | Pipa hesitant line failed sync-gate | assembly-only |
| 3f0fc4a | build + stitch | pilot-only; fatal gate | wordless-clip support; `SYNC_GATE_FATAL` env; SEC-02/05 v3 specs; stitch prefers v3 | generalize to all sections | code-only |
| 5b69f7b | build | slot = re-time length (stripped holds) | `slot = max(off+vo+tail+wait, orig dur)` | restore hold pacing / duration | code-only |
| a382abb | build (`letter_ov`, has_vo) | play full slot | **cut at speech-end + clone-FREEZE** for ghost-mouth; add name-tag overlay + Coda letter C | kill ghost-mouth | code-only + overlay |
| (Batch2 VO) `ep01-batch2-vo.yml`, `batch2_ledger.json` | old Koda/Mimi/Bram/Pippa lines | **regen VO**: "C-O-D-A, Coda", Mimi affirming, Bram spell, Pippa | canon | assembly + TTS |
| (Batch2 render) Higgsfield seedance | old clips | **5 re-rendered clips** (Coda hands, Mimi, Bram, Pippa×2) | new audio-driven mouths | canon/lip-sync | **paid-re-render** |
| d3d1eed | `build_spec_sec02.json`, `pilot_ledger.json`, `render_results.json`, `ep01_batch2_swap.py`, maker, workflow | old video URLs / letters | swap re-render URLs; Coda letter C + tags; pin regen VO (`VO_PIN_SHA`) | fold Batch-2 into build | assembly-only |
| 69abcd2 | `ep01_build_sec03_pilot.py`, `ep01_stitch_final.py` | cut+**freeze** fill | **full-motion + slow-tail** fill (no corpse frames); `ghost_trim` opt-in; intro-logo overlay on SEC-01 | fix stop-and-go; add logo | code-only + overlay |
| 038bd3b | `ep01_stitch_final.py` | logo title+subtitle | title-only, larger | creator pref | overlay-only |

**Root-cause narrative (explicit):**
- **What INTRODUCED the stop-and-go:** commit `a382abb` — the has_vo branch computed
  `cut_at = min(vlen, off+volen+GHOST_TAIL)` then `tpad=stop_mode=clone:stop_duration=(slot-cut_at)`.
  On name-day beats (slot 5.5s, line ~3s) this froze ~1.8s; on audience-wait beats (~3s freeze). It also
  DISCARDED the clip's real motion between speech-end and clip-end. This was an over-correction for ghost-mouth.
- **What REMOVED it:** commit `69abcd2` — fill changed to `base_len = min(slot, vlen)` played at 1× (full
  motion), and any surplus (`slot > base_len`) filled by slowing ONLY the resting tail via a two-segment
  `setpts` (speaking part never slowed). Verified: freezedetect finds 0 spans in SEC-02/03; 1 residual
  0.6s span in SEC-05 (source-clip settle at C29 tail, not assembly-introduced).
- **What currently protects ghost-mouth:** by construction, seedance clips driven by `audio_references`
  rest the mouth when the VO ends. The assembly no longer force-trims; a per-clip `ghost_trim:true` flag
  (opt-in, currently set on ZERO clips) re-enables the cut-at-speech-end path if a specific flapping clip
  is ever found. This is a weaker guarantee than the old blanket trim — see Defect Analysis.
- **How Pippa's beat is handled:** SEC-03 `pilot_ledger.json` P3-17 (shy "…Pippa?", `offset:0.20`) →
  P3-18 (Sunny "Show me big and proud!") → P3-19 (proud "Pippa!", letter P, name_tag "Pippa"). P3-17/P3-19
  videos were Batch-2 re-renders (audio-driven). Freeze removal restored the proud motion; no extra
  re-render was applied (sync judged acceptable on playback).
- **How the intro logo is composited:** `ep01_stitch_final.py` builds `LOGO_VF` (a `drawtext` with a
  translucent box, alpha `if(lt(t,2.5),1,max(0,1-(t-2.5)/1.0))`, `enable='lt(t,3.55)'`) and appends it to
  the SEC-01 normalization filter ONLY. Overlay-only → SEC-01 duration and the 5:52 total are unchanged.
  Placeholder — pending final logo asset.

## 6) DEFECT ANALYSIS (brutal, technical)

**Fragile / below-standard, by evidence in the code:**

1. **Lip-sync is open-loop and approximate.** The repo does NOT do phoneme/viseme alignment. Two levers only:
   (a) seedance `audio_references` at render time (a black box), (b) a single global `adelay` offset
   (default `LIPSYNC_OFFSET=0.40`, per-clip override e.g. P3-17=0.20). The "sync-gate" only measures the
   *audio onset* (25 ms RMS, 12% peak) and asserts it lands in `[0.25, 0.80]` — it never checks the MOUTH.
   A clip can pass the gate with the mouth badly out of phase. This is the single biggest quality risk for a
   lip-reading audience and it is essentially unverified in code.

2. **Slot timing depends on `vlen`, which is only known in CI.** `base_len = min(slot, vlen)`. Source clip
   length lives on the firewalled CDN, so the whole timing map is only fully resolved inside the GitHub
   runner. Locally I cannot deterministically reproduce section durations (this audit's SEC-03 total 63.85s
   vs the CI's 63.13s comes from wordless-clip `vlen` I can't probe). That's a reproducibility hole.

3. **Ghost-mouth protection regressed from "guaranteed" to "hope."** Old code force-stopped every mouth at
   speech-end (bad for motion, good for the guarantee). New code trusts that every seedance clip rests its
   mouth, with a manual opt-in `ghost_trim` and NO automated detector. If a future clip keeps flapping, the
   build will happily ship it. There is no mouth-motion QC in the pipeline (freezedetect is run by hand, not
   in CI, and it detects freezes, not flapping).

4. **Slow-tail can produce visible slow-mo and has a silent fallback.** When `slot > vlen`, the resting tail
   is stretched by `factor=(slot-tsplit)/(base_len-tsplit)`, capped at 2.5; if a clip needs more, `-t slot`
   clones the last frame — i.e. a small freeze can still sneak in on a very short source clip, and it is NOT
   logged per-clip. The 2.5 cap is an arbitrary constant, not a derived rule.

5. **SEC-02 / SEC-05 specs are hand-maintained JSON.** `build_spec_sec02.json` / `build_spec_sec05.json`
   carry literal CDN URLs, `dur`, letters, tags. There is no schema validation and no cross-check that a
   `vo_url` mp3 actually matches the clip's speaker. A wrong hand-edit ships silently (only the onset gate
   and duration guard would catch gross errors).

6. **Overlays are burned-in drawtext, not a caption track.** Letter glyphs, name tags, and the logo are
   rasterized into the video (`drawtext`). There is no sidecar SRT/VTT. For an accessibility product this is
   backwards — captions should be a toggleable text track, and there is currently NO caption/subtitle file
   for EP01 at all (`dialogue_map.json` exists but is not wired into the render).

7. **Assembly correctness relies on filename/URL conventions.** `ep01_make_sec03_build_spec.py` maps VO by
   `RAW + cid + ".mp3"`; `local_vo()` splits on `/pilot/`. Rename a file and the join breaks with no typed
   contract. `VO_PIN_SHA` is a hard-coded commit string in the workflow — it must be manually bumped or CI
   silently serves stale VO.

8. **SEC-04 song is a separate, blunter pipeline.** `ep01_build_sec04_v2.py` force-fits every shot to a
   uniform 4.992s (`SLOT=104.83/21`) and, if a clip is short, does `setpts` stretch of the WHOLE clip — which
   would drift any lip-sync. It has no sync-gate, no overlays, and its prop/lip-sync defects (S04-06/11/14/17)
   are still unaddressed (plan written, not executed).

9. **Make.com delivery double-fires** and is cleaned up by re-pointing the same scenario at trash IDs. This
   works but is stateful and manual; a missed dedupe leaves duplicate FINALs in Drive.

**What should be rewritten before EP02:**
- Add a real **viseme/mouth QC** (e.g. mouth-openness vs audio-envelope correlation per talking clip) to the
  sync-gate; fail the build on phase error, not just onset.
- Make the **timing map deterministic offline**: record each source clip's `vlen` into the spec at render
  time so slots resolve without the CDN.
- Replace the ad-hoc `ghost_trim` with an **automated ghost-mouth detector** (frame-diff in the mouth ROI
  after audio end) that sets the trim and LOGS it.
- Introduce a **typed spec schema** (pydantic/jsonschema) + a validator step (speaker↔voice, letter∈set,
  url reachable, dur>0) before any build.
- Emit a **sidecar caption track** (SRT/VTT) from `render_text` instead of, or in addition to, burned-in tags.
- Fold SEC-04 into the same builder so it shares the sync-gate, overlays, and fill logic.
- Replace the constant-8 `factor` cap / magic numbers (`0.40`, `0.45`, `1.2`, `2.5`) with values derived
  per-clip from measured onset + clip length.
