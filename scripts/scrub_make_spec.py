#!/usr/bin/env python3
"""Author the Scrub Scrub Scrub shot spec (15 shots, bath-time)."""
import json, os

DUR = 113.40
N = 15
SLOT = DUR / N  # ~7.56s

ELEM = {
    "Sunny": "a40e2d56-573f-4bf2-bdcd-28c64014fdb9",
    "Koda":  "7ce52e05-5bba-43f0-bb1e-8ca11974038c",
    "Mimi":  "7b005b4b-da34-4bac-908b-ceb76f9d6247",
    "Pipa":  "8849bdb4-d5a1-419d-9abc-c7e36188750c",
    "Bram":  "e80f7f4d-2563-4d1a-b950-196df45dcbf7",
    "Leo":   "ab579f47-e94f-406e-ae63-dd4fd6dd1b18",
    "Mia":   "36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590",
}

STYLE = ("polished stylized 3D CGI animated preschool feature look, soft subsurface skin shading, "
         "rounded dimensional forms, cozy child-friendly bathroom with a big warm bubble bath, warm "
         "soft yellow and teal lighting, colorful towels and friendly bath toys, fluffy bubbles, "
         "safe and gentle, kids seated in the tub, on-model, clear happy faces, theatrical quality. "
         "Simple safe controlled motion — NO wild splashing, NO standing in the tub, NO running. "
         "Absolutely NO text, no words, no letters, no captions anywhere in the frame. "
         "NOT 2D, NOT flat, NOT outlined, NOT storybook.")

STYLE_SOFT = STYLE.replace("clear happy faces", "calm relaxed sleepy-happy faces").replace(
    "warm soft yellow and teal lighting", "warm soft dim yellow lighting, cozy and calm")

# (section, cast, action, overlay word, kind)  kind: title|word|soft|end
SHOTS = [
    ("Intro","Sunny,Mimi","near a big bubbly tub, smiling and leaning happily into the warm bath, gentle","Bath time friends","title"),
    ("Intro","Sunny,Leo","in the bubble bath ready to start, cheerful, holding a bath toy","Scrub scrub scrub","word"),
    ("Verse 1","Mimi,Bram","close on kids' hands, scrubbing hands together with soapy bubbles, slow and clear","Scrub your hands","word"),
    ("Verse 1","Sunny,Leo","gently wash arms with soft circular motions, up and down, bubbles","Scrub your arms","word"),
    ("Hook 1","Sunny,Mimi,Leo","group bubble bath, happy scrubbing motions, holding up clean soapy hands","Wash wash wash","word"),
    ("Hook 1","Mimi,Bram,Mia","joyful scrubbing, bubbles everywhere, big smiles, squeaky clean gesture","Squeaky clean","word"),
    ("Verse 2","Leo,Mia","child gently scrubs tummy with bubbles, seated safely in the tub, giggly","Scrub your tummy","word"),
    ("Verse 2","Mimi,Sunny","toes wiggling above the water, counting on fingers, playful","Wiggle those toes — 1 2 3","word"),
    ("Hook 2","Sunny,Bram,Pipa","happy bubble play and toe wiggles, simple repeated scrubbing, smiles","Scrub scrub scrub","word"),
    ("Hook 2","Mimi,Leo,Koda","holding up clean hands, bubbles, squeaky clean celebration, gentle","Clean clean clean","word"),
    ("Bridge","Sunny,Mimi","SLOWER calm moment, gently pouring water from a safe cup over hands, bubbles rinsing away, relaxed","Rinse it off","soft"),
    ("Bridge","Sunny,Leo","water gently rinses shoulders, child looks relaxed and proud, soft warm light","That's the new YOU!","soft"),
    ("Final Hook","Sunny,Mimi,Bram","kids wrapped cozy in soft towels, gentle little bow / ta-da pose, warm smiles","Warm and cozy","word"),
    ("Final Hook","Sunny,Leo,Mia","snuggled in towels and pajamas, happy and calm, cozy lighting","Bath time was so much fun!","word"),
    ("Outro","Mimi","very quiet ending, child snuggled in a fluffy towel, a rubber duck resting nearby, soft dim warm light, still and calm","Goodnight bath time","end"),
]
assert len(SHOTS)==N, len(SHOTS)

def tokens(cast):
    return " ".join("[%s <<<%s>>>]"%(n, ELEM[n]) for n in cast.split(","))

clips=[]
for i,(sec,cast,action,word,kind) in enumerate(SHOTS):
    start=round(i*SLOT,3); end=round((i+1)*SLOT,3)
    st = STYLE_SOFT if kind in ("soft","end") else STYLE
    prompt="%s %s. %s"%(tokens(cast), action, st)
    ov=[]; logo=False
    if kind=="title": logo=True
    if word:
        ov.append([word, 0.15, 0.88, "end" if kind=="end" else ("soft" if kind=="soft" else "word")])
    clips.append({"clip_id":"S%02d"%(i+1),"section":sec,"cast":cast.split(","),
                  "start":start,"end":end,"dur":round(SLOT,3),"kind":kind,"logo":logo,
                  "prompt":prompt,"overlays":ov})

spec={"song":"Scrub Scrub Scrub","audio":"_staging/audio/scrub-scrub-scrub.mp3","duration":DUR,
      "n":N,"slot":round(SLOT,4),"out":"sunny-and-the-crew/song-shorts/Scrub-Scrub-Scrub.mp4",
      "logo":"sunny-and-the-crew/brand/logo-sunny-and-the-crew.png","style":STYLE,"clips":clips}
os.makedirs("_staging/scrub",exist_ok=True)
json.dump(spec,open("_staging/scrub/shot_spec.json","w"),indent=2)
from collections import Counter
c=Counter()
for cl in clips:
    for n in cl["cast"]: c[n]+=1
print("shots:",len(clips),"slot=%.3fs"%SLOT,"total=%.1fs"%(len(clips)*SLOT))
print("cast coverage:",dict(c))
print("OK -> _staging/scrub/shot_spec.json")
