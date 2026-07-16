#!/usr/bin/env python3
"""Author the Leo's Two Worlds shot spec — SECTION-TIMED to the real audio structure.

Bilingual bachata teaching song (3:11, ~110 BPM). Leo is the central mover, always doing a
simple, SAFE kid-level bachata basic step (step to the side, together, step, tap) on his own
spot; Sunny co-leads call-and-response; the crew joins more as the song builds. Four word
pairs (OH-la/HELLO, GRAH-see-as/THANK YOU, ah-MEE-go/FRIEND, VAH-mos/LET'S GO) each land with
their gesture on the matching section. 20 shots.

HARD SAFETY (baked into every prompt): the bachata is JOYFUL CHILDREN'S movement — kids step
independently on their own spots, never partner dancing, never holding each other, no romantic
or sensual framing, no lifts, no spins-with-a-partner. Cultural celebration, not stereotype.
"""
import json, os

BG = json.load(open("_staging/leotwo/beatgrid.json"))
DUR = BG["dur"]

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
         "rounded dimensional forms, bright cheerful outdoor community plaza / playground — warm "
         "colored tiled pavement, friendly festive string lights and simple colorful flags and "
         "papel-picado banners, warm golden daytime light, bright warm reds yellows oranges with "
         "soft blue accents, joyful bilingual community-gathering feel, respectful cultural pride "
         "(never a stereotype). The kids do a simple, SAFE kid-level bachata basic step — step to "
         "the side, together, step, gentle tap — each child dancing happily on their OWN spot. "
         "STRICTLY children's group movement: NO partner dancing, NO holding or touching each "
         "other, NO romantic or sensual posing, NO lifts, no fast risky spins — just cheerful "
         "independent stepping and clear friendly gestures, on-model, theatrical quality. "
         "Absolutely NO text, no words, no letters, no captions in the frame. "
         "NOT 2D, NOT flat, NOT outlined, NOT storybook.")

# Each shot: (start, end, section, cast, action, [overlay lines], kind, logo)
SHOTS = [
 (0.0,10.0,"Intro","Leo,Sunny,Mimi,Koda",
  "the camera finds Leo already doing his easy bachata side-step-tap on his own spot, smiling naturally; Sunny walks up with a gentle sway; Mimi and Koda turn to watch with happy curious faces",
  ["Leo's Two Worlds","Two languages living in his heart"],"title",True),
 # Verse 1 — OH-la / HELLO (10-40)
 (10.0,20.0,"Verse 1 — Hola","Leo,Sunny,Mimi",
  "Sunny asks Leo the word; on the tap Leo steps forward and raises his right hand in a friendly wave; Sunny mirrors with a slightly delayed wave, each on their own spot",
  ["Hola = HELLO","What's the word for hello?"],"word",False),
 (20.0,30.0,"Verse 1 — Hola","Leo,Sunny,Koda",
  "Leo repeats the wave on his side-step-tap; Sunny and Koda copy the friendly wave, learning by watching, all stepping in place",
  ["Say it one more time","Now the English way"],"word",False),
 (30.0,40.0,"Verse 1 — Hola","Leo,Sunny,Mimi,Koda,Bram",
  "on the English word the crew waves outward toward the camera and steps back, mirroring Leo, everyone smiling and stepping the simple bachata basic",
  ["Hola — HELLO","They're both the same!"],"word",False),
 # Hook 1 (40-55)
 (40.0,47.5,"Hook 1","Sunny,Leo,Mimi,Koda,Bram,Pipa,Mia",
  "wide shot, the full crew doing the simple bachata basic step together on their own spots; on the Spanish word they wave toward each other, energy rising, big smiles",
  ["Hola — HELLO","Leo's got the words — now we know!"],"word",False),
 (47.5,55.0,"Hook 1","Sunny,Leo,Mimi,Koda,Bram,Pipa,Mia",
  "the crew waves outward toward the camera on the English word, steps a little bigger, joyful group energy, festive plaza around them",
  ["Both words mean the same — let's go!","Leo's teaching — feel the flow"],"word",False),
 # Verse 2 — GRAH-see-as / THANK YOU (55-85)
 (55.0,65.0,"Verse 2 — Gracias","Leo,Sunny,Pipa",
  "Sunny asks how to say thank you; on the tap Leo steps forward and places his right hand over his heart; Pipa watches and starts to copy, all stepping in place",
  ["Gracias = THANK YOU","How do you say thank you?"],"word",False),
 (65.0,75.0,"Verse 2 — Gracias","Leo,Sunny,Bram",
  "Leo repeats hand-on-heart on his step-tap; Sunny mirrors on the English word; Bram joins with a hand on his heart while stepping",
  ["Hand on heart","That's what Leo does"],"word",False),
 (75.0,85.0,"Verse 2 — Gracias","Leo,Sunny,Mimi,Mia,Koda",
  "the crew joins, everyone with a hand on their heart while doing the simple bachata step, warm grateful smiles",
  ["Gracias — THANK YOU","Leo's world and our world — never apart!"],"word",False),
 # Hook 2 (85-100)
 (85.0,92.5,"Hook 2","Sunny,Leo,Mimi,Koda,Bram,Pipa,Mia",
  "full crew dancing the bachata basic; on the Spanish word both hands press over the heart together, joyful and warm",
  ["Gracias — THANK YOU","Leo's got the words — now we know!"],"word",False),
 (92.5,100.0,"Hook 2","Sunny,Leo,Mimi,Koda,Bram,Pipa,Mia",
  "on the English word the crew opens both hands outward in a giving gesture while stepping, contrast of holding then offering, bright smiles",
  ["Both words mean the same — let's go!","Leo's teaching — feel the flow"],"word",False),
 # Bridge — Bachata Mambo Break (100-125)
 (100.0,112.5,"Bridge","Leo,Sunny",
  "Leo and Sunny face each other doing faster playful bachata mambo footwork, mirroring each other like two friends copying a step — each on their own spot, NOT holding hands, joyful and light",
  ["Both of them live inside us","Both of them are RIGHT"],"word",False),
 (112.5,125.0,"Bridge","Leo,Sunny,Mimi,Koda,Bram,Pipa,Mia",
  "Leo and Sunny stand side by side facing forward, both raise their arms fully up and hold, proud and happy, then the whole crew rushes back in around them",
  ["Two languages — twice the light","When you know two languages"],"word",False),
 # Verse 3 — ah-MEE-go / FRIEND (125-145)
 (125.0,135.0,"Verse 3 — Amigo","Leo,Sunny,Mia",
  "on the tap Leo points warmly to Sunny; Sunny points back to Leo; Mia watches and points to a friend nearby, all stepping the simple bachata basic",
  ["Amigo = FRIEND","Point to a friend"],"word",False),
 (135.0,145.0,"Verse 3 — Amigo","Leo,Sunny,Mimi,Koda,Bram,Pipa,Mia",
  "on the English word Leo and Sunny point outward to the camera, and every crew member points to the person next to them, everyone smiling and stepping",
  ["Amigo — FRIEND","right next to you!"],"word",False),
 # Verse 4 — VAH-mos / LET'S GO (145-165)
 (145.0,155.0,"Verse 4 — Vamos","Leo,Sunny,Bram",
  "on the tap Leo steps forward and pumps his fist forward with happy energy; Sunny and Bram copy the forward fist while stepping",
  ["Vamos = LET'S GO","Move your feet!"],"word",False),
 (155.0,165.0,"Verse 4 — Vamos","Leo,Sunny,Mimi,Koda,Bram,Pipa,Mia",
  "on the English words the whole crew pumps their fists forward together while doing the bachata step, high joyful energy",
  ["Vamos — LET'S GO","the whole world complete!"],"word",False),
 # Final Hook — All Word Pairs (165-185)
 (165.0,175.0,"Final Hook","Sunny,Leo,Mimi,Koda,Bram,Pipa,Mia",
  "full crew, continuous bachata basic step, cycling the friendly gestures together — wave, then hand on heart — bright celebratory energy",
  ["Hola — HELLO — Gracias — THANK YOU","Leo taught the crew — now the crew knows"],"word",False),
 (175.0,185.0,"Final Hook","Sunny,Leo,Mimi,Koda,Bram,Pipa,Mia",
  "crew cycling the last gestures together — point to a friend, then fist forward — everyone stepping and beaming, festive plaza celebration",
  ["Amigo — FRIEND — Vamos — LET'S GO","Two languages — everywhere Leo goes!"],"word",False),
 # Outro (185-191)
 (185.0,999,"Outro","Leo,Sunny,Mimi,Mia",
  "movement slows to a gentle sway; Leo keeps a soft quiet bachata step and opens his arms warmly toward the camera as the crew waves softly, calm proud smiles",
  ["Leo's Two Worlds","Now they're yours!"],"end",False),
]

def tokens(cast):
    return " ".join("[%s <<<%s>>>]"%(n, ELEM[n]) for n in cast.split(","))

clips=[]
for i,(start,end,sec,cast,action,lines,kind,logo) in enumerate(SHOTS):
    s=round(start,3); e=round(min(end,DUR),3); slot=round(e-s,3)
    st = STYLE
    prompt="%s %s. %s"%(tokens(cast), action, st)
    okind = "end" if kind=="end" else "word"
    ov=[]
    if len(lines)==1:
        ov.append([lines[0],0.06,0.94,okind])
    else:
        ov.append([lines[0],0.05,0.47,okind])
        ov.append([lines[1],0.52,0.95,okind])
    clips.append({"clip_id":"W%02d"%(i+1),"section":sec,"cast":cast.split(","),
                  "start":s,"end":e,"dur":slot,"kind":kind,"logo":logo,
                  "prompt":prompt,"overlays":ov})

spec={"song":"Leo's Two Worlds","audio":"_staging/audio/leos-two-worlds.mp3","duration":DUR,
      "n":len(clips),"out":"sunny-and-the-crew/song-shorts/Leos-Two-Worlds.mp4",
      "logo":"sunny-and-the-crew/brand/logo-sunny-and-the-crew.png","style":STYLE,"clips":clips}
json.dump(spec,open("_staging/leotwo/shot_spec.json","w"),indent=2)
from collections import Counter
c=Counter()
for cl in clips:
    for n in cl["cast"]: c[n]+=1
print("shots:",len(clips),"  song dur %.2f"%DUR)
for cl in clips:
    print("  %s %-18s %6.2f-%6.2f (%4.1fs) logo=%s  %s"%(cl["clip_id"],cl["section"],cl["start"],cl["end"],cl["dur"],cl["logo"],cl["overlays"][0][0]))
print("cast coverage:",dict(c))
print("OK -> _staging/leotwo/shot_spec.json")
