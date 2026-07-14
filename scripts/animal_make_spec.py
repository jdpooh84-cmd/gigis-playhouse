#!/usr/bin/env python3
"""Author the Move Like the Animal shot spec (20 equal shots across 9 song sections)."""
import json, os

DUR = 124.32
N = 20
SLOT = DUR / N  # 6.216s

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
         "rounded dimensional forms, warm natural daylight, gentle depth of field, friendly outdoor "
         "community yard / open plaza with warm earthy tones and bright accent colors, room to move, "
         "on-model, clear happy faces, theatrical quality. The kids PERFORM playful animal-inspired "
         "moves themselves (no real or scary animals). Absolutely NO text, no words, no letters, no "
         "captions, no signs anywhere in the frame. NOT 2D, NOT flat, NOT outlined, NOT storybook.")

# (section, cast, action, overlay word, kind)  kind: title|freeze|end|word
SHOTS = [
    # Intro (2)
    ("Intro","Sunny,Koda,Mia","step and bounce in place to a drum beat, clap to the groove, warm inviting smiles","Every animal's got a move!","title"),
    ("Intro","Sunny,Mimi,Leo","gesture invitingly to the camera, ready to start, cheerful","Come on, what is yours?","word"),
    # Verse 1 (3) elephant / monkey / frog
    ("Verse 1","Sunny,Bram,Mia","heavy elephant-style stomps, big controlled foot stamps, feeling the beat","STOMP your feet","word"),
    ("Verse 1","Koda,Leo,Pipa","swing arms side to side like a monkey swinging, playful","Swing your arms","word"),
    ("Verse 1","Sunny,Mimi,Mia","crouch down low then jump up high reaching for the sky, frog style","JUMP so high","word"),
    # Pre-chorus 1 (1)
    ("Pre-chorus 1","Sunny,Koda,Bram,Leo","ready listening stance, hands to ears to the drum, then start to move","Listen for the drum","word"),
    # Chorus 1 (2)
    ("Chorus 1","Sunny,Mia,Mimi,Leo","group picks animal moves, stomp and swing together, joyful","Move like the animal","word"),
    ("Chorus 1","Koda,Bram,Pipa,Sunny","jump and gentle spin, pick-your-animal energy, big smiles","Pick your animal and begin!","word"),
    # Verse 2 (3) penguin / crocodile / lion
    ("Verse 2","Mimi,Pipa","tiny wobbling penguin steps, wobble left and right, arms at sides","Wobble left","word"),
    ("Verse 2","Bram,Leo,Mia","sharp crocodile clap with both arms, clap twice","CLAP your hands","word"),
    ("Verse 2","Sunny,Koda,Mia","big lion stretch, arms opening out wide on every side","Lion stretches","word"),
    # Pre-chorus 2 (1)
    ("Pre-chorus 2","Mimi,Leo,Bram,Pipa","ready listening pose to the drum, building energy","Move your body","word"),
    # Chorus 2 (2)
    ("Chorus 2","Sunny,Mia,Koda,Pipa","group animal moves again, stomp swing jump, community energy","Move like the animal","word"),
    ("Chorus 2","Sunny,Mimi,Leo,Bram","gentle spin and jump together, go energy","Move like the animal — go!","word"),
    # Bridge (4) call & response animals
    ("Bridge","Sunny,Bram","big elephant stomps then monkey arm swings, call and response","Elephant — STOMP","word"),
    ("Bridge","Koda,Mia","crouch-and-jump like a frog then tiny penguin wobble","Frog — JUMP","word"),
    ("Bridge","Leo,Pipa","crocodile clap clap then wide lion stretch and gentle roar gesture","Lion — ROAR & stretch","word"),
    ("Bridge","Sunny,Mia,Koda,Mimi,Leo,Bram,Pipa","whole crew moving all together in the same space, big joyful finish","ALL TOGETHER!","freeze"),
    # Outro (2)
    ("Outro","Sunny,Mia,Koda,Mimi,Leo,Bram,Pipa","movement winds down, gentle swaying to the drum, calm happy poses","We gave our best","word"),
    ("Outro","Sunny,Mia,Koda,Mimi,Leo,Bram,Pipa","soft waves and little bows, warm goodnight, settling calm","Goodnight","end"),
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
        if kind=="freeze": ov.append([word,0.35,0.95,"freeze"])
        else: ov.append([word,0.14,0.90,"word"])
    if kind=="end": ov.append(["Goodnight",0.30,1.0,"end"])
    clips.append({"clip_id":"A%02d"%(i+1),"section":sec,"cast":cast.split(","),
                  "start":start,"end":end,"dur":round(SLOT,3),"kind":kind,"logo":logo,
                  "prompt":prompt,"overlays":ov})

spec={"song":"Move Like the Animal","audio":"_staging/audio/move-like-the-animal.mp3","duration":DUR,
      "n":N,"slot":round(SLOT,4),"out":"sunny-and-the-crew/song-shorts/Move-Like-the-Animal.mp4",
      "logo":"sunny-and-the-crew/brand/logo-sunny-and-the-crew.png","style":STYLE,"clips":clips}
os.makedirs("_staging/animal",exist_ok=True)
json.dump(spec,open("_staging/animal/shot_spec.json","w"),indent=2)
from collections import Counter
c=Counter()
for cl in clips:
    for n in cl["cast"]: c[n]+=1
print("shots:",len(clips),"slot=%.3fs"%SLOT,"total=%.1fs"%(len(clips)*SLOT))
print("cast coverage:",dict(c))
print("OK -> _staging/animal/shot_spec.json")
