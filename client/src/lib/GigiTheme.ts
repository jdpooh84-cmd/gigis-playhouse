/**
 * Gigi's Playhouse Theme Song
 * Music & Lyrics © 2026 Dreamz In Ink LLC
 * Original composition — all rights reserved
 * Generated via Web Audio API / Tone.js synthesis
 * No samples, no AI music services, no third-party rights
 */

import * as Tone from "tone";

export interface LyricLine {
  time: number; // seconds from start
  text: string;
  section: "verse1" | "prechorus" | "chorus" | "verse2" | "bridge" | "finalchorus";
}

export const LYRICS: LyricLine[] = [
  // Verse 1 (0s - 12s)
  { time: 0.5, text: "Wake up, little one, the sun is here,", section: "verse1" },
  { time: 3.5, text: "Gigi's waiting for you, never fear.", section: "verse1" },
  { time: 6.5, text: "Open your heart, open your mind,", section: "verse1" },
  { time: 9.5, text: "Every day we're learning something new to find.", section: "verse1" },

  // Pre-Chorus (12s - 18s)
  { time: 12.5, text: "Letters and numbers, science and art,", section: "prechorus" },
  { time: 15.5, text: "Stories and songs — it all starts here in your heart.", section: "prechorus" },

  // Chorus (18s - 30s)
  { time: 18.5, text: "This is Gigi's Playhouse, come on in!", section: "chorus" },
  { time: 21.5, text: "Every day's an adventure — let's begin!", section: "chorus" },
  { time: 24.5, text: "We'll laugh and we'll learn and we'll grow so tall,", section: "chorus" },
  { time: 27.5, text: "Gigi's Playhouse — there's a place for us all!", section: "chorus" },

  // Verse 2 (30s - 42s)
  { time: 30.5, text: "Look around — the world is full of wow,", section: "verse2" },
  { time: 33.5, text: "Ask the question, find the answer now.", section: "verse2" },
  { time: 36.5, text: "Every mistake is a stepping stone,", section: "verse2" },
  { time: 39.5, text: "In this Playhouse, you are never alone.", section: "verse2" },

  // Bridge (42s - 48s)
  { time: 42.5, text: "You've got something special, shining bright,", section: "bridge" },
  { time: 45.5, text: "Brilliant and brave — reach up for the light.", section: "bridge" },

  // Final Chorus (48s - 55s)
  { time: 48.5, text: "This is Gigi's Playhouse — come on in! ♪", section: "finalchorus" },
];

// F Major, 108 BPM
const BPM = 108;
const BEAT = 60 / BPM; // ~0.556s per beat

// Melody notes in F Major (F G A Bb C D E)
const MELODY_VERSE = ["F4", "A4", "C5", "A4", "G4", "F4", "G4", "A4"];
const MELODY_CHORUS = ["C5", "D5", "C5", "A4", "Bb4", "A4", "G4", "F4"];
const MELODY_BRIDGE = ["D5", "E5", "F5", "E5", "D5", "C5", "Bb4", "A4"];

let isPlaying = false;
let disposeFns: (() => void)[] = [];

export async function playGigiTheme(onLyricChange?: (line: LyricLine | null) => void): Promise<() => void> {
  if (isPlaying) return () => {};

  await Tone.start();
  isPlaying = true;

  // --- Instruments ---
  const ukulele = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "triangle" },
    envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.4 },
    volume: -12,
  }).toDestination();

  const piano = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sine" },
    envelope: { attack: 0.02, decay: 0.5, sustain: 0.3, release: 0.8 },
    volume: -14,
  }).toDestination();

  const glockenspiel = new Tone.Synth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.001, decay: 0.8, sustain: 0, release: 1.2 },
    volume: -18,
  }).toDestination();

  const bass = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.05, decay: 0.3, sustain: 0.6, release: 0.5 },
    volume: -16,
  }).toDestination();

  const pad = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sine" },
    envelope: { attack: 0.5, decay: 1, sustain: 0.8, release: 2 },
    volume: -22,
  }).toDestination();

  // Noise for claps/snaps
  const clap = new Tone.NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.1 },
    volume: -20,
  }).toDestination();

  disposeFns = [
    () => ukulele.dispose(),
    () => piano.dispose(),
    () => glockenspiel.dispose(),
    () => bass.dispose(),
    () => pad.dispose(),
    () => clap.dispose(),
  ];

  const now = Tone.now();

  // --- Schedule chord progressions ---
  // F Major progression: F - Bb - C - F (I - IV - V - I)
  const chordProg = [
    ["F3", "A3", "C4"],  // F
    ["Bb3", "D4", "F4"], // Bb
    ["C3", "E3", "G3"],  // C
    ["F3", "A3", "C4"],  // F
  ];

  // Schedule ukulele strums (every 2 beats)
  for (let bar = 0; bar < 28; bar++) {
    const chord = chordProg[bar % 4];
    const t = now + bar * BEAT * 2;
    ukulele.triggerAttackRelease(chord, BEAT * 1.5, t);
  }

  // Schedule bass (root notes, every 2 beats)
  const bassNotes = ["F2", "Bb2", "C2", "F2"];
  for (let bar = 0; bar < 28; bar++) {
    const t = now + bar * BEAT * 2;
    bass.triggerAttackRelease(bassNotes[bar % 4], BEAT * 1.8, t);
  }

  // Schedule pad (sustained chords, every 4 bars)
  for (let section = 0; section < 7; section++) {
    const t = now + section * BEAT * 8;
    pad.triggerAttackRelease(chordProg[section % 4], BEAT * 7, t);
  }

  // Schedule melody
  const scheduleMelody = (notes: string[], startBeat: number) => {
    notes.forEach((note, i) => {
      const t = now + (startBeat + i * 1.5) * BEAT;
      glockenspiel.triggerAttackRelease(note, BEAT * 1.2, t);
    });
  };

  // Verse 1 melody (beat 0)
  scheduleMelody(MELODY_VERSE, 0);
  // Pre-chorus (beat 12)
  scheduleMelody(MELODY_CHORUS.slice(0, 4), 12);
  // Chorus (beat 18)
  scheduleMelody(MELODY_CHORUS, 18);
  // Verse 2 (beat 30)
  scheduleMelody(MELODY_VERSE, 30);
  // Bridge (beat 42)
  scheduleMelody(MELODY_BRIDGE, 42);
  // Final chorus (beat 48)
  scheduleMelody(MELODY_CHORUS, 48);

  // Schedule claps on beats 2 and 4 (backbeat) during chorus sections
  for (let beat = 18; beat < 30; beat += 2) {
    clap.triggerAttackRelease(BEAT * 0.1, now + (beat + 1) * BEAT);
  }
  for (let beat = 48; beat < 56; beat += 2) {
    clap.triggerAttackRelease(BEAT * 0.1, now + (beat + 1) * BEAT);
  }

  // Piano fills during pre-chorus and bridge
  const pianoFill = ["C5", "D5", "E5", "F5"];
  pianoFill.forEach((note, i) => {
    piano.triggerAttackRelease(note, BEAT * 0.5, now + (14 + i * 0.5) * BEAT);
    piano.triggerAttackRelease(note, BEAT * 0.5, now + (44 + i * 0.5) * BEAT);
  });

  // --- Schedule lyrics ---
  if (onLyricChange) {
    LYRICS.forEach((line) => {
      Tone.getTransport().schedule(() => {
        onLyricChange(line);
      }, line.time);
    });

    // Clear lyrics at end
    Tone.getTransport().schedule(() => {
      onLyricChange(null);
    }, 55);
  }

  Tone.getTransport().bpm.value = BPM;
  Tone.getTransport().start();

  // Stop function
  return () => {
    stopGigiTheme();
  };
}

export function stopGigiTheme() {
  if (!isPlaying) return;
  Tone.getTransport().stop();
  Tone.getTransport().cancel();
  disposeFns.forEach((fn) => fn());
  disposeFns = [];
  isPlaying = false;
}

export function isThemePlaying() {
  return isPlaying;
}
