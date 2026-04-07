/**
 * Channel Management — Parent controls for YouTube channels
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 */
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import DashboardLayout from "@/components/DashboardLayout";
import { Youtube, Search, Eye, EyeOff, ExternalLink, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ChannelManagement() {
  const { data: channels = [] } = trpc.channels.list.useQuery();
  const addChannel = trpc.channels.add.useMutation();
  const removeChannel = trpc.channels.remove.useMutation();
  const utils = trpc.useUtils();
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newChannelId, setNewChannelId] = useState("");
  const [newNickname, setNewNickname] = useState("");

  const filtered = useMemo(() => {
    if (!search) return channels;
    const q = search.toLowerCase();
    return channels.filter((c) => c.nickname.toLowerCase().includes(q) || c.ageTag.toLowerCase().includes(q));
  }, [channels, search]);

  const handleAdd = async () => {
    if (!newChannelId || !newNickname) { toast.error("Please fill in all fields"); return; }
    try {
      await addChannel.mutateAsync({ youtubeChannelId: newChannelId, nickname: newNickname });
      await utils.channels.list.invalidate();
      setNewChannelId(""); setNewNickname(""); setShowAdd(false);
      toast.success("Channel added!");
    } catch (err: any) {
      toast.error(err.message || "Failed to add channel");
    }
  };

  const handleRemove = async (id: number) => {
    try {
      await removeChannel.mutateAsync({ id });
      await utils.channels.list.invalidate();
      toast.success("Channel removed");
    } catch (err: any) {
      toast.error(err.message || "Failed to remove channel");
    }
  };

  return (
    <DashboardLayout title="Channel Management">
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-black text-green-600" style={{ fontFamily: "'Nunito', sans-serif" }}>{channels.length}</p>
            <p className="text-xs text-gray-500 font-medium">Approved Channels</p>
          </div>
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-4 text-center">
            <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 mx-auto text-purple-600 font-bold text-sm hover:underline">
              <Plus className="w-4 h-4" /> Add Channel
            </button>
          </div>
        </div>

        {/* Add Channel Form */}
        {showAdd && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border-2 border-purple-200 p-5 space-y-4">
            <h3 className="font-bold text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>Add YouTube Channel</h3>
            <input value={newChannelId} onChange={e => setNewChannelId(e.target.value)} placeholder="YouTube Channel ID" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-purple-500 focus:outline-none" />
            <input value={newNickname} onChange={e => setNewNickname(e.target.value)} placeholder="Nickname (e.g. Sesame Street)" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-purple-500 focus:outline-none" />
            <div className="flex gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-2 rounded-xl text-xs font-bold bg-gray-100 text-gray-600 hover:bg-gray-200">Cancel</button>
              <button onClick={handleAdd} disabled={addChannel.isPending} className="flex-1 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700">{addChannel.isPending ? 'Adding...' : 'Add Channel'}</button>
            </div>
          </motion.div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search channels..." className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-purple-500 focus:ring-0 transition-colors" />
        </div>

        {/* Channel List */}
        <div className="space-y-3">
          {filtered.map((channel) => (
            <motion.div key={channel.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border-2 border-green-200 p-4 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                  <Youtube className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm truncate" style={{ fontFamily: "'Nunito', sans-serif" }}>{channel.emoji} {channel.nickname}</h3>
                  <p className="text-gray-500 text-xs">{channel.ageTag}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a href={`https://youtube.com/channel/${channel.youtubeChannelId}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button onClick={() => handleRemove(channel.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                    <Trash2 className="w-3 h-3" />Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Youtube className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 font-bold">{search ? "No channels match your search" : "No channels added yet"}</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
