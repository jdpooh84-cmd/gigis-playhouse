# Title & Description Prompt Library
## Gigi's Playhouse — YouTube Metadata System

---

## TITLE FORMULA SYSTEM

### Formula 1: Story Hook + Categorization
```
[Emotional Hook] | [Category Label] | Gigi's Playhouse
```
**Examples:**
- "What Should We Do? | Feel Better Song | Gigi's Playhouse"
- "Sharing is Caring! | Kids Learning Songs | Gigi's Playhouse"
- "Baby's Boo Boo Song | Feel Better Nursery Rhyme | Gigi's Playhouse"

### Formula 2: Character + Action + Genre
```
[Character] [Action] | [Song Type] for [Age]
```
**Examples:**
- "Gigi Takes Care of Boo | Nursery Rhyme for Toddlers"
- "Baby Boo Gets a Hug | Comfort Song for Kids"
- "Gigi Shares Her Toys | Preschool Learning Song"

### Formula 3: Direct Lyric Hook
```
"[Catchy Lyric]" | [Scenario Label] | Gigi's Playhouse
```
**Examples:**
- "\"What Should We Do?\" | Sick Day Song | Gigi's Playhouse"
- "\"One, Two, Three, Let's Count!\" | Counting Song for Kids"
- "\"Sharing Feels So Good!\" | Kids Songs | Gigi's Playhouse"

---

## TITLE RULES

| Rule | Requirement |
|------|-------------|
| Length | 50–70 characters (YouTube truncates at ~70) |
| Brand | Always end with "Gigi's Playhouse" |
| Keywords | Include at least one of: Nursery Rhymes, Kids Songs, Toddler Songs, Children's Songs |
| Hook | First 5 words must be emotionally engaging or question-based |
| Numbers | Avoid unless it's a counting song |
| CAPS | One capitalized hook word max — don't all-caps the whole title |

---

## CLAUDE PROMPT: GENERATE VIDEO TITLES

```
You are writing YouTube titles for a toddler nursery rhyme channel called "Gigi's Playhouse."

VIDEO CONCEPT: [INSERT CONCEPT SUMMARY]
MAIN LYRIC HOOK: [INSERT CHORUS HOOK]
SCENARIO TYPE: [INSERT SCENARIO TYPE]
EMOTIONAL ARC: [INSERT ARC]

Generate 3 YouTube title options following these formulas:
1. [Emotional Hook] | [Category Label] | Gigi's Playhouse
2. Character + Action + Genre  
3. Direct lyric hook in quotes + scenario label

Rules:
- Max 70 characters
- Always end with "Gigi's Playhouse"
- Include "Nursery Rhymes" or "Kids Songs" or "Toddler Songs" in at least one title
- First 5 words must create curiosity or emotion
- Do not use all-caps
- Do not use emojis in titles

Output format:
Title 1: [text]
Title 2: [text]
Title 3: [text]
Recommended: [1/2/3] — reason in one sentence
```

---

## DESCRIPTION STRUCTURE

Every YouTube description follows this exact structure:

```
[HOOK LINE — 1 sentence, emotional, summarizes the video]

[WHAT HAPPENS — 2-3 sentences, plain language, what the characters do]

🎵 [WHAT KIDS LEARN SECTION]
[Emoji] [Learning point 1]
[Emoji] [Learning point 2]
[Emoji] [Learning point 3]
[Emoji] [Learning point 4]

🎶 Sing along: "[CHORUS HOOK]"

🌈 Perfect for:
👶 [audience 1]
👨‍👩‍👧 [audience 2]
🏫 [audience 3]

📌 Key moments:
[timestamp] - [what happens]
[timestamp] - [what happens]
[timestamp] - [what happens]

🎶 Songs in this video:
"[Song Title]" — Original song by Gigi's Playhouse

🌟 Subscribe to Gigi's Playhouse for more nursery rhymes and kids songs!

#[tag1] #[tag2] #[tag3] ... (10-15 hashtags)
```

---

## CLAUDE PROMPT: GENERATE YOUTUBE DESCRIPTION

```
You are writing a YouTube video description for a toddler nursery rhyme channel.

CHANNEL: Gigi's Playhouse
VIDEO TITLE: [INSERT TITLE]
CONCEPT: [INSERT ONE SENTENCE CONCEPT]
LEARNING OBJECTIVES: [LIST 4 LEARNING POINTS]
CHORUS HOOK: "[INSERT CHORUS HOOK]"
TARGET AUDIENCE: Toddlers age 2-5 and their parents
SCENARIO TYPE: [INSERT TYPE]
KEY TIMESTAMPS:
  - [time]: [event]
  - [time]: [event]
  - [time]: [event]
ORIGINAL SONG TITLE: [INSERT]

Write a YouTube description following this EXACT structure:
1. Hook line (1 sentence, emotionally engaging)
2. What happens (2-3 sentences, simple language)
3. Learning section with 4 emoji bullet points
4. Sing along line with chorus hook
5. Perfect for section (3 audience bullets)
6. Key moments with timestamps
7. Song credits line
8. Subscribe CTA
9. 12-15 hashtags starting with #NurseryRhymes

Keep total length 200-350 words. Use warm, friendly tone. Parent-facing but kid-accessible.
```

---

## TAG LIBRARY

### Always Include (base tags for all videos)
```
nursery rhymes
kids songs
toddler songs
children's music
gigi's playhouse
preschool songs
nursery rhymes 2025
baby songs
toddler learning songs
songs for toddlers
```

### Scenario-Specific Tags: Sick Day
```
feel better song
sick day song
caring song for kids
empathy song children
taking care of baby song
comfort song toddler
kids comfort song
what should we do song
nursery rhyme sick
baby feel better song
```

### Scenario-Specific Tags: Sharing
```
sharing song for kids
sharing is caring song
learning to share preschool
kindness song toddlers
friendship songs kids
sharing nursery rhyme
```

### Scenario-Specific Tags: Boo Boo
```
boo boo song
ouch song for kids
feel better boo boo
bandage song toddler
brave song for kids
```

### Scenario-Specific Tags: Colors
```
colors song for kids
learning colors toddler
rainbow song children
color nursery rhyme
educational songs kids
```

### Scenario-Specific Tags: Counting
```
counting song for kids
number song toddler
learn to count 1 2 3
counting nursery rhyme
math song preschool
```

---

## PLAYLIST NAMING CONVENTIONS

| Content Type | Playlist Name |
|-------------|---------------|
| All videos | Gigi's Playhouse — Nursery Rhymes & Learning Songs |
| Care/comfort | Gigi's Playhouse — Feeling Better Songs |
| Learning | Gigi's Playhouse — Learning Songs for Toddlers |
| Bedtime | Gigi's Playhouse — Sleepy Songs & Lullabies |
| Animals | Gigi's Playhouse — Animal Friend Songs |
| Behavior | Gigi's Playhouse — Kindness & Learning Songs |
