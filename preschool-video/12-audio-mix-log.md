# 12 — Audio Mix Log

## Song: ZOOMY ZOOM FREEZE!

---

## Audio Components

### Layer 1: ElevenLabs Vocals (via Higgsfield text2speech_v2)
All 6 of 7 sections completed. Outro pending regen.
- Voice: Quinn (female, ElevenLabs)
- Files: See 10-elevenlabs-generation-log.md for full URLs

### Layer 2: Instrumental Music Bed
**STATUS: BLOCKER — See note below.**

Higgsfield `generate_audio` is TTS-only for non-game use. The models `sonilo_music` (music) and `mirelo_text_to_audio` (sound effects) exist only within the game-generation pipeline and cannot be used for standalone audio. No music bed can be auto-generated through the available tools.

**Mitigation Options:**
1. Use a royalty-free 110 BPM children's dance track from a library (e.g., Pixabay, ccMixter, Free Music Archive) and layer the ElevenLabs vocals over it
2. If a DAW or ffmpeg environment is available, the vocal files can be mixed over any provided instrumental track
3. The video scenes from seedance_2_0 generate native ambient audio — that can serve as minimal atmosphere while the vocal layer plays over top

### Layer 3: SFX Cues (described, not generated)
Per music direction doc, the following SFX cues should be added in post:
- Cartoon zip/whoosh on each "Zoomy zoom zoom" line
- Hard musical stop hit on "FREEZE!"
- Comic boing on jump beat
- Ascending arpeggio on final "BYE!"

These are not auto-generable through available tools.

---

## Mix Architecture (Assembly Plan)

```
TIMELINE (approx 2:33 total)

0:00─────────────────────────────────────── 0:15
 [ Instrumental bed: intro, builds ]
 [ V01 Intro vocal ]

0:15─────────────────────────────────────── 0:27
 [ Instrumental bed: hook groove ]
 [ V02 Hook vocal ]

0:27─────────────────────────────────────── 0:51
 [ Instrumental bed: verse, drops brass ]
 [ V03 Verse 1 vocal ]

0:51─────────────────────────────────────── 1:03
 [ Instrumental bed: hook groove ]
 [ V02 Hook vocal (reuse) ]

1:03─────────────────────────────────────── 1:30
 [ Instrumental bed: verse 2, thin then builds ]
 [ V04 Verse 2 vocal ]

1:30─────────────────────────────────────── 1:42
 [ Instrumental bed: hook groove ]
 [ V02 Hook vocal (reuse) ]

1:42─────────────────────────────────────── 2:00
 [ Instrumental bed: drums only → build ]
 [ V05 Bridge vocal ]

2:00─────────────────────────────────────── 2:15
 [ Instrumental bed: full band + extra perc ]
 [ V06 Final Hook vocal ]

2:15─────────────────────────────────────── 2:33
 [ Instrumental bed: half-time, warm outro ]
 [ V07 Outro vocal ]
```

---

## Mix Notes
- All vocals must sit above -6dB to stay intelligible for ages 2-5
- Instrumental should duck 4-6dB under vocal lines
- FREEZE moments: hard audio cut for exactly 1 beat, then restart
- No reverb on vocals — keep dry for clarity
- Final mix format target: 48kHz 16-bit stereo WAV or MP3 320kbps

---

## Blocker Summary
**Music bed generation is NOT available in current tool environment.**
All vocal assets are complete (6/7 done, 1 pending regen).
Final mix requires external instrumental track to be combined with ElevenLabs vocal files.
