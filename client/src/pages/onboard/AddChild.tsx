import { useState, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import type { GradeBand, GuideAnimal, ChildColor } from '@/lib/types';
import { GUIDE_ANIMALS, CHILD_COLORS, PLAN_GATES } from '@/lib/types';

const GRADES: { value: GradeBand; label: string }[] = [
  { value: 'pre-k', label: 'Pre-K' },
  { value: 'kindergarten', label: 'Kindergarten' },
  { value: 'grade-1', label: 'Grade 1' },
  { value: 'grade-2', label: 'Grade 2' },
  { value: 'grade-3', label: 'Grade 3' },
];

const ANIMAL_EMOJIS: Record<GuideAnimal, string> = {
  cat: '🐱', dog: '🐶', bunny: '🐰', bear: '🐻',
};

function getGradeFromAge(age: number): GradeBand {
  if (age <= 3) return 'pre-k';
  if (age <= 5) return 'kindergarten';
  if (age === 6) return 'grade-1';
  if (age === 7) return 'grade-2';
  return 'grade-3';
}

export default function AddChild() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState(6);
  const [grade, setGrade] = useState<GradeBand>('grade-1');
  const [animal, setAnimal] = useState<GuideAnimal>('cat');
  const [color, setColor] = useState<ChildColor>('#7C3AED');
  const addChild = useStore((s) => s.addChild);
  const children = useStore((s) => s.children);
  const profile = useStore((s) => s.currentProfile);
  const [, navigate] = useLocation();

  const usedColors = useMemo(() => children.filter(c => c.is_active).map(c => c.display_color), [children]);
  const maxChildren = profile ? PLAN_GATES[profile.plan_type].child_profiles : 1;
  const activeChildren = children.filter(c => c.is_active).length;
  const atCap = activeChildren >= maxChildren;

  const handleNext = () => {
    if (step < 3) {
      if (step === 1 && !name.trim()) return;
      if (step === 1) setGrade(getGradeFromAge(age));
      setStep(step + 1);
      return;
    }
    if (!name.trim() || atCap) return;
    addChild({
      display_name: name.trim(),
      age,
      grade_band: grade,
      avatar_emoji: ANIMAL_EMOJIS[animal],
      attention_span: 'medium',
      learning_style: 'mixed',
      short_day_mode: false,
      sensory_notes: '',
      language: 'en',
      display_color: color,
      avatar_animal: animal,
      sort_order: activeChildren,
      is_active: true,
    });
    navigate('/onboard/preferences');
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const gigiMessages = [
    "Every adventure needs a hero! What's your little one's name?",
    "Every adventurer needs a guide. Who will " + (name || 'they') + " explore with?",
    "Every adventurer has their own color. Which one feels like " + (name || 'them') + "?",
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>
            {step === 1 ? 'Add Your Child' : step === 2 ? 'Pick a Guide' : 'Pick a Color'}
          </h1>
          <p className="text-[#555] mt-2 text-sm">{gigiMessages[step - 1]}</p>
        </div>

        {atCap && (
          <div className="card-gigi mb-4 text-center">
            <p className="text-[#D85A30] font-bold">
              {maxChildren === 1 ? 'Your plan supports 1 child. Upgrade to Family for up to 4.' : 'Family plan maximum reached (4 children).'}
            </p>
            {maxChildren === 1 && (
              <Link href="/upgrade" className="text-[#7C3AED] underline text-sm mt-1 inline-block">Upgrade to Family Plan</Link>
            )}
          </div>
        )}

        <div className="card-gigi space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Child's Nickname</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 text-base focus:border-[#7C3AED] focus:outline-none" placeholder="e.g., Mia, Buddy, Little Star" maxLength={30} />
                  <p className="text-xs text-[#888] mt-1">This is just their Gigi name — you can change it anytime.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>How old?</label>
                    <select value={age} onChange={(e) => { setAge(Number(e.target.value)); setGrade(getGradeFromAge(Number(e.target.value))); }} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 text-base focus:border-[#7C3AED] focus:outline-none bg-white">
                      {[2,3,4,5,6,7,8,9].map((a) => <option key={a} value={a}>{a} years old</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Grade</label>
                    <select value={grade} onChange={(e) => setGrade(e.target.value as GradeBand)} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 text-base focus:border-[#7C3AED] focus:outline-none bg-white">
                      {GRADES.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {GUIDE_ANIMALS.map((a) => (
                    <button key={a.value} onClick={() => setAnimal(a.value)} className={`relative p-4 rounded-2xl border-3 text-center transition-all ${animal === a.value ? 'border-[#7C3AED] bg-[#7C3AED]/10 scale-[1.02]' : 'border-[#E5E5E0] hover:border-[#7C3AED]/50'}`}>
                      <div className="text-4xl mb-2">{ANIMAL_EMOJIS[a.value]}</div>
                      <div className="font-bold text-sm text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{a.name}</div>
                      <div className="text-xs text-[#777] mt-0.5">{a.personality}</div>
                      {animal === a.value && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-[#7C3AED] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {CHILD_COLORS.map((c) => {
                    const taken = usedColors.includes(c.value);
                    return (
                      <button key={c.value} onClick={() => !taken && setColor(c.value)} disabled={taken} className={`relative p-5 rounded-2xl border-3 text-center transition-all ${taken ? 'opacity-30 cursor-not-allowed border-[#E5E5E0]' : color === c.value ? 'border-[#1C1B2E] scale-[1.02]' : 'border-[#E5E5E0] hover:border-[#1C1B2E]/50'}`}>
                        <div className="w-16 h-16 rounded-full mx-auto mb-2" style={{ backgroundColor: c.value }} />
                        <div className="font-bold text-sm text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{c.name}</div>
                        {taken && <div className="text-xs text-[#999] mt-0.5">Taken by sibling</div>}
                        {color === c.value && !taken && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: c.value }}>
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3">
            {step === 1 ? (
              <Link href="/onboard/welcome" className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] !shadow-[0_4px_0_#C5C5C0] flex-1 justify-center"><ArrowLeft className="w-5 h-5" /> Back</Link>
            ) : (
              <button onClick={handleBack} className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] !shadow-[0_4px_0_#C5C5C0] flex-1 justify-center"><ArrowLeft className="w-5 h-5" /> Back</button>
            )}
            <button onClick={handleNext} disabled={step === 1 ? !name.trim() : atCap} className="btn-gigi flex-1 justify-center disabled:opacity-50">
              {step === 3 ? 'Create Profile' : 'Next'} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {[1,2,3,4,5].map((i) => (<div key={i} className={`w-3 h-3 rounded-full ${i === 2 ? 'bg-[#7C3AED]' : 'bg-[#E5E5E0]'}`} />))}
        </div>
      </motion.div>
    </div>
  );
}
