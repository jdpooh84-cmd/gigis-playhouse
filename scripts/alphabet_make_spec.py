#!/usr/bin/env python3
"""Author the Alphabet Adventure Train shot spec (18 shots).

Letter words are placed as multiple overlays per shot, evenly spread across the slot so
each 'X is for ...' lands roughly as it's sung (110 BPM, steady 4/4). Bright train world,
safe copyable movement for ages 4-7. Sunny leads; 3-4 kids/shot rotating, all 7 appear.
"""
import json, os

DUR = 229.512
N = 18
SLOT = DUR / N  # ~12.75s

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
         "rounded dimensional forms, bright cheerful ALPHABET ADVENTURE TRAIN world — a colorful "
         "train with big letter-decorated cars moving through friendly sunny landscapes (fields, "
         "town, sky), high-saturation warm colors, glowing shining letters, daytime. Kids happily "
         "act out the letter movement, safe and simple for ages 4-7, clear readable faces, on-model, "
         "theatrical quality. Safe copyable motion — no climbing on the train, no rough play, no long "
         "fast spins. Absolutely NO text, no words, no letters spelled out, no captions in the frame. "
         "NOT 2D, NOT flat, NOT outlined, NOT storybook.")
STYLE_SOFT = STYLE.replace("high-saturation warm colors", "warm gentle colors, calmer")

def spread(texts, lo=0.08, hi=0.92, kind="word"):
    """evenly place N overlay phrases across [lo,hi] of the slot."""
    n=len(texts); out=[]
    if n==0: return out
    span=(hi-lo)/n
    for i,t in enumerate(texts):
        f0=lo+i*span+0.01; f1=lo+(i+1)*span-0.01
        out.append([t, round(f0,3), round(f1,3), kind])
    return out

# (section, cast, action, overlays_list, kind_flag)  kind_flag: title|word|soft|end
SHOTS = [
    ("Intro","Sunny,Koda,Mimi",
     "the colorful alphabet train pulls into view, Sunny waves happily from a train-car door, ready to go",
     ["All aboard the letter train"], "title"),
    ("Intro","Sunny,Leo,Bram,Mia",
     "kids gather cheerfully at a bright train platform as glowing letters A to Z shine above the train cars",
     ["A to Z we ride along"], "word"),
    # Verse 1a
    ("Verse 1a","Sunny,Mimi,Leo",
     "A: mime eating an apple with a gentle bite; then B: soft in-place mini jumps, happy",
     ["A is for apple","B is for bounce"], "word"),
    ("Verse 1a","Koda,Pipa,Bram",
     "C: curl arms and body cozy like a cat; then D: a slow gentle spin then a warm self-hug, arms wrapped around themself",
     ["C is for cat","D is for dance"], "word"),
    # Verse 1b
    ("Verse 1b","Sunny,Bram,Mia,Leo",
     "E: slow big elephant stomps in place; F: marching a little quicker; G: giggle and point to themselves saying their name",
     ["E is for elephant","F is for fast","G is for giggle"], "word"),
    ("Verse 1b","Mimi,Koda,Pipa",
     "H: gentle hopscotch hops over drawn squares; I: fingers creep like little insects; J: jellyfish wobble, arms floating up and down",
     ["H is for hopscotch","I is for insect","J is for jellyfish"], "word"),
    ("Verse 1b","Sunny,Leo,Mia,Bram",
     "K: kindly hand a toy to a friend; L: soft little leaps with gentle landings; M: reach both arms high like a mountain peak",
     ["K is for kind","L is for leap","M is for mountain"], "word"),
    # Chorus 1
    ("Chorus 1","Sunny,Mimi,Koda,Pipa",
     "wide shot marching beside the moving letter train, drawing letters in the air with index fingers, simple clear arcs",
     ["Alphabet Adventure Train","Draw your letters in the air","March your feet and hum along"], "word"),
    # Verse 2a
    ("Verse 2a","Sunny,Bram,Leo",
     "N: scrunch noses playfully; O: roll an orange ball left and right between hands; P: penguin waddle with small side-steps",
     ["N is for nose","O is for orange","P is for penguin"], "word"),
    ("Verse 2a","Mimi,Mia,Koda",
     "Q: mime placing a pretend crown on head; R: crouch low then stretch up like a rocket, fingers pointing straight up; S: big arm stretch up high",
     ["Q is for queen","R is for rocket","S is for stretch"], "word"),
    # Verse 2b
    ("Verse 2b","Sunny,Pipa,Leo",
     "T: sway side to side like a clock pendulum; U: hold an umbrella and gently tap feet as it pops open",
     ["T is for tick-tock","U is for umbrella"], "word"),
    ("Verse 2b","Koda,Bram,Mia",
     "V: crouch and lightly rumble like a volcano then stand tall; W: wiggle hips and shoulders, fun and contained",
     ["V is for volcano","W is for wiggle"], "word"),
    ("Verse 2b","Sunny,Mimi,Leo,Pipa",
     "X: stand straight and tall arms out in an alternating up-down pattern along the line; Y: cup hands near mouth and cheerfully call out",
     ["X is for x-ray","Y is for yell"], "word"),
    ("Verse 2b","Sunny,Koda,Bram",
     "Z: a short safe jog in place, giving it all with big happy energy",
     ["Z is for zoom"], "word"),
    # Chorus 2
    ("Chorus 2","Sunny,Mia,Mimi,Bram",
     "crew drawing a flowing A-to-Z ribbon of letters in the air as the train passes through new scenery",
     ["Draw your letters in the air","A to Z and back","Singing as we glide"], "word"),
    # Bridge (calmer)
    ("Bridge","Sunny,Pipa",
     "calmer moment, one or two kids stand tall, take a visible deep breath, and gently trace A B C in the air",
     ["Take a breath — say your ABCs","Letters are your best friends"], "soft"),
    # Final Chorus
    ("Final Chorus","Sunny,Koda,Mimi,Leo,Bram",
     "high-energy but safe inside a train car, gentle fist-pumps and marching in place, big glowing letters around them",
     ["I know my A B C!","Letters are the key"], "word"),
    # Outro
    ("Outro","Sunny,Mia,Pipa,Koda",
     "the train glides to a gentle stop, letters A-Z shimmer and wave above the track, the crew waves goodbye, motion settles",
     ["See you next ride","Learn along with me"], "end"),
]
assert len(SHOTS)==N, len(SHOTS)

def tokens(cast):
    return " ".join("[%s <<<%s>>>]"%(n, ELEM[n]) for n in cast.split(","))

clips=[]
for i,(sec,cast,action,texts,kind) in enumerate(SHOTS):
    start=round(i*SLOT,3); end=round((i+1)*SLOT,3)
    st = STYLE_SOFT if kind in ("soft","end") else STYLE
    prompt="%s %s. %s"%(tokens(cast), action, st)
    okind = "end" if kind=="end" else ("soft" if kind=="soft" else "word")
    ov=spread(texts, kind=okind)
    logo = (kind=="title")
    clips.append({"clip_id":"L%02d"%(i+1),"section":sec,"cast":cast.split(","),
                  "start":start,"end":end,"dur":round(SLOT,3),"kind":kind,"logo":logo,
                  "prompt":prompt,"overlays":ov})

spec={"song":"Alphabet Adventure Train","audio":"_staging/audio/alphabet-adventure-train.mp3","duration":DUR,
      "n":N,"slot":round(SLOT,4),"out":"sunny-and-the-crew/song-shorts/Alphabet-Adventure-Train.mp4",
      "logo":"sunny-and-the-crew/brand/logo-sunny-and-the-crew.png","style":STYLE,"clips":clips}
os.makedirs("_staging/alphabet",exist_ok=True)
json.dump(spec,open("_staging/alphabet/shot_spec.json","w"),indent=2)
from collections import Counter
c=Counter()
for cl in clips:
    for n in cl["cast"]: c[n]+=1
print("shots:",len(clips),"slot=%.3fs"%SLOT,"total=%.1fs"%(len(clips)*SLOT))
print("cast coverage:",dict(c))
print("letters covered A-Z across verse shots; overlays synced by even spread.")
print("OK -> _staging/alphabet/shot_spec.json")
