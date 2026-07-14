# 29 — Sunny & the Crew: Script Template + EP01 Between-Songs Dialogue (FINAL, 8-CAST)
Grounded in the actual EP01 pipeline + SONNET's dialogue research. Written to be followed as a generation checklist. 2026-07-14.

> **CAST — CANON (creator-locked 2026-07-14).** EP01 and future episodes use the **full 8**: **Sunny** (lead), **Koda**, **Mimi**, **Pipa**, **Bram**, **Mia**, **Leo**, **Ava** (adult mentor). No cutting to 5. The in-progress SEC-03 pilot already contains all 8 — it is **canon-aligned, kept as-is.** Letter overlays in play: **S · K · M · P · B · L · A** (Ava is the adult mentor — no name-letter beat).

---

## A. BACKSTORY — the show as it is now

### A1. EP01 current structure (in-pipeline)
| SEC | Time (current cut) | What it is | Status |
|---|---|---|---|
| SEC-01 THEME | 0:00–0:44.78 | Locked intro song. Kids already engage. | Locked — never regenerated. |
| SEC-02 STORY SETUP | ~0:44.78–2:08 | "Name Day": kids introduce names+claps; Pipa feels her name isn't special. | ElevenLabs voices in; lip-sync re-timing; movement remap pending. |
| SEC-03 PRACTICE/GAMES | ~2:08–4:02 | Name/letter games; ends "Let's sing the A song!" | **Rebuilt as the PILOT** (name-clap, guess-the-sound, big/small feelings, audience invites, kid dialogue, lip-sync re-time, letter overlays, sync-gate). |
| SEC-04 SONG "A Is Amazing" | ~4:02–5:47 (104.83s) | The title song. | Audio locked byte-identical; on-model full crew; upgrade underway so **Sunny leads verses, crew sings chorus, Ava sings along, movement each chorus.** |
| SEC-05 REFLECTION/OUTRO | ~5:47–6:42 | Recap, praise, take-home mission, catchphrase, goodbye. | ElevenLabs voices in; remap pending. |

### A2. Cast roles (canon)
- **Sunny** — warm leader / host-child. Drives the games, gives the audience invites, owns the SEL anchor line. Never bossy; invites, never orders.
- **Ava** — adult mentor. Frames the learning ("Let's play the Name Game!"), gives gentle affirmation, sings along in the song. **Does not solve the kids' problems for them** — the SEL is peer-led; she warms and validates.
- **Koda** — Sunny's older brother. Cool, confident, steady encourager.
- **Mimi** — toddler, **always smallest on screen**. Mostly non-verbal — giggles, name-bounce, cheers. Joins with her **body**, so she's fully legible with sound off.
- **Pipa** — dramatic feeler; twin sister of Bram. Carries the **"my name isn't special" (P)** arc.
- **Bram** — measured, gentle thinker; twin brother of Pipa. Carries the **"stuck on B → B is me" (B)** arc.
- **Mia** — calm, precise, thoughtful **(M)**. Models careful tracing.
- **Leo** — fast, joyful, bilingual sparks (¡Órale! / ¡Vámonos!) **(L)**. High energy, comic timing.

### A3. Current constraints (hard)
- **Cast = the 8 above.** No new characters.
- No canon redesign (Sunny's look, backyard location, theme).
- **No burned-in text** except **letter glyph overlays** (S/K/M/P/B/L/A) — composited in post.
- **Lip-sync tight for deaf/HoH + lip-reading.**
- **Letters correct via overlays only** — AI handwriting never trusted.
- Movement games locked: name circle, clap-your-name, big/small feelings, one letter game, audience invites.

### A4. SONNET's research patterns (my words)
Natural situations (Name Day, feeling small about your own name) · serve-and-return / because-chains ("I feel X because Y") · peer cheer + try again · audience direct + real pause · object anchor (thing + word + letter *sound*) · natural messiness (repeats, overlaps, false starts) with **clean solo beats** on the learning lines.

---

## B. TEMPLATE

### TEMPLATE-SECTIONS-FINAL
| Section | Dur | Turns | Words/line (kid / Sunny·Ava) | Mandatory beats | Movement | Cast on screen |
|---|---|---|---|---|---|---|
| **SEC-01 THEME** | 44.78s (locked) | 0 (sung) | — | none (locked) | intro dance | all 8 |
| **SEC-02 SETUP** | 80–95s | 14–18 | ≤5 / ≤7 (learning ≤4) | Object Anchor (name+letter); **False start** (Bram/B); **Problem introduced** (Pipa); **Because Chain** (Pipa "because…"); **Peer Cheer**; **Audience Direct + 3.0s**. Problem **NOT resolved.** | Name circle; clap-your-name | **all 8** (Ava opens/affirms) |
| **SEC-03 PRACTICE** | 105–120s* | 18–24 | ≤5 / ≤7 (learning ≤4) | Object Anchor (sound→glyph); **Because Chain** (Bram); **Peer Cheer + Try Again + Discovery** (Bram "B is me"); **Big/Small** (Pipa turnaround *begins*); **Letter game**; **Audience Direct + 3.0s ×2**; song lead-in. Problem **partially turns.** | clap-your-name; big/small; letter game | **all 8** (Ava frames games) |
| **SEC-04 SONG** | 104.83s (locked audio) | 0 (sung) | — | Sunny leads verses; crew sings chorus; **Ava sings along**; movement each chorus; **A** overlay on chorus | copyable chorus moves | **all 8** |
| **SEC-05 REFLECTION** | 50–65s | 12–16 | ≤5 / ≤7 (learning ≤4) | **SEL Anchor** (Sunny, clean solo); **Full resolution** (Pipa + Bram) *after song*; **Peer Cheer**; Ava praise; **Audience Direct + 3.0s** (challenge); catchphrase; goodbye | copy-the-moves recap | **all 8** |

\* *Current pilot runs ~63s (tighter). Extend toward 105–120s in the full rebuild if you want the fuller runtime — pending your length call.*

### TEMPLATE-RULES-FINAL (enforced at generation)
1. **Sound before letter-name** — phoneme first ("Buh"), then the letter ("B"). Never letter-name-first on a teaching beat.
2. **One action per prompt/shot** — never stack ("clap and jump and trace").
3. **Word caps (hard):** kid ≤5; Sunny/Ava ≤7; any *learning* line (feeling / letter-sound / SEL anchor / challenge) ≤4. Filler ("um", "ooh", a repeated name) doesn't count — only on non-learning beats.
4. **Home kid JOINS the crew's activity** ("clap your name *with us*") — never addressed in isolation / no pivot-to-camera stunt.
5. **No overlapping dialogue on learning lines.** Overlaps/chatter only on cheers and transitions.
6. **Featured problem not fully resolved before SEC-04.**
7. **Audience pause = exactly 3.0s**, expectant hold (mouth "your turn", hand to ear, nod, soft "Your turn!" caption), then acknowledge.
8. **Clean solo shot required on:** Pipa's feeling line · Sunny's letter-sound demo · Bram's "B is me" · SEL anchor · final challenge.
9. **Letters = overlays only**, correct glyph, faded in **after** the child names it. Never AI handwriting.
10. **Cast = the canonical 8;** one speaker featured per learning beat, others react (prevents 8-kid crowding).
11. **Every learning beat multi-modal:** say + show mouth + show body + show letter/object.
12. **Max 1 new game mechanic per section;** reuse the core 3.
13. **Ava never solves it** — she frames/affirms; the fix is peer-led (Sunny + crew).

---

## C. EP01 SCRIPT (between songs) — 8-CAST

Notation: **(action)**; `[SOLO]` clean single-speaker lip-sync; `[overlap-ok]` light chatter; `⟨overlay X⟩`; `‹PAUSE 3.0s›`.

### EP01-SEC02-03-SCRIPT-FINAL

**SEC-02 — "Name Day" (setup)** — *on screen: all 8*
1. AVA **(warm, arms open)**: "Happy Name Day, Crew!"
2. SUNNY **(one clap)**: "Say your name — and clap it!"
3. KODA **(two stomps)**: "KO-DA!" `[SOLO]` ⟨overlay K⟩
4. MIA **(two claps)**: "MI-A!" `[SOLO]` ⟨overlay M⟩
5. LEO **(claps, spins)**: "LE-O! ¡Órale!" `[SOLO]` ⟨overlay L⟩
6. MIMI **(little bounces)**: "MI-MI!" `[SOLO]` ⟨overlay M⟩
7. SUNNY: "Mia and Mimi — both M!" *(object-anchor reinforce)*
8. BRAM **(starts, stops, small)**: "Um… B… Bram." `[SOLO]` *(false start — plants B)*
9. PIPA **(looking down)**: "My name isn't special." `[SOLO]` *(featured problem)*
10. SUNNY **(kneels)**: "How do you feel?" `[SOLO]`
11. PIPA: "I feel small." `[SOLO]` *(feeling line, ≤4)*
12. SUNNY: "Small because…?"
13. PIPA: "Because it's just… little." `[SOLO]` *(because chain)*
14. AVA **(gentle, unresolved)**: "Every name matters." `[SOLO]` *(SEL seed — not full resolve)*
15. KODA **(claps her name)**: "We like PI-PA!" `[overlap-ok]` *(peer cheer)*
16. LEO & MIMI **(clap)**: "PI-PA!" `[overlap-ok]`
17. SUNNY **(opens to home)**: "Clap YOUR name with us!" ‹PAUSE 3.0s›
18. SUNNY **(nods)**: "I heard it! Amazing."
19. AVA: "Come play the letter game!" *(bridge → SEC-03)*

**SEC-03 — "The Letter Game" (practice)** — *on screen: all 8*
20. AVA: "Let's play — Guess the Sound!"
21. SUNNY **(hand to ear)**: "Mmm… mmm…" `[SOLO]` *(sound first)* ‹PAUSE 3.0s›
22. MIA **(claps)**: "That's me! MI-A!" `[SOLO]` ⟨overlay M⟩
23. MIMI **(giggles, bounces)**: "Mimi too!" `[overlap-ok]`
24. SUNNY: "Luh… luh…" `[SOLO]`
25. LEO **(zooms)**: "LE-O! ¡Vámonos!" `[SOLO]` ⟨overlay L⟩
26. SUNNY: "Kuh… kuh…" `[SOLO]`
27. KODA **(stomps)**: "KO-DA!" `[SOLO]` ⟨overlay K⟩
28. AVA: "Bram — your turn."
29. BRAM **(air-trace, stuck)**: "Which way does B go?" `[SOLO]` *(problem)*
30. BRAM: "It won't work because I forget." `[SOLO]` *(because chain)*
31. MIMI **(hands up)**: "Try again, Bram!" `[overlap-ok]` *(peer cheer)*
32. LEO: "You got it!" `[overlap-ok]`
33. SUNNY **(traces B slow)**: "Buh… buh… Bram." `[SOLO]` *(sound demo)* ⟨overlay B forming⟩
34. BRAM **(traces, lands it, beams)**: "Buh — B! B is me!" `[SOLO]` ⟨overlay B⟩ *(discovery)*
35. CREW **(jump, cheer)**: "Yay Bram!" `[overlap-ok]`
36. SUNNY: "Pipa — show me small." *(big/small game)*
37. PIPA **(curls tiny)**: "…small." `[SOLO]`
38. SUNNY: "Now show me BIG."
39. PIPA **(grows a little, unsure)**: "…big?" `[SOLO]` *(turnaround begins — tentative)*
40. MIA & KODA **(cheer)**: "Big and proud!" `[overlap-ok]`
41. SUNNY **(traces P)**: "Puh… puh…" `[SOLO]` *(sound first)*
42. PIPA **(small but trying)**: "Puh — PI-PA." `[SOLO]` ⟨overlay P⟩ *(tries it on — not full pride)*
43. SUNNY **(A-pose)**: "Everybody — make an A!"
44. SUNNY **(holds A, opens to home)**: "Make an A with us!" ‹PAUSE 3.0s› "Yes! High five!"
45. LEO: "Can we sing the A song?"
46. SUNNY **(big welcoming wave)**: "Let's sing the A song — sing with us!" *(→ SEC-04)*

### EP01-SEC05-SCRIPT-FINAL — *on screen: all 8*
47. SUNNY: "We did it, Crew!"
48. KODA **(claps)**: "We clapped our names!" `[overlap-ok]`
49. MIMI **(bounces)**: "Yay yay!" `[overlap-ok]`
50. SUNNY **(serve)**: "Pipa — how do you feel now?" `[SOLO]`
51. PIPA **(big proud A-pose, beaming)**: "Proud! PI-PA!" `[SOLO]` ⟨overlay P⟩ *(FULL resolution)*
52. CREW **(cheer)**: "Yay Pipa!" `[overlap-ok]`
53. BRAM **(proud, traces B)**: "B is me!" `[SOLO]` ⟨overlay B⟩ *(full resolution)*
54. SUNNY: "Every name has amazing letters." `[SOLO]` *(SEL anchor — names the lesson)*
55. AVA **(warm)**: "You were all amazing today!"
56. SUNNY: "Do your moves with us!" *(copy-the-moves recap)*
57. CREW **(clap-name → big-proud pose)** **(light "woo!")** `[overlap-ok]`
58. SUNNY **(opens to home)**: "Your turn — clap your name!" ‹PAUSE 3.0s› `[SOLO]` *(final challenge)*
59. SUNNY **(nods)**: "Amazing!"
60. SUNNY **(wave)**: "Bye, amazing friends!" *(catchphrase / goodbye)*
61. ALL **(wave)**: "Bye!" `[overlap-ok]`

### EP01-ANNOTATIONS-FINAL
**Per-character appearance across sections:** all 8 appear in **every** section. Speaking spotlight rotates so each kid gets a clear solo beat; Mimi's contributions stay **body-based** (bounce/cheer) so she reads with sound off; Ava speaks only to **frame/affirm** (lines 1, 14, 19, 20, 28, 55) and sings along in SEC-04.

| Line# | Pattern | Movement | Lip-sync | Letter overlay | Audience |
|---|---|---|---|---|---|
| 3–6 | Object anchor (name circle) | clap-your-name | SOLO each | K, M, L, M (after name) | — |
| 7 | Object-anchor reinforce | — | SOLO (Sunny) | — | — |
| 8 | False start | — | SOLO | — | — |
| 9 | Featured problem | — | **SOLO (critical)** | — | — |
| 11 | Feeling line | — | **SOLO (critical, ASL)** | — | — |
| 13 | Because chain | — | SOLO | — | — |
| 14 | SEL seed (Ava, unresolved) | — | SOLO | — | — |
| 15–16 | Peer cheer | clap-your-name | overlap-ok | P (after) | — |
| 17 | Audience direct | clap-your-name | SOLO invite | — | **3.0s** |
| 21 | Object anchor + sound demo | hand-to-ear | **SOLO (ASL)** | — | **3.0s** |
| 22,25,27 | Sound→name | clap-your-name | SOLO | M, L, K (after) | — |
| 29–30 | Problem + because | air-trace | **SOLO** | — | — |
| 31–32 | Peer cheer + try again | — | overlap-ok | — | — |
| 33 | Sunny B sound demo | trace | **SOLO (critical, ASL)** | B forming | — |
| 34 | Bram "B is me" | trace | **SOLO (critical, ASL)** | B (after) | — |
| 36–39 | Big/Small feelings | curl→grow | SOLO | — | — |
| 41–42 | Sound-first (P) | trace | SOLO | P (after) | — |
| 43–44 | Make-A + audience | A-pose | SOLO invite | A | **3.0s** |
| 50–51 | Full resolution (Pipa) | A-pose | **SOLO (critical)** | P | — |
| 53 | Full resolution (Bram) | trace | **SOLO (critical)** | B | — |
| 54 | SEL anchor (Sunny) | — | **SOLO (critical, ASL)** | — | — |
| 56–57 | Copy-recap | clap→pose | overlap-ok | — | — |
| 58 | Final challenge | clap-your-name | **SOLO (critical)** | — | **3.0s** |

**Overlap discipline:** overlaps only at lines 15–16, 23, 31–32, 35, 40, 48–49, 52, 57, 61 — all cheers/transitions. Every learning beat is SOLO.

---

## D. SELF-CRITIQUE-FINAL (+ production adjustments)

1. **8 kids in short beats risks crowding.** *Why:* with a big cast, learning lines can get lost in a busy frame. *Adjustment:* Rule 10 — **one speaker featured per learning beat**, others react silently; rotate the spotlight so each kid still gets a clean solo; wides only on cheers/song.
2. **Pipa's arc could feel too tidy.** *Adjustment:* keep her tentative through SEC-03 (39 "…big?", 42 "Puh — PI-PA" small); the **song** carries the shift; full pride only at line 51.
3. **Sound game locks out deaf/HoH as written.** *Adjustment:* every phoneme = **held mouth-shape close-up + object + glyph**; the glyph is the visible answer. Playable with sound off.
4. **Sensory overwhelm (spectrum).** *Adjustment:* warm not loud cheers; overlaps ≤1s; calm breath before the song; consistent "ready" cue; on-screen **quiet palm-trace** alternative.
5. **"I feel small" too heavy for anxious kids.** *Adjustment:* cap the sad beat at 2 lines (11, 13); hand Pipa a do-able action fast (36); peer response within ~3s; never linger.
6. **Mid-SEC-03 attention dip.** *Adjustment:* highest-energy beat (Bram's discovery + make-an-A audience game, 34–44) at the ~2/3 mark; beats ≤~6s; two 3.0s pauses re-hook.
7. **3.0s pause reads as dead air.** *Adjustment:* fill with expectant visual + "Your turn!" caption + soft tick.
8. **Word caps can sound robotic.** *Adjustment:* caps on information-bearing learning lines only; natural filler stays on non-learning beats.
9. **Overlay could spoil the guess game.** *Adjustment:* glyph fades in **after** the child names it.
10. **Mimi (near-non-verbal) could be sidelined in a big cast.** *Why:* the quietest character can vanish among 7 talkers. *Adjustment:* give Mimi a **recurring body beat** every section (name-bounce, cheer, the try-again line 31) so she's present and legible, and she's always framed as **smallest** for instant recognition.
11. **Two M-names (Mia, Mimi) could confuse the letter lesson.** *Why:* same glyph, two kids. *Adjustment:* turn it into a **feature** (line 7 "both M!") rather than hide it — reinforces that a letter can start many names; keep their name-claps on separate clean beats.
12. **Ava (adult) could slide into "teacher lectures."** *Why:* an adult explaining undercuts peer-led SEL. *Adjustment:* Rule 13 — Ava only **frames and affirms** (short lines); Sunny + crew do the discovering and the fixing.
