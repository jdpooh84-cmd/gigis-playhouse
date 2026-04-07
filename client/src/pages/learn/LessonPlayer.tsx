import { useParams, Link, useLocation } from 'wouter';
import { useStore } from '@/lib/store';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DOMAINS } from '@/lib/types';
import { ArrowLeft, ArrowRight, Check, Play, Hand, Lightbulb, MessageCircle, Star } from 'lucide-react';
import { getCharacterByDomain } from '@/lib/characters';
import CharacterAvatar from '@/components/CharacterAvatar';
import MovementBreak from '@/components/MovementBreak';

const STEPS = [
  { key: 'watch', label: 'Watch', icon: Play, color: '#4361EE' },
  { key: 'do', label: 'Do', icon: Hand, color: '#F72585' },
  { key: 'apply', label: 'Apply', icon: Lightbulb, color: '#FBBF24' },
  { key: 'reflect', label: 'Reflect', icon: MessageCircle, color: '#22C55E' },
] as const;

export default function LessonPlayer() {
  const { childId, lessonId } = useParams<{ childId: string; lessonId: string }>();
  const child = useStore((s) => s.children.find((c) => c.id === childId));
  const lesson = useStore((s) => s.lessons.find((l) => l.id === lessonId));
  const updateLessonProgress = useStore((s) => s.updateLessonProgress);
  const [step, setStep] = useState(0);
  const [showMovementBreak, setShowMovementBreak] = useState(false);
  const [, navigate] = useLocation();

  if (!child || !lesson) return <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center"><p>Lesson not found</p></div>;

  const domain = DOMAINS.find((d) => d.id === lesson.domain);
  const character = getCharacterByDomain(lesson.domain);
  const currentStep = STEPS[step];

  const completeStep = () => {
    const updates: Record<string, boolean | string> = {};
    if (step === 0) updates.watch_complete = true;
    if (step === 1) updates.do_complete = true;
    if (step === 2) updates.apply_complete = true;
    if (step === 3) { updates.reflect_complete = true; updates.completion_status = 'done'; }
    updateLessonProgress({ child_id: childId!, lesson_id: lessonId!, ...updates });
    if (step < 3) {
      setStep(step + 1);
      // Show movement break between Do and Apply steps
      if (step === 1) setShowMovementBreak(true);
    } else {
      navigate(`/learn/${childId}/quiz/${lessonId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <header className="bg-white border-b-2 border-[#E5E5E0] sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <Link href={`/learn/${childId}`} className="flex items-center gap-1 text-sm font-bold text-[#7C3AED]"><ArrowLeft className="w-4 h-4" /> Back</Link>
          <div className="flex items-center gap-2"><span className="text-lg">{domain?.emoji}</span><span className="font-black text-sm" style={{ fontFamily: 'var(--font-display)', color: domain?.color }}>{lesson.title}</span></div>
          <span className="text-xs text-[#888]">Day {lesson.day_number}</span>
        </div>
      </header>

      <div className="bg-white border-b border-[#E5E5E0]">
        <div className="container flex items-center gap-1 py-3 overflow-x-auto">
          {STEPS.map((s, i) => (
            <button key={s.key} onClick={() => setStep(i)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${i === step ? 'text-white' : i < step ? 'text-white/80' : 'text-[#888] bg-[#F5F5F0]'}`} style={i <= step ? { backgroundColor: s.color } : undefined}>
              {i < step ? <Check className="w-3.5 h-3.5" /> : <s.icon className="w-3.5 h-3.5" />} {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container py-6 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {step === 0 && (
              <div className="space-y-6">
                <div className="card-gigi">
                  <h2 className="text-xl font-black mb-2" style={{ fontFamily: 'var(--font-display)', color: currentStep.color }}>Watch: {lesson.episode.title}</h2>
                  <p className="text-[#555] mb-4">{lesson.episode.description}</p>
                  <div className="bg-[#1C1B2E] rounded-2xl aspect-video flex items-center justify-center mb-4">
                    <div className="text-center text-white/60"><Play className="w-12 h-12 mx-auto mb-2" /><p className="text-sm">Video: "{lesson.episode.search_term}"</p><p className="text-xs mt-1">~{lesson.episode.duration_minutes} min</p></div>
                  </div>
                  <div className="flex flex-wrap gap-2">{lesson.episode.skill_tags.map((tag) => <span key={tag} className="bg-[#7C3AED]/10 text-[#7C3AED] rounded-full px-3 py-1 text-xs font-bold">{tag}</span>)}</div>
                </div>
                {lesson.asl_word && (
                  <div className="card-gigi !border-[#22C55E]/40 !p-4 flex items-center gap-3">
                    <span className="text-2xl">🤟</span>
                    <div><p className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>ASL Word of the Day</p><p className="text-xs text-[#888]">Learn to sign: <strong>{lesson.asl_word}</strong></p></div>
                  </div>
                )}
              </div>
            )}
            {step === 1 && (
              <div className="card-gigi">
                <h2 className="text-xl font-black mb-4" style={{ fontFamily: 'var(--font-display)', color: currentStep.color }}>Do: {lesson.activity.title}</h2>
                <div className="space-y-3 mb-4">
                  {(child.short_day_mode ? lesson.activity.instructions.slice(0, Math.ceil(lesson.activity.instructions.length / 2)) : lesson.activity.instructions).map((inst, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0" style={{ backgroundColor: currentStep.color }}>{i + 1}</div>
                      <p className="text-sm text-[#555] pt-1">{inst}</p>
                    </div>
                  ))}
                </div>
                {lesson.materials_needed.length > 0 && (
                  <div className="bg-[#F5F5F0] rounded-xl p-4">
                    <p className="font-bold text-xs mb-2" style={{ fontFamily: 'var(--font-display)' }}>Materials Needed:</p>
                    <div className="flex flex-wrap gap-2">{lesson.materials_needed.map((m) => <span key={m} className="bg-white rounded-lg px-3 py-1 text-xs font-semibold border border-[#E5E5E0]">{m}</span>)}</div>
                  </div>
                )}
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6">
                <div className="card-gigi"><h2 className="text-xl font-black mb-2" style={{ fontFamily: 'var(--font-display)', color: currentStep.color }}>Apply It!</h2><p className="text-lg text-[#555]">{lesson.apply_prompt}</p></div>
                <div className="card-gigi !bg-[#FBBF24]/10 !border-[#FBBF24]/40"><p className="font-bold text-sm mb-1" style={{ fontFamily: 'var(--font-display)' }}>On Track Goal:</p><p className="text-sm text-[#555]">{lesson.on_track_goal}</p></div>
                <div className="card-gigi !bg-[#7C3AED]/10 !border-[#7C3AED]/40"><p className="font-bold text-sm mb-1" style={{ fontFamily: 'var(--font-display)' }}>Stretch Goal:</p><p className="text-sm text-[#555]">{lesson.stretch_goal}</p></div>
              </div>
            )}
            {step === 3 && (
              <div className="card-gigi">
                <h2 className="text-xl font-black mb-4" style={{ fontFamily: 'var(--font-display)', color: currentStep.color }}>Reflect</h2>
                <p className="text-[#555] mb-4">{lesson.reflection_prompt}</p>
                <div className="space-y-3">{lesson.reflect_script.map((q, i) => <div key={i} className="bg-[#F5F5F0] rounded-xl p-4 flex items-start gap-3"><span className="text-lg">💬</span><p className="text-sm text-[#555]">{q}</p></div>)}</div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Character guide */}
        <div className="flex items-center gap-3 mt-6 p-4 bg-white rounded-2xl border-2 border-[#E5E5E0]">
          <CharacterAvatar character={character} size="sm" state="teaching" />
          <p className="text-sm text-[#555]" style={{ fontFamily: "'Lexend', sans-serif" }}>
            {character.encouragements[step % character.encouragements.length]}
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          {step > 0 && <button onClick={() => setStep(step - 1)} className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] !shadow-[0_4px_0_#C5C5C0] flex-1"><ArrowLeft className="w-5 h-5" /> Previous</button>}
          <button onClick={completeStep} className="btn-gigi flex-1" style={{ backgroundColor: currentStep.color }}>
            {step < 3 ? <>Complete & Next <ArrowRight className="w-5 h-5" /></> : <><Star className="w-5 h-5" /> Finish & Take Quiz</>}
          </button>
        </div>
      </div>

      {/* Movement Break Overlay */}
      {showMovementBreak && <MovementBreak onComplete={() => setShowMovementBreak(false)} />}
    </div>
  );
}
