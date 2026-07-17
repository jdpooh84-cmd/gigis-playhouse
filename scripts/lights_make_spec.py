#!/usr/bin/env python3
"""Author the Lights With Mia shot spec — CHARACTER-CONTINUITY FIX PASS.

Root problem in take 1: busy 4-5 kid WIDE shots caused identity drift — Mia's two low
pigtails collapsed to a bun, and the model invented extra non-crew background kids. Tight
2-person shots (the outro) stayed perfectly on-model.

Fix in this pass:
  * Cap 2-3 named crew per shot; MEDIUM/CLOSE framing so faces are large and on-model.
  * Every prompt hard-limits the cast: "ONLY <names> ... no other children, no background kids".
  * Explicit appearance ANCHORS for the fragile characters — Mia (two low pigtails + teal
    scrunchies, NOT a bun) and Sunny (two high puff buns, yellow cloud shirt) — reinforcing
    the locked element IDs.
  * Fruit props (apple/leaf/banana) replaced with clean colored GAME CARDS (red/green/yellow).
  * M19 (outro) was already on-model — it is REUSED, not re-rendered.

Mia is a CHILD leading a schoolyard Red-Light-Green-Light game (never a literal stoplight);
no traffic signals/cars/roads; safe kid movement only. Teaches 3 Korean colors + 3 Chinese
commands via play. Timing/section grid unchanged from take 1.
"""
import json, os

BG = json.load(open("_staging/lights/beatgrid.json"))
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
# Per-character appearance anchors (append when the character is on screen). Short, exact.
ANCHOR = {
 "Mia": ("Mia has light golden-beige skin and PURE BLACK straight hair in TWO LOW pigtails at "
         "the base of her skull tied with small TEAL scrunchies — NOT a bun, NOT a ponytail, "
         "NOT a topknot — with a teal long-sleeve shirt (small yellow star on the left sleeve), "
         "a light grey polka-dot skirt over white leggings, and a teal star crossbody bag."),
 "Sunny": ("Sunny has warm medium-brown skin and TWO LARGE HIGH puff buns (pink tie on the right, "
           "yellow tie on the left) and a yellow t-shirt with a white cloud emblem and orange shorts."),
}
STYLE = ("polished stylized 3D CGI animated preschool feature look, soft subsurface skin shading, "
         "rounded dimensional forms, bright friendly grassy SCHOOLYARD play field on a sunny day "
         "with a simple chalk start line and a couple of soft cones, warm daylight, cheerful "
         "kids'-game mood. MEDIUM shot — the characters are large and close so every face is clear "
         "and on-model. Mia is a happy CHILD leading a running-and-freezing game. Big but SAFE kid "
         "movement — running in place, short sprints, clean freezes, gentle slow-motion, no "
         "collisions, no falls, no adult dance. NO traffic lights, NO stoplight, NO cars, NO roads. "
         "Absolutely NO text, no words, no letters, no captions in the frame. "
         "NOT 2D, NOT flat, NOT outlined, NOT storybook.")

# Each shot: (start, end, section, cast, action, [overlay lines], kind, logo, reuse)
SHOTS = [
 (0.0,8.0,"Intro","Mia,Sunny,Koda",
  "MEDIUM shot: Mia stands front and center holding up a small fan of three plain colored game cards — one red, one green, one yellow — smiling at the camera; Sunny stands beside her and Koda just behind, ready to play",
  ["Lights With Mia","Two languages — one game"],"title",True,False),
 (8.0,16.0,"Intro","Sunny,Mia,Leo",
  "MEDIUM shot: Sunny gestures warmly toward Mia introducing the game while Leo stands ready beside them, everyone excited, Mia front and center",
  ["Mia's got her colors ready","Red and green and yellow"],"word",False,False),
 # Verse 1 — colors (16-40)
 (16.0,24.0,"Verse 1 — Colors","Mia,Sunny,Mimi",
  "MEDIUM shot: Mia front and center holds up the RED game card clearly toward camera; Sunny and Mimi beside her plant their feet, ready to freeze",
  ["PPAL-gan = red","Watch the light!"],"word",False,False),
 (24.0,32.0,"Verse 1 — Colors","Mia,Sunny,Pipa",
  "MEDIUM shot: Mia holds up the GREEN game card; Sunny and Pipa beside her jog and run in place with big happy energy",
  ["CHO-rok = green","Here we go!"],"word",False,False),
 (32.0,40.0,"Verse 1 — Colors","Mia,Sunny,Bram",
  "MEDIUM shot: Mia holds up the YELLOW game card; Sunny and Bram beside her move in slow exaggerated slow-motion",
  ["NO-rang = yellow","Three colors — Korean — Mia's way"],"word",False,False),
 # Pre-Chorus 1 (40-50)
 (40.0,50.0,"Pre-Chorus 1","Mia,Sunny,Koda",
  "MEDIUM shot: Mia raises both hands about to call the game; Sunny and Koda beside her bounce with anticipation, mid-run but ready to freeze",
  ["Colors calling — feel the beat","Nobody move until it stops!"],"word",False,False),
 # Chorus 1 (50-68)
 (50.0,59.0,"Chorus 1","Mia,Sunny,Leo",
  "MEDIUM shot: Mia holds up a flat STOP hand; Sunny and Leo instantly FREEZE mid-step, a crisp clean freeze, everyone still",
  ["PPAL-gan — red light — TING (stop)","Freeze!"],"word",False,False),
 (59.0,68.0,"Chorus 1","Mia,Sunny,Mimi",
  "MEDIUM shot: Mia waves everyone on; Sunny and Mimi burst into running in place then melt into slow-motion, joyful",
  ["CHO-rok — green — POW (go)","NO-rang — yellow — MAHN-mahn (slow)"],"word",False,False),
 # Verse 2 — commands (68-88)
 (68.0,75.0,"Verse 2 — Commands","Mia,Sunny,Pipa",
  "MEDIUM shot: Mia makes a firm flat-hand STOP gesture front and center; Sunny and Pipa freeze completely, still as statues, smiling",
  ["TING = stop","Freeze right there!"],"word",False,False),
 (75.0,82.0,"Verse 2 — Commands","Mia,Sunny,Bram",
  "MEDIUM shot: Mia waves everyone forward with a big GO gesture; Sunny and Bram run energetically in place, feet moving fast and safe",
  ["POW = go","Move your feet!"],"word",False,False),
 (82.0,88.0,"Verse 2 — Commands","Mia,Sunny,Koda",
  "MEDIUM shot: Mia makes a gentle slow-down gesture with both hands; Sunny and Koda move in easy exaggerated slow-motion, calm and playful",
  ["MAHN-mahn = slow","Three commands — Chinese — Mia's side"],"word",False,False),
 # Pre-Chorus 2 (88-96)
 (88.0,96.0,"Pre-Chorus 2","Mia,Sunny,Leo",
  "MEDIUM shot: Mia grins and raises her hands to call the next round; Sunny and Leo jitter with excitement, ready to play",
  ["Commands calling — feel the beat","Nobody move until it STOPS!"],"word",False,False),
 # Chorus 2 (96-112)
 (96.0,104.0,"Chorus 2","Mia,Sunny,Mimi",
  "MEDIUM shot: Mia calls red then STOP and Sunny and Mimi freeze, then Mia calls green and they burst into running in place",
  ["PPAL-gan — TING (freeze)","CHO-rok — POW (go)"],"word",False,False),
 (104.0,112.0,"Chorus 2","Mia,Sunny,Pipa",
  "MEDIUM shot: Mia calls yellow and Sunny and Pipa go into slow-motion, then everyone bursts back to full running in place, joyful",
  ["NO-rang — MAHN-mahn (slow)","Six words — two worlds — watch them glow!"],"word",False,False),
 # Bridge — game climax (112-128)
 (112.0,120.0,"Bridge","Mia,Sunny,Bram",
  "MEDIUM shot: game climax — Mia calls green and Sunny and Bram run hard in place toward Mia with huge happy go-go-go energy",
  ["CHO-rok — POW (go)","GO GO GO!"],"word",False,False),
 (120.0,128.0,"Bridge","Mia,Sunny,Koda",
  "MEDIUM shot: Mia calls red then STOP; Sunny and Koda FREEZE mid-run and hold completely still; the camera holds on Mia and the frozen players",
  ["PPAL-gan — TING (freeze)","JIN-jja... nobody moving!"],"word",False,False),
 # Final Chorus (128-140)
 (128.0,134.0,"Final Chorus","Mia,Sunny,Leo,Mimi",
  "MEDIUM group shot: Mia front and center with Sunny, Leo and Mimi close beside her doing a synchronized freeze-run-slow cycle, bright and celebratory",
  ["PPAL-gan / CHO-rok / NO-rang","TING / POW / MAHN-mahn"],"word",False,False),
 (134.0,140.0,"Final Chorus","Mia,Sunny,Pipa,Bram",
  "MEDIUM group shot: on 'take a bow' Mia with Sunny, Pipa and Bram close beside her do a playful bow to the camera together, beaming",
  ["Six words — ONE game","Mia's light game — never done!"],"word",False,False),
 # Outro (140-end) — ALREADY ON-MODEL IN TAKE 1: reuse, do not re-render
 (140.0,999,"Outro","Mia,Sunny",
  "calm close-up: Mia and Sunny side by side facing the camera, saying the words together, then a gentle wave and a warm little smile",
  ["Mia's world","Now you know!"],"end",False,True),
]

def dedup(cast):
    out=[]
    for n in cast.split(","):
        if n not in out: out.append(n)
    return out

def tokens(names):
    return " ".join("[%s <<<%s>>>]"%(n, ELEM[n]) for n in names)

clips=[]
for i,(start,end,sec,cast,action,lines,kind,logo,reuse) in enumerate(SHOTS):
    s=round(start,3); e=round(min(end,DUR),3); slot=round(e-s,3)
    names=dedup(cast)
    anch=" ".join(ANCHOR[n] for n in names if n in ANCHOR)
    cap="ONLY %s are present in the frame — no other children, no background kids, no crowd, no extra people."%(", ".join(names))
    prompt="%s %s %s. %s %s"%(tokens(names), anch, action, cap, STYLE)
    okind = "end" if kind=="end" else "word"
    ov=[]
    if len(lines)==1:
        ov.append([lines[0],0.06,0.94,okind])
    else:
        ov.append([lines[0],0.05,0.47,okind]); ov.append([lines[1],0.52,0.95,okind])
    clips.append({"clip_id":"M%02d"%(i+1),"section":sec,"cast":names,
                  "start":s,"end":e,"dur":slot,"kind":kind,"logo":logo,"reuse":reuse,
                  "prompt":prompt,"overlays":ov})

spec={"song":"Lights With Mia","audio":"_staging/audio/lights-with-mia.mp3","duration":DUR,
      "n":len(clips),"out":"sunny-and-the-crew/song-shorts/Lights-With-Mia.mp4",
      "logo":"sunny-and-the-crew/brand/logo-sunny-and-the-crew.png","style":STYLE,"clips":clips}
json.dump(spec,open("_staging/lights/shot_spec.json","w"),indent=2)
from collections import Counter
c=Counter()
for cl in clips:
    for n in cl["cast"]: c[n]+=1
rr=[cl["clip_id"] for cl in clips if not cl["reuse"]]
print("shots:",len(clips)," | re-render:",len(rr),rr)
for cl in clips:
    tag="REUSE" if cl["reuse"] else "render"
    print("  %s %-16s %6.2f-%6.2f cast=%d %-6s %s"%(cl["clip_id"],cl["section"],cl["start"],cl["end"],len(cl["cast"]),tag,cl["overlays"][0][0]))
print("cast coverage:",dict(c))
print("Mia+Sunny in every shot:", all("Mia" in cl["cast"] and "Sunny" in cl["cast"] for cl in clips))
print("max cast per shot:", max(len(cl["cast"]) for cl in clips))
print("OK -> _staging/lights/shot_spec.json")
