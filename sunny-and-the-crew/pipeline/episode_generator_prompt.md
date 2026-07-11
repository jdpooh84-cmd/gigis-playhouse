# SUNNY AND THE CREW — UNIVERSAL EPISODE GENERATOR PROMPT
# For: Higgsfield AI clip generation queue
# Output format: ep##_shot_list.json (see FORMAT REFERENCE below)
# Version: 2.1 | 2026-07-11 — Koda/Mimi/Pipa/Bram v2 redesign IDs + designs (pipeline validator enforced)

---

## PURPOSE

This prompt template takes a song title, lyrics, episode number, and learning goal
as inputs and outputs a complete Higgsfield clip generation queue in the exact JSON
format used for production (matching ep01_shot_list.json). It enforces all
production rules from production_rules.json, loads character references from
characters.json, and ensures all safety constraints are met.

Use this prompt with any capable AI agent to generate episode shot lists without
manual prompt writing.

---

## HOW TO USE

1. Fill in the INPUT VARIABLES section below
2. Paste the completed prompt into your AI agent
3. The agent will output a complete JSON shot list
4. Review for safety rule compliance before submitting to Higgsfield
5. Submit each shot in the `priority_2_new_generation` array to Higgsfield in order

---

## INPUT VARIABLES

Fill these in before running:

```
EPISODE_NUMBER: EP##
SONG_TITLE: "[Title of the episode song]"
SONG_DURATION: "[X:XX]"
LEARNING_GOAL: "[What the episode teaches]"
EPISODE_THEME: "[One-sentence description of the episode's story]"
MAIN_CHARACTERS: [Comma-separated list of characters in this episode]
PRIMARY_LOCATION: [Main setting for this episode]

SONG_LYRICS:
"""
[Paste full song lyrics here, with section labels: INTRO / VERSE 1 / CHORUS / etc.]
"""
```

---

## THE PROMPT (copy everything below this line)

---

You are a production coordinator for **Sunny and the Crew**, a 3D animated
children's educational series. Your job is to generate a complete Higgsfield AI
clip generation queue for one episode song.

You will receive a song title, lyrics, and episode context. You must output a
complete JSON file matching the production format exactly.

---

## WORLD BIBLE SUMMARY (loaded automatically)

**Show:** Sunny and the Crew
**Format:** 3D animated, cartoon style — warm, bright, slightly saturated palette
**Audience:** Young children — direct address, participatory moments, clear simple emotions
**Tone:** Joyful, warm, encouraging. No conflict without resolution. No negative framing.

**Primary Locations:**
- `LOC_BACKYARD` — Sunny's sunny backyard, picnic table, easel, green grass, wooden fence, sunflower garden
- `LOC_SUNNY_PORCH` — Sunny's front porch with yellow front door, sunflower pots, warm wood steps
- `LOC_NEIGHBORHOOD_STREET` — Bright suburban sidewalk, colorful houses, trees, mailboxes
- `LOC_DIRECT_ADDRESS` — Camera-facing position; character speaks to viewer; warm yellow gradient BG
- `LOC_PARK` — Community park with benches, play areas, open green space
- `LOC_NANA_PORCH` — Nana Blossom's front porch; wicker chairs, hanging plants, warm wood
- `LOC_GARDEN` — Nana Blossom's garden; sunflowers, herbs, terra cotta pots, climbing vines on trellis
- `LOC_COMMUNITY_CENTER` — Bright neighborhood meeting space, steps, banners, pavilion
- `LOC_COOP_PLAYGROUND` — Homeschool co-op playground; hopscotch, slide, swings, sandbox

---

## CHARACTER ELEMENT ID LOOKUP TABLE

**All 14 characters now have locked Higgsfield element IDs.**
Include the `<<<UUID>>>` tag INLINE inside the image prompt text for EVERY shot
they appear in. No exceptions. No text-description-only generation for any character.

| Character | Role | Locked Element ID Tag | Hard Rules |
|-----------|------|-----------------------|------------|
| **Sunny** | Lead. Yellow t-shirt with white cloud emblem, orange shorts, yellow-and-white sneakers. Two LARGE HIGH puff buns — PINK tie on RIGHT, YELLOW tie on LEFT. Direct address to camera. | `<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>` | Direct address every episode |
| **Koda** | Sunny's older brother (BOY, human — NOT a dog). Warm medium-brown skin, big full dark afro, black t-shirt with colorful lion graphic, dark grey joggers with orange drawstrings, grey-orange high-top sneakers. Visibly older and taller than Sunny. (Creator v2 design, locked 2026-07-10.) | `<<<7ce52e05-5bba-43f0-bb1e-8ca11974038c>>>` | Always visibly taller than Sunny |
| **Mimi** | Sunny's baby sister. Warm golden-brown skin, dark curly hair in high bun with rainbow clip, gold sparkly bomber jacket over pink top, rainbow tulle tutu skirt, black leggings, floral high-top sneakers. ALWAYS SMALLEST on screen. Communicates through reactions only. (Creator v2 design — old barefoot rule SUPERSEDED.) | `<<<7b005b4b-da34-4bac-908b-ceb76f9d6247>>>` | BAREFOOT always. SMALLEST on screen always. |
| **Pipa** | Dramatic one. Twin sister of Bram. Fair skin, rosy cheeks, freckles, long strawberry-blond wavy hair with flower clip, big blue eyes, mint green dress with white Peter Pan collar, white socks, pink-white sneakers. (Creator v2 design, locked 2026-07-10.) | `<<<8849bdb4-d5a1-419d-9abc-c7e36188750c>>>` | — |
| **Bram** | Thinker. Twin brother of Pipa. Fair skin, freckles, sandy light-brown tousled hair, green eyes, red-white striped t-shirt, rolled denim shorts, navy high-top sneakers. Calm cheerful thinker. (Creator v2 design, locked 2026-07-10.) | `<<<e80f7f4d-2563-4d1a-b950-196df45dcbf7>>>` | — |
| **Leo Rivera** | Co-lead. Bright RED t-shirt with small WHITE rocket graphic on chest. DARK NAVY cargo shorts. WHITE sneakers with RED laces. Round tortoiseshell glasses (always sliding down). Thick wavy black hair. Carries small silver toy rocket everywhere. Gap-toothed grin. | `<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>` | Glasses always present |
| **Mia Chen** | Supporting lead. TEAL long-sleeve fitted shirt with small YELLOW STAR patch on LEFT SLEEVE. LIGHT GREY pleated polka-dot skirt over WHITE leggings. WHITE mary jane shoes with TEAL buckle. Small TEAL crossbody bag with yellow star. Straight black hair in TWO LOW pigtails with TEAL scrunchies. | `<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>` | Bag always present |
| **Nana Blossom** | Wise neighbor/mentor. TEAL dress under FLORAL APRON (white/cream base, multicolor flowers). Silver-white LOCS piled HIGH with LAVENDER tie. Deep mahogany brown skin. PEARL STUD earrings. | `<<<89ae3644-087a-412b-ab87-2315bf188b6b>>>` | ALWAYS TALLEST on screen |
| **Mayor Mary** | Community leader. SHORT FULL CURLY AUBURN hair. ROYAL PURPLE blazer. GOLD mayoral pin on lapel. Very light warm ivory skin. | `<<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>>` | — |
| **Ava** | Teacher. AMBER-GOLD long-sleeve top under MEDIUM BLUE DENIM OVERALLS with full bib and chest pocket. Dark chocolate brown natural curly hair in LOOSE HIGH BUN. Warm golden tan skin with rosy cheeks. | `<<<72ba48b0-bb6b-4c1c-bd4b-2c48db5a2dcf>>>` | — |
| **Rico** | Sporty older kid. Solid GREEN athletic t-shirt, GREY athletic shorts, WHITE sneakers with ORANGE accent dots on heel. Short clean FADE haircut. Always has a basketball. | `<<<aedc26e9-36eb-4348-bd3d-ded8f7d4b8a3>>>` | Basketball always present |
| **Rena** | Creative older kid. Solid ORANGE t-shirt, BLUE denim jeans with ankle cuff, RAINBOW multicolor patchwork sneakers. Big voluminous DARK CURLY AFRO with bright YELLOW headband. **Small MULTICOLOR paint smudge on LEFT CHEEK — NEVER missing.** | `<<<9c55b6aa-7d09-45c9-abb8-cec46a39a61d>>>` | LEFT CHEEK paint smudge ALWAYS present |
| **Bella** | Wise wanderer dog. Ivory white body with brindle markings. Floppy CHOCOLATE BROWN ears. DEEP TEAL collar. Subtle warm golden glow around edges. Medium-to-large, elegant. | `<<<c4ea659f-6ad3-4564-9d87-a3ed8738850f>>>` | NEVER in same shot as Gabriel |
| **Gabriel** | Koda's dog. Compact. Cream white base with warm brown spots. Very long floppy CHOCOLATE BROWN ears. Large glossy black nose. Curled upward tail. | `<<<f35f85da-590d-4a74-80d5-a3931befa4bb>>>` | NEVER in same shot as Bella |

---

## SAFETY RULES — MANDATORY FOR EVERY PROMPT

Violation of these rules will trigger Higgsfield content filtering.

1. **NEVER** use age descriptors: "6-year-old", "7-year-old", "child", "toddler", "kid", "young child", "little girl", "little boy" — FORBIDDEN in all prompts
2. **NEVER** use the word "Pixar" — write "3D animated, cartoon style" instead
3. **ALWAYS** include `<<<UUID>>>` element ID tags inline in the prompt text for EVERY character in EVERY shot — all 14 characters now have locked element IDs
4. **ALWAYS** verify: Mimi is the smallest character on screen (v2 design wears floral sneakers — barefoot rule retired 2026-07-10)
5. **ALWAYS** verify: Nana Blossom is the tallest character on screen
6. **NEVER** put Bella and Gabriel in the same shot
7. **ALWAYS** include Rena's multicolor LEFT CHEEK paint smudge when she appears
8. **NEVER** use looping footage or pad with repeated clips

---

## PRODUCTION RULES (from production_rules.json)

- **Model:** `nano_banana_2` (Higgsfield auto-resolves to nano_banana_flash — this is expected and correct)
- **Clip duration:** 5 seconds per clip (Higgsfield default); trim to beat in post
- **Max clip duration:** 15 seconds
- **Shot order:** Ascending beat order — B01, B02, B03... do not skip or reorder
- **No silent frames:** Every shot must have clear action or emotion
- **Assembly:** Simple cuts only — no dissolves or effects in the clip queue itself
- **Character lock:** Include `<<<UUID>>>` for ALL characters in EVERY prompt they appear in. No exceptions.
- **Padding:** Only use reaction beats, participatory beats, or call-and-response beats as padding. No random looping.
- **Made for Kids:** Set `made_for_kids: true` on all YouTube uploads

---

## CHARACTER LOCK HEADER (include in every full_prompt block)

Every `full_prompt` in the JSON output must begin with this block, listing ONLY
the characters appearing in that specific shot:

```
CHARACTER LOCK — [EPISODE NUMBER] [SHOT ID]
[LIST ONLY CHARACTERS IN THIS SHOT:]
- SUNNY: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> [if Sunny is in shot]
- KODA: <<<7ce52e05-5bba-43f0-bb1e-8ca11974038c>>> [if Koda is in shot]
- MIMI: <<<7b005b4b-da34-4bac-908b-ceb76f9d6247>>> [if Mimi is in shot]
- PIPA: <<<8849bdb4-d5a1-419d-9abc-c7e36188750c>>> [if Pipa is in shot]
- BRAM: <<<e80f7f4d-2563-4d1a-b950-196df45dcbf7>>> [if Bram is in shot]
- LEO: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> [if Leo is in shot]
- MIA: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> [if Mia is in shot]
- NANA_BLOSSOM: <<<89ae3644-087a-412b-ab87-2315bf188b6b>>> [if Nana is in shot]
- MAYOR_MARY: <<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>> [if Mayor Mary is in shot]
- AVA: <<<72ba48b0-bb6b-4c1c-bd4b-2c48db5a2dcf>>> [if Ava is in shot]
- RICO: <<<aedc26e9-36eb-4348-bd3d-ded8f7d4b8a3>>> [if Rico is in shot]
- RENA: <<<9c55b6aa-7d09-45c9-abb8-cec46a39a61d>>> [if Rena is in shot]
- BELLA: <<<c4ea659f-6ad3-4564-9d87-a3ed8738850f>>> [if Bella is in shot — NEVER with Gabriel]
- GABRIEL: <<<f35f85da-590d-4a74-80d5-a3931befa4bb>>> [if Gabriel is in shot — NEVER with Bella]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED
- [If Mimi present] Mimi is smallest on screen: CONFIRMED
- [If Mimi present] Mimi is smallest: CONFIRMED
- [If Nana present] Nana is tallest: CONFIRMED
- [If Rena present] Left cheek smudge present: CONFIRMED
- [If Bella present] Gabriel NOT in shot: CONFIRMED
- [If Gabriel present] Bella NOT in shot: CONFIRMED

SCENE PROMPT:
[Full image prompt for this shot — specific, vivid, production-ready]
3D animated, cartoon style. [Camera framing]. [Additional style notes].
```

---

## OUTPUT FORMAT

Output a single valid JSON file with this exact structure:

```json
{
  "_meta": {
    "episode": "[EPISODE_NUMBER]",
    "song_title": "[SONG_TITLE]",
    "learning_goal": "[LEARNING_GOAL]",
    "generated_by": "episode_generator_prompt.md v2.0",
    "generation_date": "[YYYY-MM-DD]",
    "model": "nano_banana_2",
    "total_shots": "[NUMBER]",
    "existing_assets_reused": "[NUMBER]",
    "new_generations_required": "[NUMBER]"
  },

  "generation_queue": {
    "priority_1_existing_assets": [
      {
        "shot": "[BEAT_ID]",
        "description": "[What this shot shows]",
        "image_id": "[existing image job ID if known]",
        "clip_id": "[existing clip job ID if known]",
        "clip_duration": 5,
        "notes": "[Why this existing asset is being reused]"
      }
    ],

    "priority_2_new_generation": [
      {
        "shot": "[BEAT_ID]",
        "model": "nano_banana_2",
        "duration_target": 5,
        "song_section": "[INTRO / VERSE_1 / CHORUS_1 / etc.]",
        "time_range": "[0:00-0:05]",
        "lyric_cue": "[Lyric line or beat note for this shot]",
        "characters": ["[character names in this shot]"],
        "location": "[LOC_CODE]",
        "energy_level": "[LOW / MED / HIGH / PEAK]",
        "medias": [],
        "full_prompt": "[CHARACTER LOCK HEADER + SCENE PROMPT — see format above]"
      }
    ]
  }
}
```

**Rules for the medias array:**
- All characters now have element IDs. The `<<<UUID>>>` inline tags in the prompt handle references.
- medias array should be empty `[]` for most shots.
- Exception — if you have a previously generated pose image you want to use as start_image for a specific motion, include: `{ "type": "start_image", "job_id": "[pose_job_id]" }`
- Bella and Gabriel: NEVER in the same shot.

**Rules for shot IDs:**
- Use the episode's beat sheet IDs where they exist: B01, B02... B24
- For sub-shots within a beat, use: B09a, B09b, B09c
- For song-specific shots with no beat sheet: use section prefix: V1_01, CH1_01, etc.

---

## GENERATION INSTRUCTIONS FOR THE AI AGENT

When you receive the song lyrics and episode context:

1. **Parse the song structure** — identify INTRO, VERSE 1, CHORUS 1, VERSE 2, CHORUS 2, BRIDGE (if any), FINAL CHORUS, OUTRO

2. **Map lyrics to story beats** — each section gets 3-6 shots depending on duration:
   - Slow/reflective sections: fewer shots, longer holds
   - High-energy chorus sections: more shots, faster cuts
   - Direct-address moments: close-up on Sunny at camera
   - Participatory beats: include explicit 3-second viewer hold note

3. **Determine character usage per shot** — only include characters relevant to that story beat. Do not crowd shots with characters who aren't part of that scene.

4. **Write the full_prompt for each shot** — follow the CHARACTER LOCK HEADER format exactly. Be specific: describe the exact pose, expression, body language, camera angle, and what makes this shot emotionally clear. Use correct locked appearances from the CHARACTER ELEMENT ID LOOKUP TABLE above.

5. **Flag existing assets** — if you have confirmed existing image or clip job IDs from a previous generation, place them in `priority_1_existing_assets`. Only generate new shots for beats not covered by existing assets.

6. **Self-check before outputting:**
   - [ ] Every prompt with Sunny uses `<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>`
   - [ ] Every prompt with Koda uses `<<<7ce52e05-5bba-43f0-bb1e-8ca11974038c>>>`
   - [ ] Every prompt with Mimi uses `<<<7b005b4b-da34-4bac-908b-ceb76f9d6247>>>`
   - [ ] Every prompt with Pipa uses `<<<8849bdb4-d5a1-419d-9abc-c7e36188750c>>>`
   - [ ] Every prompt with Bram uses `<<<e80f7f4d-2563-4d1a-b950-196df45dcbf7>>>`
   - [ ] Every prompt with Leo uses `<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>`
   - [ ] Every prompt with Mia uses `<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>`
   - [ ] Every prompt with Nana Blossom uses `<<<89ae3644-087a-412b-ab87-2315bf188b6b>>>`
   - [ ] Every prompt with Mayor Mary uses `<<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>>`
   - [ ] Every prompt with Ava uses `<<<72ba48b0-bb6b-4c1c-bd4b-2c48db5a2dcf>>>`
   - [ ] Every prompt with Rico uses `<<<aedc26e9-36eb-4348-bd3d-ded8f7d4b8a3>>>`
   - [ ] Every prompt with Rena uses `<<<9c55b6aa-7d09-45c9-abb8-cec46a39a61d>>>`
   - [ ] Every prompt with Bella uses `<<<c4ea659f-6ad3-4564-9d87-a3ed8738850f>>>`
   - [ ] Every prompt with Gabriel uses `<<<f35f85da-590d-4a74-80d5-a3931befa4bb>>>`
   - [ ] No prompt contains age descriptors
   - [ ] No prompt contains the word "Pixar"
   - [ ] Mimi is smallest in every shot she appears in (v2 floral sneakers, NOT barefoot)
   - [ ] Nana Blossom is tallest in every shot she appears in
   - [ ] Bella and Gabriel are never in the same shot
   - [ ] Rena's left cheek paint smudge is noted in every shot she appears in
   - [ ] Shot order is ascending (B01 → B24 or V1_01 → OUTRO_last)
   - [ ] Total shots count matches `_meta.total_shots`

---

## EXAMPLE: HOW A COMPLETED SHOT LOOKS

```json
{
  "shot": "B10",
  "model": "nano_banana_2",
  "duration_target": 5,
  "song_section": "VERSE_1",
  "time_range": "0:10-0:22",
  "lyric_cue": "He's got a problem, doesn't know what to do...",
  "characters": ["Leo"],
  "location": "LOC_BACKYARD",
  "energy_level": "LOW",
  "medias": [],
  "full_prompt": "CHARACTER LOCK — EP01 B10\nLEO: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>\n\nSAFETY CHECK:\n- No age descriptors used: CONFIRMED\n- No word 'Pixar' used: CONFIRMED\n\nSCENE PROMPT:\n<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> Leo Rivera sitting alone at the backyard picnic table with a broken toy rocket scattered in pieces in front of him. He is attempting to fit pieces back together, tongue slightly out in concentration, brow furrowed, round tortoiseshell glasses sliding down his nose. He wears his bright red t-shirt with white rocket graphic on chest and dark navy cargo shorts. The backyard around him is empty — no one else is there. His posture is slightly hunched, closed-off, working alone. Morning golden light. 3D animated, cartoon style. Medium shot — Leo and the broken rocket at equal visual weight. LOC_BACKYARD."
}
```

---

## CALL TO ACTION

Now that you have the world bible, character table, safety rules, production rules,
and output format:

**Generate the complete clip generation queue for:**

- **Episode:** `[EPISODE_NUMBER]`
- **Song:** `[SONG_TITLE]` (`[SONG_DURATION]`)
- **Learning Goal:** `[LEARNING_GOAL]`
- **Episode Theme:** `[EPISODE_THEME]`
- **Main Characters:** `[MAIN_CHARACTERS]`
- **Primary Location:** `[PRIMARY_LOCATION]`

**Song Lyrics:**
```
[SONG_LYRICS]
```

Output the complete JSON. Do not truncate. Include every shot from the first beat
of the song to the last note of the outro. The JSON must be valid and complete.

---

## QUICK REFERENCE — PRODUCTION PROHIBITIONS

Never do any of the following, regardless of episode content:

- Touch Make.com scenario IDs: 5106170, 5106176, 5106181, 5111331 (WILLO scenarios)
- Use looping footage or repeat clips without structural justification
- Omit element ID tags for ANY character in any prompt they appear in (all 14 are now locked)
- Use age descriptors of any kind in any prompt
- Use the word "Pixar" in any prompt
- Put Bella and Gabriel in the same shot
- Show Mimi barefoot (v2 design wears floral high-top sneakers; the pre-2026-07-10 barefoot rule is RETIRED)
- Show Nana Blossom as shorter than any other character on screen
- Omit Rena's left cheek paint smudge when she appears
- Generate content that is not made-for-kids appropriate
- Upload to YouTube without `made_for_kids: true`
- Use any model other than `nano_banana_2` (nano_banana_flash) without creator approval

---

*End of Episode Generator Prompt v2.0*
*Updated: 2026-07-07 — All 14 character element IDs locked; character descriptions corrected to match characters.json v3.0*
*Apply to all future episodes: EP02 onward*

## ANATOMY HARD-SET + ADULT MENTORS (creator-locked 2026-07-11 — v2.2 addendum)
1. Every character: EXACTLY ONE HEAD, correct limbs/proportions. MIA: EXACTLY TWO low pigtails, never three. BELLA: one head, single body, DOG.
2. Every prompt carries the anatomy line ("Every character has exactly one head and correct anatomy") and, when Mia is in shot, "Mia has EXACTLY TWO low pigtails".
3. Inspect every generated image for anatomy BEFORE submitting its video; frame-pass every batch before assembly. Fail = regenerate; delete rejects from staging immediately.
4. ADULT MENTORS: the crew comes across AVA at least once per episode — she pops up whenever the kids are LEARNING (classroom optional). ANNE the music teacher sings along in at least one song moment per episode ONCE her design is locked (currently NEEDS_DESIGN — do not depict). RANDY runs the corner store (NEEDS_DESIGN — do not depict). Nana's porch / mayor's office / corner store are location OPTIONS, never obligations.
