import { useParams, Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import DashboardLayout from '@/components/DashboardLayout';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const EMOJIS = ['🦊','🐱','🐶','🦄','🐸','🐻','🐰','🦋','🐢','🦁','🐼','🐨'];

export default function ChildDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: childList = [] } = trpc.children.list.useQuery();
  const child = childList.find((c) => c.uuid === id);
  const updateChild = trpc.children.update.useMutation();
  const deleteChild = trpc.children.delete.useMutation();
  const utils = trpc.useUtils();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(child?.displayName || '');
  const [age, setAge] = useState(child?.age || 6);
  const [grade, setGrade] = useState(child?.grade || 1);
  const [emoji, setEmoji] = useState(child?.avatarEmoji || '🦊');

  if (!child) return <DashboardLayout title="Child Not Found"><p>This child profile was not found.</p><Link href="/dashboard" className="btn-gigi mt-4 inline-flex">Back to Dashboard</Link></DashboardLayout>;

  const handleSave = async () => {
    try {
      await updateChild.mutateAsync({ id: child.id, displayName: name, age, grade, avatarEmoji: emoji });
      await utils.children.list.invalidate();
      setEditing(false);
      toast.success('Profile updated!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update');
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Remove ${child.displayName}'s profile? This cannot be undone.`)) return;
    try {
      await deleteChild.mutateAsync({ id: child.id });
      await utils.children.list.invalidate();
      toast.success('Profile removed');
      window.location.href = '/dashboard';
    } catch (err: any) {
      toast.error(err.message || 'Failed to remove');
    }
  };

  return (
    <DashboardLayout>
      <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm font-bold text-[#7C3AED] mb-4 hover:underline"><ArrowLeft className="w-4 h-4" /> Back</Link>
      <div className="card-gigi max-w-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center text-4xl">{child.avatarEmoji}</div>
            <div>
              <h2 className="text-2xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{child.displayName}</h2>
              <p className="text-sm text-[#888]">Grade {child.grade} · Age {child.age}</p>
            </div>
          </div>
          <button onClick={() => setEditing(!editing)} className="text-[#7C3AED] hover:bg-[#7C3AED]/10 p-2 rounded-xl"><Edit className="w-5 h-5" /></button>
        </div>
        {editing ? (
          <div className="space-y-4">
            <div><label className="block text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Name</label><input value={name} onChange={e=>setName(e.target.value)} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 focus:border-[#7C3AED] focus:outline-none" /></div>
            <div><label className="block text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Avatar</label><div className="flex flex-wrap gap-2">{EMOJIS.map(e=><button key={e} onClick={()=>setEmoji(e)} className={`w-10 h-10 text-xl rounded-xl border-2 flex items-center justify-center ${emoji===e?'border-[#7C3AED] bg-[#7C3AED]/10':'border-[#E5E5E0]'}`}>{e}</button>)}</div></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Age</label><select value={age} onChange={e=>setAge(+e.target.value)} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 bg-white focus:border-[#7C3AED] focus:outline-none">{[3,4,5,6,7,8,9,10,11,12].map(a=><option key={a} value={a}>{a}</option>)}</select></div>
              <div><label className="block text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Grade</label><select value={grade} onChange={e=>setGrade(+e.target.value)} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 bg-white focus:border-[#7C3AED] focus:outline-none">{[0,1,2,3,4,5].map(g=><option key={g} value={g}>Grade {g}</option>)}</select></div>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>setEditing(false)} className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] !shadow-[0_4px_0_#C5C5C0] flex-1">Cancel</button>
              <button onClick={handleSave} disabled={updateChild.isPending} className="btn-gigi flex-1">{updateChild.isPending ? 'Saving...' : 'Save Changes'}</button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F5F5F0] rounded-xl p-3"><p className="text-xs text-[#888]">Guide Animal</p><p className="font-bold text-sm capitalize">{child.guideAnimal}</p></div>
              <div className="bg-[#F5F5F0] rounded-xl p-3"><p className="text-xs text-[#888]">Profile Color</p><p className="font-bold text-sm capitalize">{child.profileColor}</p></div>
              <div className="bg-[#F5F5F0] rounded-xl p-3"><p className="text-xs text-[#888]">Grade</p><p className="font-bold text-sm">Grade {child.grade}</p></div>
              <div className="bg-[#F5F5F0] rounded-xl p-3"><p className="text-xs text-[#888]">Active</p><p className="font-bold text-sm">{child.isActive ? 'Yes' : 'No'}</p></div>
            </div>
            <button onClick={handleDelete} disabled={deleteChild.isPending} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-600 font-bold mt-4"><Trash2 className="w-4 h-4" /> {deleteChild.isPending ? 'Removing...' : 'Remove Child'}</button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
