# SUNNY AND THE CREW — EP01 EPISODE SONG
# Animatic Prompt Bible
# Song: "Ask Ask Ask"
# Duration: 2:04 (124 seconds) | Style: Kids pop, cartoon energy
# Music ID: MUSIC_EP01_SONG | File: ask-ask-ask.mp3
# Learning Goal: Asking for help is brave and smart
# Episode: EP01 "Ask Ask Ask"
# Version: 1.0 | 2026-07-07

---

## PRODUCTION OVERVIEW

| Item | Value |
|------|-------|
| Total Runtime | 2:04 (124 seconds) |
| Style | Kids pop, cartoon energy |
| Total Shots | 35 |
| Avg Shot Duration | ~3.5 sec |
| Characters | Sunny (lead), Leo (main), Mia (supporting) |
| Generation Model | nano_banana_2 (auto-resolves to nano_banana_flash) |
| Clip Duration Target | 5 sec each (trim to beat) |

---

## SAFETY RULES — READ BEFORE GENERATING

- NEVER use age descriptors ("6-year-old", "7-year-old", "child", "toddler") in any prompt
- NEVER use the word "Pixar" — use "3D animated, cartoon style" instead
- Use <<<UUID>>> element ID syntax inline for Sunny, Leo, and Mia in every prompt they appear in
- Leo wears glasses — always. His red notebook is always nearby.
- Mia is athletic and expressive — always in motion, full-body energy

---

## CHARACTER ELEMENT ID LOOKUP

| Character | Element ID |
|-----------|------------|
| Sunny | <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> |
| Leo Rivera | <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> |
| Mia Chen | <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> |

---

## STORY ARC

The song tells the story of Leo's broken toy rocket. He tries to fix it alone, gets 
stuck, and struggles silently. Sunny sees him and wonders why he doesn't just ask for 
help. The song teaches: **Asking for help is BRAVE and SMART — not a sign of weakness.**
By the end, Leo asks Mia for help, they fix the rocket together, and all three celebrate.

---

## BEAT SHEET REFERENCE (from ep01_beat_sheet.json)

| Beat | Time | Description | Asset Status |
|------|------|-------------|--------------|
| B09 | 0:00-0:10 | Song intro — neighborhood, the mood sets | EXISTING: 8bdc26c0 |
| B10 | 0:10-0:22 | Verse 1 — Leo sad with broken rocket, alone | GENERATE NEW |
| B11 | 0:22-0:35 | Verse 1 — Sunny notices Leo, walks toward him | GENERATE NEW |
| B12 | 0:35-0:47 | Chorus 1 HERO — Sunny raising hand in classroom | EXISTING: a0850a65 |
| B13 | 0:47-0:57 | Chorus 1 — Sunny joy jump | EXISTING: 36c855fa |
| B14 | 0:57-1:11 | Verse 2 — Mia arrives, helps Leo | GENERATE NEW |
| B15 | 1:11-1:22 | Verse 2 end — Leo gathers courage, raises hand | GENERATE NEW |
| B16 | 1:22-1:34 | Chorus 2 — All three celebrate the fixed rocket | GENERATE NEW |
| B17 | 1:34-1:44 | Chorus 2 end — Sunny running in celebration | EXISTING: 315b284c |
| B18 | 1:44-2:04 | Song outro — Sunny on porch, warm wind-down | EXISTING: 97c88d99 |

---

## SECTION STRUCTURE

| Section | Time | Beats | Shots | New/Existing |
|---------|------|-------|-------|--------------|
| INTRO | 0:00-0:10 | B09 | A01-A03 | EXISTING asset |
| VERSE 1 | 0:10-0:35 | B10-B11 | A04-A10 | GENERATE |
| CHORUS 1 | 0:35-0:57 | B12-B13 | A11-A16 | EXISTING assets |
| VERSE 2 | 0:57-1:22 | B14-B15 | A17-A24 | GENERATE |
| CHORUS 2 | 1:22-1:44 | B16-B17 | A25-A30 | GENERATE + EXISTING |
| OUTRO | 1:44-2:04 | B18 | A31-A35 | EXISTING asset |

---

## INTRO (0:00-0:10) — Beat B09

**EXISTING ASSET: image/clip ID 8bdc26c0**
This beat uses an existing neighborhood wide shot. The following shots are derived 
from or pair with this asset.

---

### SHOT_A01
```
TIME: 0:00-0:03
LYRIC CUE: [INSTRUMENTAL INTRO — song hasn't started yet, mood-setting]
ENERGY: CALM / BUILDING
BEAT-SYNC: First beat of the song — hold on the neighborhood
STORY BEAT: The world before the problem — peaceful neighborhood morning
ASSET: REUSE 8bdc26c0 or generate matching establishing shot
```

**IMAGE PROMPT:**
```
Wide shot of a bright, sunny neighborhood on a clear morning. 3D animated, 
cartoon style. Colorful houses, green trees, a clean wide sidewalk. The 
atmosphere is cheerful and expectant — something is about to happen. 
The frame is wide enough to show Sunny's backyard gate at one side. 
No characters visible yet.
REFERENCE EXISTING ASSET: 8bdc26c0
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide establishing — same world grammar as the theme song
MOTION: Gentle push-in toward the backyard; mood of anticipation
HOLD: 3 beats — establishing the calm before the problem
```

**TRANSITION TO NEXT SHOT:** SOFT PUSH CUT to Leo in the backyard

**STYLE CONSISTENCY TAGS:** `#neighborhood` `#establishing` `#no-characters` `#calm` `#3d-cartoon`

---

### SHOT_A02
```
TIME: 0:03-0:06
LYRIC CUE: [INTRO — light musical build, first hint of melody]
ENERGY: CALM
BEAT-SYNC: Cut in on musical swell
STORY BEAT: Leo is introduced — he's at his table, rocket in front of him, hopeful
```

**IMAGE PROMPT:**
```
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
Leo Rivera sitting at the picnic table in Sunny's backyard, a small colorful toy 
rocket model sitting on the table in front of him. He's looking at it with careful, 
hopeful attention — like he's planning something. His red notebook is open beside 
the rocket. His glasses are on. The morning light falls warm and golden over the 
table. Everything is still okay — the rocket isn't broken yet.
3D animated, cartoon style. Medium shot — Leo and the rocket at equal visual weight.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium two-shot of Leo and his rocket
MOTION: Very slow push-in; a gentle, calm observational move
HOLD: Leo's expression is focused and hopeful — hold on this before things change
```

**TRANSITION TO NEXT SHOT:** SMASH CUT — the rocket breaks

**STYLE CONSISTENCY TAGS:** `#leo-solo` `#element-id-leo` `#rocket` `#backyard` `#notebook` `#3d-cartoon`

---

### SHOT_A03
```
TIME: 0:06-0:10
LYRIC CUE: [INTRO — full melody blooms]
ENERGY: MED — something just went wrong
BEAT-SYNC: Rocket piece falls on beat 1 of the fourth bar
STORY BEAT: Leo picks up the rocket — it falls apart in his hands — his face falls
```

**IMAGE PROMPT:**
```
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
Leo holding the toy rocket in both hands at table height. The rocket has just come 
apart — one section has separated, a small piece has fallen to the table. Leo is 
looking down at the broken pieces with an expression of pure deflation: eyebrows 
raised, mouth in a sad small "oh," glasses sliding down his nose. The broken rocket 
pieces are clearly visible on the table surface. This is the moment the problem begins.
3D animated, cartoon style. Medium close — Leo's face and the broken rocket in frame.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium close on Leo and the rocket
MOTION: Camera holds still — the stillness mirrors Leo's frozen moment of disappointment
HOLD: 2 beats on his sad face — we feel his disappointment before the verse starts
```

**TRANSITION TO NEXT SHOT:** MUSIC SWELLS INTO VERSE 1

**STYLE CONSISTENCY TAGS:** `#leo-solo` `#element-id-leo` `#broken-rocket` `#sad` `#backyard` `#3d-cartoon`

---

## VERSE 1 (0:10-0:35) — Beats B10-B11 — GENERATE NEW

---

### SHOT_A04
```
TIME: 0:10-0:14
LYRIC CUE: ["He's got a problem, doesn't know what to do..."]
ENERGY: LOW / SAD
BEAT-SYNC: Each lyric phrase lands on a downbeat
STORY BEAT: Leo alone with broken rocket — trying to fix it by himself, getting nowhere
```

**IMAGE PROMPT:**
```
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
Leo sitting alone at the backyard picnic table, the broken toy rocket scattered 
in pieces in front of him. He's trying to fit a piece back on — his tongue is 
slightly out in concentration, brow furrowed, glasses sliding down. He tries one 
piece, it doesn't fit. He tries another. He's working alone, not asking anyone. 
The backyard is empty around him — no Sunny, no Mia, just Leo and his problem. 
His posture is hunched slightly inward — closed-off, trying to manage alone.
3D animated, cartoon style. Medium shot — Leo and his spread-out rocket pieces.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium — we can see Leo's face and the rocket pieces clearly
MOTION: Slow push-in as the verse builds; closing in on his isolation
HOLD: His furrowed-brow concentration — this is the problem we're solving today
```

**TRANSITION TO NEXT SHOT:** CUT — closer on the rocket problem

**STYLE CONSISTENCY TAGS:** `#leo-solo` `#element-id-leo` `#broken-rocket` `#trying-alone` `#backyard` `#isolated` `#3d-cartoon`

---

### SHOT_A05
```
TIME: 0:14-0:18
LYRIC CUE: ["Keeps it inside — won't say a word..."]
ENERGY: LOW
BEAT-SYNC: "Inside" lands on the downbeat — a closed-off visual moment
STORY BEAT: Leo tries another approach, still alone — a part won't fit — quiet frustration
```

**IMAGE PROMPT:**
```
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
Close on Leo's hands attempting to reconnect a piece of the toy rocket. The piece 
won't click in. His hands try one angle, then another. Pull back slightly to show 
Leo's full face — lips pressed together, working silently, not calling out to anyone. 
He could ask for help. He won't. Yet. His expression shows quiet internal struggle 
— this matters to him and he doesn't want anyone to know he's stuck.
3D animated, cartoon style. Medium close — hands and face.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium close — tighter than A04, more intimate; this is Leo's interior moment
MOTION: Camera holds very still; the stillness emphasizes his silence
HOLD: 2 beats — the silence is the point
```

**TRANSITION TO NEXT SHOT:** SLOW WIPE to wider shot showing Leo's isolation

**STYLE CONSISTENCY TAGS:** `#leo-solo` `#element-id-leo` `#hands` `#silent` `#broken-rocket` `#backyard` `#3d-cartoon`

---

### SHOT_A06
```
TIME: 0:18-0:22
LYRIC CUE: ["Sitting alone with the problem unheard..."]
ENERGY: LOW / MELANCHOLY
BEAT-SYNC: "Alone" hits the downbeat — wide shot emphasizes emptiness
STORY BEAT: Wide pullback reveals how alone Leo is — the yard is big, he is small in it
```

**IMAGE PROMPT:**
```
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
Wide shot of Sunny's backyard. Leo is at the picnic table, small in the large green 
space. The broken rocket pieces are spread on the table surface. Leo has his head 
slightly bowed. The yard around him is empty, open, and sunny — there's nothing 
threatening about the space, but he seems very alone in it. The gate to the street 
is visible in the background. Help is nearby, but Leo hasn't thought to call for it.
3D animated, cartoon style. Wide shot — Leo is small in the frame to emphasize isolation.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide — Leo occupies about 1/4 of the frame; the empty yard around him says everything
MOTION: Very slow pull-back; increasing the sense of his isolation
HOLD: 2 beats — widest shot of the verse; the emotional low point
```

**TRANSITION TO NEXT SHOT:** SMASH CUT as Sunny appears in frame — energy shift

**STYLE CONSISTENCY TAGS:** `#leo-solo` `#element-id-leo` `#wide-shot` `#isolated` `#backyard` `#emotional-low` `#3d-cartoon`

---

### SHOT_A07
```
TIME: 0:22-0:26
LYRIC CUE: ["But wait — someone sees him..."]
ENERGY: SHIFTING — discovery
BEAT-SYNC: "Wait" hits on beat 1 — camera finds Sunny
STORY BEAT: Sunny enters — she spots Leo across the yard, curious; she can see something's wrong
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
Sunny walking through the backyard gate from the street side, mid-step, head 
turning toward Leo at the picnic table. She's seen him mid-stride and stopped 
to look — her expression has shifted from casual to curious and concerned. 
She spots that something is off. Her hand is on the gate latch, one foot 
inside the yard, the other still on the path — she caught herself the moment 
she saw him. Leo is visible but out of focus in the background.
3D animated, cartoon style. Medium wide — Sunny in foreground, Leo soft in background.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium wide — Sunny sharp in foreground, Leo out of focus beyond
MOTION: Slight push-in on Sunny as she notices him; camera follows her gaze
HOLD: Her expression of recognition — she knows something's wrong
```

**TRANSITION TO NEXT SHOT:** PUSH CUT — Sunny walks toward Leo

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#gate` `#backyard` `#noticing` `#leo-background` `#3d-cartoon`

---

### SHOT_A08
```
TIME: 0:26-0:30
LYRIC CUE: ["She walks right up, she takes a look..."]
ENERGY: MED — purposeful
BEAT-SYNC: Sunny's steps sync to the walking beat pattern in the music
STORY BEAT: Sunny walks toward Leo — purposeful, caring, not rushing
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
Sunny walking across the backyard toward Leo who is at the picnic table. She's 
three-quarters of the way there, mid-stride, arms swinging naturally. Her expression 
is warm and curious — she's not alarmed, she's a good friend who pays attention. 
Leo is at the table in the background, still hunched over his rocket. He hasn't 
noticed her yet.
3D animated, cartoon style. Wide medium — both characters in frame, Sunny closer to camera.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide medium — tracks Sunny's walk toward Leo
MOTION: Camera follows Sunny's movement, pulling her and Leo into the same frame
HOLD: As she arrives at the table edge
```

**TRANSITION TO NEXT SHOT:** SMASH CUT to close two-shot at the table

**STYLE CONSISTENCY TAGS:** `#sunny-and-leo` `#element-id-sunny` `#element-id-leo` `#backyard` `#approach` `#3d-cartoon`

---

### SHOT_A09
```
TIME: 0:30-0:33
LYRIC CUE: ["She sees the rocket — she reads the look..."]
ENERGY: MED — intimate
BEAT-SYNC: "Sees" on beat 1 — close on Sunny's face reacting
STORY BEAT: Sunny sees the broken rocket and Leo's expression — she understands immediately
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
Close on Sunny's face as she looks at the broken rocket on the table. Her expression 
is one of quiet, warm understanding — eyebrows gently raised, mouth soft. She's not 
pitying him; she just gets it. She knows what he needs. She glances up from the rocket 
to look at Leo with a gentle, knowing expression. She is a good friend.
3D animated, cartoon style. Medium close — Sunny's face, broken rocket pieces visible below.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium close — Sunny's face is the subject; rocket pieces in lower frame
MOTION: Very slight push-in; warm and gentle
HOLD: Her understanding expression — 2 beats
```

**TRANSITION TO NEXT SHOT:** CUT to Leo still not looking up

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#understanding` `#warm` `#backyard` `#3d-cartoon`

---

### SHOT_A10
```
TIME: 0:33-0:35
LYRIC CUE: ["There's a better way — just say the word!"]
ENERGY: MED-HIGH — building toward chorus
BEAT-SYNC: "Better way" rises into the pre-chorus lift; energy crests here
STORY BEAT: Sunny looks directly at camera — the lesson is forming; she knows what needs to happen
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
Sunny turns from Leo to look directly at camera — at the viewer — with a warm, 
knowing expression. Not smug. Not telling off. Just warm, wise, and ready to share 
what she knows. She raises one finger in the universal "I have an idea" gesture. 
The backyard is behind her, Leo visible softly at the table. This is the pre-chorus 
moment — the energy is cresting, the lesson is one breath away.
3D animated, cartoon style. Medium — Sunny direct address, Leo soft in background.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium — Sunny front and center, direct address
MOTION: Quick push-in as she raises her finger — energy builds
HOLD: 1 beat — then STAR BURST into the chorus
```

**TRANSITION TO NEXT SHOT:** STAR BURST — CHORUS EXPLODES IN

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#direct-address` `#pre-chorus` `#idea` `#backyard` `#3d-cartoon`

---

## CHORUS 1 (0:35-0:57) — Beats B12-B13 — EXISTING ASSETS

---

### SHOT_A11
```
TIME: 0:35-0:39
LYRIC CUE: ["ASK! ASK! ASK! When you need a hand!"]
ENERGY: PEAK
BEAT-SYNC: "ASK!" hits on each explosive beat — the three-beat chorus signature
STORY BEAT: Chorus hero moment — the lesson, bold and joyful
ASSET: EXISTING a0850a65 — Sunny raising hand in classroom-style pose
```

**IMAGE PROMPT:**
```
EXISTING ASSET: a0850a65
Sunny with arm raised high — the classic "raising your hand" pose recontextualized 
as a celebration of asking. This is the HERO IMAGE of the chorus.
If regeneration needed:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
Sunny standing tall and proud with one arm raised high above her head, palm open, 
fingers spread — a bold raised hand, the universal signal of "I have something to say 
and I'm not afraid to say it." Her face is BEAMING — this is a brave act and she 
knows it. Bright, energetic background — could be a classroom, could be the yard, 
doesn't matter: the energy is bold and triumphant.
3D animated, cartoon style. Full body or three-quarter — the raised hand is the hero.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium — Sunny's raised hand is in the upper portion of frame
MOTION: Quick push-in on the chorus drop; then holds on her triumphant pose
HOLD: "ASK ASK ASK" — hold for 3 beats matching the lyric
```

**TRANSITION TO NEXT SHOT:** SMASH CUT — chorus continues

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#raised-hand` `#chorus-hero` `#existing-asset` `#3d-cartoon`

---

### SHOT_A12
```
TIME: 0:39-0:43
LYRIC CUE: ["ASK! ASK! ASK! Someone understands!"]
ENERGY: PEAK
BEAT-SYNC: "ASK!" on each beat — the second pass of the chorus hook
STORY BEAT: The chorus reinforces — asking is how we connect, someone always understands
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
Sunny in a dynamic, wide-legged stance facing camera, both arms out to the sides at 
shoulder height — an open, inviting gesture. Her expression is JOYFUL and BOLD — 
chin up, eyes bright, smile huge. She looks like someone who has just discovered 
the best secret and wants to share it with every single person watching. 
The background: bright, warm, celebratory colors. This is the CHORUS — full energy.
3D animated, cartoon style. Full body — energy fills the frame.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide medium — full body visible, energy fills frame
MOTION: Camera holds; Sunny's movement carries all the energy
HOLD: Her bold open-arm stance — 3 beats
```

**TRANSITION TO NEXT SHOT:** BOUNCE CUT

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#arms-wide` `#chorus` `#bold` `#3d-cartoon`

---

### SHOT_A13
```
TIME: 0:43-0:47
LYRIC CUE: ["Asking for help is brave and SMART!"]
ENERGY: PEAK — emotional peak of Chorus 1
BEAT-SYNC: "SMART" on the final beat — the key message word; biggest visual moment
STORY BEAT: The lesson fully stated — brave AND smart — the two words that change everything
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
Sunny points at her head with one finger (the "smart" gesture) and simultaneously 
has her other fist raised slightly in pride. Her face: genuinely moved, like this 
truth means something to her personally. This isn't a performance — she really 
believes it. The message "brave and smart" is embodied in her posture: strong 
AND warm at the same time.
3D animated, cartoon style. Medium close — face and upper body.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium close — we're close enough to feel the warmth of the message
MOTION: Slight push-in; the intimacy grows as the lesson lands
HOLD: 2 beats — let the message breathe
```

**TRANSITION TO NEXT SHOT:** JOY JUMP transition into B13

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#lesson` `#brave-and-smart` `#chorus` `#3d-cartoon`

---

### SHOT_A14
```
TIME: 0:47-0:52
LYRIC CUE: ["Just say the words — right from your HEART!"]
ENERGY: PEAK — joy, release, celebration
BEAT-SYNC: "HEART" on the downbeat — joy jump lands on this word
STORY BEAT: Sunny joy jump — pure celebratory release; the chorus has its big moment
ASSET: EXISTING 36c855fa — Sunny joy jump
```

**IMAGE PROMPT:**
```
EXISTING ASSET: 36c855fa
Sunny mid-joy-jump — arms up, feet off the ground, face pure delight.
If regeneration needed:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
Sunny captured at the peak of a joy jump — both feet completely off the ground, 
both arms thrown overhead, pigtails flying upward from the momentum. Her face is 
pure, unfiltered delight. The word "HEART" rings in the air around her. 
Background: bright and celebratory, warm colors.
3D animated, cartoon style. Full body — peak of jump, mid-air.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide — shows her full body in the air
MOTION: Slow-motion hold at peak of jump for 2 beats; then normal speed landing
HOLD: Peak of jump — 2 beats
```

**TRANSITION TO NEXT SHOT:** SOFT LAND CUT — energy starts settling

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#joy-jump` `#chorus` `#existing-asset` `#3d-cartoon`

---

### SHOT_A15
```
TIME: 0:52-0:57
LYRIC CUE: ["ASK! ASK! ASK! — Yeah, it's okay..."]
ENERGY: HIGH → SETTLING
BEAT-SYNC: Final chorus pass; energy begins to wind down toward Verse 2
STORY BEAT: Sunny speaks directly to viewer — permission granted; it's safe to ask
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
Sunny looks directly at camera — at the viewer — with a warm, settled confidence. 
She's not bouncing anymore; the chorus energy has found a resting place in calm 
certainty. She gives a single, deliberate nod and a gentle smile. Her eyes are 
warm and direct — speaking personally to whoever is watching: "I mean you. 
It's okay for you specifically."
3D animated, cartoon style. Medium close — direct address, warm expression.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium close — direct address; intimate
MOTION: Camera holds; Sunny's calm is the contrast with the chorus energy
HOLD: 2 beats — nod and smile; then transition to Verse 2
```

**TRANSITION TO NEXT SHOT:** SOFT WIPE — back to Leo's story

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#direct-address` `#permission` `#calm` `#3d-cartoon`

---

## VERSE 2 (0:57-1:22) — Beats B14-B15 — GENERATE NEW

---

### SHOT_A16
```
TIME: 0:57-1:01
LYRIC CUE: ["Back at the table, the rocket still broken..."]
ENERGY: MED — returning to Leo's story
BEAT-SYNC: Return to the grounded, narrative beat of the verse
STORY BEAT: Back to Leo — still stuck, still alone, still trying
```

**IMAGE PROMPT:**
```
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
Leo at the picnic table again. He's been at it a while. The broken rocket pieces 
are still spread in front of him. He's leaning back slightly, looking at them with 
an exhausted "I don't know what to do" expression. He hasn't solved it. One hand 
rests flat on the table. He looks like someone who very much wants to ask for help 
but hasn't figured out how yet.
3D animated, cartoon style. Medium — Leo and the rocket, backyard setting.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium — same framing as Verse 1, we're back in his story
MOTION: Very slight push-in — the story is picking back up
HOLD: 2 beats — his tired expression is the hook into Verse 2
```

**TRANSITION TO NEXT SHOT:** SMASH CUT — Mia enters

**STYLE CONSISTENCY TAGS:** `#leo-solo` `#element-id-leo` `#broken-rocket` `#tired` `#backyard` `#3d-cartoon`

---

### SHOT_A17
```
TIME: 1:01-1:05
LYRIC CUE: ["But MIA comes running — her eyes full of light!"]
ENERGY: MED-HIGH — new energy enters
BEAT-SYNC: "MIA" on the downbeat — she bursts into frame on her name
STORY BEAT: Mia arrives — she's seen the situation and she's here to help
```

**IMAGE PROMPT:**
```
<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
Mia Chen running across the backyard toward Leo at the picnic table, mid-stride, 
arms pumping, face bright and eager. She's clearly coming with purpose — she's 
seen that Leo needs help and she's already decided she's going to do something 
about it. Her ponytail swings behind her. The gate behind her suggests she just 
came from outside the yard.
3D animated, cartoon style. Wide medium — shows her full approach to Leo's table.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide medium — we see Mia running toward Leo in the background
MOTION: Camera follows her movement, tracking her toward the table
HOLD: She arrives at the table edge — the next shot picks up her arrival
```

**TRANSITION TO NEXT SHOT:** CUT — Mia arrives at the table

**STYLE CONSISTENCY TAGS:** `#mia-solo` `#element-id-mia` `#running` `#helping` `#backyard` `#3d-cartoon`

---

### SHOT_A18
```
TIME: 1:05-1:09
LYRIC CUE: ["She says 'I see you — can I help? That's alright!'"]
ENERGY: WARM / MED
BEAT-SYNC: "I see you" — warm, direct, no hesitation
STORY BEAT: Mia kneels by the rocket, examines it — she's not showing off, she genuinely wants to help
```

**IMAGE PROMPT:**
```
<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
Mia crouching beside the picnic table, looking at the broken rocket pieces with 
careful attention. She picks one piece up gently, examines it. Leo watches her 
from his seat — his expression is a mix of cautious hope and pride. He wants 
the help but he's not sure how to accept it. Mia's posture is open and collaborative, 
not taking over — she's examining, not grabbing.
3D animated, cartoon style. Medium two-shot — Leo seated, Mia crouching beside the table.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium two-shot — both characters, their interaction is the subject
MOTION: Slight push-in toward them; the collaboration is beginning
HOLD: 2 beats — Mia examines, Leo watches
```

**TRANSITION TO NEXT SHOT:** CUT — Mia offers her hand

**STYLE CONSISTENCY TAGS:** `#mia-and-leo` `#element-id-mia` `#element-id-leo` `#helping` `#backyard` `#collaboration` `#3d-cartoon`

---

### SHOT_A19
```
TIME: 1:09-1:13
LYRIC CUE: ["Leo — just ask! It's not hard to say!"]
ENERGY: MED — gentle encouragement
BEAT-SYNC: "Ask" lands on the downbeat — the word itself is the beat
STORY BEAT: Mia extends her hand to Leo — the offer is made, Leo must choose
```

**IMAGE PROMPT:**
```
<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
Mia standing beside the table, one hand extended open toward Leo in a clear 
"do you want help?" gesture. Her face is open, warm, and without pressure — 
this is a genuine offer, not a demand. Leo is looking at her offered hand. 
His expression is moving — he's working through something internally. 
The broken rocket is on the table between them.
3D animated, cartoon style. Medium two-shot — Mia's offered hand is the visual focus.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium — both characters, Mia's open hand slightly toward camera
MOTION: Camera holds; the stillness of this beat-before-decision is important
HOLD: 3 beats — this is Leo's moment of choice; let it breathe
```

**TRANSITION TO NEXT SHOT:** CUT — close on Leo's face making the decision

**STYLE CONSISTENCY TAGS:** `#mia-and-leo` `#element-id-mia` `#element-id-leo` `#offered-hand` `#decision-moment` `#backyard` `#3d-cartoon`

---

### SHOT_A20
```
TIME: 1:13-1:17
LYRIC CUE: ["Three little words — 'Can you help me today?'"]
ENERGY: MED — quiet courage
BEAT-SYNC: "Three little words" — slow and deliberate before the breakthrough
STORY BEAT: Leo takes a big breath — we see the courage building in his face
```

**IMAGE PROMPT:**
```
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
Close on Leo's face — eyes closed for one moment, taking a breath. Gathering 
courage. His glasses are on, expression is soft and working-through-something. 
This is what bravery looks like before the brave act: quiet, internal, real. 
One beat. Then his eyes open and there's a decision in them.
3D animated, cartoon style. Medium close — Leo's face, the courage moment.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium close — Leo's face fills the frame
MOTION: Camera completely still — this moment must not be interrupted by motion
HOLD: 3 beats — the breath, the decision, the eyes opening
```

**TRANSITION TO NEXT SHOT:** SMASH CUT — Leo RAISES HIS HAND

**STYLE CONSISTENCY TAGS:** `#leo-solo` `#element-id-leo` `#courage` `#decision` `#close` `#3d-cartoon`

---

### SHOT_A21
```
TIME: 1:17-1:22
LYRIC CUE: ["CAN YOU HELP ME? — He raises his hand!"]
ENERGY: MED-HIGH → building — this is a breakthrough
BEAT-SYNC: Leo's hand goes up on "RAISES" — synchronized to the beat
STORY BEAT: LEO RAISES HIS HAND — he asked for help. The breakthrough moment.
```

**IMAGE PROMPT:**
```
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
Leo Rivera sitting at the picnic table, one arm RAISED HIGH — his classic 
notebook hand, now raised in a request for help. His face is a breakthrough: 
eyes wide and bright behind his glasses, a grin that's half-nervous, 
half-triumphant. He did it. He asked. The raised hand is the hero of this shot. 
Mia is visible in the background, her face lighting up with delight. 
The backyard is bright and warm.
3D animated, cartoon style. Medium — Leo's raised hand in frame, triumphant.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium — Leo's raised hand in upper frame; his face below it
MOTION: Quick push-in as the hand goes up — the energy surge of bravery
HOLD: 2 beats — the hand is up. He did it.
```

**TRANSITION TO NEXT SHOT:** STAR BURST — CHORUS 2 EXPLODES

**STYLE CONSISTENCY TAGS:** `#leo-solo` `#element-id-leo` `#raised-hand` `#breakthrough` `#brave` `#backyard` `#3d-cartoon`

---

## CHORUS 2 (1:22-1:44) — Beats B16-B17 — GENERATE NEW + EXISTING

---

### SHOT_A22
```
TIME: 1:22-1:26
LYRIC CUE: ["ASK! ASK! ASK! — Look what you can do!"]
ENERGY: PEAK
BEAT-SYNC: "ASK" on each explosive beat — the chorus is back, bigger
STORY BEAT: All three together at the table — the rocket IS being fixed
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
Sunny, Leo, and Mia all three working together at the backyard picnic table 
around the toy rocket. Leo is holding two pieces, Mia is helping connect them, 
Sunny is watching with barely-contained excitement, one hand on Leo's shoulder. 
The rocket parts are coming together. The energy in this shot is pure collaborative 
joy — three friends solving a problem together. The table is bright, the yard is 
sunny, and the mood is electric.
3D animated, cartoon style. Wide medium — all three characters fully visible.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide medium — all three characters in the frame, the rocket at center
MOTION: Quick push-in as the chorus drops; their collaborative energy fills the frame
HOLD: 2 beats — the team at work
```

**TRANSITION TO NEXT SHOT:** SMASH CUT — the rocket is FIXED

**STYLE CONSISTENCY TAGS:** `#all-three` `#element-id-sunny` `#element-id-leo` `#element-id-mia` `#teamwork` `#rocket` `#backyard` `#3d-cartoon`

---

### SHOT_A23
```
TIME: 1:26-1:30
LYRIC CUE: ["ASK! ASK! ASK! — We'll get through it too!"]
ENERGY: PEAK — the highest energy beat in Chorus 2
BEAT-SYNC: "We'll" on beat 1 — the WE is the point; together they succeeded
STORY BEAT: THE ROCKET IS FIXED — Leo holds it up, all three react with pure joy
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
Leo holding the now-COMPLETELY-FIXED toy rocket above his head with both hands, 
triumphant, face absolutely beaming — this is the biggest grin we have ever seen 
from Leo. Sunny has her arms raised in victory beside him. Mia is mid-jump with 
both fists in the air. The rocket is whole, perfect, catching the light. 
All three are at peak joy simultaneously. The backyard is golden.
3D animated, cartoon style. Wide medium — all three in frame, rocket held high.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide — all three visible, rocket in the upper center of frame
MOTION: Slow-motion hold for 2 beats as the rocket goes up; then normal speed
HOLD: 2 beats — the triumph. The rocket is fixed. Leo asked for help.
```

**TRANSITION TO NEXT SHOT:** BOUNCE CUT — celebration continues

**STYLE CONSISTENCY TAGS:** `#all-three` `#element-id-sunny` `#element-id-leo` `#element-id-mia` `#fixed-rocket` `#triumph` `#backyard` `#3d-cartoon`

---

### SHOT_A24
```
TIME: 1:30-1:34
LYRIC CUE: ["Asking for help made us STRONGER today!"]
ENERGY: HIGH
BEAT-SYNC: "STRONGER" on the downbeat — the lesson is complete
STORY BEAT: All three celebrate together — pure earned joy
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
All three characters in a group celebration pose — arms up, grinning, completely 
in it together. Sunny is center, arms wide as always. Leo is laughing — genuinely 
laughing, a full body laugh, glasses slightly fogged from the joy. Mia is 
doing a small spinning jump. The fixed rocket is in Leo's other hand. 
The backyard glows around them. This is what it looks like when asking for help works.
3D animated, cartoon style. Wide medium — all three, full body, full energy.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide — celebrates the full group; this is a wide joy shot
MOTION: Slight pull-back to frame all three; camera absorbs their energy
HOLD: 2 beats — then transition to Sunny running
```

**TRANSITION TO NEXT SHOT:** SMASH CUT to running shot

**STYLE CONSISTENCY TAGS:** `#all-three` `#element-id-sunny` `#element-id-leo` `#element-id-mia` `#celebration` `#fixed-rocket` `#backyard` `#3d-cartoon`

---

### SHOT_A25
```
TIME: 1:34-1:39
LYRIC CUE: ["ASK! ASK! ASK! — Don't hold it in!"]
ENERGY: PEAK — running energy
STORY BEAT: Sunny running — pure celebration; the message is now embodied in motion
ASSET: EXISTING 315b284c — Sunny running
```

**IMAGE PROMPT:**
```
EXISTING ASSET: 315b284c
Sunny running at full speed — celebration run, pure joy, no destination.
If regeneration needed:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
Sunny at full sprint across the backyard, pigtails horizontal from the speed, 
both arms swinging, face split into a grin so wide it can barely fit. 
She is running for the pure joy of running. Behind her: Leo and Mia cheering.
3D animated, cartoon style. Wide — full body running, full speed.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide — she runs across the frame from one side to the other
MOTION: Camera follows her run; energy of movement carries the chorus
HOLD: Her mid-run peak — pigtails horizontal, feet off the ground
```

**TRANSITION TO NEXT SHOT:** SMASH CUT — final chorus beat

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#running` `#celebration` `#existing-asset` `#3d-cartoon`

---

### SHOT_A26
```
TIME: 1:39-1:44
LYRIC CUE: ["When you're ready — ask BEGIN!"]
ENERGY: HIGH → SETTLING
BEAT-SYNC: "BEGIN" hits the final chorus beat — the release into the outro
STORY BEAT: Leo holds the fixed rocket, looking at it with gentle pride — the lesson is his now
```

**IMAGE PROMPT:**
```
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
Leo holding the fixed rocket in both hands, looking at it not with triumph now 
but with quiet, warm pride. His grin has softened into a genuine smile. 
His glasses are perfectly on. He did the brave thing. He asked. 
He glances up from the rocket to look at camera — the tiniest nod. 
I know what I know now.
3D animated, cartoon style. Medium — Leo and the rocket, backyard.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium — Leo and his rocket; the rocket is healed, so is he
MOTION: Very slow push-in; the energy is settling beautifully
HOLD: 2 beats — his nod; then WARM FADE into the outro
```

**TRANSITION TO NEXT SHOT:** WARM FADE to the porch

**STYLE CONSISTENCY TAGS:** `#leo-solo` `#element-id-leo` `#fixed-rocket` `#pride` `#gentle` `#backyard` `#3d-cartoon`

---

## OUTRO (1:44-2:04) — Beat B18 — EXISTING ASSET

---

### SHOT_A27
```
TIME: 1:44-1:49
LYRIC CUE: ["You did it — you brave, amazing you..."]
ENERGY: WARM / LOW — the gentle wind-down
STORY BEAT: Sunny on the porch — she's talking to the viewer now, personal and warm
ASSET: EXISTING 97c88d99 — Sunny porch
```

**IMAGE PROMPT:**
```
EXISTING ASSET: 97c88d99
Sunny on her front porch — warm, settled, speaking directly to the viewer.
If regeneration needed:
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
Sunny seated on her front porch steps, turned slightly toward camera. 
She's relaxed, not performing. The afternoon light is golden. She looks 
like she's talking to a friend she trusts.
3D animated, cartoon style. Medium — warm porch setting.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium — porch setting, warm intimate framing
MOTION: Very slow push-in through the outro; warm and unhurried
HOLD: She settles in — the outro is hers to hold
```

**TRANSITION TO NEXT SHOT:** SOFT CUT — continued outro

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#porch` `#direct-address` `#existing-asset` `#warm` `#3d-cartoon`

---

### SHOT_A28
```
TIME: 1:49-1:54
LYRIC CUE: ["Remember — asking means you knew..."]
ENERGY: WARM / REFLECTIVE
BEAT-SYNC: "Remember" on the downbeat — the lesson crystallizing
STORY BEAT: Sunny states the truth gently — asking is knowing you don't have to do it alone
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
Sunny on the porch, one hand on her heart, looking directly at camera with 
complete warmth. Her expression is the one that makes you feel seen — 
warm, real, not performed. She's not teaching; she's sharing. 
Her voice (in our imagination) is soft and sure.
3D animated, cartoon style. Medium close — porch, hand on heart, eye contact.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium close — one step closer than A27
MOTION: Camera holds; she holds; the moment holds
HOLD: 2 beats — hand on heart, direct gaze
```

**TRANSITION TO NEXT SHOT:** SOFT CUT to Leo's reaction

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#porch` `#hand-on-heart` `#direct-address` `#3d-cartoon`

---

### SHOT_A29
```
TIME: 1:54-1:58
LYRIC CUE: ["You knew who you could turn to..."]
ENERGY: WARM
STORY BEAT: Leo in the background waves — he's okay, he learned, he's proud
```

**IMAGE PROMPT:**
```
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
Leo and Mia visible in the background of the yard — Leo is holding his fixed 
rocket, waving to camera with his free hand. Mia beside him, also waving. 
Both are relaxed and happy. The rocket is whole. They figured it out together. 
The yard behind them is warm in late-afternoon light.
3D animated, cartoon style. Wide — Leo and Mia in the background, soft but visible.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide — framed so Leo and Mia in the background are visible
MOTION: Camera holds; gentle background wave carries the warmth
HOLD: 2 beats — Leo's wave, the fixed rocket in his hand
```

**TRANSITION TO NEXT SHOT:** SOFT CUT — final wide shot

**STYLE CONSISTENCY TAGS:** `#leo-and-mia` `#element-id-leo` `#element-id-mia` `#fixed-rocket` `#background` `#waving` `#3d-cartoon`

---

### SHOT_A30
```
TIME: 1:58-2:02
LYRIC CUE: ["ASK ASK ASK — it's the brave thing to do!"]
ENERGY: WARM PEAK — the final, gentle hero moment
BEAT-SYNC: "BRAVE" on the downbeat — the last landing of the key word
STORY BEAT: All three together — final wide shot of the whole story resolved
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
Sunny on the porch steps, Leo and Mia in the yard behind her — all three facing 
camera in a warm, relaxed final group pose. Leo's fixed rocket is in his hand. 
Everyone looks at ease. This is what it looks like when the lesson lives in you. 
The yard and porch are in warm golden late-afternoon light.
3D animated, cartoon style. Wide — all three in frame, porch and yard setting.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide — takes in the full porch and yard; the world feels complete
MOTION: Slow pull-back — the world expands; the story is whole
HOLD: 3 beats — the final group hold
```

**TRANSITION TO NEXT SHOT:** FREEZE FRAME → fade to outro sting

**STYLE CONSISTENCY TAGS:** `#all-three` `#element-id-sunny` `#element-id-leo` `#element-id-mia` `#fixed-rocket` `#porch` `#final-wide` `#3d-cartoon`

---

### SHOT_A31
```
TIME: 2:02-2:04
LYRIC CUE: [MUSIC FADE — final two beats]
ENERGY: FADING
BEAT-SYNC: Last beat of the song
STORY BEAT: Song ends; episode continues into Act 4 dialogue
```

**IMAGE PROMPT:**
```
The warm wide shot from A30 — freeze frame, then slow fade to warm golden wash.
No new generation needed. This is the tail of A30.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Holds on the frozen group; then very slow fade to warm gold
MOTION: Fade out; the song is done; the story continues in dialogue
HOLD: 2 beats — fade complete
```

**TRANSITION TO NEXT SHOT:** WARM FADE → ACT_4 dialogue (B19 onward)

**STYLE CONSISTENCY TAGS:** `#outro` `#fade` `#end-of-song` `#3d-cartoon`

---

## PRODUCTION-READY SHOT MAP

| SHOT | TIME | LYRIC ANCHOR | CHARACTERS | LOCATION | ELEMENT IDs | STATUS |
|------|------|-------------|------------|----------|-------------|--------|
| A01 | 0:00-0:03 | [INSTRUMENTAL] | None | Neighborhood | — | REUSE 8bdc26c0 |
| A02 | 0:03-0:06 | [INTRO MELODY] | Leo | Backyard | ab579f47 | GENERATE |
| A03 | 0:06-0:10 | [MELODY BLOOMS] | Leo | Backyard | ab579f47 | GENERATE |
| A04 | 0:10-0:14 | "He's got a problem..." | Leo | Backyard | ab579f47 | GENERATE |
| A05 | 0:14-0:18 | "Keeps it inside..." | Leo | Backyard | ab579f47 | GENERATE |
| A06 | 0:18-0:22 | "Sitting alone..." | Leo (wide) | Backyard | ab579f47 | GENERATE |
| A07 | 0:22-0:26 | "But wait — someone sees him" | Sunny | Backyard/Gate | a40e2d56 | GENERATE |
| A08 | 0:26-0:30 | "She walks right up..." | Sunny + Leo | Backyard | a40e2d56, ab579f47 | GENERATE |
| A09 | 0:30-0:33 | "She sees the rocket..." | Sunny | Backyard | a40e2d56 | GENERATE |
| A10 | 0:33-0:35 | "There's a better way..." | Sunny | Backyard | a40e2d56 | GENERATE |
| A11 | 0:35-0:39 | "ASK ASK ASK!" | Sunny | Chorus space | a40e2d56 | EXISTING a0850a65 |
| A12 | 0:39-0:43 | "ASK ASK ASK! Someone understands" | Sunny | Chorus space | a40e2d56 | GENERATE |
| A13 | 0:43-0:47 | "Brave and SMART!" | Sunny | Chorus space | a40e2d56 | GENERATE |
| A14 | 0:47-0:52 | "Right from your HEART!" | Sunny | Chorus space | a40e2d56 | EXISTING 36c855fa |
| A15 | 0:52-0:57 | "It's okay..." | Sunny | Chorus space | a40e2d56 | GENERATE |
| A16 | 0:57-1:01 | "Back at the table..." | Leo | Backyard | ab579f47 | GENERATE |
| A17 | 1:01-1:05 | "But MIA comes running..." | Mia | Backyard | 36f55b8e | GENERATE |
| A18 | 1:05-1:09 | "She says I see you..." | Mia + Leo | Backyard | 36f55b8e, ab579f47 | GENERATE |
| A19 | 1:09-1:13 | "Leo — just ask!" | Mia + Leo | Backyard | 36f55b8e, ab579f47 | GENERATE |
| A20 | 1:13-1:17 | "Three little words..." | Leo | Backyard | ab579f47 | GENERATE |
| A21 | 1:17-1:22 | "He raises his hand!" | Leo | Backyard | ab579f47 | GENERATE |
| A22 | 1:22-1:26 | "ASK ASK ASK! Look what you can do!" | All 3 | Backyard | a40e2d56, ab579f47, 36f55b8e | GENERATE |
| A23 | 1:26-1:30 | "We'll get through it too!" | All 3 | Backyard | a40e2d56, ab579f47, 36f55b8e | GENERATE |
| A24 | 1:30-1:34 | "Stronger today!" | All 3 | Backyard | a40e2d56, ab579f47, 36f55b8e | GENERATE |
| A25 | 1:34-1:39 | "Don't hold it in!" | Sunny | Backyard | a40e2d56 | EXISTING 315b284c |
| A26 | 1:39-1:44 | "Ask — BEGIN!" | Leo | Backyard | ab579f47 | GENERATE |
| A27 | 1:44-1:49 | "You brave, amazing you..." | Sunny | Porch | a40e2d56 | EXISTING 97c88d99 |
| A28 | 1:49-1:54 | "Remember — asking means..." | Sunny | Porch | a40e2d56 | GENERATE |
| A29 | 1:54-1:58 | "Who you could turn to..." | Leo + Mia | Backyard (bg) | ab579f47, 36f55b8e | GENERATE |
| A30 | 1:58-2:02 | "The brave thing to do!" | All 3 | Porch + Yard | a40e2d56, ab579f47, 36f55b8e | GENERATE |
| A31 | 2:02-2:04 | [FADE] | — | — | — | REUSE A30 fade |

**Total shots: 31**
**New generations required: 21 (A02-A10, A12-A13, A15-A26, A28-A30)**
**Existing assets reused: 5 (A01: 8bdc26c0 | A11: a0850a65 | A14: 36c855fa | A25: 315b284c | A27: 97c88d99)**

---

## PRE-GENERATION CHECKLIST

- [ ] Leo wears glasses in EVERY shot he appears in (A02-A06, A08-A10, A16-A26, A29-A30)
- [ ] Leo's red notebook is on or near him in backyard shots
- [ ] The broken rocket is present in A02-A21; the FIXED rocket from A22 onward
- [ ] Leo's raised hand (A21) is the emotional peak of the song — generate with maximum care
- [ ] All three element IDs confirmed: Sunny a40e2d56, Leo ab579f47, Mia 36f55b8e
- [ ] No age descriptors anywhere — CONFIRMED
- [ ] No word "Pixar" anywhere — CONFIRMED
- [ ] A11 (a0850a65) and A14 (36c855fa) and A25 (315b284c) and A27 (97c88d99): pull from existing assets before generating
- [ ] A01 (8bdc26c0): reuse or match existing neighborhood establishing shot

---

*End of Ask Ask Ask Animatic Prompt Bible v1.0*
