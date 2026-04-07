import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { GradeBand } from '@/lib/types';

const EMOJIS = ['🦊', '🐱', '🐶', '🦄', '🐸', '🐻', '🐰', '🦋', '🐢', '🦁', '🐼', '🐨'];
const GRADES: { value: GradeBand; label: string }[] = [
  { value: 'pre-k', label: 'Pre-K' },
  { value: 'kindergarten', label: 'Kindergarten' },
  { value: 'grade-1', label: 'Grade 1' },
  { value: 'grade-2', label: 'Grade 2' },
  { value: 'grade-3', label: 'Grade 3' },
];

export default function AddChild() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(6);
  const [grade, setGrade] = useState<GradeBand>('grade-1');
  const [emoji, setEmoji] = useState('🦊');
  const addChild = useStore((s) => s.addChild);
  const [, navigate] = useLocation();

  const handleNext = () => {
    if (!name.trim()) return;
    const childId = addChild({
      display_name: name.trim(),
      age,
      grade_band: grade,
      avatar_emoji: emoji,
      attention_span: 'medium',
      learning_style: 'mixed',
      short_day_mode: false,
      sensory_notes: '',
      language: 'en',
    });
    navigate('/onboard/preferences');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>Add Your Child</h1>
          <p className="text-[#555] mt-2">We only need a nickname and age — nothing else.</p>
        </div>
        <div className="card-gigi space-y-6">
          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Child's Nickname</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 text-base focus:border-[#7C3AED] focus:outline-none" placeholder="e.g., Mia, Buddy, Little Star" maxLength={30} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Pick an Avatar</label>
            <div className="flex flex-wrap gap-2">
              {EMOJIS.map((e) => (
                <button key={e} onClick={() => setEmoji(e)} className={`w-12 h-12 text-2xl rounded-xl border-2 flex items-center justify-center transition-all ${emoji === e ? 'border-[#7C3AED] bg-[#7C3AED]/10 scale-110' : 'border-[#E5E5E0] hover:border-[#7C3AED]/50'}`}>{e}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Age</label>
              <select value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 text-base focus:border-[#7C3AED] focus:outline-none bg-white">
                {[3,4,5,6,7,8,9].map((a) => <option key={a} value={a}>{a} years old</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Grade</label>
              <select value={grade} onChange={(e) => setGrade(e.target.value as GradeBand)} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 text-base focus:border-[#7C3AED] focus:outline-none bg-white">
                {GRADES.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/onboard/welcome" className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] !shadow-[0_4px_0_#C5C5C0] flex-1 justify-center"><ArrowLeft className="w-5 h-5" /> Back</Link>
            <button onClick={handleNext} disabled={!name.trim()} className="btn-gigi flex-1 justify-center disabled:opacity-50">Next <ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-6">
          {[1,2,3,4,5].map((i) => (<div key={i} className={`w-3 h-3 rounded-full ${i === 2 ? 'bg-[#7C3AED]' : 'bg-[#E5E5E0]'}`} />))}
        </div>
      </motion.div>
    </div>
  );
}
