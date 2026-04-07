/**
 * MovementBreak — Chris the frog leads movement breaks
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCharacterById } from "@/lib/characters";
import CharacterAvatar from "./CharacterAvatar";

const EXERCISES = [
  { name: "Jump like a frog!", emoji: "🐸", duration: 10 },
  { name: "Stretch to the sky!", emoji: "🌟", duration: 8 },
  { name: "Wiggle your fingers!", emoji: "🖐️", duration: 6 },
  { name: "Touch your toes!", emoji: "👣", duration: 8 },
  { name: "Spin around once!", emoji: "🌀", duration: 5 },
  { name: "Clap your hands 5 times!", emoji: "👏", duration: 6 },
  { name: "March in place!", emoji: "🚶", duration: 10 },
  { name: "Take 3 deep breaths!", emoji: "🌬️", duration: 10 },
];

interface MovementBreakProps {
  onComplete: () => void;
}

export default function MovementBreak({ onComplete }: MovementBreakProps) {
  const chris = getCharacterById("chris");
  const [currentExercise, setCurrentExercise] = useState(0);
  const [countdown, setCountdown] = useState(EXERCISES[0].duration);
  const [phase, setPhase] = useState<"intro" | "exercise" | "done">("intro");

  const exercise = EXERCISES[currentExercise];

  useEffect(() => {
    if (phase !== "exercise") return;
    if (countdown <= 0) {
      if (currentExercise < 2) {
        setCurrentExercise((prev) => prev + 1);
        setCountdown(EXERCISES[currentExercise + 1].duration);
      } else {
        setPhase("done");
      }
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, phase, currentExercise]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-emerald-50 flex items-center justify-center"
      >
        <div className="text-center max-w-md px-6">
          <CharacterAvatar
            character={chris}
            state={phase === "done" ? "celebrating" : "teaching"}
            size="xl"
            showName
          />

          {phase === "intro" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
              <h2 className="text-3xl font-black text-emerald-800" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Movement Break!
              </h2>
              <p className="text-emerald-600 mt-2 text-lg" style={{ fontFamily: "'Lexend', sans-serif" }}>
                Time to move your body with Chris!
              </p>
              <button
                onClick={() => setPhase("exercise")}
                className="mt-6 px-8 py-4 bg-emerald-500 text-white rounded-2xl text-lg font-black hover:bg-emerald-600 transition-colors shadow-lg"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Let's Go! 🐸
              </button>
            </motion.div>
          )}

          {phase === "exercise" && (
            <motion.div
              key={currentExercise}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8"
            >
              <div className="text-6xl mb-4">{exercise.emoji}</div>
              <h2 className="text-2xl font-black text-emerald-800" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {exercise.name}
              </h2>
              <div className="mt-6">
                <motion.div
                  className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <span className="text-3xl font-black">{countdown}</span>
                </motion.div>
              </div>
              <div className="flex gap-2 justify-center mt-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i <= currentExercise ? "bg-emerald-500" : "bg-emerald-200"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {phase === "done" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
              <h2 className="text-3xl font-black text-emerald-800" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Great Job! 🎉
              </h2>
              <p className="text-emerald-600 mt-2 text-lg" style={{ fontFamily: "'Lexend', sans-serif" }}>
                You moved your body and now you're ready to learn more!
              </p>
              <button
                onClick={onComplete}
                className="mt-6 px-8 py-4 bg-emerald-500 text-white rounded-2xl text-lg font-black hover:bg-emerald-600 transition-colors shadow-lg"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Back to Learning!
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
