#!/usr/bin/env python3
"""Author the Ten Little Fingers Folding Down shot spec (16 slow shots, lullaby)."""
import json, os

DUR = 160.824
N = 16
SLOT = DUR / N  # ~10.05s

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
         "rounded dimensional forms, VERY calm quiet bedtime lullaby mood, cozy dim nighttime "
         "bedroom, soft warm nightlight / lamp glow, deep blue and soft purple palette, low "
         "contrast, minimal gentle motion, sleepy relaxed faces, blanket and pillow visible, "
         "intimate close framing, on-model, theatrical quality. Slow and still — NO dancing, NO "
         "fast movement, NO bright colors, NO big expressions. Absolutely NO text, no words, no "
         "letters, no captions in the frame. NOT 2D, NOT flat, NOT outlined, NOT storybook.")

# (section, cast, action, overlay word, kind)  kind: title | soft | end
SHOTS = [
    # Intro (2) — ten fingers up
    ("Intro","Sunny,Mimi","sit together in a cozy dim bed, both slowly raise both hands with all ten fingers gently up, sleepy smiles","Ten little fingers","title"),
    ("Intro","Sunny,Leo","close on hands, ten fingers spread softly toward a warm nightlight glow","Ten little fingers","soft"),
    # Verse 1 (3) — 10 -> 9 -> 8
    ("Verse 1","Mimi","child's hands reaching gently upward toward an implied soft moon of light, ten fingers","Ten","soft"),
    ("Verse 1","Mimi","hands close-up, one finger slowly folds down leaving nine, calm","Nine little fingers","soft"),
    ("Verse 1","Leo","hands close-up, another finger folds down to eight, soft as rain, gentle","Eight little fingers","soft"),
    # Chorus (3) — folding to rest
    ("Chorus","Sunny,Mimi","hands resting near a blanket, fingers folding down slowly one at a time, sleepy","Count them as they fold","soft"),
    ("Chorus","Mimi","close on hands folding one by one, slow and low, quiet","One by one, slow and low","soft"),
    ("Chorus","Sunny,Leo","child settling lower into pillow, hands going down to rest, eyes heavy","Going down to rest","soft"),
    # Verse 2 (3) — 7..2
    ("Verse 2","Leo","hands close-up, fingers fold from seven to six, faint like stars, calm","Seven little fingers","soft"),
    ("Verse 2","Mimi","hands close-up, fold to five then four, quiet air, sleepy","Five little fingers","soft"),
    ("Verse 2","Sunny,Mimi","fingers fold to three then two, night is deep, barely awake","Two little fingers","soft"),
    # Bridge (3) — last finger, hands open flat, all resting
    ("Bridge","Mimi","extreme close-up on the one last finger, it slowly folds down, heavy and calm","One finger left","soft"),
    ("Bridge","Sunny,Mimi","both hands open gently and rest flat palms-down on a soft blanket, all fingers resting","All resting now","soft"),
    ("Bridge","Leo","child's face relaxed, eyes closing, resting peacefully, just like you","Just like you","soft"),
    # Outro (2) — asleep
    ("Outro","Sunny,Mimi","hands flat and still, children lying quiet and breathing softly, room mostly dark, faint glow","Sleep is coming","soft"),
    ("Outro","Mimi","nearly still image, child asleep in dim blue light, peaceful, no movement","Sleep is here","end"),
]
assert len(SHOTS)==N, len(SHOTS)

def tokens(cast):
    return " ".join("[%s <<<%s>>>]"%(n, ELEM[n]) for n in cast.split(","))

clips=[]
for i,(sec,cast,action,word,kind) in enumerate(SHOTS):
    start=round(i*SLOT,3); end=round((i+1)*SLOT,3)
    prompt="%s %s. %s"%(tokens(cast), action, STYLE)
    ov=[]; logo=False
    if kind=="title": logo=True
    if word:
        # soft overlays appear gently mid-shot and linger
        ov.append([word, 0.16, 0.86, "end" if kind=="end" else "soft"])
    clips.append({"clip_id":"T%02d"%(i+1),"section":sec,"cast":cast.split(","),
                  "start":start,"end":end,"dur":round(SLOT,3),"kind":kind,"logo":logo,
                  "prompt":prompt,"overlays":ov})

spec={"song":"Ten Little Fingers Folding Down","audio":"_staging/audio/ten-little-fingers.mp3","duration":DUR,
      "n":N,"slot":round(SLOT,4),"out":"sunny-and-the-crew/song-shorts/Ten-Little-Fingers-Folding-Down.mp4",
      "logo":"sunny-and-the-crew/brand/logo-sunny-and-the-crew.png","style":STYLE,"clips":clips}
os.makedirs("_staging/ten",exist_ok=True)
json.dump(spec,open("_staging/ten/shot_spec.json","w"),indent=2)
from collections import Counter
c=Counter()
for cl in clips:
    for n in cl["cast"]: c[n]+=1
print("shots:",len(clips),"slot=%.3fs"%SLOT,"total=%.1fs"%(len(clips)*SLOT))
print("cast coverage:",dict(c))
print("OK -> _staging/ten/shot_spec.json")
