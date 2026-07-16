# Sunny and the Crew — Claude working reference

Read this before doing any cartoon work. It exists so Claude stops re-asking for
things already known and stops repeating past mistakes. Ground truth for canon lives
in the JSON files here; this file is the index + the rules learned the hard way.

## Canon source files (never re-invent — read these)
- `characters.json` — the 7 locked crew + supporting cast. **Locked Higgsfield element IDs live here.** Never invent a character or guess an ID.
- `show_bible.json` — world, tone, premise.
- `locations.json` — approved settings.
- `production_rules.json` — hard rules (anatomy, adult-presence, etc.).
- `music_library.json`, `episode_template.json` — song + episode scaffolds.

## The 7 crew — locked element IDs (copy these into prompts as `[Name <<<id>>>]`)
| Name  | element_id |
|-------|------------|
| Sunny | a40e2d56-573f-4bf2-bdcd-28c64014fdb9 |
| Koda  | 7ce52e05-5bba-43f0-bb1e-8ca11974038c |  (canon spelling is **Koda**, not "Coda"; Koda is a boy, Sunny's brother)
| Mimi  | 7b005b4b-da34-4bac-908b-ceb76f9d6247 |  (smallest on screen; floral sneakers)
| Pipa  | 8849bdb4-d5a1-419d-9abc-c7e36188750c |  (Bram's twin)
| Bram  | e80f7f4d-2563-4d1a-b950-196df45dcbf7 |  (Pipa's twin)
| Leo   | ab579f47-e94f-406e-ae63-dd4fd6dd1b18 |  (glasses, rocket shirt)
| Mia   | 36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590 |  (EXACTLY two low pigtails)

Prompt hard-rules (from production_rules.json): one head, correct limb/finger counts,
no age words, never the word "Pixar" (trips the safety filter).

## Brand
- Real logo: `brand/logo-sunny-and-the-crew.png` (transparent PNG). Use as the intro title card, composited (held ~2.5s, fade ~1s). **The old text placeholder is retired.**

## Song-short build pipeline (proven, 5 songs delivered)
Delivered: Zoomy Zoom Freeze, Wiggle Wake Up, Move Like the Animal, Ten Little Fingers Folding Down, Scrub Scrub Scrub. Each is 720p / 16:9 / H.264+AAC in the Drive song-shorts folder.

Per song there are 3 scripts + a CI workflow (copy the newest as the template):
1. `scripts/<song>_make_spec.py` — reads exact audio duration, emits `_staging/<song>/shot_spec.json` (14–20 equal-length shots across the song's OWN sections; cast, action, overlays, logo flag).
2. Render (via a background subagent, see rules): 1 start image/shot (`nano_banana_2`) then 1 video/shot (`seedance_2_0`, 8s). Results → `_staging/<song>/{img,video}_results.json`.
3. `scripts/<song>_build.py` — CI assembler: downloads clips, fills each beat-slot with full motion + slow-tail (never a corpse freeze), burns text overlays, composites the logo, concats, muxes audio to **AAC + faststart**. Triggered by committing `_staging/<song>/build.trigger`; workflow `.github/workflows/<song>-build.yml` commits the finished mp4.
4. QC: extract one frame per shot into a montage, eyeball order/overlays/faces/logo.
5. Deliver: Make scenario **5610723** (GET commit-pinned raw GitHub URL → Drive upload) into folder `10xEh7jYO_z55-t2Gr82ON3C1jPvINgTg` (conn 7476809). **It double-fires every time — always trash the duplicate so exactly one file remains.**

Cost: `seedance_2_0` = **36 credits/video**; a 15-shot song ≈ 540 credits + images. Check `balance` before a batch.

## Hard-won rules (do NOT relearn these the expensive way)
- **Render text yourself.** seedance bakes MISSPELLED words into frames (it produced "FREEEZE!"). Add all on-screen text as clean drawtext overlays; use `fit_fs()` so long lines don't overflow; use a real curly apostrophe `’` so it doesn't break the drawtext arg.
- **Audio → AAC + faststart.** MP3-in-MP4 won't play in Google Drive / Apple. Always re-encode audio to AAC on the final mux.
- **Logo needs `-loop 1`.** A PNG is a single frame; without `-loop 1 -t <len>` it flashes for one frame then vanishes.
- **Copy a build script → fix EVERY path.** The song name appears in the spec path, the video_results path, the audio path, the work dir, and print strings. A missed `video_results` path made the animal build read wiggle's data and fail CI.
- **Rendering subagent, not the main loop.** Firing 15–20 renders inline echoes giant prompts and burns tokens. Delegate to a subagent that returns only counts + URLs.
- **Subagents must pace by POLLING, not `sleep`.** A background `sleep` makes the subagent yield and stall; it then needs manual resumes. Tell it: never background-sleep, pace by calling `job_display` a few times in a row.
- **One render per shot.** Fix defects at the assembly level (overlays, logo, timing) with no re-render. Re-render a single shot only for a genuine content defect (e.g., a baked animal), never the whole song.
- **Content filter:** seedance refuses **any child-in-a-bath/tub** frame. For hygiene/bath songs, keep kids fully dressed and teach via a sink + **washing a toy** (e.g., a rubber duck for "scrub tummy/toes"). Do not reword to sneak the rejected framing through.
- **No audio attached = stop and ask.** Never render blind; the duration locks everything.
- **Report defects honestly** (baked typos, stray animals, clipped outro) instead of shipping silently.

## Working style with Justin (see song-shorts/SONG_WORKFLOW.md for the full contract)
- Broad prompt → propose a small scoped plan first, don't dump.
- Reusable output → write a repo file, not a wall of chat text.
- During long renders → stay quiet; surface only the finished deliverable or a real blocker.
