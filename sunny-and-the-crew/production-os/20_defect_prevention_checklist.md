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
