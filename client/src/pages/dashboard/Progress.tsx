/**
 * Progress Page — Child learning progress visualization
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 */
import { useMemo } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import DashboardLayout from "@/components/DashboardLayout";
import { ArrowLeft, Trophy, Star, BookOpen, Clock, TrendingUp, Zap } from "lucide-react";

export default function Progress() {
  const { id } = useParams<{ id: string }>();
  const { data: childList = [] } = trpc.children.list.useQuery();
  const child = useMemo(() => childList.find((c) => c.uuid === id), [childList, id]);

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

  return (
    <DashboardLayout title={`${child.displayName}'s Progress`}>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-purple-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={<BookOpen className="w-5 h-5" />} label="Lessons Done" value="0" color="bg-purple-100 text-purple-600" />
          <StatCard icon={<Star className="w-5 h-5" />} label="Avg Quiz Score" value="—" color="bg-amber-100 text-amber-600" />
          <StatCard icon={<Zap className="w-5 h-5" />} label="Day Streak" value="0" color="bg-green-100 text-green-600" />
          <StatCard icon={<Clock className="w-5 h-5" />} label="Total Minutes" value="0" color="bg-blue-100 text-blue-600" />
        </div>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <TrendingUp className="w-5 h-5 inline mr-2 text-purple-600" />
            This Week's Activity
          </h2>
          <div className="flex items-end gap-2 h-40">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
              const height = [0, 0, 0, 0, 0, 0, 0][i];
              const isToday = i === new Date().getDay() - 1;
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(height, 5)}%` }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`w-full rounded-t-xl ${isToday ? "bg-gradient-to-t from-purple-600 to-purple-400" : "bg-gradient-to-t from-purple-200 to-purple-100"}`}
                  />
                  <span className={`text-xs font-bold ${isToday ? "text-purple-600" : "text-gray-400"}`}>{day}</span>
                </div>
              );
            })}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <Trophy className="w-5 h-5 inline mr-2 text-amber-500" />
            Recent Quiz Results
          </h2>
          <div className="text-center py-8">
            <Trophy className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm font-bold">No quizzes completed yet</p>
            <p className="text-gray-400 text-xs mt-1">Complete lessons to unlock quizzes!</p>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Achievements
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {ACHIEVEMENTS.map((ach, i) => (
              <div key={i} className="text-center p-3 rounded-xl opacity-30 grayscale">
                <div className="text-3xl mb-2">{ach.emoji}</div>
                <p className="text-xs font-bold text-gray-700">{ach.name}</p>
              </div>
            ))}
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

const ACHIEVEMENTS = [
  { emoji: "\u{1F31F}", name: "First Lesson" },
  { emoji: "\u{1F3AF}", name: "Quiz Ace" },
  { emoji: "\u{1F525}", name: "7-Day Streak" },
  { emoji: "\u{1F4DA}", name: "Bookworm" },
  { emoji: "\u{1F9EE}", name: "Math Whiz" },
  { emoji: "\u{1F52C}", name: "Scientist" },
  { emoji: "\u{1F3A8}", name: "Artist" },
  { emoji: "\u{1F30D}", name: "Explorer" },
  { emoji: "\u{1F4AA}", name: "Life Pro" },
  { emoji: "\u{1F3C6}", name: "Champion" },
];
