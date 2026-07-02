# Gigi's Playhouse — Nursery Rhyme Video Factory

A production-ready pipeline for generating original nursery rhyme videos for toddlers aged 2–5. Built on Claude Code, Apify, Make.com, Perplexity, and Suno.

## What This Is

A reusable "story-song factory" that converts a single concept trigger into a complete video package: lyrics, scene plan, Suno music prompt, thumbnail brief, YouTube metadata, and upload checklist — all original, all optimized for the 2–5 age window.

## Tool Roles

| Tool | Role |
|------|------|
| **Claude Code** | Content generation engine: lyrics, scene JSON, prompts, metadata |
| **Apify** | Competitor research: YouTube scraping for title patterns, duration data, engagement signals |
| **Make.com** | Automation layer: webhook triggers, Claude API calls, file saves, review checkpoints |
| **Perplexity** | Research augmentation: trend queries, parenting topic research, SEO validation |
| **Suno** | AI music generation: melody and vocal track from structured prompt |

## Project Structure

```
nursery-rhyme-factory/
├── README.md                    ← this file
├── master-workflow.md           ← end-to-end sequential workflow
├── research/
│   ├── research-plan.md         ← Apify + Perplexity research strategy
│   └── competitor-analysis-template.md
├── prompts/
│   ├── concept-generator.md     ← Claude prompts for concept creation
│   └── lyrics-generator.md      ← Claude prompts for full lyric generation
├── schemas/
│   ├── scene-schema.json        ← scene object schema
│   └── video-package-schema.json ← full video package schema
├── output/                      ← generated packages land here
├── make/
│   └── make-scenario-spec.md    ← Make.com module blueprint
├── apify/
│   └── apify-scrape-spec.md     ← Apify actor config + output spec
├── video-pack/
│   ├── first-video-brief.md     ← production brief for first video
│   └── first-video-package.json ← complete first video package
├── metadata/
│   ├── thumbnail-brief.md       ← visual thumbnail design spec
│   └── title-description-prompts.md
├── lyrics/
│   ├── lyrics-template.md       ← reusable lyric structure template
│   └── sick-song-lyrics.md      ← first video full lyrics
├── suno/
│   ├── suno-prompts.md          ← Suno formula library
│   └── sick-song-suno-prompt.md ← ready-to-paste Suno prompt
└── storyboards/
    ├── storyboard-template.md   ← scene-by-scene production guide
    └── sick-song-storyboard.json ← first video full storyboard JSON
```

## Quick Start (24-Hour Launch)

1. Run Apify scrape (see `apify/apify-scrape-spec.md`) — 30 min
2. Review competitor data, confirm first video concept — 15 min
3. Paste `sick-song-suno-prompt.md` into Suno, generate track — 20 min
4. Use `video-pack/first-video-package.json` as storyboard reference
5. Configure Make.com scenario (see `make/make-scenario-spec.md`) — 60 min
6. Generate thumbnail per `metadata/thumbnail-brief.md`
7. Upload assets, publish with metadata from `first-video-package.json`

## Non-Negotiable Rules

- Never copy copyrighted songs, lyrics, or characters
- All character names and universes are original
- Language complexity: 2–5 year old vocabulary only
- Every video must have a clear emotional or educational beat
- All assets must be batch-reusable as templates

## Character Universe: Gigi's Playhouse

| Character | Role |
|-----------|------|
| Gigi | 3-year-old girl, curious, loving, main protagonist |
| Boo | Baby sibling, expressive, often in peril/need |
| Mama | Warm, nurturing, appears in care/comfort scenes |
| Dada | Playful, strong, appears in activity/adventure scenes |
| Pip | Small stuffed animal bear, Gigi's best friend |
| Sunny | Yellow puppy, energetic, appears in outdoor/play scenes |
