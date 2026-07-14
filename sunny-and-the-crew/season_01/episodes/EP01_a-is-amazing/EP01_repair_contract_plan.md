# EP01 — Accessibility & Continuity Repair Contract (shot-by-shot plan)
TD + accessibility-supervisor pass. Every item carries a **feasibility verdict** because some directives cannot be met honestly by the current generative-video pipeline (seedance/nano_banana) and must not be faked. 2026-07-14.

**Verdict key:** ✅ DO (fully controllable in post/assembly) · ⚠️ BEST-EFFORT (re-render; AI approximates, not frame-exact) · ⛔ CANNOT-HONESTLY (tool cannot meet the standard; faking it would violate the contract — real path given).

## THREE HARD TRUTHS (must resolve before I execute)
1. **ASL — I will not fake it.** seedance/nano_banana cannot produce correct ASL handshapes/movement. Anything it makes would be *decorative, wrong ASL* — exactly what your contract forbids, and actively misleading for Deaf children. **Real ASL requires a fluent signer capture (rotoscope/mocap) or a licensed ASL-avatar system + Deaf consultant review.** Items B3 and C9's ASL are ⛔ in this pipeline. Interim real access = accurate open captions + clear mouths + on-screen name text + letter overlays (all doable).
2. **Frame-accurate lip-sync is approximate here.** Audio-driven seedance aligns onset roughly (my sync-gate enforces the onset band), but I cannot guarantee "matches within a few frames / stops exactly with audio / zero ghost motion." What I *can* do deterministically is **trim every talking clip to VO length + a held tail**, which removes the "ghost talking / double mouth after the sound" — that kills the worst symptom. True phoneme-exact lip-sync needs a dedicated lip-sync model/human pass.
3. **Name contradictions — I won't guess (names are a hard contract):**
   - **Koda vs "Coda" / K vs C.** Canon = **Koda** (letter **K**, pronounced "KOH-duh"). Your directive says "Coda = CO-DA" (letter **C**). This changes the on-screen letter overlay AND name text. **Which is canonical?**
   - **Mimi size.** Canon lock = "Mimi ALWAYS smallest." Your directive: Sunny is 5, **Mimi is 6** (older) and close in size to Sunny. These conflict. **Which wins for EP01?**
   - Pronunciations I'll apply as directed (SUN-NY, LE-O, PIP-PA, BRAM, ME-AH, ME-MI) — these only need VO regen, no conflict.

---

## SECTION A — Intro logo & character feature (SEC-01 is the LOCKED theme master)
| # | Fix | Tool instruction | Verdict |
|---|---|---|---|
| A1 | Logo dead-center at 0:00, hold, fade, reveal street pan | ffmpeg overlay the **logo PNG** at t=0 centered, hold ~1.5s, fade out; composite over the existing theme opening; music & duration untouched | ✅ **needs the logo file** — do you have `sunny-crew-logo.png`? |
| A2 | "Nana Blossom and Captain Blue" lyric currently shows Sunny+sparkles | Locate the lyric timecode in the theme; render an on-model **Nana Blossom + Captain Blue** shot; composite it over that beat only, keep music/lip timing | ⚠️ **needs locked on-model elements for Nana Blossom + Captain Blue** (confirm they exist / are safe to depict — Randy/Anne are NEEDS_DESIGN and barred; is Captain Blue an approved dog element, and does it violate the Bella/Gabriel same-shot rule?) |

## SECTION B — Name Day lines & ASL
| # | Fix | Instruction | Verdict |
|---|---|---|---|
| B3 | Sunny "Today is Name Day" lip-sync | re-render CU-Sunny with the existing VO as audio_ref; trim to VO+tail | ⚠️ lip-sync best-effort |
| B3 | + ASL "name"/"day" | — | ⛔ **cannot fake ASL** (real path above) |
| B4 | Koda "My name is amazing — Koda" lip-sync + no ghost motion | re-render + **trim to VO length** to kill trailing mouth | ⚠️ (and Koda/Coda letter question) |
| B5 | Mimi affirming line + lip-sync + remove double motion | **regen VO** (line below) at same slot; re-render; trim ghost | ✅ VO · ⚠️ lip-sync · ✅ trim |

## SECTION C — On-screen names & letter writing
| # | Fix | Instruction | Verdict |
|---|---|---|---|
| C6 | "Mimi" text on screen at her M beat | add text overlay "Mimi" (kid font) timed to her name | ✅ |
| C7 | Bram says full "My name is Bram. B-R-A-M, Bram." | **regen VO** (line below); re-render lip-sync | ✅ VO · ⚠️ lip-sync |
| C7 | finger-writes complete "BRAM" | overlay animated **"BRAM"** text stroke-on; AI finger-trace is best-effort only | ✅ overlay · ⚠️ finger motion |
| C8 | "Mia" text on screen | text overlay "Mia" timed to her name | ✅ |
| C9 | Leo lip-sync + "Leo" text | re-render + overlay "Leo" | ⚠️ lip-sync · ✅ text |
| C9 | Leo signs his name (ASL) | — | ⛔ **cannot fake ASL** |

## SECTION D — Feelings scene & ghost mouth
| # | Fix | Instruction | Verdict |
|---|---|---|---|
| D10 | Sunny "How do you feel right now?" second silent mouth | **trim the clip to VO length + freeze-hold** so mouth moves once | ✅ |
| D11 | Pipa "I feel small" mouth lags audio | reduce that clip's re-time offset / re-render so mouth-onset ≈ audio-onset | ⚠️ |
| D12 | All remaining talking shots: sync + no ghost | systematic **trim-to-VO + sync-gate** pass across SEC-02/03/05 | ✅ trim · ⚠️ exact sync |

## SECTION E — "A Is Amazing" song & props
| # | Fix | Instruction | Verdict |
|---|---|---|---|
| E13 | Kids not lip-syncing the song | re-render primary song shots with the **song audio as audio_references** | ⚠️ **large pass, approximate** (group vocal ≠ per-kid phonemes) |
| E14 | Apple oversized + vanishing | re-render Mimi apple shot: hand-proportionate apple, apple stays in hand | ⚠️ AI prop continuity limited |
| E15 | Leo holds apple during "airplane" lyric | re-render Leo airplane-verse shot with a **toy airplane** prop | ⚠️ |

## SECTION F — Name-clap game, scale, waving
| # | Fix | Instruction | Verdict |
|---|---|---|---|
| F16 | Name pronunciations + claps per syllable | **regen VO** with syllable pronunciations; re-render clap timing (1 clap/syllable) | ✅ VO · ⚠️ clap-timing |
| F17 | Waving in nearly every scene | re-render flagged shots replacing wave with fitting gesture; keep wave only hello/goodbye | ⚠️ (I'll target the shots I can identify) |
| F18 | Sunny adult-sized vs Mimi toddler | re-frame/re-render the Sunny+Mimi shot to two close-age kids | ⚠️ **+ Mimi-size contradiction (above)** |
| F19 | Random hands-on-heart in song | retime to a feelings lyric or replace with playful pose | ⚠️ |
| F20 | "Bye bye bye" not synchronized | re-render outro so all visible kids wave once on the beat | ⚠️ |
| F21 | Sunny "drawing on her face" during A | re-render: replace with point-to-A / trace-A / hold A-object | ⚠️ |

## SECTION G — Final QA (checklist below)

---

## VO TO REGENERATE (ElevenLabs, same voices, match each original slot ±1–2 frames)
| Clip | New line | Note |
|---|---|---|
| Mimi (N02 area) | "My name is Mimi, and my name is amazing!" | affirming; TTS "ME-mee" |
| Bram (N03/N13) | "My name is Bram. B-R-A-M, Bram." | spells it; letters read individually |
| Koda name-clap | "KO-DA!" (or "CO-DA!" pending K/C decision) | **blocked on Koda/Coda** |
| Sunny name-clap | "SUN-NY!" | 2 syllables, not "sunny weather" |
| Leo name-clap | "LE-O!" | |
| Pipa name-clap | "PIP-PA!" | (canon spelling Pipa) |
| Mia name-clap | "ME-AH!" | |
| Mimi name-clap | "ME-MI!" | |

## REVIEW CHECKLIST (use against the repaired cut)
**Lip-sync:** □ no clip visibly out of sync □ no mouth motion after audio stops □ no silent line repeats
**Names:** □ each name line has on-screen text ≥1× □ pronunciations match the syllable table □ Koda/Coda letter correct
**ASL:** □ (only if produced by a real ASL pass) signs correct + hands fully visible — *else marked "ASL pending specialist"*
**Props/continuity:** □ apple proportionate, never teleports □ Leo holds airplane on "airplane" □ logo centered/fades at 0:00 □ Nana Blossom + Captain Blue on their lyric
**Motion/scale:** □ waving only hello/goodbye □ synchronized wave on "bye bye bye" □ Sunny/Mimi consistent child proportions □ no face-drawing during A □ hands-on-heart only on a feelings beat

## What I will execute the moment the 3 blockers are answered
Immediately doable with **no new decisions** (I can start now if you say go): the **name text overlays** (Mimi/Mia/Leo/Pipa/Bram/Sunny — Koda pending K/C), the **VO regen** (Mimi affirming, Bram spell, name-clap pronunciations), and the **trim-to-VO ghost-mouth pass** (D10/D12). The re-render items (lip-sync, props, scale, waving, song, A-action) then run as a best-effort batch. ASL stays out until we resource a real signer/avatar — I will not ship fake ASL.
