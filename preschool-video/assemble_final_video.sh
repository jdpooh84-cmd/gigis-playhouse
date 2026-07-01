#!/bin/bash
# ZOOMY ZOOM FREEZE — Final Video Assembly Script
# Run this on any machine with internet access + ffmpeg installed.
# Output: preschool-video/FINAL_VIDEO_ZoomyZoomFreeze.mp4 (1920x1080 H.264/AAC)
#
# Usage:
#   chmod +x assemble_final_video.sh
#   ./assemble_final_video.sh
#
# Requires: curl, ffmpeg (brew install ffmpeg  OR  apt install ffmpeg)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VIDEO_DIR="$SCRIPT_DIR/video/episode1"
AUDIO="$SCRIPT_DIR/FINAL_AUDIO_ZoomyZoomFreeze.mp3"
OUTPUT="$SCRIPT_DIR/FINAL_VIDEO_ZoomyZoomFreeze.mp4"
FFMPEG="${FFMPEG:-ffmpeg}"

if ! command -v "$FFMPEG" &>/dev/null; then
  echo "ERROR: ffmpeg not found. Install with: brew install ffmpeg  OR  apt install ffmpeg"
  exit 1
fi

if [ ! -f "$AUDIO" ]; then
  echo "ERROR: $AUDIO not found. Make sure you're running from the repo root or preschool-video/ directory."
  exit 1
fi

mkdir -p "$VIDEO_DIR"
cd "$VIDEO_DIR"

# ─────────────────────────────────────────────
# STEP 1: Download 12 video clips from Higgsfield CDN
# ─────────────────────────────────────────────
echo ""
echo "=== STEP 1: Downloading video clips ==="

download() {
  local name="$1" url="$2"
  if [ -s "$name" ]; then
    echo "  ✓ $name already present ($(du -sh "$name" | cut -f1))"
  else
    echo "  ↓ $name …"
    curl -fsSL --retry 3 --retry-delay 2 -o "$name" "$url" \
      && echo "    done ($(du -sh "$name" | cut -f1))" \
      || { echo "    FAILED: $url"; exit 1; }
  fi
}

download "VID-01.mp4" "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_021940_69ab762b-05e7-4722-aa07-cd6d535c5c1a.mp4"
download "VID-02.mp4" "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_021952_624ab9bc-2f5f-439e-a020-97b0c3a5d47a.mp4"
download "VID-03.mp4" "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_021954_e4786021-5efb-4a80-a1d3-8239d8a5c1d4.mp4"
download "VID-04.mp4" "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_021957_9fc84309-8343-41ea-bde6-0627ecdbd549.mp4"
download "VID-05.mp4" "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_022000_5b0a8fc6-c95f-484e-8aef-83c038cd52ee.mp4"
download "VID-06.mp4" "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_070744_d260314d-e517-4aa7-95a5-0bb75eeb262f.mp4"
download "VID-07.mp4" "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_070745_c0382875-1157-491e-b0c7-d1d77a339a50.mp4"
download "VID-08.mp4" "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_022010_e1903d87-9422-481d-9a07-5d9495ad7d5e.mp4"

# VID-09: substitute with VID-08 (original job failed after 4 attempts)
if [ ! -s "VID-09.mp4" ]; then
  cp "VID-08.mp4" "VID-09.mp4"
  echo "  ✓ VID-09.mp4 (copy of VID-08 — generation failed; adjacent shot substituted)"
else
  echo "  ✓ VID-09.mp4 already present"
fi

download "VID-10.mp4" "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_022401_95515711-51d3-4022-ae0e-430b8e4e3048.mp4"
download "VID-11.mp4" "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_022405_96e3b087-bf43-4c1d-b5d0-5a95aa2c8bc5.mp4"
download "VID-12.mp4" "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_022530_bcf26b1f-435f-4053-a0bd-9b638a471f7a.mp4"

# ─────────────────────────────────────────────
# STEP 2: Build concat list
# ─────────────────────────────────────────────
echo ""
echo "=== STEP 2: Building concat list ==="
cat > concat.txt << 'CONCATEOF'
file 'VID-01.mp4'
file 'VID-02.mp4'
file 'VID-03.mp4'
file 'VID-04.mp4'
file 'VID-05.mp4'
file 'VID-06.mp4'
file 'VID-07.mp4'
file 'VID-08.mp4'
file 'VID-09.mp4'
file 'VID-10.mp4'
file 'VID-11.mp4'
file 'VID-12.mp4'
CONCATEOF
echo "  ✓ concat.txt written (12 clips)"

# ─────────────────────────────────────────────
# STEP 3: Assemble final video
# Audio is 2:39.84 (159.84s); 12 clips × 5s = 60s, so we loop the
# sequence with -stream_loop -1 and cut at -shortest to fill the audio.
# ─────────────────────────────────────────────
echo ""
echo "=== STEP 3: Assembling final video ==="
echo "  Audio: $AUDIO"
echo "  Output: $OUTPUT"
echo "  (This may take a few minutes)"

"$FFMPEG" -y \
  -stream_loop -1 -f concat -safe 0 -i concat.txt \
  -i "$AUDIO" \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,\
pad=1920:1080:(ow-iw)/2:(oh-ih)/2,\
fade=t=in:st=0:d=1,\
fade=t=out:st=158:d=1" \
  -af "afade=t=in:st=0:d=1,afade=t=out:st=158:d=1" \
  -c:v libx264 -preset medium -crf 18 \
  -c:a aac -b:a 192k -ar 48000 \
  -pix_fmt yuv420p \
  -map 0:v -map 1:a \
  -shortest \
  "$OUTPUT"

# ─────────────────────────────────────────────
# STEP 4: Quality check
# ─────────────────────────────────────────────
echo ""
echo "=== STEP 4: Quality check ==="
"$FFMPEG" -i "$OUTPUT" 2>&1 | grep -E "Duration|Stream|Video:|Audio:"
echo ""
echo "File size: $(du -sh "$OUTPUT" | cut -f1)"
echo ""
echo "✅ Done! FINAL_VIDEO_ZoomyZoomFreeze.mp4 is ready."
echo ""
echo "Next: git add preschool-video/FINAL_VIDEO_ZoomyZoomFreeze.mp4"
echo "      git add preschool-video/video/episode1/"
echo "      git commit -m 'ZOOMY ZOOM FREEZE — final video assembled'"
echo "      git push -u origin claude/preschool-cartoon-video-y50npq"
