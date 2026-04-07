import { useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Flame, Clock, BookOpen } from 'lucide-react';

const PROFILE_COLORS: Record<string, string> = {
  coral: '#FF6B6B', sky: '#4ECDC4', mint: '#22C55E', lavender: '#7C3AED', sunshine: '#FBBF24', peach: '#F97316',
};

export default function FamilyProgress() {
  const { data: children = [] } = trpc.children.list.useQuery();
  const activeChildren = useMemo(() => children.filter(c => c.isActive), [children]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/family" className="w-10 h-10 rounded-xl bg-[#E5E5E0] flex items-center justify-center hover:bg-[#D5D5D0] transition-colors">
          <ArrowLeft className="w-5 h-5 text-[#1C1B2E]" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>Family Progress</h1>
          <p className="text-sm text-[#888]">This Week</p>
        </div>
      </div>

      {activeChildren.length === 0 ? (
        <div className="card-gigi text-center py-12">
          <p className="text-[#888]">No children added yet. Add a child to start tracking progress!</p>
        </div>
      ) : activeChildren.map((child, idx) => {
        const color = PROFILE_COLORS[child.profileColor] || '#7C3AED';
        return (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="card-gigi"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-3" style={{ borderColor: color, backgroundColor: color + '15' }}>
                {child.avatarEmoji}
              </div>
              <div className="flex-1">
                <h2 className="font-black text-lg text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{child.displayName}, {child.age}</h2>
                <div className="flex items-center gap-4 text-xs text-[#888]">
                  <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-[#F59E0B]" /> New learner</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Just started</span>
                </div>
              </div>
              <div className="w-3 h-8 rounded-full" style={{ backgroundColor: color }} />
            </div>

            <div className="space-y-3">
              <p className="text-sm text-[#888] italic flex items-center gap-2"><BookOpen className="w-4 h-4" /> No paths enrolled yet — start learning to see progress!</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
