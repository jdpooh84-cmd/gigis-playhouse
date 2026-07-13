# PRODUCTION OS DESIGN — SUNNY AND THE CREW (2026-07-11)
Ground truth: production-os/23_production_state_audit_2026-07-11.md

## SECTION A — ROLE STACK

### 1. EPISODE ARCHITECT (Showrunner)
- Mission: Own episode structure, curriculum, and story so production never pauses for a creative decision.
- Responsibilities: Convert the season lesson map into a locked episode structure; write beat sheet + dialogue to preschool rules (max 8 words/line, object-first teaching, real 3s pauses, warm mistake beat, take-home mission); enforce the 10-15 min band; place Ava in learning beats and Anne in song moments; rotate Rena/Rico into group scenes.
- Skills (for the agent): preschool pedagogy patterns; timing math from ffprobed audio (never planned durations); manifest/JSON authoring; the show's hard-rule set from characters.json and production_rules.json.
- Inputs: lesson map, bibles, real song durations, Creator Decision Log.
- Outputs: episode bible, beat sheet, locked dialogue, clip manifest, VO script.
- Handoff: Prompt Architect + Voice Director, once the validator passes with zero errors.
- Success: no story questions arise after generation starts.

### 2. PROMPT ARCHITECT
- Mission: Turn the manifest into prompts that cannot produce a canon, safety, or legal defect.
- Responsibilities: one guardrailed prompt per clip with locked element IDs inline; auto-inject hard rules (Mia two pigtails, Mimi smallest, Nana tallest, Bella never with Gabriel, Mayor Mary auburn, Rena's smudge, anatomy line, brand-safety line, no cars / age-words / "Pixar"); retire prompts for cut segments before credits are spent.
- Skills: generator-script maintenance (build_ep##_assets.py); Higgsfield element syntax (<<<UUID>>>); knowledge of the safety-filter trigger list.
- Inputs: manifest, characters.json, prompt library. Outputs: numbered prompt pack.
- Handoff: Shot Operator, after validator prompt-block checks pass.
- Success: zero frames rejected for prompt-traceable causes.

### 3. SHOT OPERATOR (Higgsfield)
- Mission: Convert prompts to footage with zero wasted spend.
- Responsibilities: image-to-video in timeline order, max 8 concurrent; log every job ID to the tracker immediately; queue on 429s; rephrase safety false-positives per protocol; never generate a character without a locked element.
- Skills: nano_banana_2 + seedance_2_0 parameters (start_image, declined_preset_id); retry protocols; tracker discipline.
- Inputs: prompt pack, batch plan. Outputs: job IDs per clip, updated tracker.
- Handoff: Continuity Guardian per completed batch.
- Success: tracker complete; spend = clip count.

### 4. CONTINUITY GUARDIAN (QA)
- Mission: Catch defects at the image stage, never in a delivered master.
- Responsibilities: inspect every image (anatomy, brand marks, canon) BEFORE its video is submitted; frame-pass each batch; run the CI validator on every push; purge rejects from staging immediately; add a validator check per new defect class.
- Skills: frame extraction/zoom inspection; the defect-prevention checklist; validator code maintenance.
- Inputs: frames, hard rules. Outputs: pass/fail per clip, regen requests, validator updates.
- Handoff: clean clips to Lip Sync Director / Assembly Engineer.
- Success: no two-headed-Bella-class defect ever ships.

### 5. VOICE DIRECTOR & AUDIO WRANGLER
- Mission: Deliver every audio element at its true duration before anything is cut.
- Responsibilities: manage VO recording/generation (62+ lines, exact text, 3.0s pauses as real silence); commission Suno beds to spec; ffprobe every render and log real durations; keep song masters immutable.
- Skills: Suno prompting; VO direction notes; ffprobe; the audio-is-timing-master rule.
- Inputs: VO script, bed specs, casting decision. Outputs: VO stems, beds, duration ledger.
- Handoff: Lip Sync Director + Assembly Engineer.
- Success: zero timing drift between audio and cut maps.

### 6. LIP SYNC DIRECTOR
- Mission: Believable mouths only where children actually look.
- Responsibilities: scope passes to direct-address close-ups + ~6 song hero shots; run a one-clip pilot before batching; apply only after VO lock; reject uncanny output.
- Skills: Higgsfield dubbing tool; shot-framing judgment.
- Inputs: locked VO, clean clips, framing list. Outputs: lip-synced replacements + scoping ledger.
- Handoff: Assembly Engineer. Success: no uncanny mouths, no budget on wides.

### 7. ASSEMBLY ENGINEER (CI)
- Mission: Clips + audio to numbered section masters to one seamless episode.
- Responsibilities: maintain cut maps; run push-marker CI workflows; ALWAYS emit numbered section masters even when the full concat can't run; verify seams, band-compliant runtime; ffprobe before every cut.
- Skills: ffmpeg trim/concat/mux; GitHub Actions; the repo's proven workflow patterns.
- Inputs: clean clips, audio stems, locked masters. Outputs: EP##-SEC-## masters + full episode master.
- Handoff: Delivery Steward after validator + frame QA pass.
- Success: sections independently usable in Adobe/Canva; episode 10-15 min, drift-free.

### 8. DELIVERY STEWARD (Metadata)
- Mission: Exactly one correctly named FINAL per deliverable, findable forever.
- Responsibilities: one-shot Make delivery (activate, run, deactivate); dedupe double-fires; enforce naming; trash superseded files same-day; record Drive IDs in production_rules; YouTube metadata with Made-for-Kids.
- Skills: Make blueprint mechanics (lowercase "get", {{1.data}}, conn 7476809); Drive API trash calls.
- Inputs: masters, naming rules. Outputs: Drive FINALS/SECTIONS uploads, ID registry.
- Success: no mislabeled or duplicate deliverables.

### 9. CANON KEEPER (Assets)
- Mission: One source of truth for every character, current everywhere, always.
- Responsibilities: sync characters.json with the Drive CHARACTERS folder (consult it before flagging anything missing); propagate recalls/renames same-day; maintain deprecated-ID lists; stage creator reference images.
- Skills: element registry management; repo-wide rename discipline; validator stale-reference rules.
- Inputs: creator images/decisions. Outputs: updated canon, deprecation records.
- Success: any agent generates any character correctly from characters.json alone.

### 10. TROUBLESHOOTING AGENT
Full spec in SECTION D; owns all failure handling explicitly instead of it living silently inside other roles.

## SECTION B — EPISODE PRODUCTION WORKFLOW

Phase 0 — DECISION LOCK (Episode Architect + Creator) — In: lesson topic, open decisions. Out: locked structure, catchphrase, casting choices in the Decision Log. Rule: generation may not start with open creative forks. Moves us: prevents wasted clips.

Phase 1 — EPISODE DESIGN (Episode Architect) — In: lesson map, bibles, real song duration. Out: episode bible, beat sheet, locked dialogue, clip manifest, VO script. Rules: age 2-5 language; object-first; at least 3 real pauses; warm mistake; take-home mission; runtime lands inside 10-15; Ava appears in a learning beat. Moves us: the full episode now exists on paper with exact timecodes.

Phase 2 — PROMPT BUILD (Prompt Architect; validator gate) — In: manifest + canon. Out: numbered prompt pack. Rules: every hard rule auto-injected; no "Pixar" / age-words / cars / brands; anatomy line; element IDs mandatory; NEEDS_DESIGN characters blocked. Moves us: every remaining second of screen time has a generation-ready spec.

Phase 3 — AUDIO FIRST (Voice Director; Creator approves voices) — In: VO script, bed specs, Suno. Out: VO stems, 2 beds, ffprobed duration ledger. Rules: exact locked text; 3.0s pauses recorded as silence; real durations logged before any cutting. Moves us: unblocks final assembly — audio is the timing master.

Phase 4 — GENERATION (Shot Operator; runs parallel to Phase 3) — In: prompt pack. Out: stills then clips for ~102 clips in 8 timeline-ordered batches, tracker updated per job. Rules: image inspected before video submitted; max 8 concurrent; every job logged. Moves us: the missing 8-12 minutes of footage comes into existence.

Phase 5 — QA GATES (Continuity Guardian, per batch) — In: frames. Out: pass/fail, regens. Rules: anatomy (one head, Mia two pigtails), brand-free, canon-true, max 4 characters, no cars; failed clips regenerate before the next batch starts. Moves us: nothing defective flows downstream.

Phase 6 — LIP SYNC (Lip Sync Director) — In: locked VO + clean clips. Out: lip-synced close-ups. Rules: pilot one clip first; scoped shots only. Moves us: dialogue reads believably where kids look.

Phase 7 — SECTION ASSEMBLY (Assembly Engineer, CI) — In: everything above + the two locked masters. Out: EP##-SEC-01..05 masters in repo + Drive. Rules: simple cuts; no black frames; each section ffprobe-verified against its target. Moves us: the episode now exists as five orderable videos — the human-fallback guarantee.

Phase 8 — FULL MASTER + DELIVERY (Assembly Engineer, then Delivery Steward) — In: section masters. Out: EP##-[Slug]-FINAL.mp4 (10-15 min) in repo + Drive FINALS, deduped, registered; superseded files trashed. Rules: validator green; final frame QA; Made-for-Kids metadata. Moves us: done.

Phase F — FALLBACK (standing, any time after Phase 7): if CI can't complete, the user assembles SEC-01..05 in Adobe/Canva per SECTION C — never blocked.

## SECTION C — SECTIONED VIDEO OUTPUT PLAN

Structure (EP01 v2; pattern for all episodes):
| # | Section | Content | Target length |
|---|---|---|---|
| SEC-01 | Intro | THEME-INTRO-MASTER v1.1 (locked) | 0:44.78 |
| SEC-02 | Story part 1 | discovery cold open, letter reveal, first call-and-response | ~2:00-2:45 |
| SEC-03 | Story part 2 | practice echo, movement game, A-word hunt, song lead-in | ~2:45-3:40 |
| SEC-04 | Song | EP01-song-section-SYNCED (locked) | 1:44.83 |
| SEC-05 | Reflection + outro | recap, catchphrase, mission, sign-off, theme-audio replay credits | ~2:00 |

Total lands 10:00-15:00; SEC-02/03/05 are the stretch levers.

Naming: EP01-SEC-01-intro-v1.mp4, EP01-SEC-02-story1-v1.mp4, EP01-SEC-03-story2-v1.mp4, EP01-SEC-04-song-v1.mp4, EP01-SEC-05-reflection-v1.mp4. Version bumps only for compliance/canon rebuilds; superseded versions are trashed, never left beside finals.

Locations: Repo: sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing/sections/. Drive: Sunny and the Crew - Production > EPISODE SECTIONS > EP01 (finals go to FINALS — READY TO UPLOAD).

Human assembly (Premiere or Canva): import the five files, place on one track in filename number order, butt each against the previous (no gaps, no transitions — cuts and audio are baked in), confirm total 10-15 min, export H.264 1080p/30, AAC. That is the whole procedure.

## SECTION D — TROUBLESHOOTING AGENT SPEC

Mission: Own every failure explicitly: detect, report plainly, offer at least 2 paths forward, and harden the system so recurrence is less likely.

Signals watched: CI validator failures and red workflow runs · missing/zero-byte assets · ffprobe duration mismatch vs cut map (>0.05s) · naming violations and duplicate "FINAL"s in Drive · Make double-fire duplicates · generation stalls (429 loops, nsfw rejects, "Media input not found") · deprecated or NEEDS_DESIGN characters appearing in prompts · anatomy/brand hits at QA · tracker gaps (submitted job with no logged ID) · stale canon (doc contradicting characters.json).

Response protocol (mandatory order): 1) Reproduce and localize (which file/clip/phase). 2) Trace one stage upstream before patching. 3) Report: what failed, where, why, what's blocked downstream — no silent failure. 4) Offer the ideal fix AND a degraded-but-moving workaround (e.g., "CI concat failed — sections are ready; assemble in Premiere per SECTION C"). 5) Harden: new validator check, rule, or checklist line in the same commit (one failure = one system change). 6) Verify the fix, then log it.

Doc interactions: logs every incident + resolution in the Episode Tracker (Blockers column) · records any creator ruling it forced in the Decision Log · corrects real durations in the Voice & Audio Ledger · updates the Assembly & Fallback Guide if section structure changed. Precedents: the Koda trademark recall, Bella species fix, and song-duration drift are its case law — codified in production-os/20_defect_prevention_checklist.md, which this agent owns.

## SECTION E — GOOGLE DOCS/SHEETS INTEGRATION

| Document | Owner (updates) | Phases | Example EP01 entry |
|---|---|---|---|
| Episode Tracker (Sheet) | Assembly Engineer + Troubleshooting Agent | all (phase gates) | EP01 · Letter A · GENERATING · Script Y Prompts Y · Clips 27/129 · VO 0/72 · Beds N · SEC-01,04 built · Blockers: beds, VO casting |
| EP01 Clip Ledger (Sheet) | Shot Operator + Continuity Guardian | 4-5 | EP01-P2-C05 · cold open · Sunny,Mia,Nana · img 8d4a Y · vid c46c Y · QA PASS · regen 0 · SEC-02 Y |
| Creator Decision Log (Doc) | Episode Architect (writes), Creator (rules) | 0 | 2026-07-11 · Gabriel rename (was Commander) · all canon+prompts updated · LOCKED / 2026-07-11 · Catchphrase "Let's ask! Let's find out! Come on, Crew!" · PROPOSED |
| Assembly & Fallback Guide (Doc) | Assembly Engineer | 7-8, F | section table + the Premiere/Canva steps from SECTION C |
| Voice & Audio Ledger (Doc) | Voice Director | 3 | a-practice-bed.mp3 · spec 72s · real: — · status: NOT GENERATED |

## SECTION F — HOW TO USE THIS WITH EPISODE 1

You only ever do four kinds of things:
1. Approve (5 minutes, unblocks everything): pick v1 vs v2 structure; lock the catchphrase; choose voices (AI pilot or your recordings); OK trashing the mislabeled old Drive "FINAL."
2. Provide audio: generate the two Suno beds from the ready-made specs (2 clicks each) and drop them in Drive MUSIC; record VO or approve the AI-voice pilot.
3. Wait: the pipeline runs Phases 2-8 and reports at each gate; the Troubleshooting Agent handles failures without you.
4. Fallback only if asked: if CI ever can't finish, open Drive > EPISODE SECTIONS > EP01, drag SEC-01 through SEC-05 into Premiere or Canva in number order, export. Ten minutes of work, guaranteed available.

Everything else — prompts, generation, QA, lip sync, assembly, delivery, logging — is the system's job, not yours.

## SECTION G — ROLE GUARDRAIL ADDENDUM (motion + internal VO, locked 2026-07-13)
Creator directive: EP01 read as slow-motion; movement must be clear, real-time, imitable; VO must be internal (no manual ElevenLabs). New rules in 25/26/27/28. Role deltas:

- **Prompt Architect (#2):** now owns the VIDEO-MOTION SKELETON (14) — motion sentence is generated from `motion_tier`, never free-authored; injects `speedramp:"off"` intent; bans "gentle/slow" body-motion verbs on tier A/B; blocks any SLOMO wording lacking `slomo_justification`; injects the say-what-you-see check (dialogue verb == clip action).
- **Shot Operator (#3):** passes `speedramp:"off"` on every `generate_video` call; sets duration by tier (A 3–4s / B 4s / C ≤5s); escalates dance/movement hero shots to `kling3_0`; records the current motion-strength knob from `models_explore` each batch and sets it high.
- **Continuity Guardian (#4):** adds the **motion gate** (tier set, speedramp off, no banned slow words, ≤1 SLOMO/ep, imitable moves full-body framed) and the **say-what-you-see gate** to per-clip QA and to the validator; one new validator check per new motion/audio defect class.
- **Assembly Engineer (#7):** regenerates each clip's slot `dur` from ffprobed VO/beat length before building (audio is timing master — removes padded-clip slow-mo); adds a **beat/motion spot-check** (3 clips/section: action < 1.0× or completing after the cut → regen tier A).
- **Voice Director & Audio Wrangler (#5):** VO is now generated internally via `generate_audio` model `seed_audio` from locked per-character voice elements (`create_voice`), tuned with `speech_rate`; ffprobe every line; own the audio-timeline that sets clip slot lengths. Creator approval collapses to a one-time 9-voice pilot.
- **Episode Architect (#1):** emits `dialogue_map.json` (11-beat arc, say-what-you-see, per-line motion_tier/action_verb/pause) as the single source for manifest dialogue, VO, and the validator.
