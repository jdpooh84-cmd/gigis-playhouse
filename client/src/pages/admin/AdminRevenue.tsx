/**
 * AdminRevenue — /admin/revenue — Revenue overview with placeholder data
 */
import { motion } from "framer-motion";
import {
  DollarSign, TrendingUp, Download, CreditCard, Megaphone, Handshake,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { toast } from "sonner";

export default function AdminRevenue() {
  const subMRR = 0;
  const sponsorRev = 0;
  const affiliateRev = 0;
  const totalMonthly = subMRR + sponsorRev + affiliateRev;

  const streams = [
    {
      title: "Subscriptions",
      subtitle: "Primary revenue stream",
      icon: CreditCard,
      color: "bg-green-500",
      metrics: [
        { label: "MRR", value: "$0" },
        { label: "ARR", value: "$0" },
        { label: "Active Subscribers", value: "0" },
      ],
    },
    {
      title: "Sponsorships",
      subtitle: "Curated brand cards in YouTube Hub",
      icon: Megaphone,
      color: "bg-indigo-500",
      metrics: [
        { label: "Active Sponsors", value: "0" },
        { label: "Revenue This Month", value: "$0" },
      ],
    },
    {
      title: "Affiliates",
      subtitle: "Passive referral revenue",
      icon: Handshake,
      color: "bg-teal-500",
      metrics: [
        { label: "Active Partners", value: "0" },
        { label: "Revenue This Month", value: "$0" },
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
          <Button onClick={() => toast.info("Export coming soon")} variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <CardContent className="p-5">
              <p className="text-sm text-gray-300">Total Monthly Revenue</p>
              <p className="text-3xl font-bold mt-1">${totalMonthly.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                <TrendingUp className="w-3 h-3" /> Stripe integration pending
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm text-gray-500">YTD Revenue</p>
              <p className="text-2xl font-bold mt-1 text-gray-900">$0</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm text-gray-500">Revenue Projection</p>
              <p className="text-2xl font-bold mt-1 text-gray-900">$0</p>
              <p className="text-xs text-gray-400 mt-2">Annual run rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {streams.map((stream, i) => (
            <motion.div key={stream.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
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
