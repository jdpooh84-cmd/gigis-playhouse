import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useStore } from '@/lib/store';
import { Sparkles } from 'lucide-react';

export default function Done() {
  const completeOnboarding = useStore((s) => s.completeOnboarding);
  const children = useStore((s) => s.children);
  const child = children[0];
  const [, navigate] = useLocation();

  const handleFinish = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg text-center">
        <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: 2 }} className="text-7xl mb-6">
          🎉
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-black text-[#1C1B2E] mb-4" style={{ fontFamily: 'var(--font-display)' }}>You're All Set!</h1>
        <p className="text-lg text-[#555] mb-8 max-w-md mx-auto">
          {child?.display_name || 'Your child'}'s learning adventure is ready. Gigi can't wait to get started!
        </p>
        <button onClick={handleFinish} className="btn-gigi text-xl mx-auto">
          <Sparkles className="w-5 h-5" /> Go to Dashboard
        </button>
        <div className="flex items-center justify-center gap-2 mt-8">
          {[1,2,3,4,5].map((i) => (<div key={i} className={`w-3 h-3 rounded-full ${i === 5 ? 'bg-[#7C3AED]' : 'bg-[#E5E5E0]'}`} />))}
        </div>
      </motion.div>
    </div>
  );
}
