/**
 * AdminSponsors — /admin/sponsors — Sponsor management with tier-based system
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pause, Play, Eye, Download, Building2, Check, X,
  ChevronLeft, ChevronRight, Heart, Star, Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type SponsorStatus = "pending_review" | "active" | "paused" | "expired" | "rejected";

const STATUS_COLORS: Record<SponsorStatus, string> = {
  pending_review: "bg-yellow-100 text-yellow-700",
  active: "bg-green-100 text-green-700",
  paused: "bg-gray-100 text-gray-600",
  expired: "bg-red-100 text-red-600",
  rejected: "bg-red-100 text-red-600",
};

const TIER_INFO: Record<string, { label: string; icon: typeof Heart; color: string; price: string }> = {
  "TIER-FRIEND": { label: "Friend", icon: Heart, color: "text-amber-600", price: "$49/mo" },
  "TIER-SUPPORTER": { label: "Supporter", icon: Star, color: "text-blue-600", price: "$149/mo" },
  "TIER-CHAMPION": { label: "Champion", icon: Award, color: "text-purple-600", price: "$399/mo" },
};

export default function AdminSponsors() {
  const { data: sponsors = [] } = trpc.admin.listSponsors.useQuery();
  const updateSponsor = trpc.admin.updateSponsor.useMutation();
  const approveSponsor = trpc.admin.approveSponsor.useMutation();
  const rejectSponsor = trpc.admin.rejectSponsor.useMutation();
  const pauseSponsor = trpc.admin.pauseSponsor.useMutation();
  const utils = trpc.useUtils();
  const [selectedSponsor, setSelectedSponsor] = useState<any>(null);
  const [page, setPage] = useState(1);
  const perPage = 50;

  const paged = sponsors.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.max(1, Math.ceil(sponsors.length / perPage));

  const pendingCount = sponsors.filter((s) => s.status === "pending_review").length;
  const activeCount = sponsors.filter((s) => s.status === "active").length;

  // Revenue estimate based on active sponsors
  const monthlyRevenue = sponsors
    .filter((s) => s.status === "active")
    .reduce((sum, s) => {
      const prices: Record<string, number> = { "TIER-FRIEND": 49, "TIER-SUPPORTER": 149, "TIER-CHAMPION": 399 };
      return sum + (prices[s.tierId] || 0);
    }, 0);

  const handleApprove = async (id: number) => {
    try {
      await approveSponsor.mutateAsync({ id });
      await utils.admin.listSponsors.invalidate();
      toast.success("Sponsor approved and activated");
    } catch (err: any) {
      toast.error(err.message || "Failed to approve sponsor");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectSponsor.mutateAsync({ id });
      await utils.admin.listSponsors.invalidate();
      toast.success("Sponsor rejected");
    } catch (err: any) {
      toast.error(err.message || "Failed to reject sponsor");
    }
  };

  const handlePause = async (id: number) => {
    try {
      await pauseSponsor.mutateAsync({ id });
      await utils.admin.listSponsors.invalidate();
      toast.success("Sponsor paused");
    } catch (err: any) {
      toast.error(err.message || "Failed to pause sponsor");
    }
  };

  const handleResume = async (id: number) => {
    try {
      await updateSponsor.mutateAsync({ id, status: "active" });
      await utils.admin.listSponsors.invalidate();
      toast.success("Sponsor resumed");
    } catch (err: any) {
      toast.error(err.message || "Failed to resume sponsor");
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
              {sponsors.length} sponsors — {activeCount} active
              {pendingCount > 0 && <span className="text-yellow-600 font-medium ml-2">({pendingCount} pending review)</span>}
            </p>
          </div>
          <Button onClick={() => toast.info("CSV export coming soon")} variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>

        {/* Revenue Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(["TIER-FRIEND", "TIER-SUPPORTER", "TIER-CHAMPION"] as const).map((tierId) => {
            const info = TIER_INFO[tierId];
            const TierIcon = info.icon;
            const count = sponsors.filter((s) => s.tierId === tierId && s.status === "active").length;
            return (
              <Card key={tierId} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center ${info.color}`}>
                      <TierIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{info.label} Tier</p>
                      <p className="text-lg font-bold text-gray-900">{count} <span className="text-sm font-normal text-gray-500">active</span></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-sm text-gray-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          Estimated monthly sponsor revenue: <span className="font-bold text-green-700">${monthlyRevenue.toLocaleString()}/mo</span>
        </div>

        {sponsors.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-16 text-center">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-bold">No sponsors yet</p>
              <p className="text-gray-400 text-sm mt-1">Sponsors will appear here once they sign up</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Company</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Tier</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Impressions</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Clicks</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((sponsor, i) => {
                    const tierInfo = TIER_INFO[sponsor.tierId] || TIER_INFO["TIER-FRIEND"];
                    const TierIcon = tierInfo.icon;
                    return (
                      <motion.tr key={sponsor.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900">{sponsor.companyName}</p>
                          {sponsor.shortDescription && <p className="text-xs text-gray-500 line-clamp-1">{sponsor.shortDescription}</p>}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`flex items-center gap-1 text-xs font-medium ${tierInfo.color}`}>
                            <TierIcon className="w-3 h-3" /> {tierInfo.label}
                          </span>
                          {sponsor.sponsoredDomain && (
                            <span className="text-[10px] text-gray-400 block mt-0.5">Domain: {sponsor.sponsoredDomain}</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[sponsor.status as SponsorStatus] || "bg-gray-100 text-gray-600"}`}>
                            {sponsor.status === "pending_review" ? "Pending" : sponsor.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-gray-700">{sponsor.impressions.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-gray-700">{sponsor.clicks.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {sponsor.status === "pending_review" && (
                              <>
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-green-600 hover:bg-green-50" onClick={() => handleApprove(sponsor.id)} title="Approve">
                                  <Check className="w-3.5 h-3.5" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-600 hover:bg-red-50" onClick={() => handleReject(sponsor.id)} title="Reject">
                                  <X className="w-3.5 h-3.5" />
                                </Button>
                              </>
                            )}
                            {sponsor.status === "active" && (
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-amber-600 hover:bg-amber-50" onClick={() => handlePause(sponsor.id)} title="Pause">
                                <Pause className="w-3.5 h-3.5" />
                              </Button>
                            )}
                            {sponsor.status === "paused" && (
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-green-600 hover:bg-green-50" onClick={() => handleResume(sponsor.id)} title="Resume">
                                <Play className="w-3.5 h-3.5" />
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setSelectedSponsor(sponsor)} title="View Details">
                              <Eye className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
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

        {/* Sponsor Detail Modal */}
        <AnimatePresence>
          {selectedSponsor && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSponsor(null)}>
              <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{selectedSponsor.companyName}</h3>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-gray-500">Status:</span>{" "}
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[selectedSponsor.status as SponsorStatus] || "bg-gray-100"}`}>
                        {selectedSponsor.status === "pending_review" ? "Pending" : selectedSponsor.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Tier:</span>{" "}
                      <span className="font-medium">{TIER_INFO[selectedSponsor.tierId]?.label || selectedSponsor.tierId}</span>
                    </div>
                    <div><span className="text-gray-500">Billing:</span> <span className="font-medium capitalize">{selectedSponsor.billingCycle}</span></div>
                    <div><span className="text-gray-500">Impressions:</span> <span className="font-medium">{selectedSponsor.impressions?.toLocaleString()}</span></div>
                    <div><span className="text-gray-500">Clicks:</span> <span className="font-medium">{selectedSponsor.clicks?.toLocaleString()}</span></div>
                    {selectedSponsor.sponsoredDomain && (
                      <div><span className="text-gray-500">Domain:</span> <span className="font-medium capitalize">{selectedSponsor.sponsoredDomain}</span></div>
                    )}
                  </div>
                  {selectedSponsor.contactName && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-gray-500 mb-1">Contact:</p>
                      <p className="font-medium">{selectedSponsor.contactName}</p>
                      {selectedSponsor.contactEmail && <p className="text-xs text-gray-500">{selectedSponsor.contactEmail}</p>}
                    </div>
                  )}
                  {selectedSponsor.shortDescription && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-gray-500 mb-1">Description:</p>
                      <p className="font-medium">{selectedSponsor.shortDescription}</p>
                    </div>
                  )}
                  {selectedSponsor.companyWebsite && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-gray-500 mb-1">Website:</p>
                      <a href={selectedSponsor.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">{selectedSponsor.companyWebsite}</a>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  {selectedSponsor.status === "pending_review" && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => { handleApprove(selectedSponsor.id); setSelectedSponsor(null); }}>Approve</Button>
                      <Button size="sm" variant="destructive" onClick={() => { handleReject(selectedSponsor.id); setSelectedSponsor(null); }}>Reject</Button>
                    </>
                  )}
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
