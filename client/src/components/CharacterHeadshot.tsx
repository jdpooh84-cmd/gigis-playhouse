/**
 * CharacterHeadshot — replaces emoji-based UI throughout the app.
 * Each character is rendered as a styled SVG circle with the animal face.
 * Supports: cat (Gigi), dog (Dexter), bunny (Luna), bear (Bear), frog (Chris),
 * owl (Sage), bird (Melody), fox (Atlas), sun (Sunny), star (Spark)
 */
import { motion } from 'framer-motion';

export type CharacterType = 'cat' | 'dog' | 'bunny' | 'bear' | 'frog' | 'owl' | 'bird' | 'fox' | 'sun' | 'star';

interface Props {
  character: CharacterType;
  size?: number;
  color?: string;
  animated?: boolean;
  className?: string;
}

const CHARACTER_COLORS: Record<CharacterType, string> = {
  cat: '#F59E0B',
  dog: '#8B5CF6',
  bunny: '#EC4899',
  bear: '#92400E',
  frog: '#22C55E',
  owl: '#6366F1',
  bird: '#06B6D4',
  fox: '#EA580C',
  sun: '#FBBF24',
  star: '#A855F7',
};

function CatFace({ s }: { s: number }) {
  const r = s / 2;
  return (
    <g>
      {/* Ears */}
      <polygon points={`${r*0.35},${r*0.35} ${r*0.55},${r*0.15} ${r*0.7},${r*0.45}`} fill="#F59E0B" />
      <polygon points={`${s-r*0.35},${r*0.35} ${s-r*0.55},${r*0.15} ${s-r*0.7},${r*0.45}`} fill="#F59E0B" />
      <polygon points={`${r*0.42},${r*0.42} ${r*0.57},${r*0.25} ${r*0.65},${r*0.48}`} fill="#FDE68A" />
      <polygon points={`${s-r*0.42},${r*0.42} ${s-r*0.57},${r*0.25} ${s-r*0.65},${r*0.48}`} fill="#FDE68A" />
      {/* Eyes */}
      <circle cx={r*0.7} cy={r*0.85} r={r*0.1} fill="#1C1B2E" />
      <circle cx={s-r*0.7} cy={r*0.85} r={r*0.1} fill="#1C1B2E" />
      <circle cx={r*0.73} cy={r*0.82} r={r*0.035} fill="white" />
      <circle cx={s-r*0.67} cy={r*0.82} r={r*0.035} fill="white" />
      {/* Nose */}
      <ellipse cx={r} cy={r*1.05} rx={r*0.06} ry={r*0.04} fill="#F97316" />
      {/* Mouth */}
      <path d={`M${r*0.85},${r*1.12} Q${r},${r*1.25} ${r*1.15},${r*1.12}`} fill="none" stroke="#1C1B2E" strokeWidth={r*0.03} strokeLinecap="round" />
      {/* Whiskers */}
      <line x1={r*0.3} y1={r*0.95} x2={r*0.6} y2={r*1.0} stroke="#1C1B2E" strokeWidth={r*0.02} />
      <line x1={r*0.3} y1={r*1.1} x2={r*0.6} y2={r*1.05} stroke="#1C1B2E" strokeWidth={r*0.02} />
      <line x1={s-r*0.3} y1={r*0.95} x2={s-r*0.6} y2={r*1.0} stroke="#1C1B2E" strokeWidth={r*0.02} />
      <line x1={s-r*0.3} y1={r*1.1} x2={s-r*0.6} y2={r*1.05} stroke="#1C1B2E" strokeWidth={r*0.02} />
    </g>
  );
}

function DogFace({ s }: { s: number }) {
  const r = s / 2;
  return (
    <g>
      {/* Floppy ears */}
      <ellipse cx={r*0.3} cy={r*0.7} rx={r*0.25} ry={r*0.35} fill="#A78BFA" transform={`rotate(-15 ${r*0.3} ${r*0.7})`} />
      <ellipse cx={s-r*0.3} cy={r*0.7} rx={r*0.25} ry={r*0.35} fill="#A78BFA" transform={`rotate(15 ${s-r*0.3} ${r*0.7})`} />
      {/* Eyes */}
      <circle cx={r*0.7} cy={r*0.8} r={r*0.12} fill="#1C1B2E" />
      <circle cx={s-r*0.7} cy={r*0.8} r={r*0.12} fill="#1C1B2E" />
      <circle cx={r*0.73} cy={r*0.77} r={r*0.04} fill="white" />
      <circle cx={s-r*0.67} cy={r*0.77} r={r*0.04} fill="white" />
      {/* Nose */}
      <ellipse cx={r} cy={r*1.0} rx={r*0.1} ry={r*0.07} fill="#1C1B2E" />
      {/* Tongue */}
      <ellipse cx={r} cy={r*1.2} rx={r*0.08} ry={r*0.1} fill="#F87171" />
    </g>
  );
}

function BunnyFace({ s }: { s: number }) {
  const r = s / 2;
  return (
    <g>
      {/* Long ears */}
      <ellipse cx={r*0.65} cy={r*0.15} rx={r*0.12} ry={r*0.35} fill="#F9A8D4" />
      <ellipse cx={s-r*0.65} cy={r*0.15} rx={r*0.12} ry={r*0.35} fill="#F9A8D4" />
      <ellipse cx={r*0.65} cy={r*0.15} rx={r*0.07} ry={r*0.25} fill="#FDE68A" />
      <ellipse cx={s-r*0.65} cy={r*0.15} rx={r*0.07} ry={r*0.25} fill="#FDE68A" />
      {/* Eyes */}
      <circle cx={r*0.7} cy={r*0.85} r={r*0.1} fill="#1C1B2E" />
      <circle cx={s-r*0.7} cy={r*0.85} r={r*0.1} fill="#1C1B2E" />
      <circle cx={r*0.73} cy={r*0.82} r={r*0.035} fill="white" />
      <circle cx={s-r*0.67} cy={r*0.82} r={r*0.035} fill="white" />
      {/* Nose */}
      <polygon points={`${r},${r*0.98} ${r*0.93},${r*1.06} ${r*1.07},${r*1.06}`} fill="#F472B6" />
      {/* Cheeks */}
      <circle cx={r*0.55} cy={r*1.05} r={r*0.08} fill="#FBCFE8" opacity={0.6} />
      <circle cx={s-r*0.55} cy={r*1.05} r={r*0.08} fill="#FBCFE8" opacity={0.6} />
    </g>
  );
}

function BearFace({ s }: { s: number }) {
  const r = s / 2;
  return (
    <g>
      {/* Round ears */}
      <circle cx={r*0.4} cy={r*0.4} r={r*0.2} fill="#92400E" />
      <circle cx={s-r*0.4} cy={r*0.4} r={r*0.2} fill="#92400E" />
      <circle cx={r*0.4} cy={r*0.4} r={r*0.12} fill="#D97706" />
      <circle cx={s-r*0.4} cy={r*0.4} r={r*0.12} fill="#D97706" />
      {/* Eyes */}
      <circle cx={r*0.7} cy={r*0.8} r={r*0.08} fill="#1C1B2E" />
      <circle cx={s-r*0.7} cy={r*0.8} r={r*0.08} fill="#1C1B2E" />
      <circle cx={r*0.72} cy={r*0.78} r={r*0.03} fill="white" />
      <circle cx={s-r*0.68} cy={r*0.78} r={r*0.03} fill="white" />
      {/* Snout */}
      <ellipse cx={r} cy={r*1.05} rx={r*0.2} ry={r*0.15} fill="#D97706" />
      <ellipse cx={r} cy={r*1.0} rx={r*0.07} ry={r*0.05} fill="#1C1B2E" />
    </g>
  );
}

function SimpleFace({ s, emoji }: { s: number; emoji: string }) {
  const r = s / 2;
  return (
    <text x={r} y={r * 1.15} textAnchor="middle" fontSize={s * 0.5} dominantBaseline="middle">{emoji}</text>
  );
}

const EMOJI_MAP: Record<CharacterType, string> = {
  frog: '🐸', owl: '🦉', bird: '🐦', fox: '🦊', sun: '☀️', star: '⭐',
  cat: '🐱', dog: '🐶', bunny: '🐰', bear: '🐻',
};

export default function CharacterHeadshot({ character, size = 48, color, animated = false, className = '' }: Props) {
  const bgColor = color || CHARACTER_COLORS[character] || '#7C3AED';
  const hasDetailedFace = ['cat', 'dog', 'bunny', 'bear'].includes(character);

  const Wrapper = animated ? motion.div : 'div';
  const animProps = animated ? {
    animate: { y: [0, -3, 0] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
  } : {};

  return (
    <Wrapper
      className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
      {...animProps}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle cx={size/2} cy={size/2} r={size/2 - 1} fill={bgColor + '25'} stroke={bgColor} strokeWidth={2} />
        {/* Face */}
        {hasDetailedFace ? (
          character === 'cat' ? <CatFace s={size} /> :
          character === 'dog' ? <DogFace s={size} /> :
          character === 'bunny' ? <BunnyFace s={size} /> :
          <BearFace s={size} />
        ) : (
          <SimpleFace s={size} emoji={EMOJI_MAP[character]} />
        )}
      </svg>
    </Wrapper>
  );
}

// Helper to map avatar_emoji to CharacterType
export function emojiToCharacter(emoji: string): CharacterType {
  const map: Record<string, CharacterType> = {
    '🐱': 'cat', '🐶': 'dog', '🐰': 'bunny', '🐻': 'bear',
    '🐸': 'frog', '🦉': 'owl', '🐦': 'bird', '🦊': 'fox',
    '☀️': 'sun', '⭐': 'star', '🦄': 'cat', '🦋': 'bird',
    '🐢': 'bear', '🦁': 'fox', '🐼': 'bear', '🐨': 'bear',
  };
  return map[emoji] || 'cat';
}
