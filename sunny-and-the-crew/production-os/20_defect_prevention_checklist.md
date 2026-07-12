# Defect-Prevention Checklist (lessons already paid for)
- ffprobe every Suno render; rebuild section map from ACTUAL audio (EP01 drift bug).
- Verify element source media exists before batch generation (broken-element bug: test one cheap probe per new/old element before a big batch).
- Higgsfield importer rejects GitHub-served mp4 (octet-stream) — deliver via CI/Make, don't burn time on URL import.
- Make scenario runs can double-fire on activate+run: run once, deactivate immediately, then check Drive for duplicates and trash extras.
- Make blueprint gotchas: HTTP method lowercase ("get"), output field is {{1.data}}, google-drive modules need google-restricted/google-drive connection type.
- seedance concurrency ~8; queue remainder; safety-filter false positives: rephrase (avoid "at her feet", "secret", possessive body phrasing) and resubmit.
- No age descriptors / no "Pixar" in any generation prompt (hard filter trigger).
- Chat-pasted images are WebP mislabeled .png — convert before pipeline use.
- All timing math in one generated, validated artifact (cue sheet generator pattern) — never hand-added.
- Stale-canon hazard (found 2026-07-11): docs written before a redesign keep dead element IDs and old design language (episode_generator_prompt.md carried all four pre-v2 IDs). Rule: characters.json `appearance` must always describe the CURRENT locked element; old designs move to `superseded_appearance_v1`; prompt docs that will never re-run get an ARCHIVAL NOTICE banner instead of a rewrite.
- Every push touching sunny-and-the-crew/ runs `scripts/pipeline_validate.py` in CI (pipeline-validate.yml). It enforces: valid/unique locked element IDs, no deprecated ID referenced outside characters.json, manifest timeline continuity + no-loop + 3-5s band, no Pixar/age-words/cars/Bella+Gabriel in prompt blocks, locked-master existence + duration (theme 44.78s, EP01 song 104.83s), EP##_slug naming, no spaces in filenames. New defect class shipped = new check added, same commit.
- TRADEMARK RECALL (2026-07-11): Koda v2 reference images carried a branded swoosh + tongue label on the sneakers, which propagated into 4 of 19 shots of the locked theme master. Rules now standing: (a) zoom-inspect FEET and CHESTS of every new character reference image before locking an element — generation models copy real shoe/apparel branding; (b) every generation prompt states "plain footwear, no logos, no brand marks"; (c) validator blocks brand names in prompt blocks; (d) a locked master gets ONE compliance rebuild when a legal defect is found — version-bump it, never patch pixels.
- ANATOMY DEFECTS (2026-07-11): a Bella render came out two-headed; a Mia render carried three pigtails. Rules: anatomy hard-set lives in characters.json _meta.ANATOMY_HARD_RULES; every prompt carries the anatomy line + Mia "two pigtails"; image-level anatomy inspection before video; batch frame pass before assembly; rejected candidates deleted from _staging immediately after review (a committed reject confused the creator into thinking it shipped).
- BURNED-IN CAPTIONS (2026-07-12, B1): including dialogue as "Timed line: ..." in an image prompt makes nano_banana render it as an on-screen caption. Rules: image prompts NEVER quote dialogue; every prompt ends with "ABSOLUTELY NO on-screen text/captions/speech bubbles"; validator errors on 'Timed line:' in prompt packs. Dialogue lives in the manifest/VO script only.

## DEFECT CLASS: vague character entry renders a film crew (found 2026-07-12, EP01-P2-C21)
- Symptom: character-lock entry `[crew visible behind]` (no element tag) made the model render ghosted ADULT FILM-CREW figures with a camera rig in the background of a direct-address shot.
- Root cause: "crew" without locked elements is ambiguous; the model chose "film crew".
- Fix: generator drops any character name without a locked element ID and appends "ONLY the characters listed above appear — no other people, figures, or silhouettes anywhere." (or "NO characters in this shot" for empty casts). Validator errors on any bracket entry lacking `<<<uuid>>>`.
- Recovery: C20–C23 images regenerated solo/explicit-cast; the 4 videos started from the flawed plates were discarded before assembly.

## DEFECT CLASS: overlay graphics written into image prompts (found 2026-07-12, EP01-P2-C18 / P4-C32/C35/C36)
- Symptom: scene lines like "Letter A badge animates into upper corner" / "chalk word APPLE floats in" would bake letters into plates, violating the no-text rule.
- Fix: all letter/word overlay graphics are POST-PRODUCTION overlays added at assembly, never in generation prompts. Scene lines stripped before submission.
