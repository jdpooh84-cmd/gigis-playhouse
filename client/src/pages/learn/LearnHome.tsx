import { useParams, Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DOMAINS } from '@/lib/types';
import { ArrowLeft, BookOpen, Brain, Tv, Star, Filter, Trophy, TrendingUp, CheckCircle2 } from 'lucide-react';
import { getCharacterByDomain } from '@/lib/characters';
import CharacterAvatar from '@/components/CharacterAvatar';
import { toast } from 'sonner';

const LEARN_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663407626762/iASgnCeomTwRZiq44kFhuJ/hero-learning-FKJmUMTLG3C2SueDA8HK76.webp';

const AGE_GROUPS = [
  { label: 'All Ages', value: 'all' },
  { label: 'K (Age 5–6)', value: 'K' },
  { label: '1st (Age 6–7)', value: '1' },
  { label: '2nd (Age 7–8)', value: '2' },
  { label: '3rd (Age 8–9)', value: '3' },
];

const SUBJECT_FILTERS = [
  { label: 'All Subjects', value: 'all' },
  ...DOMAINS.map(d => ({ label: d.name, value: d.id })),
];

export default function LearnHome() {
  const { childId } = useParams<{ childId: string }>();
  const { data: childList = [] } = trpc.children.list.useQuery();
  const { data: channels = [] } = trpc.channels.list.useQuery();
  const child = childList.find((c) => c.uuid === childId);

  const [ageFilter, setAgeFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Progress summary for the child
  const { data: progress } = trpc.learning.getProgressSummary.useQuery(
    { childId: child?.id ?? 0 },
    { enabled: !!child }
  );

  // Filter domains by subject
  const filteredDomains = useMemo(() => {
    let domains = DOMAINS;
    if (subjectFilter !== 'all') {
      domains = domains.filter(d => d.id === subjectFilter);
    }
    // Age group filtering: map child's gradeLevel to filter
    if (ageFilter !== 'all' && child) {
      // Show all domains but highlight age-appropriate ones
      // All domains are available for all grades, filtering is informational
    }
    return domains;
  }, [subjectFilter, ageFilter, child]);

  if (!child) return <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center"><p className="text-lg font-bold">Child not found</p></div>;

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-24">
      {/* Child header */}
      <header className="bg-white border-b-2 border-[#E5E5E0] sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-bold text-[#7C3AED]"><ArrowLeft className="w-4 h-4" /> Dashboard</Link>
          <div className="flex items-center gap-2">
            <span className="text-xl">{child.avatarEmoji}</span>
            <span className="font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{child.displayName}</span>
          </div>
          <Link href={`/learn/${childId}/channels`} className="flex items-center gap-1 text-sm font-bold text-[#F72585]"><Tv className="w-4 h-4" /> Videos</Link>
        </div>
      </header>

      <div className="container pt-6">
        {/* Welcome banner */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-3xl overflow-hidden mb-8 bg-[#7C3AED]">
          <img src={LEARN_IMG} alt="" className="w-full h-40 object-cover opacity-30" />
          <div className="absolute inset-0 flex items-center p-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                Hi, {child.displayName}! 👋
              </h1>
              <p className="text-white/80 text-sm">Ready to learn something awesome today?</p>
            </div>
          </div>
        </motion.div>

        {/* ── Progress Tracking Visualization ────────────────────────────── */}
        <div className="mb-8">
          <h2 className="text-lg font-black text-[#1C1B2E] mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
            <TrendingUp className="w-5 h-5 text-[#7C3AED]" /> Learning Journey
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="card-gigi !p-3 text-center">
              <BookOpen className="w-5 h-5 text-[#4361EE] mx-auto mb-1" />
              <div className="font-black text-xl" style={{ fontFamily: 'var(--font-display)' }}>{progress?.enrolledPaths ?? 0}</div>
              <div className="text-[10px] text-[#888]">Paths Enrolled</div>
            </div>
            <div className="card-gigi !p-3 text-center">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mx-auto mb-1" />
              <div className="font-black text-xl" style={{ fontFamily: 'var(--font-display)' }}>{progress?.completedLessons ?? 0}</div>
              <div className="text-[10px] text-[#888]">Lessons Done</div>
            </div>
            <div className="card-gigi !p-3 text-center">
              <Trophy className="w-5 h-5 text-[#FBBF24] mx-auto mb-1" />
              <div className="font-black text-xl" style={{ fontFamily: 'var(--font-display)' }}>{progress?.passedQuizzes ?? 0}</div>
              <div className="text-[10px] text-[#888]">Quizzes Passed</div>
            </div>
            <div className="card-gigi !p-3 text-center">
              <Brain className="w-5 h-5 text-[#F72585] mx-auto mb-1" />
              <div className="font-black text-xl" style={{ fontFamily: 'var(--font-display)' }}>{progress?.avgQuizScore ?? 0}%</div>
              <div className="text-[10px] text-[#888]">Avg Quiz Score</div>
            </div>
          </div>

          {/* Domain-level progress bars */}
          {progress?.domainProgress && progress.domainProgress.length > 0 && (
            <div className="mt-4 space-y-2">
              {progress.domainProgress.map((dp) => {
                const domain = DOMAINS.find(d => d.id === dp.domain);
                const pct = dp.lessonsTotal > 0 ? Math.round((dp.lessonsCompleted / dp.lessonsTotal) * 100) : 0;
                return (
                  <div key={dp.domain} className="card-gigi !p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold" style={{ color: domain?.color }}>{domain?.name ?? dp.domain}</span>
                      <span className="text-[10px] text-[#888]">{dp.lessonsCompleted}/{dp.lessonsTotal} lessons</span>
                    </div>
                    <div className="w-full h-2 bg-[#E5E5E0] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: domain?.color ?? '#7C3AED' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Filter by Age Group & Subject ──────────────────────────────── */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-bold text-[#7C3AED] mb-3"
          >
            <Filter className="w-4 h-4" /> {showFilters ? 'Hide Filters' : 'Filter by Age & Subject'}
          </button>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-wrap gap-3 mb-4">
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className="rounded-xl border-2 border-[#E5E5E0] bg-white px-3 py-2 text-sm font-bold focus:border-[#7C3AED] outline-none"
              >
                {AGE_GROUPS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
              </select>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="rounded-xl border-2 border-[#E5E5E0] bg-white px-3 py-2 text-sm font-bold focus:border-[#7C3AED] outline-none"
              >
                {SUBJECT_FILTERS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </motion.div>
          )}
        </div>

        {/* Quick actions */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <Link href={`/learn/${childId}/flashcards`} className="shrink-0 card-gigi !p-4 flex items-center gap-3 hover:border-[#7C3AED] transition-colors">
            <span className="text-2xl">🃏</span>
            <div><p className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>Flashcards</p><p className="text-[10px] text-[#888]">Practice & review</p></div>
          </Link>
          <Link href={`/learn/${childId}/channels`} className="shrink-0 card-gigi !p-4 flex items-center gap-3 hover:border-[#F72585] transition-colors">
            <span className="text-2xl">📺</span>
            <div><p className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>YouTube Hub</p><p className="text-[10px] text-[#888]">{channels.length} channels</p></div>
          </Link>
        </div>

        {/* Learning Domains */}
        <h2 className="text-xl font-black text-[#1C1B2E] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Learning Domains {subjectFilter !== 'all' && <span className="text-sm font-normal text-[#888]">(filtered)</span>}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {filteredDomains.map((d) => {
            const dp = progress?.domainProgress?.find(p => p.domain === d.id);
            return (
              <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-gigi !p-0 overflow-hidden" style={{ borderColor: d.color + '40' }}>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <CharacterAvatar character={getCharacterByDomain(d.id)} size="sm" state="idle" />
                    <div className="flex-1">
                      <h3 className="font-black text-lg" style={{ fontFamily: 'var(--font-display)', color: d.color }}>{d.name}</h3>
                      <p className="text-xs text-[#888]">{d.character}</p>
                    </div>
                    {dp && dp.lessonsCompleted > 0 && (
                      <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: d.color + '20', color: d.color }}>
                        {dp.lessonsCompleted}/{dp.lessonsTotal}
                      </span>
                    )}
                  </div>
                  {ageFilter !== 'all' && (
                    <p className="text-[10px] text-[#888] mb-2">Showing content for Grade {ageFilter}</p>
                  )}
                  <button
                    onClick={() => toast.info('Curriculum content coming soon!')}
                    className="btn-gigi !py-2 !text-sm w-full"
                    style={{ backgroundColor: d.color }}
                  >
                    Start Learning {d.name}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
