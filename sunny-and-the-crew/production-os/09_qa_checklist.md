# QA Checklist (run before every delivery)
TIMING: total within format band (5-8 std / 10-15 ext); no gaps/overlaps on timeline; all non-exempt clips 3-5s; audio starts at exact planned timecode; no silent black frames.
SYNC: chorus visuals land on actual chorus timestamps (ear-check the boundaries flagged low-confidence in song_sections.json); count-in leads into song downbeat; sting hit on logo bounce.
CONTENT: one lesson only; object-first order verified; warm-mistake beat present; every [3-SECOND PAUSE] is truly ~3s and silent; movement cue each chorus; take-home challenge present; viewer praised by name-of-action ("you said A").
CHARACTERS: every character on-model vs characters.json element; Mimi smallest / Nana tallest in every ensemble; Rena's smudge left cheek; Mayor Mary auburn; no Bella+Gabriel shot; no clip used twice (job-ID uniqueness check).
VISUAL SAFETY: no dark frames, no harsh shadow, no looming angle, palette compliance, motifs used per rules (Heart Pop <=1).
TECH: 1280x720/30fps h264 + AAC, -14 LUFS, faststart; file named per convention; masters in repo + Drive FINALS; tracker updated.

## Automated gate (runs before any human QA)
`python3 scripts/pipeline_validate.py` must exit 0 — CI runs it on every push
(.github/workflows/pipeline-validate.yml). Human QA starts only from a green validator.

PACING (locked 2026-07-13): every movement clip is spot-checked against the canonical reference clips assets/demo_jumpclap/{C4_song_clap_beatmatched,C2_bounce,C5_reflection}.mp4 (Drive 1JXUWWKPCQKE3mXn-9nzg1gWPCm1RShye / 1j_Ic9GS31AaVWxhwSVY3hOTLQT7-s3U1 / 17lKEI2Huisjepz-7fcAee53I4vJruxZP). FLAG+regen if a jump looks slow/floaty (airtime > ~1.0s), a clap/gesture is slower than reference, or tempo (100 BPM), reaction time, or pause length drifts from the references. See production-os/25 section 8.
