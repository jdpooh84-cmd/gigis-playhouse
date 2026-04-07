import { useMemo } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Plus, BookOpen, TrendingUp, Star, ArrowRight, Users } from 'lucide-react';

const PROFILE_COLORS: Record<string, string> = {
  coral: '#FF6B6B',
  sky: '#4ECDC4',
  mint: '#22C55E',
  lavender: '#7C3AED',
  sunshine: '#FBBF24',
  peach: '#F97316',
};

function ChildCard({ child }: { child: { uuid: string; displayName: string; avatarEmoji: string; age: number; grade: number; profileColor: string } }) {
  const [, navigate] = useLocation();
  const color = PROFILE_COLORS[child.profileColor] || '#7C3AED';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border-3 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      style={{ borderColor: color }}
    >
      <div className="h-2" style={{ backgroundColor: color }} />
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-3" style={{ borderColor: color, backgroundColor: color + '15' }}>
            {child.avatarEmoji}
          </div>
          <div>
            <h3 className="font-black text-lg text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{child.displayName}</h3>
            <p className="text-xs text-[#888]">Age {child.age} · Grade {child.grade}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-[#888] uppercase tracking-wide mb-1.5">Today</p>
          <div className="flex gap-1.5">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: '#E5E5E0' }} />
            ))}
            <span className="text-xs text-[#888] ml-1">0/5</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-[#FAFAF5]">
          <BookOpen className="w-4 h-4 text-[#888]" />
          <span className="text-sm text-[#888]">Ready to start learning</span>
        </div>

        <button
          onClick={() => navigate(`/learn/${child.uuid}`)}
          className="btn-gigi w-full justify-center text-sm"
          style={{ backgroundColor: color, boxShadow: `0 4px 0 ${color}88` }}
        >
          Open <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export default function FamilyHub() {
  const { user } = useAuth();
  const { data: children = [] } = trpc.children.list.useQuery();
  const [, navigate] = useLocation();

  const activeChildren = useMemo(() => children.filter(c => c.isActive), [children]);
  const planType = (user as any)?.planType || 'free';
  const maxChildren = planType === 'family' ? 4 : planType === 'gold' ? 2 : 1;
  const canAddMore = activeChildren.length < maxChildren;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#1C1B2E] flex items-center gap-3" style={{ fontFamily: 'var(--font-display)' }}>
            <Users className="w-8 h-8 text-[#7C3AED]" />
            Family Hub
          </h1>
          <p className="text-[#888] mt-1">{activeChildren.length} adventurer{activeChildren.length !== 1 ? 's' : ''} · {planType === 'family' ? 'Family Plan' : planType === 'gold' ? 'Gold Plan' : 'Free Plan'}</p>
        </div>
        {canAddMore && (
          <button onClick={() => navigate('/onboard/child')} className="btn-gigi text-sm">
            <Plus className="w-4 h-4" /> Add Child
          </button>
        )}
        {!canAddMore && activeChildren.length < 4 && (
          <Link href="/upgrade" className="btn-gigi !bg-[#D85A30] !shadow-[0_4px_0_#B04A20] text-sm">
            Upgrade for More
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeChildren.map((child) => (
          <ChildCard key={child.id} child={child} />
        ))}
        {canAddMore && activeChildren.length < 4 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/onboard/child')}
            className="bg-white rounded-2xl border-3 border-dashed border-[#E5E5E0] p-5 flex flex-col items-center justify-center gap-3 hover:border-[#7C3AED]/50 transition-colors min-h-[250px]"
          >
            <div className="w-14 h-14 rounded-full bg-[#7C3AED]/10 flex items-center justify-center">
              <Plus className="w-6 h-6 text-[#7C3AED]" />
            </div>
            <span className="font-bold text-sm text-[#7C3AED]" style={{ fontFamily: 'var(--font-display)' }}>Add Another Child</span>
          </motion.button>
        )}
      </div>

      <Link href="/dashboard/family/progress" className="card-gigi block hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-[#7C3AED]" />
            <div>
              <h3 className="font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>Family Progress</h3>
              <p className="text-sm text-[#888]">See everyone's weekly overview</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-[#888]" />
        </div>
      </Link>
    </div>
  );
}
