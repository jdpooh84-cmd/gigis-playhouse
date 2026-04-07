import { useMemo } from 'react';
import { useStore } from '@/lib/store';
import { useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Plus, BookOpen, TrendingUp, AlertTriangle, Star, ArrowRight, Users } from 'lucide-react';
import { DOMAINS, PLAN_GATES } from '@/lib/types';
import type { Child, DomainId } from '@/lib/types';

function ChildCard({ child, enrolledPaths, lessonProgress }: {
  child: Child;
  enrolledPaths: { path_id: DomainId; current_lesson_index: number }[];
  lessonProgress: { lesson_id: string; completion_status: string }[];
}) {
  const [, navigate] = useLocation();
  const activeDomain = enrolledPaths[0];
  const domainInfo = activeDomain ? DOMAINS.find(d => d.id === activeDomain.path_id) : null;
  const completedLessons = lessonProgress.filter(l => l.completion_status === 'done').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border-3 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      style={{ borderColor: child.display_color }}
    >
      <div className="h-2" style={{ backgroundColor: child.display_color }} />
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-3" style={{ borderColor: child.display_color, backgroundColor: child.display_color + '15' }}>
            {child.avatar_emoji}
          </div>
          <div>
            <h3 className="font-black text-lg text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{child.display_name}</h3>
            <p className="text-xs text-[#888]">Age {child.age} · {child.grade_band.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
          </div>
        </div>

        {/* Today's progress */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-[#888] uppercase tracking-wide mb-1.5">Today</p>
          <div className="flex gap-1.5">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: i <= completedLessons ? child.display_color : '#E5E5E0' }} />
            ))}
            <span className="text-xs text-[#888] ml-1">{Math.min(completedLessons, 5)}/5</span>
          </div>
        </div>

        {/* Active domain */}
        {domainInfo && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl" style={{ backgroundColor: domainInfo.color + '15' }}>
            <BookOpen className="w-4 h-4" style={{ color: domainInfo.color }} />
            <span className="text-sm font-semibold" style={{ color: domainInfo.color }}>{domainInfo.name}</span>
          </div>
        )}

        {!domainInfo && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-[#FAFAF5]">
            <BookOpen className="w-4 h-4 text-[#888]" />
            <span className="text-sm text-[#888]">No paths enrolled yet</span>
          </div>
        )}

        <button
          onClick={() => navigate(`/learn/${child.id}`)}
          className="btn-gigi w-full justify-center text-sm"
          style={{ backgroundColor: child.display_color, boxShadow: `0 4px 0 ${child.display_color}88` }}
        >
          Open <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export default function FamilyHub() {
  const children = useStore((s) => s.children);
  const profile = useStore((s) => s.currentProfile);
  const enrolledPaths = useStore((s) => s.enrolledPaths);
  const lessonProgress = useStore((s) => s.lessonProgress);
  const alerts = useStore((s) => s.alerts);
  const [, navigate] = useLocation();

  const activeChildren = useMemo(() => children.filter(c => c.is_active).sort((a, b) => a.sort_order - b.sort_order), [children]);
  const maxChildren = profile ? PLAN_GATES[profile.plan_type].child_profiles : 1;
  const canAddMore = activeChildren.length < maxChildren;

  const unreadAlerts = useMemo(() => alerts.filter(a => !a.read).slice(0, 5), [alerts]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#1C1B2E] flex items-center gap-3" style={{ fontFamily: 'var(--font-display)' }}>
            <Users className="w-8 h-8 text-[#7C3AED]" />
            Family Hub
          </h1>
          <p className="text-[#888] mt-1">{activeChildren.length} adventurer{activeChildren.length !== 1 ? 's' : ''} · {profile?.plan_type === 'family' ? 'Family Plan' : profile?.plan_type === 'gold' ? 'Gold Plan' : 'Free Plan'}</p>
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

      {/* Child cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeChildren.map((child, i) => (
          <ChildCard
            key={child.id}
            child={child}
            enrolledPaths={enrolledPaths.filter(p => p.child_id === child.id)}
            lessonProgress={lessonProgress.filter(l => l.child_id === child.id)}
          />
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

      {/* Family alerts */}
      {unreadAlerts.length > 0 && (
        <div className="card-gigi">
          <h2 className="font-black text-lg text-[#1C1B2E] mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
            Family Alerts ({unreadAlerts.length})
          </h2>
          <div className="space-y-2">
            {unreadAlerts.map((alert) => {
              const child = activeChildren.find(c => c.id === alert.child_id);
              return (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAFAF5]">
                  {alert.type === 'quiz-fail' ? (
                    <AlertTriangle className="w-5 h-5 text-[#D85A30] flex-shrink-0 mt-0.5" />
                  ) : alert.type === 'milestone' || alert.type === 'path-complete' ? (
                    <Star className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      {child && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: child.display_color }} />}
                      <span className="font-bold text-sm text-[#1C1B2E]">{child?.display_name || 'Child'}</span>
                    </div>
                    <p className="text-sm text-[#555]">{alert.message}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#888] flex-shrink-0 mt-1" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Family progress link */}
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
