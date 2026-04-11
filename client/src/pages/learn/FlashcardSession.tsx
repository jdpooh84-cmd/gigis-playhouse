import { useParams, Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DOMAINS } from '@/lib/types';
import type { DomainId } from '@/lib/types';
import { ArrowLeft, ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';

// Sample flashcards until learning content is loaded from DB
const SAMPLE_CARDS = [
  { id: '1', front: 'A', back: 'Apple', emoji: '🍎', domain: 'literacy' as DomainId, phonics_notation: '/æ/' },
  { id: '2', front: 'B', back: 'Bear', emoji: '🐻', domain: 'literacy' as DomainId, phonics_notation: '/b/' },
  { id: '3', front: '1 + 1', back: '2', emoji: '🔢', domain: 'math' as DomainId, phonics_notation: null },
  { id: '4', front: '2 + 3', back: '5', emoji: '➕', domain: 'math' as DomainId, phonics_notation: null },
  { id: '5', front: 'Red + Blue', back: 'Purple', emoji: '🎨', domain: 'creative' as DomainId, phonics_notation: null },
  { id: '6', front: 'Sun', back: 'Star', emoji: '☀️', domain: 'science' as DomainId, phonics_notation: null },
];

export default function FlashcardSession() {
  const { childId, domain: domainParam } = useParams<{ childId: string; domain?: string }>();
  const { data: childList = [] } = trpc.children.list.useQuery();
  const child = childList.find((c) => c.uuid === childId);
  const [activeDomain, setActiveDomain] = useState<DomainId | 'all'>(domainParam as DomainId || 'all');
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cards = useMemo(() => {
    return activeDomain === 'all' ? SAMPLE_CARDS : SAMPLE_CARDS.filter((c) => c.domain === activeDomain);
  }, [activeDomain]);

  if (!child) return <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center"><p>Child not found</p></div>;

  const card = cards[cardIndex];

  const handleFlip = () => setFlipped(!flipped);
  const handleNext = () => { setCardIndex((i) => (i + 1) % cards.length); setFlipped(false); };
  const handlePrev = () => { setCardIndex((i) => (i - 1 + cards.length) % cards.length); setFlipped(false); };
  const handleShuffle = () => { setCardIndex(Math.floor(Math.random() * cards.length)); setFlipped(false); };

  const handleRate = (_result: string) => {
    handleNext();
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <header className="bg-white border-b-2 border-[#E5E5E0] sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <Link href={`/learn/${childId}`} className="flex items-center gap-1 text-sm font-bold text-[#7C3AED]"><ArrowLeft className="w-4 h-4" /> Back</Link>
          <span className="font-black text-sm" style={{ fontFamily: 'var(--font-display)' }}>Flashcards</span>
          <span className="text-xs text-[#888]">{cards.length > 0 ? `${cardIndex + 1}/${cards.length}` : '0/0'}</span>
        </div>
      </header>

      <div className="container py-6 max-w-lg">
        {/* Domain filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          <button onClick={() => { setActiveDomain('all'); setCardIndex(0); setFlipped(false); }} className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border-2 transition-all ${activeDomain === 'all' ? 'bg-[#7C3AED] text-white border-[#7C3AED]' : 'border-[#E5E5E0] text-[#888]'}`}>
            All ({SAMPLE_CARDS.length})
          </button>
          {DOMAINS.map((d) => {
            const count = SAMPLE_CARDS.filter((c) => c.domain === d.id).length;
            if (count === 0) return null;
            return (
              <button key={d.id} onClick={() => { setActiveDomain(d.id); setCardIndex(0); setFlipped(false); }} className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border-2 transition-all ${activeDomain === d.id ? 'text-white' : 'text-[#888] border-[#E5E5E0]'}`} style={activeDomain === d.id ? { backgroundColor: d.color, borderColor: d.color } : undefined}>
                {d.emoji} {d.name} ({count})
              </button>
            );
          })}
        </div>

        {cards.length === 0 ? (
          <div className="card-gigi text-center py-12"><p className="text-4xl mb-4">🃏</p><p className="text-[#888]">No flashcards in this category.</p></div>
        ) : card && (
          <>
            {/* Card */}
            <div className="perspective-1000 mb-6" style={{ perspective: '1000px' }}>
              <motion.div
                onClick={handleFlip}
                className="relative w-full aspect-[3/2] cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Front */}
                <div className="absolute inset-0 card-gigi !p-0 flex flex-col items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                  <span className="text-5xl mb-4">{card.emoji}</span>
                  <p className="text-4xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{card.front}</p>
                  <p className="text-xs text-[#888] mt-4">Tap to flip</p>
                </div>
                {/* Back */}
                <div className="absolute inset-0 card-gigi !p-0 flex flex-col items-center justify-center !bg-[#7C3AED] !border-[#6D28D9]" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <span className="text-5xl mb-4">{card.emoji}</span>
                  <p className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>{card.back}</p>
                  {card.phonics_notation && <p className="text-sm text-white/70 mt-2">{card.phonics_notation}</p>}
                </div>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button onClick={handlePrev} className="w-12 h-12 rounded-full bg-white border-2 border-[#E5E5E0] flex items-center justify-center hover:border-[#7C3AED] transition-colors"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={handleShuffle} className="w-12 h-12 rounded-full bg-white border-2 border-[#E5E5E0] flex items-center justify-center hover:border-[#7C3AED] transition-colors"><Shuffle className="w-5 h-5" /></button>
              <button onClick={handleNext} className="w-12 h-12 rounded-full bg-white border-2 border-[#E5E5E0] flex items-center justify-center hover:border-[#7C3AED] transition-colors"><ChevronRight className="w-5 h-5" /></button>
            </div>

            {/* Rating */}
            {flipped && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                <button onClick={() => handleRate('knew')} className="flex-1 py-3 rounded-xl bg-[#22C55E]/10 border-2 border-[#22C55E]/30 text-[#22C55E] font-bold text-sm hover:bg-[#22C55E]/20 transition-colors">Knew It!</button>
                <button onClick={() => handleRate('almost')} className="flex-1 py-3 rounded-xl bg-[#FBBF24]/10 border-2 border-[#FBBF24]/30 text-[#FBBF24] font-bold text-sm hover:bg-[#FBBF24]/20 transition-colors">Almost</button>
                <button onClick={() => handleRate('learning')} className="flex-1 py-3 rounded-xl bg-[#F72585]/10 border-2 border-[#F72585]/30 text-[#F72585] font-bold text-sm hover:bg-[#F72585]/20 transition-colors">Learning</button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
