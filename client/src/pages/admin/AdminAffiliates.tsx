/**
 * AdminAffiliates — /admin/affiliates — Affiliate partner management
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, ExternalLink, Pause, Play, Edit, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { useAdminStore, type AffiliatePartner, type AffiliateStatus } from "@/lib/admin-store";
import { toast } from "sonner";

const STATUS_COLORS: Record<AffiliateStatus, string> = {
  active: "bg-green-100 text-green-700",
  paused: "bg-gray-100 text-gray-600",
  pending: "bg-amber-100 text-amber-700",
};

export default function AdminAffiliates() {
  const affiliates = useAdminStore((s) => s.affiliates);
  const updateAffiliate = useAdminStore((s) => s.updateAffiliate);
  const addAuditLog = useAdminStore((s) => s.addAuditLog);
  const [showAdd, setShowAdd] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 50;

  const paged = affiliates.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.max(1, Math.ceil(affiliates.length / perPage));

  const toggleStatus = (af: AffiliatePartner) => {
    const newStatus: AffiliateStatus = af.status === "active" ? "paused" : "active";
    updateAffiliate(af.id, { status: newStatus });
    addAuditLog(`affiliate_${newStatus}`, `Affiliate ${af.partner_name} set to ${newStatus}`);
    toast.success(`${af.partner_name} ${newStatus}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Affiliate Partners
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {affiliates.length} partners — {affiliates.filter((a) => a.status === "active").length} active
            </p>
          </div>
          <Button onClick={() => setShowAdd(true)} size="sm" className="gap-2 bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4" /> Add Partner
          </Button>
        </div>

        {/* Table */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Partner</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Commission</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Clicks</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Conversions</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Revenue</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((af, i) => (
                  <motion.tr
                    key={af.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{af.partner_name}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[200px]">{af.partner_url}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{af.category}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {af.commission_type === "revenue_share" ? `${af.commission_value}%` :
                       af.commission_type === "cpa" ? `$${af.commission_value}/conv` :
                       `$${af.commission_value}/mo`}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700 font-medium">{af.clicks_total.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{af.conversions_total}</td>
                    <td className="px-4 py-3 text-right text-gray-700 font-medium">${af.revenue_earned_usd.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[af.status]}`}>
                        {af.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => toggleStatus(af)}>
                          {af.status === "active" ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-green-500" />}
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => toast.info("Edit affiliate — feature coming soon")}>
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <a href={af.partner_url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Button>
                        </a>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, affiliates.length)} of {affiliates.length}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
              <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Add Partner Modal */}
        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
              onClick={() => setShowAdd(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Add Affiliate Partner</h3>
                <p className="text-sm text-gray-500 mb-4">This feature requires a backend upgrade to persist data. Coming soon.</p>
                <Button variant="outline" onClick={() => setShowAdd(false)}>Close</Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
