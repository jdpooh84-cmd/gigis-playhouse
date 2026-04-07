import { useMemo } from 'react';
import { useStore } from '@/lib/store';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Flame, Clock, BookOpen, AlertTriangle, Star } from 'lucide-react';
import { DOMAINS } from '@/lib/types';

export default function FamilyProgress() {
  const children = useStore((s) => s.children);
  const enrolledPaths = useStore((s) => s.enrolledPaths);
  const lessonProgress = useStore((s) => s.lessonProgress);
  const alerts = useStore((s) => s.alerts);

  const activeChildren = useMemo(() => children.filter(c => c.is_active).sort((a, b) => a.sort_order - b.sort_order), [children]);

  const familyAlerts = useMemo(() => alerts.filter(a => !a.read).slice(0, 5), [alerts]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/family" className="w-10 h-10 rounded-xl bg-[#E5E5E0] flex items-center justify-center hover:bg-[#D5D5D0] transition-colors">
          <ArrowLeft className="w-5 h-5 text-[#1C1B2E]" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>Family Progress</h1>
          <p className="text-sm text-[#888]">This Week</p>
        </div>
      </div>

      {/* Per-child progress */}
      {activeChildren.map((child, idx) => {
        const childPaths = enrolledPaths.filter(p => p.child_id === child.id);
        const childLessons = lessonProgress.filter(l => l.child_id === child.id);
        const completedCount = childLessons.filter(l => l.completion_status === 'done').length;

        // Calculate streak (mock: random 1-12 days)
        const streak = Math.max(1, (child.display_name.length * 3) % 12);

        return (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="card-gigi"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-3" style={{ borderColor: child.display_color, backgroundColor: child.display_color + '15' }}>
                {child.avatar_emoji}
              </div>
              <div className="flex-1">
                <h2 className="font-black text-lg text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{child.display_name}, {child.age}</h2>
                <div className="flex items-center gap-4 text-xs text-[#888]">
                  <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-[#F59E0B]" /> {streak} day streak</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Last active: Today</span>
                </div>
              </div>
              <div className="w-3 h-8 rounded-full" style={{ backgroundColor: child.display_color }} />
            </div>

            {/* Domain progress bars */}
            <div className="space-y-3">
              {childPaths.length > 0 ? childPaths.map((path) => {
                const domain = DOMAINS.find(d => d.id === path.path_id);
                if (!domain) return null;
                const totalLessons = 10; // mock
                const progress = Math.min(100, Math.round((path.current_lesson_index / totalLessons) * 100));
                const isComplete = progress >= 100;

                return (
                  <div key={path.path_id} className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 flex-shrink-0" style={{ color: domain.color }} />
                    <span className="text-sm font-semibold text-[#1C1B2E] w-28 flex-shrink-0">{domain.name}</span>
                    <div className="flex-1 h-3 bg-[#E5E5E0] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: domain.color }} />
                    </div>
                    <span className="text-xs font-bold w-10 text-right" style={{ color: domain.color }}>
                      {isComplete ? '100%' : `${progress}%`}
                    </span>
                    {isComplete && <span className="text-sm">🎉</span>}
                  </div>
                );
              }) : (
                <p className="text-sm text-[#888] italic">No paths enrolled yet</p>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Family alerts */}
      {familyAlerts.length > 0 && (
        <div className="card-gigi">
          <h2 className="font-black text-lg text-[#1C1B2E] mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
            Family Alerts ({familyAlerts.length})
          </h2>
          <div className="space-y-2">
            {familyAlerts.map((alert) => {
              const child = activeChildren.find(c => c.id === alert.child_id);
              return (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAFAF5]">
                  {alert.type === 'quiz-fail' ? (
                    <AlertTriangle className="w-5 h-5 text-[#D85A30] flex-shrink-0 mt-0.5" />
                  ) : (
                    <Star className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold text-sm" style={{ color: child?.display_color || '#1C1B2E' }}>{child?.display_name}: </span>
                    <span className="text-sm text-[#555]">{alert.message}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
