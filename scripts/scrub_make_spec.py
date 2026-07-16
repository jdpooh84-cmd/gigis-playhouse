#!/usr/bin/env python3
"""Author the Scrub Scrub Scrub shot spec (15 shots).

Wholesome, all-ages presentation: the crew stays FULLY DRESSED and demonstrates a happy
wash-up routine — scrubbing their own hands and arms at a sink, and washing a rubber-duck
bath toy for the tummy/toes lines. Bubbles, suds, toys and towels carry the bath-time feel;
no child is ever shown bathing. Teaches the same routine kids can copy.
"""
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
         "rounded dimensional forms, bright cheerful child-friendly bathroom, warm soft yellow and "
         "teal lighting, a sink and counter with a bowl of fluffy soap bubbles, a bubbly toy tub and "
         "colorful bath toys as props, a yellow rubber duck, colorful hanging towels. The kids are "
         "FULLY DRESSED in normal colorful clothes with sleeves; they cheerfully demonstrate a hand-"
         "washing and toy-washing routine. No child is in a bath, no bare skin, everyone stays fully "
         "clothed the whole time. Simple safe controlled motion — NO wild splashing, NO running. "
         "On-model, clear happy faces, theatrical quality. Absolutely NO text, no words, no letters, "
         "no captions anywhere in the frame. NOT 2D, NOT flat, NOT outlined, NOT storybook.")

STYLE_SOFT = STYLE.replace("clear happy faces", "calm relaxed happy faces").replace(
    "warm soft yellow and teal lighting", "warm soft gentle yellow lighting, cozy and calm")

# (section, cast, action, overlay word, kind)  kind: title|word|soft|end
SHOTS = [
    ("Intro","Sunny,Mimi","gather happily in the bright bathroom beside a tub full of bubbles and toys, fully dressed, waving and holding a yellow rubber duck","Bath time friends","title"),
    ("Intro","Sunny,Leo","fully dressed at the sink, rolling up their sleeves, holding soap and a rubber duck, cheerful and ready to wash","Scrub scrub scrub","word"),
    ("Verse 1","Mimi,Bram","close-up scrubbing their own hands together with soapy white suds at the sink, fully dressed, slow and clear","Scrub your hands","word"),
    ("Verse 1","Sunny,Leo","wash their forearms with soapy bubbles, sleeves rolled up, gentle up-and-down circular motions","Scrub your arms","word"),
    ("Hook 1","Sunny,Mimi,Leo","group at the sink doing happy scrubbing motions, holding up clean soapy hands, bubbles, fully dressed","Wash wash wash","word"),
    ("Hook 1","Mimi,Bram,Mia","hold up clean soapy hands covered in fluffy bubbles, big smiles, squeaky-clean gesture, fully dressed","Squeaky clean","word"),
    ("Verse 2","Leo,Mia","wash a yellow rubber duck toy in a small bubbly basin, gently scrubbing the toy duck's tummy with a soft sponge, fully dressed, giggly","Scrub your tummy","word"),
    ("Verse 2","Mimi,Sunny","wash the rubber duck toy's little feet and wiggle them, counting on their fingers, playful, dressed at the basin","Wiggle those toes — 1 2 3","word"),
    ("Hook 2","Sunny,Bram,Pipa","happy scrubbing of hands and the toy duck with a soapy washcloth, bubbles, smiles, fully dressed","Scrub scrub scrub","word"),
    ("Hook 2","Mimi,Leo,Koda","hold up clean hands and the clean shiny rubber duck, bubbles, squeaky-clean celebration, dressed","Clean clean clean","word"),
    ("Bridge","Sunny,Mimi","SLOWER calm moment, gently rinse soapy hands and the rubber duck under a soft tap, bubbles rinsing away, relaxed, fully dressed","Rinse it off","soft"),
    ("Bridge","Sunny,Leo","hold up the shiny clean rubber duck proudly, soft warm light, relaxed and happy, fully dressed","That's the new YOU!","soft"),
    ("Final Hook","Sunny,Mimi,Bram","dry their hands and wrap the clean rubber duck in a fluffy towel, gentle little bow / ta-da pose, warm smiles, dressed","Warm and cozy","word"),
    ("Final Hook","Sunny,Leo,Mia","cozy in comfy pajamas holding the clean duck wrapped in a towel, happy and calm, warm light","Bath time was so much fun!","word"),
    ("Outro","Mimi","very calm ending, the clean rubber duck resting on a folded towel beside a cozy dressed child, soft warm light, still and calm","Goodnight bath time","end"),
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
print("OK -> _staging/scrub/shot_spec.json (fully-dressed wash-up routine, toy-washing for tummy/toes)")
