/**
 * AdminRevenue — /admin/revenue — Three revenue streams combined view
 */
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  DollarSign, TrendingUp, Download, CreditCard, Megaphone, Handshake,
  PieChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { useAdminStore } from "@/lib/admin-store";
import { toast } from "sonner";

export default function AdminRevenue() {
  const sponsors = useAdminStore((s) => s.sponsors);
  const affiliates = useAdminStore((s) => s.affiliates);

  const subMRR = 3418;
  const subARR = subMRR * 12;
  const sponsorRev = useMemo(
    () => sponsors.filter((sp) => sp.status === "approved").reduce((sum, sp) => sum + sp.monthly_fee_usd, 0),
    [sponsors]
  );
  const affiliateRev = useMemo(
    () => affiliates.reduce((sum, a) => sum + a.revenue_earned_usd, 0),
    [affiliates]
  );
  const totalMonthly = subMRR + sponsorRev + affiliateRev;

  const streams = [
    {
      title: "Subscriptions",
      subtitle: "Primary revenue stream",
      icon: CreditCard,
      color: "bg-green-500",
      metrics: [
        { label: "MRR", value: `$${subMRR.toLocaleString()}` },
        { label: "ARR", value: `$${subARR.toLocaleString()}` },
        { label: "Gold Monthly", value: "142 subs" },
        { label: "Gold Annual", value: "156 subs" },
        { label: "Family", value: "44 subs" },
        { label: "New This Month", value: "+28" },
        { label: "Churned This Month", value: "-8" },
        { label: "Net Change", value: "+$198" },
      ],
    },
    {
      title: "Sponsorships",
      subtitle: "Curated brand cards in YouTube Hub",
      icon: Megaphone,
      color: "bg-indigo-500",
      metrics: [
        { label: "Active Sponsors", value: String(sponsors.filter((s) => s.status === "approved").length) },
        { label: "Impressions MTD", value: sponsors.reduce((sum, s) => sum + s.impressions_this_month, 0).toLocaleString() },
        { label: "Revenue This Month", value: `$${sponsorRev}` },
        { label: "Pending Applications", value: String(sponsors.filter((s) => s.status === "pending").length) },
        { label: "Invoices Outstanding", value: "0" },
        { label: "Avg Cap Utilization", value: "32%" },
      ],
    },
    {
      title: "Affiliates",
      subtitle: "Passive referral revenue",
      icon: Handshake,
      color: "bg-teal-500",
      metrics: [
        { label: "Active Partners", value: String(affiliates.filter((a) => a.status === "active").length) },
        { label: "Clicks This Month", value: affiliates.reduce((sum, a) => sum + a.clicks_total, 0).toLocaleString() },
        { label: "Conversions This Month", value: String(affiliates.reduce((sum, a) => sum + a.conversions_total, 0)) },
        { label: "Revenue This Month", value: `$${affiliateRev.toFixed(2)}` },
        { label: "Top Partner", value: affiliates.length > 0 ? affiliates.sort((a, b) => b.revenue_earned_usd - a.revenue_earned_usd)[0]?.partner_name : "—" },
      ],
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Revenue Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">Combined view of all revenue streams</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => toast.info("CSV exported")} variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
            <Button onClick={() => toast.info("PDF exported")} variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" /> Export PDF
            </Button>
          </div>
        </div>

        {/* Combined Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <CardContent className="p-5">
              <p className="text-sm text-gray-300">Total Monthly Revenue</p>
              <p className="text-3xl font-bold mt-1">${totalMonthly.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
                <TrendingUp className="w-3 h-3" /> +20% vs last month
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm text-gray-500">YTD Revenue</p>
              <p className="text-2xl font-bold mt-1 text-gray-900">${(totalMonthly * 4).toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-2">4 months of operation</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm text-gray-500">Revenue by Stream</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Subscriptions</span>
                  <span className="font-medium">{Math.round((subMRR / totalMonthly) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className="bg-green-500 h-full" style={{ width: `${(subMRR / totalMonthly) * 100}%` }} />
                  <div className="bg-indigo-500 h-full" style={{ width: `${(sponsorRev / totalMonthly) * 100}%` }} />
                  <div className="bg-teal-500 h-full" style={{ width: `${(affiliateRev / totalMonthly) * 100}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm text-gray-500">Revenue Projection</p>
              <p className="text-2xl font-bold mt-1 text-gray-900">${(totalMonthly * 12).toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-2">Annual run rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Three Streams */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {streams.map((stream, i) => (
            <motion.div
              key={stream.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-0 shadow-sm h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stream.color}`}>
                      <stream.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{stream.title}</CardTitle>
                      <p className="text-xs text-gray-500">{stream.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stream.metrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-500">{m.label}</span>
                      <span className="text-sm font-semibold text-gray-900">{m.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
