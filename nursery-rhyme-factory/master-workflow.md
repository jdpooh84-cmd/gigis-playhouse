# Master Workflow — Nursery Rhyme Video Factory

End-to-end sequential production pipeline. Every step is numbered, every tool is identified.

---

## PHASE 0: Research (Once, then periodic refresh)

**Step 0.1 — Apify: Scrape competitor channel data**
- Tool: Apify (YouTube Scraper actor)
- Input: seed channel URLs + keyword list
- Output: `/research/competitor-data.json` with titles, durations, view counts, upload dates
- See: `apify/apify-scrape-spec.md`

**Step 0.2 — Perplexity: Validate trending topics**
- Tool: Perplexity (web search)
- Query: "most popular nursery rhyme topics for toddlers 2025"
- Query: "top YouTube nursery rhyme video formats by views"
- Output: list of 10 validated scenario types, ranked

**Step 0.3 — Claude Code: Synthesize research into concept matrix**
- Tool: Claude Code
- Input: competitor JSON + Perplexity notes
- Output: `research/concept-matrix.md` — ranked list of 20 video concepts with scenario type, emotional hook, educational goal, and difficulty score

---

## PHASE 1: Concept Selection

**Step 1.1 — Human review: Pick concept from matrix**
- Tool: Human (you)
- Input: `research/concept-matrix.md`
- Output: selected concept slug (e.g., `sick-song-v1`)
- Checkpoint: confirm character set, scenario, age target, runtime target

**Step 1.2 — Claude Code: Expand concept into brief**
- Tool: Claude Code
- Prompt template: `prompts/concept-generator.md`
- Input: concept slug + scenario type
- Output: `video-pack/{concept-slug}-brief.md`
- Contains: full concept description, learning objective, emotional arc, character list, setting, runtime target

---

## PHASE 2: Lyric & Song Creation

**Step 2.1 — Claude Code: Generate full lyrics**
- Tool: Claude Code
- Prompt template: `prompts/lyrics-generator.md`
- Input: brief from Step 1.2
- Output: `lyrics/{concept-slug}-lyrics.md`
- Contains: intro verse, 3–4 verses, chorus (×3 minimum), bridge, outro
- Validate: max 6-word lines, rhyme scheme consistent, chorus repeatable, age-appropriate vocabulary

**Step 2.2 — Claude Code: Generate Suno prompt pack**
- Tool: Claude Code
- Input: lyrics + brief
- Output: `suno/{concept-slug}-suno-prompt.md`
- Contains: style prompt, BPM, vocal type, instrument palette, energy arc
- See: `suno/suno-prompts.md` for formula

**Step 2.3 — Suno: Generate music track**
- Tool: Suno
- Input: paste from `suno/{concept-slug}-suno-prompt.md`
- Output: MP3/WAV audio file — save to `output/{concept-slug}/audio/`
- Generate 3 variants, select best
- Review: is the vocal clear? Is the tempo right for toddlers? Does the chorus land?

---

## PHASE 3: Scene Planning

**Step 3.1 — Claude Code: Generate scene-by-scene storyboard JSON**
- Tool: Claude Code
- Input: lyrics + audio duration (from Suno output)
- Schema: `schemas/scene-schema.json`
- Output: `storyboards/{concept-slug}-storyboard.json`
- Contains: one scene object per lyric phrase, all schema fields populated

**Step 3.2 — Human review: Validate storyboard**
- Tool: Human
- Check: scene count matches audio sections, thumbnail candidate scenes flagged, no scene exceeds 8 seconds without transition, loop flags set on chorus scenes

---

## PHASE 4: Asset Prompting

**Step 4.1 — Claude Code: Generate visual prompts from storyboard**
- Tool: Claude Code
- Input: `storyboards/{concept-slug}-storyboard.json`
- Output: `output/{concept-slug}/visual-prompts.md`
- For each scene: extract `visual_prompt` field, format for image AI input
- Batch: group by location (fewer unique backgrounds = less production work)

**Step 4.2 — Human: Generate/source visual assets**
- Tool: OPTIONAL — AI image generator (Midjourney, DALL-E, Firefly)
- Input: visual prompts from Step 4.1
- Output: images saved to `output/{concept-slug}/assets/`
- Note: OpenClaw is offline; use any available image AI or stock 3D assets

---

## PHASE 5: Metadata & Packaging

**Step 5.1 — Claude Code: Generate title/description/tags**
- Tool: Claude Code
- Prompt template: `metadata/title-description-prompts.md`
- Input: brief + lyrics + competitor title patterns from research
- Output: `output/{concept-slug}/metadata.json`
- Contains: 3 title variants, YouTube description (full), 20 tags, playlist name

**Step 5.2 — Claude Code: Generate thumbnail brief**
- Tool: Claude Code
- Input: storyboard thumbnail_candidate flags + metadata
- Output: `metadata/thumbnail-brief.md` (concept-specific version in output folder)
- Contains: scene reference, text overlay, color palette, character pose, emotion

**Step 5.3 — Human: Design thumbnail**
- Tool: Canva, Photoshop, or any design tool
- Input: thumbnail brief
- Output: `output/{concept-slug}/thumbnail.png` (1280×720)

---

## PHASE 6: Assembly & Upload

**Step 6.1 — Claude Code: Generate upload checklist**
- Tool: Claude Code
- Output: `output/{concept-slug}/upload-checklist.md`
- Contains: all required files, validation checks, publish settings

**Step 6.2 — Human: Video assembly**
- Tool: Video editor (any)
- Input: audio, visual assets, storyboard JSON as timing guide
- Output: final MP4

**Step 6.3 — Human: YouTube upload**
- Input: metadata.json, thumbnail.png, final MP4
- Actions: set title, description, tags, thumbnail, playlist, end screens, cards

---

## PHASE 7: Automation (Make.com)

**Step 7.1 — Make.com: Configure scenario**
- Tool: Make.com
- See: `make/make-scenario-spec.md`
- Automates: Steps 1.2, 2.1, 2.2, 3.1, 5.1, 6.1
- Trigger: webhook or new Airtable/Google Sheets row

**Step 7.2 — Make.com: Test run with first video concept**
- Input: concept slug = `sick-song-v1`
- Validate all outputs land in correct folders
- Confirm Claude API calls return structured JSON

---

## REUSE PROTOCOL

After first video is complete:
1. Copy `storyboards/sick-song-storyboard.json` → rename for new concept
2. Run Make.com scenario with new concept row
3. Replace concept-specific fields only
4. Reuse all character assets, location assets where possible
5. New Suno prompt for new song only

**Target batch cadence:** 1 video per week once pipeline is validated.
