import { useParams, Link, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DOMAINS } from '@/lib/types';
import { ArrowLeft, ArrowRight, Check, Play, Hand, Lightbulb, MessageCircle, Star } from 'lucide-react';
import { getCharacterByDomain } from '@/lib/characters';
import CharacterAvatar from '@/components/CharacterAvatar';
import MovementBreak from '@/components/MovementBreak';
import { toast } from 'sonner';

const STEPS = [
  { key: 'watch', label: 'Watch', icon: Play, color: '#4361EE' },
  { key: 'do', label: 'Do', icon: Hand, color: '#F72585' },
  { key: 'apply', label: 'Apply', icon: Lightbulb, color: '#FBBF24' },
  { key: 'reflect', label: 'Reflect', icon: MessageCircle, color: '#22C55E' },
] as const;

export default function LessonPlayer() {
  const { childId, lessonId } = useParams<{ childId: string; lessonId: string }>();
  const { data: childList = [] } = trpc.children.list.useQuery();
  const child = childList.find((c) => c.uuid === childId);
  const [step, setStep] = useState(0);
  const [showMovementBreak, setShowMovementBreak] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [, navigate] = useLocation();

  const feedbackMutation = trpc.learning.addFeedback.useMutation({
    onSuccess: () => {
      toast.success('Thanks for your feedback!');
      navigate(`/learn/${childId}`);
    },
  });

  if (!child) return <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center"><p>Child not found</p></div>;

  const currentStep = STEPS[step];
  const domain = DOMAINS[0];
  const character = getCharacterByDomain(domain.id);

  const completeStep = () => {
    if (step < 3) {
      setStep(step + 1);
      if (step === 1) setShowMovementBreak(true);
    } else {
      setShowFeedback(true);
    }
  };

  const submitFeedback = () => {
    if (rating === 0) {
      toast.info('Please select a star rating');
      return;
    }
    feedbackMutation.mutate({
      childId: child.id,
      lessonId: lessonId ?? 'unknown',
      domain: domain.id,
      rating,
      comment: comment || undefined,
    });
  };

  const skipFeedback = () => {
    toast.success('Lesson complete!');
    navigate(`/learn/${childId}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <header className="bg-white border-b-2 border-[#E5E5E0] sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <Link href={`/learn/${childId}`} className="flex items-center gap-1 text-sm font-bold text-[#7C3AED]"><ArrowLeft className="w-4 h-4" /> Back</Link>
          <div className="flex items-center gap-2"><span className="font-black text-sm" style={{ fontFamily: 'var(--font-display)' }}>Lesson {lessonId}</span></div>
          <span className="text-xs text-[#888]">Day 1</span>
        </div>
      </header>

      {!showFeedback && (
        <div className="bg-white border-b border-[#E5E5E0]">
          <div className="container flex items-center gap-1 py-3 overflow-x-auto">
            {STEPS.map((s, i) => (
              <button key={s.key} onClick={() => setStep(i)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${i === step ? 'text-white' : i < step ? 'text-white/80' : 'text-[#888] bg-[#F5F5F0]'}`} style={i <= step ? { backgroundColor: s.color } : undefined}>
                {i < step ? <Check className="w-3.5 h-3.5" /> : <s.icon className="w-3.5 h-3.5" />} {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="container py-6 max-w-2xl">
        <AnimatePresence mode="wait">
          {showFeedback ? (
            <motion.div key="feedback" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="card-gigi text-center py-8">
                <div className="text-4xl mb-3">🎉</div>
                <h2 className="text-xl font-black mb-2" style={{ fontFamily: 'var(--font-display)', color: '#7C3AED' }}>Lesson Complete!</h2>
                <p className="text-[#555] text-sm mb-6">How did {child.displayName} enjoy this lesson?</p>

                {/* Star rating */}
                <div className="flex justify-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => setRating(s)} className="transition-transform hover:scale-110">
                      <Star className={`w-10 h-10 ${s <= rating ? 'fill-[#FBBF24] text-[#FBBF24]' : 'text-[#E5E5E0]'}`} />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#888] mb-4">
                  {rating === 0 ? 'Tap a star to rate' : rating <= 2 ? 'We\'ll work on making it better!' : rating <= 4 ? 'Great to hear!' : 'Awesome! 🌟'}
                </p>

                {/* Optional comment */}
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Any comments? (optional)"
                  className="w-full rounded-xl border-2 border-[#E5E5E0] p-3 text-sm resize-none h-20 focus:border-[#7C3AED] outline-none mb-4"
                />

                <div className="flex gap-3">
                  <button onClick={skipFeedback} className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] !shadow-[0_4px_0_#C5C5C0] flex-1">Skip</button>
                  <button onClick={submitFeedback} disabled={feedbackMutation.isPending} className="btn-gigi flex-1">
                    {feedbackMutation.isPending ? 'Sending...' : 'Submit Rating'}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="card-gigi text-center py-12">
                <currentStep.icon className="w-12 h-12 mx-auto mb-4" style={{ color: currentStep.color }} />
                <h2 className="text-xl font-black mb-2" style={{ fontFamily: 'var(--font-display)', color: currentStep.color }}>{currentStep.label}</h2>
                <p className="text-[#555] text-sm">Curriculum content will be loaded from the database. This is a placeholder for the {currentStep.label.toLowerCase()} step.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showFeedback && (
          <>
            <div className="flex items-center gap-3 mt-6 p-4 bg-white rounded-2xl border-2 border-[#E5E5E0]">
              <CharacterAvatar character={character} size="sm" state="teaching" />
              <p className="text-sm text-[#555]" style={{ fontFamily: "'Lexend', sans-serif" }}>
                {character.encouragements[step % character.encouragements.length]}
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              {step > 0 && <button onClick={() => setStep(step - 1)} className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] !shadow-[0_4px_0_#C5C5C0] flex-1"><ArrowLeft className="w-5 h-5" /> Previous</button>}
              <button onClick={completeStep} className="btn-gigi flex-1" style={{ backgroundColor: currentStep.color }}>
                {step < 3 ? <>Complete & Next <ArrowRight className="w-5 h-5" /></> : <><Star className="w-5 h-5" /> Finish Lesson</>}
              </button>
            </div>
          </>
        )}
      </div>

      {showMovementBreak && <MovementBreak onComplete={() => setShowMovementBreak(false)} />}
    </div>
  );
}
