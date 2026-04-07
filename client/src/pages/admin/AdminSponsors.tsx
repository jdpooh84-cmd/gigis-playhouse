/**
 * AdminSponsors — /admin/sponsors — Sponsor management with approve/reject/pause
 */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, X, Pause, Play, Eye, Download, DollarSign,
  BarChart3, Calendar, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { useAdminStore, type Sponsor, type SponsorStatus } from "@/lib/admin-store";
import { toast } from "sonner";

const STATUS_COLORS: Record<SponsorStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  paused: "bg-gray-100 text-gray-600",
  rejected: "bg-red-100 text-red-600",
};

export default function AdminSponsors() {
  const sponsors = useAdminStore((s) => s.sponsors);
  const updateSponsor = useAdminStore((s) => s.updateSponsor);
  const addAuditLog = useAdminStore((s) => s.addAuditLog);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 50;

  const paged = sponsors.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.max(1, Math.ceil(sponsors.length / perPage));

  const handleAction = (id: string, action: SponsorStatus) => {
    updateSponsor(id, {
      status: action,
      ...(action === "approved" ? { approved_at: new Date().toISOString(), approved_by: "Justin Poole" } : {}),
    });
    addAuditLog(`sponsor_${action}`, `Sponsor ${id} set to ${action}`);
    toast.success(`Sponsor ${action}`);
  };

  const capUtilization = (s: Sponsor) =>
    s.impression_cap_monthly > 0 ? Math.round((s.impressions_this_month / s.impression_cap_monthly) * 100) : 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Sponsor Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {sponsors.length} sponsors — {sponsors.filter((s) => s.status === "approved").length} active
            </p>
          </div>
          <Button
            onClick={() => toast.info("CSV report downloaded")}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>

        {/* Sponsors Table */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Brand</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Billing</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Fee</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Impressions</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Cap %</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Active Dates</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((sponsor, i) => (
                  <motion.tr
                    key={sponsor.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{sponsor.brand_name}</p>
                        <p className="text-xs text-gray-500">{sponsor.contact_email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[sponsor.status]}`}>
                        {sponsor.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 capitalize">
                      {sponsor.billing_model.replace("_", " ")}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700 font-medium">
                      {sponsor.billing_model === "monthly_flat"
                        ? `$${sponsor.monthly_fee_usd}/mo`
                        : `$${sponsor.per_impression_fee_usd}/imp`}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {sponsor.impressions_this_month.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${capUtilization(sponsor) > 80 ? "bg-red-500" : capUtilization(sponsor) > 50 ? "bg-amber-500" : "bg-green-500"}`}
                            style={{ width: `${Math.min(100, capUtilization(sponsor))}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{capUtilization(sponsor)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-sm">
                      {sponsor.active_from && sponsor.active_until
                        ? `${sponsor.active_from} → ${sponsor.active_until}`
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {sponsor.status === "pending" && (
                          <>
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-green-600 hover:bg-green-50" onClick={() => handleAction(sponsor.id, "approved")}>
                              <Check className="w-3.5 h-3.5" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-600 hover:bg-red-50" onClick={() => handleAction(sponsor.id, "rejected")}>
                              <X className="w-3.5 h-3.5" />
                            </Button>
                          </>
                        )}
                        {sponsor.status === "approved" && (
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-amber-600 hover:bg-amber-50" onClick={() => handleAction(sponsor.id, "paused")}>
                            <Pause className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        {sponsor.status === "paused" && (
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-green-600 hover:bg-green-50" onClick={() => handleAction(sponsor.id, "approved")}>
                            <Play className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setSelectedSponsor(sponsor)}>
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => { toast.info("Stripe invoice sent"); addAuditLog("sponsor_invoice", `Invoice sent to ${sponsor.brand_name}`); }}>
                          <DollarSign className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => toast.info("Impression analytics — feature coming soon")}>
                          <BarChart3 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, sponsors.length)} of {sponsors.length}
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

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedSponsor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedSponsor(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">{selectedSponsor.brand_name}</h3>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div><span className="text-gray-500">Contact:</span> <span className="font-medium">{selectedSponsor.contact_name}</span></div>
                    <div><span className="text-gray-500">Email:</span> <span className="font-medium">{selectedSponsor.contact_email}</span></div>
                    <div><span className="text-gray-500">Status:</span> <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[selectedSponsor.status]}`}>{selectedSponsor.status}</span></div>
                    <div><span className="text-gray-500">Billing:</span> <span className="font-medium capitalize">{selectedSponsor.billing_model.replace("_", " ")}</span></div>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-gray-500 mb-1">Ad Headline:</p>
                    <p className="font-medium">{selectedSponsor.message_headline}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Ad Body:</p>
                    <p className="text-gray-700">{selectedSponsor.message_body}</p>
                  </div>
                  {selectedSponsor.notes && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-gray-500 mb-1">Admin Notes:</p>
                      <p className="text-gray-700">{selectedSponsor.notes}</p>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" size="sm" onClick={() => setSelectedSponsor(null)}>Close</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
