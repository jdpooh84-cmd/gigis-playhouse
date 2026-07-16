#!/usr/bin/env python3
"""Author the Animal Yoga shot spec — SECTION-TIMED to the real audio structure.

Section boundaries were read from the RMS energy profile (animalyoga_beatgrid.py):
intro settles ~20s, verse energy sustains 20-52s, the strong dip at ~148-160s is the
calm star-pose bridge, the final lift 168-186s is the final chorus, and the 192s spike
is "Way to go!". Poses change exactly on those section boundaries so each animal pose is
on screen while it's being sung. 16 shots. Sunny leads/demonstrates every shot; 2-4 kids
rotate, all 7 appear. Poses are slow, simple, safe kid-yoga for ages 4-7.
"""
import json, os

BG = json.load(open("_staging/animalyoga/beatgrid.json"))
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
         "rounded dimensional forms, gentle warm forest-camp yoga clearing — soft grass, tall friendly "
         "trees, a cozy tent and soft blankets/yoga mats, warm golden daylight, soft greens and browns, "
         "calm soothing mood, no harsh contrast. Kids do slow, simple, SAFE kid-level yoga poses, "
         "clearly and gently, on their own mats, calm happy faces, on-model, theatrical quality. "
         "Slow controlled mindful movement only — no advanced poses, no headstands, no deep backbends, "
         "no arm balances, no fast or jerky motion, no roughhousing, feet and hands grounded and safe. "
         "Absolutely NO text, no words, no letters, no captions in the frame. "
         "NOT 2D, NOT flat, NOT outlined, NOT storybook.")

# Each shot: (start, end, section, cast, action, [overlay lines], kind, logo)
SHOTS = [
 (0.0,10.0,"Intro","Sunny,Mimi,Leo,Koda",
  "wide calm shot of the forest yoga clearing; Sunny and a few kids sit cross-legged on mats, hands at heart center, breathing gently and smiling softly, warm morning light",
  ["Animal yoga — safe and calm","Welcome to the forest camp"],"soft",True),
 (10.0,20.0,"Intro","Sunny,Pipa,Bram,Mia",
  "the group sits tall on their mats, hands resting on knees, taking a slow calm breath together, gentle smiles, peaceful forest around them",
  ["Stretch and breathe and take it slow","Follow animals as we go"],"soft",False),
 (20.0,36.0,"Verse 1 — Cat","Sunny,Mimi,Leo",
  "on hands and knees on the mat: slowly round the back up like a stretching cat, then softly drop the belly and lift the head — gentle cat/cow stretch, very slow and calm",
  ["Cat stretch","Round our back — be calm"],"soft",False),
 (36.0,52.0,"Verse 1 — Dog","Sunny,Koda,Bram",
  "kid-level downward-facing dog: hands and feet grounded on the mat, hips gently lifted into a soft V-shape, slow deep breath in and slow breath out, calm and steady",
  ["Dog pose — make a V","Breathe in deep, breathe out slow"],"soft",False),
 (52.0,60.0,"Pre-Chorus 1","Sunny,Pipa,Mia",
  "kneeling tall on the mat, arms stretch slowly up overhead then float gently down; a clear, calm slow breath in through the nose, easy breath out",
  ["Stretch stretch — breathe breathe","In through nose — out with ease"],"soft",False),
 (60.0,72.0,"Chorus 1","Sunny,Mimi,Koda,Leo",
  "gentle group flow slowly alternating between the cat/cow stretch and the downward dog, everyone moving softly and in time, calm and rhythmic",
  ["Animal yoga — move and rest","Cat and dog — we do our best"],"soft",False),
 (72.0,84.0,"Chorus 1","Sunny,Bram,Pipa,Mia",
  "the group settles into a soft resting child's pose, knees folded, arms forward, foreheads gently down, calm slow breathing",
  ["Soft and slow","Feel your body stretch and grow"],"soft",False),
 (84.0,100.0,"Verse 2 — Butterfly","Sunny,Mimi,Pipa",
  "seated butterfly pose: soles of the feet together, knees gently open to each side, slowly flapping the knees like soft wings, calm and smiling",
  ["Butterfly pose","Flap your legs like gentle wings"],"soft",False),
 (100.0,116.0,"Verse 2 — Tree","Sunny,Leo,Koda",
  "gentle kid tree pose: standing tall and still, one foot resting low on the ankle or calf, hands reaching up softly like branches; some tap a toe down for balance — safe and steady",
  ["Tree pose — stand tall and still","Hands like branches reaching high"],"soft",False),
 (116.0,124.0,"Pre-Chorus 2","Sunny,Bram,Mia",
  "flap the butterfly knees a few times, then rise slowly to a grounded mountain pose, feet planted, arms softly at the sides, feeling steady on the forest floor",
  ["Flap flap — stand stand","Ground your feet in forest land"],"soft",False),
 (124.0,136.0,"Chorus 2","Sunny,Mimi,Leo,Pipa",
  "gentle group flow slowly alternating between the seated butterfly pose and the standing tree pose, calm slow transitions cued together",
  ["Animal yoga — move and rest","Butterfly and tree — we do our best"],"soft",False),
 (136.0,148.0,"Chorus 2","Sunny,Koda,Bram,Mia",
  "soft slow transitions between poses, everyone breathing calmly and stretching gently, warm and peaceful",
  ["Soft and slow","Feel your body stretch and grow"],"soft",False),
 (148.0,168.0,"Bridge — Star","Sunny,Mimi,Leo,Koda,Pipa",
  "calm star pose: kids lie down flat on their mats, arms and legs spread gently and comfortably, eyes softly closed, breathing slowly; tiny sparkles of forest starlight shimmer softly overhead",
  ["Star pose","Forest stars are shining bright"],"soft",False),
 (168.0,178.0,"Final Chorus","Sunny,Bram,Mia,Mimi",
  "a short slow flow moving gently from cat, to dog, to a soft tree pose, calmer and slower than before, breathing together",
  ["Cat and dog and tree in flow","Animal yoga — calm and free"],"soft",False),
 (178.0,186.0,"Final Chorus","Sunny,Leo,Koda,Pipa",
  "settle into a comfortable seated pose, hands at heart center, one slow calm breath together, peaceful proud smiles",
  ["Take one breath","Feel the peace"],"soft",False),
 (186.0,999,"Outro","Sunny,Mimi,Bram,Mia",
  "hug the knees in gently, roll slowly to one side, then sit up slow and tall cross-legged with hands at heart, quiet proud smiles, calm goodbye",
  ["Sit up slow with quiet pride","Animal yoga — way to go!"],"end",False),
]

def tokens(cast):
    return " ".join("[%s <<<%s>>>]"%(n, ELEM[n]) for n in cast.split(","))

clips=[]
for i,(start,end,sec,cast,action,lines,kind,logo) in enumerate(SHOTS):
    s=round(start,3); e=round(min(end,DUR),3); slot=round(e-s,3)
    prompt="%s %s. %s"%(tokens(cast), action, STYLE)
    # two overlay lines: first line front half, second line back half, with small margins
    ov=[]
    if len(lines)==1:
        ov.append([lines[0],0.06,0.94,kind])
    else:
        ov.append([lines[0],0.05,0.47,kind])
        ov.append([lines[1],0.52,0.95,kind])
    clips.append({"clip_id":"Y%02d"%(i+1),"section":sec,"cast":cast.split(","),
                  "start":s,"end":e,"dur":slot,"kind":kind,"logo":logo,
                  "prompt":prompt,"overlays":ov})

spec={"song":"Animal Yoga","audio":"_staging/audio/animal-yoga.mp3","duration":DUR,
      "n":len(clips),"out":"sunny-and-the-crew/song-shorts/Animal-Yoga.mp4",
      "logo":"sunny-and-the-crew/brand/logo-sunny-and-the-crew.png","style":STYLE,"clips":clips}
json.dump(spec,open("_staging/animalyoga/shot_spec.json","w"),indent=2)
from collections import Counter
c=Counter()
for cl in clips:
    for n in cl["cast"]: c[n]+=1
print("shots:",len(clips),"  song dur %.2f"%DUR)
for cl in clips:
    print("  %s %-20s %6.2f-%6.2f (%4.1fs) logo=%s  %s"%(cl["clip_id"],cl["section"],cl["start"],cl["end"],cl["dur"],cl["logo"],cl["overlays"][0][0]))
print("cast coverage:",dict(c))
print("OK -> _staging/animalyoga/shot_spec.json")
