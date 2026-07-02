# Apify Research Plan
## Gigi's Playhouse — Competitor Intelligence Spec

---

## OBJECTIVE

Scrape YouTube nursery rhyme channels to extract:
1. Title patterns that drive high view counts
2. Duration distributions for top-performing videos
3. Upload frequency patterns
4. Thumbnail signals (text, character count, emotion)
5. Scenario type frequency (what topics dominate)

---

## PHASE 1: CHANNEL LIST TARGETING

### Seed Channels to Research
Target channels with similar format (animated nursery rhymes, toddler content):

```json
{
  "target_channels": [
    "UCbCmjCuTUZos6Inko4u57UQ",
    "UCBcRF18a7Qf58cCRy5xuWwQ", 
    "UC0wfDsVfO3LCHALs4p9ZiXQ",
    "UCZd8-oGBdMaRRqbzNnfFXgg",
    "UC5-ixpj8DioN_sTe3E5GZSA"
  ],
  "search_keywords": [
    "nursery rhymes for toddlers",
    "kids songs 2024",
    "children's songs animated",
    "baby songs nursery rhymes",
    "toddler learning songs"
  ]
}
```

**Note:** If channel IDs are unavailable, run keyword search for top channels first using Apify YouTube Search Scraper, then pivot to channel scraping.

---

## PHASE 2: APIFY ACTOR SELECTION

### Primary Actor: YouTube Scraper
**Actor ID:** `bernardo/youtube-scraper` or `apify/youtube-scraper`

**Search on Apify Store for:** "YouTube channel scraper" — select actor with highest usage count.

### Input Configuration

```json
{
  "startUrls": [
    {"url": "https://www.youtube.com/@[CHANNEL_HANDLE]/videos"},
    {"url": "https://www.youtube.com/@[CHANNEL_HANDLE_2]/videos"}
  ],
  "maxResults": 100,
  "scrapeType": "videos",
  "sortVideosBy": "popular",
  "proxy": {
    "useApifyProxy": true,
    "apifyProxyGroups": ["RESIDENTIAL"]
  },
  "maxConcurrency": 5
}
```

### For Search-Based Discovery

```json
{
  "searchQueries": [
    "nursery rhymes toddlers animated 2024",
    "feel better song kids animated",
    "sick baby nursery rhyme",
    "sharing toys song toddler animated",
    "wheels on the bus new version"
  ],
  "maxResults": 50,
  "datePublishedAfter": "2022-01-01",
  "videoDuration": "medium"
}
```

---

## PHASE 3: OUTPUT FIELDS REQUIRED

Every scraped video record must include these fields:

```json
{
  "video_id": "YouTube video ID",
  "title": "Full video title",
  "channel_name": "Channel name",
  "channel_id": "Channel ID",
  "view_count": 1500000,
  "like_count": 25000,
  "comment_count": 1200,
  "duration_seconds": 312,
  "duration_formatted": "5:12",
  "publish_date": "2023-08-15",
  "thumbnail_url": "https://...",
  "description_first_200": "First 200 chars of description",
  "tags": ["nursery rhymes", "kids songs"],
  "category": "Education",
  "made_for_kids": true,
  "url": "https://www.youtube.com/watch?v=..."
}
```

---

## PHASE 4: DATASET STRUCTURE

Save scraped data to Apify dataset, then export as JSON/CSV.

### File: `research/competitor-data-raw.json`
Raw scraped records — all fields, all videos.

### File: `research/competitor-data-processed.json`
Cleaned and enriched records with computed fields:

```json
{
  "video_id": "...",
  "title": "...",
  "title_word_count": 8,
  "title_has_character_name": true,
  "title_has_nursery_rhymes": true,
  "title_has_question_hook": false,
  "title_hook_type": "scenario_statement",
  "duration_seconds": 312,
  "duration_bucket": "5-7min",
  "view_count": 1500000,
  "view_tier": "viral",
  "views_per_day": 8200,
  "days_since_publish": 183,
  "scenario_type": "wheels_on_bus",
  "has_characters_in_title": true,
  "channel_name": "...",
  "publish_date": "2023-08-15"
}
```

---

## PHASE 5: COMPUTED INSIGHTS

After scraping, run these analyses on the dataset:

### 5.1 — Duration Distribution
```
Group by duration_bucket:
- under-2min
- 2-4min
- 4-6min
- 6-8min
- 8-12min
- over-12min

For each bucket: count videos, sum views, avg views per video
→ Identifies optimal runtime target
```

### 5.2 — Title Pattern Analysis
```
For each video title:
- Count words
- Detect keyword presence: "Nursery Rhymes", "Kids Songs", "Baby", character names
- Detect format: question hook vs statement vs lyric hook
- Detect "|" pipe separator usage

→ Identifies most common title formula
```

### 5.3 — Scenario Type Frequency
```
Manually tag each video with scenario_type from this list:
sick_day, animal_friend, sharing, boo_boo, colors, counting, 
bedtime, wheels_on_bus, finger_family, alphabet, holiday

→ Rank scenario types by total view count (not just count)
→ Identifies most watched scenario types
```

### 5.4 — Upload Frequency
```
Per channel:
- Videos per week average
- Gap between high-view videos
- Weekend vs weekday upload timing

→ Identifies optimal upload cadence
```

### 5.5 — Tag Analysis
```
Aggregate all tags across dataset
Count frequency of each tag
Cross-reference with view count averages per tag

→ Identifies which tags correlate with higher views
```

---

## PHASE 6: OUTPUT DOCUMENTS

### `research/competitor-insights.md`
Written summary of findings. Must answer:
1. What is the optimal video duration? (specific answer)
2. What title formula appears most in top-100 videos?
3. What are the top 5 scenario types by total views?
4. What tags are most common in highest-view videos?
5. What is the average upload frequency of top channels?

### `research/concept-matrix.md`
Based on competitor insights, generate a ranked matrix:

| Rank | Concept Slug | Scenario Type | View Potential | Production Difficulty | Priority |
|------|-------------|---------------|---------------|----------------------|----------|
| 1 | sick-song-v1 | sick_day | High | Low | FIRST |
| 2 | sharing-toys-v1 | sharing | High | Low | SECOND |
| ... | | | | | |

---

## PHASE 7: APIFY SCHEDULE (RECURRING)

Run this scrape once per month to track:
- New high-performing videos in the space
- Trending topic shifts
- New competitor channels

**Make.com integration:** Trigger monthly Apify run via Make.com webhook, output goes to Google Drive or Airtable for review.

---

## PHASE 8: QUICK-START (24-HOUR VERSION)

If time is limited for research, use this minimal approach:

1. Go to Apify.com → Store → Search "YouTube scraper"
2. Select top-rated actor
3. Input these 3 URLs manually:
   - YouTube search results for "feel better song for toddlers"
   - YouTube search results for "sick baby nursery rhyme"  
   - YouTube search results for "nursery rhymes animated toddler"
4. Set maxResults: 25 per search
5. Run, export as CSV
6. Sort by view_count descending
7. Review top 10 titles — note patterns
8. Move forward with GP-001 concept (already confirmed)
9. Do full research after first video publishes

**Time estimate:** 45 minutes for quick research, 3–4 hours for full analysis.
