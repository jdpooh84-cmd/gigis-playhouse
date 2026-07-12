# PRODUCTION OS DESIGN — Roles, Workflow, Sections, Troubleshooting (2026-07-11)
Source of truth: production-os/23_production_state_audit_2026-07-11.md. Delivered to creator in chat same day.

## A — ROLE STACK
1. EPISODE ARCHITECT (Showrunner) — owns structure/curriculum/story. Skills: preschool pedagogy patterns, timing math from ffprobed audio, manifest authoring, hard-rule set. In: lesson map, bibles, real durations, Decision Log. Out: episode bible, beat sheet, locked dialogue, manifest, VO script. Handoff: Prompt Architect + Voice Director on validator-zero. Success: no story questions after generation starts.
2. PROMPT ARCHITECT — manifest -> defect-proof prompts. Skills: generator scripts, <<<UUID>>> element syntax, safety-filter trigger list. Out: numbered prompt pack. Success: zero prompt-traceable rejects.
3. SHOT OPERATOR — prompts -> footage, zero waste. Skills: nano_banana_2/seedance params, retry protocols, tracker discipline. Out: job IDs per clip, tracker. Success: spend = clip count.
4. CONTINUITY GUARDIAN (QA) — image gate before video, batch frame pass, validator on every push, purge rejects, one-failure-one-check. Success: no defect ships.
5. VOICE DIRECTOR & AUDIO WRANGLER — VO stems (exact text, real 3.0s pauses), Suno beds, ffprobed duration ledger. Success: zero timing drift.
6. LIP SYNC DIRECTOR — scoped passes only (direct-address + ~6 song hero close-ups), pilot first, after VO lock. Success: no uncanny mouths, no budget on wides.
7. ASSEMBLY ENGINEER (CI) — cut maps, push-marker workflows, ALWAYS emits numbered section masters, seam/runtime verification. Success: sections independently usable; 10-15 min drift-free episode.
8. DELIVERY STEWARD — one-shot Make delivery + dedupe, naming enforcement, same-day trash of superseded, Drive ID registry, Made-for-Kids metadata. Success: exactly one FINAL per deliverable.
9. CANON KEEPER — characters.json <-> Drive CHARACTERS folder sync, recalls/renames propagate same-day, deprecated-ID lists. Success: any agent generates any character from characters.json alone.
10. TROUBLESHOOTING AGENT — see section D.

## B — WORKFLOW (episode idea -> delivered master)
P0 DECISION LOCK (Architect+Creator): no generation with open creative forks.
P1 EPISODE DESIGN (Architect): bible/beat sheet/dialogue/manifest/VO script; age-2-5 rules, object-first, >=3 real pauses, warm mistake, mission, Ava in a learning beat, runtime in 10-15 band.
P2 PROMPT BUILD (Prompt Architect): guardrailed pack; validator gate.
P3 AUDIO FIRST (Voice Director; creator approves voices): VO + beds + ffprobed ledger. Audio is the timing master.
P4 GENERATION (Shot Operator; parallel to P3): stills->clips, 8 timeline batches, <=8 concurrent, tracker per job.
P5 QA GATES (Guardian, per batch): anatomy/brand/canon/max-4/no-cars; fails regenerate before next batch.
P6 LIP SYNC (Director): pilot then scoped passes.
P7 SECTION ASSEMBLY (Engineer, CI): EP##-SEC-01..05 masters to repo+Drive — the human-fallback guarantee.
P8 FULL MASTER + DELIVERY (Engineer -> Steward): concat, validator+frame QA, Drive FINALS deduped, superseded trashed.
PF FALLBACK (standing): Adobe/Canva assembly per section C.

## C — SECTIONED OUTPUT PLAN
SEC-01 intro = THEME-INTRO-MASTER v1.1 (0:44.78, locked) | SEC-02 story part 1 (discovery->reveal->call-response, ~2:00-2:45) | SEC-03 story part 2 (practice->movement->hunt->lead-in, ~2:45-3:40) | SEC-04 song = synced master (1:44.83, locked) | SEC-05 reflection+outro (~2:00). Stretch levers: 02/03/05.
Naming: EP01-SEC-01-intro-v1.mp4 (…02-story1, 03-story2, 04-song, 05-reflection). Version bump only for compliance/canon rebuilds; superseded versions trashed.
Repo: season_01/episodes/EP##_slug/sections/. Drive: Production -> EPISODE SECTIONS -> EP## (finals to FINALS — READY TO UPLOAD).
Human assembly: import 5 files -> one track in number order -> butt-joined, no transitions -> confirm 10-15 min -> export H.264 1080p/30 AAC.

## D — TROUBLESHOOTING AGENT
Watches: validator/CI failures · missing/zero-byte assets · duration mismatch >0.05s vs cut map · naming violations · duplicate FINALs · Make double-fires · generation stalls (429/nsfw/media-not-found) · deprecated or NEEDS_DESIGN characters in prompts · QA anatomy/brand hits · tracker gaps · stale canon.
Protocol: reproduce & localize -> trace one stage upstream -> report (what/where/why/what's blocked; no silent failure) -> ideal fix + degraded-but-moving workaround (e.g., CI down => Premiere fallback) -> harden (validator check/rule/checklist in same commit) -> verify -> log.
Docs: incidents to Episode Tracker Blockers col; forced rulings to Decision Log; real durations to Voice & Audio Ledger; structure changes to Assembly & Fallback Guide. Owns 20_defect_prevention_checklist.md.

## E — DOCS/SHEETS OWNERSHIP
Episode Tracker (Sheet) — Assembly Engineer + Troubleshooter — all phase gates. Ex: "EP01 · Letter A · GENERATING · Clips 27/129 · VO 0/72 · Beds x · SEC-01,04 built · Blockers: beds, VO casting".
EP01 Clip Ledger (Sheet) — Shot Operator + Guardian — P4-P5. Ex: "EP01-P2-C05 · img 8d4a ✓ · vid c46c ✓ · QA PASS · SEC-02 ✓".
Creator Decision Log (Doc) — Architect writes, creator rules — P0. Ex: "2026-07-11 · Gabriel rename · LOCKED".
Assembly & Fallback Guide (Doc) — Assembly Engineer — P7-P8/PF.
Voice & Audio Ledger (Doc) — Voice Director — P3. Ex: "a-practice-bed.mp3 · spec 72s · real: — · NOT GENERATED".

## F — CREATOR USAGE
Creator does only: (1) approvals — structure v1/v2, catchphrase, voices, trash old mislabeled FINAL; (2) audio — 2 Suno beds + VO record-or-approve; (3) wait — pipeline runs P2-P8 with gate reports; (4) fallback only if asked — Drive EPISODE SECTIONS -> drag SEC-01..05 into Premiere/Canva in order, export.
