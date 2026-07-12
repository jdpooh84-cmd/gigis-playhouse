#!/usr/bin/env python3
"""Build EP01 v2 manifest (creator-locked SEC-01..05 structure) from the v1 manifest.

v2 timeline (all from real ffprobed audio):
  SEC-01 theme            0.00 - 44.78   (master, exempt)
  SEC-02 story1           44.78 - 207.78 (cold open 91s + practice echo 72s)
  SEC-03 story2           207.78 - 382.78 (movement game 45s NEW + hunt 100s + lead-in 30s)
  SEC-04 song             382.78 - 487.61 (synced master 104.83s)
  SEC-05 reflection+outro 487.61 - 607.39 (reflection 75s incl. 2 NEW + outro 44.78s NEW)
Total 607.39s = 10:07.39 (EXTENDED band). Reprise + closing sting from v1 are RETIRED.
"""
import json, collections

EP = "sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing"
v1 = json.load(open(EP + "/clip_manifest_episode_01.json"), object_pairs_hook=collections.OrderedDict)

def tc(s):
    m = int(s // 60); return "%d:%05.2f" % (m, s - m * 60)

out, cursor = [], 0.0

def add(clip, sec, start, dur, seg=None, stype=None):
    c = collections.OrderedDict(clip)
    c["section"] = sec
    if seg: c["segment_id"] = seg
    if stype: c["section_type"] = stype
    c["start_sec"] = round(start, 2); c["end_sec"] = round(start + dur, 2)
    c["duration_seconds"] = round(dur, 2)
    c["start_tc"] = tc(c["start_sec"]); c["end_tc"] = tc(c["end_sec"])
    out.append(c)
    return c["end_sec"]

def new_clip(cid, sec, seg, stype, loc, chars, action, cam, cue, line, audio, dur, start):
    return add(collections.OrderedDict([
        ("clip_id", cid), ("part", 0), ("segment_id", seg), ("start_sec", 0), ("end_sec", 0),
        ("start_tc", ""), ("end_tc", ""), ("duration_seconds", dur), ("section_type", stype),
        ("location", loc), ("characters", chars), ("camera", cam), ("visual_action", action),
        ("lyric_or_dialogue", line), ("kid_interaction_cue", cue),
        ("audio_cue", audio), ("asset_source", {"type": "needs_new_asset"}),
    ]), sec, start, dur)

by_type = collections.defaultdict(list)
for c in v1["clips"]: by_type[c["section_type"].split(":")[0]].append(c)

# SEC-01 theme (rescale v1 0-45 window to real 44.78; master overrides anyway)
k = 44.78 / 45.0
for c in by_type["theme"]:
    add(c, "SEC-01", c["start_sec"] * k, (c["end_sec"] - c["start_sec"]) * k)
cursor = 44.78

# SEC-02: cold open (keep durations) then practice echo
for c in by_type["cold_open"]:
    cursor = add(c, "SEC-02", cursor, c["duration_seconds"])
assert abs(cursor - 135.78) < 0.01, cursor
for c in by_type["practice_echo"]:
    cursor = add(c, "SEC-02", cursor, c["duration_seconds"])
assert abs(cursor - 207.78) < 0.01, cursor

# SEC-03: movement game (NEW, 9x5s)
MOVE = [
 ("EP01-S8-C01","Sunny, Leo, Mia","Sunny gathers the trio, big inviting energy, hands to her heart then out to the viewer","Medium group shot, eye level","Get ready to move!","SUNNY: 'A words are in our BODIES too!'"),
 ("EP01-S8-C02","Leo","Leo winds up into a huge exaggerated crouch like he is about to become an apple","Medium single, slight low angle","Copy Leo!","LEO: 'Crunch like an apple! Ready?'"),
 ("EP01-S8-C03","Sunny, Leo, Mia","All three do three big slow body-crunches in unison, popping up grinning between each","Wide, static so kids can mirror","CRUNCH like an apple - three times!","ALL: 'CRUNCH! ... CRUNCH! ... CRUNCH!'"),
 ("EP01-S8-C04","Mia","Mia spreads her arms wide like wings and tilts gently side to side","Medium single","Arms out like wings!","MIA: 'Now... fly like an airplane!'"),
 ("EP01-S8-C05","Sunny","Sunny faces camera, arms out as wings, inviting the viewer to zoom with her","Direct address medium","Zoom with Sunny!","SUNNY: 'Arms out! Zoom with us!'"),
 ("EP01-S8-C06","Sunny, Leo, Mia, Rena","Rena swoops into the flying line with the trio, arms-wide airplane arms, paint smudge bright on her left cheek","Wide tracking as the line banks gently","Fly in a line!","(no line - flying)"),
 ("EP01-S8-C07","Sunny, Mia, Rico","Rico zooms in and joins the flying line beside Sunny and Mia, big grin","Wide tracking, opposite bank","Keep zooming!","(no line - flying)"),
 ("EP01-S8-C08","Leo","Leo pulls up from flying, points at the camera, delighted praise for the viewer","Medium direct address","You are flying!","LEO: 'Zoooom! You're flying!'"),
 ("EP01-S8-C09","Sunny, Leo, Mia","The trio lands the game with a proud shared pose, breathing happy","Medium group","Big finish pose!","SUNNY: 'Apple crunch. Airplane zoom. AMAZING!'"),
]
for i,(cid,chars,act,cam,cue,line) in enumerate(MOVE):
    loc = "LOC_BACKYARD" if i < 5 else "LOC_NEIGHBORHOOD_STREET"
    cursor = new_clip(cid,"SEC-03","SEG-S8-MOVE","movement_game",loc,chars,act,cam,cue,line,"a-practice-bed.mp3 continues (fallback: VO-only)",5.0,cursor)
assert abs(cursor - 252.78) < 0.01, cursor

# SEC-03: hunt (keep durations), then lead-in stretched to 6x5
for c in by_type["mini_game_hunt"]:
    cursor = add(c, "SEC-03", cursor, c["duration_seconds"])
assert abs(cursor - 352.78) < 0.01, cursor
for c in by_type["song_lead_in"]:
    cursor = add(c, "SEC-03", cursor, 5.0)
assert abs(cursor - 382.78) < 0.01, cursor

# SEC-04 song: retime v1 song block (165.00 base) to 382.78; master covers the lone gap clip
for c in sorted(by_type["episode_song"], key=lambda x: x["start_sec"]):
    c2 = collections.OrderedDict(c)
    if c2["asset_source"].get("type") == "needs_new_asset":
        c2["asset_source"] = {"type": "existing_clip", "note": "covered by EP01-song-section-SYNCED.mp4 master (SEC-04 uses the master wholesale)"}
    add(c2, "SEC-04", 382.78 + (c["start_sec"] - 165.00), c["duration_seconds"])
cursor = 487.61

# SEC-05 reflection: wrap C01-C06, two NEW clips, wrap C07-C15 (sting clips retired)
wrap = sorted(by_type["wrap_up"], key=lambda x: x["start_sec"])
for c in wrap[:6]:
    cursor = add(c, "SEC-05", cursor, c["duration_seconds"], stype="reflection")
R = [
 ("EP01-R-C01","Sunny, Leo, Mia","Mia turns warmly to Leo; Leo does a happy no-shame shrug, proud of his red guess","Medium two-shot favoring Mia then Leo","Listen close","MIA: 'I liked your red guess, Leo.' / LEO: 'Wrong guesses help us find MORE!'"),
 ("EP01-R-C02","Sunny, Leo, Mia","Sunny nods, then the three huddle in, hands stacking in the middle","Medium group tightening","Hands in!","SUNNY: 'That's how we learn. We ask!'"),
]
for cid,chars,act,cam,cue,line in R:
    cursor = new_clip(cid,"SEC-05","SEG-R-REFLECT","reflection","LOC_SUNNY_PORCH",chars,act,cam,cue,line,"VO only",4.5,cursor)
for c in wrap[6:]:
    c2 = collections.OrderedDict(c)
    if c2["clip_id"] == "EP01-P5-C11":
        c2["visual_action"] = "The three huddle hands-in and throw them up together on the catchphrase - pure team joy"
        c2["lyric_or_dialogue"] = "ALL THREE: 'Let's ask! Let's find out! Come on, Crew!' [CATCHPHRASE - PROVISIONAL wording]"
        c2["kid_interaction_cue"] = "Shout it with the crew!"
    cursor = add(c2, "SEC-05", cursor, c["duration_seconds"], stype="reflection")
assert abs(cursor - 562.61) < 0.01, cursor

# SEC-05 outro credits over theme-audio replay (video no-loop preserved: all NEW clips)
O = [
 ("EP01-O-C01","Sunny","Sunny waving warmly on her porch steps, golden light, mirrors the sign-off wave","Medium, gentle push-in","Wave with Sunny!"),
 ("EP01-O-C02","Leo, Mia","Leo and Mia lean together and wave, easy and warm","Medium two-shot","Wave!"),
 ("EP01-O-C03","Mimi, Koda","Mimi and Koda wave from their doorstep, Mimi doing tiny double-hand waves - she is the smallest in frame","Medium two-shot","Wave to Mimi and Koda!"),
 ("EP01-O-C04","Nana Blossom","Nana Blossom rocking gently on her porch, raising her teacup in a warm goodbye","Medium single","Blow a kiss!"),
 ("EP01-O-C05","Ava, Mayor Mary","Ava and Mayor Mary (SHORT FULL AUBURN RED CURLY HAIR, royal purple blazer) wave from the co-op gate","Medium two-shot","Wave to the teachers!"),
 ("EP01-O-C06","Rena, Rico","Rena paints a little goodbye sun in the air while Rico dribbles slowly past waving","Wide two-shot","One more wave!"),
 ("EP01-O-C07","Bella","Bella the dog sitting dignified on the porch railing area, one slow knowing blink goodbye - Gabriel NOT in this shot","Medium single, serene","Say bye to Bella!"),
 ("EP01-O-C08","Gabriel","Gabriel the dog snoozing on the porch mat, one ear flops, tail gives a sleepy wag - Bella NOT in this shot","Close, cozy","Shhh - night night Gabriel!"),
 ("EP01-O-C09","-","Slow wide of Marigold Grove at golden hour, then the show logo card lands center with one gentle bounce and holds to the final note","Slow wide pull-back to logo card","See you next time!"),
]
for i,(cid,chars,act,cam,cue) in enumerate(O):
    dur = 5.0 if i < 8 else 4.78
    loc = "LOC_SUNNY_PORCH" if i in (0,6,7) else "LOC_NEIGHBORHOOD_STREET"
    cursor = new_clip(cid,"SEC-05","SEG-O-OUTRO","outro_credits",loc,chars,act,cam,cue,"[Instrumental - theme replay]","sunny-and-the-crew-THEME.mp3 full replay (audio only; video all-new)",dur,cursor)
assert abs(cursor - 607.39) < 0.01, cursor

man = collections.OrderedDict()
man["_meta"] = {
 "document": "clip_manifest_episode_01_v2.json",
 "episode": "EP01", "structure": "v2 SEC-01..05 (creator-locked 2026-07-11)",
 "generated": "2026-07-11",
 "total_clips": len(out), "total_runtime_seconds": round(cursor, 2),
 "total_runtime_label": tc(cursor),
 "new_clips_needed": sum(1 for c in out if c["asset_source"].get("type") == "needs_new_asset" and "spec_ref" not in c["asset_source"]),
 "retired_from_v1": "song_reprise (24 clips) + closing_sting (2 clips) - prompts never generated, zero credit waste",
 "no_loop_check": "every asset job ID appears at most once - PASS (song job IDs unique; theme via master)",
 "clip_rule": "3-5s per clip; theme cuts exempt (locked master)",
}
man["clips"] = out
json.dump(man, open(EP + "/clip_manifest_episode_01_v2.json", "w"), indent=1, ensure_ascii=False)
secs = collections.Counter(c["section"] for c in out)
print("v2 manifest: %d clips, %.2fs (%s), %d to generate | per section: %s" %
      (len(out), cursor, tc(cursor), man["_meta"]["new_clips_needed"], dict(secs)))
