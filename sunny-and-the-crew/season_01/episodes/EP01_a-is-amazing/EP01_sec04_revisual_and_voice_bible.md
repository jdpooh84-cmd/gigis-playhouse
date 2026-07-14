# EP01 — New SEC-04 Visual Plan · Voice Bible · Repair Execution Plan
Status: **PROPOSAL — awaiting creator sign-off on visuals + casting before full batch.** 2026-07-14.
Decisions locked by creator: (1) re-render the ENTIRE SEC-04 visual track on-model, full current crew; keep song audio byte-identical + beat/lyric timing; canonical for series reuse. (2) kid-timbre voices per character, no narrator, in-world only. (3) tight character-attributed timing now, scoped lip-sync later.

## Audit finding (why SEC-04 was off-model)
The song master was built **2026-07-10**, before the redesign lock. Its 29 shots use **only Sunny/Leo/Mia**, and **shots C24–C27 (the Final Chorus, = the 5:25–5:28 break) include MAYOR MARY** — an adult, the "wrong kid group." Koda, Mimi, Pipa, Bram never appear. Lyrics are apple/airplane ("A is amazing"), not name-pride. → full fresh on-model cut with the whole crew.

---

## SECTION 1 — New SEC-04 Visual Plan (canonical song visual)
- **Cast (locked elements only):** Sunny `a40e2d56` · Leo `ab579f47` · Mia `36f55b8e` · Koda-v3 `7ce52e05` · Mimi-v2 `7b005b4b` · Pipa-v2 `8849bdb4` · Bram-v2 `e80f7f4d`. **No Mayor Mary, no adults, no dogs.**
- **Setting:** the sunny garden / backyard song space (continuity with SEC-02), plain red apples + plain paper airplane as A-word props (no brands, no on-screen text).
- **Total = 104.83s, locked to the 8 lyric sections** (song_sections.json). Cast rotates 2–3 kids/shot; full-crew wides only at chorus peaks (anatomy-gated: one head each, Mia 2 pigtails, **Mimi smallest, Koda tallest of the kids**).

| Song section | Time | Len | Shots | On-model action |
|---|---|---|---|---|
| Intro | 0–7.0 | 7.0 | 2 | Full crew gathers & waves; Sunny opens the sing-along to camera |
| Verse 1 · Apple | 7.0–24.6 | 17.6 | 4 | Leo apple overhead; Mia+Koda crunch mime; Pipa+Bram roll apple; **Mimi hugs a big apple** |
| Chorus 1 | 24.6–37.8 | 13.2 | 3 | Full-crew **A-pose** on "A is amazing"; two A-pose rows |
| Verse 2 · Airplane | 37.8–55.5 | 17.7 | 4 | Leo airplane-arms run; Koda+Mia zoom; Pipa+Bram spread wings & spin; Sunny+Mimi glide |
| Chorus 2 | 55.5–68.0 | 12.5 | 3 | Full-crew A-pose reprise; Sunny A-pose invite to camera |
| Bridge | 68.0–82.5 | 14.5 | 3 | Softer sway, hands on hearts ("A words feel just right") |
| **Final Chorus** | **82.5–95.5** | **13.0** | 3 | **REPLACES the Mayor Mary shots** — full-crew A-pose jump finale (kids only) + Sunny & Pipa proud A-pose (name-pride tie-in) |
| Outro | 95.5–104.83 | 9.33 | 2 | Crew waves "bye bye"; Sunny settles (music ends 102.86, 1.94s tail) |

**≈24 shots**, tier-A real-time movement (genre:action / kling3_0), each cut to the beat grid. Video-only: the existing song **audio is extracted and re-muxed byte-identical**, so sync is preserved.

## SECTION 2 — Character Voice Bible & Casting Proposal
Kid-timbre via `seed_audio` **pitch_rate (−12…+12 semitones)** + speech_rate. Once you pick, each voice is **locked as a `create_voice` reference element** → stable `voice_id` reused every episode (no re-tuning). Demos below are real (click to hear).

| Character | Age feel | Tone / energy | Candidate (preset · pitch · rate) | Demo |
|---|---|---|---|---|
| **Sunny** | ~5–6 | warm, curious, bright leader | Chloe · +5 · +3 | "Come on, Crew — let's find out!" |
| **Leo** | ~5 | fast, chaotic, joyful (¡Órale!) | Leo · +5 · +5 | "¡Órale! Watch my rocket go!" |
| **Mia** | ~6 | calm, precise, thoughtful | Hana · +4 · 0 | "Hmm… I think I see it now." |
| **Koda** | ~8 (older bro) | cool, confident, less-pitched | Julian · +3 · 0 | "Stand back — I've got this." |
| **Mimi** | ~3 (toddler) | mostly non-verbal, giggles | Luna · +8 · +5 | "Mi-mi! Yay!" |
| **Pipa** | ~5 | dramatic BEST/WORST-ever | Skye · +6 · +5 | "This is the BEST day EVER!" |
| **Bram** | ~5 (twin) | measured, gentle thinker | Kevin · +4 · 0 | "Let me think… got it!" |

- **Sunny note:** currently Quinn (adult, "locked") — proposal moves her to **Chloe +5** for true kid timbre; Quinn stays available if you prefer her pitched +5 instead.
- **Reuse:** after your pick, I lock each as a workspace voice element and record the `voice_id` in `characters.json` → series-consistent.
- **ElevenLabs path (if pitched presets sound artifacty on long lines):** you create/lock one child voice per character in ElevenLabs; I integrate via API, store each `voice_id` per character, reuse every episode. Note this reverses the earlier "internal seed_audio only" preference — your call; I'd only recommend it if the demos below don't convince you.

## SECTION 3 — EP01 Updated Repair Execution Plan (gated)
**Phase A — SEC-04 revisual (after visual sign-off):**
1. Render ~24 on-model song images (full crew, locked elements, cast rules).
2. Render ~24 song videos (tier-A real-time, cut to the beat grid).
3. Build SEC-04 v2 **video** track = 104.83s on the beat grid.
4. Extract the existing song **audio** and re-mux **byte-identical** → `EP01-song-section-v2.mp4` (audio unchanged, sync preserved). Verify audio checksum vs original.

**Phase B — Voice (after casting sign-off):**
5. Lock chosen kid voices as `create_voice` elements; record `voice_id`s in `characters.json`.
6. Regenerate SEC-02/03/05 dialogue VO in-world (no narrator), cadence to 109.1 BPM.
7. Rebuild SEC-02/03/05 v3 with the new VO.

**Phase C — Reassemble & deliver:**
8. Re-stitch EP01 (SEC-01 · SEC-02v3 · SEC-03v3 · **SEC-04v2** · SEC-05v3); verify 100% on-model, no narrator, kid voices stable, SEC-04 audio byte-identical, durations in band, C27–C30 order.
9. Re-deliver to Drive (FINALS folder), superseding the current file.

**Gate:** nothing in Phase A/B runs until you sign off on (1) the SEC-04 visual plan and (2) the voice casting.
