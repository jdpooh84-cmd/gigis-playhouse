# 25 — Motion Pacing Rules (preschool real-time motion)
Status: LOCKED 2026-07-13 (creator directive: EP01 read as slow-motion; movement must be clear, real-time, imitable). Owner: Prompt Architect + Shot Operator; enforced by Continuity Guardian + validator; Assembly Engineer beat-checks.

## 0. WHY THIS EXISTS
EP01 felt slow because motion speed was never governed anywhere in the OS. Three compounding causes:
1. **Ungoverned video-motion wording.** The prompt library (14) governed image prompts only; the seedance motion sentence was ad-hoc and defaulted to "gentle / very gentle / soft / slow" on nearly every clip.
2. **seedance defaults.** `speedramp:"auto"` + `mode:"std"` interpolate floaty, decelerating motion from a still start-image; a single-action 4–5s clip from one static frame reads as slow-mo.
3. **Stillness-biased skeletons + camera.** Library skeletons said "Camera holds still", "slow push or drift only", "no camera move", "FULL 3-SECOND HOLD"; manifest camera fields were mostly "gentle push-in / slow pull-back".

## 1. CORE RULE — REAL-TIME BY DEFAULT
- Every clip renders **real-time (1.0× speed)** action unless a slow-motion token is explicitly justified (§3).
- Motion must **visibly match** the action in `visual_action`, the dialogue line, and (in songs) the lyric/beat. If the script says "jumps", the child sees a full-energy jump at real speed, landing on the beat.
- Preschool imitation test: a 3–5 year old must be able to **copy the movement in real time** from one watch. Floaty/decelerated motion fails this test.

## 2. MOTION TIER (set per clip in the manifest field `motion_tier`)
| Tier | Use | seedance intent words | camera |
|---|---|---|---|
| **A — ACTIVE** (default for movement/song/game) | jumps, claps, marches, dances, hunts, gestures kids copy | "brisk, full-energy, real-time, crisp, decisive, lands on the beat" | handheld-still or 1 quick move |
| **B — NATURAL** (default for dialogue/story) | talking, reacting, walking, pointing | "natural real-time motion, lively, clear" | 1 gentle move max |
| **C — CALM** (reserved) | establish, tender reflection, goodbye | "slow, settled, gentle" | slow drift OK |
| **SLOMO** (rare, justified) | one emphasized hero beat per episode MAX | "smooth slow motion for emphasis" | locked/slow |

Default tier by section: P2 story=B, P3 lead-in=A, P4 song=A, P4 games=A, P5 recap=B, P5 goodbye=C, P6 sting=C.

## 3. SLOW MOTION — RARE + JUSTIFIED
- Slow motion (tier SLOMO or any "slow/gentle/dreamy" wording) is **banned by default**.
- Allowed only with a manifest field `slomo_justification` (one sentence) AND at most **one SLOMO clip per episode**. The validator errors on any "slow motion / slow-mo / dreamy / floaty" wording in a clip lacking `slomo_justification`.
- The words **"gentle" and "very gentle" are banned as the motion verb** on tier A/B clips (they were the EP01 slow-mo tell). "Gentle" may still describe emotion ("a gentle smile"), never the motion of the body.

## 4. seedance_2_0 / Higgsfield PARAMETER RULES (Shot Operator)
IMPORTANT (verified 2026-07-13 via `models_explore get seedance_2_0`): **seedance_2_0 exposes NO `speedramp` parameter.** Its real knobs are `duration, resolution, mode, bitrate_mode, genre, generate_audio`. A `speedramp:"off"` passed through the open params block is silently dropped (the render defaults to `speedramp:auto`, which is a stored UI field, NOT API-controllable). Do not rely on it. The controllable motion-energy levers are:
- **`genre: "action"`** on every tier-A clip (and tier-B lively beats) — the real energy knob; biases toward brisk, decisive, real-time motion. **This is the highest-impact controllable fix.** Tier C may use `genre:"auto"`.
- **Prompt wording** — the real-time MOTION skeleton (§5); "gentle/slow/floaty" banned on tier A/B. (This remains the #1 lever overall — it caused EP01.)
- **`duration`: 4s** (seedance clamps to a 4–15s min; render 4s and trim to the audio-first slot). Shorter source = denser action.
- **`bitrate_mode:"high"`** on movement clips for crisper motion readability.
- **Model escalation:** high-action dance/movement hero shots go to **`kling3_0`**; keep `seedance_2_0` for identity-critical dialogue close-ups.
- Before a new episode, re-run `models_explore get` on the current video models and record any new motion/energy knob here — never assume a param exists; verify it survives in the stored job record via `job_display`.

## 5. MOTION-PROMPT SKELETON (Prompt Architect — replaces ad-hoc wording)
Every video prompt ends with ONE motion line built from the tier, not free-authored:
```
MOTION (tier <A|B|C>): <subject> <real-time action verb> <at full/natural energy>, movement crisp and clearly readable, action completes within the clip. Characters stay exactly on model. All footwear plain, no logos. No on-screen text.
```
- Tier A verbs: jumps, claps, marches, spins, stomps, reaches, waves big, dances.
- Never: "gently", "slowly", "softly", "drifts", "floats", "slow-motion" on tier A/B.

## 6. BEAT-MATCHED CUTTING (Assembly Engineer — extends 06 music rules)
- Song/game clips are cut so the **on-screen action hits the downbeat**; A-A-A chants get one physical pop per repeat (already in 06 §6). The action inside each clip must be timed so its peak lands at the cut, not mid-decelerate.
- Movement-cue clips are framed full-body, **mirrored to the viewer** (14 category 4), so kids copy correctly.
- Assembly QA adds a **motion check**: spot 3 clips/section; if action looks < 1.0× or completes after the cut, flag for regen at tier A with `genre:"action"` (+ kling3_0 if still soft).

## 7. READABLE BODY FRAMING
- Any clip a child is meant to imitate frames the **whole moving body** (head-to-feet or head-to-knees), centered, silhouette-readable, max 3 props. No tight face crops on movement beats.
- One action per clip (unchanged) — but the action must be a **complete real-time gesture**, not a held pose.

## 8. PACING REFERENCE STANDARD (LOCKED — creator-designated 2026-07-13)
The creator has designated three demo clips as the **canonical pacing standard for the entire show**. All generation, selection, adjustment, and QA of character animation — and overall show pacing (dialogue speed, animation timing, musical tempo, action frequency, reaction time, pause length between beats) — must match these clips.

### Reference clips (the standard)
| Ref | Clip | Repo | Drive ID | Anchors it sets |
|---|---|---|---|---|
| REF-A | C4_song_clap_beatmatched.mp4 (tier A, kling3_0) | `assets/demo_jumpclap/C4_song_clap_beatmatched.mp4` | `1JXUWWKPCQKE3mXn-9nzg1gWPCm1RShye` | musical tempo **100 BPM = 0.60s/beat**; one physical clap ON every beat; energetic tier-A action |
| REF-B | C2_bounce.mp4 (tier B) | `assets/demo_jumpclap/C2_bounce.mp4` | `1j_Ic9GS31AaVWxhwSVY3hOTLQT7-s3U1` | natural real-time object action; ~2.5s to complete one gesture |
| REF-C | C5_reflection.mp4 (tier B→C) | `assets/demo_jumpclap/C5_reflection.mp4` | `17lKEI2Huisjepz-7fcAee53I4vJruxZP` | jump + clap at **real human speed** in ~3.5s; quick takeoff/landing; then a calm settle |

### Movement MUST (from the creator, verbatim intent)
- Match **real human timing** — no unintentional slow motion.
- **Normal gravity on jumps:** quick takeoff, quick landing, NO floating/hang-time.
- **Natural clapping and gestures** at believable speed.
- Readable but **energetic for children**.

### REJECT / FLAG any animation where
- Jumps look slow or floaty, as if in slow motion.
- Claps or gestures are noticeably slower than the reference clips.
- Pacing does not align with the show's target tempo for dialogue, music, and reactions.

### Measurable anchors (derived from the exact reference clips — use so "align to reference" is enforceable)
- **Musical tempo:** 100 BPM baseline (0.60s/beat); song/game action peaks land on the beat (REF-A).
- **Jump gravity:** takeoff→peak→landing completes inside a 3–4s clip with no held hang-frame; a jump reading > ~1.0s of airtime is a slow-mo FAIL.
- **Gesture/clap speed:** a single clap or gesture completes in ≈0.3–0.6s (one beat), matching REF-A/REF-C — not drawn out.
- **Action frequency:** one clear imitable action per ~2.4–3.5s clip (REF-B/REF-C slot lengths).
- **Reaction time / pauses:** post-action settle 0.5–1.1s; call-and-response pause exactly 3.0s (real silence). Dialogue at seed_audio `speech_rate` 0 (natural), +5…+8 for energetic/song lines — the VO tempo in these clips.

### How the standard is used
- **Prompt Architect / Shot Operator:** target REF-A tempo; tier-A uses `genre:"action"` (seedance) or `kling3_0` (as REF-A does); never wording that yields slower-than-reference motion.
- **Continuity Guardian (QA):** spot-check every batch's movement clips *against these three clips side by side*; FLAG per the reject list above; a flagged clip regenerates at tier A (genre:action / kling3_0) before it ships.
- **Assembly Engineer:** cut songs/action to the 100-BPM grid; keep dialogue/reaction pacing within the reference pause ranges.
- These clips are immutable references; if re-generated for any reason, the new versions must be re-approved by the creator before replacing the standard.
