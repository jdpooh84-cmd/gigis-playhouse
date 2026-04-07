import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { trpc } from '@/lib/trpc';
import { ArrowRight, ArrowLeft } from 'lucide-react';

type AttentionSpan = 'short' | 'medium' | 'long';
type LearningStyle = 'visual' | 'hands-on' | 'auditory' | 'mixed';

export default function Preferences() {
  const { data: childList = [] } = trpc.children.list.useQuery();
  const child = childList[childList.length - 1];
  const [attention, setAttention] = useState<AttentionSpan>('medium');
  const [style, setStyle] = useState<LearningStyle>('mixed');
  const [shortDay, setShortDay] = useState(false);
  const [, navigate] = useLocation();

  const handleNext = () => {
    // Store preferences locally for now (these are UI-level settings)
    if (child) {
      localStorage.setItem(`gigi-prefs-${child.id}`, JSON.stringify({ attention, style, shortDay }));
    }
    navigate('/onboard/channels');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>Learning Preferences</h1>
          <p className="text-[#555] mt-2">Help us personalize {child?.displayName || 'your child'}'s experience.</p>
        </div>
        <div className="card-gigi space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Attention Span</label>
            <div className="grid grid-cols-3 gap-3">
              {([['short', '5 min', '⚡'], ['medium', '10 min', '⏱️'], ['long', '15 min', '🎯']] as const).map(([val, label, icon]) => (
                <button key={val} onClick={() => setAttention(val as AttentionSpan)} className={`p-4 rounded-xl border-2 text-center transition-all ${attention === val ? 'border-[#7C3AED] bg-[#7C3AED]/10' : 'border-[#E5E5E0] hover:border-[#7C3AED]/50'}`}>
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="text-xs font-bold capitalize">{val}</div>
                  <div className="text-xs text-[#888]">{label} focus</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Learning Style</label>
            <div className="grid grid-cols-2 gap-3">
              {([['visual', '👁️', 'Likes pictures & videos'], ['hands-on', '🤲', 'Likes doing activities'], ['auditory', '👂', 'Likes listening & songs'], ['mixed', '🌈', 'A bit of everything']] as const).map(([val, icon, desc]) => (
                <button key={val} onClick={() => setStyle(val as LearningStyle)} className={`p-4 rounded-xl border-2 text-left transition-all ${style === val ? 'border-[#7C3AED] bg-[#7C3AED]/10' : 'border-[#E5E5E0] hover:border-[#7C3AED]/50'}`}>
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="text-xs font-bold capitalize">{val}</div>
                  <div className="text-xs text-[#888]">{desc}</div>
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-[#E5E5E0]">
            <input type="checkbox" checked={shortDay} onChange={(e) => setShortDay(e.target.checked)} className="w-5 h-5 rounded accent-[#7C3AED]" />
            <div>
              <div className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>Short Day Mode</div>
              <div className="text-xs text-[#888]">Halves activity steps for shorter sessions</div>
            </div>
          </label>
          <div className="flex gap-3">
            <Link href="/onboard/child" className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] !shadow-[0_4px_0_#C5C5C0] flex-1 justify-center"><ArrowLeft className="w-5 h-5" /> Back</Link>
            <button onClick={handleNext} className="btn-gigi flex-1 justify-center">Next <ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-6">
          {[1,2,3,4,5].map((i) => (<div key={i} className={`w-3 h-3 rounded-full ${i === 3 ? 'bg-[#7C3AED]' : 'bg-[#E5E5E0]'}`} />))}
        </div>
      </motion.div>
    </div>
  );
}
