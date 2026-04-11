import { useParams, Link, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DOMAINS } from '@/lib/types';
import { ArrowLeft, BookOpen, Brain, Tv, Star, Filter, Trophy, TrendingUp, CheckCircle2, Play } from 'lucide-react';
import { getCharacterByDomain } from '@/lib/characters';
import CharacterAvatar from '@/components/CharacterAvatar';
import { SEED_LESSONS, SEED_FLASHCARDS } from '@/lib/seed-data';

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
  const [, navigate] = useLocation();
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
    return domains;
  }, [subjectFilter]);

  // Get lessons for a domain from seed data
  const getLessonsForDomain = (domainId: string) => {
    return SEED_LESSONS.filter(l => l.domain === domainId);
  };

  // Get flashcard count for a domain
  const getFlashcardCount = (domainId: string) => {
    return SEED_FLASHCARDS.filter(f => f.domain === domainId).length;
  };

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
            const lessons = getLessonsForDomain(d.id);
            const flashcardCount = getFlashcardCount(d.id);
            const dp = progress?.domainProgress?.find(p => p.domain === d.id);
            const character = getCharacterByDomain(d.id);
            return (
              <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-gigi !p-0 overflow-hidden" style={{ borderColor: d.color + '40' }}>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <CharacterAvatar character={character} size="sm" state="idle" />
                    <div className="flex-1">
                      <h3 className="font-black text-lg" style={{ fontFamily: 'var(--font-display)', color: d.color }}>{d.name}</h3>
                      <p className="text-xs text-[#888]">{character.name} — {d.character}</p>
                    </div>
                    {dp && dp.lessonsCompleted > 0 && (
                      <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: d.color + '20', color: d.color }}>
                        {dp.lessonsCompleted}/{dp.lessonsTotal}
                      </span>
                    )}
                  </div>

                  {/* Lesson list for this domain */}
                  {lessons.length > 0 ? (
                    <div className="space-y-2 mb-3">
                      {lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => navigate(`/learn/${childId}/lesson/${lesson.id}`)}
                          className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-[#FAFAF5] hover:bg-white border border-transparent hover:border-[#E5E5E0] transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: d.color + '20' }}>
                            <Play className="w-4 h-4" style={{ color: d.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-[#1C1B2E] truncate" style={{ fontFamily: 'var(--font-display)' }}>{lesson.title}</p>
                            <p className="text-[10px] text-[#888]">{lesson.theme} · {lesson.episode.duration_minutes} min</p>
                          </div>
                          <Star className="w-4 h-4 text-[#E5E5E0] group-hover:text-[#FBBF24] transition-colors shrink-0" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#888] mb-3">More lessons coming soon!</p>
                  )}

                  {/* Flashcard link for this domain */}
                  {flashcardCount > 0 && (
                    <Link
                      href={`/learn/${childId}/flashcards/${d.id}`}
                      className="flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl transition-colors mb-3"
                      style={{ backgroundColor: d.color + '10', color: d.color }}
                    >
                      🃏 {flashcardCount} Flashcards
                    </Link>
                  )}

                  {ageFilter !== 'all' && (
                    <p className="text-[10px] text-[#888]">Showing content for Grade {ageFilter}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
