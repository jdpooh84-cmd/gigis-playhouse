# Lyrics Generator Prompt
## Claude Code — Gigi's Playhouse

---

## CORE LYRIC GENERATION PROMPT

```
You are writing original nursery rhyme lyrics for Gigi's Playhouse, a toddler channel for ages 2-5.

VIDEO BRIEF:
[PASTE BRIEF HERE]

Write complete original lyrics for this video following these rules:

STRUCTURE REQUIREMENTS:
- [Intro] — instrumental, 15-20 seconds, set up the scene with a description note
- [Verse 1] — 8 lines, 2 stanzas of 4 lines each, AABB rhyme scheme
- [Chorus] — 8 lines, must contain a call-and-response hook, chorus must work as standalone
- [Verse 2] — 8 lines, continues story, introduces care/action behaviors
- [Chorus] — exact repeat of first chorus (paste again fully)
- [Bridge] — 8 lines, slower/tender feel, comfort moment, ABAB rhyme scheme
- [Verse 3] — 8 lines, resolution is building, joy returning
- [Chorus] — final chorus with variation: past tense or "we did it!" version
- [Outro] — 8 lines, universal lesson, characters waving goodbye

LYRIC RULES:
- Max 10 syllables per line (count them)
- Vocabulary: age 2-5 only — test each word: can a 3-year-old say it?
- Rhyme scheme: AABB in verses (lines 1+2 rhyme, lines 3+4 rhyme)
- Chorus must have one hook phrase that repeats at least 3× within the chorus
- Include at least one sound effect word (Achoo! Splash! Clap! Zoom!)
- Character names must appear in natural context
- No abstract concepts — everything must be physically visible or physically experienced
- Final chorus must differ from first: change from "What should we do?" → "We knew what to do!" or similar

DO NOT:
- Use any lyrics from existing copyrighted songs
- Use the words "Wheels on the Bus", "Twinkle Twinkle", "Row Row", "Old MacDonald" or other protected song titles
- Use character names from other channels
- Include any content not appropriate for ages 2-5

OUTPUT FORMAT:
Provide the lyrics in TWO formats:

FORMAT 1 — READABLE VERSION:
With section headers and clean formatting for review

FORMAT 2 — SUNO VERSION:
With Suno section tags: [Intro], [Verse 1], [Chorus], [Verse 2], [Chorus], [Bridge], [Verse 3], [Chorus], [Outro], [End]
Ready to paste into Suno's lyrics field

ALSO PROVIDE:
- VOCABULARY LIST: All key words introduced (for parents/educators)
- SOUND EFFECTS: List all sound effects and where they appear
- CALL-AND-RESPONSE HOOK: Identify the main participatory hook
- RUNTIME ESTIMATE: Estimated seconds per section at natural vocal tempo
```

---

## QUALITY CHECK PROMPT (Run after lyrics are generated)

```
Review these nursery rhyme lyrics for a toddler channel (ages 2-5):

[PASTE LYRICS]

Check for and flag any issues with:

1. SYLLABLE COUNT: Are any lines over 10 syllables? List them.
2. VOCABULARY: Are any words too complex for a 3-year-old? List them and suggest simpler alternatives.
3. RHYME QUALITY: Are any rhymes forced or awkward? List them.
4. CHORUS HOOK: Is the main hook clearly identifiable? Is it repeatable?
5. CALL-AND-RESPONSE: Does the chorus invite participation? How?
6. EMOTIONAL ARC: Does the arc go: [start emotion] → [middle emotion] → [end emotion]? Is it clear?
7. SOUND EFFECTS: Are there any? Should there be?
8. RESOLUTION: Does the final chorus/outro feel complete and satisfying?
9. SUNO FORMATTING: Are the section tags correct for Suno?
10. COPYRIGHT CHECK: Do any lines sound similar to existing copyrighted songs?

Output:
- ISSUES FOUND: [list with line references]
- SUGGESTED FIXES: [specific rewrite suggestions]
- APPROVED SECTIONS: [sections that need no changes]
- OVERALL RATING: [Ready to Use / Needs Minor Fixes / Needs Major Revision]
```

---

## LYRIC VARIATION PROMPT (for chorus variations)

```
The final chorus of our nursery rhyme needs to differ from the first chorus to show character growth.

FIRST CHORUS (current version):
[PASTE CHORUS]

The story arc is: [DESCRIBE ARC]
The resolution is: [DESCRIBE RESOLUTION]

Rewrite this chorus for the FINAL instance using ONE of these approaches:
1. Past tense shift: "What should we do?" → "We knew what to do!"
2. Achievement celebration: Question → Statement of success
3. Teaching moment: "We'll take care of you" → "Now WE can take care of YOU!"

Keep the same melody and syllable count. Keep the same structure.
Only change the tense and energy direction from asking → knowing.

Output 3 variations of the final chorus. Recommend the best one.
```

---

## BRIDGE GENERATOR PROMPT

```
Write a bridge section for this nursery rhyme.

CONTEXT:
- Song scenario: [SCENARIO]
- Characters in bridge: [CHARACTERS]
- Emotional purpose: [comfort / rest / calm / tender moment]
- Where in story: [after verse 2 chorus — midpoint]
- What follows: [verse 3 — resolution beginning]

BRIDGE RULES:
- 8 lines, 2 stanzas of 4 lines
- ABAB rhyme scheme (softer rhyme is okay here)
- Slower, more tender feeling — think lullaby pace
- Acknowledge the feeling without amplifying it ("Feeling sick is no fun" — validates)
- Include a comfort statement ("We're right here")
- End with a love/safety statement ("We love you, [name]...")
- Must feel like a natural "breath" before the resolution builds

Output 2 bridge options and recommend the one that fits best.
```
