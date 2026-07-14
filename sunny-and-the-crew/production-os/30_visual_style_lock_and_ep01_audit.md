# 30 — Visual Style LOCK + EP01 Style Audit
Status: **LOCKED 2026-07-14 (creator directive).** Supersedes any ad-hoc style wording in prompts. 2026-07-14.

## 1. STYLE LOCK (canon)
**Sunny & the Crew is a major-studio, theatrical-feature-quality, polished stylized 3D production.** This is fixed canon.
- Fully **three-dimensional rendered CGI** characters: rounded dimensional forms, soft subsurface skin shading, glossy eyes, real volume and depth.
- **Cinematic composition + lighting:** key/fill/rim, gentle depth of field, atmospheric detailed 3D environments.
- **On-model, consistent character models;** natural facial expressions and nuanced body movement.
- The **THEME-INTRO-MASTER** and the existing **SEC-04 song shots / dialogue close-up library** are the reference bar for this look.

### Allowed without approval
Animation (poses, timing, movement) · staging & composition (camera, blocking) · expressions within the model · lighting & environment detail.

### NOT allowed without explicit written creator approval
Swapping to **2D / flatter render** · simplifying/flattening character models · "downgrading" to web/broadcast-quality · any change to rendering **style, dimensionality, or model fidelity.** A deviation is a **bug**, not a creative choice. If a tool constraint seems to force a style change: **stop, explain, propose 3D-preserving options, wait for approval.**

## 2. ROOT CAUSE of the regression (owned)
From-scratch image prompts this session used **"bright wholesome storybook cartoon style"** — wording adopted to avoid the safety-filtered word "Pixar." That phrase **flattened new stills to a 2D storybook look.** Shots that were *driven by the existing 3D library* (close-ups/actions as seedance start-images) kept the 3D look because the 3D source image dominates; **stills generated from scratch with the "storybook cartoon" phrase went flat.**

### Corrected STYLE BLOCK (paste into EVERY image prompt; never use "storybook/cartoon/2D/flat/illustration")
> "STYLE (LOCKED): polished stylized **3D CGI animated feature** — fully three-dimensional rendered characters with soft subsurface skin shading, rounded dimensional forms and real depth; cinematic key-and-fill lighting, gentle depth of field, richly detailed 3D environment; on-model, theatrical feature quality. **NOT 2D, NOT flat, NOT outlined, NOT a storybook illustration, NOT a coloring-book look.**"
- Banned words in prompts: *storybook, cartoon, illustration, 2D, flat, vector, coloring book, broadcast, educational-animation.* (Still banned: "Pixar", age words, on-screen text.)
- Belt-and-suspenders: generate new group/establishing stills **from an existing on-model 3D key frame** (image reference) whenever possible, so the 3D source dominates.

## 3. EP01 STYLE AUDIT (KEEP vs RECUT)
Assessed from frames pulled off the current FINAL + generation provenance.

| Asset / shot group | Provenance | Style | Verdict |
|---|---|---|---|
| **SEC-01 THEME-INTRO-MASTER** | locked master | 3D ✓ | **KEEP** (locked reference) |
| **SEC-02 dialogue** (close-ups/actions) | 3D CU/ACT library | 3D ✓ | **KEEP** (spot-verify each) |
| **SEC-03 pilot — dialogue lip-sync** (P3-01..06, 08..14, 16..19, 21..23) | seedance driven by 3D CU/ACT start-images | 3D ✓ | **KEEP** |
| **SEC-03 pilot — group stills: NEW-COPY-LEOKODA (P3-07), NEW-CREW-CHEER (P3-15), NEW-CREW-APOSE (P3-20)** | from-scratch, "storybook cartoon" prompt | **FLAT 2D ✗** | **RECUT NEEDED** |
| **SEC-04 song** (S04-01..21) | from-scratch on-model revisual | 3D ✓ (sampled 250s/300s/326s/337s) | **KEEP** — *full 21-shot 3D verify pending* |
| **SEC-05 reflection** (close-ups) | 3D CU library | 3D ✓ | **KEEP** (spot-verify each) |

**Net:** the confirmed off-spec assets are the **3 SEC-03 pilot group stills** (and the 3 videos derived from them: P3-07, P3-15, P3-20). Everything else reads 3D. SEC-04's 21 stills read 3D on all sampled frames; I will verify all 21 individually before the SEC-04 upgrade so none slipped flat.

## 4. RECUT PLAN (restoring canon — not a new style)
1. Re-render the **3 group stills** (copy-me, crew-cheer, crew-A-pose) with the corrected STYLE BLOCK + a 3D key-frame reference, on-model locked elements.
2. Re-render their **3 lip-sync/game videos** (P3-07, P3-15, P3-20) from the new 3D stills + the same VO.
3. Rebuild the SEC-03 pilot + re-stitch (sync-gate + letter overlays unchanged).
4. Full **21-shot SEC-04 3D verification** before the SEC-04 sung-performance upgrade; recut any that read flat.
5. **All future rebuilds** (SEC-02/03/05, SEC-04, pilot, future episodes) use the corrected STYLE BLOCK; the QA gate below blocks flat renders.

## 5. QA GATE (blocking, added to template)
**STYLE-LOCK gate:** every generated image/video is checked against the 3D feature-quality reference before its video is spent / before assembly. Any shot reading 2D / flat / outlined / storybook-illustration = **defective → re-render in the locked 3D style.** Prompts must carry the STYLE BLOCK and none of the banned words.
