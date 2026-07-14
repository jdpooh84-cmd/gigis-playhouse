#!/usr/bin/env python3
"""Generate the beat-snapped 30-shot spec for Zoomy Zoom Freeze from beatgrid.json.

Snaps every shot boundary to the detected beat grid, assigns renderable casting
(2-4 kids/shot, larger only at freeze finales), a seedance action prompt, a
lip-sync flag (drive mouth from the song slice on featured/chant lines), and the
overlay events (ZOOM / FREEZE / movement words / numbers 1-10) timed to beats.
"""
import json, os, numpy as np

BG = json.load(open("_staging/zoomy/beatgrid.json"))
BEATS = BG["beat_times"]; SEC = {s["section"]:(s["start"],s["end"]) for s in BG["sections_snapped"]}
FRZ = {f["section"]:f for f in BG["freeze_hits"]}
OUT = "_staging/zoomy/shot_spec.json"

ELEM = {  # locked Higgsfield element ids
 "Sunny":"a40e2d56-573f-4bf2-bdcd-28c64014fdb9","Coda":"7ce52e05-5bba-43f0-bb1e-8ca11974038c",
 "Mimi":"7b005b4b-da34-4bac-908b-ceb76f9d6247","Pippa":"8849bdb4-d5a1-419d-9abc-c7e36188750c",
 "Bram":"e80f7f4d-2563-4d1a-b950-196df45dcbf7","Leo":"ab579f47-e94f-406e-ae63-dd4fd6dd1b18",
 "Mia":"36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590"}
STYLE=("polished stylized 3D CGI animated feature — soft subsurface skin shading, rounded dimensional "
 "forms, real depth, cinematic key-and-fill lighting, gentle depth of field, sunny backyard playground "
 "with sunflowers, on-model, theatrical feature quality. NOT 2D, NOT flat, NOT outlined, NOT storybook.")

def snap(t): return min(BEATS, key=lambda b: abs(b-t))

# shot list: (section, cast, focus, action, lipsync_line_or_None, overlays[(text,rel_frac_start,rel_frac_end)])
# rel_frac is fraction of the SHOT span; FREEZE overlays use the detected stab (absolute) via 'freeze' key.
S=[]
def shot(section, frac0, frac1, cast, focus, action, line, overlays):
    s,e=SEC[section]; a=snap(s+(e-s)*frac0); b=snap(s+(e-s)*frac1)
    S.append(dict(section=section,cast=cast,focus=focus,action=action,line=line,overlays=overlays,_a=a,_b=b))

# INTRO
shot("Intro",0.00,0.33,["Sunny","Coda","Mia"],"group","full crew strike ready-to-dance poses, Sunny waves the crew and viewer in, bright energetic","Get ready to zoom, get ready to go",[("ZOOMY ZOOM FREEZE",0.0,1.0,"title")])
shot("Intro",0.33,0.66,["Sunny","Leo"],"mouth","Sunny to camera demonstrates moving fast then a slow freeze, Leo mirrors","Move your body fast then freeze up slow",[])
shot("Intro",0.66,1.00,["Sunny","Mimi","Bram"],"group","crew cheers arms up, ready to start the game","Zoomy Zoom Freeze starts today!",[("ZOOMY ZOOM FREEZE",0.0,0.6,"title")])
# HOOK 1
shot("Hook 1",0.00,0.34,["Sunny","Coda","Leo"],"teach","zoom fast (running-in-place, arms pumping) then SNAP into a crisp smiling freeze pose on the stab","Zoom zoom zoom and then you FREEZE!",[("ZOOM",0.0,0.55,"pulse"),("FREEZE!",0.55,1.0,"freeze")])
shot("Hook 1",0.34,0.68,["Coda","Mia","Leo"],"teach","wiggle fingers then bend knees, clear demonstration to camera","Wiggle your fingers, bend your knees!",[("wiggle",0.0,0.5,"word"),("bend",0.5,1.0,"word")])
shot("Hook 1",0.68,1.00,["Sunny","Mimi","Bram","Pippa"],"group","zoom then three quick freeze poses on 'freeze freeze freeze'","Zoom zoom zoom as fast as you please! Zoomy Zoom Freeze — freeze freeze freeze!",[("FREEZE",0.55,0.7,"freeze"),("FREEZE",0.7,0.85,"freeze"),("FREEZE",0.85,1.0,"freeze")])
# VERSE 1
shot("Verse 1",0.00,0.27,["Coda","Mia","Leo","Bram"],"group","crew runs in a circle round and round, camera follows","Run in a circle round and round",[("run",0.1,0.9,"word")])
shot("Verse 1",0.27,0.50,["Bram","Pippa"],"teach","stomp feet firmly on the ground, big steps","Stomp your feet right on the ground",[("stomp",0.1,0.9,"word")])
shot("Verse 1",0.50,0.73,["Mimi","Mia"],"group","wiggle arms up in the air then shake hips playfully","Wiggle your arms up in the air / Shake your hips without a care",[("wiggle",0.05,0.5,"word"),("shake",0.5,0.95,"word")])
shot("Verse 1",0.73,1.00,["Sunny","Coda"],"mouth","Sunny to camera builds anticipation, winding up for the zoom","Now get ready here it comes / Everybody zoom and then...",[])
# HOOK 2 (varied staging: low angle, new trio)
shot("Hook 2",0.00,0.34,["Sunny","Pippa","Mia"],"teach","low-angle: zoom fast then snap a big freeze pose on the stab","Zoom zoom zoom and then you FREEZE!",[("ZOOM",0.0,0.55,"pulse"),("FREEZE!",0.55,1.0,"freeze")])
shot("Hook 2",0.34,0.68,["Mimi","Pippa","Bram"],"teach","wiggle fingers then bend knees","Wiggle your fingers, bend your knees!",[("wiggle",0.0,0.5,"word"),("bend",0.5,1.0,"word")])
shot("Hook 2",0.68,1.00,["Sunny","Coda","Leo","Mia"],"group","zoom then triple freeze","freeze freeze freeze!",[("FREEZE",0.55,0.7,"freeze"),("FREEZE",0.7,0.85,"freeze"),("FREEZE",0.85,1.0,"freeze")])
# VERSE 2 (slow-mo)
shot("Verse 2",0.00,0.27,["Coda","Mia","Leo"],"teach","deliberate slow-motion movement, controlled and calm","Now move in slow-mo super slow",[("s l o w",0.1,0.9,"word")])
shot("Verse 2",0.27,0.50,["Coda","Leo"],"group","arms rise high then lower low, slow","Watch your arms go high then low",[])
shot("Verse 2",0.50,0.73,["Sunny","Mimi","Pippa"],"group","spin around like spinning tops, keep going","Spin around like a spinning top / Keep on going don't you stop",[("spin",0.1,0.9,"word")])
shot("Verse 2",0.73,1.00,["Sunny","Bram"],"mouth","Sunny to camera speeds it up, ramp from slow to fast","Now speed it up here it comes / Everybody zoom and then...",[])
# HOOK 3 (high wide, third trio)
shot("Hook 3",0.00,0.34,["Sunny","Bram","Leo"],"teach","high wide: zoom then snap freeze on the stab","Zoom zoom zoom and then you FREEZE!",[("ZOOM",0.0,0.55,"pulse"),("FREEZE!",0.55,1.0,"freeze")])
shot("Hook 3",0.34,0.68,["Sunny","Coda","Mia"],"teach","wiggle fingers then bend knees","Wiggle your fingers, bend your knees!",[("wiggle",0.0,0.5,"word"),("bend",0.5,1.0,"word")])
shot("Hook 3",0.68,1.00,["Mimi","Pippa","Bram","Coda"],"group","zoom then triple freeze","freeze freeze freeze!",[("FREEZE",0.55,0.7,"freeze"),("FREEZE",0.7,0.85,"freeze"),("FREEZE",0.85,1.0,"freeze")])
# BRIDGE (counting 1-10) — teaching payload
shot("Bridge",0.00,0.28,["Sunny","Coda","Mia"],"teach","Sunny counts one-two-three on fingers, crew freezes on three","Count with me — one two three / Everybody freeze with me!",[("1",0.15,0.4,"num"),("2",0.4,0.62,"num"),("3",0.62,1.0,"num")])
shot("Bridge",0.28,0.52,["Sunny","Mimi","Bram"],"teach","held freeze, count four-five-six, don't move","Four five six don't you move",[("4",0.05,0.35,"num"),("5",0.35,0.62,"num"),("6",0.62,1.0,"num")])
shot("Bridge",0.52,0.76,["Sunny","Pippa","Leo"],"teach","seven-eight, kids start to groove","Seven eight find your groove",[("7",0.1,0.5,"num"),("8",0.5,1.0,"num")])
shot("Bridge",0.76,1.00,["Sunny","Coda","Mia","Bram"],"group","nine-ten then explode back into zoom","Nine and ten zoom again!",[("9",0.05,0.4,"num"),("10",0.4,0.7,"num"),("ZOOM",0.7,1.0,"pulse")])
# FINAL HOOK (biggest)
shot("Final Hook",0.00,0.34,["Sunny","Coda","Mimi","Mia","Leo"],"group","max-energy zoom then a huge crew freeze on the stab","Zoom zoom zoom and then you FREEZE!",[("ZOOM",0.0,0.55,"pulse"),("FREEZE!",0.55,1.0,"freeze")])
shot("Final Hook",0.34,0.68,["Sunny","Coda","Mimi","Bram","Pippa"],"group","whole crew wiggles fingers then bends knees together","Wiggle your fingers, bend your knees!",[("wiggle",0.0,0.5,"word"),("bend",0.5,1.0,"word")])
shot("Final Hook",0.68,1.00,["Sunny","Mia","Leo","Pippa","Bram"],"group","zoom then triple freeze finale poses","freeze freeze freeze!",[("FREEZE",0.55,0.7,"freeze"),("FREEZE",0.7,0.85,"freeze"),("FREEZE",0.85,1.0,"freeze")])
# OUTRO
shot("Outro",0.00,0.30,["Sunny","Coda","Mia","Leo"],"group","one last zoom then freeze","Zoom and zoom and then you FREEZE!",[("ZOOM",0.0,0.5,"pulse"),("FREEZE!",0.5,1.0,"freeze")])
shot("Outro",0.30,0.62,["Sunny","Mimi","Pippa"],"mouth","Sunny warm to camera, crew waves; heartfelt","You're the best dance crew I've ever seen! / Come back soon and we'll dance again",[])
shot("Outro",0.62,1.00,["Sunny","Coda","Mimi","Mia","Leo","Bram","Pippa"],"group","final freeze pose plus wave goodbye, hold to music end","Zoomy Zoom Freeze THE END!",[("THE END",0.3,1.0,"title")])

clips=[]
for i,sh in enumerate(S):
    cid="Z%02d"%(i+1)
    tok=" ".join("[%s <<<%s>>>]"%(n,ELEM[n]) for n in sh["cast"])
    prompt="%s %s. %s"%(tok, sh["action"], STYLE)
    clips.append(dict(clip_id=cid, section=sh["section"], start=round(sh["_a"],3), end=round(sh["_b"],3),
        dur=round(sh["_b"]-sh["_a"],3), cast=sh["cast"], focus=sh["focus"], lipsync=bool(sh["line"]),
        line=sh["line"], prompt=prompt, overlays=sh["overlays"]))

json.dump({"audio":BG["audio"],"duration":BG["duration"],"bpm":BG["bpm"],
           "out":"sunny-and-the-crew/song-shorts/Zoomy-Zoom-Freeze.mp4","clips":clips},
          open(OUT,"w"), indent=1)
tot=sum(c["dur"] for c in clips)
print("wrote %s — %d shots, covered %.2fs (audio %.2fs)"%(OUT,len(clips),tot,BG["duration"]))
for c in clips: print("  %-4s %-11s %6.2f-%6.2f (%.2f) %-5s cast=%s"%(
    c["clip_id"],c["section"],c["start"],c["end"],c["dur"],c["focus"],"+".join(x[:2] for x in c["cast"])))
