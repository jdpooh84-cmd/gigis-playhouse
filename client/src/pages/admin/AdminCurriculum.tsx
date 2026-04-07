/**
 * AdminCurriculum — /admin/curriculum — Curriculum management overview
 */
import { useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, BarChart3, AlertTriangle, Check, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/AdminLayout";
import { useStore } from "@/lib/store";

const DOMAIN_COLORS: Record<string, string> = {
  literacy: "bg-blue-500",
  math: "bg-green-500",
  science: "bg-purple-500",
  social_studies: "bg-amber-500",
  arts: "bg-pink-500",
  life_skills: "bg-teal-500",
};

export default function AdminCurriculum() {
  const lessons = useStore((s) => s.lessons);

  const domainStats = useMemo(() => {
    const stats: Record<string, { total: number; domain: string }> = {};
    lessons.forEach((l) => {
      if (!stats[l.domain]) stats[l.domain] = { total: 0, domain: l.domain };
      stats[l.domain].total++;
    });
    return Object.values(stats);
  }, [lessons]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Curriculum Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">{lessons.length} lessons across {domainStats.length} domains</p>
        </div>

        {/* Domain Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {domainStats.map((stat, i) => (
            <motion.div
              key={stat.domain}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-3 h-3 rounded-full ${DOMAIN_COLORS[stat.domain] || "bg-gray-400"}`} />
                    <h3 className="font-semibold text-gray-900 capitalize">{stat.domain.replace("_", " ")}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Lessons</p>
                      <p className="font-bold text-lg text-gray-900">{stat.total}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Target</p>
                      <p className="font-bold text-lg text-gray-900">90</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${DOMAIN_COLORS[stat.domain] || "bg-gray-400"}`}
                        style={{ width: `${Math.min(100, (stat.total / 90) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{Math.round((stat.total / 90) * 100)}% complete</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Lessons Table */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">All Lessons</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Lesson</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Domain</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Grade</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Difficulty</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Duration</th>
                </tr>
              </thead>
              <tbody>
                {lessons.slice(0, 20).map((lesson, i) => (
                  <motion.tr
                    key={lesson.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{lesson.title}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[300px]">{lesson.theme}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${DOMAIN_COLORS[lesson.domain] || "bg-gray-400"}`} />
                        <span className="text-gray-600 capitalize">{lesson.domain.replace("_", " ")}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{lesson.grade_band}</td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{lesson.difficulty}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{lesson.episode.duration_minutes} min</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
