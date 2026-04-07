/**
 * SplashScreen — Gigi appears first on every app open
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 * Plays theme song, shows Gigi character, fades to app
 */
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audioManager } from "@/lib/audio-manager";

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number; // ms to show splash, default 4500
}

export default function SplashScreen({ onComplete, duration = 4500 }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "playing" | "exit">("enter");

  const handleComplete = useCallback(() => {
    setPhase("exit");
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  useEffect(() => {
    // Start theme song
    audioManager.playThemeSong().catch(() => {
      // Autoplay blocked — continue silently
    });

    // Enter phase
    const enterTimer = setTimeout(() => setPhase("playing"), 800);

    // Auto-dismiss after duration
    const dismissTimer = setTimeout(() => {
      handleComplete();
    }, duration);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(dismissTimer);
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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #FFF8E1 0%, #FFF3E0 30%, #FCE4EC 70%, #F3E5F5 100%)" }}
          onClick={handleComplete}
        >
          {/* Floating shapes background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 20 + Math.random() * 60,
                  height: 20 + Math.random() * 60,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: [
                    "#7C3AED33", "#F59E0B33", "#10B98133",
                    "#EC489933", "#3B82F633", "#F97316AA",
                  ][i % 6],
                  borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "30% 70% 70% 30% / 30% 30% 70% 70%" : "8px",
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  rotate: [0, 180, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
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
            <div className="w-40 h-40 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-amber-300 relative overflow-hidden">
              {/* Gigi cat face */}
              <div className="text-8xl leading-none select-none" role="img" aria-label="Gigi the cat">
                🐱
              </div>
              {/* Graduation cap */}
              <motion.div
                className="absolute -top-2 -right-1 text-3xl"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                🎓
              </motion.div>
            </div>
            {/* Sparkles around Gigi */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  top: [-10, 10, -5, 20][i],
                  left: [-15, 145, 60, -20][i],
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              >
                ✨
              </motion.div>
            ))}
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
            className="text-lg md:text-xl text-gray-600 font-medium relative z-10 mb-8"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Learn, Play, Grow — Every Day!
          </motion.p>

          {/* Music note animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex gap-3 relative z-10"
          >
            {["🎵", "🎶", "🎵"].map((note, i) => (
              <motion.span
                key={i}
                className="text-2xl"
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {note}
              </motion.span>
            ))}
          </motion.div>

          {/* Tap to continue hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
            className="absolute bottom-12 text-sm text-gray-400 font-medium relative z-10"
          >
            Tap anywhere to continue
          </motion.p>

          {/* Audio indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-6 right-6 flex items-center gap-2 text-gray-400 text-xs"
          >
            <span>🔊</span>
            <span>Theme song playing</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
