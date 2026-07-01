# 08 — Shot List

## Song: ZOOMY ZOOM FREEZE!

All shots are 16:9 aspect ratio. All characters are cartoon. No photorealism.

---

| Shot # | Scene | Shot Type | Background | Character Focus | Action Description | Higgsfield Job ID |
|--------|-------|-----------|-----------|----------------|-------------------|-------------------|
| VID-01 | S01 | Wide shot | Rainbow Meadow | Both | Ziggy and Bop waving and bouncing, cheerful expressions | TBD |
| VID-02 | S02 | Wide shot | Rainbow Meadow | Both | Zoom run-in-place with arms pumping fast | TBD |
| VID-03 | S02 | Wide shot | Rainbow Meadow | Both | FREEZE pose — both frozen mid-motion, funny expressions | TBD |
| VID-04 | S03 | Wide shot | Rainbow Meadow | Both | Running in place and arm pumping action | TBD |
| VID-05 | S04 | Wide shot | Rainbow Meadow | Both | Full body wiggle dance, fingers and toes waving | TBD |
| VID-06 | S05 | Wide shot | Rainbow Meadow | Both | Zoom/freeze sequence — hook repeat | TBD |
| VID-07 | S06 | Wide shot | Dance Stage | Both | Exaggerated slow-motion walk, big slow footsteps | TBD |
| VID-08 | S07 | Wide shot | Dance Stage | Both | Spin in place, then jump up and land | TBD |
| VID-09 | S08 | Wide shot | Dance Stage | Both | High energy zoom/freeze hook | TBD |
| VID-10 | S09 | Wide shot | Dance Stage | Both | Count-and-freeze: jump, spin, wiggle, FREEZE | TBD |
| VID-11 | S10 | Wide shot | Dance Stage | Both | Final hook — biggest energy, zoom and freeze finish | TBD |
| VID-12 | S11 | Wide shot | Rainbow Meadow | Both | Waving goodbye, final frozen silly pose | TBD |

---

## Video Generation Notes

### For Each Shot:
- Use `seedance_2_0` model for reference-driven consistent identity
- Pass character reference image IDs as `image_references`
- Pass background reference image IDs as `start_image`
- Duration: 5 seconds per shot
- Resolution: 720p (for speed), can upgrade to 1080p for final
- Aspect ratio: 16:9

### Shot Prompt Template:
```
[CHARACTER PROMPT BLOCK for characters in shot]
[BACKGROUND PROMPT BLOCK for background]
[ACTION DESCRIPTION for this shot]
Style: flat 2D cartoon animation, thick black outlines, bright saturated colors, no photorealism, child-friendly
```

### Continuity Priority:
1. Character colors must match reference images
2. Background elements must match reference images
3. Open dance space must remain in center of frame
4. All characters must remain cartoon (no drift toward realistic)
