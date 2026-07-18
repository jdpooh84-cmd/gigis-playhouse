#!/usr/bin/env python3
"""Transcribe a song's vocal audio to word-timestamped segments (runs in CI, open internet).

Usage: python3 scripts/transcribe.py <audio_in> <out_transcript_json> [model]

Uses faster-whisper (CTranslate2, CPU int8) — no torch, no GPU. The model is pulled from
HuggingFace on the CI runner (which has open egress; the dev sandbox's proxy blocks HF).
Emits {"segments":[{"start","end","text","words":[{"w","s","e"}]}]} on the REAL audio timeline,
so captions built from it line up with what is actually sung.
"""
import json, sys
from faster_whisper import WhisperModel

def main():
    audio = sys.argv[1]
    out   = sys.argv[2]
    model_name = sys.argv[3] if len(sys.argv) > 3 else "small"
    model = WhisperModel(model_name, device="cpu", compute_type="int8")
    segs, info = model.transcribe(
        audio, language="en", word_timestamps=True, vad_filter=False,
        beam_size=5, condition_on_previous_text=False,
        # a kids' song is short lines with pauses; keep segments tight
        no_speech_threshold=0.6,
    )
    out_segs = []
    for s in segs:
        words = [{"w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3)}
                 for w in (s.words or []) if w.word.strip()]
        out_segs.append({"start": round(s.start, 3), "end": round(s.end, 3),
                         "text": s.text.strip(), "words": words})
        print("[%7.2f-%7.2f] %s" % (s.start, s.end, s.text.strip()))
    json.dump({"segments": out_segs}, open(out, "w"), indent=1)
    print("\nwrote %d segments -> %s" % (len(out_segs), out))

if __name__ == "__main__":
    main()
