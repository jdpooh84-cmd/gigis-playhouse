# 29 — Sunny & the Crew: Script Template + EP01 Between-Songs Dialogue (FINAL)
Grounded in the actual EP01 pipeline + SONNET's dialogue research. Written to be followed as a generation checklist, not admired as prose. 2026-07-14.

> **CAST DECISION FLAG.** This document uses the creator-directed core cast **Sunny · Koda · Mimi · Pipa · Bram** (5 kids, no adults). The **current EP01 build + the in-progress SEC-03 pilot still include Mia, Leo, and Ava (mentor).** Those must be re-cast to the 5 before this script ships. Letter set therefore = **S · K · M · P · B · A** (L drops with Leo). Open question for showrunner: keep Mia/Leo as occasional background non-speakers, or remove entirely? Default assumed here: **removed from speaking cast.**

---

## A. BACKSTORY — the show as it actually is now

### A1. EP01 current structure (in-pipeline)
| SEC | Time (current cut) | What it is | Status |
|---|---|---|---|
| SEC-01 THEME | 0:00–0:44.78 | Locked intro song (THEME-INTRO-MASTER). Kids already engage. | **Locked — never regenerated.** |
| SEC-02 STORY SETUP | ~0:44.78–2:08 | "Name Day": kids introduce names+claps; Pipa feels her name isn't special. | ElevenLabs voices in; lip-sync being re-timed; movement remap pending. |
| SEC-03 PRACTICE/GAMES | ~2:08–4:02 | Name/letter practice; ends "Let's sing the A song!" | **Being rebuilt as the PILOT** (name-clap, guess-letter, big/small feelings, audience invites, kid dialogue, lip-sync re-time, letter overlays, sync-gate). |
| SEC-04 SONG "A Is Amazing" | ~4:02–5:47 (104.83s) | The title song. | Audio locked byte-identical; visuals on-model full crew; upgrade underway so **Sunny leads verses, crew sings chorus (visible singing), movement cue each chorus.** |
| SEC-05 REFLECTION/OUTRO | ~5:47–6:42 | Recap, praise, take-home mission, catchphrase, goodbye. | ElevenLabs voices in; remap pending. |

### A2. Current constraints (hard)
- **Cast:** Sunny, Koda, Mimi, Pipa, Bram only. No new characters. (See flag re: Mia/Leo/Ava.)
- **No canon redesign** — Sunny's look, the backyard location, the theme are fixed.
- **No burned-in text** except **letter glyph overlays** (S/K/M/P/B/A) — the one allowed exception, composited in post.
- **Lip-sync tight enough for deaf/HoH + lip-reading** — mouth matches words on the correct character; assume sound off.
- **Letters on screen must be correct** — via overlays; AI "handwriting" is never trusted.
- **Movement games already locked into plan:** name circle, clap-your-name, big/small feelings, one simple letter game, audience invites.

### A3. SONNET's research patterns (my words)
- **Natural situations** — the lesson rides on something real to a 5-year-old (Name Day; show-and-tell; feeling small about your own name). Not a worksheet.
- **Serve-and-return / because-chains** — an adult/leader "serves" a question, the child "returns," and feelings/reasons are stated as *"I feel X because Y."* Cause is spoken, not implied.
- **Peer cheer + try again** — a friend struggles, peers encourage *by name*, the friend retries and succeeds. Models resilience without an adult fixing it.
- **Audience direct + real pause** — the crew invites the home kid to do the thing, then actually *waits* so the child can act.
- **Object anchor** — a visible thing + its word + its letter *sound* travel together (apple / "apple" / "A"), so the abstract letter is grounded.
- **Natural messiness with clean beats** — real kids repeat, overlap, false-start; but the *learning* lines (feeling, letter sound, lesson) are delivered clean and solo so they can be learned and lip-read.

---

## B. TEMPLATE

### TEMPLATE-SECTIONS-FINAL
Durations match the real cut. "Turns" = spoken lines. Word caps are hard.

| Section | Target dur | Dialogue turns | Words/line (kid / Sunny) | Mandatory beats | Mandatory movement |
|---|---|---|---|---|---|
| **SEC-01 THEME** | 44.78s (locked) | 0 (sung) | — | none (locked master) | intro dance (locked) |
| **SEC-02 SETUP** | 80–95s | 12–16 | ≤5 / ≤7 (learning lines ≤4) | Object Anchor (name+letter); **False start** (Bram hesitates on B); **Featured problem introduced** (Pipa "not special"); **Because Chain** (Pipa "I feel small because…"); **Peer Cheer**; **Audience Direct + 3.0s pause** ×1. Problem **NOT resolved.** | Name circle; Clap-your-name |
| **SEC-03 PRACTICE** | 105–120s | 16–22 | ≤5 / ≤7 (learning ≤4) | Object Anchor (letter sound→glyph); **Because Chain** (Bram "it won't work because…"); **Peer Cheer + Try Again + Discovery** (Bram "B is me"); **Big/Small feelings** (Pipa turnaround *begins*); **Simple letter game** (guess the sound); **Audience Direct + 3.0s pause** ×2; **song lead-in.** Problem **partially turns, not fully resolved.** | Clap-your-name; Big/Small; Letter game |
| **SEC-04 SONG** | 104.83s (locked audio) | 0 (sung) | — | Sunny leads verses; crew sings chorus (visible); movement cue each chorus; audience "sing/jump with us"; **A** overlay on chorus | Copyable chorus moves |
| **SEC-05 REFLECTION** | 50–65s | 10–14 | ≤5 / ≤7 (learning ≤4) | **SEL Anchor** (Sunny names the lesson, clean solo); **Full resolution** (Pipa proud + Bram proud) — *after* the song; **Peer Cheer**; **Audience Direct + 3.0s pause** (final challenge, clean solo); catchphrase; goodbye | Copy-the-moves recap |

### TEMPLATE-RULES-FINAL (enforced at generation)
1. **Sound before letter-name.** Always the phoneme first ("Buh"), then the letter ("B"). Never letter-name-first on a teaching beat.
2. **One action per prompt/shot.** Never stack ("clap and jump and trace"). One verb per beat.
3. **Word caps (hard):** kid line ≤5 words; Sunny ≤7; any *learning* line (feeling / letter-sound / SEL anchor / challenge) ≤4. Filler ("um", "ooh", a repeated name) doesn't count toward the cap — it's what keeps it natural — but only on non-learning beats.
4. **No pivot-to-camera as a stunt.** The home kid **joins the crew's activity** ("clap your name *with us*"), framed as joining the circle — never addressed in isolation.
5. **No overlapping dialogue on learning lines.** Overlaps/chatter allowed ONLY on cheers and transitions. Feeling line, letter-sound, SEL anchor, challenge = clean solo.
6. **Problem not fully resolved before SEC-04.** Tension carries into the song; the payoff lands in SEC-05.
7. **Audience pause = exactly 3.0s**, expectant hold (mouth "your turn", hand to ear, gentle nod, soft caption "Your turn!"), then acknowledge ("I saw that!").
8. **Clean solo shot required on:** Pipa's feeling line · Sunny's letter-sound demo · Bram's "B is me" · SEL anchor · final challenge.
9. **Letters on screen = overlays only**, correct glyph, faded in **after** the child names it (so the guess game stays a game). Never AI handwriting.
10. **Cast = 5 only** (Sunny, Koda, Mimi, Pipa, Bram).
11. **Every learning beat multi-modal:** say + show the mouth shape + show the body + show the letter/object. A deaf child must get it with sound off.
12. **Max 1 new game mechanic per section;** reuse the core 3 (name-clap, big/small, guess-the-sound).

---

## C. EP01 SCRIPT (between songs)

Notation: **(action)** in bold; `[SOLO]` = clean single-speaker lip-sync shot; `[overlap-ok]` = light chatter allowed; `⟨overlay X⟩` = letter glyph fades in; `‹PAUSE 3.0s›` = audience wait.

### EP01-SEC02-03-SCRIPT-FINAL

**SEC-02 — "Name Day" (setup)**
1. SUNNY **(one clap)**: "It's Name Day, Crew!"
2. KODA **(fist pump)**: "Name Day!" `[overlap-ok]`
3. MIMI **(bouncing)**: "Yay yay yay!" `[overlap-ok]`
4. SUNNY: "Say your name — and clap it!"
5. KODA **(two stomps)**: "KO-DA!" `[SOLO]` ⟨overlay K⟩
6. MIMI **(two little claps)**: "MI-MI!" `[SOLO]` ⟨overlay M⟩
7. BRAM **(starts, stops, small)**: "Um… B… Bram." `[SOLO]` *(false start — plants the B problem)*
8. SUNNY **(warm)**: "You got it, Bram."
9. PIPA **(looking down, quiet)**: "My name isn't special." `[SOLO]` *(featured problem)*
10. SUNNY **(kneels)**: "How do you feel?" `[SOLO]`
11. PIPA: "I feel small." `[SOLO]` *(feeling line, ≤4)*
12. SUNNY **(gentle serve)**: "Small because…?"
13. PIPA: "Because it's just… little." `[SOLO]` *(because chain)*
14. SUNNY: "Your name is yours. That's special." `[SOLO]` *(SEL seed — NOT full resolve)*
15. KODA **(claps her name)**: "We like PI-PA!" `[overlap-ok]` *(peer cheer)*
16. MIMI **(claps)**: "PI-PA!" `[overlap-ok]`
17. SUNNY **(opens the circle toward home)**: "Clap YOUR name with us!" ‹PAUSE 3.0s›
18. SUNNY **(nods)**: "I heard it! Amazing."
19. SUNNY: "Come play the letter game!" *(bridge → SEC-03)*

**SEC-03 — "The Letter Game" (practice)**
20. SUNNY **(hand to ear)**: "Guess the sound! Kuh… kuh…" `[SOLO]` *(sound first)* ‹PAUSE 3.0s›
21. KODA **(stomps)**: "Me! Kuh — KO-DA!" `[SOLO]` ⟨overlay K⟩
22. SUNNY: "Muh… muh…" `[SOLO]`
23. MIMI **(bounces)**: "MI-MI!" `[SOLO]` ⟨overlay M⟩
24. SUNNY: "Bram — your turn."
25. BRAM **(traces air, stuck)**: "Which way does B go?" `[SOLO]` *(problem)*
26. BRAM: "It won't work because I forget." `[SOLO]` *(because chain)*
27. MIMI **(hands up)**: "Try again, Bram!" `[overlap-ok]` *(peer cheer)*
28. KODA: "You got it!" `[overlap-ok]`
29. SUNNY **(traces B slow)**: "Buh… buh… Bram." `[SOLO]` *(sound demo)* ⟨overlay B forming⟩
30. BRAM **(traces, lands it, lights up)**: "Buh — B! B is me!" `[SOLO]` ⟨overlay B⟩ *(discovery)*
31. CREW **(jump, cheer)**: "Yay Bram!" `[overlap-ok]`
32. SUNNY: "Pipa — show me small." *(big/small game)*
33. PIPA **(curls tiny)**: "…small." `[SOLO]`
34. SUNNY: "Now show me BIG."
35. PIPA **(grows a little, unsure)**: "…big?" `[SOLO]` *(turnaround begins — still tentative)*
36. KODA & MIMI **(cheer)**: "Big and proud!" `[overlap-ok]`
37. SUNNY **(traces P)**: "Puh… puh…" `[SOLO]` *(sound first)*
38. PIPA **(small but trying)**: "Puh — PI-PA." `[SOLO]` ⟨overlay P⟩ *(tries it on — NOT full pride yet)*
39. SUNNY **(A-pose)**: "Everybody — make an A!"
40. SUNNY **(holds A, opens to home)**: "Make an A with us!" ‹PAUSE 3.0s› "Yes! High five!"
41. BRAM: "Can we sing the A song?"
42. SUNNY **(big welcoming wave)**: "Let's sing the A song — sing with us!" *(→ SEC-04)*

### EP01-SEC05-SCRIPT-FINAL

**SEC-05 — Reflection / Outro (after the song)**
43. SUNNY: "We did it, Crew!"
44. KODA **(claps)**: "We clapped our names!" `[overlap-ok]`
45. MIMI **(bounces)**: "MI-MI!" `[overlap-ok]`
46. SUNNY **(serve)**: "Pipa — how do you feel now?" `[SOLO]`
47. PIPA **(big proud A-pose, beaming)**: "Proud! PI-PA!" `[SOLO]` ⟨overlay P⟩ *(FULL resolution)*
48. CREW **(cheer)**: "Yay Pipa!" `[overlap-ok]`
49. BRAM **(proud, traces B)**: "B is me!" `[SOLO]` ⟨overlay B⟩ *(full resolution)*
50. SUNNY: "Every name has amazing letters." `[SOLO]` *(SEL anchor — names the lesson)*
51. SUNNY: "Do your moves with us!" *(copy-the-moves recap)*
52. CREW **(clap-name → big-proud pose)**: **(movement, light "woo!")** `[overlap-ok]`
53. SUNNY **(opens to home)**: "Your turn — clap your name!" ‹PAUSE 3.0s› `[SOLO]` *(final challenge)*
54. SUNNY **(nods)**: "Amazing!"
55. SUNNY **(wave)**: "Bye, amazing friends!" *(catchphrase / goodbye)*
56. CREW **(wave)**: "Bye!" `[overlap-ok]`

### EP01-ANNOTATIONS-FINAL
| Line# | Pattern | Movement | Lip-sync | Letter overlay | Audience |
|---|---|---|---|---|---|
| 5–6 | Object anchor | clap-your-name | SOLO | K, M (after name) | — |
| 7 | False start | — | SOLO | — | — |
| 9 | Featured problem | — | **SOLO (critical)** | — | — |
| 11 | Feeling line | — | **SOLO (critical, ASL)** | — | — |
| 13 | Because chain | — | SOLO | — | — |
| 14 | SEL seed (unresolved) | — | SOLO | — | — |
| 15–16 | Peer cheer | clap-your-name | overlap-ok | P (after name) | — |
| 17 | Audience direct | clap-your-name | SOLO invite | — | **PAUSE 3.0s** |
| 20 | Object anchor + game | hand-to-ear | **SOLO (sound demo)** | — | **PAUSE 3.0s** |
| 21,23 | Sound→name | clap-your-name | SOLO | K, M (after) | — |
| 25–26 | Problem + because | air-trace | **SOLO** | — | — |
| 27–28 | Peer cheer + try again | — | overlap-ok | — | — |
| 29 | **Sunny P/B sound demo** | trace | **SOLO (critical, ASL)** | B forming | — |
| 30 | **Bram "B is me"** | trace | **SOLO (critical, ASL)** | B (after) | — |
| 32–35 | Big/Small feelings | curl→grow | SOLO | — | — |
| 37–38 | Sound-first (P) | trace | SOLO | P (after) | — |
| 39–40 | Make-A + audience | A-pose | SOLO invite | A | **PAUSE 3.0s** |
| 46–47 | **Full resolution (Pipa)** | A-pose | **SOLO (critical)** | P | — |
| 49 | **Full resolution (Bram)** | trace | **SOLO (critical)** | B | — |
| 50 | **SEL anchor** | — | **SOLO (critical, ASL)** | — | — |
| 51–52 | Copy-recap | clap→pose | overlap-ok | — | — |
| 53 | **Final challenge** | clap-your-name | **SOLO (critical)** | — | **PAUSE 3.0s** |

**Overlap discipline:** overlaps appear only at lines 2–3, 15–16, 27–28, 31, 36, 44–45, 48, 52, 56 — all cheers/transitions. Every learning beat is SOLO.

---

## D. SELF-CRITIQUE-FINAL (+ adjustments I will make in production)

1. **Pipa's turnaround may feel too tidy.** *Why:* a sad→proud arc across ~4 min can read as scripted, cheapening the SEL. *Adjustment:* keep her **tentative** through SEC-03 (line 35 "…big?", line 38 "Puh — PI-PA" small); let the **song** carry the emotional shift; only line 47 is full pride. Add one micro-beat where she *almost* opts out, so the turn is earned.
2. **The sound game is inaccessible to deaf/HoH as written.** *Why:* "Kuh… guess the sound" is audio-only — a deaf child is locked out of the core mechanic. *Adjustment:* every phoneme gets a **held mouth-shape close-up + the object + the glyph** (lines 20, 29, 37 rendered as slow solo mouth shots), and the **glyph is the visible answer.** The game becomes *watch-the-mouth / match-the-letter*, playable with sound off.
3. **Sensory overwhelm for spectrum kids.** *Why:* fast game-switching + jumping cheers + overlaps can flood a sensitive viewer. *Adjustment:* cheers are **warm, not loud** (no sudden volume spikes); overlaps kept to ≤1s; a **calm breath beat** before the song; a consistent "ready — clap" cue every game; offer the **quiet palm-trace** alternative on-screen so a kid can play small.
4. **The "I feel small" beat may land heavy for anxious kids.** *Why:* dwelling on sadness without fast agency can stick. *Adjustment:* cap the sad beat at **2 lines** (11, 13), immediately hand Pipa a **do-able action** (line 32 "show me small… now big"), and land a peer response within ~3s. Never linger on distress.
5. **Mid-SEC-03 attention dip.** *Why:* the practice middle is the classic drop-off. *Adjustment:* place the **highest-energy beat** (Bram's discovery + jump, then make-an-A audience game, lines 30–40) at the ~2/3 mark; keep every beat ≤~6s; the two 3.0s pauses are participation spikes that re-hook.
6. **3.0s pause reads as dead air / a glitch.** *Why:* silence on kids' TV can look broken and lose kids who don't know what to do. *Adjustment:* fill the pause with an **expectant visual** (Sunny mouths "your turn", hand to ear, nod) + a soft **"Your turn!" caption** + a gentle tick, so it's unmistakably an invitation.
7. **Word caps can make lines robotic.** *Why:* strict ≤5 can clip the naturalness the show needs. *Adjustment:* caps apply to **information-bearing learning lines only**; natural filler/repeats on non-learning beats stay in (that's the "messiness").
8. **Letter overlay could spoil the guess game.** *Why:* a glyph that appears too early gives away the answer. *Adjustment:* glyph **fades in only after** the child names it (enforced in the overlay build).
9. **Cast conflict (production risk).** *Why:* the in-pipeline pilot has 7 characters; this script has 5. Shipping both creates continuity whiplash. *Adjustment:* re-cast the pilot to the 5 (Koda/Mimi absorb Mia's/Leo's game turns; the mentor invite becomes Sunny's) **before** final rebuild — pending your call on whether Mia/Leo stay as silent background.
