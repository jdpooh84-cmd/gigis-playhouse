# Tiny Groove Squad — Episode 1: Asset Manifest

> All Higgsfield assets are cloud-hosted. Assets are referenced by job ID and output URL.
> Download assets from the Higgsfield dashboard using the job IDs below.
> Local storage path (if downloaded): `output/`

---

## CHARACTER IMAGE ASSETS

| Asset ID | Character | Pose | Job ID | Model | Status | Output URL |
|----------|-----------|------|--------|-------|--------|------------|
| CHAR-01 | Max (age 5) | Wide-stance jump, arms out | `e982ddf6-89a6-483a-8d8c-da4971ebcf73` | nano_banana_2 | pending | TBD — check Higgsfield dashboard |
| CHAR-02 | Lily (age 4) | Slow spin into twirl | `3406334e-3bc6-4852-9aad-fff39130855b` | nano_banana_2 | pending | TBD |
| CHAR-03 | Theo (age 6) | Stiff robot arms, wide grin | `3d30e347-7c6a-4f07-b6c4-7e35b4374bfc` | nano_banana_2 | pending | TBD |
| CHAR-04 | Nina (age 5) | Sharp double-clap, nod | `5ae261d5-5591-45c1-8848-4e9651e1636c` | nano_banana_2 | pending | TBD |
| CHAR-05 | Sam (age 3) | Fists at hip height, open-mouth grin | `f1201597-4143-4e5e-990c-8ffd8473577a` | nano_banana_2 | pending | TBD |

---

## LOCATION / SCENE IMAGE ASSETS

| Asset ID | Scene | Shot | Job ID | Model | Status | Output URL |
|----------|-------|------|--------|-------|--------|------------|
| SCENE-01 | The Groove Room | Empty room, wide 16:9 | `380f5a9b-360c-449e-972a-d98e788925af` | nano_banana_2 | pending | TBD |
| SCENE-02 | Group Wide Shot | All 5 kids on rainbow rug | `49733be6-b0de-4639-a6e7-55c4d125c3dc` | nano_banana_2 | pending | TBD |
| SCENE-03 | Verse 1 — Jump + Clap | All 5, full-body wide | NOT YET SUBMITTED | kling3_0_turbo | not started | — |
| SCENE-04 | Verse 2 — Spin + Stomp | All 5, full-body wide | NOT YET SUBMITTED | kling3_0_turbo | not started | — |
| SCENE-05 | Verse 3 — Wiggle + Freeze | All 5, full-body wide | NOT YET SUBMITTED | kling3_0_turbo | not started | — |
| SCENE-06 | Outro Final Group Shot | All 5, arms over shoulders | NOT YET SUBMITTED | nano_banana_2 | not started | — |

---

## THUMBNAIL ASSET

| Asset ID | Description | Job ID | Model | Status | Output URL |
|----------|-------------|--------|-------|--------|------------|
| THUMB-01 | Episode 1 thumbnail composite | `7e447910-04f7-4f45-9fed-d316e6f6abe6` | nano_banana_2 | pending | TBD |

---

## VIDEO ASSETS

| Asset ID | Scene | Duration | Job ID | Model | Status | Output URL |
|----------|-------|----------|--------|-------|--------|------------|
| VID-01 | Verse 1 — Jump + Clap | 6 sec | `85e65dcf-d34a-455e-b7f4-9fbadb3b9a09` | kling3_0_turbo | pending | TBD |
| VID-02 | Verse 2 — Spin + Stomp | 6 sec | `adf287aa-e88e-4085-93bc-61042c9d7670` | kling3_0_turbo | pending | TBD |
| VID-03 | Verse 3 — Wiggle + Freeze | 8 sec | `44c63f06-9568-469c-bea7-63bc18df0a1c` | kling3_0_turbo | pending | TBD |
| VID-04 | Outro Final Group | 5 sec | `2ad30c73-d00d-4cd5-b52e-c85b09d8088b` | kling3_0_turbo | pending | TBD |

---

## AUDIO ASSETS

| Asset ID | Content | Duration | Job ID | Model | Status | Output URL |
|----------|---------|----------|--------|-------|--------|------------|
| AUD-01 | Chorus ("Everybody groove!") | ~20 sec | BLOCKED — needs approval | seed_audio | blocked | — |
| AUD-02 | Verse 1 lyrics (Jump + Clap) | ~20 sec | BLOCKED — needs approval | seed_audio | blocked | — |
| AUD-03 | Verse 2 lyrics (Spin + Stomp) | ~20 sec | BLOCKED — needs approval | seed_audio | blocked | — |
| AUD-04 | Verse 3 lyrics (Wiggle + Freeze) | ~20 sec | BLOCKED — needs approval | seed_audio | blocked | — |

---

## Scene-to-Asset Mapping

| Scene # | Scene Name | Required Assets |
|---------|------------|-----------------|
| Scene 1 | Intro | SCENE-01 (empty room), CHAR-01–05 |
| Scene 2 | Chorus 1 | SCENE-02 (group wide) |
| Scene 3 | Verse 1 Jump+Clap | SCENE-03 or VID-01, CHAR-01 (Max), CHAR-05 (Sam) |
| Scene 4 | Chorus 2 | SCENE-02 (group wide) |
| Scene 5 | Verse 2 Spin+Stomp | SCENE-04 or VID-02, CHAR-02 (Lily), CHAR-03 (Theo), CHAR-04 (Nina) |
| Scene 6 | Chorus 3 | SCENE-02 (group wide) |
| Scene 7 | Verse 3 Wiggle+Freeze | SCENE-05 or VID-03, CHAR-05 (Sam), CHAR-03 (Theo) |
| Scene 8 | Outro x2 | SCENE-06, VID-04 |
| Thumbnail | — | THUMB-01 |

---

## Missing / Next-to-Generate
1. SCENE-02 — Group wide shot (all 5 kids on rug) — 16:9 image
2. SCENE-06 — Outro final group shot — 16:9 image
3. THUMB-01 — Thumbnail composite — 16:9 image
4. VID-01 through VID-04 — Four video clips (kling3_0_turbo)
5. AUD-01 through AUD-04 — Four audio/vocal clips (seed_audio)
6. Status check on CHAR-01–05 and SCENE-01 (jobs submitted, awaiting completion)

---

## How to Update This File
When a job completes:
1. Change status from `pending` to `complete`
2. Paste the output URL into the Output URL column
3. If downloading locally: save to `output/` using the naming convention in `output/README.md`
