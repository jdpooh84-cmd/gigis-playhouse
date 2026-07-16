# Sunny and the Crew — optimized workflow, behavior contract & prompt templates

Grounded in the real sessions that built EP01 + 5 song shorts (Zoomy, Wiggle,
Move Like the Animal, Ten Little Fingers, Scrub Scrub Scrub). Purpose: fewer tokens,
fewer credits, no repeated mistakes.

---

## Claude behavior contract for this project (the 15 rules)
1. **Scope before volume.** A broad ask ("build X") gets a short scoped plan first, not a wall of text. If a reply would be long, propose the smallest useful chunk and wait.
2. **Files over walls.** Anything reusable (specs, contracts, references) goes into a repo file; chat gets a tight recap + link.
3. **Read canon first.** Cast/IDs/rules come from `characters.json` / `show_bible.json` / `production_rules.json`. Never invent a character or guess an element ID.
4. **One render per shot.** Fix defects at assembly level; re-render a single shot only for a true content defect, never the whole song.
5. **Render via subagent.** Keep giant prompts out of the main context; the subagent returns counts + URLs only.
6. **Subagents pace by polling**, never background `sleep` (it stalls them).
7. **Always AAC + faststart** on final mux; **always `-loop 1`** on the logo.
8. **Text overlays are mine**, never trusted to the AI frame (it misspells). Auto-fit long lines; curly apostrophe.
9. **QC every build** with a per-shot frame montage before delivery.
10. **Expect the Make double-fire**; dedup to exactly one Drive file every time.
11. **No child-in-bath imagery.** Hygiene songs = dressed kids + sink + wash-a-toy. Never reword to bypass a safety filter.
12. **No audio = stop and ask.** Duration locks the whole build.
13. **Copy a build script → update every path** (spec, results, audio, workdir, prints).
14. **Report defects honestly**; flag, don't hide (baked typos, stray animals, clipped outro).
15. **Quiet during long work.** Speak on the finished deliverable or a genuine blocker, not every render tick.

---

## End-to-end stages (what I need from you → how I respond)

**Stage 0 — Setup (once).** Inputs: none new. I read `CLAUDE.md` + canon JSON. No questions about IDs/rules already in there.

**Stage 1 — Character work.** You: the change in 1–3 lines (or a new reference image). Me: update `characters.json` as a **delta** (show the changed fields), regenerate only affected element(s), never rewrite the whole file or re-render unaffected shots.

**Stage 2 — Episode design.** You: theme + teaching goal. Me: a shot/section OUTLINE (table) for approval before any prose or render.

**Stage 3 — Script.** You: outline sign-off + any must-hit lines. Me: script in the episode template; revisions as line-level deltas, not full rewrites.

**Stage 4 — Music/song video.** You: the finished MP3 (attached) + the filled song template. Me: duration-lock → 14–20 shot spec → subagent renders once each → CI assemble → QC montage → one Drive upload. I stay quiet through the render wait.

**Stage 5 — Visuals.** You: which shot + what's wrong. Me: fix at assembly level if possible (overlay/logo/timing); single-shot re-render only for a content defect.

**Stage 6 — Logging.** Me: end each substantive session with a 5-line delta (what shipped, Drive links, open items) appended to the relevant doc — so the next session starts warm.

**Context discipline:** reuse committed scripts/specs (copy newest), summarize instead of re-reading transcripts, keep render payloads in subagents.

---

## Prompt templates (use these with me)

**Character update**
```
Character: <name>. Change: <what's different, 1–3 lines>. Reference image: <attach or none>.
Keep everything else locked. Update characters.json as a delta and regenerate only this element.
```

**Episode outline**
```
Episode: <title>. Teaching focus (ONE thing): <...>. Setting: <or "pick from locations.json">.
Give me a shot/section OUTLINE table first for approval — no script yet.
```

**Script revision**
```
Script: <episode>. Change these lines only: <list>. Keep the rest. Show me a line-level diff.
```

**Music / song video** (the mature path — reuse the full song template you already have)
```
Build the <title> song video. Audio attached. Cap ~<N> shots, 720p, render each shot once,
stitch to my audio, upload one MP4 to Drive, stop. Mood: <1 line>. Anything to avoid: <1 line>.
```

**Visual/music direction (a single shot)**
```
Shot <id> in <song/episode>: <what's wrong / what I want>. Fix at assembly level if you can.
```

**End-of-session summary (ask me for this)**
```
Give me a 5-line wrap: what shipped, Drive links, credits used, open items, what to send next time.
```

---

## Before vs after

| Dimension | Before (early sessions) | After (this workflow) |
|---|---|---|
| Tokens/session | High — giant echoed prompts, walls of text | Low — renders in subagents, reusable files, scoped replies |
| Backtracks | Many — path bug, apostrophe/overflow, logo flash, subagent stalls, bath dead-end | Few — pitfalls encoded as rules; caught in QC not after delivery |
| Output clarity | Mixed — long recaps, some over-narration | Plan-first, tables/deltas, one QC montage |
| Artifact reuse | Low — rebuilt scripts from scratch, re-asked for IDs | High — copy newest script, IDs/rules in CLAUDE.md |
| Cartoon consistency | Risk of wrong IDs / "Coda" vs "Koda" | Locked IDs + canon read first |
| Credits | Wasted on re-renders + rejected framings | 1 render/shot; safe framings known upfront; balance checked |
| Delivery | Double-uploads, MP3-in-MP4 unplayable | AAC+faststart, dedup to one file, QC before send |

**Why this keeps us making right turns:** the expensive mistakes from these sessions are
now written down as rules and encoded in the build scripts, so I don't rediscover them on
your budget. I scope before I spend, delegate heavy rendering so the chat stays cheap, fix
defects in assembly instead of re-rendering, and deliver one verified, playable file — then
log a short delta so the next session starts where this one ended instead of relearning it.
