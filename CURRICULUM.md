# Gigi's Playhouse — Complete Curriculum & Build Documentation

**Repository:** `jdpooh84-cmd/gigis-playhouse`
**Publisher:** Dreamz In Ink LLC
**Founders:** Justin Poole (MBA, MS) & Rachel Poole
**Pedagogical Framework:** The Poole Method™
**Character IP Reference:** GIGI-FND-PX002
**Document generated:** 2026-08-25

---

## 1. Executive Summary

Gigi's Playhouse is a K-3 supplemental edutainment web application. The learning content is organized into six domains, delivered through a fixed six-step lesson player, reinforced by a spaced-repetition flashcard system, and surrounded by a parent-controlled YouTube channel hub.

The content was built in **two distinct systems** that coexist in the repository:

1. **A hand-authored seed corpus** (`client/src/lib/seed-data.ts`) — 54 fully-written lessons and 110 flashcards. This is what the application actually ships and runs on.
2. **A programmatic template generator** (`content/generate-content.ts`) — a script capable of synthesizing 600 lessons and 400 flashcards from template tables. Its output has never been committed to the repository.

Everything below breaks down both systems, the exact tools used, the pedagogical structure, the data model, and the compliance decisions that shaped the content's language.

---

## 2. The Tool Stack — What Was Actually Used to Build It

### 2.1 Content Creation & Research Tools

| Tool | Role in Building the Curriculum |
|---|---|
| **Claude (Anthropic)** | Authored the lesson prose — titles, episode descriptions, step-by-step activity instructions, apply prompts, reflection scripts, quiz questions with explanations, on-track goals, and stretch goals. This is the source of the narrative voice throughout `seed-data.ts`. |
| **Apify** | Web-scraping platform used to research and harvest real YouTube channel metadata and educational content sources. Commit `bbfff8e` explicitly credits it: *"Integrated Apify/Claude content: 48 new lessons (8 per domain), 60 new flashcards (10 per domain), 21 new YouTube channels."* The channel block in `types.ts` carries the inline comment `// New channels from Apify research`. |
| **Manus** | The development platform the project was built on. Evidenced by `vite-plugin-manus-runtime` in devDependencies and Manus OAuth as the authentication provider. |
| **TypeScript template generator** | `content/generate-content.ts` — a custom 383-line script written to mass-produce lesson objects from curated template tables. |
| **Git** | Version control. The full content history is traceable through checkpoint commits from `5997422` (initial bootstrap) through `4a187fe` (final feature implementation). |

### 2.2 Application Framework & Runtime

| Layer | Technology | Version |
|---|---|---|
| Language | TypeScript | 5.9.3 |
| Package manager | pnpm | 10.4.1 |
| Frontend framework | React | 19.2.1 |
| Build tool | Vite | 7.1.7 |
| Server bundler | esbuild | 0.25.0 |
| Dev runner | tsx | 4.19.1 |
| Routing | wouter | 3.3.5 (patched — `patches/wouter@3.7.1.patch`) |
| Server | Express | 4.21.2 |
| API layer | tRPC (server, client, react-query) | 11.6.0 |
| Data fetching | TanStack React Query | 5.90.2 |
| Serialization | superjson | 1.13.3 |
| Validation | Zod | 4.1.12 |
| ORM | Drizzle ORM | 0.44.5 |
| Migrations | drizzle-kit | 0.31.4 |
| Database | MySQL (via mysql2) | 3.15.0 |
| Client state | Zustand | 5.0.12 |
| Auth tokens | jose (JWT) | 6.1.0 |
| Payments | Stripe | 22.0.0 |
| File storage | AWS SDK S3 + presigner | 3.693.0 |
| Styling | Tailwind CSS | 4.1.14 |
| Component primitives | Radix UI (28 packages) | 1.x–2.x |
| Component system | shadcn/ui conventions (`components.json`) | — |
| Animation | Framer Motion | 12.23.22 |
| Icons | lucide-react | 0.453.0 |
| Charts | Recharts | 2.15.2 |
| Audio / theme song | Tone.js | 15.1.22 |
| Internationalization | i18next + react-i18next | 26.0.3 / 17.0.2 |
| Forms | react-hook-form + @hookform/resolvers | 7.64.0 / 5.2.2 |
| Toasts | sonner | 2.0.7 |
| Date handling | date-fns | 4.1.0 |
| Mobile shell | Capacitor (`capacitor.config.ts`) | — |
| Unit testing | Vitest | 2.1.4 |
| E2E testing | Playwright (`e2e/full-journey.spec.ts`) | — |
| Formatting | Prettier | 3.6.2 |

### 2.3 Build & Verification Commands

```
pnpm dev       # NODE_ENV=development tsx watch server/_core/index.ts
pnpm build     # vite build && esbuild server/_core/index.ts --platform=node --bundle --format=esm --outdir=dist
pnpm start     # NODE_ENV=production node dist/index.js
pnpm check     # tsc --noEmit  (type verification)
pnpm test      # vitest run   (24/24 tests passing at final checkpoint)
pnpm format    # prettier --write .
pnpm db:push   # drizzle-kit generate && drizzle-kit migrate
```

---

## 3. The Poole Method™ — The Pedagogical Framework

The Poole Method™ is the proprietary framework developed by Dreamz In Ink LLC that governs how every lesson is structured and sequenced. It is defined in code at `client/src/pages/About.tsx` as `POOLE_PRINCIPLES`.

### 3.1 The Five Principles

**1. Structure Before Freedom**
Children thrive when they know what comes next. Every lesson follows the same Watch → Do → Apply → Reflect pattern so kids feel safe to explore.

**2. Mastery Over Speed**
No rushing through content. Children advance only when they've truly understood — not when they've simply clicked through. The 5-phase micro-step system ensures deep learning.

**3. Parent as Partner**
Parents aren't locked out. They choose the channels, set the pace, track compliance, and get alerts. This is a partnership between the app and the family.

**4. Joy as Fuel**
Learning should feel like play. Characters celebrate wins, movement breaks prevent burnout, and the YouTube hub rewards focused learning with safe entertainment.

**5. Every Child is Different**
ADHD-friendly design, 17 language options, ASL integration, movement breaks, short day mode — because no two learners are the same.

### 3.2 Legal Positioning of the Method

The Terms of Service (`client/src/pages/Terms.tsx`, Section 3) states verbatim:

> The Poole Method™ is a proprietary framework developed by Dreamz In Ink LLC that guides the structure and sequencing of learning experiences on the Platform. The Poole Method™ is informed by educational research but has not been independently validated by a third-party academic institution. References to "research-backed" or "proven" approaches describe the educational principles that informed the method's design, not the results of controlled clinical studies of the Platform itself.

Intellectual property is asserted in Section 7 over all original learning content, activities, quizzes, flashcards, character designs, and The Poole Method™ itself — with a carve-out permitting personal compliance reports for homeschool record-keeping.

---

## 4. Curriculum Architecture

### 4.1 The Six Learning Domains

Defined in `client/src/lib/types.ts` as the `DOMAINS` constant. Each domain is bound to a guide character and a signature color.

| Domain ID | Display Name | Character | Color | Emoji |
|---|---|---|---|---|
| `literacy` | Literacy | Lyric | `#4361EE` | 📚 |
| `math` | Math | Justin Jr | `#F72585` | 🔢 |
| `science` | Science | Rachel | `#06B6D4` | 🔬 |
| `social-studies` | Social Studies | Jamie | `#F59E0B` | 🌍 |
| `social-emotional` | Social-Emotional | Kaylah | `#22C55E` | 💚 |
| `executive-function` | Executive Function | Darian | `#8B5CF6` | 🧠 |

### 4.2 The Nine-Character System

Defined in `client/src/lib/characters.ts`. Seven characters map to content domains; Gigi hosts, and Chris leads movement breaks.

| Character | Domain / Role |
|---|---|
| Gigi | Host (the cat, the face of the app) |
| Lyric | Literacy |
| Justin Jr | Math |
| Rachel | Science |
| Jamie | Social Studies |
| Kaylah | Social-Emotional |
| Darian | Executive Function |
| Chris | Movement breaks (the frog) |

A parallel set of four selectable guide animals is offered at child-profile creation (`GUIDE_ANIMALS` in `types.ts`):

- **Gigi the Cat** — Warm, curious, loves words
- **Dexter the Dog** — Energetic, loves numbers and puzzles
- **Luna the Bunny** — Gentle, loves science and discovery
- **Bear** — Steady, loves social-emotional stories

### 4.3 Grade Bands

Five bands are defined in the `GradeBand` type: `pre-k`, `kindergarten`, `grade-1`, `grade-2`, `grade-3`.

### 4.4 Difficulty Tiers

Three tiers per lesson: `beginner`, `intermediate`, `advanced`. In the generator, difficulty is assigned by day position — days 1–10 are beginner, days 11–20 intermediate, days 21–30 advanced.

---

## 5. The Lesson Data Model

Every lesson conforms to the `Lesson` interface in `client/src/lib/types.ts`. This is the complete, authoritative shape:

```typescript
export interface Lesson {
  id: string;
  domain: DomainId;
  grade_band: GradeBand;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  day_number: number;
  title: string;
  theme: string;
  episode: {
    title: string;
    description: string;
    duration_minutes: number;
    skill_tags: string[];
    search_term: string;
  };
  activity: {
    title: string;
    instructions: string[];
    materials: string[];
    short_version: string;
  };
  apply_prompt: string;
  reflection_prompt: string;
  reflect_script: string[];
  quiz: QuizQuestion[];
  on_track_goal: string;
  stretch_goal: string;
  asl_word: string;
  materials_needed: string[];
}
```

### 5.1 Field-by-Field Purpose

- **`episode`** — The video segment. `search_term` is the YouTube query used to surface an age-appropriate video; `skill_tags` feed progress analytics; `duration_minutes` sets pacing expectations.
- **`activity`** — The hands-on portion. `instructions` is an ordered array of concrete steps; `materials` lists household items required; `short_version` is the abbreviated path used when a child is in **Short Day Mode** (the ADHD/low-energy accommodation).
- **`apply_prompt`** — A single real-world transfer task performed away from the screen, usually involving a family member.
- **`reflection_prompt`** — One open metacognitive question.
- **`reflect_script`** — Four scaffolded discussion questions a parent can read aloud verbatim.
- **`quiz`** — Comprehension check (see model below).
- **`on_track_goal` / `stretch_goal`** — The mastery bar and the extension bar, used for compliance reporting and parent alerts.
- **`asl_word`** — American Sign Language integration; one target sign per lesson.
- **`materials_needed`** — Duplicate of activity materials, surfaced at the lesson-selection level so parents can prepare in advance.

### 5.2 The Quiz Model

```typescript
export interface QuizQuestion {
  question: string;
  type: 'multiple-choice' | 'true-false' | 'image-tap';
  options: string[];
  correct_answer: number;   // index into options
  explanation: string;      // shown after answering, right or wrong
}
```

Every question carries a mandatory `explanation`, so an incorrect answer becomes a teaching moment rather than a dead end.

### 5.3 The Flashcard Model

```typescript
export interface Flashcard {
  id: string;
  domain: DomainId;
  front: string;
  back: string;
  phonics_notation?: string;  // IPA notation, e.g. /æ/, /tʃ/, /keɪk/
  emoji?: string;
}
```

Literacy flashcards carry true IPA phonetic notation — for example `cake` → "Silent E makes the vowel say its name" with `/keɪk/`, and the digraph `ch` → "/tʃ/ as in chip".

---

## 6. The Six-Step Lesson Player

Implemented in `client/src/pages/learn/LessonPlayer.tsx`. Each lesson runs through a fixed, linear sequence with a progress bar and step tabs. Backward navigation to completed steps is allowed; forward skipping is not.

| Step | Index | Name | What Happens |
|---|---|---|---|
| 1 | 0 | **Intro** | Character greeting, episode title and description, duration preview |
| 2 | 1 | **Learn (Watch)** | The video segment, surfaced via the episode `search_term` |
| 3 | 2 | **Activity (Do)** | Materials checklist and numbered hands-on instructions |
| 4 | 3 | **Reflect** | The four-question `reflect_script`, parent-guided |
| 5 | 4 | **Quiz** | Question-by-question with correct/incorrect highlighting and explanation reveal |
| 6 | 5 | **Feedback** | Star rating and optional comment, written to `lessonFeedback` |

Progress is tracked as four independent booleans on the `LessonProgress` record — `watch_complete`, `do_complete`, `apply_complete`, `reflect_complete` — plus a `completion_status` of `done`, `partial`, or `skipped`. Between steps, the active character delivers a rotating encouragement line drawn from that character's `encouragements` array.

---

## 7. System One — The Hand-Authored Seed Corpus (What Ships)

**File:** `client/src/lib/seed-data.ts` — 2,472 lines
**Exports:** `SEED_LESSONS` (line 8), `SEED_FLASHCARDS` (line 2352)

This is the live content. Every lesson is a fully written object — no templating, no string interpolation, no placeholder text.

### 7.1 Content Inventory

- **54 lessons total** (6 originally hand-written + 48 added in the Apify/Claude integration pass)
- **110 flashcards total** (50 original + 60 added in the same pass)
- **38 preloaded YouTube channels** (17 original + 21 from Apify research)

### 7.2 Lessons by Domain

| Domain | Lesson-object references |
|---|---|
| Literacy | 45 |
| Math | 29 |
| Science | 24 |
| Social Studies | 22 |
| Social-Emotional | 22 |
| Executive Function | 22 |

### 7.3 Grade Band Distribution

All 54 lessons carry `grade_band: 'grade-1'`. Pre-K, kindergarten, grade-2, and grade-3 are fully defined in the type system and filterable in the UI, but currently have no authored lessons behind them.

### 7.4 A Complete Worked Example

The first lesson in the corpus, `literacy-g1-int-d1`, demonstrates the authoring depth:

- **Title:** The Letter Detective
- **Theme:** Letter Sounds & Phonics
- **Domain / Grade / Difficulty:** literacy / grade-1 / intermediate, day 1
- **Episode:** "Sounds All Around" — 8 minutes. *"Today we become letter detectives! We will listen for beginning sounds in everyday words and discover how letters make special sounds. Get ready to use your super listening ears!"* Skill tags: `phonics`, `letter-sounds`, `listening`. Search term: `letter sounds for kids phonics`.
- **Activity:** "Sound Hunt Safari" — Materials: Paper, Crayons or pencils. Five instructions:
  1. Grab a piece of paper and a crayon or pencil.
  2. Walk around your home and find 5 things that start with the letter B.
  3. Draw a picture of each thing you find.
  4. Say the name of each thing out loud, stretching out the /b/ sound: "Buh-buh-BALL!"
  5. Circle your favorite B-word drawing!
  - Short version: *Find 3 things that start with B and draw them.*
- **Apply prompt:** Go to your kitchen and find something that starts with the letter S. Tell a grown-up what you found!
- **Reflection prompt:** What was the hardest sound to find today?
- **Reflect script:** (1) What letter sound did we practice today? (2) Can you think of a word that starts with /b/ that we didn't find? (3) What was your favorite thing you found on your Sound Hunt? (4) Can you make the /b/ sound three times really fast?
- **Quiz:**
  - *Which word starts with the /b/ sound?* → Cat / **Ball** / Dog / Fish — "Ball starts with the /b/ sound — buh-buh-Ball!"
  - *The word "Sun" starts with the /s/ sound.* → **True** / False — "Yes! Sun starts with /s/ — sss-Sun!"
  - *Which letter makes the "mmmm" sound?* → B / T / **M** / K — "M makes the 'mmmm' sound, like in 'Mom' and 'Moon'!"
- **On-track goal:** Identify beginning sounds in 5 common words
- **Stretch goal:** Write the beginning letter for 3 words independently

---

## 8. System Two — The Programmatic Template Generator

**File:** `content/generate-content.ts` — 383 lines
**Companion:** `content/seed-import.ts` — 73 lines
**Run with:** `npx tsx content/generate-content.ts`

This is a separate, parallel approach: instead of writing each lesson by hand, it composes lessons from curated template tables.

### 8.1 The Header Comment (Verbatim)

```
/**
 * Content Corpus Generator for Gigi's Playhouse
 *
 * Generates 30-day lesson sets for each grade band × domain combination.
 * Output: JSON seed files importable by the app.
 *
 * Grade bands: pre-k, kindergarten, grade-1, grade-2, grade-3
 * Domains: literacy, math, science, social-emotional, social-studies, executive-function
 *
 * COMPLIANCE: Never uses "curriculum", "lesson plan", "homeschool program", or "accredited".
 * Always uses supplemental/assistive framing.
 */
```

### 8.2 The Template Structure

Four template tables exist — `LITERACY_TEMPLATES`, `MATH_TEMPLATES`, `SCIENCE_TEMPLATES`, `SOCIAL_EMOTIONAL_TEMPLATES` — each keyed by all five grade bands. Every entry conforms to:

```typescript
interface LessonTemplate {
  themes: string[];        // exactly 30 — one per day
  skills: string[][];      // 5–10 skill-tag groupings, cycled
  searchTerms: string[];   // 5 YouTube queries, cycled
  materials: string[][];   // 5 material sets, cycled
}
```

The themes are genuinely curated, sequenced, standards-aware scope-and-sequence lists. For example:

- **Literacy, pre-K:** Letter Recognition, Rhyming Words, Story Time, Name Writing, Alphabet Sounds, Print Awareness, Vocabulary Building, Listening Skills, Nursery Rhymes, Picture Books, Environmental Print, Oral Language, Syllable Clapping, Beginning Sounds, Color Words, Shape Words, Animal Names, Action Words, Feeling Words, Family Words, Food Words, Body Parts, Opposites, Sequencing Stories, Retelling, Predicting, Letter Tracing, Fine Motor Writing, Book Handling, Left to Right
- **Literacy, grade-1:** Letter Sounds & Phonics, Blending & Segmenting, Sight Word Mastery, Reading Comprehension, Story Writing, Vowel Teams, R-Controlled Vowels, Silent E, Compound Words, Contractions, Prefixes, Suffixes, Main Idea & Details, Compare & Contrast, Cause & Effect, Fact & Opinion, Poetry, Narrative Writing, Informational Writing, Opinion Writing, Dialogue, Adjectives, Verbs, Nouns, Sentence Types, Paragraphs, Research Skills, Dictionary Skills, Fluency Practice, Book Reports
- **Math, kindergarten:** Counting to 20, Addition to 5, Subtraction from 5, 2D Shapes, 3D Shapes, Comparing Numbers, Number Bonds, Ten Frames, Measurement, Position Words, Patterns & Sequences, Data & Graphing, Money Coins, Time to Hour, Word Problems, Number Writing, Counting by 2s, Counting by 5s, Counting by 10s, Ordinal Numbers, Greater Than Less Than, Equal Groups, Halves, Symmetry, Weight, Capacity, Temperature, Calendar Math, Story Problems, Mental Math
- **Social-Emotional, grade-3:** Advanced Emotional Regulation, Social Problem Solving, Ethical Decision Making, Advocacy, Global Citizenship, Identity & Self-Concept, Peer Relationships, Group Dynamics, Conflict Styles, Restorative Practices, Emotional Resilience, Growth Through Failure, Positive Psychology, Gratitude Practice, Mindfulness Meditation, Compassion, Social Justice, Equity & Fairness, Diversity & Inclusion, Allyship, Digital Citizenship Advanced, Media Influence, Peer Pressure, Substance Awareness, Body Image, Self-Esteem, Future Planning, Career Exploration, Financial Literacy Basics, Life Skills

### 8.3 The Domain-to-Character Map

```typescript
const DOMAIN_CHARACTERS: Record<string, string> = {
  'literacy': 'Lyric',
  'math': 'Justin Jr',
  'science': 'Rachel',
  'social-studies': 'Jamie',
  'social-emotional': 'Kaylah',
  'executive-function': 'Darian',
};
```

### 8.4 The Generation Algorithm

`generateLesson(domain, gradeBand, dayNumber, template)` works by modular cycling — each of the four template arrays is indexed by `(dayNumber - 1) % array.length`, so themes advance one per day while skills, search terms, and materials rotate through their shorter cycles.

Composition rules:

- **ID:** `${domain}-${gradeBand}-${difficultyInitial}-d${dayNumber}`
- **Title:** `` `${theme} Adventure` ``
- **Episode title:** `` `${theme} with ${character}` ``
- **Episode description:** `` `Today ${character} helps us explore ${theme.toLowerCase()}! Get ready for a fun discovery journey where we'll learn through play and practice.` ``
- **Duration:** `5 + Math.floor(dayNumber / 5)` minutes — pacing scales up as the path progresses
- **Difficulty:** days 1–10 beginner, 11–20 intermediate, 21–30 advanced
- **Activity instructions:** five templated steps, with materials interpolated into step one and the character voiced in step two
- **ASL word:** the first word of the theme string
- **Quiz:** three generic questions from `generateQuizForTheme()` — a theme-recall multiple choice, a "we can practice this every day" true/false, and a "best way to show what you learned" multiple choice

### 8.5 The Generation Loop

```typescript
const GRADE_BANDS = ['pre-k', 'kindergarten', 'grade-1', 'grade-2', 'grade-3'];
const DOMAINS = ['literacy', 'math', 'science', 'social-emotional'];
const DAYS_PER_PATH = 30;
const FLASHCARDS_PER_PATH = 20;
```

5 grade bands × 4 domains × 30 days = **600 lessons**, plus 5 × 4 × 20 = **400 flashcards**.

Note that the loop covers only four domains — social-studies and executive-function have no template tables, so the generator cannot produce them despite the header comment listing all six.

### 8.6 The Flashcard Generator

`getFlashcardTemplates(domain, gradeBand)` contains genuinely authored card sets for four specific combinations, and falls back to placeholder text for everything else.

**Authored sets:**

- **Literacy / pre-K** — 20 alphabet cards, each with IPA notation and emoji: A → "Apple starts with A" `/æ/` 🍎, B → "Ball starts with B" `/b/` ⚽, C → `/k/` 🐱, D → `/d/` 🐕, E → `/ɛ/` 🐘, F → `/f/` 🐟, G → `/g/` 🦒, H → `/h/` 🎩, I → `/ɪ/` 🍦, J → `/dʒ/` 🧃, K → `/k/` 🪁, L → `/l/` 🦁, M → `/m/` 🌙, N → `/n/` 🪺, O → `/ɒ/` 🍊, P → `/p/` 🐧, Q → `/kw/` 👑, R → `/r/` 🌈, S → `/s/` ☀️, T → `/t/` 🌳
- **Literacy / grade-1** — 20 cards spanning CVC words (cat `/kæt/`, dog `/dɒg/`, sun `/sʌn/`, hat `/hæt/`, bed `/bɛd/`), sight words (the, and, is, it, you), digraphs (sh `/ʃ/`, ch `/tʃ/`, th `/θ/`), silent-E (cake `/keɪk/`, bike `/baɪk/`), vowel teams (rain `/eɪ/`, boat `/oʊ/`, tree `/iː/`), the IGH pattern (night `/aɪ/`), and r-controlled vowels (star `/stɑːr/`)
- **Math / pre-K** — 20 cards: numerals 1–10 with finger-counting cues, shapes (circle, square, triangle), comparison language (More, Less, Big, Small), AB patterns, and ordinal position (First, Last)
- **Math / grade-1** — 20 cards: addition and subtraction facts (2+3, 5+5, 7−3, 10−6, 8+2), place value (15 = 1 ten 5 ones, 20 = 2 tens), doubles (4+4, 5+5), comparison symbols (>, <, =), fractions (1/2, 1/4), coin values (penny 1¢, nickel 5¢, dime 10¢, quarter 25¢), and clock hands

**Fallback:** every other domain/grade combination returns 20 auto-filled cards reading `"${domain} concept ${i+1}"` / `"Definition for ${domain} concept ${i+1} (${gradeBand})"` with a 📝 emoji.

### 8.7 The Export Pipeline

`content/seed-import.ts` consumes `allLessons` and `allFlashcards` and writes four artifacts:

1. `client/src/lib/generated-lessons.ts` — TypeScript exporting `GENERATED_LESSONS: Lesson[]`
2. `client/src/lib/generated-flashcards.ts` — TypeScript exporting `GENERATED_FLASHCARDS: Flashcard[]`
3. `content/json/lessons.json`
4. `content/json/flashcards.json`

Each generated TS file is stamped with a header carrying the item count, an ISO generation timestamp, and the warning `DO NOT EDIT MANUALLY — regenerate with: npx tsx content/generate-content.ts`.

---

## 9. The Spaced Repetition Engine (SM-2)

**Files:** `server/srs/sm2.ts`, `server/srs/sm2.test.ts`

Flashcard review scheduling uses the SuperMemo 2 algorithm. Children respond with one of three self-assessments, which map to SM-2 quality scores:

| Child response | SM-2 quality |
|---|---|
| `knew` | 5 |
| `almost` | 3 |
| `learning` | 1 |

**Scheduling behavior (verified by unit tests):**

- Initial state: `easeFactor: 2.5`, `intervalDays: 0`, `repetitions: 0`
- First correct answer → interval 1 day, repetitions 1
- Second correct answer → interval 3 days, repetitions 2
- Third and beyond → `round(previousInterval × easeFactor)` — e.g. `round(3 × 2.5) = 8` days
- Any answer with quality below 3 → interval resets to 1 day, repetitions reset to 0

Exported functions: `calculateSM2`, `getInitialSM2State`, `mapResponseToQuality`, `getBucketFromSM2`.

Persistence is via the `FlashcardProgress` record, which stores `next_review_date`, `interval_days`, `ease_factor`, `repetitions`, and `last_result` per child per card.

---

## 10. The Database Schema

**File:** `drizzle/schema.ts` — MySQL via Drizzle ORM. Seventeen tables.

| Table | Purpose |
|---|---|
| `users` | Parent accounts |
| `userRoles` | Role assignments (admin, parent) |
| `children` | Child profiles |
| `childPlacement` | Grade-band placement results |
| `enrolledPaths` | Which domains a child is enrolled in |
| `dailyPlan` | The generated day-by-day plan |
| `lessonProgress` | Per-lesson four-phase completion tracking |
| `quizResults` | Score, total, attempt number, pass flag, parent-notified flag |
| `flashcardProgress` | SM-2 scheduling state per card |
| `watchHistory` | Video viewing log |
| `curatedVideos` | Vetted video library |
| `approvedChannels` | Parent-approved YouTube channels |
| `complianceLogs` | Date/domain/minutes/lessons — homeschool record-keeping |
| `alerts` | Parent notifications |
| `sponsors` | Sponsorship records |
| `featureFlags` | 14 runtime toggles |
| `lessonFeedback` | Star ratings and comments from the sixth lesson step |

Migrations live in `drizzle/` as `0000_simple_thunderbird.sql`, `0001_foamy_inertia.sql`, `0002_cultured_nuke.sql`, and `0003_enhanced_schema.sql`, with snapshots under `drizzle/meta/`. A repair script, `fix-schema.mjs`, exists to bring a drifted database back in sync via `ALTER TABLE`.

---

## 11. The API Layer

**Files:** `server/routers.ts` and `server/routers/`

Six tRPC routers: `children`, `learning`, `channels`, `parent`, `admin`, `stripe`.

### 11.1 The Learning Router (`server/routers/learning.ts`)

Every procedure is `protectedProcedure` — authentication is required for all curriculum access.

| Procedure | Function |
|---|---|
| `listPaths` | Enumerate a child's enrolled domains |
| `enrollPath` | Enroll a child in a domain |
| `unenrollPath` | Remove a domain enrollment |
| `listLessonProgress` | Fetch four-phase progress records |
| `updateLessonProgress` | Mark watch/do/apply/reflect completion |
| `listQuizResults` | Retrieve quiz history |
| `addQuizResult` | Record a quiz attempt; triggers parent alerts on failure |
| `listFlashcardProgress` | Fetch SM-2 state |
| `updateFlashcardProgress` | Apply SM-2 scheduling after a review |
| `listFeedback` | Retrieve lesson ratings |
| `addFeedback` | Submit star rating and comment |
| `getDomainRating` | Aggregate rating per domain |
| `getProgressSummary` | Rolled-up progress for dashboards and compliance |

---

## 12. The YouTube Channel Hub

**File:** `client/src/lib/types.ts` — `PRELOADED_CHANNELS` constant, 38 entries.

Channels are age-tagged as `toddler`, `preschool`, `k3`, or `all`. Parents approve, reorder, and add their own; the hub functions as the reward layer after focused learning.

### 12.1 Original 17 Channels

Ms. Rachel (toddler), Blippi (preschool), CoComelon (toddler), ChuChu TV (toddler), Gracie's Corner (toddler), Khan Academy Kids (k3), PBS KIDS (k3), Numberblocks (k3), Alphablocks (k3), SciShow Kids (k3), StoryBots (k3), Nat Geo Kids (k3), Learn Bright (k3), Homeschool Pop (k3), Scratch Garden (k3), Crash Course Kids (k3), Asher's Day (preschool).

### 12.2 21 Channels Added via Apify Research

Marked in source with the comment `// New channels from Apify research`: Sesame Street, SciShow Kids, Art for Kids Hub, Crash Course Kids, Cosmic Kids Yoga, ChuChu TV Nursery Rhymes & Kids Songs, Super Simple Songs, BabyBus, Mother Goose Club, Jack Hartmann Kids Music Channel, Gracie's Corner, Harry Kindergarten Music, Free School, Homeschool Pop, TheDadLab, BrainPOP, and additional entries — all stored with real YouTube channel IDs and `age_tag: 'k3'`.

Note that several entries duplicate names from the original 17 under different channel IDs (SciShow Kids, Crash Course Kids, Gracie's Corner, ChuChu TV, Homeschool Pop appear twice).

---

## 13. Accessibility & Differentiation Features

These are the mechanisms behind Poole Principle 5 ("Every Child is Different"), all modeled on the `Child` record:

- **`attention_span`** — `short` | `medium` | `long`, sets session pacing
- **`learning_style`** — `visual` | `hands-on` | `auditory` | `mixed`
- **`short_day_mode`** — boolean; swaps every activity to its `short_version`
- **`sensory_notes`** — free-text field for parent-recorded sensory considerations
- **`language`** — 17 supported languages: English, Spanish, French, German, Mandarin Chinese, Japanese, Korean, Portuguese (Brazilian), Arabic, Hindi, Bengali, Tagalog, Vietnamese, Italian, Russian, Swahili, Haitian Creole. Locale files ship for English, Spanish, and French (`client/src/i18n/locales/`); extraction tooling lives at `scripts/extract-i18n.ts`.
- **ASL integration** — every lesson carries an `asl_word` target sign
- **Movement breaks** — led by Chris the frog, to prevent burnout
- **`display_color` and `avatar_animal`** — per-child visual identity across the family plan

---

## 14. Compliance & Terminology Engineering

A deliberate two-commit sweep removed legally risky education language from every user-facing surface.

### 14.1 The Sweep

- **Commit `9459b9e`** — *"Terminology compliance update: replaced all user-facing 'curriculum' with legally safe language across 7 files (Landing, Upgrade, AdminLayout, AdminCurriculum, admin-store, Stripe products, index.html). Added legal disclaimer to footer."*
- **Commit `0ece364`** — *"Terminology & compliance update: replaced all user-facing 'curriculum' with legally safe language across 10+ files, expanded Terms of Service to 14 sections with COPPA, liability, Poole Method disclaimers, added supplemental learning disclaimer to Settings page, About page, and Landing footer."*

### 14.2 The Forbidden-Terms Rule

Encoded directly in the generator's header comment and enforced across the codebase:

> **Never use:** "curriculum", "lesson plan", "homeschool program", "accredited"
> **Always use:** supplemental / assistive framing

The word "curriculum" survives only in internal code identifiers (`AdminCurriculum.tsx`, `admin-store.ts`) and in this documentation — never in copy a parent or child reads.

### 14.3 Compliance Reporting

The `complianceLogs` table records date, domain, minutes spent, and lessons completed per child, surfaced through `client/src/pages/dashboard/Compliance.tsx` for homeschool record-keeping. The Terms explicitly permit users to reproduce these personal reports despite the broader IP restriction.

### 14.4 COPPA

Children's privacy compliance is addressed in the signup flow, the Privacy Policy (`client/src/pages/Privacy.tsx`), and Terms Section covering COPPA obligations. No child account holds an email; children exist only as sub-profiles under a verified parent account.

---

## 15. Commercial Structure Around the Content

### 15.1 Subscription Tiers (Final Pricing, Commit `7371f91`)

| Plan | Price |
|---|---|
| Gold Monthly | $7.99/mo |
| Gold Annual | $59.99/yr |
| Family Monthly | $12.99/mo |
| Family Annual | $99.99/yr |

Positioned to undercut ABCmouse ($14.99) and Kiddopia ($12.99) while matching Amazon Kids+ ($7.99). Implemented in `server/stripe/products.ts`, the Upgrade page with a monthly/annual toggle, the Landing pricing section, and the Stripe router.

### 15.2 Sponsorship Tiers (Commit `74aa9c6`)

| Tier | Price |
|---|---|
| Friend | $49/mo |
| Supporter | $149/mo |
| Champion | $399/mo |

Backed by an approve/reject/pause admin workflow, a revenue summary, tier badges on `SponsorCard`, a kid-safety rules section, and a tier-aware application form on `/sponsor-with-us`.

---

## 16. Build Timeline — Content-Relevant Commits

| Commit | Date | What It Did to the Content |
|---|---|---|
| `5997422` | 2026-04-07 | Initial project bootstrap |
| `1e8edfa` | 2026-04-07 | First complete K-3 application: 6 domains, lesson player (Watch/Do/Apply/Reflect), quizzes, flashcards, 17 preloaded YouTube channels. 99 source files, 10,029 lines. |
| `740f1c7` | 2026-04-07 | Theme song (vocal + instrumental) via Tone.js, AudioManager, splash screen, 9-character system with animated avatars, movement breaks with Chris the frog, About page introducing The Poole Method. 108 files, 12,611 lines. |
| `b99a457` | 2026-04-07 | Geographic scope correction (removed state-specific references), Family Plan multi-child system, CharacterHeadshot SVG components replacing emoji, admin panel including a curriculum page, sponsor system. 128 files, 16,255 lines. |
| `add6deb` | 2026-04-07 | 11-table database schema, 5 tRPC routers, 25+ procedures, `db.ts` query helpers |
| `c70e5dc` | 2026-04-07 | Full migration of 26+ page files from Zustand to tRPC + `useAuth` |
| `ea5d31e` | 2026-04-07 | 6 routers, Stripe checkout, webhook handler, Manus OAuth, 20/20 tests |
| `4ebc663` | 2026-04-07 | Content filtering by age group and subject on LearnHome, lesson feedback/rating system, progress visualization, `lessonFeedback` table. 24/24 tests. |
| `0a32660` | 2026-04-07 | Full six-step lesson player (Intro → Learn → Activity → Reflect → Quiz → Feedback), real content in all 6 domains, quiz interaction with correct/incorrect highlighting and explanations |
| `59caf30` | 2026-04-07 | Bundle optimization — main chunk 1,023KB → 442KB via manual code splitting into 6 lazy-loaded vendor chunks |
| `9459b9e` | — | First terminology compliance sweep (7 files) |
| `0ece364` | — | Second terminology sweep (10+ files), Terms expanded to 14 sections |
| **`bbfff8e`** | **2026-04-11** | **The major content commit: "Integrated Apify/Claude content: 48 new lessons (8 per domain), 60 new flashcards (10 per domain), 21 new YouTube channels. Total: 54 lessons, 110 flashcards, 38 preloaded channels."** |
| `e017330` | — | First pricing pass |
| `74aa9c6` | — | Sponsor system with three tiers |
| `7371f91` | — | Competitive pricing correction to final numbers |
| `59ed249` | — | Full app audit; database schema sync via ALTER TABLE; confirmed 54 lessons across 6 domains in the Learn view |
| `1465fd4` | — | Published-site auth fixes (trust proxy, cookie sameSite, OAuth redirect) |
| `4a187fe` | 2026-05-10 | Final feature implementation from handoff briefing |

---

## 17. Verification Status at Final Checkpoint

- **TypeScript:** zero errors (`tsc --noEmit`)
- **Unit tests:** 24/24 passing (Vitest)
- **E2E:** Playwright full-journey spec in place (`e2e/full-journey.spec.ts`)
- **Production build:** verified
- **Runtime:** zero server errors, zero browser console errors, zero failed network requests
- **Routes audited:** Landing, Login/OAuth, Dashboard, Child Detail, Channels, Compliance, Settings, Upgrade, Learn view, Lesson Player, Admin Panel (9 pages), Sponsor page

---

## 18. Known Gaps in the Content Layer

These are factual discrepancies between what the code claims and what the repository actually contains.

**1. Only one grade band has content.**
All 54 authored lessons carry `grade_band: 'grade-1'`. The `GradeBand` type defines five bands, `LearnHome` filters by age group, and the generator has full 30-theme template tables for pre-K, kindergarten, grade-2, and grade-3 — but no authored lessons exist for any of them. A pre-K or grade-3 child currently receives grade-1 content or an empty filter result.

**2. The generator's output was never committed.**
`content/generate-content.ts` and `content/seed-import.ts` both exist and are runnable, but `client/src/lib/generated-lessons.ts`, `client/src/lib/generated-flashcards.ts`, and the `content/json/` directory are all absent from the repository. The application imports only `SEED_LESSONS` and `SEED_FLASHCARDS` from `seed-data.ts`. The 600-lesson corpus has never been produced or wired in.

**3. The admin panel reports a 10× inflated count.**
`client/src/pages/admin/AdminCurriculum.tsx:26` displays *"540 lessons across 6 domains (The Poole Method)"*. The actual shipped count is 54. This appears to be either a decimal error or a figure carried over from a plan that was never executed.

**4. The generator covers four domains, not six.**
Its `DOMAINS` loop constant lists only `literacy`, `math`, `science`, `social-emotional`. There are no `SOCIAL_STUDIES_TEMPLATES` or `EXECUTIVE_FUNCTION_TEMPLATES` tables, so those two domains cannot be generated despite being listed in the file's own header comment.

**5. Generated flashcards are mostly placeholders.**
Only four of the twenty possible domain × grade-band combinations have authored flashcard sets (literacy pre-K, literacy grade-1, math pre-K, math grade-1). The remaining sixteen fall through to `"${domain} concept ${i+1}"` placeholder text.

**6. Generated quizzes are domain-agnostic.**
`generateQuizForTheme()` returns the same three structural questions regardless of domain, theme, or grade band — a theme-recall question, a "we can practice this every day" true/false, and a "best way to show what you learned" question. They test lesson attendance rather than content mastery, in contrast to the hand-authored quizzes which test actual skills.

**7. Duplicate YouTube channels.**
Five channels appear twice in `PRELOADED_CHANNELS` under different channel IDs: SciShow Kids, Crash Course Kids, Gracie's Corner, ChuChu TV, and Homeschool Pop.

---

## 19. File Reference Index

| Path | Lines | Contents |
|---|---|---|
| `client/src/lib/seed-data.ts` | 2,472 | `SEED_LESSONS` (54) and `SEED_FLASHCARDS` (110) — the shipped corpus |
| `client/src/lib/types.ts` | 306 | Complete data model, `DOMAINS`, `ALL_LANGUAGES` (17), `PRELOADED_CHANNELS` (38), `GUIDE_ANIMALS`, `CHILD_COLORS` |
| `client/src/lib/characters.ts` | 151 | Nine-character definitions with domain bindings and encouragement lines |
| `content/generate-content.ts` | 383 | Template tables, `generateLesson`, `generateQuizForTheme`, `getFlashcardTemplates`, generation loop |
| `content/seed-import.ts` | 73 | Export pipeline to TS and JSON artifacts |
| `client/src/pages/learn/LessonPlayer.tsx` | 329 | The six-step player |
| `client/src/pages/learn/LearnHome.tsx` | — | Domain selection with age-group and subject filtering |
| `client/src/pages/learn/QuizView.tsx` | — | Standalone quiz surface |
| `server/routers/learning.ts` | 195 | 13 tRPC procedures governing all curriculum access |
| `server/srs/sm2.ts` | — | SM-2 spaced repetition implementation |
| `server/srs/sm2.test.ts` | — | SM-2 unit tests |
| `drizzle/schema.ts` | 323 | 17-table MySQL schema |
| `client/src/pages/About.tsx` | 310 | Founder story and `POOLE_PRINCIPLES` |
| `client/src/pages/Terms.tsx` | — | 14-section Terms including Poole Method and IP clauses |
| `client/src/pages/dashboard/Compliance.tsx` | — | Homeschool compliance reporting |
| `client/src/pages/admin/AdminCurriculum.tsx` | — | Admin content overview |
| `fix-schema.mjs` | 103 | Database drift repair via ALTER TABLE |
| `e2e/full-journey.spec.ts` | — | Playwright end-to-end coverage |

---

## 20. One-Paragraph Summary

Gigi's Playhouse's learning content is a 54-lesson, 110-flashcard corpus covering six domains — literacy, math, science, social studies, social-emotional, and executive function — each fronted by its own character, structured under the five principles of The Poole Method™, and delivered through a fixed six-step player (Intro → Learn → Activity → Reflect → Quiz → Feedback). The lessons were written by Claude, the YouTube channel library and supporting research were harvested with Apify, and the whole thing was assembled on the Manus platform as a React 19 / TypeScript / tRPC / Drizzle / MySQL application with Stripe billing, Tailwind and Radix UI styling, Tone.js audio, i18next localization across 17 languages, and an SM-2 spaced-repetition engine driving flashcard review. A separate template-driven generator exists that could synthesize 600 lessons across all five grade bands from curated 30-theme scope-and-sequence tables, but its output was never committed — so the live application runs entirely on the hand-authored grade-1 corpus, and the admin panel's claim of 540 lessons overstates the real count by a factor of ten.

---

*End of document.*
