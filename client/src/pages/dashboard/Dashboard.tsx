import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import DashboardLayout from '@/components/DashboardLayout';
import { DOMAINS } from '@/lib/types';
import { Plus, Play, BookOpen, Tv, Brain } from 'lucide-react';
import TrialBanner from '@/components/TrialBanner';

const DASH_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663407626762/iASgnCeomTwRZiq44kFhuJ/hero-dashboard-8f9Rjm2F7LJezrppKeK7F9.webp';

export default function Dashboard() {
  const children = useStore((s) => s.children);
  const enrolledPaths = useStore((s) => s.enrolledPaths);
  const lessonProgress = useStore((s) => s.lessonProgress);
  const profile = useStore((s) => s.currentProfile);
  const channels = useStore((s) => s.approvedChannels);

  const trialDaysLeft = profile?.trial_started_at
    ? Math.max(0, 7 - Math.floor((Date.now() - new Date(profile.trial_started_at).getTime()) / 86400000))
    : 0;

  return (
    <DashboardLayout title="Dashboard">
      {/* Trial banner */}
      <TrialBanner />

      {/* Children cards */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>Your Children</h2>
          <Link href="/onboard/child" className="text-sm font-bold text-[#7C3AED] flex items-center gap-1 hover:underline"><Plus className="w-4 h-4" /> Add Child</Link>
        </div>
        {children.length === 0 ? (
          <div className="card-gigi text-center py-12">
            <p className="text-4xl mb-4">👶</p>
            <p className="font-bold text-[#1C1B2E] mb-2" style={{ fontFamily: 'var(--font-display)' }}>No children added yet</p>
            <p className="text-sm text-[#888] mb-4">Add your first child to start learning!</p>
            <Link href="/onboard/child" className="btn-gigi !py-2 !px-6 !text-sm">Add Child</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {children.map((child) => {
              const paths = enrolledPaths.filter((p) => p.child_id === child.id && p.status === 'active');
              const completed = lessonProgress.filter((p) => p.child_id === child.id && p.completion_status === 'done').length;
              return (
                <motion.div key={child.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-gigi">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center text-3xl">{child.avatar_emoji}</div>
                      <div>
                        <h3 className="font-black text-lg text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{child.display_name}</h3>
                        <p className="text-xs text-[#888] capitalize">{child.grade_band.replace('-', ' ')} · Age {child.age}</p>
                      </div>
                    </div>
                    <Link href={`/learn/${child.id}`} className="bg-[#7C3AED] text-white rounded-xl p-2.5 hover:bg-[#6D28D9] transition-colors" title="Start learning">
                      <Play className="w-5 h-5" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-[#F5F5F0] rounded-xl p-3">
                      <BookOpen className="w-4 h-4 text-[#4361EE] mx-auto mb-1" />
                      <div className="font-black text-lg" style={{ fontFamily: 'var(--font-display)' }}>{paths.length}</div>
                      <div className="text-[10px] text-[#888]">Paths</div>
                    </div>
                    <div className="bg-[#F5F5F0] rounded-xl p-3">
                      <Brain className="w-4 h-4 text-[#F72585] mx-auto mb-1" />
                      <div className="font-black text-lg" style={{ fontFamily: 'var(--font-display)' }}>{completed}</div>
                      <div className="text-[10px] text-[#888]">Lessons</div>
                    </div>
                    <div className="bg-[#F5F5F0] rounded-xl p-3">
                      <Tv className="w-4 h-4 text-[#22C55E] mx-auto mb-1" />
                      <div className="font-black text-lg" style={{ fontFamily: 'var(--font-display)' }}>{channels.length}</div>
                      <div className="text-[10px] text-[#888]">Channels</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Link href={`/dashboard/child/${child.id}`} className="flex-1 text-center text-xs font-bold text-[#7C3AED] bg-[#7C3AED]/10 rounded-xl py-2 hover:bg-[#7C3AED]/20 transition-colors">Details</Link>
                    <Link href={`/dashboard/paths/${child.id}`} className="flex-1 text-center text-xs font-bold text-[#4361EE] bg-[#4361EE]/10 rounded-xl py-2 hover:bg-[#4361EE]/20 transition-colors">Paths</Link>
                    <Link href={`/dashboard/progress/${child.id}`} className="flex-1 text-center text-xs font-bold text-[#22C55E] bg-[#22C55E]/10 rounded-xl py-2 hover:bg-[#22C55E]/20 transition-colors">Progress</Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Quick stats */}
      <section>
        <h2 className="text-xl font-black text-[#1C1B2E] mb-4" style={{ fontFamily: 'var(--font-display)' }}>Learning Domains</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {DOMAINS.map((d) => (
            <div key={d.id} className="card-gigi !p-4 flex items-center gap-3" style={{ borderColor: d.color + '40' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: d.color + '20' }}>{d.emoji}</div>
              <div>
                <p className="font-bold text-sm text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{d.name}</p>
                <p className="text-[10px] text-[#888]">{d.character}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
