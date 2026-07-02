# 24-Hour Action Plan
## Gigi's Playhouse — First Video Pipeline Sprint

**Start date:** Today  
**Goal:** One complete video package, audio track generated, ready for visual production

---

## HOUR 1–2: SETUP & RESEARCH

### Hour 1 (0:00–1:00)
**Goal:** Environment ready, research running

- [ ] **0:00–0:15** — Read `README.md` and `master-workflow.md` fully. Understand the complete pipeline.
- [ ] **0:15–0:30** — Open Apify. Search store for "YouTube Scraper". Select top-rated actor.
- [ ] **0:30–0:45** — Configure Apify scrape per `apify/apify-scrape-spec.md` (Phase 2: Quick-start config). Launch scrape for 3 search terms. Let it run in background.
- [ ] **0:45–1:00** — Open Perplexity. Run all 4 research queries from `research/research-plan.md` Phase 2. Copy responses to `research/perplexity-notes.md` (create this file).

### Hour 2 (1:00–2:00)
**Goal:** Research reviewed, first video confirmed, Suno account ready

- [ ] **1:00–1:30** — Download Apify results (CSV). Open in spreadsheet. Sort by view_count. Scan top 20 titles. Fill in `research/competitor-analysis-template.md` with key findings.
- [ ] **1:30–1:45** — Confirm GP-001 ("Sick Song") as first video based on research. Note any title or duration adjustments needed.
- [ ] **1:45–2:00** — Open Suno account. Verify you can use Custom Mode. Familiarize yourself with the interface. Do NOT generate yet.

**CHECKPOINT:** Research complete. GP-001 confirmed. Suno ready.

---

## HOUR 3–6: AUDIO PRODUCTION

### Hour 3 (2:00–3:00)
**Goal:** Lyrics reviewed and Suno prompt ready to paste

- [ ] **2:00–2:20** — Read `lyrics/sick-song-lyrics.md` fully. Read out loud — does it flow naturally?
- [ ] **2:20–2:40** — Open `suno/sick-song-suno-prompt.md`. Read step-by-step instructions.
- [ ] **2:40–3:00** — Make any minor lyric adjustments based on your read-aloud test. Edit the SUNO FORMATTING section at the bottom of the lyrics file if needed.

### Hour 4 (3:00–4:00)
**Goal:** First Suno generation complete

- [ ] **3:00–3:10** — Open Suno → Custom Mode
- [ ] **3:10–3:15** — Paste style prompt from `suno/sick-song-suno-prompt.md` → STEP 1
- [ ] **3:15–3:20** — Paste lyrics from STEP 2 of same file
- [ ] **3:20–3:25** — Set title from STEP 3
- [ ] **3:25–3:40** — Generate FIRST variant. Listen completely while it runs.
- [ ] **3:40–4:00** — Generate SECOND variant. Compare to first.

### Hour 5 (4:00–5:00)
**Goal:** Best audio variant selected

- [ ] **4:00–4:20** — Generate THIRD variant.
- [ ] **4:20–4:50** — Listen to all 3 variants on PHONE SPEAKER (toddlers hear content on TV/phone speakers). Use quality checklist from `suno/suno-prompts.md`.
- [ ] **4:50–5:00** — Select best variant. Note variant ID. Download as MP3/WAV.

### Hour 6 (5:00–6:00)
**Goal:** Audio issues resolved OR accepted, audio saved

- [ ] **5:00–5:15** — If best variant has issues: try backup style prompt from `suno/sick-song-suno-prompt.md`. Generate 2 more.
- [ ] **5:15–5:45** — Create folder: `output/sick-song-v1/audio/`. Save selected audio as `sick-song-v1-FINAL.mp3`.
- [ ] **5:45–6:00** — Note the exact runtime of the selected audio (in seconds). Update `video-pack/first-video-package.json` with actual runtime.

**CHECKPOINT:** Audio track complete and saved. Runtime confirmed.

---

## HOUR 7–12: STORYBOARD & VISUAL PREP

### Hour 7 (6:00–7:00)
**Goal:** Storyboard validated against actual audio timing

- [ ] **6:00–6:30** — Open `storyboards/sick-song-storyboard.json`. Compare scene timings to actual audio. Adjust any scenes where timing is off.
- [ ] **6:30–7:00** — Walk through the storyboard while listening to the audio. Does each scene match the music section? Flag any scenes that need adjustment.

### Hour 8 (7:00–8:00)
**Goal:** Visual prompts extracted and organized

- [ ] **7:00–7:30** — Extract all `visual_prompt` fields from `storyboards/sick-song-storyboard.json`. Group by location (bedroom, kitchen, outro).
- [ ] **7:30–8:00** — Create file `output/sick-song-v1/visual-prompts.md`. Organize prompts by location group. Add production priority notes (which scenes are most important to get right).

### Hour 9 (8:00–9:00)
**Goal:** Character design decisions locked

- [ ] **8:00–8:30** — Write brief character design specs for Gigi and Boo based on descriptions in `README.md` and `video-pack/first-video-brief.md`. Save to `output/sick-song-v1/character-specs.md`.
- [ ] **8:30–9:00** — If you have access to an AI image generator: Generate 2-3 test images of Gigi using the visual prompt from SCN-002 (Gigi waking up). Adjust description until character looks right. This design is permanent — all future videos use this Gigi.

### Hour 10 (9:00–10:00)
**Goal:** Thumbnail design started

- [ ] **9:00–9:30** — Open Canva (or design tool). Set up 1280×720 canvas. Set background to #FFD700.
- [ ] **9:30–10:00** — Design thumbnail based on `metadata/thumbnail-brief.md` GP-001 spec. Focus on: character placement, text "FEEL BETTER!", color palette.

### Hour 11 (10:00–11:00)
**Goal:** Thumbnail complete + metadata finalized

- [ ] **10:00–10:30** — Finalize thumbnail. Test at small size (shrink browser window or export and view at 120px). Make adjustments.
- [ ] **10:30–11:00** — Open `video-pack/first-video-package.json`. Select final YouTube title from the 3 options. Confirm description, tags, and playlist. Create `output/sick-song-v1/upload-metadata.json`.

### Hour 12 (11:00–12:00)
**Goal:** Make.com setup begins

- [ ] **11:00–11:30** — Open Make.com. Create new scenario. Add webhook trigger. Test webhook with sample payload.
- [ ] **11:30–12:00** — Add first Claude API module (Module 3 from `make/make-scenario-spec.md`). Set up API key. Test with brief generator.

**CHECKPOINT:** Storyboard locked. Thumbnail complete. Make.com partially configured. Visual prompts ready.

---

## HOUR 13–18: VISUAL PRODUCTION & AUTOMATION

### Hour 13–14 (12:00–14:00)
**Goal:** Core scene images generated

- [ ] Generate visual assets for priority scenes (in order of importance):
  1. SCN-007: Boo sick face (close-up) — defines the character's sick expression
  2. SCN-010: Gigi chorus pose (arms wide, facing camera) — reused in all 3 choruses
  3. SCN-017: Mama entrance (tender, loving) — sets the comfort tone
  4. SCN-020: Family around bed (bridge — warmest scene)
  5. SCN-029: Final resolution (Gigi + Boo waving) — thumbnail base

### Hour 15–16 (14:00–16:00)
**Goal:** Remaining scenes covered

- [ ] Generate visual assets for remaining scenes, grouped by location
- [ ] Bedroom scenes first (most scenes happen here)
- [ ] Kitchen scene (SCN-016) — can be simple
- [ ] Outro card (SCN-030) — channel branding

### Hour 17 (16:00–17:00)
**Goal:** Make.com scenario expanded

- [ ] Add remaining Claude API modules (4, 5, 6, 7, 8) per spec
- [ ] Connect Google Drive module
- [ ] Test scenario end-to-end with "sick-song-v1" as input

### Hour 18 (17:00–18:00)
**Goal:** All assets organized, ready for video assembly

- [ ] Rename all generated image files to match scene IDs: `SCN-001.png`, `SCN-002.png`, etc.
- [ ] Save all to `output/sick-song-v1/assets/`
- [ ] Cross-reference with storyboard — every scene must have an image

**CHECKPOINT:** All assets generated and named. Make.com scenario functional. Ready to assemble video.

---

## HOUR 19–24: VIDEO ASSEMBLY & QUALITY

### Hour 19–21 (18:00–21:00)
**Goal:** Video assembled

- [ ] Open video editor (any — CapCut, DaVinci Resolve, Adobe Premiere, iMovie)
- [ ] Import audio track: `output/sick-song-v1/audio/sick-song-v1-FINAL.mp3`
- [ ] Import all scene images
- [ ] Place images to timeline using storyboard timing from `storyboards/sick-song-storyboard.json`
- [ ] Add transitions per `transition_type` field in each scene
- [ ] Add caption text per `caption_text` field
- [ ] Add outro card (SCN-030)

### Hour 22 (21:00–22:00)
**Goal:** Video reviewed and fixes applied

- [ ] Watch complete video once — note any issues
- [ ] Check: do transitions feel right?
- [ ] Check: do captions match audio?
- [ ] Check: is the bridge noticeably slower/calmer than choruses?
- [ ] Check: does the ending feel complete?
- [ ] Apply fixes

### Hour 23 (22:00–23:00)
**Goal:** Export complete

- [ ] Export video as MP4, 1080p minimum
- [ ] File: `output/sick-song-v1/sick-song-v1-FINAL.mp4`
- [ ] Watch exported file fully (not preview) on phone speaker
- [ ] Confirm thumbnail renders correctly at export quality

### Hour 24 (23:00–24:00)
**Goal:** Upload to YouTube OR queue for upload

- [ ] Upload `sick-song-v1-FINAL.mp4` to YouTube Studio
- [ ] Paste title from `first-video-package.json` (primary title)
- [ ] Paste description from `first-video-package.json`
- [ ] Add all 20 tags from `first-video-package.json`
- [ ] Upload thumbnail `sick-song-v1-thumbnail.png`
- [ ] Set: Made for Kids = Yes, Category = Education
- [ ] Add to playlist: "Gigi's Playhouse — Nursery Rhymes & Learning Songs"
- [ ] Schedule or publish
- [ ] Mark `status` in `first-video-package.json` as "published"

**CHECKPOINT: FIRST VIDEO COMPLETE.**

---

## WHAT TO DO IF YOU FALL BEHIND

### Audio takes too long (Suno)
- Don't over-generate. Pick the best of 3 and move on.
- The audio doesn't have to be perfect for a first video — it has to be good enough.
- If Suno is down: use any royalty-free children's music bed + record your own vocals reading the lyrics (placeholder).

### Visual assets take too long
- Use 1 background image per location with character overlays — don't generate unique backgrounds per scene.
- Animated GIFs/loops work for repeat chorus scenes.
- Skip scenes you don't have images for — show previous image slightly longer.

### Video assembly takes too long
- Use CapCut — it's the fastest simple video editor.
- Simplest valid edit: image slideshow timed to lyrics. No fancy transitions.
- The first video is a proof of concept — prioritize completion over polish.

### Make.com takes too long
- Skip Make.com for Day 1. Run the pipeline manually.
- Come back to Make.com setup after the first video is published.
- The video package is fully usable without automation.

---

## SUCCESS CRITERIA FOR 24 HOURS

Minimum viable:
- [ ] Audio track generated and saved
- [ ] Storyboard confirmed
- [ ] 10+ scenes have visual assets
- [ ] Thumbnail complete
- [ ] Metadata finalized

Good:
- [ ] All 30 scenes have visual assets
- [ ] Video fully assembled
- [ ] Uploaded to YouTube (even as unlisted)

Excellent:
- [ ] Video published
- [ ] Make.com scenario functional
- [ ] Second concept ready to queue
