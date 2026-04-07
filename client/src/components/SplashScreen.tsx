/**
 * SplashScreen — Gigi appears first on every app open
 * Music & Lyrics © 2026 Dreamz In Ink LLC
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 * Plays Tone.js theme song with scrolling lyrics, shows Gigi character, fades to app
 */
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playGigiTheme, stopGigiTheme, type LyricLine } from "@/lib/GigiTheme";
import CharacterAvatar from "./CharacterAvatar";
import { getCharacterById } from "@/lib/characters";

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 12000 }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "playing" | "exit">("enter");
  const [currentLyric, setCurrentLyric] = useState<LyricLine | null>(null);
  const [audioStarted, setAudioStarted] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);
  const gigi = getCharacterById("gigi");

  const handleComplete = useCallback(() => {
    setPhase("exit");
    stopGigiTheme();
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  const startAudio = useCallback(async () => {
    if (audioStarted) return;
    setAudioStarted(true);
    try {
      const stop = await playGigiTheme((line) => {
        setCurrentLyric(line);
      });
      stopRef.current = stop;
    } catch {
      // Web Audio blocked — continue silently
    }
  }, [audioStarted]);

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("playing"), 800);
    const dismissTimer = setTimeout(() => handleComplete(), duration);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(dismissTimer);
      if (stopRef.current) stopRef.current();
    };
  }, [duration, handleComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
          style={{ background: "linear-gradient(135deg, #FFF8E1 0%, #FFF3E0 30%, #FCE4EC 70%, #F3E5F5 100%)" }}
          onClick={() => { startAudio(); handleComplete(); }}
        >
          {/* Floating shapes background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: 20 + (i * 7) % 60,
                  height: 20 + (i * 11) % 60,
                  left: `${(i * 8.3) % 100}%`,
                  top: `${(i * 7.7) % 100}%`,
                  background: ["#7C3AED33","#F59E0B33","#10B98133","#EC489933","#3B82F633","#F97316AA"][i % 6],
                  borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "30% 70% 70% 30% / 30% 30% 70% 70%" : "8px",
                }}
                animate={{ y: [0, -30, 0], x: [0, 15, 0], rotate: [0, 180, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* Gigi character */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
            className="relative z-10 mb-6"
          >
            <CharacterAvatar character={gigi} size="xl" state="celebrating" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-5xl md:text-6xl font-black text-gray-800 mb-2 relative z-10"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Gigi's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500">
              Playhouse
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-lg md:text-xl text-gray-600 font-medium relative z-10 mb-4"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Learn, Play, Grow — Every Day!
          </motion.p>

          {/* Scrolling lyrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="relative z-10 h-16 flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {currentLyric ? (
                <motion.p
                  key={currentLyric.time}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center text-lg md:text-xl font-bold px-6 max-w-lg"
                  style={{
                    fontFamily: "'Lexend', sans-serif",
                    color: currentLyric.section === "chorus" || currentLyric.section === "finalchorus"
                      ? "#7C3AED"
                      : currentLyric.section === "bridge"
                      ? "#F72585"
                      : "#555",
                  }}
                >
                  {currentLyric.text}
                </motion.p>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  {["♪", "♫", "♪"].map((note, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl text-purple-400"
                      animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                    >
                      {note}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Start audio prompt (before user interaction) */}
          {!audioStarted && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              onClick={(e) => { e.stopPropagation(); startAudio(); }}
              className="relative z-10 mt-6 px-6 py-3 bg-purple-600 text-white rounded-2xl font-bold text-sm hover:bg-purple-700 transition-colors shadow-lg"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              🔊 Play Theme Song
            </motion.button>
          )}

          {/* Tap to continue hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ delay: 3, duration: 2, repeat: Infinity }}
            className="absolute bottom-12 text-sm text-gray-400 font-medium z-10"
          >
            Tap anywhere to continue
          </motion.p>

          {/* Audio indicator */}
          {audioStarted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-6 right-6 flex items-center gap-2 text-gray-500 text-xs z-10"
            >
              <span className="text-base">🔊</span>
              <span style={{ fontFamily: "'Lexend', sans-serif" }}>Theme song playing</span>
            </motion.div>
          )}

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 2 }}
            className="absolute bottom-6 left-6 text-[10px] text-gray-400 z-10"
          >
            © 2026 Dreamz In Ink LLC
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
