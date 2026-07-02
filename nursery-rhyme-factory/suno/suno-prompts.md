# Suno Prompt Library — Gigi's Playhouse

Formula library for generating nursery rhyme tracks on Suno AI.

---

## HOW TO USE SUNO FOR NURSERY RHYMES

### Interface
1. Go to Suno → Custom Mode
2. Paste STYLE PROMPT into the "Style of Music" field
3. Paste formatted lyrics (with [Verse], [Chorus] tags) into the Lyrics field
4. Set title
5. Generate — always generate 2–3 variants, pick best

### Critical Suno Settings
- Always use **Custom Mode** — never use Simple Mode for these songs
- Always include **[section tags]** in lyrics: [Intro], [Verse 1], [Chorus], [Bridge], [Outro]
- Always include **Suno end tokens** if song should fade: add `[End]` on final line

---

## FORMULA 1: UPBEAT NURSERY RHYME

**Use for:** Learning songs, activity songs, celebration songs, counting songs

```
upbeat children's song, nursery rhyme, playful piano, bright ukulele, light percussion,
warm kids choir, female lead vocalist age 5-7, cheerful and energetic, simple melody,
easy to sing along, 100-110 bpm, major key, staccato piano notes, clapping rhythm,
no distortion, no minor chords, bright and sunny, toddler-friendly, catchy hook,
whimsical bells, acoustic feel, clean mix, happy ending
```

**BPM:** 100–110  
**Key:** C Major or G Major  
**Vocal:** Bright female child voice, clear diction, slightly breathy  
**Instruments:** Piano (lead), ukulele (rhythm), light hand percussion, optional xylophone  
**Energy arc:** Medium → High → High → Medium (outro)  
**Avoid:** Heavy bass, minor chords, complex harmonics, rap delivery, distortion

---

## FORMULA 2: COMFORT / CARING SONG

**Use for:** Sick day, boo boo, bedtime, lullaby, comfort scenarios

```
gentle children's lullaby, nursery rhyme, soft piano, warm acoustic guitar,
tender female vocalist, caring and nurturing tone, slow to medium tempo 85-95 bpm,
major key with warm thirds, gentle background choir, soothing and safe,
lullaby feel in bridge, children's music, cozy bedtime sound, soft strings,
no harsh sounds, warm low end, emotional safety, peaceful resolution,
clean vocal production, slight reverb, toddler-friendly
```

**BPM:** 85–95 (drop to ~70 in bridge)  
**Key:** F Major or C Major (warmer keys)  
**Vocal:** Warm female voice, nurturing quality, gentle vibrato on long notes  
**Instruments:** Piano (soft), acoustic guitar, light strings, optional music box  
**Energy arc:** Medium → Medium → Low (bridge) → Medium → Soft (outro)  
**Avoid:** Heavy percussion, sharp attacks, complex chord changes, upbeat energy in bridge

---

## FORMULA 3: PLAYFUL ANIMAL-FRIEND SONG

**Use for:** Animal companion scenarios, nature songs, friendship songs

```
playful children's song, animal sounds, bouncy nursery rhyme, fun percussion,
silly piano, bright cheerful melody, kids choir, playful female lead vocalist,
energetic and silly, 105-115 bpm, major key, fun sound effects integrated,
wobbly bassline, acoustic instruments, bouncy rhythm, simple repetitive melody,
wacky fun moments, toddler singalong, clean bright mix, joyful and silly
```

**BPM:** 105–115  
**Key:** G Major or D Major (bright and bouncy)  
**Vocal:** Slightly silly, exaggerated emotion, big dynamic contrast for funny moments  
**Instruments:** Piano, acoustic bass (bouncy), wood blocks, optional kazoo-style lead  
**Energy arc:** Medium → High → High → High → Fun outro  
**Special:** Include [sound effect] tags in Suno lyrics for animal sounds at key moments

---

## SPECIFIC PROMPT: GP-001 "WHAT SHOULD WE DO? (THE FEEL BETTER SONG)"

**See:** `sick-song-suno-prompt.md` for the complete ready-to-paste prompt

---

## BPM GUIDANCE

| Scenario | BPM Range | Feel |
|----------|-----------|------|
| Learning / counting | 95–110 | Steady, easy to follow |
| Upbeat / celebration | 108–120 | Energetic, clap-friendly |
| Comfort / sick | 85–95 | Soothing, safe |
| Bridge within comfort song | 70–80 | Lullaby-tender |
| Animal / silly | 105–115 | Bouncy, unpredictable |
| Bedtime | 70–85 | Drowsy, slow |

---

## VOCAL STYLE GUIDANCE

### What Works in Suno for Toddler Music
- "female lead vocalist age 5-7" — yields a childlike but melodic voice
- "warm kids choir" — adds community feel without cluttering the lead
- "clear diction" — critical for lyric intelligibility
- "nurturing tone" — shifts energy toward caring/comfort
- "playful and silly" — enables exaggerated fun moments

### What Does NOT Work
- "opera" or "classical vocal" — too formal, wrong register
- "whisper" — Suno interprets this poorly, often produces mumbling
- "male lead" alone — usually too adult for this channel type
- "auto-tune" or "pop production" — makes it sound wrong for toddlers
- "rap" — destroys the lyric clarity needed for learning songs

---

## LYRIC REPETITION GUIDANCE

### In Suno Lyrics
- Repeat the chorus section tag for each instance: [Chorus], [Chorus], [Chorus]
- Do NOT just write the chorus once and expect Suno to loop it — paste full lyrics each time
- Use [Chorus - Final] for a last variation
- Mark repeated sections explicitly: [Verse 2] even if identical to [Verse 1]

### Repetition Strategy
- Chorus must appear minimum 3× in lyrics (Suno needs this to learn the hook)
- Key hook phrase (e.g., "What should we do?") should appear 6–8× minimum across full lyrics
- Bridge should appear once — Suno tends to loop bridge if repeated
- Sound effects ("Achoo!") should appear in lyrics exactly as you want them sung/said

---

## WHAT NOT TO DO IN SUNO PROMPTS

| Don't | Why |
|-------|-----|
| Use negative prompts alone ("no distortion") | Suno ignores negatives unless paired with positives |
| Stack 30+ style tags | Confuses the model; 8–15 tags is optimal |
| Use vague quality words ("good quality") | Meaningless to Suno's style parser |
| Use artist names | Can produce style drift; use instrument/feel descriptors instead |
| Leave section tags out of lyrics | Suno loses structure, produces wrong timing |
| Generate one version only | Always generate 2–3 and compare |
| Use complex time signatures | 4/4 only for nursery rhymes; Suno handles it cleanly |
| Include prose instructions in lyrics field | Suno will try to sing your instructions |

---

## QUALITY CHECKLIST AFTER GENERATION

Before saving a Suno output, verify:

- [ ] Vocals are clear and intelligible — can you understand the words?
- [ ] BPM feels right for the scenario (not too fast/slow for toddlers)
- [ ] Chorus energy is noticeably higher than verses
- [ ] Bridge drops appropriately (for comfort songs)
- [ ] Outro resolves — doesn't hard-cut
- [ ] No jarring sound artifacts or chord clashes
- [ ] Child voice sounds natural, not robotic
- [ ] Total duration is within 10% of target runtime

---

## GENERATION WORKFLOW

1. Open Suno Custom Mode
2. Paste style prompt from this library
3. Paste formatted lyrics from `lyrics/{concept-slug}-lyrics.md` (Suno Formatting section)
4. Set title to: "[Song Title] — Gigi's Playhouse"
5. Generate × 3
6. Download all 3
7. Listen on phone speaker (toddlers will hear it on phone/TV speakers — test accordingly)
8. Pick best variant, save to `output/{concept-slug}/audio/`
9. Note variant ID for re-generation if needed
