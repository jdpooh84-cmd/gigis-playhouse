import { useParams, Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { motion } from 'framer-motion';
import { ArrowLeft, Tv } from 'lucide-react';

const YT_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663407626762/iASgnCeomTwRZiq44kFhuJ/hero-youtube-i2mp7N9noPBzVscW6euxwM.webp';

export default function ChannelHub() {
  const { childId } = useParams<{ childId: string }>();
  const { data: childList = [] } = trpc.children.list.useQuery();
  const { data: channels = [] } = trpc.channels.list.useQuery();
  const child = childList.find((c) => c.uuid === childId);

  if (!child) return <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center"><p>Child not found</p></div>;

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-24">
      <header className="bg-white border-b-2 border-[#E5E5E0] sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <Link href={`/learn/${childId}`} className="flex items-center gap-1 text-sm font-bold text-[#7C3AED]"><ArrowLeft className="w-4 h-4" /> Back</Link>
          <div className="flex items-center gap-2"><Tv className="w-5 h-5 text-[#F72585]" /><span className="font-black text-sm" style={{ fontFamily: 'var(--font-display)' }}>YouTube Hub</span></div>
          <span className="text-xs text-[#888]">{channels.length} channels</span>
        </div>
      </header>

      <div className="container pt-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-3xl overflow-hidden mb-8 bg-[#F72585]">
          <img src={YT_IMG} alt="" className="w-full h-36 object-cover opacity-30" />
          <div className="absolute inset-0 flex items-center p-6">
            <div>
              <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                {child.displayName}'s Videos 📺
              </h1>
              <p className="text-white/80 text-sm">Only parent-approved channels. No search, no ads.</p>
            </div>
          </div>
        </motion.div>

        {channels.length === 0 ? (
          <div className="card-gigi text-center py-12">
            <Tv className="w-10 h-10 text-[#888] mx-auto mb-3" />
            <p className="font-bold text-[#1C1B2E] mb-2" style={{ fontFamily: 'var(--font-display)' }}>No channels yet</p>
            <p className="text-sm text-[#888]">Ask your parent to add some YouTube channels!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {channels.map((ch, i) => (
              <motion.div key={ch.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={`/learn/${childId}/channels/${ch.id}`} className="card-gigi !p-0 overflow-hidden block hover:border-[#F72585] transition-colors group">
                  <div className="h-24 bg-gradient-to-br from-[#F72585]/20 to-[#7C3AED]/20 flex items-center justify-center group-hover:from-[#F72585]/30 group-hover:to-[#7C3AED]/30 transition-colors">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{ch.emoji}</span>
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-sm text-[#1C1B2E] truncate" style={{ fontFamily: 'var(--font-display)' }}>{ch.nickname}</p>
                    <p className="text-[10px] text-[#888]">Educational</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
