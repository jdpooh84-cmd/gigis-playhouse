# EP01 QC — Actions-as-words · Lip-sync · Accessibility
Status: **REPORT ONLY — no regeneration yet (creator Task 4).** 2026-07-14.
Timestamps are real (measured from the delivered 6:42.86 cut).

## Root cause (both problems share one)
Every dialogue shot was made with **seedance image→video WITHOUT audio-driven mouth animation**, then the VO was muxed on top. So (a) mouths never move to speech, and (b) in two-shots you can't tell who's talking. The fix path is real: **`seedance_2_0` / `wan2_7` accept an `audio_references` input** — re-render each talking shot from the character image + that line's ElevenLabs mp3 and the correct mouth animates to the words.

## SECTION 1 — Lines that SAY an action instead of doing it
Your ~1:16–1:18 = **N03 Bram "BRAM! One big clap!"** — he says "one big clap."

**FIX — do the action, cut the action-word** (character claps on screen; speaks only their name/real line):
| Clip | Time | Now | → New line (spoken) | On screen |
|---|---|---|---|---|
| N02 | 1:03 | "Mimi's name claps too — MI-MI!" | "Mimi's name too — MI-MI!" | Mimi does the clap |
| N03 | 1:14 | "BRAM! One big clap!" | "BRAM!" | Bram claps once, big |
| C03 | 1:19 | "My name claps — MI-A!" | "MI-A!" | Mia claps her name |
| C04 | 1:25 | "LE-O! Two claps too!" | "LE-O!" | Leo claps twice |
| N20 | 2:50 | "KO-DA — big claps!" | "KO-DA!" | Koda claps big |
| N22 | 3:11 | "LE-O — trace and clap!" | "LE-O!" | Leo traces L, then claps |
| C23 | 5:58 | "We clapped our names!" | "We did it!" | crew claps together |

**KEEP (intentional viewer directive) — but the shot MUST visibly demonstrate the action** (these teach the at-home game; saying it is the instruction):
- N11 "What's YOUR letter? Trace it!" · C13 "Trace an A in the air!" · N19 "Now — clap your names!" · C14 "Now clap your name!" · C16 "Pipa, clap your name!" · C28 "Clap your name! Make an A!" — re-render so the character clearly claps/traces while inviting.

**KEEP (required SEL — name-the-action):** C26 "Clapping my name helped." — Pipa reflecting on the strategy; stays, but show a small clap as she says it.

## SECTION 2 — Lip-sync & speaker mapping
**The "name I don't like" scene (your example):**
| Clip | Time | Line | Problem | Fix |
|---|---|---|---|---|
| C05 | 1:36 | Pipa "My name's not special." | solo Pipa, mouth still | close-up on Pipa, **lip-synced**, sad slumped posture |
| C06 | 1:40 | Sunny "How do you feel right now?" | rendered over a **Sunny+Pipa two-shot** → looks like the wrong girl asks | re-render as **close-up on Sunny** (kneeling, warm), lip-synced |
| C07 | 1:44 | Pipa "I feel small." | **reuses the same two-shot** → ambiguous | separate **close-up on Pipa**, lip-synced, eyes down |

**Fix mechanism (all dialogue):**
1. **Lip-sync pass** — re-render each talking shot with the character image + that line's ElevenLabs VO as `audio_references` so the correct mouth moves to the words.
2. **One speaker per shot** — replace ambiguous multi-character talking shots with a close-up that features the speaker. Flagged multi-cast talkers: **N02** (Sunny over Sunny+Mimi), **N14** ("Look at Mimi go!" over Mimi), **N15** (Bram over Bram+Pipa), **N17** (Pipa over Pipa+Bram) — feature the speaker; listeners react silently.
3. **Cut on the speaker** — the edit lands the cut when the new speaker starts.

## SECTION 3 — Accessibility (deaf-child test: "no audio — can they follow?")
Currently **NO** across the episode. Specific fails + fixes:
- **Speaker unreadable** — no mouths move. → lip-sync pass (Sec 2) is mandatory, not optional.
- **Actions invisible** — when a character *says* "clap" without clapping, a deaf child gets nothing. → show every action (Sec 1). Doubly critical for a11y.
- **Emotion legibility** — Pipa's sad beats (C05/C07) need clear slumped/down-cast body; her turnaround (C19 "My name IS amazing!", C25 "Proud!") needs a big beaming A-pose; Sunny's care = kneel + open hands. Make the pose read the feeling with sound off.
- **Group scenes** — the speaker steps forward / is centered so it's obvious who leads.
- **Recommended add: OPEN CAPTIONS** — a post-production caption overlay (speaker name + line), NOT burned into the image (respects the no-in-image-text rule). This is the single biggest a11y win for deaf kids and also reinforces letters/names.

## Fix scope (for your go-ahead — not yet run)
- Re-render ~**24 dialogue close-ups** with lip-sync (audio_references) + speaker-clear framing.
- Rewrite the **7 "FIX" lines** (Sec 1) → regenerate those VO lines (your voices) + their shots showing the action.
- Re-render the **6 "demonstrate" directive shots** to clearly show the action.
- Optional: author **open captions** track.
- Then rebuild SEC-02/03/05 + re-stitch. (SEC-04 song lip-sync would be a separate, larger pass — song has no dialogue, so lower priority.)
