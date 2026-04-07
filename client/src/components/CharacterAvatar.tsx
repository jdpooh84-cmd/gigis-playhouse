/**
 * CharacterAvatar — Animated character component with idle/teaching/celebrating states
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 */
import { motion } from "framer-motion";
import type { CharacterDef } from "@/lib/characters";

type CharacterState = "idle" | "teaching" | "celebrating";

interface CharacterAvatarProps {
  character: CharacterDef;
  state?: CharacterState;
  size?: "sm" | "md" | "lg" | "xl";
  showName?: boolean;
  onClick?: () => void;
}

const SIZE_MAP = {
  sm: "w-12 h-12 text-2xl",
  md: "w-16 h-16 text-3xl",
  lg: "w-24 h-24 text-5xl",
  xl: "w-32 h-32 text-6xl",
};

const STATE_ANIMATIONS = {
  idle: {
    y: [0, -4, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
  },
  teaching: {
    rotate: [-3, 3, -3],
    scale: [1, 1.05, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
  },
  celebrating: {
    y: [0, -12, 0],
    scale: [1, 1.15, 1],
    rotate: [0, -5, 5, 0],
    transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" as const },
  },
};

export default function CharacterAvatar({
  character,
  state = "idle",
  size = "md",
  showName = false,
  onClick,
}: CharacterAvatarProps) {
  return (
    <div className="flex flex-col items-center gap-1" onClick={onClick}>
      <motion.div
        animate={STATE_ANIMATIONS[state]}
        className={`${SIZE_MAP[size]} rounded-full flex items-center justify-center ${character.bgClass} border-3 cursor-pointer select-none`}
        style={{ borderColor: character.color }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>{character.emoji}</span>
      </motion.div>
      {showName && (
        <span
          className="text-xs font-bold"
          style={{ color: character.color, fontFamily: "'Nunito', sans-serif" }}
        >
          {character.name}
        </span>
      )}
    </div>
  );
}
