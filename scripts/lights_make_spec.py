#!/usr/bin/env python3
"""Author the Lights With Mia shot spec — SECTION-TIMED to the real audio (145.3s).

Red Light Green Light-style game song. Mia is the child CALLER, always front-and-center facing
camera; Sunny co-leads/echoes; the crew are players lined up behind Mia who RUN / FREEZE /
SLOW-MO on the calls. Teaches 3 Korean colors (PPAL-gan=red, CHO-rok=green, NO-rang=yellow) and
3 Chinese commands (TING=stop, POW=go, MAHN-mahn=slow) through play. 19 shots.

Overlays are phonetic + English (readable for ages 4-7; the native scripts aren't rendered so
they never turn into missing-glyph boxes). Template example times overshoot the 2:25 track, so
sections are placed proportionally, snapped to the energy build/dips.

HARD RULES (baked into prompts): Mia is a CHILD leading a schoolyard game, NEVER a literal
stoplight/traffic device. NO traffic signals, cars, roads, highways. Movement is big but SAFE —
running in place, short sprints, clean freezes, slow-motion — no collisions, no falls, no
adult-coded dance.
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
STYLE = ("polished stylized 3D CGI animated preschool feature look, soft subsurface skin shading, "
         "rounded dimensional forms, bright friendly SCHOOLYARD PLAYGROUND field on a sunny day — "
         "a chalk start line and a far line, a few soft cones, grass and warm daylight, saturated "
         "primary reds greens and yellows in the kids' clothes and simple handheld props, cheerful "
         "energetic kids'-game mood. Mia is a happy CHILD leading a running-and-freezing game, "
         "front and center facing the camera; the crew are players behind her. Big but SAFE "
         "kid movement — running in place, short sprints, clean freezes, gentle slow-motion, "
         "no collisions, no falls, no adult dance. NO traffic lights, NO stoplight, NO cars, NO "
         "roads. Absolutely NO text, no words, no letters, no captions in the frame. "
         "NOT 2D, NOT flat, NOT outlined, NOT storybook.")

# Each shot: (start, end, section, cast, action, [overlay lines], kind, logo)
SHOTS = [
 (0.0,8.0,"Intro","Mia,Sunny,Koda,Leo",
  "quick playful shot: Mia stands front and center holding up three colored objects — a red apple, a green leaf, a yellow banana — smiling at the camera while the crew line up behind her at the chalk start line",
  ["Lights With Mia","Two languages — one game"],"title",True),
 (8.0,16.0,"Intro","Sunny,Mia,Mimi,Pipa",
  "Sunny steps in toward the camera and gestures proudly to Mia and to the crew lined up behind, introducing the game, everyone excited and ready",
  ["Mia's got her colors ready","Red and green and yellow"],"word",False),
 # Verse 1 — colors (16-40)
 (16.0,24.0,"Verse 1 — Colors","Mia,Sunny,Koda,Bram",
  "Mia front and center holds up the RED apple; behind her the crew brace and get ready to freeze, feet planted, eyes on Mia",
  ["PPAL-gan = red","Watch the light!"],"word",False),
 (24.0,32.0,"Verse 1 — Colors","Mia,Sunny,Leo,Mimi",
  "Mia holds up the GREEN leaf; behind her the crew start jogging and running in place with big happy energy",
  ["CHO-rok = green","Here we go!"],"word",False),
 (32.0,40.0,"Verse 1 — Colors","Mia,Sunny,Pipa,Koda",
  "Mia holds up the YELLOW banana; behind her the crew shift into very slow exaggerated slow-motion movements",
  ["NO-rang = yellow","Three colors — Korean — Mia's way"],"word",False),
 # Pre-Chorus 1 (40-50)
 (40.0,50.0,"Pre-Chorus 1","Mia,Sunny,Leo,Bram",
  "camera pulls back a little; the crew behind Mia jiggle with anticipation, mid-run but ready to freeze; Mia raises both hands, about to call the game",
  ["Colors calling — feel the beat","Nobody move until it stops!"],"word",False),
 # Chorus 1 (50-68)
 (50.0,59.0,"Chorus 1","Mia,Sunny,Mimi,Koda",
  "Mia calls red then STOP: she holds up a flat hand and the crew behind her instantly FREEZE mid-step, a crisp clean freeze, everyone still",
  ["PPAL-gan — red light — TING (stop)","Freeze!"],"word",False),
 (59.0,68.0,"Chorus 1","Mia,Sunny,Leo,Pipa",
  "Mia calls green then yellow: the crew burst into running in place, then melt into slow-motion, following Mia's calls, joyful",
  ["CHO-rok — green — POW (go)","NO-rang — yellow — MAHN-mahn (slow)"],"word",False),
 # Verse 2 — commands (68-88)
 (68.0,75.0,"Verse 2 — Commands","Mia,Sunny,Koda,Bram",
  "Mia front and center makes a firm STOP gesture with a flat raised hand; behind her the crew freeze completely, still as statues, smiling",
  ["TING = stop","Freeze right there!"],"word",False),
 (75.0,82.0,"Verse 2 — Commands","Mia,Sunny,Leo,Mia",
  "Mia waves everyone forward with a big GO gesture; behind her the crew run energetically in place, feet moving fast and safe",
  ["POW = go","Move your feet!"],"word",False),
 (82.0,88.0,"Verse 2 — Commands","Mia,Sunny,Mimi,Pipa",
  "Mia makes a gentle slow-down gesture with both hands; behind her the crew move in easy exaggerated slow-motion, calm and playful",
  ["MAHN-mahn = slow","Three commands — Chinese — Mia's side"],"word",False),
 # Pre-Chorus 2 (88-96)
 (88.0,96.0,"Pre-Chorus 2","Mia,Sunny,Koda,Leo",
  "the crew behind Mia jitter with excitement, ready for another round; Mia grins and raises her hands to call the next game",
  ["Commands calling — feel the beat","Nobody move until it STOPS!"],"word",False),
 # Chorus 2 (96-112)
 (96.0,104.0,"Chorus 2","Mia,Sunny,Bram,Mimi",
  "full integration: Mia calls red then STOP and the crew freeze, then calls green and they run — crisp freeze, then a burst of running in place",
  ["PPAL-gan — TING (freeze)","CHO-rok — POW (go)"],"word",False),
 (104.0,112.0,"Chorus 2","Mia,Sunny,Koda,Pipa",
  "Mia calls yellow and the crew go into slow-motion, then everyone bursts back to full running in place, big joyful game energy",
  ["NO-rang — MAHN-mahn (slow)","Six words — two worlds — watch them glow!"],"word",False),
 # Bridge — game climax (112-128)
 (112.0,120.0,"Bridge","Mia,Sunny,Leo,Koda,Bram",
  "game climax: Mia calls green, and Sunny and the crew run hard toward Mia in place shouting go-go-go, huge happy energy",
  ["CHO-rok — POW (go)","GO GO GO!"],"word",False),
 (120.0,128.0,"Bridge","Mia,Sunny,Mimi,Pipa,Leo",
  "Mia spins to face the crew and calls red then STOP; everyone FREEZES mid-run and holds completely still; camera slowly pans across the frozen players holding the freeze",
  ["PPAL-gan — TING (freeze)","JIN-jja... nobody moving!"],"word",False),
 # Final Chorus (128-140)
 (128.0,134.0,"Final Chorus","Mia,Sunny,Koda,Mimi,Bram",
  "big group shot behind Mia: a synchronized cycle of freeze, run, and slow-motion together, bright and celebratory",
  ["PPAL-gan / CHO-rok / NO-rang","TING / POW / MAHN-mahn"],"word",False),
 (134.0,140.0,"Final Chorus","Mia,Sunny,Leo,Pipa,Mia",
  "on 'take a bow' Mia and the whole crew do a playful bow to the camera together, beaming, six words learned",
  ["Six words — ONE game","Mia's light game — never done!"],"word",False),
 # Outro (140-end)
 (140.0,999,"Outro","Mia,Sunny",
  "calm close-up: Mia and Sunny side by side facing the camera, saying the words together, then a gentle wave and a warm little smile",
  ["Mia's world","Now you know!"],"end",False),
]

def tokens(cast):
    seen=[];
    for n in cast.split(","):
        if n not in seen: seen.append(n)
    return " ".join("[%s <<<%s>>>]"%(n, ELEM[n]) for n in seen)

clips=[]
for i,(start,end,sec,cast,action,lines,kind,logo) in enumerate(SHOTS):
    s=round(start,3); e=round(min(end,DUR),3); slot=round(e-s,3)
    prompt="%s %s. %s"%(tokens(cast), action, STYLE)
    okind = "end" if kind=="end" else "word"
    ov=[]
    if len(lines)==1:
        ov.append([lines[0],0.06,0.94,okind])
    else:
        ov.append([lines[0],0.05,0.47,okind])
        ov.append([lines[1],0.52,0.95,okind])
    # dedup cast for coverage/token cleanliness
    cl=[]
    for n in cast.split(","):
        if n not in cl: cl.append(n)
    clips.append({"clip_id":"M%02d"%(i+1),"section":sec,"cast":cl,
                  "start":s,"end":e,"dur":slot,"kind":kind,"logo":logo,
                  "prompt":prompt,"overlays":ov})

spec={"song":"Lights With Mia","audio":"_staging/audio/lights-with-mia.mp3","duration":DUR,
      "n":len(clips),"out":"sunny-and-the-crew/song-shorts/Lights-With-Mia.mp4",
      "logo":"sunny-and-the-crew/brand/logo-sunny-and-the-crew.png","style":STYLE,"clips":clips}
json.dump(spec,open("_staging/lights/shot_spec.json","w"),indent=2)
from collections import Counter
c=Counter()
for cl in clips:
    for n in cl["cast"]: c[n]+=1
print("shots:",len(clips),"  song dur %.2f"%DUR)
for cl in clips:
    print("  %s %-18s %6.2f-%6.2f (%4.1fs) logo=%s  %s"%(cl["clip_id"],cl["section"],cl["start"],cl["end"],cl["dur"],cl["logo"],cl["overlays"][0][0]))
print("cast coverage:",dict(c))
print("Mia in every shot:", all("Mia" in cl["cast"] for cl in clips))
print("OK -> _staging/lights/shot_spec.json")
