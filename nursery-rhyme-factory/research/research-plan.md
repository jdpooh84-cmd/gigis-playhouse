# Research Plan
## Gigi's Playhouse — Competitor Intelligence Strategy

---

## RESEARCH OBJECTIVES

1. Confirm optimal video duration for nursery rhyme channel
2. Identify highest-performing scenario types by view count
3. Extract title formula patterns from top-performing videos
4. Build a ranked concept matrix from data (not assumptions)
5. Identify which tags correlate with search discovery

---

## PHASE 1: APIFY SCRAPE (30–45 minutes)

See `apify/apify-scrape-spec.md` for complete actor configuration.

### Quick-start for Day 1

Search these terms in Apify YouTube Scraper:
1. `"nursery rhymes for toddlers"` — top 25 results
2. `"feel better song kids"` — top 25 results
3. `"sick baby song children"` — top 25 results
4. `"sharing song preschool"` — top 25 results

Export as CSV. Sort by view_count descending.

---

## PHASE 2: PERPLEXITY RESEARCH (20 minutes)

Run these queries in Perplexity:

### Query 1: Trend validation
```
What are the most popular nursery rhyme video topics for toddlers on YouTube in 2024-2025? 
Focus on animated children's content. What themes get the most views?
```

### Query 2: Duration research
```
What is the optimal YouTube video length for nursery rhymes and children's songs for toddlers ages 2-5?
What does viewer retention data suggest about video length for this demographic?
```

### Query 3: SEO research
```
What are the best YouTube SEO tags and keywords for a new nursery rhyme channel for toddlers?
What long-tail keywords have high search volume and low competition in children's content?
```

### Query 4: Title research
```
What YouTube title formats work best for children's nursery rhyme channels?
Give examples of high-performing video titles from top animated nursery rhyme channels.
```

---

## PHASE 3: MANUAL ANALYSIS (15–30 minutes)

Visit YouTube directly and observe (don't need to scrape, just look):

1. Search "sick day nursery rhyme for toddlers"
   - Note: top 5 titles, view counts, thumbnails
   - What colors dominate thumbnails?
   - What expressions do the characters have?
   - Are there text overlays on thumbnails?

2. Search "feel better song for kids"
   - Same observations
   - Note: which videos have the most comments?

3. Check the "Up Next" suggestions when watching a top video
   - These are algorithmically related — what topics keep appearing?

Record observations in `research/manual-observations.md`

---

## PHASE 4: SYNTHESIZE INTO CONCEPT MATRIX

Using findings from Phases 1–3, update the concept matrix:

File: `research/concept-matrix.md`

Criteria for ranking:
1. **View potential** (based on competitor view counts for similar content)
2. **Scenario universality** (how many parents/children relate to this scenario)
3. **Production simplicity** (fewer unique assets = higher priority)
4. **Title searchability** (does this scenario have searchable keywords?)
5. **Suno music fit** (does this emotional tone translate well to audio?)

---

## PERIODIC RESEARCH (Monthly)

After first video is published:

1. Re-run Apify scrape on competitor channels
2. Check your own YouTube Analytics:
   - Which traffic sources work (search, suggested, browse)
   - Which tags are bringing impressions
   - Audience retention curve — where do viewers drop off?

3. Run new Perplexity query:
   ```
   What nursery rhyme and children's song topics are trending on YouTube this month?
   Are there any emerging formats or themes getting high view counts?
   ```

4. Update concept matrix with new rankings
5. Run Make.com scenario for next priority concept

---

## RESEARCH OUTPUT FILES

| File | Contents | Owner |
|------|----------|-------|
| `research/competitor-data-raw.json` | Apify scraped data | Apify auto |
| `research/competitor-data-processed.json` | Cleaned data with computed fields | Claude Code |
| `research/competitor-insights.md` | Written summary of findings | Claude Code |
| `research/concept-matrix.md` | Ranked 20-concept list | Claude Code |
| `research/manual-observations.md` | Handwritten notes from YouTube browsing | Human |
| `research/perplexity-notes.md` | Saved Perplexity responses | Human |

---

## WHAT TO DO IF RESEARCH CONTRADICTS THE PLAN

If Apify data shows that sick-day content underperforms:
1. Note the finding in `competitor-insights.md`
2. Check: are the low-performing sick-day videos poorly produced, or is the category weak?
3. If category is genuinely weak: pivot to #2 priority concept from matrix
4. GP-001 brief and lyrics still work as a template — just swap scenario
5. Do NOT abandon the pipeline — only change the input concept

The pipeline is more valuable than any single concept choice.
