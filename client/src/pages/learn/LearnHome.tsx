import { useParams, Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { DOMAINS } from '@/lib/types';
import { ArrowLeft, BookOpen, Brain, Tv, Star } from 'lucide-react';
import { getCharacterByDomain } from '@/lib/characters';
import CharacterAvatar from '@/components/CharacterAvatar';
import { toast } from 'sonner';

const LEARN_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663407626762/iASgnCeomTwRZiq44kFhuJ/hero-learning-FKJmUMTLG3C2SueDA8HK76.webp';

export default function LearnHome() {
  const { childId } = useParams<{ childId: string }>();
  const { data: childList = [] } = trpc.children.list.useQuery();
  const { data: channels = [] } = trpc.channels.list.useQuery();
  const child = childList.find((c) => c.uuid === childId);

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

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="card-gigi !p-3 text-center">
            <Star className="w-5 h-5 text-[#FBBF24] mx-auto mb-1" />
            <div className="font-black text-xl" style={{ fontFamily: 'var(--font-display)' }}>—</div>
            <div className="text-[10px] text-[#888]">Stars Earned</div>
          </div>
          <div className="card-gigi !p-3 text-center">
            <BookOpen className="w-5 h-5 text-[#4361EE] mx-auto mb-1" />
            <div className="font-black text-xl" style={{ fontFamily: 'var(--font-display)' }}>—</div>
            <div className="text-[10px] text-[#888]">Paths</div>
          </div>
          <div className="card-gigi !p-3 text-center">
            <Brain className="w-5 h-5 text-[#F72585] mx-auto mb-1" />
            <div className="font-black text-xl" style={{ fontFamily: 'var(--font-display)' }}>—</div>
            <div className="text-[10px] text-[#888]">Lessons</div>
          </div>
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
        <h2 className="text-xl font-black text-[#1C1B2E] mb-4" style={{ fontFamily: 'var(--font-display)' }}>Learning Domains</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {DOMAINS.map((d) => {
            return (
              <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-gigi !p-0 overflow-hidden" style={{ borderColor: d.color + '40' }}>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <CharacterAvatar character={getCharacterByDomain(d.id)} size="sm" state="idle" />
                    <div>
                      <h3 className="font-black text-lg" style={{ fontFamily: 'var(--font-display)', color: d.color }}>{d.name}</h3>
                      <p className="text-xs text-[#888]">{d.character}</p>
                    </div>
                  </div>
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
