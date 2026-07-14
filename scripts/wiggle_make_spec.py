#!/usr/bin/env python3
"""Author the Wiggle Wake Up shot spec (20 equal shots across 8 song sections).

No heavy analysis: the song is 144.552s, split into 20 equal slots. Each shot gets
a cast (from the 7 locked crew), an action prompt, and clean text overlays (rendered
by the assembler, never baked into the AI frame). Cozy morning playroom setting.
"""
import json, os

DUR = 144.552
N = 20
SLOT = DUR / N  # 7.2276s

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
         "rounded dimensional forms, warm morning key light, gentle depth of field, cozy indoor "
         "playroom / living room with soft golden morning sunlight through a big window, warm yellow "
         "and pastel palette, on-model, clear happy faces, theatrical quality. Absolutely NO text, "
         "no words, no letters, no captions, no signs anywhere in the frame. NOT 2D, NOT flat, "
         "NOT outlined, NOT storybook.")

# 20 shots: (section, cast, action, [overlay words], kind)
# kind: "title" adds the intro title card; "freeze" = big FREEZE; "end" = THE END card; else "word"
SHOTS = [
    # Intro (2)
    ("Intro","Sunny,Mimi,Leo","gently hum and sway in place, rubbing sleepy eyes, soft morning stretch, warm smiles","Wake up your hands","title"),
    ("Intro","Sunny,Mia,Koda","wiggle fingers and toes toward the camera, inviting, cheerful","Time to wiggle to the beat!","word"),
    # Verse 1 (3)
    ("Verse 1","Sunny,Mia,Bram","stand by a sunny window, wave a big cheerful good-morning wave","Good day!","word"),
    ("Verse 1","Mimi,Leo,Pipa","big slow full-body stretch, arms reaching up high to the ceiling","Reach up high","word"),
    ("Verse 1","Sunny,Koda,Bram,Mia","whole-body happy shake like a tree in the wind, giggly wiggles","Shake shake shake","word"),
    # Hook 1 (2)
    ("Hook 1","Sunny,Koda,Mimi,Leo","wiggle and shake in place together, big joyful energy","Wiggle wiggle","word"),
    ("Hook 1","Mia,Bram,Pipa,Leo","tap knees in rhythm then clap hands up high","Clap your hands","word"),
    # Verse 2 (3) - animal moves
    ("Verse 2","Koda,Mia","playful little frog hops in place, hands doing ribbit motions","Hop! Hop!","word"),
    ("Verse 2","Bram,Leo","stomp feet like big friendly bears, heavy but safe stomps","Stomp stomp stomp","word"),
    ("Verse 2","Mimi,Pipa","tiptoe quietly like little mice, finger to lips, gentle shh","Tiptoe quiet","word"),
    # Hook 2 (2)
    ("Hook 2","Sunny,Bram,Mia,Pipa","wiggle and shake wide awake, big smiles, joining in","Wide awake","word"),
    ("Hook 2","Koda,Mimi,Leo,Sunny","tap knees then clap hands together on the beat","Tap your knees","word"),
    # Bridge (3) - call & response + FREEZE
    ("Bridge","Sunny,Mia,Leo,Mimi","Sunny leads, group claps then stomps together, call and response","Can you clap?","word"),
    ("Bridge","Sunny,Koda,Bram,Pipa","everyone snaps into a fun frozen pose, eyes open, big grins, holding still","FREEZE!","freeze"),
    ("Bridge","Sunny,Mia,Koda,Leo","cheer and point to the camera, celebrating, hooray","Hooray for YOU!","word"),
    # Final verse (3) - kindness / hug
    ("Final verse","Sunny,Mimi","two friends give a gentle warm hug, happy smiles","Give a hug","word"),
    ("Final verse","Leo,Bram,Koda,Pipa","kids share kind gestures, hand on shoulder, warm waves to viewer","Share your kindness","word"),
    ("Final verse","Sunny,Mia,Koda,Mimi,Leo,Bram,Pipa","whole crew does one big bright happy wiggle together","One last wiggle","word"),
    # Outro (2)
    ("Outro","Sunny,Mia,Koda,Mimi,Leo,Bram,Pipa","full crew wiggle, tap knees and clap, calmer warm energy","Wide awake","word"),
    ("Outro","Sunny,Mia,Koda,Mimi,Leo,Bram,Pipa","gentle final wiggles, warm group pose, smiling at camera","","end"),
]
assert len(SHOTS)==N, len(SHOTS)

def tokens(cast):
    return " ".join("[%s <<<%s>>>]"%(n, ELEM[n if n!="Coda" else "Koda"]) for n in cast.split(","))

clips=[]
for i,(sec,cast,action,word,kind) in enumerate(SHOTS):
    start=round(i*SLOT,3); end=round((i+1)*SLOT,3)
    prompt="%s %s. %s"%(tokens(cast), action, STYLE)
    ov=[]
    logo=False
    if kind=="title":
        logo=True   # real transparent-PNG logo composited over the opening (held ~2.5s, fade ~1s)
    if word:
        if kind=="freeze":
            ov.append([word, 0.45, 0.95, "freeze"])
        else:
            ov.append([word, 0.14, 0.90, "word"])
    if kind=="end":
        ov.append(["THE END", 0.30, 1.0, "end"])
    clips.append({"clip_id":"W%02d"%(i+1),"section":sec,"cast":cast.split(","),
                  "start":start,"end":end,"dur":round(SLOT,3),"kind":kind,"logo":logo,
                  "prompt":prompt,"overlays":ov})

spec={"song":"Wiggle Wake Up","audio":"_staging/audio/wiggle-wake-up.mp3","duration":DUR,
      "n":N,"slot":round(SLOT,4),"out":"sunny-and-the-crew/song-shorts/Wiggle-Wake-Up.mp4",
      "logo":"sunny-and-the-crew/brand/logo-sunny-and-the-crew.png",
      "style":STYLE,"clips":clips}
os.makedirs("_staging/wiggle",exist_ok=True)
json.dump(spec,open("_staging/wiggle/shot_spec.json","w"),indent=2)
# cast coverage check
from collections import Counter
c=Counter()
for cl in clips:
    for n in cl["cast"]: c[n if n!="Coda" else "Koda"]+=1
print("shots:",len(clips),"slot=%.3fs"%SLOT,"total=%.1fs"%(len(clips)*SLOT))
print("cast coverage:",dict(c))
print("OK -> _staging/wiggle/shot_spec.json")
