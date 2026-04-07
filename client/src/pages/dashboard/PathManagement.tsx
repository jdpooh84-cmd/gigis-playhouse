/**
 * Path Management — Enroll, pause, resume, drop learning paths
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 */
import { useMemo } from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import type { DomainId } from "@/lib/types";
import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, Play, Pause, Trash2, Plus, ArrowLeft, Calculator, Microscope, Palette, Globe, Heart } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

const DOMAIN_ICONS: Record<string, React.ReactNode> = {
  literacy: <BookOpen className="w-6 h-6" />,
  math: <Calculator className="w-6 h-6" />,
  science: <Microscope className="w-6 h-6" />,
  creative_arts: <Palette className="w-6 h-6" />,
  social_studies: <Globe className="w-6 h-6" />,
  life_skills: <Heart className="w-6 h-6" />,
};

const DOMAIN_COLORS: Record<string, string> = {
  literacy: "bg-purple-100 text-purple-600 border-purple-200",
  math: "bg-blue-100 text-blue-600 border-blue-200",
  science: "bg-green-100 text-green-600 border-green-200",
  creative_arts: "bg-pink-100 text-pink-600 border-pink-200",
  social_studies: "bg-amber-100 text-amber-600 border-amber-200",
  life_skills: "bg-red-100 text-red-600 border-red-200",
};

const ALL_PATHS = [
  { id: "literacy" as DomainId, domain: "literacy" as DomainId, name: "Literacy", description: "Reading, writing, phonics, and comprehension", lessons: 90 },
  { id: "math" as DomainId, domain: "math" as DomainId, name: "Math", description: "Numbers, counting, addition, subtraction, and patterns", lessons: 90 },
  { id: "science" as DomainId, domain: "science" as DomainId, name: "Science", description: "Nature, animals, weather, and simple experiments", lessons: 90 },
  { id: "creative_arts" as DomainId, domain: "creative_arts" as DomainId, name: "Creative Arts", description: "Drawing, music, crafts, and creative expression", lessons: 90 },
  { id: "social_studies" as DomainId, domain: "social_studies" as DomainId, name: "Social Studies", description: "Community, geography, history, and cultures", lessons: 90 },
  { id: "life_skills" as DomainId, domain: "life_skills" as DomainId, name: "Life Skills", description: "Safety, hygiene, emotions, and daily routines", lessons: 90 },
];

export default function PathManagement() {
  const { childId } = useParams<{ childId: string }>();
  const { data: childList = [] } = trpc.children.list.useQuery();
  const child = useMemo(() => childList.find((c) => c.uuid === childId), [childList, childId]);

  if (!child) {
    return (
      <DashboardLayout title="Path Management">
        <div className="text-center py-20">
          <p className="text-gray-400">Child not found</p>
          <Link to="/dashboard" className="text-purple-600 font-bold text-sm mt-2 inline-block">Back to Dashboard</Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleEnroll = (pathId: string) => {
    toast.info(`Enrollment for ${ALL_PATHS.find((p) => p.id === pathId)?.name} coming soon!`);
  };

  const handleAction = (action: string, pathName: string) => {
    toast.info(`${pathName} ${action} — feature coming soon`);
  };

  return (
    <DashboardLayout title={`${child.displayName}'s Learning Paths`}>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-purple-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* Available Paths */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Available Paths
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {ALL_PATHS.map((path) => {
              const colors = DOMAIN_COLORS[path.domain] || "bg-gray-100 text-gray-600 border-gray-200";
              return (
                <motion.div key={path.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border-2 border-gray-100 p-5 hover:opacity-100 transition-opacity">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.split(" ").slice(0, 2).join(" ")}`}>
                      {DOMAIN_ICONS[path.domain] || <BookOpen className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>{path.name}</h3>
                      <p className="text-gray-500 text-xs mt-1">{path.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{path.lessons} lessons</p>
                    </div>
                  </div>
                  <button onClick={() => handleEnroll(path.id)}
                    className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 transition-colors w-full justify-center">
                    <Plus className="w-3 h-3" />Enroll
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
