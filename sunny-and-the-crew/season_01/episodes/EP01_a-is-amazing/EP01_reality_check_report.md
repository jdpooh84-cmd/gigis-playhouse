# EP01 — Reality Check: Song · Lip-Sync · Letter Accuracy
Investigated against the delivered file `EP01-A-is-for-amazing-FINAL.mp4` (Drive `1Xnqv6FDcl7MkiItcOofybbrTFABVmfKV`). Measurements are real (ffmpeg). No rebuild run yet — report + 2 proof clips first, per your instruction. 2026-07-14.

---

## SECTION 1 — Song "A Is Amazing"

**Does it exist as audio?** Yes. `_staging/audio/a-is-amazing.mp3`, 104.83s, the Suno vocal render (lyrics logged in `song_sections.json`).

**Is it in the current cut?** Technically **yes** — and this is the honest finding. I cross-correlated the episode's 4:02–5:47 region against the song master: **0.995 correlation** (near-identical), and that stretch is the **loudest** part of the whole episode (−17.5 dB vs −23 to −28 dB for dialogue). So the song audio is present, byte-for-byte, and not buried.

**Then why did it feel absent?** Two real reasons — I'm not going to wave this away:
1. **You may have watched an older/cached copy.** I superseded the previous FINAL today; if the tab/preview cached the old thumbnail or an earlier upload, the jump-to-song won't be there. *Quick check: open `1Xnqv6…`, scrub to 4:02 — you should hear "A is amazing, A is the best."*
2. **The bigger issue: the crew never SINGS it on screen.** SEC-04 was built as a **dance montage** — the kids move to the music but their mouths do **not** lip-sync the lyrics. So it plays like *background music under a dance break*, not "the title song performed." For a hearing kid it's ambient; **for a deaf kid there is no visible singing at all** — the song is invisible to them. That's why it doesn't register as "the song is in the episode."

**Where it should appear:** SEC-04 (the song slot) is the right placement. The fix is **presence + performance**, not relocation:
- **Fix 1 (make it unmistakable):** open SEC-04 with a clear sing-along cue (Sunny to camera: "Let's sing the A song!" — that VO already exists at C20/C21) and hold on the crew starting to sing.
- **Fix 2 (perform it — recommended, ties to Section 2):** lip-sync at least the **chorus lines** on a lead singer (Sunny) + full-crew on the "A-A-A!" hook, using the song vocal as the `audio_references` driver — same mechanism as dialogue. Then the crew is visibly singing the title song, and deaf kids see it.
- **Fix 3 (optional bookend):** a short melody reprise under the outro so the title song tops-and-tails the episode.

---

## SECTION 2 — Lip-sync audit (critical for ASL / lip-reading)

**Finding: audio leads the lips by ~0.3–0.5s across the whole show. Confirmed, measured, systematic.**

| Shot | Audio onset | Mouth opens | Lag |
|---|---|---|---|
| C01 Sunny "Today is Name Day!" (0:44) | 44.97s | ~45.30s | **+0.33s** |
| N01 Koda "My name is amazing — KO-DA!" (0:58) | 58.25s | ~58.75s | **+0.50s** |

Every dialogue shot I sampled shows the same pattern: the voice starts, then the mouth catches up a third to a half-second late — exactly your "dubbed foreign film" description. With sound off + captions on, a lip-reading child sees a still mouth while the caption is already talking.

**Root cause:** the lip-sync renders (seedance, driven by your ElevenLabs audio) have an inherent ~0.3–0.5s **wind-up** before the mouth animation starts, but the assembly muxed the voice at t=0. So voice = early, mouth = late.

**Fix (re-timing, no re-rendering of dialogue needed):** in the section assembler, align each line's voice to its mouth — delay the muxed VO to the clip's measured mouth-onset (default ~0.4s, fine-tuned per clip). I also add a post-check that measures onset-vs-mouth on every talking shot and flags any still >0.12s off.
- **PROOF A** (attached): C01 with the fix applied — new audio onset +0.475s lands on the mouth-open +0.48s → **synced to ~5 ms.** Play it against the current cut; the "dub" feel is gone.

*(Also folds in Section 1's Fix 2: the song gets the same treatment so the singing is synced too.)*

---

## SECTION 3 — Letter-writing accuracy

**Finding: letters in the video are AI-hallucinated and unreliable — some are missing, some can be wrong.** They were never authored; the render invented them, despite the "no on-screen text" prompt rule.

What I saw in the current cut:
| Shot | Time | Says | Letter shown | Status |
|---|---|---|---|---|
| C13 Leo "Trace an A in the air!" | 2:29 | A | clean "A" | ✅ correct (simple, heavily-prompted — luck) |
| N23 Mia "MI-A — my letter M!" | 3:16 | M | **nothing** | ❌ no M at all |
| N13 Bram "BRAM! I did it!" | 3:05 | B | **nothing** | ❌ no B at all |

So the letter is present only when the render happened to draw it; the name-initials (M, B, K, P, L, S) are **absent or unreliable**. AI video cannot be trusted to draw a specific correct letterform — which is exactly why letters are supposed to be **post-production overlays** (already a canon rule).

**Fix: composite the correct letter as a clean graphic on every letter/name shot — guaranteed correct, and far more legible for early literacy + deaf kids than an AI scribble.** Correct glyph per shot:

| Shot | Character | Correct letter |
|---|---|---|
| C11/C12/C13/C14/C28 + SEC-04 chorus | group (the episode letter) | **A** |
| N01 / N20 | Koda | **K** |
| N02 | Mimi | **M** |
| C03 / N23 / C15 | Mia | **M** |
| C04 / N22 | Leo | **L** |
| N13 | Bram | **B** |
| C17 | Pipa | **P** |
| (name callouts) | Sunny | **S** |

Any AI-drawn letter that conflicts gets masked/replaced by the overlay, so there's never a mismatch.
- **PROOF B** (attached): Mia's "my letter M" shot with a clean **M** overlaid in her teal palette — where before there was no letter. This is the exact treatment I'd apply to every name/letter shot.

---

## What I'll do on your go-ahead (full rebuild)
1. **Song:** add the sing-along lead-in + lip-sync the chorus on the crew so the title song is visibly performed (and add the outro reprise if you want the bookend).
2. **Lip-sync:** re-time every dialogue line (and the song) to its mouth onset; add the automated sync-check gate. No dialogue re-rendering — it's a re-assembly.
3. **Letters:** overlay the correct glyph on every letter/name shot per the table above.
4. Re-stitch, re-verify (sync + letters + song-performed), redeliver to Drive, supersede.

**Proof clips attached: `PROOF-A_lipsync-FIXED_C01.mp4` and `PROOF-B_letter-FIXED_Mia-M.mp4`.** Say the word and I'll run the full pass.
