import { useParams, Link, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, Star, RotateCcw } from 'lucide-react';

// Placeholder quiz questions until learning content is loaded from DB
const SAMPLE_QUESTIONS = [
  { question: 'What color do you get when you mix red and blue?', options: ['Green', 'Purple', 'Orange', 'Yellow'], correct_answer: 1, explanation: 'Red and blue make purple!' },
  { question: 'How many legs does a cat have?', options: ['2', '4', '6', '8'], correct_answer: 1, explanation: 'Cats have 4 legs.' },
  { question: 'What sound does a cow make?', options: ['Woof', 'Meow', 'Moo', 'Baa'], correct_answer: 2, explanation: 'Cows say "Moo"!' },
];

export default function QuizView() {
  const { childId, lessonId } = useParams<{ childId: string; lessonId: string }>();
  const { data: childList = [] } = trpc.children.list.useQuery();
  const child = childList.find((c) => c.uuid === childId);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [, navigate] = useLocation();

  if (!child) return <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center"><p>Quiz not found</p></div>;

  const questions = SAMPLE_QUESTIONS;
  const currentQ = questions[qIndex];

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === currentQ.correct_answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      const computedScore = selected === currentQ.correct_answer ? score + 1 : score;
      setFinalScore(computedScore);
      setFinished(true);
    }
  };

  const handleRetry = () => {
    setQIndex(0); setSelected(null); setShowResult(false); setScore(0); setFinished(false);
  };

  const passed = finalScore >= Math.ceil(questions.length * 0.7);

  if (finished) {
    return (
      <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
          <motion.div animate={{ rotate: passed ? [0, 10, -10, 0] : [0, -5, 5, 0], scale: [1, 1.2, 1] }} transition={{ duration: 1 }} className="text-7xl mb-6">
            {passed ? '🎉' : '💪'}
          </motion.div>
          <h1 className="text-3xl font-black mb-2" style={{ fontFamily: 'var(--font-display)', color: passed ? '#22C55E' : '#F72585' }}>
            {passed ? 'Amazing Job!' : 'Keep Trying!'}
          </h1>
          <p className="text-lg text-[#555] mb-2">You got <strong>{finalScore}</strong> out of <strong>{questions.length}</strong> correct!</p>
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: questions.length }).map((_, i) => (
              <Star key={i} className={`w-8 h-8 ${i < finalScore ? 'text-[#FBBF24] fill-[#FBBF24]' : 'text-[#E5E5E0]'}`} />
            ))}
          </div>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            {passed ? (
              <Link href={`/learn/${childId}`} className="btn-gigi w-full justify-center">Back to Learning</Link>
            ) : (
              <>
                <button onClick={handleRetry} className="btn-gigi w-full justify-center"><RotateCcw className="w-5 h-5" /> Try Again</button>
                <Link href={`/learn/${childId}`} className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] !shadow-[0_4px_0_#C5C5C0] w-full justify-center">Back to Learning</Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <header className="bg-white border-b-2 border-[#E5E5E0] sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <Link href={`/learn/${childId}`} className="flex items-center gap-1 text-sm font-bold text-[#7C3AED]"><ArrowLeft className="w-4 h-4" /> Back</Link>
          <span className="font-black text-sm" style={{ fontFamily: 'var(--font-display)' }}>Quiz</span>
          <span className="text-xs text-[#888]">{qIndex + 1}/{questions.length}</span>
        </div>
      </header>

      <div className="container py-6 max-w-lg">
        <div className="h-3 bg-[#E5E5E0] rounded-full mb-6 overflow-hidden">
          <motion.div className="h-full rounded-full bg-[#7C3AED]" animate={{ width: `${((qIndex + 1) / questions.length) * 100}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={qIndex} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="card-gigi mb-6">
              <p className="text-xs font-bold text-[#888] mb-2">Question {qIndex + 1}</p>
              <h2 className="text-xl font-black text-[#1C1B2E] mb-6" style={{ fontFamily: 'var(--font-display)' }}>{currentQ.question}</h2>
              <div className="space-y-3">
                {currentQ.options.map((opt, i) => {
                  const isCorrect = i === currentQ.correct_answer;
                  const isSelected = i === selected;
                  let borderColor = '#E5E5E0';
                  let bgColor = 'white';
                  if (showResult && isCorrect) { borderColor = '#22C55E'; bgColor = '#22C55E10'; }
                  if (showResult && isSelected && !isCorrect) { borderColor = '#EF4444'; bgColor = '#EF444410'; }
                  if (!showResult && isSelected) { borderColor = '#7C3AED'; bgColor = '#7C3AED10'; }
                  return (
                    <button key={i} onClick={() => handleAnswer(i)} disabled={showResult} className="w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3" style={{ borderColor, backgroundColor: bgColor }}>
                      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-black shrink-0" style={{ borderColor }}>
                        {showResult && isCorrect ? <Check className="w-4 h-4 text-[#22C55E]" /> : showResult && isSelected ? <X className="w-4 h-4 text-[#EF4444]" /> : String.fromCharCode(65 + i)}
                      </div>
                      <span className="font-semibold text-sm">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {showResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-gigi !bg-[#F5F5F0] mb-6">
                <p className="text-sm text-[#555]">{currentQ.explanation}</p>
              </motion.div>
            )}

            {showResult && (
              <button onClick={handleNext} className="btn-gigi w-full">
                {qIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
