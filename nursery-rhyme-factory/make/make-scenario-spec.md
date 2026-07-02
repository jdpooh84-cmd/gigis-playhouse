# Make.com Scenario Specification
## Gigi's Playhouse — Video Package Generator

---

## SCENARIO OVERVIEW

**Scenario name:** GP — Video Package Generator  
**Trigger:** Webhook (new concept) OR Google Sheets row created  
**Output:** Complete video package (lyrics, scene plan, Suno prompt, metadata, upload checklist)  
**Estimated runtime:** 3–5 minutes per video package  

---

## MODULE SEQUENCE

```
[TRIGGER] → [PARSE INPUT] → [CLAUDE: BRIEF] → [CLAUDE: LYRICS] → 
[CLAUDE: SUNO PROMPT] → [CLAUDE: SCENES] → [CLAUDE: METADATA] → 
[CLAUDE: CHECKLIST] → [SAVE OUTPUTS] → [NOTIFY HUMAN]
```

---

## MODULE 1: TRIGGER

### Option A: Webhook Trigger
**Module:** Webhooks > Custom webhook  
**Method:** POST  
**Expected payload:**

```json
{
  "concept_slug": "sick-song-v1",
  "scenario_type": "sick_day",
  "concept_summary": "Gigi takes care of sick baby Boo and the whole family sings about how to help someone feel better",
  "characters": ["Gigi", "Boo", "Mama"],
  "settings": ["bedroom", "kitchen"],
  "target_age_min": 2,
  "target_age_max": 5,
  "runtime_target_seconds": 270,
  "priority": "first_video"
}
```

### Option B: Google Sheets Trigger
**Module:** Google Sheets > Watch Rows  
**Sheet:** "Video Concepts"  
**Watch for:** New row added  
**Columns:**
- A: concept_slug
- B: scenario_type  
- C: concept_summary
- D: characters (comma-separated)
- E: settings (comma-separated)
- F: target_age_min
- G: target_age_max
- H: runtime_target_seconds
- I: status (set to "queued" to trigger)

**Filter:** Only process rows where column I = "queued"

---

## MODULE 2: DATA PARSER / ROUTER

**Module:** Tools > Set Variables  
**Purpose:** Normalize inputs, set defaults, prepare for Claude calls

**Variables to set:**
```
concept_slug = {{trigger.concept_slug}}
scenario_type = {{trigger.scenario_type}}
concept_summary = {{trigger.concept_summary}}
characters = {{trigger.characters}}
runtime_seconds = {{trigger.runtime_target_seconds}} OR 270
timestamp = {{now}}
output_folder = "GP-{{formatDate(now, 'YYYYMMDD')}}-{{concept_slug}}"
```

---

## MODULE 3: CLAUDE API — GENERATE BRIEF

**Module:** HTTP > Make an API Call  
**URL:** `https://api.anthropic.com/v1/messages`  
**Method:** POST  
**Headers:**
```
x-api-key: {{ANTHROPIC_API_KEY}}
anthropic-version: 2023-06-01
content-type: application/json
```

**Body:**
```json
{
  "model": "claude-sonnet-5",
  "max_tokens": 2000,
  "messages": [
    {
      "role": "user",
      "content": "You are a children's content writer for Gigi's Playhouse, a nursery rhyme channel for toddlers ages 2-5.\n\nExpand this concept into a detailed video brief:\n\nConcept: {{concept_summary}}\nScenario type: {{scenario_type}}\nCharacters: {{characters}}\nSettings: {{settings}}\nRuntime target: {{runtime_seconds}} seconds\n\nOutput a structured brief with these sections:\n1. Full concept description (3-4 sentences)\n2. Learning objective (one sentence)\n3. Emotional objective (one sentence)\n4. Emotional arc: [start] → [middle] → [end]\n5. Character descriptions (one line each)\n6. Setting descriptions (one line each)\n7. Song structure outline (intro, verse count, chorus count, bridge, outro)\n8. Key production notes (3-5 bullet points)\n\nKeep all language simple. Target vocabulary for parents of 2-5 year olds."
    }
  ]
}
```

**Output mapping:**
- `brief_text` = `{{3.data.content[0].text}}`

**Error handling:** If status ≠ 200, retry once after 10 seconds. If fails twice, send error notification and stop.

---

## MODULE 4: CLAUDE API — GENERATE LYRICS

**Module:** HTTP > Make an API Call  
**URL:** Same Claude endpoint  
**Body:**
```json
{
  "model": "claude-sonnet-5",
  "max_tokens": 3000,
  "messages": [
    {
      "role": "user",
      "content": "You are writing original nursery rhyme lyrics for a children's channel called Gigi's Playhouse.\n\nVIDEO BRIEF:\n{{brief_text}}\n\nWrite complete original lyrics following these rules:\n- Max 10 syllables per line\n- Simple vocabulary (age 2-5)\n- AABB rhyme scheme in verses\n- Chorus repeats at least 3 times\n- Bridge is slower and more tender\n- Must include a call-and-response hook in the chorus\n- Add section markers: [Intro], [Verse 1], [Chorus], [Verse 2], [Chorus], [Bridge], [Verse 3], [Chorus], [Outro]\n- Include sound effects in lyrics (Achoo!, Splash!, Clap!)\n- Final chorus should differ slightly from first chorus (past tense or 'we did it' variation)\n\nAlso include:\n- Suno section: format ready for Suno (same lyrics with section tags)\n- Vocabulary list: all key words introduced\n- Runtime estimate per section\n\nDo NOT copy any existing songs. Create fully original lyrics."
    }
  ]
}
```

**Output mapping:**
- `lyrics_text` = `{{4.data.content[0].text}}`

---

## MODULE 5: CLAUDE API — GENERATE SUNO PROMPT

**Module:** HTTP > Make an API Call  
**Body:**
```json
{
  "model": "claude-sonnet-5",
  "max_tokens": 1000,
  "messages": [
    {
      "role": "user",
      "content": "Generate a Suno AI music style prompt for this nursery rhyme video.\n\nScenario type: {{scenario_type}}\nRuntime target: {{runtime_seconds}} seconds\nLyric section summary: {{brief_text}}\n\nOutput exactly two items:\n\n1. STYLE PROMPT (for Suno's 'Style of Music' field):\nA comma-separated list of 10-15 style descriptors. Must include:\n- Tempo (BPM)\n- Instruments\n- Vocal type\n- Energy level\n- Whether there's a bridge/lullaby section\n- Toddler-appropriate descriptors\n- Clean production descriptors\n\n2. NEGATIVE PROMPT:\nThings to avoid in generation (5-8 items, comma-separated)\n\nFormat response as:\nSTYLE: [style prompt text]\nNEGATIVE: [negative prompt text]"
    }
  ]
}
```

**Output mapping:**
- `suno_style` = extract after "STYLE:" from response
- `suno_negative` = extract after "NEGATIVE:" from response

---

## MODULE 6: CLAUDE API — GENERATE SCENE PLAN

**Module:** HTTP > Make an API Call  
**Max tokens:** 8000  
**Body:**
```json
{
  "model": "claude-sonnet-5",
  "max_tokens": 8000,
  "messages": [
    {
      "role": "user",
      "content": "Generate a scene-by-scene storyboard JSON for this nursery rhyme video.\n\nVIDEO BRIEF:\n{{brief_text}}\n\nLYRICS:\n{{lyrics_text}}\n\nCreate a JSON array of scene objects. Each scene object must include ALL of these fields:\n- scene_id (SCN-001 format)\n- start_time (mm:ss)\n- end_time (mm:ss)\n- duration_seconds (4-8 typical, max 30)\n- lyrics_line (lyrics during this scene)\n- chorus_flag (boolean)\n- story_beat (enum: intro/problem/reaction/action/care/comfort/resolution/celebration/chorus/bridge/outro/learning_moment/transition)\n- educational_goal (string or null)\n- emotion (enum: worried/sad/happy/excited/scared/comforted/curious/proud/loving/playful/tired/surprised/determined)\n- characters (array with name, role_in_scene, expression, position)\n- location (bedroom/kitchen/living_room/etc)\n- background_description (detailed visual description)\n- camera_direction (wide_shot/medium_shot/close_up/etc)\n- action (what happens in the scene, 1-2 sentences)\n- prop_list (array of strings)\n- visual_prompt (complete AI image generation prompt, 2-3 sentences, 3D cartoon style)\n- thumbnail_candidate (boolean — true for 2-3 scenes only)\n- caption_text (lyrics or empty string)\n- transition_type (cut/fade/dissolve/bounce/sparkle/wipe_left/wipe_right/zoom_transition)\n- repeatable_loop_flag (boolean)\n- audio_cue (string or null)\n- color_palette_hint (array of 3-4 hex colors)\n\nTarget: 28-32 scenes total.\nOutput valid JSON only — no commentary before or after the JSON."
    }
  ]
}
```

**Output mapping:**
- `scenes_json` = `{{6.data.content[0].text}}`

**Validation step:** Parse JSON — if invalid, retry once with simplified prompt.

---

## MODULE 7: CLAUDE API — GENERATE METADATA

**Module:** HTTP > Make an API Call  
**Body:**
```json
{
  "model": "claude-sonnet-5",
  "max_tokens": 2000,
  "messages": [
    {
      "role": "user",
      "content": "Generate YouTube metadata for this nursery rhyme video.\n\nChannel: Gigi's Playhouse\nConcept: {{concept_summary}}\nScenario type: {{scenario_type}}\nChorus hook: [extract from lyrics]\n\nGenerate:\n1. THREE title options (max 70 chars each, always end with 'Gigi's Playhouse')\n2. Full YouTube description (200-350 words, follow standard nursery rhyme description format)\n3. 20 YouTube tags (mix of broad and specific)\n4. Playlist recommendation\n\nFormat as JSON:\n{\n  \"titles\": [\"title1\", \"title2\", \"title3\"],\n  \"recommended_title\": \"title1\",\n  \"description\": \"...\",\n  \"tags\": [\"tag1\", \"tag2\"],\n  \"playlist\": \"...\"\n}"
    }
  ]
}
```

**Output mapping:**
- `metadata_json` = `{{7.data.content[0].text}}`

---

## MODULE 8: CLAUDE API — GENERATE UPLOAD CHECKLIST

**Module:** HTTP > Make an API Call  
**Body:**
```json
{
  "model": "claude-sonnet-5",
  "max_tokens": 1000,
  "messages": [
    {
      "role": "user",
      "content": "Generate a production upload checklist for this nursery rhyme video.\n\nConcept: {{concept_summary}}\nScene count: {{scene_count}}\nSong title: {{song_title}}\n\nCreate a markdown checklist with these sections:\n\n## Audio Production\n- [ ] Suno prompt pasted and generated (3 variants)\n- [ ] Best variant selected\n- [ ] Audio exported as WAV/MP3\n- [ ] Audio timing matches target runtime\n\n## Visual Production\n- [ ] All {{scene_count}} scene visual prompts ready\n- [ ] Character designs consistent across scenes\n- [ ] Thumbnail (SCN-029 or best candidate) designed\n\n## Assembly\n- [ ] Video edited to audio track\n- [ ] Captions/subtitles added\n- [ ] Outro card added\n\n## Upload\n- [ ] Title finalized\n- [ ] Description pasted\n- [ ] 20 tags added\n- [ ] Thumbnail uploaded\n- [ ] Made for Kids: YES\n- [ ] Category: Education\n- [ ] Playlist assigned\n- [ ] End screens added\n\n## Quality Check\n- [ ] Watch full video once on mobile\n- [ ] Confirm all lyrics match audio\n- [ ] Thumbnail reads at 120px\n- [ ] No copyrighted content"
    }
  ]
}
```

---

## MODULE 9: ASSEMBLE PACKAGE JSON

**Module:** Tools > Set Variable  
**Build final package object:**

```json
{
  "package_id": "{{output_folder}}",
  "created": "{{timestamp}}",
  "concept_slug": "{{concept_slug}}",
  "brief": "{{brief_text}}",
  "lyrics": "{{lyrics_text}}",
  "suno_style_prompt": "{{suno_style}}",
  "suno_negative_prompt": "{{suno_negative}}",
  "scenes": "{{scenes_json}}",
  "metadata": "{{metadata_json}}",
  "checklist": "{{checklist_text}}"
}
```

---

## MODULE 10: SAVE OUTPUTS

### Option A: Google Drive
**Module:** Google Drive > Create a File  
- Create folder: `Gigi's Playhouse / Video Packages / {{output_folder}}/`
- Save: `video-package.json` (full package)
- Save: `lyrics.md` (lyrics_text)
- Save: `suno-prompt.md` (suno_style + suno_negative)
- Save: `storyboard.json` (scenes_json)
- Save: `metadata.json` (metadata_json)
- Save: `upload-checklist.md` (checklist_text)

### Option B: Airtable
**Module:** Airtable > Create a Record  
- Table: "Video Packages"
- Map fields to all package components

---

## MODULE 11: HUMAN REVIEW CHECKPOINT

**Module:** Tools > Sleep (60 seconds delay for file saves to complete)

**Then:** Send notification

### Option A: Gmail
**Module:** Gmail > Send an Email  
**To:** `{{NOTIFICATION_EMAIL}}`  
**Subject:** `New Video Package Ready — {{concept_slug}}`  
**Body:**
```
Your Gigi's Playhouse video package is ready!

Concept: {{concept_summary}}
Package ID: {{output_folder}}
Scenes: {{scene_count}}

Next steps:
1. Review lyrics in your output folder
2. Paste Suno prompt and generate audio
3. Review storyboard JSON for scene count
4. Proceed with visual asset generation

Files saved to: Google Drive / Gigi's Playhouse / Video Packages / {{output_folder}}/
```

### Option B: Slack / Discord webhook  
**Module:** HTTP > Make API call to Slack/Discord webhook URL  
**Message:** Same content as email

---

## MODULE 12: STATUS UPDATE

**Module:** Google Sheets > Update a Row (if using Sheets trigger)  
- Update column I from "queued" to "package_complete"
- Update column J with `{{output_folder}}`
- Update column K with `{{timestamp}}`

---

## ERROR HANDLING

### Claude API failures
- Retry: 1 time after 15-second delay
- On second failure: Set status to "error_claude_[module_number]"
- Send error email with module number and error message
- Stop scenario

### JSON parse failures (Scene module)
- Retry: Send simplified prompt requesting same output
- On failure: Save raw text, flag for manual JSON repair
- Set status to "error_json_parse"

### Google Drive failures
- Retry: 3 times with 10-second delays
- On failure: Save to Make.com data store as backup
- Send error notification

---

## SCENARIO SETTINGS

| Setting | Value |
|---------|-------|
| Max errors | 3 |
| Timeout per module | 120 seconds |
| Scheduling | Run on demand (webhook/manual) |
| Data flow | Sequential (each module depends on previous) |

---

## SETUP CHECKLIST

Before activating:
- [ ] Claude API key added to Make.com variables
- [ ] Google Drive connection authorized
- [ ] Gmail/Slack notification module configured
- [ ] Test run with concept_slug = "sick-song-v1"
- [ ] Verify all 6 output files are created in correct folder
- [ ] Verify JSON files are valid (paste into jsonlint.com)
- [ ] Verify email/notification arrives

---

## ESTIMATED TOKEN USAGE PER RUN

| Module | ~Tokens |
|--------|---------|
| Brief | 800 input + 600 output |
| Lyrics | 1200 input + 900 output |
| Suno prompt | 600 input + 400 output |
| Scene plan | 2000 input + 3000 output |
| Metadata | 800 input + 600 output |
| Checklist | 400 input + 300 output |
| **Total** | **~11,000 tokens/run** |

At Claude API pricing, one full package run costs approximately $0.05–$0.10.
