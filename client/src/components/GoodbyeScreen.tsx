/**
 * GoodbyeScreen — Gigi says goodbye at session end
 * 4 versions: standard, lesson-done, quiz-pass, short
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 */
import { motion } from "framer-motion";
import { getCharacterById } from "@/lib/characters";
import CharacterAvatar from "./CharacterAvatar";

type GoodbyeType = "standard" | "lesson-done" | "quiz-pass" | "short";

interface GoodbyeScreenProps {
  type?: GoodbyeType;
  childName?: string;
  onDismiss: () => void;
}

const GOODBYE_MESSAGES: Record<GoodbyeType, { title: string; subtitle: string; emoji: string }> = {
  standard: {
    title: "See you next time!",
    subtitle: "Gigi can't wait to learn more with you!",
    emoji: "👋",
  },
  "lesson-done": {
    title: "Great learning today!",
    subtitle: "You finished a whole lesson! Come back for more!",
    emoji: "🌟",
  },
  "quiz-pass": {
    title: "You're amazing!",
    subtitle: "You passed the quiz! Gigi is so proud!",
    emoji: "🏆",
  },
  short: {
    title: "Bye for now!",
    subtitle: "Even a little learning counts!",
    emoji: "💛",
  },
};

export default function GoodbyeScreen({ type = "standard", childName, onDismiss }: GoodbyeScreenProps) {
  const gigi = getCharacterById("gigi");
  const msg = GOODBYE_MESSAGES[type];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 30%, #FECACA 70%, #FCE7F3 100%)",
      }}
    >
      <div className="text-center max-w-md px-6">
        <CharacterAvatar character={gigi} state="celebrating" size="xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <div className="text-5xl mb-4">{msg.emoji}</div>
          <h2 className="text-3xl font-black text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {childName ? `${msg.title.replace("!", `, ${childName}!`)}` : msg.title}
          </h2>
          <p className="text-gray-600 mt-3 text-lg" style={{ fontFamily: "'Lexend', sans-serif" }}>
            {msg.subtitle}
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onDismiss}
          className="mt-8 px-8 py-4 bg-amber-500 text-white rounded-2xl text-lg font-black hover:bg-amber-600 transition-colors shadow-lg"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Goodbye, Gigi! 👋
        </motion.button>
      </div>
    </motion.div>
  );
}
