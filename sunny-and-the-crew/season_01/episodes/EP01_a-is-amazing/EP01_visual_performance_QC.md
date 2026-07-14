# EP01 — Studio Visual-Performance QC + Fix Plan
Harsh director-level pass on the delivered 5:52 cut. 2026-07-14.

## SECTION 1 — Problems found (data-backed)
Primary defect = **repeated start-images → copy-paste posing** (the "AI animation" tell). Objective reuse counts in the *current* cut:

| Reused shot | Count | Where | Read |
|---|---|---|---|
| **CU-SUNNY-DA** (Sunny front close-up) | **5×** | S02:C01,C02,C08,N04 · S05:C30 | Same talking-head frame for 5 different lines — biggest offender |
| **CU-SUNNY-PORCH** | **3×** | S05:C24,C27,C29 | Sunny's SEC-05 close-ups all identical |
| **CU-AVA** | **3×** | S02:N05 · S05:N21 · P3-01 | Mentor looks the same every appearance |
| **CU-PIPA-PROUD** | **2×** | S05:C25,C26 | Pipa's payoff shots identical |
| ACT-SUNNY-CLAPDEMO | 2× | P3-02,P3-03 (adjacent) | Back-to-back same clap frame |
| ACT-SUNNY-APOSE | 2× | S05:C22,C28 | Repeated A-pose (partly intentional signature) |

**Other performance/staging notes**
- **Stiffness:** dialogue close-ups animate mainly the mouth; heads/eyes/hands/weight are under-moved for the emotional beat (esp. Sunny's warm lines, Ava's affirmations, Pipa's pride).
- **Staging:** single-subject close-ups are fine; the risk is *sameness of angle* (near-frontal everywhere) — no variety of 3/4, lean-in, or eyeline changes that a real show uses to keep a talking scene alive.
- **Not flagged:** SEC-01 theme (locked), SEC-04 song (varied full-crew staging, good), the name-scene C05/C06/C07 (different characters, not duplication), SEC-03 games (recut 3D, varied group shots).

## SECTION 2 — Fix plan (within existing timing/voices/letters/pauses)
Break every ≥2 repeat with **alternate on-model 3D close-ups + motivated performance**, keeping each shot's VO, lip-sync, letters and slot identical (re-render is start-image + same audio_references, so timing/lip-sync are preserved).

**5 new alternate 3D close-ups (rendered ✓):** Sunny-3⁄4 · Sunny-thinking · Sunny-lean-in · Ava-3⁄4-nod · Pipa-proud-alt.

**9 shot re-stagings** (start-image → new look + specific action):
| Clip | New look | Performance direction |
|---|---|---|
| S02:C02 | Sunny-3⁄4 | animated explain, open-hand gesture, head turn |
| S02:C08 | Sunny-lean | lean toward Pipa, reassuring, soft nod |
| S02:N04 | Sunny-think | bright realization, point on "just like YOU", brow lift |
| S05:C24 | Sunny-3⁄4 | turn caringly to Pipa, head tilt, lean in |
| S05:C27 | Sunny-lean | lean to camera, inviting |
| S05:C30 | Sunny-lean | big goodbye wave, follow-through |
| S05:N21 | Ava-3⁄4-nod | proud nod, hand to heart |
| S05:C25 | Pipa-proud-alt | beaming, chin up, joyful bounce |
| P3-01 | Ava-3⁄4-nod | warm inviting gesture |
Result: CU-SUNNY-DA 5×→~2×, PORCH 3×→1×, AVA 3×→1×, PIPA-PROUD 2×→1×; every repeated shot now has a distinct angle + action, and each re-render carries richer head/eye/hand/weight motion to kill the stiffness.

## SECTION 3 — Implementation status
- ✅ 5 alternate 3D close-ups rendered on-model (job ids: Sunny-3Q `e71f4d7c`, Sunny-think `9d61e3ca`, Sunny-lean `77ff9008`, Ava-2 `8ae6ab1a`, Pipa-proud2 `b5ca9213`).
- ✅ 9 VO lines re-imported; re-render spec prepared (`_staging/perf_fix/respec.json`).
- ⛔ **BLOCKED: Higgsfield workspace is OUT OF CREDITS.** The 9 video re-renders fail with "Out of credits in the selected workspace." Nothing further can render until credits are topped up.
- On top-up: fire the 9 seedance re-renders (start-image + same VO), swap their URLs into the SEC-02/03/05 specs, rebuild (sync-gate + letters unchanged), re-stitch, redeliver. ~20 min once credits are live. Voices/lip-sync/letters/pauses are untouched by design.
