# Animation QA Analyzer

Strict frame-by-frame QA service for children's animation videos.
Extracts keyframes at timeline event boundaries, then evaluates them with Claude vision.

## What it checks

| Rule | Severity | Description |
|------|----------|-------------|
| `FREEZE_IMMEDIACY` | critical | ALL body motion stops within 1 frame of "FREEZE!" lyric |
| `LYRIC_ACTION_SYNC` | critical | Body action starts on the exact beat of each command lyric |
| `MOUTH_SYNC` | major | Mouth open while singing, closed during rests (≤2 frame drift) |
| `ACTION_DURATION` | major | Actions last for the full lyric phrase and stop on phrase end |
| `NO_IDLE_MOTION` | critical | Zero body drift or sway during any FREEZE event |
| `EXAGGERATION` | major | Every action is visually large and readable by a 4-year-old |

## Output schema (`schemaVersion: "1.0"`)

```json
{
  "schemaVersion": "1.0",
  "overall": "PASS",
  "summary": "All 42 checks passed across 76 keyframes.",
  "findings": [
    {
      "event_id": "h1_freeze1",
      "timestamp_start": 16.36,
      "timestamp_end": 17.45,
      "lyric": "FREEZE!",
      "category": "FREEZE_IMMEDIACY",
      "severity": "critical",
      "pass_or_fail": "PASS",
      "correction_note": "OK — body fully stopped within 1 frame."
    }
  ]
}
```

## Input

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `videoUrl` | string | yes | — | Public HTTPS URL to MP4 (no auth redirect) |
| `anthropicApiKey` | string | yes | — | Anthropic API key for Claude vision |
| `timelineJson` | object | no | — | Full `timeline.json` events object for grounding |
| `modelName` | string | no | `claude-haiku-4-5-20251001` | Claude model; use `claude-sonnet-5` for higher accuracy |
| `expectedSchemaVersion` | string | no | `1.0` | Guards against actor version drift |
| `keyframeIntervalSec` | number | no | `2.0` | Baseline scan interval (seconds) |
| `maxKeyframes` | number | no | `80` | Hard cap on extracted frames |
| `frameWidth` | number | no | `640` | Width to resize each frame before sending to LLM |
| `batchSize` | number | no | `10` | Frames per API call |

## Deployment

```bash
# Install Apify CLI
npm install -g apify-cli

# Authenticate
apify login

# Deploy (from this directory)
cd preschool-animation/apify-actor
apify push

# Note the actor ID from the output (e.g. "your-username/animation-qa-analyzer")
export APIFY_QA_ACTOR_ID="your-username/animation-qa-analyzer"
```

## Running via REST API

```bash
# Synchronous run — waits for completion, returns dataset items directly
curl -s -X POST \
  "https://api.apify.com/v2/acts/${APIFY_QA_ACTOR_ID}/run-sync-get-dataset-items?token=${APIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "videoUrl": "https://example.com/draft.mp4",
    "anthropicApiKey": "sk-ant-...",
    "timelineJson": { "_meta": { "fps": 30, "duration_sec": 159 }, "events": [] },
    "modelName": "claude-haiku-4-5-20251001",
    "expectedSchemaVersion": "1.0"
  }'
```

Expected response (array of dataset items):
```json
[
  {
    "schemaVersion": "1.0",
    "overall": "PASS",
    "summary": "...",
    "findings": [...]
  }
]
```

## Model recommendation

- **`claude-haiku-4-5-20251001`** — default. Fast and cost-effective; sufficient for detecting gross freeze failures, wrong actions, and missing exaggeration.
- **`claude-sonnet-5`** — higher accuracy. Recommended for final release gate runs where subtle timing drift and partial mouth sync matter.

## Local development

```bash
# Create .actor/input.json with your test input
cat > .actor/input.json <<EOF
{
  "videoUrl": "https://...",
  "anthropicApiKey": "sk-ant-...",
  "modelName": "claude-haiku-4-5-20251001"
}
EOF

# Run locally (requires apify-cli)
apify run
```
