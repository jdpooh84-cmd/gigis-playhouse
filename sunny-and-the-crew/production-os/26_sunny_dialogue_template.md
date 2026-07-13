# 26 — Sunny Dialogue Template (say-what-you-see)
Status: LOCKED 2026-07-13. Owner: Episode Architect (writes), Voice Director (renders). Every line obeys 05_preschool_writing_rules (≤8 words/line, age 2–5, object-first) AND the say-what-you-see rule below.

## 0. SAY-WHAT-YOU-SEE (hard rule)
Every spoken line must describe or cue the action **visible in the same clip**, at the same real-time speed. If Sunny says "Jump!", the clip shows a real jump on the word. The manifest links each dialogue line to its `clip_id`; the validator flags any line whose verb has no matching motion in that clip's `visual_action`.

## 1. STANDARD PRE-SONG DIALOGUE ARC (P2→P3)
Sunny drives six beats, in order. Word caps are firm.
1. **SETUP / HOOK** (1–2 lines): name today's world moment. "Look what I found!" (holds the object — real-time reach, tier B).
2. **OBJECT-FIRST EXPLORE** (2–4 lines): both/all lesson objects experienced BEFORE the concept is named (template P2a). "Feel this. It's an *apple*." Action shown as spoken.
3. **WARM MISTAKE** (1–2 lines): a crew member guesses wrong; Sunny reframes with warmth, never shame. "Not quite — and that was a great try!"
4. **LESSON INTRODUCTION** (1–2 lines): mentor/discovery names the concept with badge/chalk motif. "*A* is for apple. *A*!"
5. **CHILD CALL-TO-ACTION + [3-SECOND PAUSE]** (2–3 lines): direct address, one imitable move, explicit pause marker, then celebrate. "Say *A* with me! … [3.0s] … I heard you!"
6. **SONG TRANSITION** (1 line): song requested BY the crew, count-in, star-burst. "Should we sing the *A* song? Ready? 1–2–3!"

## 2. REFLECTION + OUTRO ARC (P5→P6)
7. **RECAP with gestures** (2–3 lines): re-do the episode's moves at real speed. "We found *A*! Apple, *ant*, *arm*!"
8. **VIEWER PRAISE** (1 line): "You found them too — I saw you!"
9. **TAKE-HOME MISSION** (1–2 lines): delivered as a gift. "Your mission: find an *A* at home!"
10. **CATCHPHRASE + GOODBYE** (1–2 lines): locked catchphrase, goodbye wave (tier C). Heart-Pop allowed.
11. **STING** (P6): logo, ukulele hit, wave — no dialogue.

## 3. CALL-AND-RESPONSE / PAUSE SPEC
- Every `[3-SECOND PAUSE]` is **3.0s of real silence on all tracks** (matches 06 §9), rendered as a held-but-alive clip (small real-time idle motion, tier B — NOT a frozen slomo hold).
- After every pause, a praise line that assumes the child answered ("I heard you!" / "Yes!").

## 4. OUTPUT — `dialogue_map` (feeds the manifest + VO)
Episode Architect emits `dialogue_map.json`: one row per line = `{clip_id, speaker, text, beat(1–11), motion_tier, action_verb, pause_after_s}`. This single file is the source for (a) the manifest's dialogue field, (b) the VO script (§27), and (c) the say-what-you-see validator. No dialogue exists outside `dialogue_map.json`.
