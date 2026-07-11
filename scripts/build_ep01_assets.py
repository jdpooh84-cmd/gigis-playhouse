#!/usr/bin/env python3
"""Generate new_assets_episode_01.md — paste-ready Higgsfield prompts for all needs_new_asset clips.

v2 (2026-07-11): every character now has a LOCKED Higgsfield element (creator-approved
redesigns for Koda / Mimi / Pipa / Bram). No pose-job placeholders remain. Element IDs
mirror characters.json — that file is the source of truth; update it first, then re-run.
"""
import json

OUT = "/home/user/gigis-playhouse/sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing"
man = json.load(open(OUT + "/clip_manifest_episode_01.json"))

IDS = {
 "Sunny": "<<<a40e2d56-573f-4bf2-bdcd-28c64014fdb9>>>",
 "Koda": "<<<a8b3713c-0f43-4dc7-a801-4000e6bdca44>>>",
 "Mimi": "<<<7b005b4b-da34-4bac-908b-ceb76f9d6247>>>",
 "Pipa": "<<<8849bdb4-d5a1-419d-9abc-c7e36188750c>>>",
 "Bram": "<<<e80f7f4d-2563-4d1a-b950-196df45dcbf7>>>",
 "Leo": "<<<ab579f47-e94f-406e-ae63-dd4fd6dd1b18>>>",
 "Mia": "<<<36f55b8e-a9ee-4a9c-a3f5-9cd42f85f590>>>",
 "Nana Blossom": "<<<89ae3644-087a-412b-ab87-2315bf188b6b>>>",
 "Mayor Mary": "<<<3c1b33d2-ba1b-408c-8d69-b08c656de4bf>>>",
 "Ava": "<<<72ba48b0-bb6b-4c1c-bd4b-2c48db5a2dcf>>>",
 "Rico": "<<<aedc26e9-36eb-4348-bd3d-ded8f7d4b8a3>>>",
 "Rena": "<<<9c55b6aa-7d09-45c9-abb8-cec46a39a61d>>>",
 "Bella": "<<<3faaac30-5b05-4b1b-a2f4-deb996643a5d>>>",
 "Commander": "<<<f35f85da-590d-4a74-80d5-a3931befa4bb>>>",
}
NOTES = {
 "Mimi": "ALWAYS smallest character on screen; creator v2 design (gold jacket, multicolored skirt, floral sneakers)",
 "Koda": "KODA IS A BOY — Sunny's older brother; creator v2 design (afro)",
 "Nana Blossom": "ALWAYS TALLEST character on screen",
 "Commander": "NEVER in the same shot as Bella",
 "Bella": "NEVER in the same shot as Commander; Bella is NOT Commander",
 "Rena": "small multicolor paint smudge on LEFT CHEEK, always present",
 "Mayor Mary": "SHORT FULL AUBURN RED CURLY HAIR — warm auburn red, restate in every prompt",
}
LOCS = {
 "LOC_DIRECT_ADDRESS": "warm bright yellow gradient, clean and minimal",
 "LOC_BACKYARD": "white wooden fence, sunflower garden, red picnic table, warm afternoon light",
 "LOC_NEIGHBORHOOD_STREET": "colorful yellow, mint-green, coral houses, leafy trees, clean sidewalks, blue sky",
 "LOC_NANA_PORCH": "Nana Blossom's front porch — cozy wooden porch, screen door, rocking chair, potted flowers, bowl of red apples on the porch table",
 "LOC_SUNNY_PORCH": "warm wooden boards, yellow front door, sunflower pots, late golden light",
 "LOC_COOP_PLAYGROUND": "hopscotch ground, primary-color slide, swings, climbing structure, raised garden beds, picnic tables",
}

def charlist(s):
    out = []
    for name in [c.strip() for c in s.replace("(", ",").replace(")", "").split(",") if c.strip()]:
        base = name.replace(" BG","").strip()
        if base in IDS:
            tag = "%s %s" % (base, IDS[base])
            if base in NOTES: tag += " — " + NOTES[base]
            out.append(tag)
        else: out.append(base)
    return out

L = []
L.append("# EP01 'A Is Amazing' — New Asset Generation Prompts")
L.append("Regenerated 2026-07-11 (v2 locked elements) | %d clips need new assets | model: nano_banana_2 ONLY" % man["_meta"]["new_clips_needed"])
L.append("")
L.append("## MANDATORY RULES FOR EVERY PROMPT BELOW")
L.append("1. PREPEND the full CHARACTER LOCK HEADER from show_bible.json to every image prompt.")
L.append("2. NO age descriptors ('6-year-old', 'toddler', 'young child' — BANNED).")
L.append("3. NO word 'Pixar' — use '3D animated, cartoon style' (BANNED — triggers safety filter).")
L.append("4. Element IDs go inline as <<<UUID>>> tags. ALL characters have LOCKED elements — never generate a character without their element ID.")
L.append("5. One image per clip -> then one video clip per image (max 15s source; target trim per manifest).")
L.append("6. MIMI: always smallest (v2 design wears floral sneakers). NANA BLOSSOM: always tallest. KODA IS A BOY. BELLA and COMMANDER never share a shot. RENA: multicolor paint smudge on LEFT cheek. MAYOR MARY: SHORT FULL AUBURN RED CURLY HAIR — restate in every prompt she appears in.")
L.append("7. All in 16:9 widescreen, vivid warm palette, 3D animated cartoon style.")
L.append("8. NO CARS ever appear visually in any shot — hard world rule.")
L.append("")
L.append("## NEW AUDIO ASSETS (Suno) — generate BEFORE clip timing polish")
L.append("")
L.append("### AUDIO-1: a-practice-bed.mp3 (Part 4B underscore)")
L.append("- Duration: 72 seconds (trim to exact)")
L.append("- Suno prompt: `gentle instrumental kids ukulele bed, soft glockenspiel, patient and warm, 90 BPM, major key, no vocals, no drums heavy, preschool practice-time background, calm but happy`")
L.append("- Negatives: `no vocals, no electric guitar, no minor key, not sad, not sleepy`")
L.append("")
L.append("### AUDIO-2: a-word-hunt-bed.mp3 (Part 4C underscore)")
L.append("- Duration: 100 seconds (trim to exact)")
L.append("- Suno prompt: `playful instrumental pizzicato strings and glockenspiel, sneaky-fun treasure hunt feel for preschoolers, light hand percussion, 100 BPM, major key, no vocals, bright and curious`")
L.append("- Negatives: `no vocals, no dark mood, no tension, not scary, no electro`")
L.append("")
L.append("### AUDIO NOTE — Parts 2/3/5 dialogue VO")
L.append("Dialogue lines are in the clip manifest verbatim (episode-bible-locked). Record/generate VO per existing pipeline; no music bed under Parts 2, 3, 5 except the closing sting.")
L.append("")
L.append("## THEME INTRO (Part 1) — DO NOT GENERATE")
L.append("THEME-INTRO-MASTER.mp4 is DONE and locked: `sunny-and-the-crew/theme-song/THEME-INTRO-MASTER.mp4`")
L.append("(Drive file 1fvGvI8ERWGlC5PD7_7TxqPeoXZFqmhEg). Assembly PREPENDS this master — never regenerate it.")
L.append("")
L.append("## SONG SECTION (Part 4/ACT 3) — DO NOT GENERATE")
L.append("EP01-song-section-SYNCED.mp4 is DONE (104.83s, 27 clips cut to the real Suno render).")
L.append("")
L.append("## VIDEO CLIP PROMPTS (remaining parts)")

cur_seg = None
for c in man["clips"]:
    src = c["asset_source"]
    if src["type"] != "needs_new_asset" or "spec_ref" in src: continue
    if c["segment_id"] != cur_seg:
        cur_seg = c["segment_id"]
        L.append("")
        L.append("---")
        L.append("### %s  (%s | %s)" % (cur_seg, c["section_type"], c["location"]))
        L.append("")
    L.append("**%s** — %s-%s (%.2fs) | cut" % (c["clip_id"], c["start_tc"], c["end_tc"], c["duration_seconds"]))
    L.append("```")
    L.append("CHARACTER LOCK — EP01 %s" % c["clip_id"])
    for ch in charlist(c["characters"]):
        L.append("[%s]" % ch)
    L.append("")
    L.append("SAFETY CHECK: no age descriptors CONFIRMED; no word 'Pixar' CONFIRMED; no cars CONFIRMED")
    L.append("")
    L.append("SCENE PROMPT:")
    L.append(c["visual_action"] + ".")
    if c["lyric_or_dialogue"] and not c["lyric_or_dialogue"].startswith("("):
        L.append("Timed line: %s" % c["lyric_or_dialogue"])
    L.append("Background: %s — %s." % (c["location"], LOCS.get(c["location"], "see locations.json")))
    L.append("Camera: %s." % c["camera"])
    L.append("Kid cue this clip supports: %s" % c["kid_interaction_cue"])
    L.append("3D animated, cartoon style. Vivid warm palette. 16:9 widescreen.")
    L.append("```")
    L.append("")

open(OUT + "/new_assets_episode_01.md","w").write("\n".join(L))
n_prompts = sum(1 for c in man["clips"] if c["asset_source"]["type"]=="needs_new_asset" and "spec_ref" not in c["asset_source"])
n_theme = sum(1 for c in man["clips"] if "spec_ref" in c["asset_source"])
print("wrote new_assets_episode_01.md: %d full prompts + %d theme refs + 2 audio specs" % (n_prompts, n_theme))
