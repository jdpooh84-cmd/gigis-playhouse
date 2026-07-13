# Prompt Library — Categories & Skeletons
ALWAYS: CHARACTER LOCK header + element UUIDs inline (<<<uuid>>>), SAFETY CHECK block (no age words, no Pixar), location line from 03_world_rules IDs, camera line (one move), "3D animated, cartoon style. Vivid warm palette. 16:9", motif line when applicable. Model: nano_banana_2/flash images; seedance_2_0 videos (declined_preset_id if preset-intercepted).
CATEGORIES:
1. CHARACTER BEAT — single character emotional beat (see Mimi reaction skeleton: "Mimi <<<id>>> [reaction], eyes [detail], tiny [gesture]. Camera holds still.").
2. LOCATION ESTABLISH — no/“background” characters, slow push or drift only.
3. LESSON OBJECT — object hero shot + chalk word motif + character interacting with object.
4. MOVEMENT CUE — full-body, mirrored to viewer, instructional framing ("does the move facing camera like a mirror").
5. REACTION CUTAWAY — 3s, single character, no camera move.
6. PARTICIPATION — direct address, lean-in, ear-cup hold ("FULL 3-SECOND HOLD" in motion notes).
7. GROUP/ENSEMBLE — scale rules restated (Mimi smallest / Nana tallest), max joy, sparkle trail allowed.
8. TRANSITION — star-burst into songs only.
AUDIO BED SKELETON (Suno): "gentle instrumental kids [ukulele|pizzicato] bed, [x] BPM, major key, no vocals, warm, preschool [practice|game] background" + negatives "no vocals, no dark mood, not sad".

## VIDEO-MOTION SKELETON (mandatory on EVERY seedance/kling video prompt — creator-locked 2026-07-13, see 25_motion_pacing_rules)
The video motion sentence is NO LONGER free-authored. Build the closing line from the clip's `motion_tier`:
`MOTION (tier <A|B|C>): <subject> <real-time action verb> at <full|natural> energy, movement crisp and clearly readable, action completes within the clip. Characters stay exactly on model. All footwear plain, no logos. No on-screen text.`
- Motion-energy setting: **seedance_2_0 has NO `speedramp` param** (verified 2026-07-13 — it is silently dropped). The real energy knob is **`genre:"action"`** on tier-A (and lively tier-B) clips, plus `bitrate_mode:"high"` on movement. duration 4s (seedance min; trimmed to the audio-first slot). Escalate dance/movement hero shots to `kling3_0`.
- BANNED as the motion verb on tier A/B: "gently", "very gently", "slowly", "softly", "drifts", "floats", "slow-motion", "dreamy". ("Gentle" may describe emotion, never body motion.)
- SLOMO wording allowed ONLY when the clip carries a `slomo_justification` and is the episode's single permitted SLOMO clip.
NOTE: the older skeletons above ("Camera holds still", "slow push or drift only", "no camera move", "FULL 3-SECOND HOLD") apply to CALM/participation beats only (tier C) — they are NOT the default. Movement, story, song, and game beats are tier A/B real-time.

## ANATOMY LINE (mandatory in every character prompt — creator-locked 2026-07-11)
`Every character has exactly one head and correct anatomy. [If Mia present: Mia has EXACTLY TWO low pigtails.]`
Add to every SAFETY CHECK: `anatomy check (one head each, correct limbs): CONFIRMED`
