# SUNNY AND THE CREW — THEME SONG
# Animatic Prompt Bible
# Song: "Sunny and the Crew Theme Song"
# Duration: 0:44 | 105 BPM | Style: Kids pop, ukulele, hand claps
# Music ID: MUSIC_THEME | File: sunny-and-the-crew-THEME.mp3
# Used in: ACT_1_THEME_INTRO, ACT_4_OUTRO_sting
# Version: 1.0 | 2026-07-07

---

## PRODUCTION OVERVIEW

| Item | Value |
|------|-------|
| Total Runtime | 0:44 |
| BPM | 105 |
| Beats Total | 77 |
| Total Shots | 17 (16 unique + 1 outro reuse) |
| Avg Shot Duration | ~2.6 sec |
| Characters Introduced | 14 |
| New Generations Required | 16 |
| Existing Assets | 0 (theme is fully new) |
| Generation Model | nano_banana_2 (auto-resolves to nano_banana_flash) |
| Clip Duration Target | 5 sec each (trim to beat) |

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
- Mayor Mary: text description only — no element ID, no confirmed pose job ID on file

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
| Mayor Mary | Supporting | Text description only |
| Ava | Supporting | start_image: c18df2b0 (welcome) |
| Rico | Supporting | start_image: f661c59c (sidewalk_basketball) |
| Rena | Supporting | start_image: 449409c2 (garden_paintbrush) |
| Bella | Supporting | start_image: da604e85 (sitting_dignified) |
| Commander | Supporting | start_image: 0a837a71 (good_boy_sit) |

---

## SECTION STRUCTURE

| Section | Time | Beats | Shots | Description |
|---------|------|-------|-------|-------------|
| COLD OPEN | 0:00-0:03 | 1-5 | T01 | Neighborhood world establishes |
| SUNNY INTRO | 0:03-0:09 | 6-16 | T02-T03 | Sunny is the lead — she arrives |
| MAIN CREW | 0:09-0:27 | 17-47 | T04-T09 | Leo, Mia, Koda, Mimi, Pipa, Bram + first group shot |
| SUPPORTING CAST | 0:27-0:38 | 48-66 | T10-T14 | Nana, Mayor Mary, Ava+Rico+Rena, Bella, Commander |
| ALL TOGETHER | 0:38-0:44 | 67-77 | T15-T17 | 14-character finale + title card |

---

## COLD OPEN (0:00-0:03)

---

### SHOT_T01
```
TIME: 0:00-0:03
LYRIC CUE: [UKULELE INTRO — pre-lyric instrumental, 5 beats]
ENERGY: LOW → BUILDING
BEAT-SYNC: Camera move starts on first ukulele strum (beat 1, 0:00)
STORY BEAT: The neighborhood wakes up — world established before the crew arrives
```

**IMAGE PROMPT:**
```
Wide establishing shot of a bright, warm suburban neighborhood street bathed in 
morning golden-hour sunlight. 3D animated, cartoon style. Colorful two-story homes 
line both sides of the sidewalk — coral trims, cheerful yellow shutters, window 
boxes overflowing with red and orange flowers. Wide clean sidewalk stretches toward 
the horizon. Green trees arch overhead. Clear blue sky with soft puffy white clouds. 
The street is perfectly still and empty — no characters yet, pure anticipation. 
A friendly mailbox with a hand-painted sun near the foreground. The mood: something 
wonderful is one moment away from starting.
Style: bright, warm, slightly saturated cartoon palette. No characters, no text.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide establishing shot, high angle, slow push-in toward street level
MOTION: Gentle downward drift as if the camera is landing in the neighborhood
HOLD: Last beat holds on the empty street — the quiet before the crew
```

**TRANSITION TO NEXT SHOT:** SMASH CUT on beat 6 — energy jump as Sunny arrives

**STYLE CONSISTENCY TAGS:** `#neighborhood-street` `#establishing` `#golden-hour` `#no-characters` `#3d-cartoon`

---

## SUNNY INTRO (0:03-0:09)

---

### SHOT_T02
```
TIME: 0:03-0:06
LYRIC CUE: ["Hey hey hey — it's SUNNY and the CREW!"]
ENERGY: HIGH
BEAT-SYNC: Sunny enters frame on the word "SUNNY" — sync to ukulele chord pop at beat 6
STORY BEAT: Sunny arrives — she is THE LEAD, the heart of the show
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
Sunny running full speed down the sunny neighborhood sidewalk directly toward camera, 
pigtails streaming behind her from the momentum, both arms pumping at her sides, 
mouth open in the biggest most joyful grin in the world. She is wearing her signature 
coral-and-yellow outfit. The bright neighborhood is behind her — colorful houses, 
green trees, sunlit pavement. Her energy is completely electric. She looks like 
she has the BEST news in the world and cannot wait another second to share it.
3D animated, cartoon style. Full body shot, low camera angle looking up the sidewalk.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Low angle on the sidewalk — Sunny runs toward us and gets bigger every frame
MOTION: Slight camera shake as she approaches, as if the ground is vibrating with her joy
HOLD: End of shot as she reaches almost-too-close to camera
```

**TRANSITION TO NEXT SHOT:** BOUNCE CUT — she plants her feet

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#running` `#neighborhood-street` `#3d-cartoon`

---

### SHOT_T03
```
TIME: 0:06-0:09
LYRIC CUE: ["We LAUGH! We SHARE! We TRY — TOGETHER!"]
ENERGY: PEAK
BEAT-SYNC: Arms spread on "WE" — each word lands on a hand clap beat
STORY BEAT: Sunny directly invites the viewer — this is your show too
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
Sunny has stopped mid-sidewalk, feet planted wide apart, both arms spread as wide 
as physically possible, chin tilted up, pigtails still bouncing from momentum, 
face absolutely radiating joy. She is looking DIRECTLY at camera — at the viewer — 
with pure open-hearted welcome. The neighborhood glows behind her in full golden 
morning light. This is her signature "LOOK — YOU'RE HERE!" pose.
3D animated, cartoon style. Front-facing, direct address, full body.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Eye-level, front-facing — the viewer is being greeted personally
MOTION: Camera holds perfectly still; Sunny bounces lightly on her toes
HOLD: 3-beat hold — let this moment breathe
```

**TRANSITION TO NEXT SHOT:** STAR BURST — pop to Leo's world

**STYLE CONSISTENCY TAGS:** `#sunny-solo` `#element-id-sunny` `#direct-address` `#arms-wide` `#neighborhood-street` `#3d-cartoon`

---

## MAIN CREW INTRO (0:09-0:27)

---

### SHOT_T04
```
TIME: 0:09-0:12
LYRIC CUE: ["That's LEO — he writes it all down!"]
ENERGY: MED-HIGH
BEAT-SYNC: Leo's name "LEO" lands on the downbeat; he looks up on beat
STORY BEAT: Leo introduced — the thinker, the recorder, the one who tracks everything
```

**IMAGE PROMPT:**
```
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
Leo Rivera sitting at his favorite picnic table in a sunny backyard, red notebook 
open in front of him, pencil behind one ear. He has been focused and working — 
the perfect student of life. He looks up from his notes as if he just heard the 
music start, his glasses are slightly sliding down his nose, and his face breaks 
into an unexpectedly wide, genuine smile — the one that surprises people because 
he's usually so focused. He gives one enthusiastic wave directly to camera. 
Backyard with warm green trees and dappled sunlight behind him.
3D animated, cartoon style. Three-quarter angle from the front.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium shot, slight low angle to give Leo's moment its importance
MOTION: Slow push-in as he waves — his smile gets bigger as we get closer
HOLD: Wave completes, hold on his warm grinning face
```

**TRANSITION TO NEXT SHOT:** BOUNCE WIPE to Mia

**STYLE CONSISTENCY TAGS:** `#leo-solo` `#element-id-leo` `#notebook` `#glasses` `#backyard` `#3d-cartoon`

---

### SHOT_T05
```
TIME: 0:12-0:15
LYRIC CUE: ["And MIA — she's always on the move!"]
ENERGY: HIGH
BEAT-SYNC: Mia cartwheels INTO frame on the word "MOVE" — perfectly synchronized
STORY BEAT: Mia introduced — athletic, joyful, in constant motion
```

**IMAGE PROMPT:**
```
<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
Mia Chen is captured mid-cartwheel on the backyard grass — arms perfectly straight 
and planted, legs split wide overhead, ponytail flying sideways, genuine delight 
on her face. Her sporty lavender-and-teal outfit is bright and vivid. The backyard 
grass is lush green beneath her hands. The picnic table is visible in the background. 
She's not showing off — this is simply how Mia moves through the world. She lands 
with perfect balance, arms out wide, grinning directly at camera.
3D animated, cartoon style. Full body — wide enough to capture the full cartwheel arc.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide shot to capture the full arc of the cartwheel
MOTION: Camera follows her rotation slightly, then locks as she sticks the landing
HOLD: She holds her landing pose for 1 beat — triumphant
```

**TRANSITION TO NEXT SHOT:** SMASH CUT to Koda

**STYLE CONSISTENCY TAGS:** `#mia-solo` `#element-id-mia` `#cartwheel` `#backyard` `#athletic` `#3d-cartoon`

---

### SHOT_T06
```
TIME: 0:15-0:18
LYRIC CUE: ["KODA — our fearless furry friend!"]
ENERGY: HIGH
BEAT-SYNC: Koda bounds into frame on "KODA" — paw hits ground on the beat
STORY BEAT: Koda introduced — loyal, energetic, adventure-ready
```

**IMAGE PROMPT:**
```
A joyful, energetic mixed-breed dog mid-leap across a sunny neighborhood sidewalk, 
captured at the peak of his jump. His colorful bandana flies behind his neck from 
the speed. Ears flopped back from the momentum, tongue out to the side, front paws 
extended forward, back legs tucked — pure airborne joy in every line of his body. 
The neighborhood houses and street behind him are bright and vivid. He is completely 
committed to this leap — this dog was born for adventure.
USE start_image: eb81f712-c1a1-4316-ab7f-8c29575f93e4
3D animated, cartoon style. Full body side profile capturing the full jump arc.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Low angle — looking up at him mid-air, maximizing the sense of flight
MOTION: 1-beat slow-motion hold at peak of jump, then normal speed as he lands
HOLD: Peak of jump — the moment of pure flight
```

**TRANSITION TO NEXT SHOT:** BOUNCE CUT to Mimi and Pipa

**STYLE CONSISTENCY TAGS:** `#koda-solo` `#dog` `#bandana` `#leap` `#neighborhood-street` `#3d-cartoon`

---

### SHOT_T07
```
TIME: 0:18-0:21
LYRIC CUE: ["MIMI brings the spark — PIPA brings the ART!"]
ENERGY: MED-HIGH
BEAT-SYNC: Mimi hits pose on "MIMI"; Pipa does ta-da on "ART"
STORY BEAT: Mimi and Pipa introduced — smallest crew, big personalities
CHARACTER RULES: Mimi ALWAYS BAREFOOT. Mimi ALWAYS SMALLEST character on screen.
```

**IMAGE PROMPT:**
```
Two characters side by side at the edge of Sunny's sunny backyard, posing together.
LEFT CHARACTER (Mimi): A small girl with wild, full curly hair, bare feet planted 
wide on the grass — NO shoes, NO socks anywhere — hands on her hips, head tilted, 
bright curious eyes, wide adventurous grin. She is CLEARLY and NOTICEABLY the 
SMALLEST character on screen. Her bare feet must be visible.
RIGHT CHARACTER (Pipa): A slightly taller girl with artistic braids or locs decorated 
with small beads, wearing a flowy patterned top with color-block details, 
paint-stained fingers on one hand, the other hand raised in a creative "ta-da!" 
gesture — presenting herself like a work of art.
Both face camera. Both are bright and distinctive. Backyard setting.
USE start_image (Mimi): d21cc872-3688-4435-bf48-1741ed3ca897
USE start_image (Pipa): 08a4f193-294c-4b90-afa3-513f7229c797
3D animated, cartoon style. Medium two-shot at their eye level.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium two-shot at their eye level — NOT looking down on them
MOTION: Camera holds steady; characters both snap into their poses with energy
HOLD: Both look directly to camera for 1 beat each
```

**TRANSITION TO NEXT SHOT:** SWIPE to Bram

**STYLE CONSISTENCY TAGS:** `#mimi-solo` `#pipa-solo` `#barefoot-mimi` `#mimi-smallest` `#duo-shot` `#backyard` `#3d-cartoon`

---

### SHOT_T08
```
TIME: 0:21-0:24
LYRIC CUE: ["And BRAM keeps everything rolling!"]
ENERGY: HIGH
BEAT-SYNC: Board pops on "BRAM" — ollie lands on "ROLLING"
STORY BEAT: Bram introduced — the skater, the confident, the mobile one
```

**IMAGE PROMPT:**
```
A boy with a helmet and knee pads on a colorful skateboard, mid-ollie off a low 
sidewalk curb in Sunny's neighborhood. He's at the peak of his trick — board level 
with his feet, one arm out for balance, huge confident grin. The skateboard has a 
vivid distinctive graphic. He has done this trick a thousand times and it feels 
this effortless every single time. The neighborhood street behind him is sunny 
and colorful.
USE start_image: 43fa73d8-9f8b-40b4-bfab-0477bc04829f
3D animated, cartoon style. Full body side angle showing the complete trick arc.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Side angle to capture board in the air
MOTION: Slight push-in as he lands; camera catches his grin at landing
HOLD: He lands perfectly, gives a quick thumbs-up to camera
```

**TRANSITION TO NEXT SHOT:** SMASH CUT to full crew group shot

**STYLE CONSISTENCY TAGS:** `#bram-solo` `#skateboard` `#neighborhood-street` `#trick` `#3d-cartoon`

---

### SHOT_T09
```
TIME: 0:24-0:27
LYRIC CUE: ["TOGETHER — we're the CREW!"]
ENERGY: PEAK
BEAT-SYNC: ALL seven characters hit their poses simultaneously on "TOGETHER"
STORY BEAT: Main crew first group hero shot — the family revealed
CHARACTER RULES: Mimi ALWAYS BAREFOOT. Mimi ALWAYS SMALLEST. All seven visible.
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
All seven main crew members in one wide group shot on Sunny's neighborhood street, 
all facing camera, all radiating joy.
FRONT: Sunny center-front, arms spread wide. The dog Koda (bandana) at her feet.
LEFT SIDE: Mimi — the girl with wild curly hair, BARE FEET VISIBLE on the pavement 
(NO shoes, NO socks), she is CLEARLY THE SMALLEST character on screen.
RIGHT SIDE: Bram on his skateboard at the edge.
MIDDLE BACK: Leo (glasses, red notebook under arm, widest grin). Mia (mid-jump, 
arms up). Pipa (creative ta-da pose).
ALL face camera. ALL in peak energy expressions. 
The bright colorful neighborhood street fills the background.
3D animated, cartoon style. Wide group formation — every character fully visible, 
no one obscured.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Wide angle, slightly low — the full crew fills the frame with energy
MOTION: Slow push-in as the group holds their pose; we feel the joy growing
HOLD: 3-beat hold — this is the main crew HERO SHOT
```

**TRANSITION TO NEXT SHOT:** CROSS-DISSOLVE to Nana's garden — emotional tone shifts to warmth

**STYLE CONSISTENCY TAGS:** `#main-crew-7` `#group-hero` `#element-id-sunny` `#element-id-leo` `#element-id-mia` `#barefoot-mimi` `#mimi-smallest` `#neighborhood-street` `#3d-cartoon`

---

## SUPPORTING CAST (0:27-0:40)

---

### SHOT_T10
```
TIME: 0:27-0:30
LYRIC CUE: ["NANA BLOSSOM — she's always there for you!"]
ENERGY: WARM / MED
BEAT-SYNC: Nana's arms open wide on "always there" — generous, unhurried beat
STORY BEAT: Nana Blossom introduced — the neighborhood elder, warmth and deep roots
CHARACTER RULE: Nana ALWAYS the TALLEST character on screen.
```

**IMAGE PROMPT:**
```
A tall, warm elder woman standing in a lush neighborhood garden in full morning 
light, arms spread wide in welcome — she is CLEARLY and NOTICEABLY the TALLEST 
person on screen, with significant height above any nearby visual reference. 
Natural silver-white hair full and proud. Warm deep brown skin with laugh lines 
at the corners of her eyes. Wearing a colorful floral apron over a flowing dress. 
Her garden behind her is bursting with life: sunflowers, zinnias, herbs in bright 
terra cotta pots, climbing vines on a wooden fence. She looks directly at camera 
with the most welcoming smile imaginable — the kind that says you belong here.
USE start_image: f9e27584 (Nana Blossom — welcome_arms_wide)
3D animated, cartoon style. Full body shot — her full height must read clearly.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium wide — shot framed to show her full height; she towers with warmth
MOTION: Gentle push-in as she breathes and radiates welcome
HOLD: Arms wide, held for 2 beats — pure, unhurried welcome
```

**TRANSITION TO NEXT SHOT:** BOUNCE WIPE to Mayor Mary

**STYLE CONSISTENCY TAGS:** `#nana-blossom` `#garden` `#nana-tallest` `#arms-wide` `#warmth` `#3d-cartoon`

---

### SHOT_T11
```
TIME: 0:30-0:32
LYRIC CUE: ["MAYOR MARY keeps our town bright!"]
ENERGY: MED-HIGH
BEAT-SYNC: Mayor's wave lands on "MAYOR" — authoritative and fun
STORY BEAT: Mayor Mary introduced — community leader who loves her town
```

**IMAGE PROMPT:**
```
A cheerful, official-looking woman standing on the steps of a bright community 
building, wearing her mayor's sash prominently across her chest. She waves to 
camera with one raised hand and holds a colorful community banner in the other. 
Her smile is enormous and genuine — she genuinely loves this town and everyone 
in it. Her official outfit is festive rather than stuffy, with warm, bold colors. 
A shiny campaign button is pinned to her lapel. The community center steps and 
bright neighborhood park are behind her.
3D animated, cartoon style. Three-quarter angle — sash clearly visible.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium shot — her sash must be legible in the frame
MOTION: She waves; a quick slight tilt down confirms her full ensemble
HOLD: Wave completes — she gives a warm wink to camera
```

**TRANSITION TO NEXT SHOT:** SMASH CUT to Ava, Rico, Rena

**STYLE CONSISTENCY TAGS:** `#mayor-mary` `#sash` `#community-center` `#official-warm` `#3d-cartoon`

---

### SHOT_T12
```
TIME: 0:32-0:35
LYRIC CUE: ["AVA! RICO! RENA — neighbors who CARE!"]
ENERGY: MED-HIGH
BEAT-SYNC: Each name lands on a staccato beat — three quick pops
STORY BEAT: Three neighborhood friends introduced together — the extended community
CHARACTER RULE: Rena — small multicolor paint smudge on LEFT CHEEK — ALWAYS present.
```

**IMAGE PROMPT:**
```
Three neighborhood characters posed together on a sunny sidewalk, each instantly 
distinctive.
LEFT (Ava): A warm, expressive girl with big open eyes and a welcoming posture — 
arms slightly extended in greeting, her natural warmth radiates.
CENTER (Rico): A confident boy with a basketball tucked under one arm, sneakers 
prominent, relaxed sidewalk stance, cool and friendly.
RIGHT (Rena): A creative girl with paint-stained hands, wearing a paint-splattered 
smock — and CRITICALLY: a small multicolor paint smudge clearly visible on her 
LEFT CHEEK (viewer's right when facing camera). The LEFT CHEEK smudge must be 
clearly visible and contain multiple colors.
All three face camera. All have warm, genuine smiles.
USE start_image (Ava): c18df2b0 (welcome)
USE start_image (Rico): f661c59c (sidewalk_basketball)
USE start_image (Rena): 449409c2 (garden_paintbrush)
3D animated, cartoon style. Three-shot on sidewalk, all fully visible.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium-wide three-shot — all three at equal visual weight
MOTION: Each character gestures on their name beat — Ava waves, Rico points, Rena grins
HOLD: All three look to camera simultaneously for 1 beat
```

**TRANSITION TO NEXT SHOT:** BOUNCE CUT to Bella

**STYLE CONSISTENCY TAGS:** `#ava` `#rico` `#rena` `#rena-left-cheek-smudge` `#trio-shot` `#sidewalk` `#3d-cartoon`

---

### SHOT_T13
```
TIME: 0:35-0:37
LYRIC CUE: ["BELLA watches over all!"]
ENERGY: WARM / CALM / DIGNIFIED
BEAT-SYNC: Bella appears on "BELLA" — composed, not frenetic; one beat, one presence
STORY BEAT: Bella introduced — elegant, observational, the neighborhood's wise witness
NOTE: Bella is NOT Commander. They are SEPARATE characters. NEVER in the same shot.
```

**IMAGE PROMPT:**
```
An elegant orange tabby cat sitting perfectly upright in a dignified pose on a sunny 
porch step or wooden fence ledge — back straight, tail wrapped neatly around her 
front paws, eyes bright and knowing. Her fur is beautifully detailed — warm orange 
tabby with clean white markings. She has a regal, composed quality: she sees 
everything, judges nothing, approves of you. She turns her head slightly toward 
camera and gives the smallest, most dignified nod — she has granted this moment 
her attention.
USE start_image: da604e85 (Bella — sitting_dignified)
3D animated, cartoon style. Medium shot. NO Commander visible. NO other dogs.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Medium close — her dignified expression is the subject
MOTION: Very slow push-in; she is perfectly still except for one small ear flick
HOLD: She meets the camera's gaze for 1 full beat
```

**TRANSITION TO NEXT SHOT:** HARD CUT to Commander

**STYLE CONSISTENCY TAGS:** `#bella` `#cat` `#elegant` `#dignified` `#porch` `#not-commander` `#3d-cartoon`

---

### SHOT_T14
```
TIME: 0:37-0:40
LYRIC CUE: ["And COMMANDER — ready to ROLL!"]
ENERGY: HIGH
BEAT-SYNC: Commander sits up tall on "COMMANDER" — alert, sharp, tail-wag on "ROLL"
STORY BEAT: Commander introduced — loyal, dependable, always on duty
NOTE: Commander is NOT Bella. They are SEPARATE characters. NEVER in the same shot.
```

**IMAGE PROMPT:**
```
A large, good-natured dog in a crisp attentive sit at a sunny park or front yard. 
He is BIG — his size reads as strong and trustworthy. Ears alert and upright, 
chest broad, eyes warm and intelligent, looking directly at camera. His tail is 
a blur of wagging motion. He wears a collar with a bright metal tag that catches 
the sunlight. His expression says: I am ready. I am loyal. I am HERE.
USE start_image: 0a837a71 (Commander — good_boy_sit)
3D animated, cartoon style. Full body sit. Low angle to emphasize his size and presence.
NO Bella visible. NO cat of any kind.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Low angle looking slightly up at Commander — his size and presence read strong
MOTION: His tail wags vigorously; he holds his sit but radiates contained energy
HOLD: He opens his mouth in a silent bark — his whole body shakes with it
```

**TRANSITION TO NEXT SHOT:** STAR BURST — finale begins

**STYLE CONSISTENCY TAGS:** `#commander` `#dog` `#sitting` `#alert` `#park` `#not-bella` `#3d-cartoon`

---

## ALL TOGETHER (0:40-0:44)

---

### SHOT_T15
```
TIME: 0:40-0:43
LYRIC CUE: ["We're SUNNY AND THE CREW — and we're here FOR YOU!"]
ENERGY: PEAK — MAXIMUM ENERGY
BEAT-SYNC: ALL 14 characters fully in frame on "HERE FOR YOU" — 3-beat explosion hold
STORY BEAT: The complete crew united — the definitive theme song hero shot
CHARACTER RULES (MANDATORY):
  - Mimi: BARE FEET visible, CLEARLY SMALLEST character on screen
  - Nana Blossom: CLEARLY TALLEST character on screen
  - Bella: at one edge of frame only, separated from Commander
  - Commander: at the OPPOSITE edge of frame from Bella
  - Rena: LEFT CHEEK multicolor paint smudge clearly visible
```

**IMAGE PROMPT:**
```
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>
<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>
<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>
ALL 14 CHARACTERS in one ultra-wide neighborhood panorama. Natural formation 
across the sunny street, backyard entrance, and surrounding area.
FRONT ROW (closest to camera): Sunny — center, arms spread wide, this is her world. 
Koda the dog (bandana) at Sunny's feet leaping mid-air. Mimi — the girl with wild 
curly hair, BARE FEET PLANTED ON PAVEMENT (NO shoes, NO socks), she is CLEARLY 
THE SMALLEST PERSON ON SCREEN.
MIDDLE: Leo (notebook tucked, glasses, wide grin). Mia (mid-jump, arms overhead). 
Pipa (creative ta-da). Bram (on his skateboard).
BACK: Nana Blossom — arms wide, standing CLEARLY AND NOTICEABLY AS THE TALLEST 
PERSON IN THE ENTIRE SHOT (she should tower above everyone). Mayor Mary (sash 
gleaming). Ava (welcoming arms). Rico (basketball). Rena (multicolor paint smudge 
on LEFT CHEEK clearly visible).
EDGES — FAR APART from each other: Bella the orange tabby cat sitting elegantly 
on a ledge at the LEFT EDGE of frame. Commander the large dog sitting alert at 
the RIGHT EDGE of frame. They must be on OPPOSITE SIDES — never adjacent.
All characters face camera. All in peak joy. The neighborhood fills the frame 
with color, light, and warmth.
3D animated, cartoon style. ULTRA-WIDE panoramic group shot. All 14 visible.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Ultra-wide — widest possible angle to fit all 14 characters
MOTION: Slow pull-back as the full crew is revealed in all its glory, then holds
HOLD: 3 full beats — this is THE shot
```

**TRANSITION TO NEXT SHOT:** STAR BURST — title card

**STYLE CONSISTENCY TAGS:** `#all-14-crew` `#group-finale` `#element-id-sunny` `#element-id-leo` `#element-id-mia` `#barefoot-mimi` `#mimi-smallest` `#nana-tallest` `#rena-left-cheek` `#bella-opposite-commander` `#neighborhood` `#3d-cartoon`

---

### SHOT_T16
```
TIME: 0:43-0:44
LYRIC CUE: [UKULELE FINAL CHORD — single ringing strum]
ENERGY: WARM SETTLE
BEAT-SYNC: Title animates in on the final ukulele strum
STORY BEAT: Show title revealed — ceremonial, earned, this is home
```

**IMAGE PROMPT:**
```
The show title "SUNNY AND THE CREW" in bold, rounded, playful cartoon lettering 
centered on a warm gradient background — golden-yellow at top, soft coral at bottom. 
Letters are in the show's signature palette: coral, sunflower yellow, sky blue. 
Small decorative elements orbit the title: tiny stars, sun rays, musical notes, 
small colored stars bursting outward. The Gigi's Playhouse branding appears 
small in one corner. The overall feeling: this is home. This is where we belong.
3D animated, cartoon style. Title card only — no characters present.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Static — title card is the entire subject
MOTION: Letters animate in from STAR BURST, each word pops in sequence, then holds
HOLD: 1 beat — then freeze frame into black
```

**TRANSITION TO NEXT SHOT:** FREEZE FRAME → SMASH TO BLACK (end of ACT_1 theme)

**STYLE CONSISTENCY TAGS:** `#title-card` `#show-logo` `#no-characters` `#3d-cartoon`

---

### SHOT_T17 — OUTRO STING (ACT_4 reuse)
```
TIME: [ACT_4_OUTRO_sting — reuse of T16 visual with shorter hold]
LYRIC CUE: [SHORT THEME STING — 2-3 beat tail]
ENERGY: WARM CLOSING
BEAT-SYNC: Logo appears on the sting's first note
STORY BEAT: Episode end — episode is complete, logo sends viewer off
```

**IMAGE PROMPT:**
```
REUSE: SHOT_T16 asset — same title card "SUNNY AND THE CREW."
For the outro sting, the animation is faster (2-beat pop instead of 4-beat build).
No additional characters needed. The logo lands and holds.
```

**CAMERA AND MOTION NOTES:**
```
CAMERA: Static
MOTION: Quick logo pop — 2-beat animation, faster than the intro version
HOLD: 1 beat — then fade to black
```

**TRANSITION TO NEXT SHOT:** FADE TO BLACK (end of episode)

**STYLE CONSISTENCY TAGS:** `#title-card` `#outro-sting` `#show-logo` `#3d-cartoon` `#reuse-T16`

---

## PRODUCTION-READY SHOT MAP

| SHOT | TIME | LYRIC CUE ANCHOR | CHARACTERS | LOCATION | ELEMENT IDs USED | START IMAGES | STATUS |
|------|------|-----------------|------------|----------|------------------|--------------|--------|
| T01 | 0:00-0:03 | [UKULELE INTRO] | None | Neighborhood Street | — | — | GENERATE |
| T02 | 0:03-0:06 | "Hey hey hey — it's SUNNY" | Sunny | Neighborhood Street | a40e2d56 | — | GENERATE |
| T03 | 0:06-0:09 | "We LAUGH! We SHARE! We TRY!" | Sunny | Neighborhood Street | a40e2d56 | — | GENERATE |
| T04 | 0:09-0:12 | "That's LEO" | Leo | Backyard | ab579f47 | — | GENERATE |
| T05 | 0:12-0:15 | "And MIA" | Mia | Backyard | 36f55b8e | — | GENERATE |
| T06 | 0:15-0:18 | "KODA — our fearless friend" | Koda | Neighborhood Street | — | eb81f712 | GENERATE |
| T07 | 0:18-0:21 | "MIMI brings the spark, PIPA" | Mimi, Pipa | Backyard | — | d21cc872, 08a4f193 | GENERATE |
| T08 | 0:21-0:24 | "BRAM keeps everything rolling" | Bram | Neighborhood Street | — | 43fa73d8 | GENERATE |
| T09 | 0:24-0:27 | "TOGETHER — we're the CREW!" | Main 7 | Neighborhood Street | a40e2d56, ab579f47, 36f55b8e | eb81f712, d21cc872, 08a4f193, 43fa73d8 | GENERATE |
| T10 | 0:27-0:30 | "NANA BLOSSOM" | Nana Blossom | Garden | — | f9e27584 | GENERATE |
| T11 | 0:30-0:32 | "MAYOR MARY" | Mayor Mary | Community Center | — | text-only | GENERATE |
| T12 | 0:32-0:35 | "AVA! RICO! RENA!" | Ava, Rico, Rena | Sidewalk | — | c18df2b0, f661c59c, 449409c2 | GENERATE |
| T13 | 0:35-0:37 | "BELLA watches over all" | Bella | Porch | — | da604e85 | GENERATE |
| T14 | 0:37-0:40 | "And COMMANDER — ready to ROLL" | Commander | Park | — | 0a837a71 | GENERATE |
| T15 | 0:40-0:43 | "We're SUNNY AND THE CREW" | All 14 | Neighborhood (WIDE) | a40e2d56, ab579f47, 36f55b8e | All pose IDs listed above | GENERATE |
| T16 | 0:43-0:44 | [FINAL CHORD] | None — title card | — | — | — | GENERATE |
| T17 | [ACT_4] | [OUTRO STING] | None — title card | — | — | — | REUSE T16 |

**New generations required: 16 (T01–T16)**
**Reuse: 1 (T17 = T16 asset with faster animation timing)**
**Existing assets: 0 — theme song is fully original**

---

## PRE-GENERATION CHECKLIST

- [ ] Mimi is BAREFOOT in T07 (bare feet on grass) and T15 (bare feet on pavement)
- [ ] Mimi is the SMALLEST character in T07 (vs Pipa) and T15 (vs entire cast)
- [ ] Nana Blossom is the TALLEST character in T10 and T15
- [ ] Bella (T13) and Commander (T14) are in COMPLETELY SEPARATE shots
- [ ] In T15: Bella at LEFT EDGE, Commander at RIGHT EDGE — never adjacent
- [ ] Rena LEFT CHEEK multicolor paint smudge: visible in T12 and T15
- [ ] No age descriptors ("6-year-old" etc.) in any prompt — CONFIRMED
- [ ] No word "Pixar" in any prompt — CONFIRMED
- [ ] Element IDs (<<<UUID>>>) used for: Sunny in T02, T03, T09, T15 — Leo in T04, T09, T15 — Mia in T05, T09, T15
- [ ] Mayor Mary (T11): text description only — no element ID, no pose job ID on file

---

*End of Sunny and the Crew Theme Song Animatic Prompt Bible v1.0*
