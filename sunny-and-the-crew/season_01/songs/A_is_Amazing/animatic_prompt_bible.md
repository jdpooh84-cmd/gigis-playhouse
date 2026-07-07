# "A Is Amazing" — Lyric-to-Animatic Prompt Bible
Show: Sunny and the Crew | Season 1 | EP01
Song: A Is Amazing | BPM: 110 | Runtime: 2:20
Version 2.0 | 2026-07-07

> This is the production-ready shot bible for the A Is Amazing episode song.
> All character designs, locations, color values, and style anchors derive from
> visual_world_bible.md and characters.json. Read those documents before using any prompt here.
> Every image prompt below is paste-ready for Higgsfield nano_banana_2.
> ALWAYS prepend the CHARACTER LOCK HEADER embedded in each shot before any generation.

---

## OPEN ITEMS

| Item | Status | Notes |
|---|---|---|
| Sunny element ID | ✅ LOCKED | a40e2d56-573f-4bf2-bdcd-28c64014fdb9 |
| Leo element ID | ✅ LOCKED | ab579f47-e94f-406e-ae63-dd4fd6dd1b18 |
| Mia element ID | ✅ LOCKED | 36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590 |
| Mayor Mary element ID | ✅ LOCKED | 3c1b33d2-ba1b-408c-8d69-b08c656de4bf |
| Koda element ID | ❌ PENDING | No element ID — use pose job ID eb81f712 as start_image |
| Mimi element ID | ❌ PENDING | No element ID — use pose job ID d21cc872 as start_image |
| Nana Blossom element ID | ❌ PENDING | No element ID — use pose job IDs (f9e27584 welcome, 7b2b3970 listening) |

---

## SAFETY RULES

> These rules apply to EVERY prompt in this file. Violations trigger content filter rejections.

1. **NO age descriptors** — Never write "6-year-old," "toddler," "young child," age numbers of any kind. BANNED.
2. **NO word "Pixar"** — Never write "Pixar," "Pixar-style," "Pixar quality." Use "3D animated, cartoon style." BANNED.
3. **CHARACTER LOCK HEADER required** — Every image prompt must begin with the lock header shown in each shot.
4. **Element ID syntax** — Element IDs go inline as `<<<UUID>>>` tags. Backend auto-injects the reference image.
5. **Generation hold** — Do not generate clips for Koda, Mimi, Nana Blossom, Captain Blue until their element IDs are locked. Use text description and start_image only.

---

## CHARACTER ELEMENT ID TABLE

| Character | Element ID | Status | Notes |
|---|---|---|---|
| Sunny | `<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>` | ✅ LOCKED | Use in every Sunny prompt |
| Leo | `<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>` | ✅ LOCKED | Use in every Leo prompt |
| Mia | `<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>` | ✅ LOCKED | Use in every Mia prompt |
| Mayor Mary | `<<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>>` | ✅ LOCKED | Final Chorus only |
| Koda | TEXT + start_image: eb81f712 | ❌ PENDING | Deep warm brown skin, red shirt, khaki shorts |
| Mimi | TEXT + start_image: d21cc872 | ❌ PENDING | Medium warm brown skin, mint green onesie, BAREFOOT |
| Nana Blossom | TEXT + start_image | ❌ PENDING | ALWAYS TALLEST on screen |

---

## SONG STRUCTURE AND TIMING

| Section | Start | End | Duration | Shot Count | Lyric Lines |
|---|---|---|---|---|---|
| Intro | 0:00 | 0:06 | 6s | 1 | "Hey friends..." / "Let's learn..." |
| Verse 1 — Apple | 0:06 | 0:30 | 24s | 5 | 4 lines (apple) |
| Chorus 1 | 0:30 | 0:48 | 18s | 4 | 4 lines |
| Verse 2 — Airplane | 0:48 | 1:12 | 24s | 5 | 4 lines (airplane) |
| Chorus 2 | 1:12 | 1:30 | 18s | 4 | 4 lines |
| Bridge | 1:30 | 1:45 | 15s | 3 | 4 lines |
| Final Chorus | 1:45 | 2:05 | 20s | 4 | 4 lines |
| Outro | 2:05 | 2:20 | 15s | 2 | 3 lines |

**Total: 2:20 | 28 shots**

---

## LYRIC-TO-ANIMATIC PROMPT BIBLE

---

══════════════════════════════════════
SECTION: INTRO | 0:00–0:06 | 6 seconds
Energy Level: 3 — Bouncy (explodes from silence)
Narrative Purpose: Sunny invites the viewer into the song world. First mention of A.
Visual Goal: By end of intro, viewer feels "this is for me" and the letter A is on screen.
Shot count: 1
══════════════════════════════════════

---

**SHOT A01**
Time Range: 0:00–0:06
Lyric Cue: *"Hey friends it's time to play! / Let's learn our A words today!"*
Energy Level: 3 — Bouncy
Beat-Sync: "Hey!" lands on the first melody hit at 0:00. Letter A badge pops on "A words" at 0:04.

**Story Beat:**
Sunny bursts into frame on the opening note — arms wide, bouncing, beaming directly at the camera.
She is the invitation. Leo and Mia are visible celebrating behind her. The Letter of the Day badge
(cream rectangle, coral border, bold letter A) pops into the upper-right corner at 0:04 and bounces
once to settle. This shot must feel like a door opening.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A01
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> bursting toward camera, arms flung wide, mid-bounce,
beaming with pure joy, pigtails mid-swing, yellow t-shirt with white cloud emblem, orange shorts,
yellow-and-white sneakers. She faces directly into the camera — this is an invitation.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> in background left, jumping with fist raised, red
t-shirt with white rocket, navy cargo shorts, round glasses flying. Mia
<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> in background right, clapping overhead, teal star shirt,
grey polka-dot skirt over white leggings, teal crossbody bag bouncing.
In upper-right corner: rounded cream badge with bold coral letter A, tilted mid-arrival, just landing.
Background: LOC_DIRECT_ADDRESS — warm bright yellow gradient, clean and minimal.
Camera: medium shot, camera at Sunny's eye level, slight push-in.
3D animated, cartoon style. Vivid warm palette. Energy: pure kinetic invitation.
```

**Camera and Motion Notes:**
Start: medium shot at Sunny's eye level, slight camera push-in over 6 seconds. Letter A badge pops
at 0:04 on the "A words" lyric — bounces once clockwise and settles. Sunny bounces in-place twice
on the two "Hey friends" and "play" downbeats. Cut at 0:06 on "today!" — hard cut into verse energy.

**Transition to Next Shot:**
TYPE C — Star Burst. White flash from center frame, expands, reveals Verse 1 wide shot.

**Style Tags:**
`loc-direct-address` `char-sunny-leo-mia` `section-intro` `letter-badge-A` `energy-3` `viewer-address`

---

══════════════════════════════════════
SECTION: VERSE 1 — Apple | 0:06–0:30 | 24 seconds
Energy Level: 3 — Bouncy
Narrative Purpose: Introduce "apple" with sensory richness — seeing, naming, tasting, sharing.
Visual Goal: By the last frame of Verse 1, "apple" is lodged in memory through joy and body memory.
Shot count: 5
══════════════════════════════════════

---

**SHOT A02**
Time Range: 0:06–0:12
Lyric Cue: *"Apple apple big and red"*
Energy Level: 3
Beat-Sync: Chalk word APPLE floats in on the first "apple" at 0:06. Scale bounce on second "apple" at 0:08.

**Story Beat:**
Wide shot of Sunny's backyard. Sunny stands at the picnic table holding a large, shiny, oversized red
apple in both hands above her head like a sports trophy. Leo and Mia flank her, arms raised in
celebration. The chalk word APPLE floats in beside the apple in coral wobbly letters.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A02
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> holding a large shiny bright red apple in both hands
overhead, triumphant pose, full grin, yellow t-shirt with cloud emblem, orange shorts.
To her left: Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> with both arms raised celebrating, red
t-shirt with white rocket graphic, dark navy cargo shorts, round glasses.
To her right: Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> jumping slightly with huge eyes, teal
long-sleeve star shirt, grey polka-dot skirt, white leggings, teal crossbody bag swinging.
Floating near the apple: coral chalk-style wobbly text "APPLE."
Background: LOC_BACKYARD — white wooden fence, sunflower garden, red picnic table, warm afternoon light.
Camera: wide medium shot, slightly low angle, slow push-in.
3D animated, cartoon style. Vivid warm palette.
```

**Camera and Motion Notes:**
Start: wide medium shot, slightly low angle. On first "apple" at 0:06: chalk APPLE floats in from left.
On second "apple" at 0:08: 2-frame scale bounce (105%→100%). Camera slow push-in over 6 seconds.
Cut at 0:12 on the downbeat of "red."

**Transition to Next Shot:**
Straight cut — energy match.

**Style Tags:**
`loc-backyard` `char-sunny-leo-mia` `section-verse-1` `prop-apple` `chalk-word-apple` `energy-3`

---

**SHOT A03**
Time Range: 0:12–0:18
Lyric Cue: *"Apple apple overhead"*
Energy Level: 3
Beat-Sync: Camera tilts upward on "overhead." Apple reaches frame peak on the lyric landing.

**Story Beat:**
The oversized apple is tossed gently upward — Sunny tosses, Mia reaches up to catch it with both arms
stretched overhead. Both look up following the arc. Musical note trails drift upward from the characters.
The word "overhead" lands as the apple reaches peak arc — hanging for one clean beat against blue sky.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A03
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> center frame, both arms stretched overhead, mouth
open in delight, fingers reaching toward a large shiny red apple at peak arc above her. Teal star shirt,
grey polka-dot skirt, white leggings. Teal crossbody bag swinging from the motion.
To Mia's left: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> in mid-toss follow-through pose,
weight shifted forward, pigtails catching the motion, orange shorts, yellow cloud-emblem shirt.
Background: LOC_BACKYARD — white fence, and above it: blue sky with white clouds as camera tilts up.
Floating upward: soft translucent musical notes in show palette colors.
Camera: medium shot, slow upward tilt 10 degrees to follow the apple arc.
3D animated, cartoon style. Vivid palette, warm afternoon light.
```

**Camera and Motion Notes:**
Start: medium shot at character level. Camera tilts upward 10 degrees over the 6-second shot to follow
the apple arc. Musical note trail begins at 0:14 and drifts upward. On "overhead" at 0:16: the apple
reaches its visual peak — frame holds one beat with apple against blue sky. Cut at 0:18.

**Transition to Next Shot:**
Straight cut — crunch sound effect bridges.

**Style Tags:**
`loc-backyard-sky` `char-sunny-mia` `section-verse-1` `prop-apple-toss` `musical-note-trail` `energy-3`

---

**SHOT A04**
Time Range: 0:18–0:23
Lyric Cue: *"Crunch it up from core to top"*
Energy Level: 3
Beat-Sync: Crunch sound effect hits exactly on the word "crunch" at 0:18. Bounce on "top" at 0:22.

**Story Beat:**
All three mime biting into an apple with maximum commitment — heads dipping, shoulders popping, enormous
exaggerated crunch faces. Sunny looks directly at the camera mid-crunch with a "you try it" expression.
This is the viewer-participation moment of the verse. The child at home is expected to crunch along.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A04
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> center, facing camera directly mid-crunch, open-mouth
expression, both hands holding an imaginary apple, head dipped forward, shoulders popping up. Yellow
cloud-emblem shirt, orange shorts. Half-turning toward camera with a "your turn" expression.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> to Sunny's left — mid-crunch, round glasses askew
from the motion, red rocket shirt mid-bounce, delighted grin visible past the crunch.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> to Sunny's right — most dramatic crunch of all,
whole body engaged, eyes squeezed shut with the effort, teal star shirt, grey polka-dot skirt.
Background: LOC_BACKYARD — red picnic table behind them, sunflower garden. Warm afternoon light.
Camera: close-medium shot, all three from chest up, static.
3D animated, cartoon style. Vivid palette. Energy: pure participatory joy.
```

**Camera and Motion Notes:**
Start: close-medium shot, all three chest-up. On "crunch" at 0:18: 2-frame scale bounce (107%→100%) —
biggest bounce of the verse. Camera holds completely static so character movement is the kinetic force.
Sunny briefly breaks to face camera at 0:20 — half-second direct look, the call-to-participate beat.
Cut at 0:23 on "top."

**Transition to Next Shot:**
Straight cut — energy match, crunch echo carries.

**Style Tags:**
`loc-backyard` `char-sunny-leo-mia` `section-verse-1` `action-crunch` `viewer-participation` `energy-3`

---

**SHOT A05**
Time Range: 0:23–0:27
Lyric Cue: *"An apple snack that just won't stop!"*
Energy Level: 3
Beat-Sync: Cut syncs to Leo catching the apple on "stop!" at 0:26.

**Story Beat:**
Wide comedic shot — all three characters laughing and miming eating more and more apples in joyful
absurdity. The oversized apple rolls across the picnic table and off the edge. Leo dives sideways to
catch it. The whole shot has the energy of pure infectious delight. This is the pre-chorus peak of Verse 1.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A05
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Wide shot: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> center, laughing with both arms wrapped
around her belly, leaning back in happy exhaustion, yellow cloud shirt, orange shorts.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> diving sideways to catch a large red apple rolling off
the wooden picnic table, arms outstretched, round glasses slightly airborne from the dive, red rocket
shirt, navy cargo shorts, one sneaker off the ground.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> mid-crunch on an imaginary apple, one leg kicked up
behind her with the effort, teal star shirt, grey polka-dot skirt mid-flare, white leggings.
Background: LOC_BACKYARD — full sunflower garden, white fence, warm afternoon light.
Camera: wide shot, slight Dutch tilt (5 degrees) for the playful absurdity.
3D animated, cartoon style. Vivid palette. Maximum joyful chaos energy.
```

**Camera and Motion Notes:**
Start: wide shot, slight Dutch tilt camera-right. Camera holds static — characters fill the frame with
chaos. On "stop!" at 0:26: cut syncs to Leo's catch — a satisfying visual payoff. This is the last
held beat before the Chorus drop at 0:30.

**Transition to Next Shot:**
TYPE C — Star Burst. White flash on "stop!" expands outward, revealing the Chorus wide shot.

**Style Tags:**
`loc-backyard` `char-sunny-leo-mia` `section-verse-1` `action-absurdist-comedy` `pre-chorus-peak` `energy-3`

---

**SHOT A06**
Time Range: 0:27–0:30
Lyric Cue: *(music only — instrumental fill into Chorus)*
Energy Level: 3 (building to 3+)
Beat-Sync: No lyric; this shot breathes before the chorus drop.

**Story Beat:**
Energy crest — Sunny looks directly at the camera with the biggest grin, takes a breath, and opens her
arms wide. Leo holds the recovered apple up like a trophy. Mia is mid-spin, arms out. Three beats of
held anticipation before the chorus explodes.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A06
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Close-medium shot: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> center, arms spread wide, face tilted
slightly up, grin at maximum, taking a visible breath — body language is pure anticipation. Yellow
cloud-emblem shirt, orange shorts, pigtails catching light.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> to Sunny's left, holding the recovered red apple high
in one hand like a trophy, triumphant grin, round glasses, red rocket shirt.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> to Sunny's right, mid-spin, arms spread, teal star shirt,
grey polka-dot skirt mid-flare, white leggings, crossbody bag swinging.
Background: LOC_BACKYARD — vivid saturated backyard behind them.
Camera: close-medium, push-in accelerating slightly — building energy.
3D animated, cartoon style. Maximum vibrancy.
```

**Camera and Motion Notes:**
Start: close-medium shot. Camera push-in accelerates over 3 seconds — building energy toward the chorus.
This shot is pure held breath. Cut at 0:30 hard on the first chorus downbeat.

**Transition to Next Shot:**
TYPE A — Bounce Wipe. Sunny's spread arms fill frame, cut explodes into Chorus hero shot.

**Style Tags:**
`loc-backyard` `char-sunny-leo-mia` `section-verse-1-crest` `anticipation` `energy-3-building`

---

══════════════════════════════════════
SECTION: CHORUS 1 | 0:30–0:48 | 18 seconds
Energy Level: 3+ — Maximum for first half
Narrative Purpose: Celebrate the letter A. First chorus is the emotional peak of the first half.
Visual Goal: Viewer feels IN the celebration, not watching it. Call-and-response required.
BEAT-SYNC REQUIREMENT (MANDATORY): Cut lands on A A A chant. Zoom completes on "amazing." Jump syncs to hand clap.
Shot count: 4
══════════════════════════════════════

---

**SHOT A07**
Time Range: 0:30–0:36
Lyric Cue: *"A is amazing A is the best"*
Energy Level: 3+
Beat-Sync: ZOOM COMPLETES ON "AMAZING" AT 0:31. Scale bounce on both "A" appearances. Letter A badge bounces on "amazing" and "best."

**Story Beat:**
Hero wide low-angle shot — all three characters in Sunny's backyard, arms spread fully wide, faces at
peak joy. The Letter A badge reappears large in the upper frame, bouncing with each syllable. Musical
note trails fill the space above them. The camera's low angle makes the characters feel huge and triumphant.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A07
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Hero wide low-angle shot: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> center frame, both arms spread
fully wide, face tilted slightly upward, huge open grin, pure joy. Yellow cloud shirt, orange shorts,
yellow-and-white sneakers.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> to Sunny's left, arms wide, jumping slightly, round glasses
catching light, red rocket shirt, navy cargo shorts.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> to Sunny's right, both arms raised above head, feet leaving
ground in mid-jump, teal star shirt, grey polka-dot skirt mid-flare, white leggings, teal bag swinging.
Floating above them: large cream badge with bold coral letter A, bouncing. Translucent musical notes fill
upper frame. Warm afternoon sun backlighting all three.
Background: LOC_BACKYARD — white fence, sunflower garden, blue sky with white clouds.
Camera: low-angle wide, camera at knee height, slow push-in beginning.
3D animated, cartoon style. Maximum vivid saturation.
```

**Camera and Motion Notes:**
Start: low-angle wide at knee height. Camera begins slow push-in. On first "A" at 0:30: full scale
bounce (107%→100%). ZOOM COMPLETES ON "AMAZING" AT 0:31 — the push-in reaches medium-wide exactly on
"amazing" and holds. Letter A badge bounces on "amazing" (0:31) and "best" (0:33). Cut at 0:36.

**Transition to Next Shot:**
Straight cut — momentum match.

**Style Tags:**
`loc-backyard` `char-sunny-leo-mia` `section-chorus-1` `hero-wide-low` `letter-badge-A` `beat-sync-zoom-on-amazing` `energy-3-max`

---

**SHOT A08**
Time Range: 0:36–0:40
Lyric Cue: *"A is the letter we love the most"*
Energy Level: 3
Beat-Sync: Sunny's hands open toward camera on "love" at 0:37. Chalk letter A floats in on "letter" at 0:36.

**Story Beat:**
Medium shot on Sunny alone. She places both hands over her heart in a genuine gesture of affection,
then opens them toward the camera — offering the feeling to the viewer. Expression shifts from peak
excitement to something warmer. This is the emotional core of the chorus — love, not hype.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A08
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Medium shot on Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> alone, both hands placed flat over her
heart, eyes soft and warm, smile wide but not frantic — this is love, not hype. Yellow cloud-emblem shirt,
orange shorts. Her hands begin to open outward toward camera as if offering the feeling to the viewer.
Floating near her: large chalk-style letter A in coral, slightly wobbly.
Translucent musical notes drift outward from her heart position.
Background: warm golden gradient blending from LOC_DIRECT_ADDRESS — camera is at Sunny's eye level.
Camera: medium shot, completely static — stillness amid bouncy energy.
3D animated, cartoon style. Warm vivid palette.
```

**Camera and Motion Notes:**
Start: medium shot at Sunny's eye level. No camera movement — this shot is about stillness. On "love"
at 0:37: Sunny's hands open toward camera. Chalk A floats in at 0:36 on "letter." Cut at 0:40 on "most."

**Transition to Next Shot:**
Straight cut — hand gesture energy carries into group shot.

**Style Tags:**
`loc-direct-address` `char-sunny-solo` `section-chorus-1` `emotional-warmth` `chalk-A` `energy-3`

---

**SHOT A09**
Time Range: 0:40–0:44
Lyric Cue: *"Sing it with me — A A A!"*
Energy Level: 3+
Beat-Sync: CUT LANDS ON FIRST "A" AT 0:40. CHARACTER JUMPS SYNC TO HAND CLAP ON EACH A (0:40, 0:41, 0:42). Three chalk A's pop one per beat.

**Story Beat:**
All three face the camera in tight medium shot, leaning forward, urging the viewer to sing. Each "A"
is a separate physical pop — forward lean, a clap, a jump — one beat per letter. This is the
call-and-response beat of the chorus. Three chalk A's appear one at a time on each beat.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A09
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Medium shot, all three facing camera directly:
Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> center, leaning forward toward camera, mouth open
mid-"A!", hands clapping in front of her chest, yellow cloud shirt, orange shorts.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> to Sunny's left, both fists raised in the air on "A!",
round glasses slightly askew, red rocket shirt, navy cargo shorts.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> to Sunny's right, mouth open on "A!", jumping, one foot
off ground, teal star shirt, grey polka-dot skirt mid-flare, white leggings.
All three looking directly at camera. Backgrounds: warm yellow gradient LOC_DIRECT_ADDRESS.
Top of frame: three coral chalk-style letter A's — appearing one at a time, left to right.
Camera: medium shot at their collective eye level, static.
3D animated, cartoon style. Vivid palette. Maximum participatory energy.
```

**Camera and Motion Notes:**
Start: medium shot, camera at their eye level. Camera static. First "A" at 0:40: first chalk A pops
upper-left, characters make first physical forward-lean-and-clap (CUT LANDS HERE). Second "A" at 0:41:
chalk A pops upper-center, second clap-and-jump. Third "A" at 0:42: chalk A pops upper-right — all
three A's now visible. Cut at 0:44 with all three A's visible in frame.

**Transition to Next Shot:**
Straight cut — three A's visible in both frames for continuity.

**Style Tags:**
`loc-direct-address` `char-sunny-leo-mia` `section-chorus-1` `call-and-response` `chalk-A-triple` `beat-sync-cut-on-A-jump-on-clap` `energy-3-max`

---

**SHOT A10**
Time Range: 0:44–0:48
Lyric Cue: *"A words are awesome every day!"*
Energy Level: 3+
Beat-Sync: Bounce Underscore fires on "awesome" at 0:44. Sparkle Trail at 0:45. Cut at 0:48 hard.

**Story Beat:**
Wide jubilant shot — all three in full celebration: arms overhead, jumping, spinning. Backyard feels
like a party. The chalk word "AWESOME" appears in golden chalk letters. Cyan sparkle trail connects all
three characters. This is the highest-energy shot of the first half.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A10
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Wide shot: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> center, full jump, arms thrown overhead,
feet off ground, head tilted back, mouth open in a laugh, yellow cloud shirt, orange shorts, pigtails
mid-swing.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> to her left, one arm stretched toward sky, red rocket
shirt, navy cargo shorts, glasses catching light.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> to Sunny's right, clapping above her head, one foot
kicked behind her with joy, teal star shirt, grey polka-dot skirt airborne, white leggings.
Floating above: chalk-style golden word "AWESOME." Soft cyan sparkle trail connecting all three.
Background: LOC_BACKYARD — sunflower garden, white fence, blue sky.
Camera: wide shot, mid-torso height, slight push-in.
3D animated, cartoon style. Absolute maximum vivid saturation.
```

**Camera and Motion Notes:**
Start: wide shot, mid-torso height. On "awesome" at 0:44: Bounce Underscore (107%→100%) — maximum
amplitude bounce. Sparkle trail plays at 0:45 connecting all three. Chalk "AWESOME" floats in at 0:44.
Cut at 0:48 hard — into Verse 2.

**Transition to Next Shot:**
TYPE A — Bounce Wipe. Sunny's jump peak, silhouette fills frame, cut reveals Verse 2.

**Style Tags:**
`loc-backyard` `char-sunny-leo-mia` `section-chorus-1` `celebration-peak` `chalk-AWESOME` `sparkle-trail` `energy-3-max`

---

══════════════════════════════════════
SECTION: VERSE 2 — Airplane | 0:48–1:12 | 24 seconds
Energy Level: 3 — Bouncy (open, sky-focused, expansive)
Narrative Purpose: Introduce "airplane" with movement and wonder as the sensory anchors.
Visual Goal: By the last frame, "airplane" is as fully embedded as "apple" — movement is the hook.
Shot count: 5
══════════════════════════════════════

---

**SHOT A11**
Time Range: 0:48–0:54
Lyric Cue: *"Airplane airplane in the sky"*
Energy Level: 3
Beat-Sync: Chalk AIRPLANE floats in on second "airplane" at 0:51. Camera tilts upward on "sky."

**Story Beat:**
All three stand in the backyard with heads tilted up, shading eyes, looking at the sky. A stylized
cartoonish red-and-yellow toy airplane on a visible string crosses above them. The chalk word AIRPLANE
floats in coral. Wonder fills the shot — the sky opens above the backyard.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A11
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> center, head tilted back, one hand shading her eyes,
looking up with wonder and delight. Yellow cloud shirt, orange shorts.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> beside Sunny, also shading eyes, mouth slightly open in
awe, round glasses lit from above. Red rocket shirt, navy cargo shorts.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> tiptoeing with excitement, pointing straight up at the
sky with one finger, teal star shirt, grey polka-dot skirt, white leggings, teal crossbody bag.
Above them: a bright cartoonish toy airplane — red body, yellow wings, wide and chunky — on a visible
string, traveling camera-left to camera-right in a gentle arc. Coral chalk text "AIRPLANE" floats near it.
Background: LOC_BACKYARD sky view — blue sky with white clouds above the white fence line.
Camera: medium-wide shot, camera at character eye level, slow upward tilt beginning.
3D animated, cartoon style. Vivid palette.
```

**Camera and Motion Notes:**
Start: medium-wide shot at character level. Camera tilts upward 15 degrees over 6 seconds following the
children's gaze. Chalk AIRPLANE floats in on second "airplane" at 0:51. Airplane crosses left to right.
Cut at 0:54 on "sky" — airplane at its highest point in frame.

**Transition to Next Shot:**
Straight cut — camera keeps tilting up into overhead angle of A12.

**Style Tags:**
`loc-backyard-sky` `char-sunny-leo-mia` `section-verse-2` `prop-airplane` `chalk-AIRPLANE` `upward-tilt` `energy-3`

---

**SHOT A12**
Time Range: 0:54–1:00
Lyric Cue: *"Airplane airplane flying high"*
Energy Level: 3
Beat-Sync: Camera freeze frame at 1:00 on "high" — one beat at Sunny's peak spin.

**Story Beat:**
Overhead angle — looking down at the characters as they look up, the blue sky filling most of frame.
Sunny and Mia spread arms like airplane wings, spinning slowly. Leo has his notebook out, drawing the
airplane with focused earnestness. Musical note trails drift upward.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A12
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
35-degree overhead angle looking down: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> arms spread
like airplane wings, spinning slowly, head tilted back laughing up toward camera. Yellow cloud shirt,
orange shorts, pigtails trailing in the spin.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> beside Sunny, also in airplane-arms pose, twirling
carefully, teal star shirt visible from above, grey polka-dot skirt spinning, white leggings.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> to their right, holding his small notebook open, drawing
an airplane with a stubby pencil — concentrating, tongue slightly out, round glasses on. Red rocket shirt.
Background: mostly vivid blue sky with two white clouds — backyard white fence barely visible at bottom.
Soft translucent musical notes drift upward from all three.
Camera: 35-degree overhead angle, slow push-in.
3D animated, cartoon style. Vivid palette.
```

**Camera and Motion Notes:**
Start: 35-degree overhead angle — characters look UP toward lens, creating shared gaze with viewer.
Slow push-in over 6 seconds. Musical note trail begins at 0:55. On "high" at 1:00: one-frame freeze
at the peak of Sunny's spin — held for one beat, then motion resumes as cut happens.
Cut at 1:00 on the beat accent.

**Transition to Next Shot:**
Straight cut — from above to ground level, playful spatial flip.

**Style Tags:**
`loc-backyard-sky` `char-sunny-leo-mia` `section-verse-2` `airplane-arms` `overhead-angle` `energy-3`

---

**SHOT A13**
Time Range: 1:00–1:06
Lyric Cue: *"Spreading wings and zooming free"*
Energy Level: 3
Beat-Sync: Tracking pan accelerates on "zooming" at 1:03. Cut at 1:06 on "free" — Sunny at full wingspan centered.

**Story Beat:**
Sunny runs across the backyard like an airplane — arms out, body tilted, weaving between sunflowers
and picnic table. Mia runs behind her in formation. Leo stays at the table cheering. Wide enough to
see the full backyard action.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A13
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Wide shot of LOC_BACKYARD in full: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> running across
yard, both arms spread like airplane wings, body tilted 20 degrees left in a banking turn, mouth open
in joy, pigtails streaming behind, yellow cloud shirt, orange shorts, sneakers kicking up behind.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> two steps behind Sunny in identical airplane-arms pose,
teal star shirt, grey polka-dot skirt, white leggings, teal crossbody bag bouncing.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> seated at red picnic table, both arms raised in enthusiastic
cheering, notebook set aside, huge grin, round glasses, red rocket shirt.
Background: LOC_BACKYARD — sunflower garden at center, white fence, warm afternoon light.
Camera: wide shot at mid-height, slow tracking pan left to right following the runners.
3D animated, cartoon style. Vivid warm palette.
```

**Camera and Motion Notes:**
Start: wide shot at mid-height. Slow tracking pan left to right following Sunny and Mia. On "zooming"
at 1:03: pan accelerates briefly — hint of whip-pan energy — then settles. Cut at 1:06 on "free" —
Sunny's arms at full wingspan, perfectly centered.

**Transition to Next Shot:**
Straight cut — from running action to direct address.

**Style Tags:**
`loc-backyard` `char-sunny-leo-mia` `section-verse-2` `airplane-run` `tracking-pan` `energy-3`

---

**SHOT A14**
Time Range: 1:06–1:09
Lyric Cue: *"An airplane goes where it wants to be!"*
Energy Level: 3
Beat-Sync: Sunny's pointing gesture at camera lands on "where" at 1:07. Airplane final crossing at 1:08.

**Story Beat:**
Sunny stops running and faces the camera — slightly out of breath, beaming. She points at the viewer
on "where it wants to be" — the gesture is inclusive. Mia collapses laughing against Sunny's shoulder.
The toy airplane drifts back across the frame, completing its arc.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A14
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Medium shot: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> facing camera directly, slightly catching
her breath, one arm pointing outward toward the lens, huge genuine smile. Pigtails slightly tousled from
running. Yellow cloud shirt, orange shorts.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> leaning happily against Sunny's shoulder from the right,
laughing, eyes crinkled shut. Teal star shirt, grey polka-dot skirt, white leggings, teal bag.
Above their heads: the bright red cartoon airplane drifts past one final time, completing its crossing.
Background: LOC_BACKYARD, warm afternoon light.
Camera: medium shot at their combined eye level, static during gesture.
3D animated, cartoon style. Vivid warm palette.
```

**Camera and Motion Notes:**
Start: medium shot at eye level. On "where" at 1:07: Sunny's point lands directly at camera — camera
does NOT move so the gesture reaches the viewer cleanly. Airplane crosses upper frame at 1:08.
Cut at 1:09 on "be!" — syncing to Chorus 2 drop.

**Transition to Next Shot:**
TYPE C — Star Burst. Flash on "be!" — same as Chorus 1 entry, creating rhythmic pattern.

**Style Tags:**
`loc-backyard` `char-sunny-mia` `section-verse-2` `viewer-address-point` `airplane-final-pass` `energy-3`

---

**SHOT A15**
Time Range: 1:09–1:12
Lyric Cue: *(music only — instrumental fill into Chorus 2)*
Energy Level: 3 (building)
Beat-Sync: No lyric; energy building into chorus. Cut at 1:12 on chorus downbeat.

**Story Beat:**
Leo runs into frame from the right holding his notebook with the airplane drawing visible. He shows it to
Sunny and Mia — they all look at it for one joyful beat, then turn to the camera together. Energy crests.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A15
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Close-medium shot: Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> running into frame, holding his open
notebook toward Sunny and Mia — the page shows a sweet pencil drawing of an airplane, proud and earnest.
Red rocket shirt, navy cargo shorts, round glasses. Sunny
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> reacting with delight at the drawing, turning to camera with
a grin. Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> peering at the notebook, then looking at camera.
Background: LOC_BACKYARD, all warm sunlight.
Camera: close-medium, slight push-in building energy.
3D animated, cartoon style. Vivid palette.
```

**Camera and Motion Notes:**
Start: close-medium. Slight push-in accelerating. On the final beat before 1:12: all three turn to camera
together — the turn IS the launch into Chorus 2. Cut hard at 1:12 on chorus downbeat.

**Transition to Next Shot:**
TYPE A — Bounce Wipe. The camera-turn energy launches into Chorus 2 wide shot.

**Style Tags:**
`loc-backyard` `char-sunny-leo-mia` `section-verse-2-crest` `prop-notebook-airplane` `energy-3-building`

---

══════════════════════════════════════
SECTION: CHORUS 2 | 1:12–1:30 | 18 seconds
Energy Level: 3+ — Same energy, new location signals expansion. Both A-words now fully known.
Narrative Purpose: Viewer is now a full participant — they know apple, airplane, and A. This chorus celebrates that.
BEAT-SYNC REQUIREMENT (MANDATORY): Cut lands on A A A chant. Zoom completes on "amazing." Jump syncs to hand clap.
Shot count: 4
══════════════════════════════════════

---

**SHOT A16**
Time Range: 1:12–1:18
Lyric Cue: *"A is amazing A is the best"*
Energy Level: 3+
Beat-Sync: ZOOM COMPLETES ON "AMAZING" AT 1:13. Letter A badge bounces on "amazing" and "best."

**Story Beat:**
New location — the Coop Playground — signals the world has expanded. Sunny at the top of the playground
slide in a hero pose with arms spread. Leo at the base pumping his fist. Mia on a swing mid-arc. The
chorus here feels community-wide rather than backyard-wide. Letter A badge returns to upper frame.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A16
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Wide shot of LOC_COOP_PLAYGROUND: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> standing at the top
of a bright primary-color slide, arms spread wide in a hero pose, face lit with joy. Yellow cloud shirt,
orange shorts.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> at the base of the slide, both fists pumped in the air,
looking up at Sunny, grinning. Red rocket shirt, navy cargo shorts, round glasses.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> on the swing set mid-arc in background, feet kicked
forward, laughing. Teal star shirt, grey polka-dot skirt, white leggings.
Upper frame: large cream badge with coral letter A, bouncing.
Background: LOC_COOP_PLAYGROUND — hopscotch ground, climbing structure, raised garden beds, picnic tables,
blue sky with clouds. Warm afternoon light.
Camera: wide low-angle shot, slow push-in beginning.
3D animated, cartoon style. Vivid palette.
```

**Camera and Motion Notes:**
Start: wide low-angle. ZOOM COMPLETES ON "AMAZING" AT 1:13 — the push-in reaches its medium-wide endpoint
exactly on that word and holds. Letter A badge bounces on "amazing" (1:13) and "best" (1:15). Cut at 1:18.

**Transition to Next Shot:**
Straight cut — momentum match.

**Style Tags:**
`loc-coop-playground` `char-sunny-leo-mia` `section-chorus-2` `playground-hero` `letter-badge-A` `beat-sync-zoom-on-amazing` `energy-3-max`

---

**SHOT A17**
Time Range: 1:18–1:23
Lyric Cue: *"A is the letter we love the most"*
Energy Level: 3
Beat-Sync: Mia's jump peak at 1:20 on "love." Heart Pop fires on her landing at 1:21.

**Story Beat:**
Medium shot — Mia jumps off the swing at peak arc. Brave, accidental, spectacular. She lands with a
face caught between "oh no" and "I DID IT" — then explodes into the biggest grin we've seen from her.
Leo and Sunny react: gasps turning to cheers. Heart Pop fires from Mia's chest on landing.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A17
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Medium shot: Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> mid-air having just jumped from the swing,
both arms thrown wide, expression transitioning from "oh no" to "I DID IT!" — teal star shirt, grey
polka-dot skirt mid-flare, white leggings. The empty swing swings back behind her.
Behind her to the right: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> mouth open in delighted gasp,
hands moving toward a cheer. Yellow cloud shirt, orange shorts.
Behind her to the left: Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> one hand covering mouth in
surprise then transitioning to cheer, round glasses, red rocket shirt.
From Mia's chest on landing: a small red heart floats upward.
Camera: medium shot, hip height to maximize the airtime feeling.
3D animated, cartoon style. Vivid warm palette.
```

**Camera and Motion Notes:**
Start: medium shot at hip height. On "love" at 1:20: Mia at maximum airtime — one-frame freeze.
Motion resumes on landing. Heart Pop fires from Mia's chest at 1:21. Cut at 1:23 on "most."

**Transition to Next Shot:**
Straight cut — Mia's landing energy carries.

**Style Tags:**
`loc-coop-playground` `char-mia-hero` `section-chorus-2` `swing-jump` `heart-pop` `mia-bravery` `energy-3`

---

**SHOT A18**
Time Range: 1:23–1:27
Lyric Cue: *"Sing it with me — A A A!"*
Energy Level: 3+
Beat-Sync: CUT LANDS ON FIRST "A" AT 1:23. CHARACTER JUMPS SYNC TO HAND CLAP ON EACH A (1:23, 1:24, 1:25). Three chalk A's pop one per beat.

**Story Beat:**
All three in a loose group facing the camera — arms around each other's shoulders. Each "A" gets a
physical pop. Mia is between Sunny and Leo, post-jump bravery still glowing on her face. Three chalk
A's pop in with more confidence than Chorus 1.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A18
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Close-medium shot: all three in a loose group, arms around each other's shoulders, all facing camera.
Center: Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> between the others, mouth wide open on "A!",
beaming with post-jump confidence. Teal star shirt, grey polka-dot skirt, white leggings.
Left: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> arm around Mia's shoulder, singing to camera with
pure warmth. Yellow cloud shirt, orange shorts.
Right: Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> arm around Mia's other shoulder, calling "A!" with
maximum enthusiasm. Red rocket shirt, round glasses. 
Above them: three coral chalk A's popping in one at a time left to right.
Background: warm yellow gradient LOC_DIRECT_ADDRESS.
Camera: close-medium at their eye level, static.
3D animated, cartoon style. Vivid palette.
```

**Camera and Motion Notes:**
Start: close-medium, static. Three chalk A's pop at 1:23, 1:24, 1:25. Bounce Underscore on each.
Each A gets a clap-and-jump from the group. Cut at 1:27 on the third A landing.

**Transition to Next Shot:**
Straight cut — group formation carries into the Chorus 2 closer.

**Style Tags:**
`loc-direct-address` `char-sunny-leo-mia` `section-chorus-2` `call-and-response` `chalk-A-triple` `beat-sync-cut-on-A-jump-on-clap` `energy-3-max`

---

**SHOT A19**
Time Range: 1:27–1:30
Lyric Cue: *"A words are awesome every day!"*
Energy Level: 3+
Beat-Sync: Bounce Underscore on "awesome" at 1:27. Sparkle Trail. Cut hard at 1:30 into Bridge warmth.

**Story Beat:**
Wide playground shot — the biggest of Chorus 2. All three spread out across the frame. Sparkle trail
connects them. Chalk "AWESOME" returns even larger than Chorus 1. The cut at 1:30 should feel like a
door closing into the Bridge's quiet.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A19
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Wide shot of LOC_COOP_PLAYGROUND: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> center, spinning
with arms wide, yellow cloud shirt, orange shorts, pigtails flying.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> far left, jumping with notebook held triumphantly high, red
rocket shirt, navy cargo shorts, round glasses.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> far right, spinning opposite direction to Sunny, one leg
kicked up, teal star shirt, grey polka-dot skirt airborne, white leggings, teal bag swinging.
Cyan sparkle trail connecting all three. Giant chalk "AWESOME" in golden letters above them.
Background: full playground, hopscotch, trees, blue sky. Stylized background figures celebrating.
Camera: wide low-angle, static.
3D animated, cartoon style. Maximum vivid palette.
```

**Camera and Motion Notes:**
Start: wide low-angle. Full Bounce Underscore on "awesome" at 1:27 — maximum amplitude. Sparkle Trail
plays. Camera holds static. Cut hard at 1:30 on the final syllable of "day!" — the cut should feel like
a door closing, pivoting into Bridge warmth.

**Transition to Next Shot:**
TYPE B — Warm Fade. Golden glow from edges — brief transition into Bridge softer energy.

**Style Tags:**
`loc-coop-playground` `char-sunny-leo-mia` `section-chorus-2` `celebration-max` `chalk-AWESOME` `sparkle-trail` `energy-3-max`

---

══════════════════════════════════════
SECTION: BRIDGE | 1:30–1:45 | 15 seconds
Energy Level: 2 — Warm (energy drops for emotional resonance before Final Chorus)
Narrative Purpose: Connect both A-words to feelings. Apple → body joy. Airplane → imagination freedom.
Visual Goal: Viewer feels warm and held. This is the show's "hug" moment.
Shot count: 3
══════════════════════════════════════

---

**SHOT A20**
Time Range: 1:30–1:37
Lyric Cue: *"Apple makes our tummies glad! / Airplane is the best we've had!"*
Energy Level: 2
Beat-Sync: Sunny's tummy-pat on "tummies" at 1:31. Leo's notebook-lift on "best" at 1:35.

**Story Beat:**
Two lyric lines combined — quiet, cozy. Sunny and Mia sit together on the picnic bench, each holding
a small apple. Mia takes a real, small, contented bite. Sunny rubs her tummy with a warm smile.
Then the toy airplane string (tied to the fence post) bobs in a breeze in the background, and Leo
holds up his notebook drawing with quiet pride. The energy is a breath.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A20
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Medium shot: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> and Mia
<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> seated side by side on the wooden picnic bench in LOC_BACKYARD.
Sunny holds a small red apple, one hand patting her tummy with a warm satisfied smile. Yellow cloud shirt,
orange shorts. Mia takes a small genuine bite of her apple, eyes closing with enjoyment. Teal star shirt,
grey polka-dot skirt, white leggings.
To the side: Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> seated at the table, holding up his open
notebook showing a simple pencil drawing of an airplane — looking at it with quiet pride, then shifting
to camera with a small satisfied smile. Red rocket shirt. Behind him on the fence: the toy airplane
string bobbing in a gentle breeze.
Background: LOC_BACKYARD in golden-hour light — softer saturation, warm.
Camera: medium shot at their seated eye level, gentle slow push-in (no Bounce Underscore in the bridge).
3D animated, cartoon style. Slightly warmer and softer palette than choruses.
```

**Camera and Motion Notes:**
Start: medium shot at seated eye level. Gentle push-in — NO Bounce Underscore in the bridge.
Tummy-pat by Sunny on "tummies" at 1:31. Leo's notebook-lift on "best" at 1:35.
Cut at 1:37 on "had."

**Transition to Next Shot:**
Straight cut — warm energy holds.

**Style Tags:**
`loc-backyard-golden-hour` `char-sunny-leo-mia` `section-bridge` `prop-apple-snack` `prop-notebook-drawing` `warm-cozy` `energy-2`

---

**SHOT A21**
Time Range: 1:37–1:41
Lyric Cue: *"A words make the whole day bright"*
Energy Level: 2
Beat-Sync: Lens flare peaks on "bright" at 1:40.

**Story Beat:**
Wide warm golden-hour shot — all three together in the backyard in the last light of afternoon.
Nobody is jumping or performing. They're just together — standing close, warm light falling on all of
them. This is the emotional peak of the bridge. Soft lens flare from the sun over the fence.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A21
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Wide golden-hour shot: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> center, leaning gently against
Leo with one shoulder, smiling softly at something in the middle distance. Yellow cloud shirt, orange
shorts, pigtails catching the warm light.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> to Sunny's left, notebook tucked under arm, a quiet
content smile, round glasses catching a soft lens flare. Red rocket shirt.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> pressed close to Sunny's other side, head resting lightly
on Sunny's arm, eyes half-closed in contentment. Teal star shirt, grey polka-dot skirt, white leggings,
teal crossbody bag.
Background: LOC_BACKYARD in late golden-afternoon — sun just cresting the white fence, casting long warm
shadows, sunflowers glowing. Soft lens flare entering camera-right.
Camera: wide shot, waist height, looking slightly up. No camera movement.
3D animated, cartoon style. Warm golden palette. Saturation slightly softer than choruses.
```

**Camera and Motion Notes:**
Start: wide shot, waist height. No camera movement — complete stillness. Soft lens flare enters
camera-right at 1:38. On "bright" at 1:40: the flare peaks — warmest frame in the song. Cut at 1:41.

**Transition to Next Shot:**
Straight cut — warmth carries into the final bridge line.

**Style Tags:**
`loc-backyard-golden-hour` `char-sunny-leo-mia` `section-bridge` `warm-silhouette` `lens-flare` `emotional-peak-bridge` `energy-2`

---

**SHOT A22**
Time Range: 1:41–1:45
Lyric Cue: *"A words always feel just right!"*
Energy Level: 2 → building to 3
Beat-Sync: Sunny's smile reaches full width on "right" at 1:44. Push-in acceleration IS the energy build.

**Story Beat:**
Close-up on Sunny's face — she turns slowly to camera, expression moving from quiet contentment to
growing smile to a promise. One held moment of direct eye contact. Then she takes a breath — and the
Final Chorus is coming. The bridge ends not with a bang but with anticipation.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A22
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Close-up on Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> face turning slowly toward camera.
Expression begins as quiet contentment, transitions to a growing, genuine smile that builds visible energy
for what's coming. Big brown eyes catching warm golden-hour light. Yellow cloud shirt, orange shorts.
Background: soft warm golden blur of the backyard behind her — very soft focus.
Camera: close-up at Sunny's eye level, slow push-in beginning to accelerate.
3D animated, cartoon style. Warm saturated palette, soft background focus.
```

**Camera and Motion Notes:**
Start: close-up at Sunny's eye level. Slow push-in begins at 1:41 and accelerates — the push-in IS the
energy building toward Final Chorus. On "right!" at 1:44: Sunny's smile reaches full width — tiny eyebrow
raise signals what's coming. Cut hard at 1:45 on the Final Chorus drop — push-in speed creates the launch.

**Transition to Next Shot:**
TYPE C — Star Burst. Push-in energy detonates into the Final Chorus flash.

**Style Tags:**
`loc-direct-address` `char-sunny-solo` `section-bridge-finale` `anticipation-build` `energy-2-to-3`

---

══════════════════════════════════════
SECTION: FINAL CHORUS | 1:45–2:05 | 20 seconds
Energy Level: 3+ MAX — Emotional summit of the entire song
Narrative Purpose: Everything built to this. Both A-words, full world, show logo arrives.
Visual Goal: Viewer feels PROUD and INCLUDED. This celebration is theirs.
BEAT-SYNC REQUIREMENT (MANDATORY): Cut lands on A A A chant. Zoom completes on "amazing." Jump syncs to hand clap.
Shot count: 4
══════════════════════════════════════

---

**SHOT A23**
Time Range: 1:45–1:52
Lyric Cue: *"A is amazing A is the best"*
Energy Level: 3+ MAX
Beat-Sync: ZOOM COMPLETES ON "AMAZING" AT 1:46. Maximum scale bounce on first "A." A badge rotates once.

**Story Beat:**
The biggest shot of the song — the full neighborhood street. All three characters run toward camera
down the sidewalk with arms wide. Mayor Mary appears in the background waving from her doorstep. The
Letter A badge appears enormous in the sky, rotating once. Background figures celebrating on lawns.
This frame is the hero image of the episode.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A23
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]
[Mayor Mary: <<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Ultra-wide low-angle hero shot of LOC_NEIGHBORHOOD_STREET:
Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> center frame, running toward camera, arms spread fully
wide, pure joy, pigtails streaming, yellow cloud shirt, orange shorts.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> to her left, running in sync, one fist raised. Red rocket
shirt, navy cargo shorts, round glasses. 
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> to her right, running, teal crossbody bag bouncing. Teal
star shirt, grey polka-dot skirt, white leggings.
Background: Mayor Mary <<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>> visible on her doorstep in background,
waving warmly in her royal purple blazer with gold mayoral pin.
Sky: enormous cream badge with coral letter A rotating slowly once clockwise.
Background: LOC_NEIGHBORHOOD_STREET — colorful yellow, mint-green, coral houses, leafy trees, blue sky.
Stylized rounded background figures on lawns celebrating.
Camera: ultra-wide, ankle height. Characters grow in frame as they run toward lens.
3D animated, cartoon style. Absolute maximum vivid saturation.
```

**Camera and Motion Notes:**
Start: ultra-wide at ankle height. Camera static — characters run toward lens, growing in frame.
ZOOM (scale bounce) COMPLETES ON "AMAZING" AT 1:46 — (107%→100%). Letter A badge rotates one full
clockwise turn and settles enormous. Cut at 1:52 on "best."

**Transition to Next Shot:**
Straight cut — characters now fill frame.

**Style Tags:**
`loc-neighborhood-street` `char-sunny-leo-mia-mayor-mary` `section-final-chorus` `hero-ultra-wide` `beat-sync-zoom-on-amazing` `energy-3-max`

---

**SHOT A24**
Time Range: 1:52–1:57
Lyric Cue: *"A is the letter we love the most"*
Energy Level: 3+ MAX
Beat-Sync: Heart Pop fires from group hug center on "love" at 1:53. Musical note trails shoot upward.

**Story Beat:**
The three main characters stop running and throw their arms around each other in a spontaneous group hug
facing the camera. Sunny pulls them in. Mia laughs with her whole face. Leo looks surprised by the hug
but immediately melts into it. Heart Pop fires from the center. Mayor Mary visible behind them clapping.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A24
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]
[Mayor Mary: <<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Medium shot: spontaneous group hug facing camera. Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> center,
arms pulling both friends in, face wide with joy. Yellow cloud shirt, orange shorts.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> left, transitioning from surprise to genuine warmth, glasses
slightly askew from hug impact. Red rocket shirt.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> right, laughing with eyes crinkled shut. Teal star shirt,
grey polka-dot skirt, white leggings.
From the center of the hug: a small red heart floats upward. Musical note trails drift above all three.
Background: LOC_NEIGHBORHOOD_STREET, Mayor Mary <<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>> visible behind
them in her royal purple blazer, clapping warmly.
Camera: medium shot at their collective eye level.
3D animated, cartoon style. Vivid warm palette.
```

**Camera and Motion Notes:**
Start: medium shot at their eye level. On "love" at 1:53: Heart Pop fires from hug center — floats upward.
Musical note trail begins at 1:53. Cut at 1:57 on "most" — Heart Pop still visible in upper frame.

**Transition to Next Shot:**
Straight cut — trio holds group formation.

**Style Tags:**
`loc-neighborhood-street` `char-sunny-leo-mia` `section-final-chorus` `group-hug` `heart-pop` `musical-note-trail` `energy-3-max`

---

**SHOT A25**
Time Range: 1:57–2:01
Lyric Cue: *"Sing it with me — A A A!"*
Energy Level: 3+ MAX
Beat-Sync: CUT LANDS ON FIRST "A" AT 1:57. CHARACTER JUMPS SYNC TO HAND CLAP ON EACH A (1:57, 1:58, 1:59). Three chalk A's pop — each larger than the last. Final A nearly fills upper frame.

**Story Beat:**
All three break from the hug and turn to camera simultaneously — throwing hands up, calling each A at
maximum volume. This is the biggest "Sing with me" beat of the entire song. Chalk A's escalate in size:
small → medium → LARGE. The viewer is expected to shout their loudest A.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A25
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Close-medium shot: all three facing camera, turning from their hug to address the viewer.
Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> center, both arms thrown overhead, mouth open wide
mid-"A!", maximum energy. Yellow cloud shirt, orange shorts.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> far left, one arm raised, other fist at chest, huge grin.
Red rocket shirt, round glasses.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> far right, both arms above head, jumping. Teal star shirt,
grey polka-dot skirt, white leggings, teal bag raised.
Upper frame: three coral chalk A's — first small left, second medium center, third LARGE (fills upper
third of frame) right.
Background: warm yellow gradient LOC_DIRECT_ADDRESS.
Camera: close-medium, slightly below eye level.
3D animated, cartoon style. Absolute maximum vivid saturation.
```

**Camera and Motion Notes:**
Start: close-medium, slightly below eye level. Three chalk A's pop at 1:57, 1:58, 1:59 — each larger
than the last. Bounce Underscore on each. Each A: forward lean + clap + jump. Cut at 2:01 on the third
A — that large chalk A nearly fills the frame.

**Transition to Next Shot:**
Straight cut — into the final hero shot where the show logo arrives.

**Style Tags:**
`loc-direct-address` `char-sunny-leo-mia` `section-final-chorus` `call-and-response-max` `chalk-A-escalating` `beat-sync-cut-on-A-jump-on-clap` `energy-3-max`

---

**SHOT A26**
Time Range: 2:01–2:05
Lyric Cue: *"A words are awesome every day!"*
Energy Level: 3+ MAX | SHOW LOGO ARRIVES THIS SHOT
Beat-Sync: Show logo exclamation mark pops on the final downbeat of "every day!" at 2:04. Maximum Bounce Underscore on "awesome."

**Story Beat:**
The widest, most triumphant shot of the song. All three in the neighborhood street, arms wide, caught
mid-celebration — the entire world behind them, the sky filled with musical notes. The show title logo
"Sunny and the Crew!" animates in from above, letters bouncing in one per downbeat, settling above the
characters. The chalk word "AWESOME" returns golden, floating above the logo. This image burns into memory.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A26
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]
[Mayor Mary: <<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Ultra-wide triumphant shot of LOC_NEIGHBORHOOD_STREET: Sunny
<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> center street, caught mid-jump, arms spread fully, feet off
ground, face to the sky in open-mouth joy. Yellow cloud shirt, orange shorts mid-flare, pigtails flying.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> far left, arm stretched toward sky, round glasses, red
rocket shirt, navy cargo shorts.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> far right, spinning, teal star shirt, grey polka-dot skirt
airborne, white leggings, teal crossbody bag swinging.
Mayor Mary <<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>> background right, arms raised in celebration,
royal purple blazer, gold mayoral pin gleaming.
Sky: filled with translucent musical notes in show palette colors. Above: show title "Sunny and the Crew!"
in rounded bubble letters animating in from top of frame — yellow "Sunny," white "and the Crew!" with
coral outline, letters bouncing in on downbeats, exclamation mark last. Golden chalk "AWESOME" above logo.
Sparkle Trail connecting all three main characters. Stylized background figures celebrating.
Camera: ultra-wide, lowest angle of the song. Street level, ankle height.
3D animated, cartoon style. Absolute maximum vivid saturation — most vivid frame of the episode.
```

**Camera and Motion Notes:**
Start: ultra-wide, lowest angle. Logo letters animate in from frame top one per downbeat at 2:01–2:03.
Exclamation mark pops last at 2:03.5 with a starburst. On "awesome" at 2:01: maximum Bounce Underscore
(108%→100%). On "every day!" at 2:04: EXCLAMATION MARK OF LOGO POPS — final Bounce Underscore. Sparkle
Trail plays. Camera holds completely static. Cut at 2:05 hard into Outro warmth.

**Transition to Next Shot:**
TYPE B — Warm Fade. Golden glow from edges — a gentle exhale after the finale.

**Style Tags:**
`loc-neighborhood-street` `char-sunny-leo-mia-mayor-mary` `section-final-chorus` `show-logo-arrival` `chalk-AWESOME` `sparkle-trail` `energy-3-absolute-max`

---

══════════════════════════════════════
SECTION: OUTRO | 2:05–2:20 | 15 seconds
Energy Level: 2 — Warm (gentle resolution; the song hugs the viewer goodbye)
Narrative Purpose: Celebrate the child for completing the song. Reinforce the learning. Send off with love.
Visual Goal: Viewer feels proud, warm, and seen. The outro is a hug, not a performance.
Shot count: 2
══════════════════════════════════════

---

**SHOT A27**
Time Range: 2:05–2:12
Lyric Cue: *"Great job friends you did it today! / We learned our A words — hip hip hooray!"*
Energy Level: 2
Beat-Sync: Sunny's thumbs-up on "you did it" at 2:06. Arm-raise on "hooray" at 2:10. Show logo appears soft at 2:10.

**Story Beat:**
Sunny on her front porch steps — the most intimate location in the show. She is at the viewer's eye
level, not performing: speaking to one child. Her thumbs-up is genuine praise. Leo and Mia join at
2:09 on "hooray" — all three do one warm shared arm-raise. Show logo appears soft and small in
upper corner. No jumping. Just warmth.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A27
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Medium shot: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> seated on LOC_SUNNY_PORCH steps, leaning
slightly forward at viewer's eye level. Expression: warm, direct, genuinely proud — real praise, not
performance. One hand rests on knee, one hand holds a soft thumbs-up toward camera. Yellow cloud shirt,
orange shorts, pigtails settling from the day's energy.
Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> to Sunny's left on the porch step, arm raised in gentle
"hooray" gesture, quiet satisfied smile, round glasses, red rocket shirt.
Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> to Sunny's right, both arms raised on "hooray!", teal star
shirt, grey polka-dot skirt, white leggings.
Background: LOC_SUNNY_PORCH — warm wooden boards, yellow front door, sunflower pots, late golden light.
Upper-right corner: show title "Sunny and the Crew!" logo, soft and small, at rest.
Camera: medium shot at Sunny's seated eye level. No camera movement.
3D animated, cartoon style. Warm golden-hour palette. Intimate and unhurried.
```

**Camera and Motion Notes:**
Start: medium shot, seated eye level. No camera movement. On "you did it" at 2:06: Sunny's thumbs-up
lands — the direct praise beat. Leo and Mia join at 2:09 — arm-raise on "hooray." Show logo appears
soft at 2:10 in upper-right. Bounce Underscore plays SOFTLY (103%→100%) — gentlest version.
Cut at 2:12 into the final goodbye.

**Transition to Next Shot:**
Straight cut — to the final goodbye close-up.

**Style Tags:**
`loc-sunny-porch` `char-sunny-leo-mia` `section-outro` `viewer-praise` `show-logo-soft` `warm-celebration` `energy-2`

---

**SHOT A28 — FINAL FRAME**
Time Range: 2:12–2:20
Lyric Cue: *"See you next time — bye bye bye!"*
Energy Level: 2 → resolves to silence
Beat-Sync: Camera pull-back begins on "bye bye" at 2:14. Music sting on final "bye!" at 2:18. Frame holds 2 seconds. Warm fade.

**Story Beat:**
The final shot of the song — and of the episode song segment. Sunny alone in soft close-up, waving
slowly with both hands. Genuine waves, not rushed. Leo and Mia visible over her shoulders waving too.
This is Sunny speaking to the viewer as a child, not as an audience. On "bye bye bye" the camera
begins a slow, gentle pull-back — the world remaining as we leave it. Frame freezes on final wave.
Music sting. Warm silence holds 2 seconds.

**Image Prompt:**
```
CHARACTER LOCK — A_IS_AMAZING A28
[Sunny: <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>]
[Leo: <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>]
[Mia: <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>]

SAFETY CHECK:
- No age descriptors used: CONFIRMED
- No word "Pixar" used: CONFIRMED

SCENE PROMPT:
Close-medium shot: Sunny <<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>> on LOC_SUNNY_PORCH steps, facing
camera, waving slowly with both hands raised in a big warm genuine wave. A real smile that reaches her
eyes. Yellow cloud shirt, orange shorts, pigtails lit by warm golden-hour light from the porch.
Over her left shoulder: Leo <<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>> waving one hand with a quiet grin,
glasses, red rocket shirt.
Over her right shoulder: Mia <<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>> waving both hands enthusiastically.
Teal star shirt, grey polka-dot skirt, white leggings.
Background: LOC_SUNNY_PORCH in golden-hour light, soft and warm.
Upper frame: show title "Sunny and the Crew!" logo, soft and warm, at rest and holding.
Camera: close-medium at Sunny's eye level.
3D animated, cartoon style. Golden-hour palette. Mood: warm, safe, loved.
```

**Camera and Motion Notes:**
Start: close-medium at Sunny's eye level. On "bye bye" at 2:14: camera begins a slow, gentle pull-back —
the neighborhood world slowly revealed behind the porch. On final "bye!" at 2:18: MUSIC STING — outro sting.
Show logo does a final gentle bounce and holds. Camera holds. Frame fades gently to warm black over 1 second.
[END]

**Transition to Next Shot:**
Gentle fade to warm black. No further shots.

**Style Tags:**
`loc-sunny-porch` `char-sunny-leo-mia` `section-outro-final` `show-logo-final` `pull-back-goodbye` `music-sting` `energy-2-resolving`

---

## PRODUCTION-READY SHOT MAP

| Shot | Time | Section | Lyric / MUSIC ONLY | Characters | Location | Camera | Beat-Sync | Element IDs |
|---|---|---|---|---|---|---|---|---|
| A01 | 0:00–0:06 | Intro | "Hey friends… / Let's learn…" | Sunny, Leo, Mia | Direct Address | Medium, push-in | Letter A badge on "A words" | Sunny ✅, Leo ✅, Mia ✅ |
| A02 | 0:06–0:12 | Verse 1 | "Apple apple big and red" | Sunny, Leo, Mia | Backyard | Wide med, push-in | Bounce on 2nd "apple" | Sunny ✅, Leo ✅, Mia ✅ |
| A03 | 0:12–0:18 | Verse 1 | "Apple apple overhead" | Sunny, Mia | Backyard sky | Med, upward tilt | Apple peak on "overhead" | Sunny ✅, Mia ✅ |
| A04 | 0:18–0:23 | Verse 1 | "Crunch it up from core to top" | Sunny, Leo, Mia | Backyard | Close-med, static | Bounce + crunch SFX on "crunch" | Sunny ✅, Leo ✅, Mia ✅ |
| A05 | 0:23–0:27 | Verse 1 | "An apple snack that just won't stop!" | Sunny, Leo, Mia | Backyard | Wide, Dutch tilt | Cut on Leo's catch at "stop!" | Sunny ✅, Leo ✅, Mia ✅ |
| A06 | 0:27–0:30 | Verse 1 crest | *(instrumental fill)* | Sunny, Leo, Mia | Backyard | Close-med, accelerating push-in | Energy crest before chorus | Sunny ✅, Leo ✅, Mia ✅ |
| A07 | 0:30–0:36 | Chorus 1 | "A is amazing A is the best" | Sunny, Leo, Mia | Backyard | Low-wide, push-in → hold | **ZOOM COMPLETES ON "AMAZING" 0:31** | Sunny ✅, Leo ✅, Mia ✅ |
| A08 | 0:36–0:40 | Chorus 1 | "A is the letter we love the most" | Sunny | Direct Address | Med, static | Hands open toward camera on "love" | Sunny ✅ |
| A09 | 0:40–0:44 | Chorus 1 | "Sing it with me — A A A!" | Sunny, Leo, Mia | Direct Address | Med, static | **CUT ON FIRST A. JUMP SYNCS TO CLAP ON EACH A.** 3 chalk A's | Sunny ✅, Leo ✅, Mia ✅ |
| A10 | 0:44–0:48 | Chorus 1 | "A words are awesome every day!" | Sunny, Leo, Mia | Backyard | Wide, push-in | Bounce on "awesome"; sparkle trail | Sunny ✅, Leo ✅, Mia ✅ |
| A11 | 0:48–0:54 | Verse 2 | "Airplane airplane in the sky" | Sunny, Leo, Mia | Backyard sky | Med-wide, upward tilt | Chalk AIRPLANE on 2nd "airplane" | Sunny ✅, Leo ✅, Mia ✅ |
| A12 | 0:54–1:00 | Verse 2 | "Airplane airplane flying high" | Sunny, Leo, Mia | Backyard sky | Overhead 35°, push-in | Freeze frame at "high" 1:00 | Sunny ✅, Leo ✅, Mia ✅ |
| A13 | 1:00–1:06 | Verse 2 | "Spreading wings and zooming free" | Sunny, Mia, Leo | Backyard | Wide, tracking pan | Pan accelerates on "zooming" | Sunny ✅, Leo ✅, Mia ✅ |
| A14 | 1:06–1:09 | Verse 2 | "An airplane goes where it wants to be!" | Sunny, Mia | Backyard | Med, static | Point at camera on "where" 1:07 | Sunny ✅, Mia ✅ |
| A15 | 1:09–1:12 | Verse 2 crest | *(instrumental fill)* | Sunny, Leo, Mia | Backyard | Close-med, accelerating | Leo shows notebook; energy builds | Sunny ✅, Leo ✅, Mia ✅ |
| A16 | 1:12–1:18 | Chorus 2 | "A is amazing A is the best" | Sunny, Leo, Mia | Coop Playground | Low-wide, push-in → hold | **ZOOM COMPLETES ON "AMAZING" 1:13** | Sunny ✅, Leo ✅, Mia ✅ |
| A17 | 1:18–1:23 | Chorus 2 | "A is the letter we love the most" | Mia, Sunny, Leo | Coop Playground | Med, hip height | Mia jump peak freeze on "love" 1:20; heart pop landing | Sunny ✅, Leo ✅, Mia ✅ |
| A18 | 1:23–1:27 | Chorus 2 | "Sing it with me — A A A!" | Sunny, Leo, Mia | Direct Address | Close-med, static | **CUT ON FIRST A. JUMP SYNCS TO CLAP.** 3 chalk A's | Sunny ✅, Leo ✅, Mia ✅ |
| A19 | 1:27–1:30 | Chorus 2 | "A words are awesome every day!" | Sunny, Leo, Mia | Coop Playground | Wide low-angle, static | Bounce on "awesome"; sparkle trail | Sunny ✅, Leo ✅, Mia ✅ |
| A20 | 1:30–1:37 | Bridge | "Apple… glad! / Airplane… had!" | Sunny, Leo, Mia | Backyard golden hour | Med, gentle push-in | Tummy-pat 1:31; notebook lift 1:35 | Sunny ✅, Leo ✅, Mia ✅ |
| A21 | 1:37–1:41 | Bridge | "A words make the whole day bright" | Sunny, Leo, Mia | Backyard golden hour | Wide, waist height, static | Lens flare peaks on "bright" 1:40 | Sunny ✅, Leo ✅, Mia ✅ |
| A22 | 1:41–1:45 | Bridge | "A words always feel just right!" | Sunny | Direct Address | Close-up, push-in accelerating | Smile peaks on "right" 1:44 | Sunny ✅ |
| A23 | 1:45–1:52 | Final Chorus | "A is amazing A is the best" | Sunny, Leo, Mia, Mayor Mary | Neighborhood Street | Ultra-wide, ankle height | **ZOOM COMPLETES ON "AMAZING" 1:46.** A badge rotates once. | Sunny ✅, Leo ✅, Mia ✅, Mayor Mary ✅ |
| A24 | 1:52–1:57 | Final Chorus | "A is the letter we love the most" | Sunny, Leo, Mia, Mayor Mary BG | Neighborhood Street | Med, eye level | Heart Pop on "love" 1:53 | Sunny ✅, Leo ✅, Mia ✅, Mayor Mary ✅ |
| A25 | 1:57–2:01 | Final Chorus | "Sing it with me — A A A!" | Sunny, Leo, Mia | Direct Address | Close-med, below eye | **CUT ON FIRST A 1:57. JUMP SYNCS TO CLAP.** A's escalate small→med→LARGE | Sunny ✅, Leo ✅, Mia ✅ |
| A26 | 2:01–2:05 | Final Chorus | "A words are awesome every day!" | Sunny, Leo, Mia, Mayor Mary | Neighborhood Street | Ultra-wide, street level | **SHOW LOGO ARRIVES.** Exclamation mark pops on final downbeat. Bounce + sparkle. | Sunny ✅, Leo ✅, Mia ✅, Mayor Mary ✅ |
| A27 | 2:05–2:12 | Outro | "Great job… / We learned… hooray!" | Sunny, Leo, Mia | Sunny's Porch | Med, seated eye level | Thumbs-up on "you did it" 2:06; arm-raise on "hooray" 2:10 | Sunny ✅, Leo ✅, Mia ✅ |
| A28 | 2:12–2:20 | Outro final | "See you next time — bye bye bye!" | Sunny (lead), Leo + Mia (BG) | Sunny's Porch | Close-med → pull back | **FINAL FRAME.** Music sting 2:18. Pull-back. Logo holds. Warm fade. | Sunny ✅, Leo ✅, Mia ✅ |

---

*End of "A Is Amazing" Animatic Prompt Bible v2.0*
*Version 1.0 (2026-07-06) superseded — wrong character descriptions, no element IDs, wrong timing*
*All character designs: see characters.json and visual_world_bible.md*
*All shot prompts require CHARACTER LOCK HEADER embedded above — do not generate without it*
*4 element IDs confirmed and embedded: Sunny, Leo, Mia, Mayor Mary*
*nano_banana_2 is the confirmed Higgsfield generation model for all shots*
