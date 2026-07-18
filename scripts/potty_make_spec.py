#!/usr/bin/env python3
"""Author The Potty Dance shot spec — from the client scene spec, adapted to the pipeline.

The client spec (SC-01..SC-08 + title card) is honored for content, order, and overlays, but:
  * The video model maxes ~10s, so long scenes (esp. SC-05 30s) are subdivided into ~10s shots,
    section-timed to the REAL 131.2s audio (the spec's example durations overshoot; scaled down).
  * The word "Pixar" is NEVER used in prompts (canon safety-filter rule) — replaced with the
    house 3D-CGI style block.
  * The "Sunny and the Crew" logo + "The Potty Dance" title are composited on the intro shot
    (held ~2.5s, fade ~1s) instead of a separate silent pre-roll, so video length == audio length.
  * Sunny is anchored by her locked element AND a short appearance line (prevents the drift the
    creator flagged on prior songs). Bears are described consistently every shot.

HARD SAFETY (baked into every prompt, from the spec's No-fly rule): the three stuffed bears are
ALWAYS fully clothed, no clothing removal; the small yellow TOY potty chair is only ever shown
side-angle or front-flat, never from above, never a front-down view; this is a bedroom full of
toys — NO real bathroom, NO human child on a potty, NO anatomical detail; warm and celebratory,
never clinical or shaming.
"""
import json

BG = json.load(open("_staging/potty/beatgrid.json"))
DUR = BG["dur"]

SUNNY = "a40e2d56-573f-4bf2-bdcd-28c64014fdb9"
SUNNY_ANCHOR = ("Sunny has warm medium-brown skin and TWO LARGE HIGH puff buns (pink tie on the "
                "right, yellow tie on the left) and a yellow t-shirt with a white cloud emblem and "
                "orange shorts.")
BEARS = ("The three stuffed bears are Teddy (brown bear in denim overalls), Fluffy (cream bear in "
         "a floral dress) and Mr. Buttons (gray bear in a button-up shirt) — all fully clothed.")
SAFE = ("The stuffed bears stay FULLY CLOTHED at all times, no clothing removal. The small yellow "
        "TOY potty chair is shown only from a side or front-flat angle, never from above, never a "
        "front-down view. This is a cheerful bedroom full of toys — NO real bathroom, NO human "
        "child on a potty, NO anatomical detail. Warm, funny and celebratory, never clinical.")
STYLE = ("polished stylized 3D CGI animated preschool feature look, soft subsurface skin shading, "
         "rounded dimensional forms, soft rim lighting, gently saturated child-safe warm colors. "
         "Setting: Sunny's colorful bedroom — warm wood floors, pastel walls, soft natural daylight "
         "from a window at the left of frame, a small yellow toy potty chair in the corner. "
         "Absolutely NO text, no words, no letters, no captions in the frame. "
         "NOT 2D, NOT flat, NOT outlined, NOT storybook.")

def tok():
    return "[Sunny <<<%s>>>]"%SUNNY

# (start, end, scene, action, [overlay lines], kind, logo)
SHOTS = [
 (0.0,8.0,"SC-01 Intro",
  "wide shot of the cheerful bedroom: Sunny sits cross-legged on a colorful rug with Teddy and Fluffy propped upright in front of her like tiny students; the camera eases in and their little bear feet hop nervously left and right in a quick shuffle; pan up to Sunny's wide knowing smile",
  ["The Potty Dance","Uh oh... look at those feet go!"],"title",True),
 # SC-02 Verse 1 (8-28)
 (8.0,18.0,"SC-02 Verse 1",
  "Sunny kneels on the rug leaning toward Teddy with a delighted amused expression, pointing at Teddy's hopping feet; close insert of Teddy's cute squinty 'I need to go' face, still happy not distressed; Fluffy makes the same face, feet bouncing",
  ["That's the potty dance","Look at those feet!"],"word",False),
 (18.0,28.0,"SC-02 Verse 1",
  "Sunny stands in teacher mode pointing at each bear with an encouraging nod; on the beat a bright speech bubble pops above Teddy reading POTTY in bold cheerful block letters as colorful confetti bursts; Sunny claps once and laughs",
  ["Say the word","POTTY!"],"word",False),
 # SC-03 Pre-Hook (28-37)
 (28.0,37.0,"SC-03 Pre-Hook",
  "medium shot: Sunny performs the potty dance herself, hopping left and right with playful exaggerated energy, pointing down at her own feet then laughing; she opens her arms toward Teddy and Fluffy and pumps a gentle encouraging fist; the two bears nod back with determination",
  ["That's the Potty Dance","Say it proud"],"word",False),
 # SC-04 Hook 1 (37-54)
 (37.0,45.5,"SC-04 Hook 1",
  "all three bears — Teddy, Fluffy and Mr. Buttons — hop in a synchronized line on the rug while Sunny stands just behind them cheering; a red POTTY speech bubble pops over one bear, then a blue one over the next, each bursting like a confetti pop, carnival energy",
  ["Hop hop hop","Say POTTY!"],"word",False),
 (45.5,54.0,"SC-04 Hook 1",
  "Sunny steps forward and gently takes Teddy and Fluffy by the paws; all three begin walking together toward the small yellow toy potty chair in the bedroom corner; camera follows near floor level showing their feet walking in step",
  ["Do the Potty Dance","Walk the hall"],"word",False),
 # SC-05 Verse 2 (54-82) — beats A-E
 (54.0,63.0,"SC-05 Verse 2",
  "follow shot from behind as Sunny walks Teddy and Fluffy by the paws to the little yellow toy potty chair; then a SIDE-ANGLE only: Teddy (fully dressed in overalls) sits on the small yellow toy potty chair with feet dangling, Fluffy beside him giving a thumbs-up; bouncy numbers 1 to 10 float in the air as Sunny counts on her fingers, a gold star pops at ten",
  ["Sit right down — that's all","Count to ten"],"word",False),
 (63.0,72.0,"SC-05 Verse 2",
  "Teddy stands at a small white play sink with a rubber duck on the ledge; he presses the duck and an enormous comical mountain of soap bubbles erupts from the basin; Teddy rubs his paws together with exaggerated seriousness while Fluffy watches wide-eyed",
  ["Wash your paws","Bubbles everywhere!"],"word",False),
 (72.0,82.0,"SC-05 Verse 2",
  "Teddy shakes his paws dry and soap bubbles fly everywhere, one landing on Sunny's nose; he holds up clean paws in a happy jazz-hands pose; Teddy and Fluffy bow deeply, Mr. Buttons tries to bow and topples sideways, Sunny catches him and everyone laughs",
  ["Clean paws!","Great job, bears!"],"word",False),
 # SC-06 Hook 2 (82-98)
 (82.0,90.0,"SC-06 Hook 2",
  "fast, happy montage feel synced to the percussion: bears hopping on the rug, then Teddy's POTTY confetti bubble bursting, then Sunny walking the bears to the potty corner with paws held, then a side-angle of the yellow toy potty chair with a gold star sparkling above it",
  ["POTTY DANCE!","Bears all did it"],"word",False),
 (90.0,98.0,"SC-06 Hook 2",
  "a huge friendly bubble explosion from the play sink, then Teddy's clean paws in jazz-hands; final beat: Sunny turns to face the camera, points one finger warmly at the viewer and nods with a confident smile, Teddy Fluffy and Mr. Buttons crowd in beside her all looking at camera, confetti falling",
  ["YOU can too!","Your turn!"],"word",False),
 # SC-07 Final Hook (98-119)
 (98.0,108.5,"SC-07 Final Hook",
  "the bedroom feels like a mini carnival: all three bears march in a synchronized parade line doing the potty-dance hop — left, right, left, right, arms and paws pumping — and Sunny dances alongside them celebrating with full joy; bright confetti rains from above, big bouncy POTTY letters pop and dissolve into golden sparkles",
  ["POTTY DANCE!","Do the Potty Dance!"],"word",False),
 (108.5,119.0,"SC-07 Final Hook",
  "the parade builds: on the beat Sunny and all three bears point directly at the camera together, then everyone jumps with arms and paws raised in a big joyful freeze, golden sparkles showering down, maximum happy carnival energy",
  ["Every time those feet go hop","YOU know what to do!"],"word",False),
 # SC-08 Outro (119-end)
 (119.0,999,"SC-08 Outro",
  "calm warm landing: Teddy, Fluffy and Mr. Buttons sit back on their shelf relaxed and proud — Teddy's clean paws crossed, Fluffy grinning, Mr. Buttons wearing a small gold star sticker; Sunny sits on the rug below looking up with quiet pride, then turns and gives one warm unhurried nod to the camera; the view slowly pulls back to the whole cozy bedroom with the little yellow toy potty chair in the corner and one twinkling star above it, golden afternoon light, everything at rest",
  ["The Potty Dance","is waiting there for YOU"],"end",False),
]

clips=[]
for i,(start,end,scene,action,lines,kind,logo) in enumerate(SHOTS):
    s=round(start,3); e=round(min(end,DUR),3); slot=round(e-s,3)
    prompt="%s %s %s %s %s %s"%(tok(), SUNNY_ANCHOR, BEARS, action+".", SAFE, STYLE)
    okind = "end" if kind=="end" else "word"
    ov=[]
    if len(lines)==1: ov.append([lines[0],0.06,0.94,okind])
    else:
        ov.append([lines[0],0.05,0.47,okind]); ov.append([lines[1],0.52,0.95,okind])
    clips.append({"clip_id":"P%02d"%(i+1),"section":scene,"cast":["Sunny"],
                  "start":s,"end":e,"dur":slot,"kind":kind,"logo":logo,
                  "prompt":prompt,"overlays":ov})

spec={"song":"The Potty Dance","audio":"_staging/audio/the-potty-dance.mp3","duration":DUR,
      "n":len(clips),"out":"sunny-and-the-crew/song-shorts/The-Potty-Dance.mp4",
      "logo":"sunny-and-the-crew/brand/logo-sunny-and-the-crew.png","style":STYLE,"clips":clips}
json.dump(spec,open("_staging/potty/shot_spec.json","w"),indent=2)
print("shots:",len(clips),"  song dur %.2f"%DUR)
for cl in clips:
    print("  %s %-16s %6.2f-%6.2f (%4.1fs) logo=%s  %s"%(cl["clip_id"],cl["section"],cl["start"],cl["end"],cl["dur"],cl["logo"],cl["overlays"][0][0]))
print("OK -> _staging/potty/shot_spec.json")
