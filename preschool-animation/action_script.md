# ZOOMY ZOOM FREEZE — Animation Action Script

BPM: 110 | FPS: 30 | Duration: ~159s | Frame count: 4770
Beat = 0.5455s | Bar = 2.182s

Each row is one animation event. Actions are NON-NEGOTIABLE — every lyric is a command.

---

## Validation Rules (applied per event)

| Code | Meaning |
|------|---------|
| FREEZE_CRITICAL | ALL body motion stops within 1 frame of event start. Mouth may continue if vocals continue. |
| ACTION_ON_BEAT | Body action starts on the exact beat of the lyric, not a frame later. |
| DURATION_EXACT | Action runs only for this event window. No carryover into next event. |
| EXAGGERATED | Motion amplitude is large — visible at a glance on a small screen. |

---

## INTRO (t=0–8.73s)

| t_start | t_end | Lyric | Character | Action | Validation |
|---------|-------|-------|-----------|--------|------------|
| 0.00 | 4.36 | *(instrumental)* | Leo + Zoe | bounce_wave | ACTION_ON_BEAT, EXAGGERATED |
| 4.36 | 8.73 | *(instrumental cont.)* | Leo + Zoe | point_camera | ACTION_ON_BEAT |

---

## VERSE 1 (t=8.73–35.27s)

| t_start | t_end | Lyric | Character | Action | Validation |
|---------|-------|-------|-----------|--------|------------|
| 8.73 | 12.00 | "Zoomy zoom zoom!" | Leo + Zoe | zoom_run | ACTION_ON_BEAT, EXAGGERATED |
| 12.00 | 14.18 | "Everybody zoom zoom!" | Leo + Zoe | zoom_run | DURATION_EXACT |
| 14.18 | 16.36 | "Zoom zoom zoom—" | Leo + Zoe | zoom_run | DURATION_EXACT |
| 16.36 | 17.45 | **"FREEZE!"** | Leo + Zoe | **freeze** | **FREEZE_CRITICAL** |
| 17.45 | 20.73 | "Zoom zoom zoom!" | Leo + Zoe | zoom_run | ACTION_ON_BEAT |
| 20.73 | 22.91 | "Everybody zoom!" | Leo + Zoe | zoom_run | DURATION_EXACT |
| 22.91 | 25.09 | "Zoom zoom zoom—" | Leo + Zoe | zoom_run | DURATION_EXACT |
| 25.09 | 26.18 | **"FREEZE!"** | Leo + Zoe | **freeze** | **FREEZE_CRITICAL** |

---

## CHORUS 1 (t=26.18–52.73s)

| t_start | t_end | Lyric | Character | Action | Validation |
|---------|-------|-------|-----------|--------|------------|
| 26.18 | 28.36 | "Wiggle wiggle wiggle!" | Leo + Zoe | wiggle | ACTION_ON_BEAT, EXAGGERATED |
| 28.36 | 30.55 | "Wiggle to the beat!" | Leo + Zoe | wiggle | DURATION_EXACT |
| 30.55 | 32.73 | "Wiggle all your fingers" | Leo + Zoe | wiggle_fingers_toes | ACTION_ON_BEAT |
| 32.73 | 34.91 | "Wiggle all your toes!" | Leo + Zoe | wiggle_fingers_toes | DURATION_EXACT |
| 34.91 | 35.64 | *(transition)* | Leo + Zoe | zoom_run | ACTION_ON_BEAT |
| 35.64 | 37.09 | "Zoom zoom zoom!" | Leo + Zoe | zoom_run | EXAGGERATED |
| 37.09 | 39.27 | "Everybody zoom!" | Leo + Zoe | zoom_run | DURATION_EXACT |
| 39.27 | 41.45 | "Zoom zoom zoom—" | Leo + Zoe | zoom_run | DURATION_EXACT |
| 41.45 | 42.55 | **"FREEZE!"** | Leo + Zoe | **freeze** | **FREEZE_CRITICAL** |
| 42.55 | 45.82 | "Pump your arms up HIGH!" | Leo + Zoe | arm_pump | ACTION_ON_BEAT, EXAGGERATED |
| 45.82 | 48.00 | "Pump 'em to the sky!" | Leo + Zoe | arm_pump | DURATION_EXACT |
| 48.00 | 50.18 | "Zoom zoom zoom—" | Leo + Zoe | zoom_run | ACTION_ON_BEAT |
| 50.18 | 51.27 | **"FREEZE!"** | Leo + Zoe | **freeze** | **FREEZE_CRITICAL** |
| 51.27 | 52.73 | *(hold/breath)* | Leo + Zoe | bounce | — |

---

## VERSE 2 (t=52.73–79.27s)

| t_start | t_end | Lyric | Character | Action | Validation |
|---------|-------|-------|-----------|--------|------------|
| 52.73 | 55.00 | "Shake shake shake!" | Leo + Zoe | full_body_shake | ACTION_ON_BEAT, EXAGGERATED |
| 55.00 | 57.18 | "Shake your whole body!" | Leo + Zoe | full_body_shake | DURATION_EXACT |
| 57.18 | 59.36 | "Shake shake shake—" | Leo + Zoe | full_body_shake | DURATION_EXACT |
| 59.36 | 60.45 | **"FREEZE!"** | Leo + Zoe | **freeze** | **FREEZE_CRITICAL** |
| 60.45 | 63.73 | "Zoom zoom zoom!" | Leo + Zoe | zoom_run | ACTION_ON_BEAT |
| 63.73 | 65.91 | "Everybody zoom!" | Leo + Zoe | zoom_run | DURATION_EXACT |
| 65.91 | 68.09 | "Zoom zoom zoom—" | Leo + Zoe | zoom_run | DURATION_EXACT |
| 68.09 | 69.18 | **"FREEZE!"** | Leo + Zoe | **freeze** | **FREEZE_CRITICAL** |

---

## CHORUS 2 (t=69.18–95.73s)

| t_start | t_end | Lyric | Character | Action | Validation |
|---------|-------|-------|-----------|--------|------------|
| 69.18 | 71.36 | "Wiggle wiggle wiggle!" | Leo + Zoe | wiggle | ACTION_ON_BEAT, EXAGGERATED |
| 71.36 | 73.55 | "Wiggle to the beat!" | Leo + Zoe | wiggle | DURATION_EXACT |
| 73.55 | 75.73 | "Wiggle all your fingers" | Leo + Zoe | wiggle_fingers_toes | ACTION_ON_BEAT |
| 75.73 | 77.91 | "Wiggle all your toes!" | Leo + Zoe | wiggle_fingers_toes | DURATION_EXACT |
| 77.91 | 80.18 | "Zoom zoom zoom!" | Leo + Zoe | zoom_run | ACTION_ON_BEAT |
| 80.18 | 82.36 | "Everybody zoom!" | Leo + Zoe | zoom_run | DURATION_EXACT |
| 82.36 | 84.55 | "Zoom zoom zoom—" | Leo + Zoe | zoom_run | DURATION_EXACT |
| 84.55 | 85.64 | **"FREEZE!"** | Leo + Zoe | **freeze** | **FREEZE_CRITICAL** |
| 85.64 | 88.91 | "Pump your arms up HIGH!" | Leo + Zoe | arm_pump | ACTION_ON_BEAT, EXAGGERATED |
| 88.91 | 91.09 | "Pump 'em to the sky!" | Leo + Zoe | arm_pump | DURATION_EXACT |
| 91.09 | 93.27 | "Zoom zoom zoom—" | Leo + Zoe | zoom_run | ACTION_ON_BEAT |
| 93.27 | 94.36 | **"FREEZE!"** | Leo + Zoe | **freeze** | **FREEZE_CRITICAL** |
| 94.36 | 95.73 | *(hold)* | Leo + Zoe | bounce | — |

---

## BRIDGE — SLOW-MO SECTION (t=95.73–122.27s)

| t_start | t_end | Lyric | Character | Action | Validation |
|---------|-------|-------|-----------|--------|------------|
| 95.73 | 98.00 | "Speed it up…" | Leo + Zoe | slow_motion | ACTION_ON_BEAT |
| 98.00 | 100.18 | "Here it comes…" | Leo + Zoe | slow_motion | DURATION_EXACT |
| 100.18 | 102.36 | "Slooow… it… down…" | Leo + Zoe | slow_motion | EXAGGERATED |
| 102.36 | 106.73 | "ZOOM!" | Leo + Zoe | zoom_run | ACTION_ON_BEAT, EXAGGERATED |
| 106.73 | 109.00 | "Spin around!" | Leo + Zoe | spin | ACTION_ON_BEAT, EXAGGERATED |
| 109.00 | 111.18 | "Jump jump jump!" | Leo + Zoe | jump | ACTION_ON_BEAT, EXAGGERATED |
| 111.18 | 113.36 | "Jump to the beat!" | Leo + Zoe | jump | DURATION_EXACT |
| 113.36 | 115.55 | "Jump jump jump—" | Leo + Zoe | jump | DURATION_EXACT |
| 115.55 | 116.64 | **"FREEZE!"** | Leo + Zoe | **freeze** | **FREEZE_CRITICAL** |

---

## CHORUS 3 / OUTRO (t=116.64–159.0s)

| t_start | t_end | Lyric | Character | Action | Validation |
|---------|-------|-------|-----------|--------|------------|
| 116.64 | 118.82 | "Wiggle wiggle wiggle!" | Leo + Zoe | wiggle | ACTION_ON_BEAT |
| 118.82 | 121.00 | "Wiggle to the beat!" | Leo + Zoe | wiggle | DURATION_EXACT |
| 121.00 | 123.18 | "Wiggle all your fingers" | Leo + Zoe | wiggle_fingers_toes | ACTION_ON_BEAT |
| 123.18 | 125.36 | "Wiggle all your toes!" | Leo + Zoe | wiggle_fingers_toes | DURATION_EXACT |
| 125.36 | 127.55 | "Zoom zoom zoom!" | Leo + Zoe | zoom_run | ACTION_ON_BEAT |
| 127.55 | 129.73 | "Everybody zoom!" | Leo + Zoe | zoom_run | DURATION_EXACT |
| 129.73 | 131.91 | "Zoom zoom zoom—" | Leo + Zoe | zoom_run | DURATION_EXACT |
| 131.91 | 133.00 | **"FREEZE!"** | Leo + Zoe | **freeze** | **FREEZE_CRITICAL** |
| 133.00 | 135.18 | "Pump your arms up HIGH!" | Leo + Zoe | arm_pump | ACTION_ON_BEAT |
| 135.18 | 137.36 | "Pump 'em to the sky!" | Leo + Zoe | arm_pump | DURATION_EXACT |
| 137.36 | 139.55 | "Zoomy zoom zoom…" | Leo + Zoe | zoom_run | ACTION_ON_BEAT |
| 139.55 | 141.73 | "Everybody zoom!" | Leo + Zoe | zoom_run | DURATION_EXACT |
| 141.73 | 143.91 | "Zoom zoom zoom—" | Leo + Zoe | zoom_run | DURATION_EXACT |
| 143.91 | 145.00 | **"FREEZE!"** | Leo + Zoe | **freeze** | **FREEZE_CRITICAL** |
| 145.00 | 147.18 | "One more time!" | Leo + Zoe | bounce | ACTION_ON_BEAT |
| 147.18 | 151.55 | "ZOOMY ZOOM FREEZE!" | Leo + Zoe | zoom_run | ACTION_ON_BEAT, EXAGGERATED |
| 151.55 | 153.73 | "We did it!" | Leo + Zoe | arm_pump | ACTION_ON_BEAT |
| 153.73 | 155.91 | "Now everybody…" | Leo + Zoe | point_camera | ACTION_ON_BEAT |
| 155.91 | 157.00 | **"FREEZE!"** | Leo + Zoe | **freeze** | **FREEZE_CRITICAL** |
| 157.00 | 159.00 | *(end pose)* | Leo + Zoe | freeze | — |

---

## Freeze Event Summary

Total freeze events: **12**
All are marked FREEZE_CRITICAL — must stop within 1 frame.

Critical freeze timestamps (seconds):
16.36, 25.09, 41.45, 50.18, 59.36, 68.09, 84.55, 93.27, 115.55, 131.91, 143.91, 155.91
