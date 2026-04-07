import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { useStore } from '@/lib/store';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function Channels() {
  const channels = useStore((s) => s.approvedChannels);
  const removeChannel = useStore((s) => s.removeChannel);
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>YouTube Channels</h1>
          <p className="text-[#555] mt-2">We pre-loaded 17 educational channels. Remove any you don't want.</p>
        </div>
        <div className="card-gigi">
          <div className="max-h-80 overflow-y-auto space-y-2 mb-6">
            {channels.filter(c => c.is_preloaded).map((ch) => (
              <div key={ch.id} className="flex items-center justify-between p-3 rounded-xl border-2 border-[#E5E5E0] hover:border-[#7C3AED]/30 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ch.emoji}</span>
                  <span className="font-semibold text-sm">{ch.nickname}</span>
                </div>
                <button onClick={() => removeChannel(ch.id)} className="text-xs text-red-400 hover:text-red-600 font-bold px-3 py-1 rounded-lg hover:bg-red-50 transition-colors">Remove</button>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Link href="/onboard/preferences" className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] !shadow-[0_4px_0_#C5C5C0] flex-1 justify-center"><ArrowLeft className="w-5 h-5" /> Back</Link>
            <button onClick={() => navigate('/onboard/done')} className="btn-gigi flex-1 justify-center">Next <ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-6">
          {[1,2,3,4,5].map((i) => (<div key={i} className={`w-3 h-3 rounded-full ${i === 4 ? 'bg-[#7C3AED]' : 'bg-[#E5E5E0]'}`} />))}
        </div>
      </motion.div>
    </div>
  );
}
