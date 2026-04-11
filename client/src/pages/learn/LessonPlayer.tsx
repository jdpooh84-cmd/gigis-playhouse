import { useParams, Link, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DOMAINS } from '@/lib/types';
import { ArrowLeft, ArrowRight, Check, Play, Hand, Lightbulb, MessageCircle, Star, HelpCircle, BookOpen, Pencil, ChevronRight, ChevronLeft } from 'lucide-react';
import { getCharacterByDomain } from '@/lib/characters';
import CharacterAvatar from '@/components/CharacterAvatar';
import { SEED_LESSONS } from '@/lib/seed-data';
import { toast } from 'sonner';

const STEPS = [
  { key: 'intro', label: 'Intro', icon: BookOpen, color: '#7C3AED' },
  { key: 'episode', label: 'Learn', icon: Play, color: '#4361EE' },
  { key: 'activity', label: 'Do', icon: Hand, color: '#F72585' },
  { key: 'reflect', label: 'Reflect', icon: MessageCircle, color: '#22C55E' },
  { key: 'quiz', label: 'Quiz', icon: HelpCircle, color: '#FBBF24' },
  { key: 'feedback', label: 'Done', icon: Star, color: '#7C3AED' },
] as const;

export default function LessonPlayer() {
  const { childId, lessonId } = useParams<{ childId: string; lessonId: string }>();
  const { data: childList = [] } = trpc.children.list.useQuery();
  const child = childList.find((c) => c.uuid === childId);
  const [step, setStep] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [, navigate] = useLocation();

  // Find the lesson from seed data
  const lesson = SEED_LESSONS.find(l => l.id === lessonId);
  const domain = lesson ? DOMAINS.find(d => d.id === lesson.domain) : DOMAINS[0];
  const character = domain ? getCharacterByDomain(domain.id) : getCharacterByDomain('literacy');

  const feedbackMutation = trpc.learning.addFeedback.useMutation({
    onSuccess: () => {
      toast.success('Thanks for your feedback!');
      navigate(`/learn/${childId}`);
    },
  });

  if (!child || !lesson || !domain) {
    return (
      <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center flex-col gap-4">
        <p className="text-lg font-bold text-[#1C1B2E]">{!lesson ? 'Lesson not found' : 'Child not found'}</p>
        <Link href={childId ? `/learn/${childId}` : '/dashboard'} className="text-[#7C3AED] font-bold text-sm">Back to Learning</Link>
      </div>
    );
  }

  const currentStep = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const handleQuizAnswer = (answerIdx: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[quizIndex] = answerIdx;
    setQuizAnswers(newAnswers);
    setShowExplanation(true);
  };

  const nextQuizQuestion = () => {
    setShowExplanation(false);
    if (quizIndex < lesson.quiz.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      setStep(5); // feedback
    }
  };

  const quizScore = lesson.quiz.length > 0
    ? Math.round((quizAnswers.filter((a, i) => a === lesson.quiz[i]?.correct_answer).length / lesson.quiz.length) * 100)
    : 0;

  const submitFeedback = () => {
    if (rating === 0) {
      navigate(`/learn/${childId}`);
      return;
    }
    feedbackMutation.mutate({
      childId: child.id,
      lessonId: lesson.id,
      domain: domain.id,
      rating,
      comment: comment || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <header className="bg-white border-b-2 border-[#E5E5E0] sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <Link href={`/learn/${childId}`} className="flex items-center gap-1 text-sm font-bold text-[#7C3AED]"><ArrowLeft className="w-4 h-4" /> Back</Link>
          <div className="flex items-center gap-2">
            <span className="text-lg">{character.emoji}</span>
            <span className="font-black text-sm" style={{ fontFamily: 'var(--font-display)' }}>{lesson.title}</span>
          </div>
          <span className="text-xs text-[#888]">{step + 1}/{STEPS.length}</span>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-[#E5E5E0]">
          <motion.div className="h-full" style={{ backgroundColor: domain.color }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
        </div>
      </header>

      {/* Step tabs */}
      {step < 5 && (
        <div className="bg-white border-b border-[#E5E5E0]">
          <div className="container flex items-center gap-1 py-3 overflow-x-auto">
            {STEPS.map((s, i) => (
              <button key={s.key} onClick={() => i <= step && setStep(i)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${i === step ? 'text-white' : i < step ? 'text-white/80' : 'text-[#888] bg-[#F5F5F0]'}`} style={i <= step ? { backgroundColor: s.color } : undefined}>
                {i < step ? <Check className="w-3.5 h-3.5" /> : <s.icon className="w-3.5 h-3.5" />} {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="container py-6 max-w-2xl">
        <AnimatePresence mode="wait">
          {/* ── INTRO ──────────────────────────────────────── */}
          {step === 0 && (
            <motion.div key="intro" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center mb-6">
                <CharacterAvatar character={character} size="lg" state="teaching" />
                <h1 className="text-2xl font-black mt-4 mb-2" style={{ fontFamily: 'var(--font-display)', color: domain.color }}>{lesson.title}</h1>
                <p className="text-sm text-[#888]">{lesson.theme}</p>
              </div>
              <div className="card-gigi mb-4">
                <p className="text-sm text-[#555] leading-relaxed">{lesson.episode.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {lesson.episode.skill_tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ backgroundColor: domain.color + '15', color: domain.color }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="card-gigi !border-[#FBBF24]/40 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-[#FBBF24]" />
                  <span className="text-xs font-bold text-[#1C1B2E]">Materials Needed</span>
                </div>
                <ul className="text-sm text-[#555] space-y-1">
                  {lesson.materials_needed.map((m, i) => <li key={i}>• {m}</li>)}
                </ul>
              </div>
              <button onClick={() => setStep(1)} className="btn-gigi w-full !text-base" style={{ backgroundColor: domain.color }}>
                <Play className="w-5 h-5 mr-2" /> Let's Start!
              </button>
            </motion.div>
          )}

          {/* ── EPISODE / LEARN ────────────────────────────── */}
          {step === 1 && (
            <motion.div key="episode" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6" style={{ color: domain.color }} />
                <h2 className="text-xl font-black" style={{ fontFamily: 'var(--font-display)', color: domain.color }}>{lesson.episode.title}</h2>
              </div>
              <div className="card-gigi mb-4">
                <p className="text-sm text-[#555] leading-relaxed">{lesson.episode.description}</p>
                <p className="text-xs text-[#888] mt-3">⏱ About {lesson.episode.duration_minutes} minutes</p>
              </div>
              <div className="card-gigi !bg-[#7C3AED]/5 mb-4">
                <p className="text-xs font-bold text-[#7C3AED] mb-1">🎯 On-Track Goal</p>
                <p className="text-sm text-[#555]">{lesson.on_track_goal}</p>
              </div>
              <div className="card-gigi !bg-[#F72585]/5 mb-4">
                <p className="text-xs font-bold text-[#F72585] mb-1">🌟 Stretch Goal</p>
                <p className="text-sm text-[#555]">{lesson.stretch_goal}</p>
              </div>
              <div className="card-gigi !bg-[#FBBF24]/10 mb-6">
                <p className="text-xs font-bold text-[#92400E] mb-1">🤟 ASL Word of the Day</p>
                <p className="text-lg font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{lesson.asl_word}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="flex-1 btn-gigi !bg-white !text-[#888] !border-2 !border-[#E5E5E0] !shadow-none"><ChevronLeft className="w-4 h-4 mr-1" /> Back</button>
                <button onClick={() => setStep(2)} className="flex-1 btn-gigi" style={{ backgroundColor: domain.color }}>Activity Time <ChevronRight className="w-4 h-4 ml-1" /></button>
              </div>
            </motion.div>
          )}

          {/* ── ACTIVITY ───────────────────────────────────── */}
          {step === 2 && (
            <motion.div key="activity" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center gap-3 mb-4">
                <Pencil className="w-6 h-6" style={{ color: domain.color }} />
                <h2 className="text-xl font-black" style={{ fontFamily: 'var(--font-display)', color: domain.color }}>{lesson.activity.title}</h2>
              </div>
              <div className="card-gigi mb-4">
                <ol className="space-y-3">
                  {lesson.activity.instructions.map((inst, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#555]">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: domain.color + '20', color: domain.color }}>{i + 1}</span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="card-gigi !bg-green-50 mb-4">
                <p className="text-xs font-bold text-green-700 mb-1">💡 Short Version</p>
                <p className="text-sm text-green-800">{lesson.activity.short_version}</p>
              </div>
              <div className="card-gigi !bg-blue-50 mb-6">
                <p className="text-xs font-bold text-blue-700 mb-1">🏠 Apply at Home</p>
                <p className="text-sm text-blue-800">{lesson.apply_prompt}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 btn-gigi !bg-white !text-[#888] !border-2 !border-[#E5E5E0] !shadow-none"><ChevronLeft className="w-4 h-4 mr-1" /> Back</button>
                <button onClick={() => setStep(3)} className="flex-1 btn-gigi" style={{ backgroundColor: domain.color }}>Reflect <ChevronRight className="w-4 h-4 ml-1" /></button>
              </div>
            </motion.div>
          )}

          {/* ── REFLECT ────────────────────────────────────── */}
          {step === 3 && (
            <motion.div key="reflect" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center mb-6">
                <CharacterAvatar character={character} size="md" state="teaching" />
                <h2 className="text-xl font-black mt-3" style={{ fontFamily: 'var(--font-display)', color: domain.color }}>Let's Think About It!</h2>
                <p className="text-sm text-[#888] mt-1">{lesson.reflection_prompt}</p>
              </div>
              <div className="space-y-3 mb-6">
                {lesson.reflect_script.map((q, i) => (
                  <div key={i} className="card-gigi flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: domain.color }} />
                    <p className="text-sm text-[#555]">{q}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 btn-gigi !bg-white !text-[#888] !border-2 !border-[#E5E5E0] !shadow-none"><ChevronLeft className="w-4 h-4 mr-1" /> Back</button>
                <button onClick={() => { setQuizIndex(0); setQuizAnswers([]); setShowExplanation(false); setStep(4); }} className="flex-1 btn-gigi" style={{ backgroundColor: domain.color }}>Take the Quiz! <ChevronRight className="w-4 h-4 ml-1" /></button>
              </div>
            </motion.div>
          )}

          {/* ── QUIZ ───────────────────────────────────────── */}
          {step === 4 && lesson.quiz[quizIndex] && (
            <motion.div key={`quiz-${quizIndex}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black" style={{ fontFamily: 'var(--font-display)', color: domain.color }}>Quiz Time!</h2>
                <span className="text-xs font-bold text-[#888]">{quizIndex + 1} of {lesson.quiz.length}</span>
              </div>
              <div className="card-gigi mb-4">
                <p className="font-bold text-[#1C1B2E] mb-4" style={{ fontFamily: 'var(--font-display)' }}>{lesson.quiz[quizIndex].question}</p>
                <div className="space-y-2">
                  {lesson.quiz[quizIndex].options.map((opt, i) => {
                    const answered = quizAnswers[quizIndex] !== undefined;
                    const isCorrect = i === lesson.quiz[quizIndex].correct_answer;
                    const isSelected = quizAnswers[quizIndex] === i;
                    let btnClass = 'w-full text-left p-3 rounded-xl border-2 text-sm font-bold transition-all ';
                    if (!answered) btnClass += 'border-[#E5E5E0] hover:border-[#7C3AED] bg-white';
                    else if (isCorrect) btnClass += 'border-green-400 bg-green-50 text-green-800';
                    else if (isSelected && !isCorrect) btnClass += 'border-red-400 bg-red-50 text-red-800';
                    else btnClass += 'border-[#E5E5E0] bg-white opacity-50';
                    return (
                      <button key={i} onClick={() => !answered && handleQuizAnswer(i)} disabled={answered} className={btnClass}>
                        {answered && isCorrect && <Check className="w-4 h-4 inline mr-2 text-green-500" />}
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {showExplanation && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 rounded-xl bg-[#FAFAF5] border border-[#E5E5E0]">
                    <p className="text-sm text-[#555]">
                      {quizAnswers[quizIndex] === lesson.quiz[quizIndex].correct_answer ? '🎉 ' : '💡 '}
                      {lesson.quiz[quizIndex].explanation}
                    </p>
                  </motion.div>
                )}
              </div>
              {showExplanation && (
                <button onClick={nextQuizQuestion} className="btn-gigi w-full" style={{ backgroundColor: domain.color }}>
                  {quizIndex < lesson.quiz.length - 1 ? 'Next Question' : 'See Results'} <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              )}
            </motion.div>
          )}

          {/* ── FEEDBACK / DONE ────────────────────────────── */}
          {step === 5 && (
            <motion.div key="feedback" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="card-gigi text-center py-8">
                <CharacterAvatar character={character} size="lg" state="celebrating" />
                <h2 className="text-2xl font-black mt-4 mb-2" style={{ fontFamily: 'var(--font-display)', color: domain.color }}>Lesson Complete! 🎉</h2>
                <p className="text-sm text-[#888]">You scored {quizScore}% on the quiz!</p>
                {quizScore >= 70 && <p className="text-sm font-bold text-green-600 mt-1">Great job! ⭐</p>}

                <p className="text-sm font-bold text-[#1C1B2E] mt-6 mb-3" style={{ fontFamily: 'var(--font-display)' }}>How was this lesson?</p>
                <div className="flex justify-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => setRating(s)} className="transition-transform hover:scale-110">
                      <Star className={`w-10 h-10 ${s <= rating ? 'fill-[#FBBF24] text-[#FBBF24]' : 'text-[#E5E5E0]'}`} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Any comments? (optional)"
                  className="w-full rounded-xl border-2 border-[#E5E5E0] p-3 text-sm resize-none h-20 focus:border-[#7C3AED] outline-none mb-4"
                />
                <div className="flex gap-3">
                  <button onClick={() => { toast.success('Lesson complete!'); navigate(`/learn/${childId}`); }} className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] !shadow-[0_4px_0_#C5C5C0] flex-1">Skip</button>
                  <button onClick={submitFeedback} disabled={feedbackMutation.isPending} className="btn-gigi flex-1">
                    {feedbackMutation.isPending ? 'Sending...' : 'Submit & Continue'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character encouragement */}
        {step < 5 && step !== 4 && (
          <div className="flex items-center gap-3 mt-6 p-4 bg-white rounded-2xl border-2 border-[#E5E5E0]">
            <CharacterAvatar character={character} size="sm" state="teaching" />
            <p className="text-sm text-[#555]" style={{ fontFamily: "'Lexend', sans-serif" }}>
              {character.encouragements[step % character.encouragements.length]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
