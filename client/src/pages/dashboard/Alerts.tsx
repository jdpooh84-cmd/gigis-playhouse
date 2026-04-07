/**
 * Alerts Page — Parent notification center
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Bell, BellOff, Check, AlertTriangle, Star, BookOpen, Clock, Trash2, CheckCheck } from "lucide-react";
import { toast } from "sonner";

interface Alert {
  id: string;
  type: "quiz" | "milestone" | "trial" | "compliance" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const SAMPLE_ALERTS: Alert[] = [
  { id: "1", type: "quiz", title: "Quiz Completed!", message: "Mia scored 80% on the Literacy Introduction quiz. Great job!", time: "2 minutes ago", read: false },
  { id: "2", type: "milestone", title: "New Milestone Reached", message: "Mia has completed 5 lessons this week — a new personal best!", time: "1 hour ago", read: false },
  { id: "3", type: "trial", title: "Trial Reminder", message: "Your 7-day free trial ends in 3 days. Upgrade to keep learning!", time: "3 hours ago", read: false },
  { id: "4", type: "compliance", title: "Weekly Compliance Report", message: "This week: 4.5 hours across 3 domains. Download your PDF report.", time: "Yesterday", read: true },
  { id: "5", type: "system", title: "New Channels Available", message: "3 new educational YouTube channels have been added to the library.", time: "2 days ago", read: true },
];

const typeIcons: Record<Alert["type"], React.ReactNode> = {
  quiz: <BookOpen className="w-5 h-5" />,
  milestone: <Star className="w-5 h-5" />,
  trial: <Clock className="w-5 h-5" />,
  compliance: <AlertTriangle className="w-5 h-5" />,
  system: <Bell className="w-5 h-5" />,
};

const typeColors: Record<Alert["type"], string> = {
  quiz: "bg-green-100 text-green-600",
  milestone: "bg-amber-100 text-amber-600",
  trial: "bg-red-100 text-red-600",
  compliance: "bg-blue-100 text-blue-600",
  system: "bg-purple-100 text-purple-600",
};

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(SAMPLE_ALERTS);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const unreadCount = alerts.filter((a) => !a.read).length;
  const filteredAlerts = filter === "unread" ? alerts.filter((a) => !a.read) : alerts;

  const markRead = (id: string) => setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  const markAllRead = () => { setAlerts((prev) => prev.map((a) => ({ ...a, read: true }))); toast.success("All alerts marked as read"); };
  const deleteAlert = (id: string) => { setAlerts((prev) => prev.filter((a) => a.id !== id)); toast.success("Alert dismissed"); };

  return (
    <DashboardLayout title="Alerts">
      <div className="max-w-3xl mx-auto space-y-6 pb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-6 h-6 text-purple-600" />
              {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>}
            </div>
            <h2 className="text-lg font-black text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>{unreadCount} unread</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setFilter(filter === "all" ? "unread" : "all")} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${filter === "unread" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {filter === "all" ? "Show Unread" : "Show All"}
            </button>
            {unreadCount > 0 && <button onClick={markAllRead} className="px-3 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-700 hover:bg-green-200 transition-colors flex items-center gap-1"><CheckCheck className="w-3 h-3" />Mark All Read</button>}
          </div>
        </div>
        <div className="space-y-3">
          <AnimatePresence>
            {filteredAlerts.map((alert) => (
              <motion.div key={alert.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }} className={`bg-white rounded-2xl border-2 p-5 transition-all ${alert.read ? "border-gray-100 opacity-70" : "border-purple-200 shadow-sm"}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${typeColors[alert.type]}`}>{typeIcons[alert.type]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>{alert.title}</h3>
                      {!alert.read && <span className="w-2 h-2 bg-purple-500 rounded-full shrink-0" />}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "'Lexend', sans-serif" }}>{alert.message}</p>
                    <p className="text-gray-400 text-xs mt-2">{alert.time}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {!alert.read && <button onClick={() => markRead(alert.id)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-green-600 transition-colors" title="Mark as read"><Check className="w-4 h-4" /></button>}
                    <button onClick={() => deleteAlert(alert.id)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors" title="Dismiss"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredAlerts.length === 0 && (
            <div className="text-center py-16">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-400" style={{ fontFamily: "'Nunito', sans-serif" }}>{filter === "unread" ? "No unread alerts" : "No alerts yet"}</h3>
              <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: "'Lexend', sans-serif" }}>{filter === "unread" ? "You're all caught up!" : "Alerts will appear here as your children learn."}</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
