#!/usr/bin/env python3
"""Author the Alphabet Adventure Train shot spec — BEAT-GRID TIMED (v2).

Root fix vs v1: shots are cut on the real bar grid (from beatgrid.json), the intro is
only its true length (~11s, not a 25s pair of shots), and each letter overlay appears at
the downbeat where it's actually sung (~2 bars per letter). Updated lyrics.
Sunny leads; 3-4 kids/shot rotating, all 7 appear; safe copyable movement for ages 4-7.
"""
import json, os

BG = json.load(open("_staging/alphabet/beatgrid.json"))
DB = BG["downbeats"]            # bar start times
DUR = BG["dur"]
def bt(bar):                    # time of a bar index, clamped
    return DB[bar] if bar < len(DB) else DUR

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
         "train with big letter-decorated cars moving through friendly sunny landscapes, high-"
         "saturation warm colors, glowing shining letters, daytime. Kids happily act out the letter "
         "movement, safe and simple for ages 4-7, clear readable faces, on-model, theatrical quality. "
         "Safe copyable motion — no climbing on the train, no rough play, no long fast spins. "
         "Absolutely NO text, no words, no letters spelled out, no captions in the frame. "
         "NOT 2D, NOT flat, NOT outlined, NOT storybook.")
STYLE_SOFT = STYLE.replace("high-saturation warm colors","warm gentle colors, calmer")

# Each shot: (start_bar, end_bar, section, cast, action, overlays, kind)
# overlays = list of (text, sung_bar)  -> shown from sung_bar until the next overlay/shot end.
SHOTS = [
 (0,5,"Intro","Sunny,Koda,Mimi",
  "the colorful alphabet train pulls into view; Sunny waves happily from a train-car door as kids gather; glowing letters shine on the cars",
  [("All aboard the letter train",0),("Letters start to glow",3)],"title"),
 # Verse 1 A-M  (2 bars per letter, single lines)
 (5,9,"Verse 1","Sunny,Mimi,Leo","A: mime eating an apple with a gentle bite. B: soft in-place mini jumps",
  [("A is for apple",5),("B is for bounce",7)],"word"),
 (9,13,"Verse 1","Koda,Pipa,Bram","C: curl up cozy like a cat. D: a slow gentle spin then a warm self-hug, arms wrapped around themself",
  [("C is for cat",9),("D is for dance",11)],"word"),
 (13,17,"Verse 1","Sunny,Bram,Mia","E: slow big elephant stomps in place. F: marching a little quicker",
  [("E is for elephant",13),("F is for fast",15)],"word"),
 (17,21,"Verse 1","Mimi,Leo,Koda","G: giggle happily and shout out their name. H: gentle hopscotch hops over drawn squares",
  [("G is for giggle",17),("H is for hopscotch",19)],"word"),
 (21,25,"Verse 1","Sunny,Pipa,Mia","I: fingers creep slow like little insects. J: jellyfish wobble, arms floating high and low",
  [("I is for insect",21),("J is for jellyfish",23)],"word"),
 (25,29,"Verse 1","Sunny,Bram,Leo","K: kindly share a toy with a friend. L: soft little leaps in place with gentle landings",
  [("K is for kind",25),("L is for leap",27)],"word"),
 (29,31,"Verse 1","Sunny,Mimi,Koda,Pipa","M: reach both arms high like a tall mountain peak, proud and happy",
  [("M is for mountain",29)],"word"),
 # Chorus 1 (split in two)
 (31,35,"Chorus 1","Sunny,Mimi,Koda,Pipa","wide shot marching beside the moving letter train, drawing letters in the air with index fingers",
  [("Alphabet Adventure Train",31),("Draw your letters in the air",33)],"word"),
 (35,39,"Chorus 1","Sunny,Leo,Bram,Mia","the crew marches in place and hums along beside the gliding train as letters float by",
  [("Singing as we glide",35),("March your feet, letters by your side",37)],"word"),
 # Verse 2 N-Z (single lines)
 (39,43,"Verse 2","Sunny,Bram,Leo","N: scrunch the nose up tight. O: roll a pretend orange left and right between hands",
  [("N is for nose",39),("O is for orange",41)],"word"),
 (43,47,"Verse 2","Mimi,Mia,Koda","P: penguin waddle with small side-steps. Q: mime putting on a pretend queen crown",
  [("P is for penguin",43),("Q is for queen",45)],"word"),
 (47,51,"Verse 2","Sunny,Pipa,Leo","R: crouch then blast up like a rocket, fingers pointing to the sky. S: big arm stretch up high",
  [("R is for rocket",47),("S is for stretching",49)],"word"),
 (51,55,"Verse 2","Koda,Bram,Mia","T: sway side to side like a clock. U: hold a pretend umbrella, gentle slow spin, tapping feet",
  [("T is for tick-tock",51),("U is for umbrella",53)],"word"),
 (55,59,"Verse 2","Sunny,Mimi,Leo","V: crouch and lightly rumble like a volcano then stand tall. W: wiggle and shake, fun and contained",
  [("V is for volcano",55),("W is for wiggle",57)],"word"),
 (59,63,"Verse 2","Sunny,Pipa,Koda","X: stand up straight and tall, arms out in an x-ray pose. Y: cup hands near mouth and cheerfully call out",
  [("X is for x-ray",59),("Y is for yelling",61)],"word"),
 (63,65,"Verse 2","Sunny,Mimi,Bram,Mia","Z: a short safe zippy jog in place, giving it all with big happy energy",
  [("Z is for zoom",63)],"word"),
 # Chorus 2 (split)
 (65,69,"Chorus 2","Sunny,Mia,Mimi,Bram","crew drawing a flowing A-to-Z ribbon of letters in the air as the train passes new scenery",
  [("Draw your letters in the air",65),("A to Z and back",67)],"word"),
 (69,73,"Chorus 2","Sunny,Koda,Leo,Pipa","marching in place and humming along beside the gliding train, singing happily",
  [("Singing as we glide",69),("Letters by your side",71)],"word"),
 # Bridge (calmer, split)
 (73,77,"Bridge","Sunny,Pipa","calmer moment: stand tall, take a visible deep breath, letters float gently around",
  [("Every letter has a job",73),("A to M and N to Z",75)],"soft"),
 (77,81,"Bridge","Sunny,Mimi","say your ABCs standing tall and proud, alphabet friends floating alongside, warm and calm",
  [("Say your ABCs",77),("Letters are your best friends",79)],"soft"),
 # Final Chorus (split)
 (81,85,"Final Chorus","Sunny,Koda,Mimi,Leo","high-energy but safe inside a train car, gentle fist-pump and march, big glowing letters",
  [("Now we learned them all",81),("Big letters, even small",83)],"word"),
 (85,89,"Final Chorus","Sunny,Bram,Mia,Pipa","pump a fist and march together, big bright smiles, letters all around",
  [("I know my A B C!",85),("Letters are the key",87)],"word"),
 # Outro (split; train slows -> slow-tail reads as the train decelerating)
 (89,96,"Outro","Sunny,Mia,Pipa","the train begins to slow, wheels quieting, the crew waves goodbye as letters shimmer above the track",
  [("The train slows down",89),("Letters waving, A to Z",92)],"word"),
 (96,999,"Outro","Sunny,Koda,Mimi","train glides to a gentle stop, letters A-Z wave and shimmer, calm settle",
  [("See you next ride",96),("Learn along with me",99)],"end"),
]

def tokens(cast):
    return " ".join("[%s <<<%s>>>]"%(n, ELEM[n]) for n in cast.split(","))

clips=[]
for i,(sb,eb,sec,cast,action,ovs,kind) in enumerate(SHOTS):
    # pin the very first clip to video-t 0 so cumulative video time == audio bar time
    # (otherwise the whole video leads the audio by bt(0)~0.4s and overlays land early)
    start=0.0 if i==0 else round(bt(sb),3)
    end=round(bt(eb),3); slot=round(end-start,3)
    st = STYLE_SOFT if kind in ("soft","end") else STYLE
    prompt="%s %s. %s"%(tokens(cast), action, st)
    okind = "end" if kind=="end" else ("soft" if kind=="soft" else "word")
    ov=[]
    for j,(text,sbar) in enumerate(ovs):
        f0=max(0.0,(bt(sbar)-start)/slot)
        nx = ovs[j+1][1] if j+1<len(ovs) else eb
        f1=min(1.0,(bt(nx)-start)/slot)
        f0=min(f0+0.01,0.97); f1=max(f1-0.02,f0+0.05)
        ov.append([text, round(f0,3), round(f1,3), okind])
    clips.append({"clip_id":"L%02d"%(i+1),"section":sec,"cast":cast.split(","),
                  "start":start,"end":end,"dur":slot,"kind":kind,"logo":(kind=="title"),
                  "prompt":prompt,"overlays":ov})

spec={"song":"Alphabet Adventure Train","audio":"_staging/audio/alphabet-adventure-train.mp3","duration":DUR,
      "n":len(clips),"out":"sunny-and-the-crew/song-shorts/Alphabet-Adventure-Train.mp4",
      "logo":"sunny-and-the-crew/brand/logo-sunny-and-the-crew.png","style":STYLE,"clips":clips}
json.dump(spec,open("_staging/alphabet/shot_spec.json","w"),indent=2)
from collections import Counter
c=Counter()
for cl in clips:
    for n in cl["cast"]: c[n]+=1
print("shots:",len(clips))
print("first letter A starts at %.2fs (was ~28s before)"%clips[1]["start"])
print("shot durations:", [round(cl["dur"],1) for cl in clips])
print("cast coverage:",dict(c))
print("OK -> _staging/alphabet/shot_spec.json")
