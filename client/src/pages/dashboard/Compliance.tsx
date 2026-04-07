/**
 * Compliance Page — Homeschool hours tracking & PDF report
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 */
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import DashboardLayout from "@/components/DashboardLayout";
import { FileText, Download, Clock, BookOpen, Calculator, Microscope, Palette, Globe, Heart } from "lucide-react";
import { toast } from "sonner";

const DOMAIN_CONFIG = [
  { key: "literacy", label: "Literacy", icon: BookOpen, color: "bg-purple-100 text-purple-600", hours: 12.5 },
  { key: "math", label: "Math", icon: Calculator, color: "bg-blue-100 text-blue-600", hours: 8.3 },
  { key: "science", label: "Science", icon: Microscope, color: "bg-green-100 text-green-600", hours: 6.1 },
  { key: "creative", label: "Creative Arts", icon: Palette, color: "bg-pink-100 text-pink-600", hours: 4.7 },
  { key: "social", label: "Social Studies", icon: Globe, color: "bg-amber-100 text-amber-600", hours: 3.2 },
  { key: "life", label: "Life Skills", icon: Heart, color: "bg-red-100 text-red-600", hours: 2.9 },
];

const WEEKLY_LOG = [
  { date: "Mon Apr 7", domains: ["Literacy", "Math"], hours: 2.1 },
  { date: "Sun Apr 6", domains: ["Science", "Creative Arts"], hours: 1.8 },
  { date: "Sat Apr 5", domains: ["Literacy"], hours: 0.9 },
  { date: "Fri Apr 4", domains: ["Math", "Social Studies"], hours: 2.4 },
  { date: "Thu Apr 3", domains: ["Literacy", "Life Skills"], hours: 1.5 },
  { date: "Wed Apr 2", domains: ["Science", "Math"], hours: 2.0 },
  { date: "Tue Apr 1", domains: ["Literacy", "Creative Arts"], hours: 1.7 },
];

export default function Compliance() {
  const children = useStore((s) => s.children);
  const totalHours = useMemo(() => DOMAIN_CONFIG.reduce((sum, d) => sum + d.hours, 0), []);

  const handleExportPDF = () => {
    toast.success("Compliance report PDF generated (demo)");
  };

  return (
    <DashboardLayout title="Compliance Log">
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryCard label="Total Hours" value={`${totalHours.toFixed(1)}h`} icon={<Clock className="w-5 h-5" />} color="bg-purple-100 text-purple-600" />
          <SummaryCard label="This Week" value="12.4h" icon={<Clock className="w-5 h-5" />} color="bg-green-100 text-green-600" />
          <SummaryCard label="Domains Active" value="6/6" icon={<BookOpen className="w-5 h-5" />} color="bg-blue-100 text-blue-600" />
          <SummaryCard label="Days Active" value="28" icon={<FileText className="w-5 h-5" />} color="bg-amber-100 text-amber-600" />
        </div>

        {/* Hours by Domain */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>Hours by Domain</h2>
            <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors">
              <Download className="w-4 h-4" />Export PDF
            </button>
          </div>
          <div className="space-y-4">
            {DOMAIN_CONFIG.map((domain) => (
              <div key={domain.key} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${domain.color}`}><domain.icon className="w-5 h-5" /></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-gray-900">{domain.label}</span>
                    <span className="text-sm font-bold text-gray-600">{domain.hours}h</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(domain.hours / totalHours) * 100}%` }} transition={{ duration: 0.8, delay: 0.2 }} className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Daily Log */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>Daily Log (This Week)</h2>
          <div className="space-y-3">
            {WEEKLY_LOG.map((entry, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{entry.date}</p>
                  <p className="text-gray-500 text-xs">{entry.domains.join(", ")}</p>
                </div>
                <span className="text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{entry.hours}h</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Data Retention Notice */}
        <div className="text-center text-xs text-gray-400 pt-4">
          <p>Compliance data retained for 24 months per COPPA policy.</p>
          <p>Dreamz In Ink LLC — The Poole Method™</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SummaryCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>{icon}</div>
      <p className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>{value}</p>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
    </motion.div>
  );
}
