import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF5]">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-6xl"
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🐱
        </motion.div>
        <p className="text-lg font-semibold text-[#7C3AED]" style={{ fontFamily: 'var(--font-display)' }}>
          Loading...
        </p>
      </motion.div>
    </div>
  );
}
