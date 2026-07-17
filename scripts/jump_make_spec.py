#!/usr/bin/env python3
"""Author the Jump With Me shot spec — SECTION-TIMED to the real audio (148.56s).

Afrobeats/dancehall kids jump song. Sunny is the JUMP COACH leading call-and-response; the
crew copy each line's action. Every lyric line maps to its specific move (stretch, count-jumps,
touch the door, clap, wiggle, shake, spin, tiptoe, QUIET mouse-jump vs LOUD jump). 17 shots,
placed on the real energy structure (dips at ~36s, ~84s, ~116s mark section edges).

CONTINUITY DISCIPLINE (learned from Lights With Mia): cap 3-4 named crew per shot, MEDIUM
framing so faces stay on-model, explicit "no other children / no background kids" cap, and
appearance ANCHORS for the fragile characters — Sunny (two high puff buns, yellow cloud shirt)
and Mia (two low pigtails + teal scrunchies, not a bun).

SAFETY: all jumps/spins small, soft-knee, low, controlled — no big leaps, flips, long spins,
or rough landings. Bright friendly style, never dark/aggressive.
"""
import json, os

BG = json.load(open("_staging/jump/beatgrid.json"))
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
ANCHOR = {
 "Sunny": ("Sunny has warm medium-brown skin and TWO LARGE HIGH puff buns (pink tie on the right, "
           "yellow tie on the left) and a yellow t-shirt with a white cloud emblem and orange shorts."),
 "Mia": ("Mia has light golden-beige skin and PURE BLACK straight hair in TWO LOW pigtails at the "
         "base of her skull tied with small TEAL scrunchies — NOT a bun — with a teal long-sleeve "
         "shirt (small yellow star on the sleeve) and a grey polka-dot skirt over white leggings."),
}
STYLE = ("polished stylized 3D CGI animated preschool feature look, soft subsurface skin shading, "
         "rounded dimensional forms, bright open sunny outdoor yard / plaza with lots of safe empty "
         "floor space and no obstacles, festive Afrobeats jump-party feel, saturated warm happy "
         "colors, daytime. Sunny is the cheerful JUMP COACH leading the moves facing the camera; the "
         "others copy her. MEDIUM shot — characters large and close so every face is clear and "
         "on-model. All jumps and spins are SMALL, soft-knee, low, controlled and SAFE for little "
         "kids — no big leaps, no flips, no long fast spins, no rough landings, bright and friendly, "
         "never dark or aggressive. Absolutely NO text, no words, no letters, no captions in the "
         "frame. NOT 2D, NOT flat, NOT outlined, NOT storybook.")

# Each shot: (start, end, section, cast, action, [overlay lines], kind, logo)
SHOTS = [
 (0.0,8.0,"Intro","Sunny,Koda,Mimi,Leo",
  "the crew do small soft in-place jumps on each 'Jump'; Sunny points warmly toward the camera inviting kids to join, then everyone lands in a light bounce with big smiles and arms slightly out",
  ["Jump with me","Happy and free"],"title",True),
 # Verse 1 (8-36)
 (8.0,17.0,"Verse 1","Sunny,Mia,Pipa",
  "morning wake-up: the kids stretch both arms up overhead reaching to the sky, fingers spread, a light happy yawn, eyes opening",
  ["Stretch your arms up high","Good morning!"],"word",False),
 (17.0,26.0,"Verse 1","Sunny,Bram,Koda",
  "the kids plant their feet firmly on the floor, then do one slightly bigger but still safe soft jump with arms up",
  ["Feet on the floor","We can jump so very high"],"word",False),
 (26.0,36.0,"Verse 1","Sunny,Leo,Mimi",
  "counting jumps: small in-place jumps counting one-two-three-four, then a couple of little side hops to lightly touch a friendly door frame, then continuous light happy jumps clapping overhead",
  ["1-2-3-4 — jump and touch the door","Jumping jumping feeling great"],"word",False),
 # Pre-Chorus 1 (36-44)
 (36.0,44.0,"Pre-Chorus 1","Sunny,Mia,Bram",
  "the kids crouch slightly with hands on knees then lift up like starting a race; Sunny cups a hand to her ear, then everyone answers with one clear jump landing straight into two claps overhead",
  ["Can you jump? Yes I can!","Jump and clap your hands!"],"word",False),
 # Chorus 1 (44-64)
 (44.0,54.0,"Chorus 1","Sunny,Koda,Pipa,Mia",
  "repeated small jumps in place to the Afrobeats groove; Sunny gestures toward the camera, then a slightly bigger jump reaching both arms straight up to the sky",
  ["Jump with me, jump with me","Jump so high — touch the sky"],"word",False),
 (54.0,64.0,"Chorus 1","Sunny,Leo,Mimi,Bram",
  "two jumps up-and-down, then one slow controlled spin with feet staying near the floor and arms out for balance, landing in a happy pose with hands on hips",
  ["Up and down — round and round","Happiest kids in town"],"word",False),
 # Verse 2 (64-84)
 (64.0,74.0,"Verse 2","Sunny,Mia,Koda",
  "the kids do a gentle full-body wiggle with giggles, then shake shoulders and hips softly side to side with feet planted",
  ["Wiggle and giggle","Shake left and right"],"word",False),
 (74.0,84.0,"Verse 2","Sunny,Pipa,Leo",
  "one small jump then one slow safe spin like a gentle twister, land into a soft bounce; then rise onto tiptoes and back down, ending with laughing happy jumps",
  ["Jump and spin — toes up, toes down","Jump and laugh!"],"word",False),
 # Pre-Chorus 2 (84-92)
 (84.0,92.0,"Pre-Chorus 2","Sunny,Bram,Mimi",
  "the kids crouch with hands on knees then lift up ready; Sunny cups her ear, they answer with one clear jump and thumbs-up, then jump into two claps",
  ["Ready ready — here we go","Jump and clap your hands!"],"word",False),
 # Chorus 2 (92-112)
 (92.0,102.0,"Chorus 2","Sunny,Mia,Koda,Leo",
  "energetic small jumps in place together, Sunny leading toward camera, then a bigger reach-up jump touching the sky",
  ["Everybody jump with me","Jump so high — touch the sky"],"word",False),
 (102.0,112.0,"Chorus 2","Sunny,Pipa,Bram,Mimi",
  "up-and-down jumps then one controlled spin, land in a proud happy pose, arms wide",
  ["Up and down — round and round","Happiest kids in town"],"word",False),
 # Bridge (112-132) — QUIET vs LOUD contrast
 (112.0,122.0,"Bridge","Sunny,Mia,Koda",
  "Sunny waves a friendly 'come here' and the kids hop closer in small steps, hands over hearts; then very soft tiny quiet jumps with a finger to the lips going shhh, feet barely leaving the floor",
  ["Come jump with me","Jump quiet like a mouse"],"word",False),
 (122.0,132.0,"Bridge","Sunny,Leo,Pipa,Bram",
  "after the quiet, one bigger joyful safe jump with happy shouting energy, then the group jumps in sync and lands together in a proud posed cluster with arms raised",
  ["Now jump LOUD!","Jump together — make us proud!"],"word",False),
 # Final Chorus (132-144)
 (132.0,138.0,"Final Chorus","Sunny,Mia,Mimi,Koda",
  "bigger group jump energy, everyone reaching up strong on 'touch the sky', bright and joyful",
  ["Jump with me, jump with me","Jump so high — touch the sky"],"word",False),
 (138.0,144.0,"Final Chorus","Sunny,Leo,Pipa,Bram",
  "up-and-down and one final spin, then a big group jump-freeze pose, hands up, huge smiles",
  ["Up and down — round and round","Happiest kids in town"],"word",False),
 # Outro (144-end)
 (144.0,999,"Outro","Sunny,Mia,Koda,Mimi",
  "two final small jumps, one last slightly bigger jump with arms up, then the kids land softly with hands on hearts and thumbs-up, keeping a gentle little bounce as the music fades",
  ["Jump! Jump! Feeling fine!","We don't stop!"],"end",False),
]

def dedup(cast):
    out=[]
    for n in cast.split(","):
        if n not in out: out.append(n)
    return out

def tokens(names):
    return " ".join("[%s <<<%s>>>]"%(n, ELEM[n]) for n in names)

clips=[]
for i,(start,end,sec,cast,action,lines,kind,logo) in enumerate(SHOTS):
    s=round(start,3); e=round(min(end,DUR),3); slot=round(e-s,3)
    names=dedup(cast)
    anch=" ".join(ANCHOR[n] for n in names if n in ANCHOR)
    cap="ONLY %s are present in the frame — no other children, no background kids, no crowd."%(", ".join(names))
    prompt="%s %s %s. %s %s"%(tokens(names), anch, action, cap, STYLE)
    okind = "end" if kind=="end" else "word"
    ov=[]
    if len(lines)==1:
        ov.append([lines[0],0.06,0.94,okind])
    else:
        ov.append([lines[0],0.05,0.47,okind]); ov.append([lines[1],0.52,0.95,okind])
    clips.append({"clip_id":"J%02d"%(i+1),"section":sec,"cast":names,
                  "start":s,"end":e,"dur":slot,"kind":kind,"logo":logo,
                  "prompt":prompt,"overlays":ov})

spec={"song":"Jump With Me","audio":"_staging/audio/jump-with-me.mp3","duration":DUR,
      "n":len(clips),"out":"sunny-and-the-crew/song-shorts/Jump-With-Me.mp4",
      "logo":"sunny-and-the-crew/brand/logo-sunny-and-the-crew.png","style":STYLE,"clips":clips}
json.dump(spec,open("_staging/jump/shot_spec.json","w"),indent=2)
from collections import Counter
c=Counter()
for cl in clips:
    for n in cl["cast"]: c[n]+=1
print("shots:",len(clips),"  song dur %.2f"%DUR)
for cl in clips:
    print("  %s %-14s %6.2f-%6.2f (%4.1fs) cast=%d  %s"%(cl["clip_id"],cl["section"],cl["start"],cl["end"],cl["dur"],len(cl["cast"]),cl["overlays"][0][0]))
print("cast coverage:",dict(c))
print("Sunny in every shot:", all("Sunny" in cl["cast"] for cl in clips))
print("max cast:", max(len(cl["cast"]) for cl in clips))
print("OK -> _staging/jump/shot_spec.json")
