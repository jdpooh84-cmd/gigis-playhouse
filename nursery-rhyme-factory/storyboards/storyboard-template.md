# Storyboard Template
## Gigi's Playhouse — Scene Planning Guide

---

## HOW TO USE THIS TEMPLATE

1. Copy `schemas/scene-schema.json` for validation reference
2. Complete the header information below
3. Fill in one scene object per row of the table
4. Generate full JSON using the Claude prompt at the bottom of this file
5. Save output as `storyboards/{concept-slug}-storyboard.json`

---

## STORYBOARD HEADER

```
Video Package ID: GP-___
Concept Slug: ___
Song Title: ___
Total Runtime Target: ___ seconds
Scene Count Target: 28-32
Created: ___
```

---

## SCENE PLANNING TABLE

Use this table to plan scenes before generating JSON. One row = one scene.

| # | SCN-ID | Start | End | Duration | Lyric | Story Beat | Emotion | Characters | Location | Thumb? |
|---|--------|-------|-----|----------|-------|-----------|---------|-----------|----------|--------|
| 1 | SCN-001 | 0:00 | 0:08 | 8s | (intro) | intro | happy | Gigi | bedroom | No |
| 2 | | | | | | | | | | |
| 3 | | | | | | | | | | |
| ... | | | | | | | | | | |

**Rules:**
- Thumbnail candidates: mark max 3 scenes
- Chorus scenes: mark all with chorus_flag = true
- Bridge scenes: mark for tempo change in audio_cue
- Duration: 4–8 seconds typical; chorus scenes can be 15–20s if looped

---

## TIMING CALCULATION GUIDE

For a 270-second (4:30) video:

| Section | Target Duration | Typical Scene Count |
|---------|----------------|---------------------|
| Intro | 20s | 3 scenes |
| Verse 1 | 35s | 5 scenes |
| Chorus 1 | 25s | 3-4 scenes |
| Verse 2 | 35s | 5 scenes |
| Chorus 2 | 25s | 3-4 scenes |
| Bridge | 30s | 3 scenes |
| Verse 3 | 35s | 5 scenes |
| Chorus 3 | 25s | 3-4 scenes |
| Outro | 40s | 4-5 scenes |
| **Total** | **270s** | **~35 scenes** |

Adjust scene count per section based on lyric density. Long lyric lines = longer scenes.

---

## LOCATION ASSET PLAN

Before building the storyboard, identify all unique backgrounds needed:

| Location | Scenes Used | Description | Asset Status |
|----------|-------------|-------------|--------------|
| Gigi's bedroom | SCN-001 – 003, 021+ | Pink walls, stars mobile | To Create |
| Boo's bedroom | SCN-004 – 020, 027+ | Blue/yellow, star mobile | To Create |
| Kitchen | SCN-016 | Yellow walls, simple stove | To Create |
| Outro card | SCN-030 | Channel branding | To Create |

**Rule:** Minimize unique locations. Every unique location = separate background asset to create.

---

## CHARACTER EXPRESSION LIBRARY

For each character, plan their expressions before writing scene JSON:

### Gigi (Protagonist)
- `happy`: Big open smile, eyes bright, body upright
- `worried`: Slightly furrowed brow, mouth slightly open, leaning forward
- `determined`: Fists on hips, chin up, focused eyes
- `loving`: Soft smile, eyes warm, arms reaching out or hugging
- `surprised`: Eyes wide, mouth open O shape, eyebrows up
- `proud`: Big smile, hands up or clapping, standing tall
- `teaching`: Looking at camera, finger pointing, warm smile

### Boo (Baby sibling)
- `sick`: Droopy eyes, red nose, slight frown, slumped
- `sad`: Lower lip out, watery eyes, arms crossed or reaching
- `hopeful`: Eyes widening slightly, starting to perk up
- `better`: Smile returning, more upright, eyes brighter
- `happy`: Big open laugh, arms raised
- `sleeping`: Eyes closed, relaxed expression, soft

### Mama
- `nurturing`: Soft eyes, gentle smile, leaning toward character
- `loving`: Warm full smile, arms open or reaching
- `proud`: Approving smile, slight nod

---

## CLAUDE PROMPT: GENERATE STORYBOARD JSON

```
Generate a complete scene-by-scene storyboard JSON for this nursery rhyme video.

VIDEO PACKAGE:
- Concept: [CONCEPT SUMMARY]
- Total runtime: [SECONDS] seconds
- Characters: [CHARACTER LIST]
- Settings: [SETTINGS LIST]

LYRICS:
[PASTE FULL LYRICS WITH SECTION MARKERS]

SCENE PLANNING NOTES:
[PASTE COMPLETED TABLE FROM ABOVE — or leave blank for Claude to determine]

SCHEMA: Each scene must include all fields from this schema:
{
  scene_id, start_time, end_time, duration_seconds, lyrics_line, 
  chorus_flag, story_beat, educational_goal, emotion, characters [array],
  location, background_description, camera_direction, action, prop_list,
  visual_prompt, thumbnail_candidate, caption_text, transition_type,
  repeatable_loop_flag, audio_cue, color_palette_hint
}

VISUAL PROMPT RULES:
- Every visual_prompt must begin with "3D cartoon"
- Include: character description, action, setting, color palette, mood
- Max 3 sentences per visual_prompt
- Never reference copyrighted characters or properties
- Always describe original Gigi's Playhouse characters

THUMBNAIL CANDIDATES:
- Mark exactly 2-3 scenes as thumbnail_candidate: true
- Choose scenes with: most expressive emotion, most recognizable action, clearest visual story

OUTPUT:
Valid JSON only. Array of scene objects. No commentary outside the JSON.
Total scenes: [TARGET COUNT]
```

---

## POST-GENERATION CHECKLIST

After receiving JSON from Claude:

- [ ] Paste into jsonlint.com — must be valid JSON
- [ ] Count total scenes — within range of target?
- [ ] Check timing — does start_time/end_time add up to total runtime?
- [ ] Check thumbnail candidates — exactly 2-3 marked?
- [ ] Check chorus scenes — all marked with chorus_flag: true?
- [ ] Check visual_prompts — all begin with "3D cartoon"?
- [ ] Check educational_goals — appropriate for age 2-5?
- [ ] Check emotion values — all from approved enum?
- [ ] Check location values — all from approved enum or custom?
- [ ] Save as `storyboards/{concept-slug}-storyboard.json`
