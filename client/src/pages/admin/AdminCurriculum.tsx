/**
 * AdminCurriculum — /admin/curriculum — Learning content management overview
 */
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/AdminLayout";

const DOMAINS = [
  { domain: "literacy", color: "bg-blue-500", count: 90 },
  { domain: "math", color: "bg-green-500", count: 90 },
  { domain: "science", color: "bg-purple-500", count: 90 },
  { domain: "social_studies", color: "bg-amber-500", count: 90 },
  { domain: "creative_arts", color: "bg-pink-500", count: 90 },
  { domain: "life_skills", color: "bg-teal-500", count: 90 },
];

export default function AdminCurriculum() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Learning Content Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">540 lessons across 6 domains (The Poole Method)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DOMAINS.map((stat, i) => (
            <motion.div key={stat.domain} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                    <h3 className="font-semibold text-gray-900 capitalize">{stat.domain.replace("_", " ")}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Lessons</p>
                      <p className="font-bold text-lg text-gray-900">{stat.count}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Target</p>
                      <p className="font-bold text-lg text-gray-900">90</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${stat.color}`} style={{ width: "100%" }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">100% complete</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="py-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-bold">Learning content is managed via The Poole Method</p>
            <p className="text-gray-400 text-sm mt-1">540 lessons across 6 domains, 3 grade bands, 3 difficulty levels</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
