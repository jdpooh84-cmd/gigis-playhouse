import { useParams, Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Clock, ThumbsUp, AlertTriangle } from 'lucide-react';

const MOCK_VIDEOS = [
  { id: 'v1', title: 'Counting to 100 Song', duration: '4:32', thumbnail: '🔢' },
  { id: 'v2', title: 'ABC Phonics Adventure', duration: '6:15', thumbnail: '🔤' },
  { id: 'v3', title: 'Colors of the Rainbow', duration: '3:48', thumbnail: '🌈' },
  { id: 'v4', title: 'Animal Sounds Safari', duration: '5:22', thumbnail: '🦁' },
  { id: 'v5', title: 'Shapes All Around Us', duration: '4:10', thumbnail: '🔷' },
  { id: 'v6', title: 'Days of the Week Song', duration: '3:55', thumbnail: '📅' },
  { id: 'v7', title: 'Solar System for Kids', duration: '7:30', thumbnail: '🪐' },
  { id: 'v8', title: 'Feelings & Emotions', duration: '5:45', thumbnail: '😊' },
];

export default function ChannelPlayer() {
  const { childId, channelId } = useParams<{ childId: string; channelId: string }>();
  const { data: childList = [] } = trpc.children.list.useQuery();
  const { data: channels = [] } = trpc.channels.list.useQuery();
  const child = childList.find((c) => c.uuid === childId);
  const channel = channels.find((c) => String(c.id) === channelId);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);

  const videos = useMemo(() => MOCK_VIDEOS, []);

  if (!child || !channel) return <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center"><p>Channel not found</p></div>;

  const currentVideo = videos.find((v) => v.id === activeVideo);

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <header className="bg-white border-b-2 border-[#E5E5E0] sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <Link href={`/learn/${childId}/channels`} className="flex items-center gap-1 text-sm font-bold text-[#7C3AED]"><ArrowLeft className="w-4 h-4" /> Channels</Link>
          <div className="flex items-center gap-2"><span className="text-lg">{channel.emoji}</span><span className="font-black text-sm" style={{ fontFamily: 'var(--font-display)' }}>{channel.nickname}</span></div>
          <button onClick={() => setShowReport(!showReport)} className="text-[#888] hover:text-[#F72585] p-1" title="Report video"><AlertTriangle className="w-4 h-4" /></button>
        </div>
      </header>

      <div className="container py-6 max-w-3xl">
        {activeVideo && currentVideo ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <div className="bg-[#1C1B2E] rounded-2xl aspect-video flex items-center justify-center mb-4 relative overflow-hidden">
              <div className="text-center text-white/60">
                <span className="text-6xl block mb-4">{currentVideo.thumbnail}</span>
                <Play className="w-16 h-16 mx-auto mb-2 opacity-50" />
                <p className="text-lg font-bold">{currentVideo.title}</p>
                <p className="text-xs mt-1">Privacy-enhanced embed mode</p>
                <p className="text-xs text-white/40 mt-1">youtube-nocookie.com</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-black text-lg text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{currentVideo.title}</h2>
                <p className="text-xs text-[#888] flex items-center gap-2"><Clock className="w-3 h-3" /> {currentVideo.duration}</p>
              </div>
              <button className="flex items-center gap-1 text-sm font-bold text-[#7C3AED] bg-[#7C3AED]/10 rounded-xl px-3 py-2 hover:bg-[#7C3AED]/20 transition-colors"><ThumbsUp className="w-4 h-4" /> Like</button>
            </div>
          </motion.div>
        ) : (
          <div className="bg-gradient-to-br from-[#F72585]/10 to-[#7C3AED]/10 rounded-3xl aspect-video flex items-center justify-center mb-6 border-2 border-dashed border-[#E5E5E0]">
            <div className="text-center">
              <span className="text-5xl block mb-3">{channel.emoji}</span>
              <p className="font-bold text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>Pick a video to watch!</p>
              <p className="text-xs text-[#888] mt-1">All videos are parent-approved</p>
            </div>
          </div>
        )}

        {showReport && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card-gigi !border-[#F72585]/40 mb-6">
            <div className="flex items-center gap-2 mb-3"><AlertTriangle className="w-5 h-5 text-[#F72585]" /><h3 className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>Report a Video</h3></div>
            <p className="text-sm text-[#555] mb-3">If you see something that doesn't look right, tell a grown-up! They can remove this channel.</p>
            <button onClick={() => setShowReport(false)} className="btn-gigi !py-2 !text-sm !bg-[#F72585]">I'll Tell a Grown-Up</button>
          </motion.div>
        )}

        <h3 className="font-black text-lg text-[#1C1B2E] mb-4" style={{ fontFamily: 'var(--font-display)' }}>Videos</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {videos.map((video, i) => (
            <motion.button key={video.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} onClick={() => setActiveVideo(video.id)} className={`card-gigi !p-0 overflow-hidden text-left group transition-colors ${activeVideo === video.id ? '!border-[#F72585]' : 'hover:border-[#7C3AED]'}`}>
              <div className="flex items-center gap-3 p-3">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#F72585]/10 to-[#7C3AED]/10 flex items-center justify-center text-2xl shrink-0 group-hover:from-[#F72585]/20 group-hover:to-[#7C3AED]/20 transition-colors">
                  {video.thumbnail}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-[#1C1B2E] truncate" style={{ fontFamily: 'var(--font-display)' }}>{video.title}</p>
                  <p className="text-[10px] text-[#888] flex items-center gap-1"><Clock className="w-3 h-3" /> {video.duration}</p>
                </div>
                <Play className={`w-5 h-5 shrink-0 ml-auto ${activeVideo === video.id ? 'text-[#F72585]' : 'text-[#888]'}`} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
