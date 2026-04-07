/**
 * AdminDashboard — /admin home with 5 metric rows + activity feed
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
import { useStore } from "@/lib/store";
import { useAdminStore } from "@/lib/admin-store";

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
  const children = useStore((s) => s.children);
  const sponsors = useAdminStore((s) => s.sponsors);
  const affiliates = useAdminStore((s) => s.affiliates);
  const alerts = useAdminStore((s) => s.alerts);

  const unreadAlerts = useMemo(() => alerts.filter((a) => !a.is_read && !a.is_archived).length, [alerts]);
  const activeSponsors = useMemo(() => sponsors.filter((s) => s.status === "approved").length, [sponsors]);
  const activeAffiliates = useMemo(() => affiliates.filter((a) => a.status === "active").length, [affiliates]);
  const totalImpressions = useMemo(() => sponsors.reduce((sum, s) => sum + s.impressions_this_month, 0), [sponsors]);
  const sponsorRevenue = useMemo(
    () => sponsors.filter((sp) => sp.status === "approved").reduce((sum, sp) => sum + sp.monthly_fee_usd, 0),
    [sponsors]
  );
  const affiliateRevenue = useMemo(() => affiliates.reduce((sum, a) => sum + a.revenue_earned_usd, 0), [affiliates]);

  const activityFeed = useMemo(() => {
    const items = [
      { type: "signup", text: "New user signed up: parent@example.com", time: "2 min ago", icon: UserPlus, color: "text-green-500" },
      { type: "trial", text: "Trial started for newuser@test.com", time: "15 min ago", icon: Clock, color: "text-blue-500" },
      { type: "upgrade", text: "jane@family.com upgraded to Gold Annual", time: "1 hour ago", icon: CreditCard, color: "text-purple-500" },
      { type: "sponsor", text: "MathBuddies submitted sponsor application", time: "3 hours ago", icon: AlertTriangle, color: "text-amber-500" },
      { type: "payment", text: "Payment received: $9.99 from mike@home.com", time: "5 hours ago", icon: DollarSign, color: "text-green-500" },
    ];
    return items;
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">Overview of Gigi's Playhouse platform metrics</p>
        </div>

        {/* ROW 1: User Metrics */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">User Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Total Users" value="1,247" change={12} icon={Users} color="bg-blue-500" />
            <MetricCard title="Active Trials" value="89" change={-5} changeLabel="this week" icon={Clock} color="bg-amber-500" />
            <MetricCard title="Paid Subscribers" value="342" change={8} icon={CreditCard} color="bg-green-500" />
            <MetricCard title="Child Profiles" value={String(children.length || 486)} change={15} icon={Users} color="bg-purple-500" />
          </div>
        </div>

        {/* ROW 2: Revenue Metrics */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Revenue</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="MRR (Subscriptions)" value="$3,418" change={22} icon={DollarSign} color="bg-green-600" />
            <MetricCard title="Sponsor Revenue" value={`$${sponsorRevenue}`} change={0} icon={TrendingUp} color="bg-indigo-500" />
            <MetricCard title="Affiliate Revenue" value={`$${affiliateRevenue.toFixed(0)}`} change={18} icon={TrendingUp} color="bg-teal-500" />
            <MetricCard title="Total Revenue" value={`$${(3418 + sponsorRevenue + affiliateRevenue).toFixed(0)}`} change={20} icon={DollarSign} color="bg-gray-800" />
          </div>
        </div>

        {/* ROW 3: Sponsor Metrics */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sponsors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Active Sponsors" value={String(activeSponsors)} icon={Users} color="bg-indigo-500" />
            <MetricCard title="Pending Applications" value={String(sponsors.filter((s) => s.status === "pending").length)} icon={Bell} color="bg-amber-500" />
            <MetricCard title="Impressions (MTD)" value={totalImpressions.toLocaleString()} change={5} icon={TrendingUp} color="bg-blue-500" />
            <MetricCard title="Avg View Time" value="8.2s" change={12} icon={Clock} color="bg-green-500" />
          </div>
        </div>

        {/* ROW 4: Curriculum Metrics */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Curriculum</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Active Lessons" value="540" icon={BookOpen} color="bg-purple-500" />
            <MetricCard title="Completions Today" value="127" change={8} icon={TrendingUp} color="bg-green-500" />
            <MetricCard title="Avg Quiz Score" value="82%" change={3} icon={TrendingUp} color="bg-blue-500" />
            <MetricCard title="Flashcard Reviews" value="1,893" change={15} icon={BookOpen} color="bg-amber-500" />
          </div>
        </div>

        {/* ROW 5: Activity Feed + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Feed */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activityFeed.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0"
                >
                  <item.icon className={`w-4 h-4 ${item.color} shrink-0`} />
                  <p className="text-sm text-gray-700 flex-1">{item.text}</p>
                  <span className="text-xs text-gray-400 shrink-0">{item.time}</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts Summary */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">System Alerts</CardTitle>
                {unreadAlerts > 0 && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                    {unreadAlerts} unread
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts
                .filter((a) => !a.is_archived)
                .slice(0, 5)
                .map((alert, i) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-start gap-3 py-2 border-b border-gray-100 last:border-0 ${
                      !alert.is_read ? "bg-amber-50/50 -mx-2 px-2 rounded-lg" : ""
                    }`}
                  >
                    <Bell className={`w-4 h-4 mt-0.5 shrink-0 ${!alert.is_read ? "text-amber-500" : "text-gray-400"}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!alert.is_read ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                        {alert.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{alert.description}</p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">
                      {new Date(alert.created_at).toLocaleDateString()}
                    </span>
                  </motion.div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
