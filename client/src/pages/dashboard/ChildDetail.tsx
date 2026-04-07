import { useParams, Link } from 'wouter';
import { useStore } from '@/lib/store';
import DashboardLayout from '@/components/DashboardLayout';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { GradeBand, AttentionSpan, LearningStyle } from '@/lib/types';

const EMOJIS = ['🦊','🐱','🐶','🦄','🐸','🐻','🐰','🦋','🐢','🦁','🐼','🐨'];

export default function ChildDetail() {
  const { id } = useParams<{ id: string }>();
  const child = useStore((s) => s.children.find((c) => c.id === id));
  const updateChild = useStore((s) => s.updateChild);
  const removeChild = useStore((s) => s.removeChild);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(child?.display_name || '');
  const [age, setAge] = useState(child?.age || 6);
  const [grade, setGrade] = useState<GradeBand>(child?.grade_band || 'grade-1');
  const [emoji, setEmoji] = useState(child?.avatar_emoji || '🦊');
  const [attention, setAttention] = useState<AttentionSpan>(child?.attention_span || 'medium');
  const [style, setStyle] = useState<LearningStyle>(child?.learning_style || 'mixed');
  const [shortDay, setShortDay] = useState(child?.short_day_mode || false);

  if (!child) return <DashboardLayout title="Child Not Found"><p>This child profile was not found.</p><Link href="/dashboard" className="btn-gigi mt-4 inline-flex">Back to Dashboard</Link></DashboardLayout>;

  const handleSave = () => {
    updateChild(child.id, { display_name: name, age, grade_band: grade, avatar_emoji: emoji, attention_span: attention, learning_style: style, short_day_mode: shortDay });
    setEditing(false);
  };

  return (
    <DashboardLayout>
      <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm font-bold text-[#7C3AED] mb-4 hover:underline"><ArrowLeft className="w-4 h-4" /> Back</Link>
      <div className="card-gigi max-w-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center text-4xl">{child.avatar_emoji}</div>
            <div>
              <h2 className="text-2xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{child.display_name}</h2>
              <p className="text-sm text-[#888] capitalize">{child.grade_band.replace('-',' ')} · Age {child.age}</p>
            </div>
          </div>
          <button onClick={() => setEditing(!editing)} className="text-[#7C3AED] hover:bg-[#7C3AED]/10 p-2 rounded-xl"><Edit className="w-5 h-5" /></button>
        </div>
        {editing ? (
          <div className="space-y-4">
            <div><label className="block text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Name</label><input value={name} onChange={e=>setName(e.target.value)} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 focus:border-[#7C3AED] focus:outline-none" /></div>
            <div><label className="block text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Avatar</label><div className="flex flex-wrap gap-2">{EMOJIS.map(e=><button key={e} onClick={()=>setEmoji(e)} className={`w-10 h-10 text-xl rounded-xl border-2 flex items-center justify-center ${emoji===e?'border-[#7C3AED] bg-[#7C3AED]/10':'border-[#E5E5E0]'}`}>{e}</button>)}</div></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Age</label><select value={age} onChange={e=>setAge(+e.target.value)} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 bg-white focus:border-[#7C3AED] focus:outline-none">{[3,4,5,6,7,8,9].map(a=><option key={a} value={a}>{a}</option>)}</select></div>
              <div><label className="block text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Grade</label><select value={grade} onChange={e=>setGrade(e.target.value as GradeBand)} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 bg-white focus:border-[#7C3AED] focus:outline-none">{['pre-k','kindergarten','grade-1','grade-2','grade-3'].map(g=><option key={g} value={g}>{g.replace('-',' ')}</option>)}</select></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(['short','medium','long'] as const).map(v=><button key={v} onClick={()=>setAttention(v)} className={`p-3 rounded-xl border-2 text-center text-xs font-bold capitalize ${attention===v?'border-[#7C3AED] bg-[#7C3AED]/10':'border-[#E5E5E0]'}`}>{v} focus</button>)}
            </div>
            <label className="flex items-center gap-3"><input type="checkbox" checked={shortDay} onChange={e=>setShortDay(e.target.checked)} className="w-5 h-5 accent-[#7C3AED]" /><span className="text-sm font-bold">Short Day Mode</span></label>
            <div className="flex gap-3">
              <button onClick={()=>setEditing(false)} className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] !shadow-[0_4px_0_#C5C5C0] flex-1">Cancel</button>
              <button onClick={handleSave} className="btn-gigi flex-1">Save Changes</button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F5F5F0] rounded-xl p-3"><p className="text-xs text-[#888]">Attention</p><p className="font-bold text-sm capitalize">{child.attention_span}</p></div>
              <div className="bg-[#F5F5F0] rounded-xl p-3"><p className="text-xs text-[#888]">Style</p><p className="font-bold text-sm capitalize">{child.learning_style}</p></div>
              <div className="bg-[#F5F5F0] rounded-xl p-3"><p className="text-xs text-[#888]">Language</p><p className="font-bold text-sm uppercase">{child.language}</p></div>
              <div className="bg-[#F5F5F0] rounded-xl p-3"><p className="text-xs text-[#888]">Short Day</p><p className="font-bold text-sm">{child.short_day_mode ? 'On' : 'Off'}</p></div>
            </div>
            <button onClick={()=>{removeChild(child.id); window.location.href='/dashboard';}} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-600 font-bold mt-4"><Trash2 className="w-4 h-4" /> Remove Child</button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
