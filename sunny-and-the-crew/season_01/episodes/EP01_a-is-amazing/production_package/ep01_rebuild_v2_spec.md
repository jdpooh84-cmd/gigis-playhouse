# EP01 REBUILD v2 — Complete Episode Specification
Creator structure directive 2026-07-11 | Supersedes the v1 extended-cut ORDER (assets carry over)
Audio is the timing master. All durations from ffprobed real files.

## SECTION A — EPISODE OVERVIEW

| # | Segment | Start | End | Length | Audio | Video source |
|---|---|---|---|---|---|---|
| 1 | Intro — theme song | 0:00.00 | 0:44.78 | 44.78s | Sunny and the Crew (Suno, baked in) | **THEME-INTRO-MASTER.mp4 v1.1 — reuse, untouched** |
| 2 | Learning story | 0:44.78 | 6:25.00 | 340.2s | VO + practice bed (72s) + hunt bed (100s) | 76 clips (existing prompts, reordered) |
| 3 | Song — A Is Amazing | 6:25.00 | 8:09.83 | 104.83s | Suno master (one play) | **EP01-song-section-SYNCED.mp4 — reuse** |
| 4 | Reflection & goodbye | 8:09.83 | 9:25.00 | 75.2s | VO, no bed | 17 clips |
| 5 | Outro — theme replay | 9:25.00 | 10:09.78 | 44.78s | Sunny and the Crew AUDIO replay | 9 NEW credit-style clips (no-loop rule: master video is NOT reused) |

**Total: 10:09.78** — inside the EXTENDED band (10–15 min). One song play (reprise cut).
Cast: Sunny/Leo/Mia lead; Nana Blossom (reveal), Mimi+Koda (lead-in), **Ava pop-ups in learning beats** (adult-mentor rule), Rena+Rico in the movement game (wider-crew rule). Anne joins song moments in a future build once designed.

### Structural deltas from v1 (implementation checklist)
1. Practice echo + A-word hunt MOVE from after the song to INSIDE the learning story (their dialogue, timings-relative, and prompts are already built — retime only).
2. Song reprise (24 clips) is CUT — those prompts are retired before generation, so zero credits wasted.
3. NEW: movement game beat (~45s, 9 clips) and outro credits (~9 clips) — net new-asset count drops from 109 to ~101.
4. Reflection extends the v1 wrap-up dialogue by ~9s of new lines (Mia reflection + Leo callback + catchphrase).
5. Outro replays the theme AUDIO only. Visuals are new (no-loop rule protects the master video).

## SECTION B — INTRO SPEC

- Use THEME-INTRO-MASTER.mp4 v1.1 exactly as-is (44.78s, 19 shots T01–T19, audio baked in, brand-safe, dog-Bella). **No adjustments needed**: the 19-shot cut map was scaled to the actual Suno render, ends flush with the final note — verified by ffprobe and frame audit.
- Last intro frame: T19 — full-crew tableau with show logo, warm daylight, everyone facing camera.
- Transition into story: HARD CUT on the downbeat after the final note to Sunny mid-bounce on the sidewalk (S1 below), already facing camera — the tableau "wakes up." No effect needed; energy match carries it.

## SECTION C — LEARNING STORY BEAT SHEET (0:44.78 – 6:25.00)

Teaching pattern per object: SHOW → INVESTIGATE → (both objects) → NAME LETTER → REPEAT SOUND.
Letter A is never named before 2:31. Every [PAUSE] = 3.0s real silence on a warm listening face.

| Beat | TC | Len | Location | On screen | Action | Educational purpose |
|---|---|---|---|---|---|---|
| S1 Greeting | 0:44.78–0:56 | 11s | STREET | Sunny, Leo, Mia | Direct-address welcome, promise of two A words (not named) | invitation, participation tone |
| S2 APPLE | 0:56–1:11 | 15s | NANA_PORCH | Sunny, Mia, Nana | Apple discovered, held up, word savored 3× | object-first #1 |
| S3 AIRPLANE | 1:11–1:26 | 15s | STREET | Sunny, Leo, Mia | Toy airplane overhead, word repeated, Leo sketches | object-first #2 |
| S4 Warm mistake | 1:26–1:46 | 20s | NANA_PORCH | +Nana | Leo: "They're both red!" — celebrated, then redirected | mistake-and-correction, no shame |
| S5 THE REVEAL | 1:46–2:01 | 15s | NANA_PORCH | Nana + kids | Nana crouches: "Apple. Airplane. Both start with A." SUNBURST motif on the click | letter named — cognitive click |
| S6 Call-response #1 | 2:01–2:16 | 15s | DIRECT_ADDRESS | Sunny | "Can you say it? Say A!" [PAUSE 3s] "I HEARD you!" | first viewer production |
| S7 Practice echo | 2:16–3:28 | 72s | BACKYARD (+Ava pop-up over fence) | Sunny, Mia, Leo | /a/ sound echo [PAUSE], AP-PLE [PAUSE], AIR-PLANE [PAUSE], air-draw the letter (big line down, big line down, little line across) | phoneme → words → letterform; call-response #2–4 |
| S8 Movement game | 3:28–4:13 | 45s | BACKYARD→STREET | Sunny, Leo, Mia + Rena, Rico | "CRUNCH like an apple!" (3 big crunches) → "FLY like an airplane!" (arms out, zoom in a circle; Rena + Rico join the flying line) | movement cues #1+#2, gross-motor |
| S9 A-word hunt | 4:13–5:53 | 100s | BACKYARD/STREET/PORCH (+Ava pop-in at recap) | rotating pairs | 3 rounds: ANT, ACORN, AVOCADO — each: found → reveal → "Does ___ start with A?" [PAUSE 3s] → confirm → chant | transfer; call-response #5–7 |
| S10 Song lead-in | 5:53–6:25 | 32s | STREET | Sunny, Leo, Mia, Mimi, Koda | Mimi: "Sing! Sing! Sing about A!", Koda hypes, line-up, Sunny counts in — STAR BURST into song | earned song launch |

Annotations: SUNBURST motif fires at S5 reveal and S9 round confirms. HEART POP at S7 "I heard it!". Chalk-letter motif during S7 air-draw. 7 call-and-response pauses total (spec minimum 3 ✓). 2 movement cues (✓). Warm mistake S4 (✓). 4 locations, simple readable cuts (✓).

## SECTION D — LEARNING STORY DIALOGUE

Beats S1–S7 and S9–S10 use the LOCKED v1 dialogue verbatim (vo_script.md lines 01–49 — recording order unchanged, timecodes shift per the table above). NEW dialogue, S8 movement game only (preschool rules: ≤8 words/sentence):

> **SUNNY:** A words are in our BODIES too!
> **LEO:** Crunch like an apple! Ready?
> **ALL:** CRUNCH! … CRUNCH! … CRUNCH! *(3 big slow body-crunches, [each on a beat])*
> **MIA:** Now… fly like an airplane!
> **SUNNY:** Arms out! Zoom with us!
> *(Rena and Rico swoop in and join the flying line — no lines, big grins)*
> **LEO:** Zoooom! You're flying!
> **SUNNY:** Apple crunch. Airplane zoom. AMAZING!

(8 new VO lines — appended to vo_script as lines 21a–21h at S8 timecodes.)

## SECTION E — SONG VISUAL PLAN (6:25.00 – 8:09.83)

**Reuse EP01-song-section-SYNCED.mp4 wholesale** — it is already cut to the real Suno render (104.83s, 27 unique clips) with the locked section map: intro 0–7.0 / v1 (apple) →24.6 / chorus →37.8 / v2 (airplane) →55.5 / chorus →68.0 / bridge →82.5 / final chorus (+Mayor Mary) →95.5 / outro →104.83. Full lyric↔shot mapping lives in ep01_episode_bible.md §3; participation moments are baked in (clap on every A, arms-wide, airplane wings — chorus movement cues on 0:40/1:18/1:57 beat-sync marks). Motifs: Letter-A badge (intro), chalk letters (choruses), heart-pop + logo letter-by-letter (final chorus).
**Lip sync:** apply Higgsfield lip-sync (dubbing tool) ONLY to the 6 hero close-ups where a singing mouth is clearly visible (song intro direct-address, chorus "sing it with me" solos, outro goodbye lines). Wide/action shots rely on beat-synced body performance — preschool viewers track motion, not lips, in wides; this halves lip-sync cost and avoids uncanny mid-shot mouth swaps.

## SECTION F — REFLECTION & GOODBYE SCRIPT (8:09.83 – 9:25.00, 75s)

Location: Sunny's porch steps, golden light, viewer eye level. Lines 50–59 from the locked v1 wrap-up, PLUS the new reflection/catchphrase block (†):

> **SUNNY:** You did it. I am SO proud of you.
> **SUNNY:** We learned the letter A today.
> **SUNNY:** *(crunch gesture)* A is for apple!
> **SUNNY:** *(wings-out dip)* A is for airplane!
> **SUNNY:** And ant, acorn, avocado too!
> **LEO:** And A is for amazing — like us!
> † **MIA:** *(thoughtful, to Leo)* I liked your red guess, Leo.
> † **LEO:** *(happy shrug)* Wrong guesses help us find MORE!
> † **SUNNY:** That's how we learn. We ask!
> **SUNNY:** Exactly like us. Exactly like YOU.
> **SUNNY:** Here is your challenge — your A mission:
> **SUNNY:** Find something at home that starts with A!
> **SUNNY:** Can you find it? I know you can.
> † **ALL THREE:** *(huddle, hands in, up on)* **Let's ask! Let's find out! Come on, Crew!** ← CATCHPHRASE [PROPOSED — creator to lock]
> **SUNNY (sign-off, exact):** You are amazing. See you next time — bye bye!

*(Sunny's wave begins ON "bye bye" — the theme replay's first ukulele strum lands exactly there: dialogue finishes clean, music enters under the wave. 1.5s breath, then cut to outro credits.)*

## OUTRO — THEME REPLAY (9:25.00 – 10:09.78)

Audio: sunny-and-the-crew-THEME.mp3, full 44.78s, one replay (audio reuse is allowed; the no-loop rule bars reusing VIDEO clips). Visuals: 9 NEW gentle clips (~5s each), credits energy, no cuts faster than 4s:
O1 Sunny waving on the porch (mirrors sign-off) · O2 Leo + Mia wave and lean together · O3 Mimi + Koda wave from their doorstep · O4 Nana rocking, teacup raise · O5 Ava + Mayor Mary wave from the co-op gate · O6 Rena paints a goodbye sun, Rico dribbles past · O7 Gabriel snoozing on the porch mat (Bella NOT in this shot) · O8 slow wide of Marigold Grove at golden hour, everyone tiny and waving · O9 logo card "Sunny and the Crew!" one bounce, hold, warm fade on the final note.

## SECTION G — IMPLEMENTATION NOTES

- **Clip math v2:** cold open 23 + practice 16 + movement game 9 (NEW) + hunt 22 + lead-in 6 + reflection 17 (15 existing + 2 new for the † block) + outro 9 (NEW) = **102 to generate**; reprise's 24 prompts RETIRED pre-generation. Song 27 + theme 19 reused. Every clip 3–5s (theme exempt); no ID reused.
- **Audio to produce:** the two Suno beds (72s practice / 100s hunt — specs unchanged in new_assets doc) + VO: 62 locked lines + 10 new (S8 + reflection †) = 72 lines, 7 baked 3.0s pauses in the story.
- **Lip sync:** dialogue clips in DIRECT_ADDRESS framing (S1, S6, hunt questions, reflection) get lip-sync passes after VO lock; group/action clips do not. Song: 6 hero close-ups only (Section E).
- **CI assembly:** same proven pattern (push-marker workflow, runner downloads clips, trims to the cut map, concats 720p30, muxes audio). Blocks: P1 master | story VO+beds | song master | reflection VO | outro theme replay. Validator gates every push; batch anatomy/continuity passes per batch_plan.
- **Hard rules honored:** no cars · Mimi smallest (only S10) · Nana tallest · Bella≠Gabriel (only O7, Gabriel alone) · Mia EXACTLY TWO pigtails (auto-line in every prompt) · no brand marks · one head each · Ava learning pop-ups ✓ · Rena/Rico presence ✓ · locked 8-color palette, warm lighting, no night.
- **Next mechanical step on creator go:** retime manifest to this table (regenerate cue sheet + manifest via the generator scripts), regenerate prompt pack, then batch generation B1→B8.

## SECTION H — RISKS AND MITIGATIONS

1. **Catchphrase not yet canon** — proposed "Let's ask! Let's find out! Come on, Crew!" (aligns with EP02 "Ask Ask Ask"). Needs creator lock before VO records. *Mitigation: flagged; one-word approval.*
2. **Runtime band** — spec's literal ~5:00/~1:00 lands at 9:14 (between bands); this design stretches story to 5:40 + reflection to 1:15 → 10:09.78, in-band. *If the creator prefers the shorter 9:14 cut, the runtime bands need a creator amendment instead.*
3. **Theme-audio double-use** — intro + outro replay of the same song is intentional per spec; codify as an allowed exception to "no repeats" (audio only, video never). *Added to music integration rules on implementation.*
4. **S8/outro are the only unproven prompt sets** — 18 new prompts; same element/anatomy/brand guardrails as the validated 84.
5. **Lip-sync tooling** unexercised in this pipeline so far — run a 1-clip pilot (S6 direct address) before batching.
6. **Beds still missing** (blocker to assembly, not to generation of visuals): 2 Suno generations, specs ready.
