/**
 * AdminDashboard — /admin home with metric rows + activity feed
 */
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users, DollarSign, TrendingUp, BookOpen, Bell,
  ArrowUpRight, ArrowDownRight, Clock, CreditCard,
  UserPlus, AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";

function MetricCard({
  title, value, change, changeLabel, icon: Icon, color,
}: {
  title: string; value: string; change?: number; changeLabel?: string;
  icon: React.ElementType; color: string;
}) {
  const isPositive = (change ?? 0) >= 0;
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-2xl font-bold mt-1 text-gray-900">{value}</p>
            {change !== undefined && (
              <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}>
                {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(change)}% {changeLabel || "vs last month"}
              </div>
            )}
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const { data: children = [] } = trpc.children.list.useQuery();

  const activityFeed = useMemo(() => [
    { type: "signup", text: "New user signed up", time: "2 min ago", icon: UserPlus, color: "text-green-500" },
    { type: "trial", text: "Trial started for new user", time: "15 min ago", icon: Clock, color: "text-blue-500" },
    { type: "upgrade", text: "User upgraded to Gold Annual", time: "1 hour ago", icon: CreditCard, color: "text-purple-500" },
    { type: "sponsor", text: "New sponsor application submitted", time: "3 hours ago", icon: AlertTriangle, color: "text-amber-500" },
    { type: "payment", text: "Payment received: $9.99", time: "5 hours ago", icon: DollarSign, color: "text-green-500" },
  ], []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">Overview of Gigi's Playhouse platform metrics</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">User Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Total Users" value="—" icon={Users} color="bg-blue-500" />
            <MetricCard title="Active Trials" value="—" icon={Clock} color="bg-amber-500" />
            <MetricCard title="Paid Subscribers" value="—" icon={CreditCard} color="bg-green-500" />
            <MetricCard title="Child Profiles" value={String(children.length)} icon={Users} color="bg-purple-500" />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Learning Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Active Lessons" value="540" icon={BookOpen} color="bg-purple-500" />
            <MetricCard title="Completions Today" value="—" icon={TrendingUp} color="bg-green-500" />
            <MetricCard title="Avg Quiz Score" value="—" icon={TrendingUp} color="bg-blue-500" />
            <MetricCard title="Flashcard Reviews" value="—" icon={BookOpen} color="bg-amber-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activityFeed.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                  <item.icon className={`w-4 h-4 ${item.color} shrink-0`} />
                  <p className="text-sm text-gray-700 flex-1">{item.text}</p>
                  <span className="text-xs text-gray-400 shrink-0">{item.time}</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Bell className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 text-sm font-bold">No alerts</p>
                <p className="text-gray-400 text-xs mt-1">System is running smoothly</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
