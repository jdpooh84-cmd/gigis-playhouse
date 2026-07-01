# 11 — Higgsfield Generation Log

## Image Assets

### CHARACTER REFERENCES

| Asset | Job ID | Model | Status | URL |
|-------|--------|-------|--------|-----|
| Ziggy (blue cat, ref master) | `bc8b28c3-e37d-459d-a016-93a5713103f3` | recraft_v4_1 | ✅ COMPLETED | https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_004409_bc8b28c3-e37d-459d-a016-93a5713103f3.png |
| Bop (orange frog, ref master) | `8b8e6589-ee42-4626-8bb2-203daa70c95b` | recraft_v4_1 | ✅ COMPLETED | https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_004410_8b8e6589-ee42-4626-8bb2-203daa70c95b.png |

### BACKGROUND REFERENCES

| Asset | Job ID | Model | Status | URL |
|-------|--------|-------|--------|-----|
| Rainbow Meadow (16:9 bg) | `d60cadda-0ba3-4418-b431-c845a64b6586` | recraft_v4_1 | ✅ COMPLETED | https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_004503_d60cadda-0ba3-4418-b431-c845a64b6586.png |
| Zigzag Dance Stage (16:9 bg) | `ec48fcd3-59d8-42ac-b528-163a6ad000f2` | recraft_v4_1 | ✅ COMPLETED | https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_004601_ec48fcd3-59d8-42ac-b528-163a6ad000f2.png |

---

## Video Scene Assets

Video generation uses `seedance_2_0` model, 5 seconds per shot, 16:9, 720p.
Character references passed as `image_references`. Background passed as `start_image`.

| Shot | Scene | Background | Job ID | Status | URL |
|------|-------|-----------|--------|--------|-----|
| VID-01 | S01 Intro - wave/bounce | Meadow | `69ab762b-05e7-4722-aa07-cd6d535c5c1a` | 🔄 IN PROGRESS | TBD |
| VID-02 | S02 Hook - zoom run | Meadow | `624ab9bc-2f5f-439e-a020-97b0c3a5d47a` | 🔄 IN PROGRESS | TBD |
| VID-03 | S02 Hook - freeze pose | Meadow | `e4786021-5efb-4a80-a1d3-8239d8a5c1d4` | 🔄 IN PROGRESS | TBD |
| VID-04 | S03 Verse 1a - run in place | Meadow | `9fc84309-8343-41ea-bde6-0627ecdbd549` | 🔄 IN PROGRESS | TBD |
| VID-05 | S04 Verse 1b - wiggle | Meadow | `5b0a8fc6-c95f-484e-8aef-83c038cd52ee` | 🔄 IN PROGRESS | TBD |
| VID-06 | S05 Hook 2 - zoom/freeze | Meadow | `cd3899ec-8498-4b76-83a4-004682e2f8e0` | 🔄 IN PROGRESS | TBD |
| VID-07 | S06 Verse 2a - slow-mo walk | Stage | `ca2d072a-3c80-48cb-86b1-479fb73a62a4` | 🔄 IN PROGRESS | TBD |
| VID-08 | S07 Verse 2b - spin/jump | Stage | `e1903d87-9422-481d-9a07-5d9495ad7d5e` | 🔄 IN PROGRESS | TBD |
| VID-09 | S08 Hook 3 | Stage | `90db82a6-ef40-4ff8-81c9-a1b1bea44e29` | 🔄 IN PROGRESS | TBD |
| VID-10 | S09 Bridge - count/freeze | Stage | `95515711-51d3-4022-ae0e-430b8e4e3048` | 🔄 IN PROGRESS | TBD |
| VID-11 | S10 Final Hook | Stage | `96e3b087-bf43-4c1d-b5d0-5a95aa2c8bc5` | 🔄 IN PROGRESS | TBD |
| VID-12 | S11 Outro - wave/goodbye | Meadow | `bcf26b1f-435f-4053-a0bd-9b638a471f7a` | 🔄 IN PROGRESS | TBD |

Status: 12/12 submitted — all in progress.

---

## Consistency Check Protocol
For each completed video shot, verify:
- [ ] Characters match reference colors (Ziggy: sky blue + yellow shirt; Bop: orange + rainbow shorts)
- [ ] Background matches reference art (no new elements)
- [ ] No drift toward realistic/human appearance
- [ ] Characters remain clearly cartoon style
- [ ] Open dance space maintained in frame center

## Regeneration Policy
- If drift detected: re-submit same prompt with stronger style constraint
- Do NOT change character concept — only strengthen style words
- Maximum 2 regeneration attempts per shot before using adjacent shot
