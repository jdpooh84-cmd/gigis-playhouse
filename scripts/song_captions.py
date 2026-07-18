#!/usr/bin/env python3
"""Turn a word-timestamped transcript into short, audio-synced caption lines.

Usage: python3 scripts/song_captions.py <transcript_json> <out_captions_json> [max_words] [max_chars]

Output: [[t0, t1, "TEXT"], ...] on the REAL audio timeline. Each line is shown exactly while
those words are sung, so the on-screen lyric matches the audio. Long sung phrases are split into
short karaoke-style lines (<= max_words / max_chars), each with its own [t0,t1] from the words it
contains. A tiny lead-in / hold-out is added for readability without overlapping the next line.
"""
import json, sys, re

def clean(w):
    return re.sub(r"\s+", " ", w).strip()

def main():
    tr = json.load(open(sys.argv[1]))
    out_path = sys.argv[2]
    max_words = int(sys.argv[3]) if len(sys.argv) > 3 else 6
    max_chars = int(sys.argv[4]) if len(sys.argv) > 4 else 30

    # flatten all words across segments, keeping segment boundaries as forced line breaks
    lines = []
    for seg in tr["segments"]:
        words = seg.get("words") or []
        if not words:
            t = clean(seg["text"])
            if t:
                lines.append([round(seg["start"], 3), round(seg["end"], 3), t])
            continue
        cur = []
        def flush():
            if not cur:
                return
            txt = clean(" ".join(w["w"] for w in cur))
            if txt:
                lines.append([round(cur[0]["s"], 3), round(cur[-1]["e"], 3), txt])
            cur.clear()
        for w in words:
            prospective = cur + [w]
            txt = clean(" ".join(x["w"] for x in prospective))
            # break on word/char budget, or a big sung gap (new musical phrase)
            gap = (w["s"] - cur[-1]["e"]) if cur else 0.0
            if cur and (len(prospective) > max_words or len(txt) > max_chars or gap > 0.9):
                flush()
                cur.append(w)
            else:
                cur.append(w)
        flush()

    # readability polish: min duration, small lead-in/hold-out, no overlap with next line
    LEAD, HOLD, MINDUR = 0.15, 0.25, 0.8
    polished = []
    for i, (t0, t1, txt) in enumerate(lines):
        a = max(0.0, t0 - LEAD)
        b = t1 + HOLD
        if b - a < MINDUR:
            b = a + MINDUR
        if i + 1 < len(lines):
            nxt = lines[i + 1][0] - 0.05
            if b > nxt:
                b = max(a + 0.4, nxt)
        polished.append([round(a, 3), round(b, 3), txt])

    json.dump(polished, open(out_path, "w"), indent=1)
    print("wrote %d caption lines -> %s" % (len(polished), out_path))
    for t0, t1, txt in polished:
        print("  [%7.2f-%7.2f] %s" % (t0, t1, txt))

if __name__ == "__main__":
    main()
