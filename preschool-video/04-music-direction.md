# 04 — Music Direction

## Song: ZOOMY ZOOM FREEZE!
## BPM: 110 | Key: C Major | Time Signature: 4/4

---

## Overall Feel
Punchy, bouncy, and distinctly rhythmic. Not generic. The track should feel like a mini-party — warm brass accents, a clear rimshot-driven groove, a melodic bass, and a playful lead instrument. Not a lullaby. Not ambient. Kinetic and joyful with intentional dynamic drops.

---

## Instrumentation Plan

| Layer | Instrument | Role |
|-------|-----------|------|
| **Rhythm 1** | Kick drum + rimshot | Foundation groove, lands hard on 1 and 3 |
| **Rhythm 2** | Handclap on 2 and 4 | Audience participation layer |
| **Rhythm 3** | Shaker/tambourine | Continuous 8th-note drive |
| **Bass** | Melodic synth bass | Bouncing quarter-note riff, follows chord roots |
| **Melody** | Bright xylophone / marimba | Main melodic hook carrier |
| **Harmony** | Warm brass stabs (trombone + trumpet) | Accents on chord changes and action cues |
| **Color** | Cartoon whip/zip SFX | On "Zoom" lyric moments |
| **Color** | Freeze sound (musical stop) | Hard cut on every "FREEZE!" beat |
| **Color** | Comic boing on jump | On jump action beat |
| **Counter-melody** | Bright synth pad | Sustained under verses, pulls back on hook |

---

## Section-by-Section Music Notes

### Intro
- Bass + drums enter immediately
- Melody plays the hook tune without vocals first (2 bars)
- Brass hit on beat 4 of bar 2 before vocals enter
- Feel: "Here comes something fun"

### Hook
- Full instrumentation, loudest dynamic
- Cartoon zip/whoosh on each "Zoomy zoom zoom"
- Hard musical STOP on every "FREEZE!" — silence for exactly 1 beat, then restart
- The freeze silence IS the rhythmic element, not a mistake

### Verse 1
- Drop: remove brass, keep drums + bass + melody
- This makes the hook feel bigger when it returns
- Shaker stays throughout

### Verse 2
- Slow-mo bars: tempo DOES NOT change (110 BPM stays)
- But arrangement thins out: fewer instruments, sustain-heavy pad comes up
- Then builds back for spin/jump with brass return

### Bridge
- Drums only for first count (1, 2, 3)
- Whole band drops on FREEZE
- Second round adds bass back
- Energy build before Final Hook

### Final Hook
- Full band + extra percussion layer
- Brass flourish at end
- Big sustained chord on "AMAZING!"
- Final zoom whoosh into final FREEZE

### Outro
- Half-time feel (same BPM, kick only on 1 and 3)
- Warm, wind-down feeling
- Final "BYE!" note: ascending arpeggio + comedic boing
- Then silence (characters frozen)

---

## Tempo Map
All sections: 110 BPM constant (do NOT slow down for slow-mo verse — the character acting carries the slow-motion feel, not the tempo)

---

## Dynamic Map
| Section | Dynamic Level |
|---------|--------------|
| Intro | Medium → medium-loud |
| Hook 1 | Loud |
| Verse 1 | Medium |
| Hook 2 | Loud |
| Verse 2 | Medium (softer on slow-mo bars) → builds |
| Hook 3 | Loud |
| Bridge | Build from sparse → loud |
| Final Hook | Loudest |
| Outro | Medium-soft |

---

## Audio Generation Strategy
- Instrumental bed: Higgsfield `generate_audio` — describe as punchy children's party groove
- Vocals: Higgsfield `text2speech_v2` with ElevenLabs variant, Quinn voice
- Generated in sections (intro, hook, verse 1, verse 2, bridge, final hook, outro)
- Final assembly: all vocals + bed combined in assembly manifest
