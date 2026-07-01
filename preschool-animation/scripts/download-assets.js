#!/usr/bin/env node
/**
 * Downloads all static assets required by the Remotion composition into public/.
 * Run once before render: npm run prepare:assets
 *
 * Character sprites are generated placeholder PNGs when real assets are absent.
 * Replace them with actual illustrated sprites once artwork is finalised.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const { execSync } = require("child_process");

const PUBLIC = path.join(__dirname, "..", "public");
const CHARS = path.join(PUBLIC, "characters");
const BGS = path.join(PUBLIC, "backgrounds");
const AUDIO_DIR = path.join(PUBLIC, "audio");

// Source audio lives in the shared project folder
const AUDIO_SRC = path.join(
  __dirname,
  "..",
  "..",
  "preschool-video",
  "audio",
  "episode1",
  "Zoomy_Zoom_Freeze.mp3"
);
const AUDIO_DEST = path.join(AUDIO_DIR, "Zoomy_Zoom_Freeze.mp3");

[CHARS, BGS, AUDIO_DIR].forEach((d) => fs.mkdirSync(d, { recursive: true }));

// --- Audio ---
if (!fs.existsSync(AUDIO_DEST)) {
  if (fs.existsSync(AUDIO_SRC)) {
    fs.copyFileSync(AUDIO_SRC, AUDIO_DEST);
    console.log("Copied audio from project folder.");
  } else {
    console.error(
      `ERROR: Audio file not found at ${AUDIO_SRC}.\nPlace Zoomy_Zoom_Freeze.mp3 in preschool-video/audio/episode1/`
    );
    process.exit(1);
  }
} else {
  console.log("Audio already present.");
}

// --- Character sprites ---
// Expected files per character:
//   {char}_body.png         — neutral standing pose, full-body
//   {char}_mouth_closed.png — mouth layer (transparent except mouth area)
//   {char}_mouth_open.png   — mouth layer open
//   {char}_arms_up.png      — arm layer (transparent except arms raised)
//
// If real sprites don't exist yet, generate labelled placeholder PNGs with
// ImageMagick so the composition renders (needed for QA loop to start).

const CHARACTERS = ["leo", "zoe"];
const LAYERS = ["body", "mouth_closed", "mouth_open", "arms_up"];

const PLACEHOLDER_COLORS = {
  leo: { body: "#8B4513", mouth_closed: "transparent", mouth_open: "transparent", arms_up: "transparent" },
  zoe: { body: "#A0522D", mouth_closed: "transparent", mouth_open: "transparent", arms_up: "transparent" },
};

const hasImageMagick = (() => {
  try { execSync("convert --version", { stdio: "ignore" }); return true; }
  catch { return false; }
})();

for (const char of CHARACTERS) {
  for (const layer of LAYERS) {
    const dest = path.join(CHARS, `${char}_${layer}.png`);
    if (!fs.existsSync(dest)) {
      if (hasImageMagick) {
        const label = `${char}\\n${layer}`.replace(/_/g, " ");
        if (layer === "body") {
          const color = PLACEHOLDER_COLORS[char].body;
          execSync(
            `convert -size 440x800 xc:${color} ` +
            `-fill white -font DejaVu-Sans-Bold -pointsize 36 ` +
            `-gravity center -annotate 0 "${label}" ` +
            `"${dest}"`
          );
        } else {
          // Transparent layer with just a small label in corner
          execSync(
            `convert -size 440x800 xc:none ` +
            `-fill "rgba(0,0,0,0.3)" -font DejaVu-Sans -pointsize 20 ` +
            `-gravity SouthEast -annotate 0 "${layer}" ` +
            `"${dest}"`
          );
        }
        console.log(`Created placeholder: ${path.basename(dest)}`);
      } else {
        // Fallback: write a 1×1 transparent PNG (8-byte minimal PNG)
        const minPng = Buffer.from(
          "89504e470d0a1a0a0000000d4948445200000001000000010806000000" +
          "1f15c4890000000a49444154789c6260000000020001e221bc330000000049454e44ae426082",
          "hex"
        );
        fs.writeFileSync(dest, minPng);
        console.log(`Created 1×1 stub: ${path.basename(dest)} (install ImageMagick for proper placeholders)`);
      }
    }
  }
}

// --- Background images ---
const BG_FILES = ["meadow.png", "stage.png"];
const BG_COLORS = { "meadow.png": "#7EC850", "stage.png": "#2A1F6E" };

for (const bg of BG_FILES) {
  const dest = path.join(BGS, bg);
  if (!fs.existsSync(dest)) {
    if (hasImageMagick) {
      const label = bg.replace(".png", "").toUpperCase();
      execSync(
        `convert -size 1920x1080 xc:${BG_COLORS[bg]} ` +
        `-fill white -font DejaVu-Sans-Bold -pointsize 80 ` +
        `-gravity center -annotate 0 "${label}" ` +
        `"${dest}"`
      );
      console.log(`Created background placeholder: ${bg}`);
    } else {
      const minPng = Buffer.from(
        "89504e470d0a1a0a0000000d4948445200000001000000010806000000" +
        "1f15c4890000000a49444154789c6260000000020001e221bc330000000049454e44ae426082",
        "hex"
      );
      fs.writeFileSync(dest, minPng);
      console.log(`Created 1×1 stub: ${bg}`);
    }
  }
}

console.log("Asset preparation complete.");
