/**
 * PaywallModal — Gigi's paywall with golden door metaphor
 * Shows when free trial expires or free tier limits are hit
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 */
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Lock, Sparkles, Crown } from "lucide-react";
import { getCharacterById } from "@/lib/characters";
import CharacterAvatar from "./CharacterAvatar";

interface PaywallModalProps {
  isOpen: boolean;
  reason: "trial_expired" | "lesson_limit" | "channel_limit" | "child_limit";
  onClose: () => void;
}

const REASONS = {
  trial_expired: {
    title: "Your Free Trial Has Ended",
    subtitle: "Gigi misses you! Unlock unlimited learning for your little ones.",
    emoji: "🔐",
  },
  lesson_limit: {
    title: "You've Reached the Free Lesson Limit",
    subtitle: "Upgrade to unlock all 540 lessons across 6 learning domains!",
    emoji: "📚",
  },
  channel_limit: {
    title: "Channel Limit Reached",
    subtitle: "Upgrade to add unlimited YouTube channels for your child!",
    emoji: "📺",
  },
  child_limit: {
    title: "Child Profile Limit Reached",
    subtitle: "Upgrade to the Family plan to add up to 6 children!",
    emoji: "👨‍👩‍👧‍👦",
  },
};

export default function PaywallModal({ isOpen, reason, onClose }: PaywallModalProps) {
  const gigi = getCharacterById("gigi");
  const msg = REASONS[reason];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl border-3 border-amber-200"
          >
            {/* Golden door illustration */}
            <div className="relative w-32 h-40 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-300 to-amber-500 rounded-t-[60px] rounded-b-lg shadow-lg border-2 border-amber-600">
                <div className="absolute top-1/2 right-4 w-4 h-4 rounded-full bg-amber-700 shadow-inner" />
                <Lock className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-8 text-amber-800" />
              </div>
              {/* Gigi peeking */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <CharacterAvatar character={gigi} size="md" state="idle" />
              </div>
            </div>

            <div className="text-4xl mb-3">{msg.emoji}</div>
            <h2
              className="text-2xl font-black text-[#1C1B2E] mb-2"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {msg.title}
            </h2>
            <p className="text-[#555] mb-6" style={{ fontFamily: "'Lexend', sans-serif" }}>
              {msg.subtitle}
            </p>

            <div className="space-y-3">
              <Link
                href="/upgrade"
                className="btn-gigi w-full flex items-center justify-center gap-2"
              >
                <Crown className="w-5 h-5" /> Unlock Full Access
              </Link>
              <button
                onClick={onClose}
                className="w-full py-3 text-sm font-bold text-[#888] hover:text-[#555] transition-colors"
              >
                Maybe Later
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#888]">
              <Sparkles className="w-3 h-3" />
              <span>7-day free trial included with all plans</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
