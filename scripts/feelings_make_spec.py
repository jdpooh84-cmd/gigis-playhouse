#!/usr/bin/env python3
"""Author the How Do You Feel? shot spec — SECTION-TIMED to the real audio (116.4s).

Preschool feelings song (ages 2-5). Sunny guides call-and-response; 2-3 kids per shot show
happy / sad / mad / scared with faces + simple safe body actions. 14 shots mapped onto the
real audio structure (template's example times overshoot the 1:56 track, so sections are
placed proportionally, snapped to the energy dips at ~36s and ~92s).

HARD SAFETY (baked into every prompt): mad and scared are SMALL and GENTLE — tiny in-place
stomps, hand shakes to release, then hands on heart to calm; scared is only slightly wide eyes
+ a small self-hug. NO hitting, throwing, aggression, or frightening/exaggerated faces. Every
feeling is validated (all feelings are okay and can be shared).
"""
import json, os

BG = json.load(open("_staging/feelings/beatgrid.json"))
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
# Canon enforcement — the exact defects the creator flagged on prior songs (Sunny too tall/older,
# non-canon multicolor hair, duplicate characters). Injected into every prompt.
REINF = ("CANON: every character is a little PRESCHOOL child, all the SAME small child height and "
         "proportions — Sunny is NOT taller, NOT older, NOT an adult. Sunny's hair is DARK BROWN in "
         "two puff buns — never pink, never orange, never rainbow, never multicolor (only her hair "
         "TIES are pink and yellow). Show EXACTLY ONE of each named child — never duplicate a "
         "character, only ONE Sunny and ONE Mia per frame.")
STYLE = ("polished stylized 3D CGI animated preschool feature look, soft subsurface skin shading, "
         "rounded dimensional forms, cozy warm playroom / classroom corner — soft cushions, round "
         "rug, friendly feelings posters with simple emoji-style happy/sad/mad/scared faces on the "
         "wall, a little mirror, warm daytime light, bright soft yellows blues and pinks, calm safe "
         "inviting space for little kids. MEDIUM shot — characters large and close so every face is "
         "clear and on-model. Clear readable facial expressions, gentle and reassuring, on-model, "
         "theatrical quality. All movement is small, soft and safe for very young children "
         "— tiny in-place steps, gentle gestures, no hitting, no throwing, no aggression, no "
         "frightening or exaggerated scary faces. Absolutely NO text, no words, no letters, no "
         "captions in the frame. NOT 2D, NOT flat, NOT outlined, NOT storybook.")

# Each shot: (start, end, section, cast, action, [overlay lines], kind, logo)
SHOTS = [
 (0.0,9.0,"Verse 1 — Happy","Sunny,Mimi,Leo",
  "warm close group shot: kids make big HAPPY faces, cheeks up, eyes bright, wide smiles; Sunny gently points to her mouth and cheeks to show what happy looks like",
  ["How Do You Feel?","Happy face"],"title",True),
 (9.0,18.0,"Verse 1 — Happy","Sunny,Koda,Mia",
  "more cheerful happy faces, kids grinning with bright eyes and raised cheeks, gently bouncing in place, joyful and warm",
  ["Cheeks up, eyes bright","That's the face that feels just right!"],"word",False),
 (18.0,27.0,"Hook 1","Sunny,Pipa,Bram",
  "Sunny stands beside a simple feelings chart with happy/sad/mad/scared icons and invites the kids to point to how they feel right now",
  ["How do you feel? Show your face!","Every feeling has its place"],"word",False),
 (27.0,36.0,"Hook 1","Sunny,Mimi,Koda",
  "kids point to a feeling on the chart then turn and show that face to the camera, cheerful and encouraging",
  ["Happy, sad or mad or scared","Every feeling can be shared!"],"word",False),
 (36.0,44.0,"Verse 2 — Sad","Sunny,Leo,Mia",
  "kids show gentle SAD faces: mouth corners softly down, eyebrows slightly in, shoulders dropped low, quiet and calm (not crying)",
  ["Sad face","Mouth down, shoulders low"],"word",False),
 (44.0,52.0,"Verse 2 — Sad","Sunny,Pipa,Mimi",
  "Sunny sits close and offers gentle comfort — a soft hand on a shoulder and a warm nod — showing that sad feelings are okay",
  ["That's what sad looks like","Now you know!"],"word",False),
 (52.0,60.0,"Hook 2","Sunny,Bram,Koda,Mia",
  "small group side by side showing different faces — happy, then sad — while Sunny points to each and names the feeling",
  ["Happy - Sad - Mad - Scared","Show your face!"],"word",False),
 (60.0,68.0,"Hook 2","Sunny,Mimi,Leo,Pipa",
  "kids show mad and scared faces gently side by side while Sunny names each feeling, warm and encouraging",
  ["Every feeling has its place","Every feeling can be shared!"],"word",False),
 (68.0,76.0,"Verse 3 — Mad","Sunny,Koda,Bram",
  "kids show a safe MAD face — slightly scrunched brow — and do small soft in-place stomps, contained and gentle, no pounding",
  ["Mad face","Stomp it out (soft and small)"],"word",False),
 (76.0,84.0,"Verse 3 — Mad","Sunny,Leo,Mia",
  "kids gently shake their hands in the air to let the mad feeling out, then place both hands on their hearts to calm down; Sunny models the calm breath",
  ["Shake those hands — then calm","Let it out — your body understands!"],"word",False),
 (84.0,92.0,"Bridge","Sunny,Mimi,Pipa",
  "call and response: Sunny calls out and the kids quickly switch faces — a big happy smile, then a gentle sad frown",
  ["Show me happy!","Show me sad!"],"word",False),
 (92.0,100.0,"Bridge","Sunny,Bram,Koda",
  "kids switch to a safe strong mad face, then a slightly wide-eyed scared face with a small self-hug (gentle, not frightening), then relax",
  ["Show me mad!","Show me scared!"],"word",False),
 (100.0,110.0,"Final Hook","Sunny,Mimi,Leo,Mia",
  "each child shows one feeling then slowly relaxes into a calm neutral face; Sunny nods warmly and gives a reassuring thumbs-up that all feelings are okay",
  ["Every feeling has a show","Every single feeling's right!"],"word",False),
 (110.0,999,"Outro","Sunny,Koda,Bram,Mia",
  "soft slow ending: kids share a gentle group hug in a little circle, calm and smiling together, warm and safe",
  ["All your feelings","Perfectly there!"],"end",False),
]

def tokens(names):
    return " ".join("[%s <<<%s>>>]"%(n, ELEM[n]) for n in names)

clips=[]
for i,(start,end,sec,cast,action,lines,kind,logo) in enumerate(SHOTS):
    s=round(start,3); e=round(min(end,DUR),3); slot=round(e-s,3)
    names=cast.split(",")
    anch=" ".join(ANCHOR[n] for n in names if n in ANCHOR)
    cap="ONLY %s are present in the frame — no other children, no background kids, no crowd."%(", ".join(names))
    prompt="%s %s %s. %s %s %s"%(tokens(names), anch, action, cap, REINF, STYLE)
    okind = "end" if kind=="end" else "word"
    ov=[]
    if len(lines)==1:
        ov.append([lines[0],0.06,0.94,okind])
    else:
        ov.append([lines[0],0.05,0.47,okind])
        ov.append([lines[1],0.52,0.95,okind])
    clips.append({"clip_id":"F%02d"%(i+1),"section":sec,"cast":names,
                  "start":s,"end":e,"dur":slot,"kind":kind,"logo":logo,
                  "prompt":prompt,"overlays":ov})

spec={"song":"How Do You Feel?","audio":"_staging/audio/how-do-you-feel.mp3","duration":DUR,
      "n":len(clips),"out":"sunny-and-the-crew/song-shorts/How-Do-You-Feel.mp4",
      "logo":"sunny-and-the-crew/brand/logo-sunny-and-the-crew.png","style":STYLE,"clips":clips}
json.dump(spec,open("_staging/feelings/shot_spec.json","w"),indent=2)
from collections import Counter
c=Counter()
for cl in clips:
    for n in cl["cast"]: c[n]+=1
print("shots:",len(clips),"  song dur %.2f"%DUR)
for cl in clips:
    print("  %s %-16s %6.2f-%6.2f (%4.1fs) logo=%s  %s"%(cl["clip_id"],cl["section"],cl["start"],cl["end"],cl["dur"],cl["logo"],cl["overlays"][0][0]))
print("cast coverage:",dict(c))
print("OK -> _staging/feelings/shot_spec.json")
