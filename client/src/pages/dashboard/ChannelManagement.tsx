/**
 * Channel Management — Parent controls for YouTube channels
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 */
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import type { ApprovedChannel } from "@/lib/types";
import DashboardLayout from "@/components/DashboardLayout";
import { Youtube, Search, Check, X, Eye, EyeOff, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function ChannelManagement() {
  const channels = useStore((s) => s.approvedChannels);
  const [search, setSearch] = useState("");
  const [showApproved, setShowApproved] = useState<"all" | "approved" | "blocked">("all");

  // Track which channels are approved (all approved by default in demo)
  const [approvedIds, setApprovedIds] = useState<Set<string>>(() => new Set(channels.map((c: ApprovedChannel) => c.id)));

  const filtered = useMemo(() => {
    let list = channels;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c: ApprovedChannel) => c.nickname.toLowerCase().includes(q) || c.age_tag.toLowerCase().includes(q));
    }
    if (showApproved === "approved") list = list.filter((c: ApprovedChannel) => approvedIds.has(c.id));
    if (showApproved === "blocked") list = list.filter((c: ApprovedChannel) => !approvedIds.has(c.id));
    return list;
  }, [channels, search, showApproved, approvedIds]);

  const toggleChannel = (id: string) => {
    setApprovedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); toast.success("Channel blocked"); }
      else { next.add(id); toast.success("Channel approved"); }
      return next;
    });
  };

  const categories = useMemo(() => {
    const cats = new Set<string>();
    channels.forEach((c: ApprovedChannel) => cats.add(c.age_tag));
    return Array.from(cats);
  }, [channels]);

  return (
    <DashboardLayout title="Channel Management">
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-black text-green-600" style={{ fontFamily: "'Nunito', sans-serif" }}>{approvedIds.size}</p>
            <p className="text-xs text-gray-500 font-medium">Approved</p>
          </div>
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-black text-red-500" style={{ fontFamily: "'Nunito', sans-serif" }}>{channels.length - approvedIds.size}</p>
            <p className="text-xs text-gray-500 font-medium">Blocked</p>
          </div>
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-black text-purple-600" style={{ fontFamily: "'Nunito', sans-serif" }}>{categories.length}</p>
            <p className="text-xs text-gray-500 font-medium">Categories</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search channels..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-purple-500 focus:ring-0 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "approved", "blocked"] as const).map((f) => (
              <button key={f} onClick={() => setShowApproved(f)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors ${showApproved === f ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Channel List */}
        <div className="space-y-3">
          {filtered.map((channel) => {
            const isApproved = approvedIds.has(channel.id);
            return (
              <motion.div key={channel.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`bg-white rounded-2xl border-2 p-4 transition-all ${isApproved ? "border-green-200" : "border-red-200 opacity-60"}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                    <Youtube className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate" style={{ fontFamily: "'Nunito', sans-serif" }}>{channel.emoji} {channel.nickname}</h3>
                    <p className="text-gray-500 text-xs">{channel.age_tag} · {channel.is_preloaded ? "Pre-loaded" : "Custom"}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a href={`https://youtube.com/channel/${channel.youtube_channel_id}`} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button onClick={() => toggleChannel(channel.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${isApproved ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-red-100 text-red-600 hover:bg-red-200"}`}>
                      {isApproved ? <><Eye className="w-3 h-3" />Approved</> : <><EyeOff className="w-3 h-3" />Blocked</>}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Youtube className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 font-bold">No channels match your search</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
