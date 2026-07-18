#!/usr/bin/env python3
"""Turn a word-timestamped transcript into short, audio-synced caption lines.

Usage: python3 scripts/song_captions.py <transcript_json> <out_captions_json> [max_chars] [max_words]

Output: [[t0, t1, "TEXT"], ...] on the REAL audio timeline. Each line is shown exactly while
those words are sung, so the on-screen lyric matches the audio.

Segment-first: whisper already returns natural sung phrases, so each segment becomes ONE caption
line when it fits the width budget. Only genuinely long segments are split by word timestamps into
balanced chunks — and never in a way that leaves a 1-2 word orphan dangling on its own line.
"""
import json, sys, re

def clean(w):
    return re.sub(r"\s+", " ", w).strip()

def line_break_words(words):
    """Split a segment's words into sung LINES at internal capitalized words.

    These song transcripts capitalize the first word of every sung line, so a
    capitalized multi-letter word mid-segment marks a new line. Splitting there
    keeps each caption a whole lyric phrase instead of orphaning a trailing word
    ('...our back Hands' / '...and rest Cat'). Single capital letters (pose cues
    like 'V', pronoun 'I') never start a line. Songs without this capitalization
    simply yield one line per segment — same as before.
    """
    sub, cur = [], []
    for i, w in enumerate(words):
        tok = w["w"].strip()
        letters = re.sub(r"[^A-Za-z]", "", tok)
        starts_new = (i > 0 and len(letters) > 1 and letters[:1].isupper())
        if starts_new and cur:
            sub.append(cur); cur = []
        cur.append(w)
    if cur:
        sub.append(cur)
    return sub

def comma_split(words, max_chars, max_words):
    """Split a too-long line at the comma nearest its middle (a natural phrase
    boundary), recursing until each piece fits. Falls back to a balanced word
    split when there is no usable comma. Keeps captions from breaking mid-clause.
    """
    txt = clean(" ".join(w["w"] for w in words))
    if len(txt) <= max_chars and len(words) <= max_words:
        return [words]
    # candidate break points = right after a word that ends in a comma
    mid = len(words) / 2.0
    commas = [i for i, w in enumerate(words[:-1]) if w["w"].rstrip().endswith(",")]
    if commas:
        j = min(commas, key=lambda i: abs(i + 1 - mid))
        left, right = words[:j + 1], words[j + 1:]
        return comma_split(left, max_chars, max_words) + comma_split(right, max_chars, max_words)
    return split_words(words, max_chars, max_words)

def split_words(words, max_chars, max_words):
    """Balanced split of a long word list into chunks, avoiding tiny orphans."""
    n = len(words)
    # how many chunks do we need to respect the budget?
    import math
    txt = clean(" ".join(w["w"] for w in words))
    k = max(1, math.ceil(len(txt) / max_chars), math.ceil(n / max_words))
    if k <= 1:
        return [words]
    # even split by word count so no chunk is far smaller than the others (kills orphans)
    per = math.ceil(n / k)
    chunks = [words[i:i + per] for i in range(0, n, per)]
    # if the last chunk is a lone orphan, fold it back into the previous chunk
    if len(chunks) > 1 and len(chunks[-1]) < 2:
        chunks[-2] += chunks[-1]
        chunks.pop()
    return chunks

def main():
    tr = json.load(open(sys.argv[1]))
    out_path = sys.argv[2]
    max_chars = int(sys.argv[3]) if len(sys.argv) > 3 else 40
    max_words = int(sys.argv[4]) if len(sys.argv) > 4 else 8

    lines = []
    for seg in tr["segments"]:
        text = clean(seg["text"])
        if not text:
            continue
        words = seg.get("words") or []
        # whole segment fits (or we have no word timings) -> one clean caption line
        if len(text) <= max_chars or not words:
            lines.append([round(seg["start"], 3), round(seg["end"], 3), text])
            continue
        # long segment -> first break into whole sung LINES at internal capitalized
        # words (these transcripts capitalize each new line), so a caption never
        # starts mid-clause or orphans a trailing word. Then split any line that is
        # STILL too long at sentence punctuation, then by balanced word count.
        groups = []
        for ln in line_break_words(words):
            sentence, sub = [], []
            for w in ln:
                sentence.append(w)
                if w["w"].rstrip().endswith((".", "?", "!")):
                    sub.append(sentence); sentence = []
            if sentence:
                sub.append(sentence)
            groups.extend(sub)
        for g in groups:
            gtext = clean(" ".join(w["w"] for w in g))
            if len(gtext) <= max_chars:
                lines.append([round(g[0]["s"], 3), round(g[-1]["e"], 3), gtext])
            else:
                for ch in comma_split(g, max_chars, max_words):
                    if ch:
                        lines.append([round(ch[0]["s"], 3), round(ch[-1]["e"], 3),
                                      clean(" ".join(w["w"] for w in ch))])

    # readability polish: min duration, small lead-in/hold-out, no overlap with next line
    LEAD, HOLD, MINDUR = 0.15, 0.30, 0.9
    polished = []
    for i, (t0, t1, txt) in enumerate(lines):
        a = max(0.0, t0 - LEAD)
        b = t1 + HOLD
        if b - a < MINDUR:
            b = a + MINDUR
        if i + 1 < len(lines):
            # the next line becomes visible at its own displayed start (its raw
            # start pulled earlier by LEAD). Trim THIS line to end before that, so
            # two captions are never on screen at once (no overlapping render).
            nxt = (lines[i + 1][0] - LEAD) - 0.05
            if b > nxt:
                b = max(a + 0.4, nxt)
        polished.append([round(a, 3), round(b, 3), txt])

    json.dump(polished, open(out_path, "w"), indent=1)
    print("wrote %d caption lines -> %s" % (len(polished), out_path))
    for t0, t1, txt in polished:
        print("  [%7.2f-%7.2f] %s" % (t0, t1, txt))

if __name__ == "__main__":
    main()
