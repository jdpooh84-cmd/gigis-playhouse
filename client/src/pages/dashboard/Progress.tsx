/**
 * Progress Page — Child learning progress visualization with real data
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 */
import { useMemo } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { DOMAINS } from "@/lib/types";
import DashboardLayout from "@/components/DashboardLayout";
import { ArrowLeft, Trophy, Star, BookOpen, Clock, TrendingUp, Zap, Brain, CheckCircle2 } from "lucide-react";

export default function Progress() {
  const { id } = useParams<{ id: string }>();
  const { data: childList = [] } = trpc.children.list.useQuery();
  const child = useMemo(() => childList.find((c) => c.uuid === id), [childList, id]);

  const { data: progress } = trpc.learning.getProgressSummary.useQuery(
    { childId: child?.id ?? 0 },
    { enabled: !!child }
  );

  const { data: quizzes = [] } = trpc.learning.listQuizResults.useQuery(
    { childId: child?.id ?? 0 },
    { enabled: !!child }
  );

  const { data: feedback = [] } = trpc.learning.listFeedback.useQuery(
    { childId: child?.id ?? 0 },
    { enabled: !!child }
  );

  if (!child) {
    return (
      <DashboardLayout title="Progress">
        <div className="text-center py-20">
          <p className="text-gray-400">Child not found</p>
          <Link to="/dashboard" className="text-purple-600 font-bold text-sm mt-2 inline-block">Back to Dashboard</Link>
        </div>
      </DashboardLayout>
    );
  }

  const overallPct = progress && progress.totalLessons > 0
    ? Math.round((progress.completedLessons / progress.totalLessons) * 100) : 0;

  return (
    <DashboardLayout title={`${child.displayName}'s Progress`}>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-purple-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={<BookOpen className="w-5 h-5" />} label="Lessons Done" value={String(progress?.completedLessons ?? 0)} color="bg-purple-100 text-purple-600" />
          <StatCard icon={<Star className="w-5 h-5" />} label="Avg Quiz Score" value={progress?.avgQuizScore ? `${progress.avgQuizScore}%` : "—"} color="bg-amber-100 text-amber-600" />
          <StatCard icon={<Trophy className="w-5 h-5" />} label="Quizzes Passed" value={String(progress?.passedQuizzes ?? 0)} color="bg-green-100 text-green-600" />
          <StatCard icon={<Brain className="w-5 h-5" />} label="Flashcards Mastered" value={String(progress?.masteredFlashcards ?? 0)} color="bg-blue-100 text-blue-600" />
        </div>

        {/* Overall progress ring */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <TrendingUp className="w-5 h-5 inline mr-2 text-purple-600" />
            Learning Journey
          </h2>
          <div className="flex items-center gap-8">
            {/* Progress circle */}
            <div className="relative w-32 h-32 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E5E0" strokeWidth="10" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#7C3AED" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${overallPct * 2.64} ${264 - overallPct * 2.64}`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-[#7C3AED]" style={{ fontFamily: "'Nunito', sans-serif" }}>{overallPct}%</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm text-gray-600"><strong>{progress?.enrolledPaths ?? 0}</strong> learning paths enrolled</p>
              <p className="text-sm text-gray-600"><strong>{progress?.completedLessons ?? 0}</strong> of <strong>{progress?.totalLessons ?? 0}</strong> lessons completed</p>
              <p className="text-sm text-gray-600"><strong>{progress?.inProgressLessons ?? 0}</strong> lessons in progress</p>
              <p className="text-sm text-gray-600"><strong>{progress?.totalQuizzes ?? 0}</strong> quizzes taken, <strong>{progress?.passedQuizzes ?? 0}</strong> passed</p>
            </div>
          </div>
        </motion.section>

        {/* Domain-level progress */}
        {progress?.domainProgress && progress.domainProgress.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
              <CheckCircle2 className="w-5 h-5 inline mr-2 text-green-500" />
              Progress by Subject
            </h2>
            <div className="space-y-4">
              {progress.domainProgress.map((dp) => {
                const domain = DOMAINS.find(d => d.id === dp.domain);
                const pct = dp.lessonsTotal > 0 ? Math.round((dp.lessonsCompleted / dp.lessonsTotal) * 100) : 0;
                return (
                  <div key={dp.domain}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold" style={{ color: domain?.color ?? '#7C3AED' }}>{domain?.name ?? dp.domain}</span>
                      <span className="text-xs text-gray-400">{dp.lessonsCompleted}/{dp.lessonsTotal} lessons · {dp.quizzesPassed}/{dp.quizzesTotal} quizzes</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: domain?.color ?? '#7C3AED' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Recent Quiz Results */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <Trophy className="w-5 h-5 inline mr-2 text-amber-500" />
            Recent Quiz Results
          </h2>
          {quizzes.length === 0 ? (
            <div className="text-center py-8">
              <Trophy className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 text-sm font-bold">No quizzes completed yet</p>
              <p className="text-gray-400 text-xs mt-1">Complete lessons to unlock quizzes!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {quizzes.slice(0, 5).map((q) => (
                <div key={q.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{q.lessonId}</p>
                    <p className="text-xs text-gray-400">{new Date(q.takenAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-black ${q.passed ? 'text-green-600' : 'text-red-500'}`}>{q.score}/{q.total}</span>
                    {q.passed && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Recent Feedback */}
        {feedback.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
              <Star className="w-5 h-5 inline mr-2 text-yellow-500" />
              Lesson Ratings
            </h2>
            <div className="space-y-3">
              {feedback.slice(0, 5).map((f) => (
                <div key={f.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{f.lessonId}</p>
                    {f.comment && <p className="text-xs text-gray-500 mt-1">{f.comment}</p>}
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-4 h-4 ${s <= f.rating ? 'fill-[#FBBF24] text-[#FBBF24]' : 'text-gray-200'}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Achievements */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Achievements
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {ACHIEVEMENTS.map((ach, i) => {
              const unlocked = checkAchievement(ach.key, progress);
              return (
                <div key={i} className={`text-center p-3 rounded-xl transition-all ${unlocked ? '' : 'opacity-30 grayscale'}`}>
                  <div className="text-3xl mb-2">{ach.emoji}</div>
                  <p className="text-xs font-bold text-gray-700">{ach.name}</p>
                </div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>{icon}</div>
      <p className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>{value}</p>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
    </motion.div>
  );
}

type ProgressData = { completedLessons: number; passedQuizzes: number; masteredFlashcards: number; enrolledPaths: number } | undefined;

function checkAchievement(key: string, progress: ProgressData): boolean {
  if (!progress) return false;
  switch (key) {
    case 'first_lesson': return progress.completedLessons >= 1;
    case 'quiz_ace': return progress.passedQuizzes >= 1;
    case 'streak': return false; // Would need daily tracking
    case 'bookworm': return progress.completedLessons >= 10;
    case 'math': return false; // Domain-specific
    case 'science': return false;
    case 'art': return false;
    case 'explorer': return progress.enrolledPaths >= 3;
    case 'life_pro': return false;
    case 'champion': return progress.completedLessons >= 50;
    default: return false;
  }
}

const ACHIEVEMENTS = [
  { emoji: "\u{1F31F}", name: "First Lesson", key: "first_lesson" },
  { emoji: "\u{1F3AF}", name: "Quiz Ace", key: "quiz_ace" },
  { emoji: "\u{1F525}", name: "7-Day Streak", key: "streak" },
  { emoji: "\u{1F4DA}", name: "Bookworm", key: "bookworm" },
  { emoji: "\u{1F9EE}", name: "Math Whiz", key: "math" },
  { emoji: "\u{1F52C}", name: "Scientist", key: "science" },
  { emoji: "\u{1F3A8}", name: "Artist", key: "art" },
  { emoji: "\u{1F30D}", name: "Explorer", key: "explorer" },
  { emoji: "\u{1F4AA}", name: "Life Pro", key: "life_pro" },
  { emoji: "\u{1F3C6}", name: "Champion", key: "champion" },
];
