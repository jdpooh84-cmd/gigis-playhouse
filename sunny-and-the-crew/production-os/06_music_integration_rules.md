# Music Integration Rules
1. Song locked in Suno BEFORE any visual work. Stage MP3 in repo _staging/audio/; ffprobe ACTUAL duration; run RMS/silence analysis; write per-episode song_sections.json with confidence labels. NEVER trust planned durations (EP01: planned 140s, actual 104.83s — this rule exists because of that).
2. music_library.json holds locked lyrics + actual duration + BPM. Update actuals after analysis.
3. Structure standard: intro / V1 / C1 / V2 / C2 / bridge / final chorus / outro. Chorus lyrics identical each repeat (anchor + refrain).
4. Lesson terms limit: 2 per song. Chorus contains the lesson anchor phrase.
5. Movement cue mapped per chorus; "Sing it with me" call built into chorus lyric.
6. Cuts land on section boundaries and downbeats; zoomed pushes complete ON the anchor word; A-A-A style chants get one physical pop per repetition.
7. Instrumental beds for practice/hunt segments: Suno instrumentals, 72-100s, 90-100 BPM, no vocals; duck -12dB under VO; specs template in prompt library.
8. Ukulele sting = final two outro melody lines; hit lands on logo bounce.
9. Audio track layout in CI: A1 music (timing master, never nudged), A2 beds, A3 VO, A4 SFX. 3-second pauses are SILENT on all tracks.
