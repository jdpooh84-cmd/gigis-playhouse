# PRODUCTION STATE AUDIT — 2026-07-11 (evening)
Auditor: Pipeline TD session | Every item below verified on disk / Drive / Higgsfield unless marked UNKNOWN.

## A — EXECUTIVE SUMMARY
Two finished, verified video masters exist (theme intro 44.80s; EP01 song section 104.83s). No full episode video exists. All planning/writing artifacts for EP01 are COMPLETE and validator-clean. The remaining gap to a full 10+ min episode is pure production: ~102 story/reflection/outro clips (prompts ready), 2 Suno beds, ~72 VO lines, then the already-proven CI assembly. One structural decision is pending (v1 extended cut vs v2 rebuild spec). One Drive file is mislabeled FINAL and superseded.

## B — VERIFIED ASSETS INVENTORY (repo: jdpooh84-cmd/gigis-playhouse, branch claude/sunny-crew-ep1-assembly-8hg5om)
VIDEO: sunny-and-the-crew/theme-song/THEME-INTRO-MASTER.mp4 (44.80s, 23MB, v1.1 brand/species-verified) · season_01/episodes/EP01_a-is-amazing/EP01-song-section-SYNCED.mp4 (104.83s, 49MB)
AUDIO (_staging/audio/): a-is-amazing.mp3 (104.83s, real render) · sunny-and-the-crew-THEME.mp3 (44.784s) · a-is-amazing-140s.mp3 (SUPERSEDED planning render — do not use)
DOCS/DATA: production_rules.json · characters.json (16 entries; 14 locked elements + Randy/Anne NEEDS_DESIGN) · locations.json · show_bible.json · visual_world_bible.md · production-os/ (23 docs: bibles, rules, templates, checklists, lesson map, this audit) · EP01: episode bible, cue sheet (40 seg), clip manifest (156 clips), prompt pack (109 prompts), assembly plan, song_sections.json, lyrics, ep01_data.json, generation tracker (28/28 song videos), production_package/ (beat sheet, script, vo_script 62 lines, batch plan, ep01_rebuild_v2_spec)
AUTOMATION: .github/workflows/ pipeline-validate.yml (CI gate, green) · theme-assemble.yml · ep01-sync-song.yml · fetch-char-images.yml · scripts/ pipeline_validate.py, build_ep01_assets.py, theme_assemble_intro.py, ep01_sync_song.py
CHARACTER REFS: _staging/characters_new/ (Koda v3 ×2, Bella ×2, Gabriel ×3, Mimi/Pipa/Bram ×2 each) · Drive CHARACTERS folder (per-character folders + reference docs; root 1mTdk4Uuo26OlhlV56nfMDKv5XPqZMVcc) — creator-locked standing reference source
HIGGSFIELD: 16 locked elements incl. Koda-v3 7ce52e05, Bella-v2 c4ea659f; recalled/deprecated: Koda-v2 a8b3713c (trademark), old Bella 3faaac30, 2ea4d86d/f9cf5374/c0ef05b4/9e376c16 (broken)
DRIVE (folder 10xEh7jYO_z55-t2Gr82ON3C1jPvINgTg): THEME-INTRO-MASTER-v1.1.mp4 (1rfyA44PvBFAdKHckCcS8Nl47xNIWVXjq, FINAL) · EP01-A-Is-Amazing-FINAL.mp4 (1yqQ7Ngz…, 51.6MB, 2026-07-10 — SUPERSEDED, mislabeled)

## C — EP01 COMPLETION MATRIX
COMPLETE: series/world/character bibles · beat sheet · dialogue script (locked) · VO script (62 lines) · song integration (real-render synced) · shot list/manifest (156, no-loop PASS) · visual prompts (109, guardrailed) · song stills+clips (28/28) · theme master · intro integration · outro/sign-off plan (v2 spec) · naming/versioning rules · QA/validator (CI, green) · automation (4 workflows) · Drive/repo organization
PARTIAL: rough assembly (2 of 8 blocks exist as finished masters) · delivery packaging (masters delivered; full episode not) · story stills/clips (0 of ~102 generated — prompts ready)
MISSING: VO recordings (0/62+10) · 2 Suno beds · lip-synced clips (0 — tool unpiloted) · final assembly · human-fallback assembly instructions for Adobe/Canva (added in §H) 
UNKNOWN/NOT VERIFIED: none material.

## D — EXISTING VIDEO OUTPUTS (order of final assembly)
1. THEME-INTRO-MASTER.mp4 — 44.80s — repo + Drive — Episode Part 1 — FINAL, USABLE (v1.1: swoosh-free Koda, dog Bella, frame-audited)
2. EP01-song-section-SYNCED.mp4 — 104.83s — repo — Episode song part — FINAL, USABLE (27 unique clips cut to real render)
3. EP01-A-Is-Amazing-FINAL.mp4 — Drive only — SUPERSEDED DRAFT (predates song resync + Koda recall + dog-Bella + all canon fixes). NOT usable. Mislabeled "FINAL" — recommend trash or rename to …-DRAFT-SUPERSEDED.
NO FULL EPISODE VIDEO EXISTS. Everything else (story, reflection, outro) has prompts, timings, and dialogue but zero rendered footage.

## E — PIPELINE FAILURES / BLOCKERS (honest list)
1. STRUCTURAL FORK (decision blocker): v1 extended cut (10:20.66, current manifest) vs v2 rebuild spec (10:09.78, creator-directed: story→song once→reflection→theme-replay outro). Generation must not start until the creator picks — otherwise up to 24 clips of waste.
2. AUDIO GAP (hard production blocker): no VO, no beds. Visuals can generate now, but nothing assembles to final without audio (audio is the timing master).
3. LIP-SYNC UNPILOTED: tool available, never exercised — one-clip pilot required before batching.
4. Historical failure modes (now systemized, listed for the record): planned-vs-real audio drift (fixed: ffprobe rule) · stale canon docs (fixed: validator) · trademark/species defects in a locked master (fixed: v1.1 + brand/anatomy gates) · Make delivery double-fires (fixed: dedupe step) · mislabeled Drive FINAL (open item above) · rejected candidates lingering in staging (fixed: purge rule).
5. NOT failures: isolated-clip production is by design (clips → sections → episode), with numbered clip IDs (EP01-P#-C##) and per-section masters — the "sections not clips" requirement is already the architecture.

## F — RECOMMENDED ROLE STACK (complete)

### 1. SHOWRUNNER / EPISODE ARCHITECT
- Mission: own each episode's structure, curriculum, and story so production never stops for a creative decision.
- Responsibilities: turn the season lesson map into a locked episode structure; write beat sheet + dialogue to preschool rules (<=8 words/line, object-first teaching, call-and-response with real pauses, warm mistake beat, take-home mission); enforce runtime bands (STANDARD 5-8 / EXTENDED 10-15 min); apply adult-mentor rule (Ava in learning beats, Anne in song moments) and wider-crew rotation (Rena/Rico).
- Inputs: season lesson map, series/character/world bibles, ffprobed real song durations, creator decision log.
- Outputs: episode bible, beat sheet, locked dialogue script, clip manifest, VO script.
- Hands off when: manifest passes the CI validator with zero errors and all creator decisions are locked.
- Success: zero mid-production story questions; downstream roles work from the package alone.

### 2. PROMPT ARCHITECT
- Mission: convert the manifest into generation-ready prompts that cannot produce a canon, safety, or legal defect.
- Responsibilities: one prompt per clip with locked element IDs inline; auto-inject hard rules (Mia two pigtails, Mimi smallest, Nana tallest, Bella never with Gabriel, Mayor Mary auburn, Rena's left-cheek smudge); include anatomy line, brand-safety line, no cars, no age words, no "Pixar"; retire prompts for cut segments before credits are spent.
- Inputs: clip manifest, characters.json, prompt library, location specs.
- Outputs: numbered prompt pack, regenerated whenever canon changes.
- Hands off when: prompt pack passes validator prompt-block checks.
- Success: zero generated frames rejected for causes traceable to the prompt.

### 3. HIGGSFIELD SHOT OPERATOR
- Mission: turn prompts into footage without wasted spend.
- Responsibilities: image->video batches in timeline order, <=8 concurrent; log every job ID to the tracker immediately; queue on 429s; rephrase safety false-positives per known protocol; never generate a character without a locked element.
- Inputs: prompt pack, batch plan, element registry.
- Outputs: completed image+video job IDs per clip; updated tracker (session-death recovery point).
- Hands off when: batch is 100% generated and logged.
- Success: tracker complete, zero orphan/duplicate generations, spend matches clip count.

### 4. QA & CONTINUITY SUPERVISOR
- Mission: catch defects before they cost a regeneration cascade or ship.
- Responsibilities: inspect every image (anatomy, brand marks, canon) BEFORE its video is submitted; frame-pass every batch; run pipeline validator on every push; delete rejects from staging immediately; add a validator check for every new defect class (one failure = one system change).
- Inputs: generated frames, hard rules, defect-prevention checklist.
- Outputs: pass/fail per clip, regeneration requests, validator updates.
- Hands off when: batch is green.
- Success: defects found at image stage, never in a delivered master.

### 5. LIP SYNC SUPERVISOR
- Mission: believable mouths only where children actually look, at minimum cost.
- Responsibilities: scope lip sync to direct-address dialogue close-ups + ~6 song hero close-ups (wides run on beat-synced body performance); one-clip pilot before any batch; apply passes only after VO lock; reject uncanny results.
- Inputs: locked VO audio, generated clips, shot framing list.
- Outputs: lip-synced replacement clips, scoping ledger.
- Hands off when: all scoped clips pass review.
- Success: no uncanny mouths; no budget burned on wide shots.

### 6. EPISODE EDITOR / ASSEMBLY DIRECTOR (CI)
- Mission: turn approved clips + audio into numbered section masters and one seamless episode.
- Responsibilities: ffprobe every real audio file before cutting (audio is the timing master); maintain cut maps; run push-marker CI workflows; ALWAYS produce numbered section masters (EP01-SEC-01..05) so human fallback stays possible; verify no black frames, runtime in band.
- Inputs: approved clips, VO, beds, song masters, cut maps, theme master (prepended untouched).
- Outputs: section masters + full episode master in repo.
- Hands off when: full master passes validator + frame QA.
- Success: 10-15 min episode, zero timing drift; sections independently usable in Adobe/Canva.

### 7. METADATA / DELIVERY MANAGER
- Mission: exactly one correctly named FINAL per deliverable, in the right place.
- Responsibilities: one-shot Make delivery (activate -> run -> deactivate immediately); check for double-fire duplicates and trash extras; enforce EP##-Slug-FINAL naming; trash/rename superseded files same-day; record Drive file IDs in production_rules; YouTube metadata with Made for Kids set.
- Inputs: finished masters, naming conventions, Drive folder map.
- Outputs: Drive FINALS uploads, file-ID registry, upload metadata.
- Hands off when: Drive shows exactly one FINAL and the registry points to it.
- Success: no mislabeled or duplicate deliverables (the current mislabeled EP01 "FINAL" is the failure this prevents).

### 8. ASSET / CANON MANAGER
- Mission: one source of truth for every character, everywhere, always current.
- Responsibilities: keep characters.json synced with the Drive CHARACTERS folder (creator-locked reference source — consult before flagging anything missing); propagate recalls/renames (Koda v3, Gabriel, Bella-v2) across all docs and generators same-day; maintain deprecated-ID lists; stage creator references into the repo.
- Inputs: creator images/decisions, Drive folder, element registry.
- Outputs: updated characters.json, staged references, deprecation records.
- Hands off when: validator finds zero stale references.
- Success: any agent can generate any character correctly from characters.json alone.

(Curriculum Designer folds into role 1; Troubleshooting Agent folds into roles 4+6 via the defect-prevention checklist; no separate Story Editor needed at this cast size.)

## G — RECOMMENDED GOOGLE DOCS / SHEETS (complete)

### 1. SHEET "SATC — Episode Tracker"
- Purpose: one glance = true status of every episode.
- Columns: Episode # | Title/lesson | Status (PLANNING/GENERATING/ASSEMBLING/DELIVERED) | Script locked | Prompts | Clips done/total | VO done/total | Beds | Sections built | Final Drive link | Blockers | Last updated.
- Updated by: the pipeline at every phase gate; creator edits approval columns only.
- Prevents: duplicated work and false "it's finished" assumptions (like the mislabeled Drive FINAL).

### 2. SHEET "SATC — EP01 Clip Ledger"
- Purpose: human-readable mirror of the generation tracker, one row per clip.
- Columns: Clip ID (EP01-P#-C##) | Section | Characters | Prompt status | Image job ID | Video job ID | QA result | Regen count | In section file.
- Updated by: Shot Operator on every submit/complete; QA Supervisor on pass/fail.
- Prevents: paying twice for the same clip; losing job IDs when a session dies.

### 3. DOC "SATC — Creator Decision Log"
- Sections: Date | Decision (one line) | What it changed | Status (LOCKED/PROPOSED). Seed with: age band 2-5/7, Koda v3, Bella=dog, Gabriel rename, Mimi sneakers, adult-mentor rule, anatomy hard-set, catchphrase (PROPOSED).
- Updated by: pipeline the moment the creator rules.
- Prevents: relitigating settled canon; contradictory docs.

### 4. DOC "SATC — Assembly & Fallback Guide"
- Sections: section order table with durations | Drive locations of every master | Adobe Premiere steps (import SEC-01..05, butt-join on one track, no transitions, export H.264 1080p/30 AAC) | Canva steps (same order, one scene per section) | VO/bed muxing timecodes if audio is not baked | escalation contact.
- Updated by: Assembly Director whenever section structure changes.
- Prevents: a pipeline outage becoming a production stall — a human can always finish the episode.

### 5. DOC "SATC — Voice & Audio Ledger"
- Sections: VO line inventory (record status per line) | voice casting per character | bed specs + real ffprobed durations | song masters with durations | 3.0s pause-compliance checklist.
- Updated by: pipeline on every audio arrival; creator on casting.
- Prevents: planned-vs-real audio timing drift — the root cause of the original song-sync failure.

## H — NEXT STEPS TO A COMPLETE 10–15 MIN EPISODE
USER APPROVAL (blocking, minutes of effort): ① pick v1 extended cut vs v2 rebuild structure; ② lock the catchphrase ("Let's ask! Let's find out! Come on, Crew!" proposed); ③ choose VO path (AI voices — I can pilot with Higgsfield create_voice — or human recording); ④ generate the 2 Suno beds from the ready specs and drop in Drive MUSIC; ⑤ (cleanup) approve trashing/renaming the superseded Drive "FINAL".
AUTOMATED (on go): retime manifest to chosen structure → regenerate prompt pack → batch-generate ~102 clips (8 batches, QA gates) → lip-sync pilot then scoped passes → CI section assembly (numbered EP01-SEC-01…06 masters) → full-episode concat → validator + frame QA → Make delivery to Drive FINALS with dedupe → chat preview to creator.
MANUAL FALLBACK (if any automated stage stalls): the pipeline always leaves numbered section masters in repo + Drive as EP01-SEC-01-intro / 02-story / 03-song / 04-reflection / 05-outro (+06-sting in v1). Assembly in Adobe Premiere or Canva = place sections 01→NN back-to-back on one track, no gaps, no transitions (cuts are baked in), export H.264 1080p/30 AAC. VO/bed muxing, if not yet baked, follows vo_script.md timecodes (each line lands on its clip start).

## I — OPEN QUESTIONS / UNVERIFIED
1. Structure fork (H①) — blocks generation.
2. Superseded Drive "FINAL" — awaiting disposition.
3. Lip-sync quality on our style — unknown until pilot.
4. Anne + Randy designs — needed before they can appear (EP01 fine without them).
5. Old branded Koda images persist in git history (public repo) — rewrite offered, creator hasn't ruled.
6. Old Higgsfield elements (Koda-v2, old Bella, old Koda/Koda-1) — awaiting manual deletion by creator in UI.
7. Three-pigtail Mia sighting — not found in sampled frames of both masters; standing anatomy gates will catch any recurrence; exact source clip unidentified.
