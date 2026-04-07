import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Check, Crown, ArrowRight } from 'lucide-react';

export default function PaymentSuccess() {
  const profile = useStore((s) => s.currentProfile);
  const children = useStore((s) => s.children);

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 1.2, delay: 0.2 }} className="w-20 h-20 rounded-full bg-[#22C55E]/20 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-[#22C55E]" />
        </motion.div>
        <h1 className="text-3xl font-black text-[#1C1B2E] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Welcome to {profile?.plan_type?.charAt(0).toUpperCase()}{profile?.plan_type?.slice(1)}!
        </h1>
        <p className="text-[#555] mb-6">Your subscription is active. All features are now unlocked!</p>
        <div className="card-gigi !bg-[#FBBF24]/10 !border-[#FBBF24]/40 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2"><Crown className="w-5 h-5 text-[#FBBF24]" /><span className="font-bold text-sm capitalize" style={{ fontFamily: 'var(--font-display)' }}>{profile?.plan_type} Plan Active</span></div>
          <p className="text-xs text-[#555]">540 lessons · Unlimited channels · PDF reports</p>
        </div>
        <div className="flex flex-col gap-3">
          {children.length > 0 ? (
            <Link href={`/learn/${children[0].id}`} className="btn-gigi w-full justify-center">Start Learning <ArrowRight className="w-5 h-5" /></Link>
          ) : (
            <Link href="/onboard/child" className="btn-gigi w-full justify-center">Add Your First Child <ArrowRight className="w-5 h-5" /></Link>
          )}
          <Link href="/dashboard" className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] !shadow-[0_4px_0_#C5C5C0] w-full justify-center">Go to Dashboard</Link>
        </div>
      </motion.div>
    </div>
  );
}
