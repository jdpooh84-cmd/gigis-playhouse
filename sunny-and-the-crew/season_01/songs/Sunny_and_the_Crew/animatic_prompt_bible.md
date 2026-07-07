# SUNNY AND THE CREW — THEME SONG
# Animatic Prompt Bible
# Song: "Sunny and the Crew Theme Song"
# Duration: 0:45 | 105 BPM | Style: Kids pop, ukulele, hand claps
# Music ID: MUSIC_THEME | File: sunny-and-the-crew-THEME.mp3
# Used in: ACT_1_THEME_INTRO, ACT_4_OUTRO_sting
# Version: 2.0 | 2026-07-07

---

## PRODUCTION OVERVIEW

| Item | Value |
|------|-------|
| Total Runtime | 0:45 |
| BPM | 105 |
| Total Shots | 19 |
| Avg Shot Duration | ~2.4 sec |
| Characters Introduced | 14 |
| New Generations Required | 19 |
| Existing Assets | 0 (theme is fully new) |
| Generation Model | nano_banana_2 (auto-resolves to nano_banana_flash) |
| Clip Duration Target | 5 sec each (trim to beat) |

---

## OFFICIAL LOCKED LYRICS

**INTRO** (0:00-0:04) — instrumental only, ukulele strum builds

**VERSE 1** (0:04-0:12)
Come on outside the day is new
Got something fun for me and you
Friends are waiting what do we do
It's time to roll with the whole crew!

**CHORUS** (0:12-0:28)
Sunny and the Crew!
We're coming through!
Something to learn and something to do!
Sunny and the Crew!
Me and you!
Every single day we start brand new!

**VERSE 2** (0:28-0:36)
Bram and Pipa Koda too
Mimi's always got a clue
Nana Blossom Captain Blue
Everybody welcome to the crew!

**FINAL CHORUS** (0:36-0:44)
Sunny and the Crew!
We're coming through!
Something to learn and something to do!
Sunny and the Crew — that's me and you!

**OUTRO STING** (0:44-0:45) — "Hey! [ukulele hit]"

---

## ⚠ OPEN ITEMS

**"Captain Blue" — UNRESOLVED (Verse 2, line 3)**
The lyric "Nana Blossom Captain Blue" references a character name not confirmed in
characters.json. Do NOT invent this character. Shot T13 holds with Nana Blossom only
until creator confirms who "Captain Blue" is.
**Creator action required before T13 can be finalized.**

---

## SAFETY RULES — READ BEFORE GENERATING ANY PROMPT

- NEVER use age descriptors ("6-year-old", "7-year-old", "child", "toddler", "kid") in any prompt
- NEVER use the word "Pixar" — use "3D animated, cartoon style" instead
- MIMI: ALWAYS the SMALLEST character on screen — verify scale against every other character in the shot
- MIMI: ALWAYS BAREFOOT — no shoes, no socks, never
- NANA BLOSSOM: ALWAYS the TALLEST character on screen — verify scale against every other character in the shot
- BELLA and COMMANDER must NEVER appear in the same shot — they are two separate characters
- RENA: small multicolor paint smudge on LEFT CHEEK — always present, never missing
- Use <<<UUID>>> element ID syntax for Sunny, Leo, and Mia in every prompt they appear in
- Use pose job ID as start_image for characters with confirmed pose assets
- Mayor Mary: element ID <<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>> + start_image: 55122193-47b5-41b9-b615-eae22c0fbd20

---

## CHARACTER ELEMENT ID LOOKUP TABLE

| Character | Role | Element ID / Reference Method |
|-----------|------|-------------------------------|
| Sunny | Lead | <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> |
| Leo Rivera | Main Crew | <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> |
| Mia Chen | Main Crew | <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> |
| Koda | Main Crew | start_image: eb81f712-c1a1-4316-ab7f-8c29575f93e4 |
| Mimi | Main Crew | start_image: d21cc872-3688-4435-bf48-1741ed3ca897 |
| Pipa | Main Crew | start_image: 08a4f193-294c-4b90-afa3-513f7229c797 |
| Bram | Main Crew | start_image: 43fa73d8-9f8b-40b4-bfab-0477bc04829f |
| Nana Blossom | Supporting | start_image: f9e27584 (welcome_arms_wide) |
| Mayor Mary | Supporting | <<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>> + start_image: 55122193-47b5-41b9-b615-eae22c0fbd20 |
| Ava | Supporting | start_image: c18df2b0 (welcome) |
| Rico | Supporting | start_image: f661c59c (sidewalk_basketball) |
| Rena | Supporting | start_image: 449409c2 (garden_paintbrush) |
| Bella | Supporting | start_image: da604e85 (sitting_dignified) |
| Commander | Supporting | start_image: 0a837a71 (good_boy_sit) |

---

## SECTION STRUCTURE

| Section | Time | Duration | Shots | Description |
|---------|------|----------|-------|-------------|
| INTRO | 0:00-0:04 | 4s | T01 | Instrumental only — world establishing |
| VERSE 1 | 0:04-0:12 | 8s | T02-T05 | Sunny, Leo, Mia arrive |
| CHORUS 1 | 0:12-0:28 | 16s | T06-T10 | Full energy — Koda, Mimi, Pipa, Bram join |
| VERSE 2 | 0:28-0:36 | 8s | T11-T14 | Supporting cast named |
| FINAL CHORUS | 0:36-0:44 | 8s | T15-T18 | Bella, Commander, full crew finale |
| OUTRO STING | 0:44-0:45 | 1s | T19 | "Hey!" title snap |

---

## INTRO (0:00-0:04)

---

### SHOT_T01
```
TIME: 0:00-0:04
LYRIC CUE: [INSTRUMENTAL INTRO — ukulele strum builds, no lyrics]
ENERGY: LOW → BUILDING
BEAT-SYNC: Camera move starts on first ukulele strum (beat 1, 0:00). Gentle push forward beats 2-4.
STORY BEAT: Marigold Grove wakes up — the whole world is here, something wonderful is about to begin
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T01
[No characters in this shot]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Wide establishing shot of a bright, warm suburban neighborhood street bathed in morning
golden-hour sunlight. 3D animated, cartoon style. Colorful two-story homes line both
sides of the clean sidewalk — coral trims, cheerful yellow shutters, window boxes
overflowing with red and orange flowers. Wide sidewalk stretches toward the horizon.
Green trees arch overhead. Clear blue sky with soft puffy white clouds. The street is
perfectly still and empty — no characters yet, pure anticipation. A friendly mailbox
with a hand-painted sun near the foreground. The mood: something wonderful is one
moment away from starting.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide establishing shot, gentle slow push-in toward street level
MOTION: Downward drift as if the camera is landing in the neighborhood
HOLD: Final beat holds on the empty sun-drenched street — the quiet before the crew
```

**TRANSITION TO NEXT SHOT:** SMASH CUT on beat 8 (0:04) — hard energy jump as Sunny bursts in

**STYLE CONSISTENCY TAGS:** `#neighborhood-street` `#establishing` `#golden-hour` `#no-characters` `#3d-cartoon`

---

## VERSE 1 (0:04-0:12)

---

### SHOT_T02
```
TIME: 0:04-0:06
LYRIC CUE: "Come on outside the day is new"
ENERGY: HIGH
BEAT-SYNC: Sunny bursts through her front door exactly on "Come" (beat 8, 0:04)
STORY BEAT: Sunny arrives — she IS the show. She's been waiting all morning for this
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T02
- SUNNY: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> Sunny bursting through her bright yellow
front door out onto the sunny porch, one foot on the top step, both arms flung wide,
pigtails mid-bounce, mouth wide open in the biggest most joyful grin. She is looking
directly at camera — AT THE VIEWER — as if she's been expecting them. Her coral-and-yellow
outfit glows in morning sun. The porch behind her: warm wooden railings, marigold pots,
the "HELLO!" welcome mat. Energy: electric, unstoppable.
3D animated, cartoon style. Medium shot, front-facing, direct address. LOC_SUNNY_PORCH.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Eye-level at porch height, front-facing
MOTION: Slight push-in as door opens — approach into her energy
HOLD: 2 beats maximum — pure burst, no linger
```

**TRANSITION TO NEXT SHOT:** BOUNCE CUT — she hops down the porch steps

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#direct-address` `#porch` `#3d-cartoon`

---

### SHOT_T03
```
TIME: 0:06-0:08
LYRIC CUE: "Got something fun for me and you"
ENERGY: HIGH
BEAT-SYNC: "fun" lands on the downbeat; she pulls viewer in on "you"
STORY BEAT: Sunny directly invites the viewer — the adventure is SHARED
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T03
- SUNNY: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> Sunny on the sidewalk just past her porch
steps, crouching slightly with both hands on her knees, leaning forward toward camera
with conspiratorial delight — sharing the best secret in the world. Eyes wide, eyebrows
raised high, grin stretching ear-to-ear. Her pigtails dangle forward slightly with the
lean. One finger raised near her chin as if saying "just wait." The bright suburban
street glows behind her.
3D animated, cartoon style. Close-medium shot, front-facing, direct address. LOC_NEIGHBORHOOD_STREET.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Slightly below eye level — the viewer is being let in on the plan
MOTION: Minimal movement — let Sunny's expression carry the energy
HOLD: 2 beats — tight and quick
```

**TRANSITION TO NEXT SHOT:** SMASH CUT on "Friends are waiting" — Leo and Mia already there

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#direct-address` `#neighborhood-street` `#3d-cartoon`

---

### SHOT_T04
```
TIME: 0:08-0:10
LYRIC CUE: "Friends are waiting what do we do"
ENERGY: MED-HIGH
BEAT-SYNC: Leo and Mia appear in the frame on "Friends" (downbeat, 0:08)
STORY BEAT: The core trio assembles — Leo and Mia are already here, already ready
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T04
- SUNNY: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
- LEO: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
- MIA: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
Sunny, Leo, and Mia standing together on the sunny sidewalk in front of Sunny's house.
Leo has his red notebook open and pencil ready, glasses slightly askew with excitement.
Mia stands tall in her teal outfit with easy relaxed readiness — she was born prepared.
Sunny stands center, arms slightly out, looking at the viewer as if asking "WHAT DO WE DO NEXT?!"
All three are full of contained energy, about to burst.
3D animated, cartoon style. Medium group shot, all three visible full body. LOC_NEIGHBORHOOD_STREET.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Level, slightly wide to fit all three naturally
MOTION: Brief left-to-right pan reveals Leo then Mia before settling on the trio
HOLD: 2 beats — in and out, fast
```

**TRANSITION TO NEXT SHOT:** BOUNCE CUT on "It's time to roll" — they launch into motion

**STYLE CONSISTENCY TAGS:** `#trio-shot` `#element-id-sunny` `#element-id-leo` `#element-id-mia` `#neighborhood-street` `#3d-cartoon`

---

### SHOT_T05
```
TIME: 0:10-0:12
LYRIC CUE: "It's time to roll with the whole crew!"
ENERGY: PEAK
BEAT-SYNC: "roll" lands on the hard downbeat; "crew!" hits on the last word like a punch
STORY BEAT: The trio launches — they are going to get EVERYONE. The word "crew" explodes.
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T05
- SUNNY: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
- LEO: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
- MIA: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
Sunny, Leo, and Mia running full-speed down the neighborhood sidewalk directly toward
camera — all three in a diagonal charge, huge grins, maximum energy. Sunny leads
slightly ahead, arms pumping. Leo behind-left, notebook clutched to his chest, glasses
threatening to fly off. Mia at behind-right, sprinting with athletic grace, feet barely
touching the ground. The neighborhood street blurs slightly at edges from the speed.
3D animated, cartoon style. Low angle, wide — they fill the frame as they approach. LOC_NEIGHBORHOOD_STREET.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Low angle on the sidewalk — they grow massive as they approach
MOTION: Slight camera shake from the force of their approach
HOLD: They nearly hit the camera on "crew!" — hard cut at moment of contact
```

**TRANSITION TO NEXT SHOT:** STAR BURST — white flash as chorus DROPS at 0:12

**STYLE CONSISTENCY TAGS:** `#trio-shot` `#element-id-sunny` `#element-id-leo` `#element-id-mia` `#running` `#neighborhood-street` `#3d-cartoon`

---

## CHORUS 1 (0:12-0:28)

---

### SHOT_T06
```
TIME: 0:12-0:15
LYRIC CUE: "Sunny and the Crew!"
ENERGY: PEAK
BEAT-SYNC: Title hit ON the downbeat at 0:12 — Bounce Underscore fires on "Crew!"
STORY BEAT: The SHOW TITLE detonates — Sunny in her hero frame
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T06
- SUNNY: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> Sunny in a triumphant hero pose in the
center of the neighborhood street — feet planted wide, both fists raised high in the
air, head thrown back with the biggest victory-laugh grin imaginable. Her pigtails arc
upward from the sudden stop. Her coral-and-yellow outfit catches pure golden sunlight.
Yellow sun-burst rays explode from behind her (#FFCC00, six straight rays, 2D over 3D).
The street perspective lines converge behind her — she IS the center of this world.
3D animated, cartoon style. Low angle hero shot, direct address. LOC_NEIGHBORHOOD_STREET.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Low angle, front — Sunny towers like a superhero
MOTION: Hard stop — no drift; the moment needs to LAND
HOLD: 3 beats — this is the title hit; let it breathe
```

**TRANSITION TO NEXT SHOT:** SMASH CUT — motion picks up instantly

**STYLE CONSISTENCY TAGS:** `#sunny-hero` `#element-id-sunny` `#sun-burst` `#neighborhood-street` `#direct-address` `#3d-cartoon`

---

### SHOT_T07
```
TIME: 0:15-0:18
LYRIC CUE: "We're coming through!"
ENERGY: PEAK
BEAT-SYNC: "coming" hits the downbeat; whole scene bounces on "through!"
STORY BEAT: The crew is IN MOTION — nothing can stop them. Koda joins the charge.
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T07
- SUNNY: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
- LEO: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
- MIA: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>

[Koda: start_image: eb81f712-c1a1-4316-ab7f-8c29575f93e4]
Koda: energetic mixed-breed dog, colorful bandana around neck, bounding and leaping alongside crew

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
Sunny, Leo, and Mia running together down the sunlit sidewalk with Koda bounding
alongside — Koda is a mixed-breed dog with a colorful bandana around his neck,
mid-leap beside Mia with pure joyful dog-energy. All four in full motion down the
neighborhood street. The crew is coming THROUGH — they move like a bright, unstoppable
wave of joy.
3D animated, cartoon style. Wide tracking shot, same level as characters, slightly ahead. LOC_NEIGHBORHOOD_STREET.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Tracking shot ahead of them — we see them coming and they nearly catch us
MOTION: Camera moves at their speed
HOLD: Cut before they pass camera
```

**TRANSITION TO NEXT SHOT:** BOUNCE CUT on "Something to learn"

**STYLE CONSISTENCY TAGS:** `#trio-plus-koda` `#element-id-sunny` `#element-id-leo` `#element-id-mia` `#running` `#neighborhood-street` `#3d-cartoon`

---

### SHOT_T08
```
TIME: 0:18-0:21
LYRIC CUE: "Something to learn and something to do!"
ENERGY: HIGH
BEAT-SYNC: "learn" on downbeat; "do!" lands on the last count with a visual pop
STORY BEAT: The show's core promise — every episode has learning AND doing
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T08
- SUNNY: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
- LEO: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
- MIA: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
Leo holds his red notebook open triumphantly showing a sketch of a question mark —
SOMETHING TO LEARN. Mia is mid-cartwheel beside him with athletic precision —
SOMETHING TO DO. Sunny stands between them with both thumbs up and a massive grin
looking at camera. The three fill the frame in a tight energetic cluster — each
expressing their signature strength. LOC_BACKYARD: warm afternoon light, green grass,
picnic table behind them.
3D animated, cartoon style. Medium group shot, tight framing, high energy.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Level medium shot — tight enough to feel their collective energy
MOTION: Slight bounce on the downbeat; Mia's cartwheel anchors the movement
HOLD: Hard cut on "do!" to keep momentum
```

**TRANSITION TO NEXT SHOT:** SMASH CUT — extended crew reveal

**STYLE CONSISTENCY TAGS:** `#trio-shot` `#element-id-sunny` `#element-id-leo` `#element-id-mia` `#backyard` `#mia-cartwheel` `#3d-cartoon`

---

### SHOT_T09
```
TIME: 0:21-0:25
LYRIC CUE: "Sunny and the Crew! / Me and you!"
ENERGY: PEAK
BEAT-SYNC: "Crew!" hits on the downbeat (0:21); pointing gesture on "you!"
STORY BEAT: The FULL main crew — Mimi, Pipa, Bram arrive with Koda; viewer explicitly included
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T09
- SUNNY: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>

[Koda: start_image: eb81f712-c1a1-4316-ab7f-8c29575f93e4 — mixed-breed dog, colorful bandana, bounding]
[Mimi: start_image: d21cc872-3688-4435-bf48-1741ed3ca897 — BAREFOOT, SMALLEST on screen, wild full curly hair, small frame]
[Pipa: start_image: 08a4f193-294c-4b90-afa3-513f7229c797 — braids/locs with beads, paint-stained fingers, flowy patterned top]
[Bram: start_image: 43fa73d8-9f8b-40b4-bfab-0477bc04829f — helmet, knee pads, colorful skateboard with distinctive graphic]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED
- Mimi is barefoot: CONFIRMED
- Mimi is smallest character on screen: CONFIRMED

SCENE PROMPT:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> Sunny standing front-center, arms wide open
in full welcome pose, looking directly at camera. Behind her: Koda bounding to her
left (mixed-breed dog, colorful bandana, mid-leap); Mimi jumping with both feet off
the ground to Sunny's right — BAREFOOT with bare feet clearly visible, wild full curly
hair flying, she is the SMALLEST person in the frame; Pipa behind Mimi with her
braids/locs-with-beads and paint-stained fingers raised in excitement; Bram on his
colorful skateboard rolling in from the side with helmet and knee pads.
LOC_BACKYARD: neighborhood backyard fills the background.
3D animated, cartoon style. Wide group shot, Sunny front-center.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide, front-facing — Sunny center, crew fanned out behind her
MOTION: Slow pull-back to reveal the full group as the camera holds steady
HOLD: 4 beats — this is the crew reveal moment
```

**TRANSITION TO NEXT SHOT:** SMASH CUT on "Every single day"

**STYLE CONSISTENCY TAGS:** `#main-crew` `#element-id-sunny` `#mimi-barefoot` `#mimi-smallest` `#koda` `#bram-skateboard` `#pipa` `#backyard` `#3d-cartoon`

---

### SHOT_T10
```
TIME: 0:25-0:28
LYRIC CUE: "Every single day we start brand new!"
ENERGY: HIGH
BEAT-SYNC: "day" on downbeat; "brand new!" pops with a sparkle trail
STORY BEAT: The promise of the show — every day is fresh, every episode is a new beginning
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T10
- SUNNY: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> Sunny facing camera in a direct address
moment, hands clasped together at her chin in pure delight, eyes sparkling with
excitement, leaning slightly forward toward the viewer. She looks like she has the
greatest secret and it's just about to be revealed. Behind her: the neighborhood street
glows with fresh morning golden light, empty and full of possibility. Subtle sparkle
trail effects (#7EC8E3 cyan) drift upward from around her.
3D animated, cartoon style. Close-medium direct address shot. LOC_NEIGHBORHOOD_STREET.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Close-medium, level — intimate, direct
MOTION: Camera holds perfectly still; the sparkles provide motion
HOLD: Cut on "new!" — precise on the word
```

**TRANSITION TO NEXT SHOT:** BOUNCE CUT — drop into Verse 2 energy

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#direct-address` `#sparkle-trail` `#neighborhood-street` `#3d-cartoon`

---

## VERSE 2 (0:28-0:36)

---

### SHOT_T11
```
TIME: 0:28-0:30
LYRIC CUE: "Bram and Pipa Koda too"
ENERGY: MED-HIGH
BEAT-SYNC: "Bram" on the downbeat (0:28) — each name pops on a beat
STORY BEAT: Bram, Pipa, and Koda get their name-check moment
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T11
[Bram: start_image: 43fa73d8-9f8b-40b4-bfab-0477bc04829f — helmet, knee pads, colorful skateboard with distinctive graphic, confident]
[Pipa: start_image: 08a4f193-294c-4b90-afa3-513f7229c797 — braids/locs with beads, paint-stained fingers, flowy patterned top, creative and expressive]
[Koda: start_image: eb81f712-c1a1-4316-ab7f-8c29575f93e4 — mixed-breed dog, colorful bandana around neck, energetic and loyal]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Bram rolling on his colorful skateboard with helmet and knee pads, doing a confident
easy glide down the sidewalk. Pipa standing at the edge of the frame with her
braids-with-beads and paint-stained fingers out — sketching something in the air with
one finger, creative energy radiating. Koda the mixed-breed dog with his colorful
bandana bounding joyfully between them, completely airborne mid-leap. All three fill
the neighborhood sidewalk scene with distinct, complementary energy.
3D animated, cartoon style. Medium group shot, loose and dynamic. LOC_NEIGHBORHOOD_STREET.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Level, medium — room for all three to be distinct
MOTION: Camera pans slightly right to follow Bram's momentum
HOLD: 2 beats — tight, fast-cut verse energy
```

**TRANSITION TO NEXT SHOT:** SMASH CUT on "Mimi's always got a clue"

**STYLE CONSISTENCY TAGS:** `#bram-pipa-koda` `#bram-skateboard` `#neighborhood-street` `#3d-cartoon`

---

### SHOT_T12
```
TIME: 0:30-0:32
LYRIC CUE: "Mimi's always got a clue"
ENERGY: MED
BEAT-SYNC: "Mimi's" on the downbeat; she holds up one finger on "clue"
STORY BEAT: Mimi gets her moment — small but mighty, always knows
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T12
[Mimi: start_image: d21cc872-3688-4435-bf48-1741ed3ca897 — ALWAYS BAREFOOT, ALWAYS SMALLEST, wild full curly hair, small frame]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED
- Mimi is barefoot: CONFIRMED — bare feet with no shoes or socks visible
- Mimi is smallest: CONFIRMED — she is the only character in this shot

SCENE PROMPT:
Mimi standing barefoot on the green grass of the community park, her small frame
upright with absolute confidence, wild full curly hair bouncing. Her bare feet are
clearly visible on the grass — no shoes, no socks, ever. She is holding up one finger
near her chin in a thoughtful "I've got it!" expression — eyes wide, mouth curved in
a small knowing smile. She is the SMALLEST character in this world and every inch of
her carries knowing pride.
3D animated, cartoon style. Medium shot, Mimi centered, full body visible including bare feet. LOC_PARK.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Level with Mimi, tight enough to feel her confidence
MOTION: Hold steady — let her expression do all the work
HOLD: 2 beats — in and out
```

**TRANSITION TO NEXT SHOT:** BOUNCE CUT on "Nana Blossom"

**STYLE CONSISTENCY TAGS:** `#mimi-solo` `#mimi-barefoot` `#mimi-smallest` `#park` `#3d-cartoon`

---

### SHOT_T13
```
TIME: 0:32-0:34
LYRIC CUE: "Nana Blossom Captain Blue"
ENERGY: WARM-MED
BEAT-SYNC: "Nana" on the downbeat; hold warmly through the shot
STORY BEAT: Nana Blossom gets her name-check. "Captain Blue" identity unconfirmed — see OPEN ITEMS.

⚠ PRODUCTION NOTE: "Captain Blue" is an unconfirmed character name from the locked lyrics.
Do NOT invent this character. This shot generates with Nana Blossom only.
HOLD for creator confirmation before finalizing this shot's full content.
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T13
[Nana Blossom: start_image: f9e27584 (welcome_arms_wide) — tall elder woman, natural silver-white hair,
warm deep brown skin, colorful floral apron. ALWAYS TALLEST on screen.]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED
- Nana Blossom is tallest character on screen: CONFIRMED — she is the only character in this shot

SCENE PROMPT:
Nana Blossom standing in her garden with arms open wide in her signature welcome pose —
she is a tall elder woman with natural silver-white hair, warm deep brown skin, and her
colorful floral apron. She is the TALLEST character in this world — her full height is
visible and commanding in the warmest possible way. The garden behind her: sunflowers
taller than the fence, herbs in clay pots, climbing vines on a wooden trellis. Golden
afternoon light. She looks like she has been expecting everyone.
3D animated, cartoon style. Full body shot, Nana at center. She is tallest in frame. LOC_GARDEN.

[⚠ PLACEHOLDER: "Captain Blue" — creator confirmation required before adding second character to this shot]
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Level, wide enough to show her full height and the garden
MOTION: Hold warmly — this is a presence, not action
HOLD: 2 beats — gentle and warm
```

**TRANSITION TO NEXT SHOT:** WARM FADE into the community celebration

**STYLE CONSISTENCY TAGS:** `#nana-solo` `#nana-tallest` `#garden` `#captain-blue-placeholder` `#3d-cartoon`

---

### SHOT_T14
```
TIME: 0:34-0:36
LYRIC CUE: "Everybody welcome to the crew!"
ENERGY: HIGH
BEAT-SYNC: "Everybody" on the downbeat; arms open on "welcome"
STORY BEAT: Mayor Mary, Ava, Rico, and Rena join — the whole neighborhood IS the crew
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T14
[Mayor Mary: <<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>> + start_image: 55122193-47b5-41b9-b615-eae22c0fbd20]
[Ava: start_image: c18df2b0 (welcome)]
[Rico: start_image: f661c59c (sidewalk_basketball)]
[Rena: start_image: 449409c2 (garden_paintbrush)]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED
- Rena's LEFT CHEEK multicolor paint smudge: CONFIRMED

SCENE PROMPT:
<<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>> Mayor Mary stands front-and-center on the
community center steps with her ROYAL PURPLE blazer and GOLD mayoral pin gleaming.
Her mayor's sash is prominently displayed. She has her arms open wide in welcome,
warm joyful expression. Beside her: Ava in her amber-gold top and denim overalls with
welcoming open arms; Rico with his basketball in hand, confident sidewalk stance with
sneakers prominent; Rena in her paint-stained smock with a small multicolor paint
smudge on her LEFT CHEEK — always present — and a paintbrush raised in celebration.
The community center behind them: bright banners, pavilion, open gathering space.
3D animated, cartoon style. Wide group shot on community center steps. LOC_COMMUNITY_CENTER.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Level, wide — all four characters clearly visible
MOTION: Slight pull-back to reveal the full group on the steps
HOLD: 2 beats — quick reveal, energy building into Final Chorus
```

**TRANSITION TO NEXT SHOT:** STAR BURST — Final Chorus DROPS at 0:36

**STYLE CONSISTENCY TAGS:** `#mayor-mary` `#element-id-mayor-mary` `#ava` `#rico` `#rena` `#rena-left-cheek` `#community-center` `#3d-cartoon`

---

## FINAL CHORUS (0:36-0:44)

---

### SHOT_T15
```
TIME: 0:36-0:38
LYRIC CUE: "Sunny and the Crew!"
ENERGY: PEAK
BEAT-SYNC: "Sunny" fires on the chorus downbeat (0:36) — maximum energy
STORY BEAT: Bella gets her solo moment — dignified, elegant, exactly who she is
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T15
[Bella: start_image: da604e85 (sitting_dignified) — elegant orange tabby cat, dignified sitting posture, regal knowing expression]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED
- Commander NOT in this shot: CONFIRMED

SCENE PROMPT:
Bella the elegant orange tabby cat sitting in her perfectly dignified posture on a
sunlit wooden porch railing. She is regal, knowing, upright — she has seen many things
and understood all of them. Her tail curls perfectly around her feet. She gives one
slow approving blink toward camera as if to say: "Yes. Naturally. The crew. Of which
I am fully aware." LOC_SUNNY_PORCH: warm wood tones, potted plants, morning light.
No other characters in this shot.
3D animated, cartoon style. Close-medium on Bella, her full elegance on display.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Eye-level with Bella on the railing
MOTION: Hold perfectly still — Bella does not move for anything
HOLD: 2 beats — she earns every second
```

**TRANSITION TO NEXT SHOT:** SMASH CUT — Commander's turn

**STYLE CONSISTENCY TAGS:** `#bella-solo` `#no-commander` `#porch` `#3d-cartoon`

---

### SHOT_T16
```
TIME: 0:38-0:40
LYRIC CUE: "We're coming through!"
ENERGY: HIGH
BEAT-SYNC: "coming" on the downbeat; Commander's tail wags on "through!"
STORY BEAT: Commander gets his moment — loyal, attentive, good boy energy
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T16
[Commander: start_image: 0a837a71 (good_boy_sit) — large good-natured dog, upright attentive sit, collar with metal tag, warm intelligent eyes]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED
- Bella NOT in this shot: CONFIRMED

SCENE PROMPT:
Commander the large good-natured dog sitting in his perfect attentive upright position
on the sunny sidewalk. His collar with its metal tag catches the morning light. His
warm intelligent eyes look directly at camera with absolute trustworthy loyalty. His
tail is wagging — just barely, but you can feel the full-body happiness he is
containing. He is a GOOD BOY and he knows it. LOC_NEIGHBORHOOD_STREET background:
bright sunny sidewalk, colorful houses. No Bella anywhere in this shot.
3D animated, cartoon style. Medium shot, Commander centered, upright and attentive.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Slightly low — Commander's size and presence fills the frame
MOTION: Hold steady — Commander's tail wag provides all the motion needed
HOLD: 2 beats — in and out, then the BIG finale
```

**TRANSITION TO NEXT SHOT:** BOUNCE CUT — then the whole world comes together

**STYLE CONSISTENCY TAGS:** `#commander-solo` `#no-bella` `#neighborhood-street` `#3d-cartoon`

---

### SHOT_T17
```
TIME: 0:40-0:43
LYRIC CUE: "Something to learn and something to do!"
ENERGY: PEAK
BEAT-SYNC: "learn" on the downbeat; "do!" fires the ensemble celebration
STORY BEAT: ALL 14 characters represented — 12 humans + Koda in one frame
(Bella solo at T15, Commander solo at T16 — both represented, never sharing a shot)
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T17
- SUNNY: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
- LEO: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
- MIA: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>

[Mayor Mary: <<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>> + start_image: 55122193-47b5-41b9-b615-eae22c0fbd20]
[Koda: start_image: eb81f712-c1a1-4316-ab7f-8c29575f93e4 — colorful bandana, bounding]
[Mimi: start_image: d21cc872-3688-4435-bf48-1741ed3ca897 — BAREFOOT, SMALLEST on screen, wild curly hair]
[Pipa: start_image: 08a4f193-294c-4b90-afa3-513f7229c797 — braids/locs with beads, paint-stained fingers]
[Bram: start_image: 43fa73d8-9f8b-40b4-bfab-0477bc04829f — helmet, knee pads, colorful skateboard]
[Nana Blossom: start_image: f9e27584 (welcome_arms_wide) — TALLEST on screen, silver-white hair, floral apron]
[Ava: start_image: c18df2b0 (welcome)]
[Rico: start_image: f661c59c (sidewalk_basketball)]
[Rena: start_image: 449409c2 (garden_paintbrush)]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED
- Mimi is barefoot: CONFIRMED
- Mimi is smallest character on screen: CONFIRMED
- Nana Blossom is tallest character on screen: CONFIRMED
- Rena's LEFT CHEEK multicolor paint smudge: CONFIRMED
- Commander NOT in this shot: CONFIRMED
- Bella NOT in this shot: CONFIRMED

SCENE PROMPT:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
<<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>>
The entire neighborhood crew celebrating together in Sunny's bright backyard.
Sunny center-front with both fists raised, Leo beside her with notebook in the air,
Mia mid-cartwheel to their right. Koda bounding through the group with bandana flying.
Mimi BAREFOOT front-and-left — she is the SMALLEST person in the entire scene, wild
full curly hair bouncing, bare feet clearly visible on the grass.
Pipa with paint-stained fingers raised, braids-with-beads flying. Bram rolling on his
colorful skateboard with helmet and knee pads.
Nana Blossom standing behind the group — she is the TALLEST person in the entire
scene, silver-white hair and colorful floral apron prominent, arms wide.
Mayor Mary (ROYAL PURPLE blazer, GOLD mayor's pin, mayor's sash) arms open wide.
Ava, Rico (basketball in hand), and Rena (multicolor paint smudge on LEFT CHEEK
clearly visible) fill the background.
LOC_BACKYARD: picnic table, easel, green grass, white fence. Golden late-afternoon light.
Sparkle trails (#7EC8E3 cyan) arc through the scene connecting everyone.
3D animated, cartoon style. Wide ensemble shot, maximum joy, everyone visible.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide, slightly elevated — see everyone at once, Sunny front-center
MOTION: Slow pull-back to reveal the full gathering as the shot holds
HOLD: 3 beats — this is the PAYOFF, let it breathe
```

**TRANSITION TO NEXT SHOT:** STAR BURST into final title moment

**STYLE CONSISTENCY TAGS:** `#full-crew` `#element-id-sunny` `#element-id-leo` `#element-id-mia` `#element-id-mayor-mary` `#mimi-barefoot` `#mimi-smallest` `#nana-tallest` `#rena-left-cheek` `#no-bella` `#no-commander` `#backyard` `#3d-cartoon`

---

### SHOT_T18
```
TIME: 0:43-0:44
LYRIC CUE: "Sunny and the Crew — that's me and you!"
ENERGY: PEAK
BEAT-SYNC: "Crew" on the final downbeat; "you!" fires the last energy pulse
STORY BEAT: Sunny closes with direct address — YOU are in this crew. Full stop.
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T18
- SUNNY: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> Sunny in extreme close-up, facing camera
with total warm eye contact — this is THE most direct address of the entire song.
Her expression is pure love and inclusion: eyes sparkling, smile wide but gentle, head
tilting slightly as she delivers "that's me and you." One hand presses lightly to her
chest on "me" — then both arms open toward the camera on "you."
The title text "Sunny and the Crew!" begins to materialize in warm bubble letters in
the foreground — yellow (#FFCC00) "Sunny" with sun-glow, white with coral outline
"and the Crew!" — letters drifting into frame one by one.
3D animated, cartoon style. Extreme close-medium, direct address. Title emerges.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Close-medium — intimate, final, complete
MOTION: Hold perfectly still; let Sunny and the emerging title carry all movement
HOLD: Final beat — title settles as she holds eye contact
```

**TRANSITION TO NEXT SHOT:** HARD CUT on the "Hey!" outro sting

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#direct-address` `#title-card` `#3d-cartoon`

---

## OUTRO STING (0:44-0:45)

---

### SHOT_T19
```
TIME: 0:44-0:45
LYRIC CUE: "Hey! [ukulele hit]"
ENERGY: PEAK SNAP
BEAT-SYNC: The single "Hey!" fires on the hit — ONE BEAT, 1 second, no more
STORY BEAT: The exclamation mark of the whole show. Fast and final.
```

**IMAGE PROMPT:**
```
CHARACTER LOCK — THEME T19
- SUNNY: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> Sunny in her ultimate hero pose: one arm
punching straight up toward the sky, the other arm at a perfect diagonal down-and-out,
body slightly angled — the full superhero landing stance. Face: the biggest open-mouth
grin imaginable, eyes WIDE, pure explosive joy. The "Sunny and the Crew!" title logo
is FULLY formed behind her in massive bubble letters. A star-burst of white light
explodes from the center of the frame and contracts back — TYPE C STAR BURST.
Full golden afternoon light. Perfect hold.
3D animated, cartoon style. Low hero angle, full body, title card complete.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Low hero angle — she dominates the frame
MOTION: SNAP — zero ramp-up. The star burst fires and holds.
HOLD: This IS the hold — 1 second, title card settled, DONE
```

**TRANSITION:** END OF THEME — cut to dialogue setup OR outro sting per episode context

**STYLE CONSISTENCY TAGS:** `#sunny-hero` `#element-id-sunny` `#title-card` `#star-burst` `#3d-cartoon`

---

## PRODUCTION-READY SHOT MAP

| Shot | Time | Dur | Section | Lyric Cue | Characters | Location | Energy | Medias |
|------|------|-----|---------|-----------|------------|----------|--------|--------|
| T01 | 0:00-0:04 | 4s | INTRO | [Instrumental] | — | LOC_NEIGHBORHOOD_STREET | LOW→BUILD | none |
| T02 | 0:04-0:06 | 2s | VERSE_1 | "Come on outside the day is new" | Sunny | LOC_SUNNY_PORCH | HIGH | Sunny element ID |
| T03 | 0:06-0:08 | 2s | VERSE_1 | "Got something fun for me and you" | Sunny | LOC_NEIGHBORHOOD_STREET | HIGH | Sunny element ID |
| T04 | 0:08-0:10 | 2s | VERSE_1 | "Friends are waiting what do we do" | Sunny, Leo, Mia | LOC_NEIGHBORHOOD_STREET | MED-HIGH | 3 element IDs |
| T05 | 0:10-0:12 | 2s | VERSE_1 | "It's time to roll with the whole crew!" | Sunny, Leo, Mia | LOC_NEIGHBORHOOD_STREET | PEAK | 3 element IDs |
| T06 | 0:12-0:15 | 3s | CHORUS_1 | "Sunny and the Crew!" | Sunny | LOC_NEIGHBORHOOD_STREET | PEAK | Sunny element ID |
| T07 | 0:15-0:18 | 3s | CHORUS_1 | "We're coming through!" | Sunny, Leo, Mia, Koda | LOC_NEIGHBORHOOD_STREET | PEAK | 3 element IDs + Koda start_image |
| T08 | 0:18-0:21 | 3s | CHORUS_1 | "Something to learn and something to do!" | Sunny, Leo, Mia | LOC_BACKYARD | HIGH | 3 element IDs |
| T09 | 0:21-0:25 | 4s | CHORUS_1 | "Sunny and the Crew! / Me and you!" | Sunny, Koda, Mimi, Pipa, Bram | LOC_BACKYARD | PEAK | 1 element ID + 4 start_images |
| T10 | 0:25-0:28 | 3s | CHORUS_1 | "Every single day we start brand new!" | Sunny | LOC_NEIGHBORHOOD_STREET | HIGH | Sunny element ID |
| T11 | 0:28-0:30 | 2s | VERSE_2 | "Bram and Pipa Koda too" | Bram, Pipa, Koda | LOC_NEIGHBORHOOD_STREET | MED-HIGH | 3 start_images |
| T12 | 0:30-0:32 | 2s | VERSE_2 | "Mimi's always got a clue" | Mimi | LOC_PARK | MED | Mimi start_image |
| T13 | 0:32-0:34 | 2s | VERSE_2 | "Nana Blossom Captain Blue" | Nana Blossom ⚠ | LOC_GARDEN | WARM-MED | Nana start_image |
| T14 | 0:34-0:36 | 2s | VERSE_2 | "Everybody welcome to the crew!" | Mayor Mary, Ava, Rico, Rena | LOC_COMMUNITY_CENTER | HIGH | Mayor Mary element ID + 3 start_images |
| T15 | 0:36-0:38 | 2s | FINAL_CHORUS | "Sunny and the Crew!" | Bella (no Commander) | LOC_SUNNY_PORCH | PEAK | Bella start_image |
| T16 | 0:38-0:40 | 2s | FINAL_CHORUS | "We're coming through!" | Commander (no Bella) | LOC_NEIGHBORHOOD_STREET | HIGH | Commander start_image |
| T17 | 0:40-0:43 | 3s | FINAL_CHORUS | "Something to learn and something to do!" | 12 humans + Koda | LOC_BACKYARD | PEAK | 4 element IDs + 9 start_images |
| T18 | 0:43-0:44 | 1s | FINAL_CHORUS | "Sunny and the Crew — that's me and you!" | Sunny | LOC_BACKYARD | PEAK | Sunny element ID |
| T19 | 0:44-0:45 | 1s | OUTRO_STING | "Hey! [ukulele hit]" | Sunny | LOC_DIRECT_ADDRESS | PEAK SNAP | Sunny element ID |

---

## OPEN ITEMS — REQUIRES CREATOR RESPONSE

| # | Item | Shot | Status |
|---|------|------|--------|
| 1 | **"Captain Blue"** — Lyric "Nana Blossom Captain Blue" references a character not in characters.json. Who is Captain Blue? | T13 | ⚠ AWAITING CREATOR |

---

*End of Theme Song Animatic Prompt Bible v2.0*
*Updated: 2026-07-07 — Official locked lyrics applied; Mayor Mary element ID added; shot boundaries adjusted to actual lyric timing*
*v1.0 → v2.0: Full restructure from inferred to official locked lyrics. 17 shots → 19 shots. Total runtime 0:44 → 0:45.*
