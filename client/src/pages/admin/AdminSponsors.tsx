/**
 * AdminSponsors — /admin/sponsors — Sponsor management
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pause, Play, Eye, Download, Building2,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type SponsorStatus = "active" | "paused" | "expired";

const STATUS_COLORS: Record<SponsorStatus, string> = {
  active: "bg-green-100 text-green-700",
  paused: "bg-gray-100 text-gray-600",
  expired: "bg-red-100 text-red-600",
};

export default function AdminSponsors() {
  const { data: sponsors = [] } = trpc.admin.listSponsors.useQuery();
  const updateSponsor = trpc.admin.updateSponsor.useMutation();
  const utils = trpc.useUtils();
  const [selectedSponsor, setSelectedSponsor] = useState<any>(null);
  const [page, setPage] = useState(1);
  const perPage = 50;

  const paged = sponsors.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.max(1, Math.ceil(sponsors.length / perPage));

  const handleAction = async (id: number, action: SponsorStatus) => {
    try {
      await updateSponsor.mutateAsync({ id, status: action });
      await utils.admin.listSponsors.invalidate();
      toast.success(`Sponsor ${action}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to update sponsor");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Sponsor Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {sponsors.length} sponsors — {sponsors.filter((s) => s.status === "active").length} active
            </p>
          </div>
          <Button onClick={() => toast.info("CSV export coming soon")} variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>

        {sponsors.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-16 text-center">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-bold">No sponsors yet</p>
              <p className="text-gray-400 text-sm mt-1">Sponsors will appear here once added</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Company</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Impressions</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Clicks</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Budget</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((sponsor, i) => (
                    <motion.tr key={sponsor.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{sponsor.companyName}</p>
                        {sponsor.tagline && <p className="text-xs text-gray-500">{sponsor.tagline}</p>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[sponsor.status as SponsorStatus]}`}>
                          {sponsor.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">{sponsor.impressions.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{sponsor.clicks.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-gray-700 font-medium">${sponsor.monthlyBudget}/mo</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {sponsor.status === "active" && (
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-amber-600 hover:bg-amber-50" onClick={() => handleAction(sponsor.id, "paused")}>
                              <Pause className="w-3.5 h-3.5" />
                            </Button>
                          )}
                          {sponsor.status === "paused" && (
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-green-600 hover:bg-green-50" onClick={() => handleAction(sponsor.id, "active")}>
                              <Play className="w-3.5 h-3.5" />
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setSelectedSponsor(sponsor)}>
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

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
        )}

        <AnimatePresence>
          {selectedSponsor && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSponsor(null)}>
              <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{selectedSponsor.companyName}</h3>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div><span className="text-gray-500">Status:</span> <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[selectedSponsor.status as SponsorStatus]}`}>{selectedSponsor.status}</span></div>
                    <div><span className="text-gray-500">Budget:</span> <span className="font-medium">${selectedSponsor.monthlyBudget}/mo</span></div>
                    <div><span className="text-gray-500">Impressions:</span> <span className="font-medium">{selectedSponsor.impressions?.toLocaleString()}</span></div>
                    <div><span className="text-gray-500">Clicks:</span> <span className="font-medium">{selectedSponsor.clicks?.toLocaleString()}</span></div>
                  </div>
                  {selectedSponsor.tagline && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-gray-500 mb-1">Tagline:</p>
                      <p className="font-medium">{selectedSponsor.tagline}</p>
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
