# EP01 — Root-Cause Quality Pass & SIGN-OFF PACKET
Status: **PLAN — awaiting creator sign-off (no fixes executed yet).** 2026-07-14.
Scope: EP01 "A Is for Amazing — and That's YOU!" final cut (6:42.86). Adds the
creator's on-model hard rule (2026-07-14) to the standing root-cause pass
(no narrator · kid-like voices per character · stable voice identity · dialogue
cadence integrated with music · sync fixed at the pipeline level).

## Final-cut section map (for timestamp math)
| SEC | In → Out (final) | Internal | Source |
|---|---|---|---|
| SEC-01 | 0:00.00 → 0:44.80 | — | THEME-INTRO-MASTER (locked) |
| SEC-02 | 0:44.80 → 2:08.83 | 84.03s | story1-v2 |
| SEC-03 | 2:08.83 → 4:02.36 | 113.53s | story2-v2 |
| **SEC-04** | **4:02.36 → 5:47.19** | **104.83s** | song master (a-is-amazing) |
| SEC-05 | 5:47.19 → 6:42.86 | 55.62s | reflection-v2 |

**5:25–5:28 → SEC-04 internal 82.6–85.6s → the song's FINAL CHORUS (82.5–95.5s) → shot `EP01-P4-C24` (edge into `P4-C25`).**

---

## SECTION 1 — FAILURE ANALYSIS

| # | Defect | Where | Severity |
|---|---|---|---|
| **F1** | **Characters on screen are NOT the current Sunny & Crew designs** (wrong faces / wrong kid group) | **SEC-04 song, 5:25–5:28 → shot `EP01-P4-C24` (±`C25`), Final Chorus** | **ON-MODEL VIOLATION — MUST REPLACE** |
| **F2** | Whole song built **2026-07-10**, *before/at* the redesign lock (Mimi/Pipa/Bram v2 = 07-10; Koda-v3 & Bella-v2 = 07-11) → **all 29 song shots `P4-C01..C29` are suspect** for superseded designs | SEC-04 (entire song visual) | **ON-MODEL VIOLATION (scope) — MUST AUDIT + REPLACE any off-model** |
| F3 | VO reads as a detached **narrator** over the picture (flat audio bed, no lip-sync, not clearly in-world) | all dialogue (SEC-02/03/05) | High |
| F4 | Voices are **adult-timbre interim presets** (Quinn/Julian/Kevin/Gia/Skye/Ava), not kid-like; identity not proven stable across dialogue → song | all sections | High |
| F5 | Dialogue **cadence not integrated with the music** (109.1 BPM); sync solved per-clip, not at the pipeline | section boundaries + song lead-in/out | Medium-High |
| F6 | Anatomy of group shots **not machine-verifiable in-session** (container firewalled from the render CDN) | SEC-02/03/05 group A-poses | Medium (human-eye gate) |

> F1 and F2 are the creator's newly-mandated on-model violations. They override SEC-04's prior "locked / untouched" status: **an off-model frame does not ship, even inside a locked master.**

## SECTION 2 — ROOT CAUSE
- **RC-A · Asset-version drift.** SEC-04 was rendered and then frozen as an "untouched master" *before* the character element registry was re-locked. The pipeline had **no on-model gate that re-validates locked masters against the current element IDs**, so the redesign never propagated into the song. → F1, F2.
- **RC-B · Voice treated as post-mux narration.** VO was generated from generic adult presets and laid under the picture as a flat bed (audio-first slotting), with no per-character kid casting and no lip-sync. → F3, F4.
- **RC-C · No cross-section cadence model.** Nothing ties dialogue timing to the song's 109.1 BPM grid; sync was handled clip-by-clip. → F5.
- **RC-D · QA blind spot.** On-model / anatomy inspection depends on viewing frames the dev container can't fetch (CDN firewall); only prompt-level enforcement + human eye currently cover it. → F6.

## SECTION 3 — CORRECTIVE STANDARDS (now enforced)
- **S1 · ON-MODEL GATE (HARD, new).** Any shot whose characters are not the current locked designs = **defective retake → remove + re-render with correct elements + re-insert.** Applies to **every** shot including inside locked masters. Locked status never overrides on-model.
- **S2 · Kid voice per character.** Cast child-timbre voices per character; Sunny + each crew kid distinct and age-appropriate; **no adult narrator voice**; identity stable across dialogue and song.
- **S3 · No narrator.** Every line is an on-screen character speaking in-world (lip-synced or tightly character-attributed), never a detached voice-over.
- **S4 · Cadence integrated.** Dialogue cadence aligned to the song beat grid (109.1 BPM); **sync solved in one pipeline pass**, not bolted on per clip.
- **S5 · Registry re-validation.** Whenever the character element registry changes, **all existing masters are re-audited on-model** before they can ship.

## SECTION 4 — EP01 REPAIR PLAN
Ordered; treated as normal animation retakes — *wrong shot out, correct shot in, timing/pacing preserved or improved.*

1. **R1 · SEC-04 on-model audit.** Enumerate all 29 song shots (`EP01-P4-C01..C29`), map each to its element usage, and flag every off-model shot. **`P4-C24` (5:25–5:28) is confirmed defective**; audit confirms the rest of the Final Chorus and the full song.
2. **R2 · Delete the defective shot(s) from the assembly plan.** Remove `P4-C24` (+ any others flagged in R1) from SEC-04's shot list — they do not ship.
3. **R3 · Re-render the retakes on-model.** New clips for `P4-C24` (and each flagged shot) using the **current locked elements** — Sunny `a40e2d56`, Koda-v3 `7ce52e05`, Mimi-v2 `7b005b4b`, Pipa-v2 `8849bdb4`, Bram-v2 `e80f7f4d`, Leo `ab579f47`, Mia `36f55b8e` — matching each shot's framing, action, and **exact duration**, real-time pacing.
4. **R4 · Video-only recomposite of SEC-04.** Keep the **locked song audio** (`a-is-amazing.mp3`, 104.83s) and every shot's timing untouched; **swap only the defective video segments**; re-export **SEC-04 v2** = still 104.83s, beats and lyric hits preserved, music lands clean.
5. **R5 · Voice root-cause pass.** Recast kid-timbre voices per character (S2/S3), regenerate dialogue VO with no narrator affect, align cadence to 109.1 BPM (S4), and run a single pipeline sync/lip-sync pass across SEC-02/03/05 + the song lead-in/out.
6. **R6 · Reassemble & verify.** Rebuild SEC-03 → **SEC-04 v2** → SEC-05 so the song still hits cleanly with all characters on-model; re-stitch the final; verify: **100% on-model, no narrator, kid voices stable, SEC-04 audio byte-identical, durations within band, C27→C30 order intact.**
7. **R7 · Re-deliver.** Push the corrected final to the same Drive folder (FINALS — READY TO UPLOAD), superseding the current file.

## SECTION 5 — SIGN-OFF GATES + decisions needed
**Ship gates (all must pass):** on-model 100% · no narrator · kid voices per character, stable across dialogue+song · cadence locked to 109.1 BPM · sync at pipeline · **SEC-04 song audio byte-identical** · section durations within band · Pipa arc in SEC-03/05 · C27–C30 in order.

**Three decisions I need before executing R1–R7:**
1. **SEC-04 retake scope** — replace *only* the flagged off-model song shots (surgical, fastest, keeps everything else), **or** re-render the song's full visual track fresh on-model (cleanest, more renders)?
2. **Kid-voice casting** — approve me proposing specific child-timbre voices per character (Sunny + crew) for your review, before I regenerate any VO?
3. **Lip-sync** — do you want a true lip-sync pass on close-ups (adds a scoped sync step), or tight character-attributed timing without lip animation?

*No fixes will run until you sign off on scope + casting + lip-sync above.*
