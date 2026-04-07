import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { useLocation } from 'wouter';
import { ChevronDown, Check, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Child } from '../../../drizzle/schema';

const PLAN_CHILD_LIMITS: Record<string, number> = {
  free: 1,
  gold: 1,
  family: 4,
};

export default function ChildSwitcher() {
  const { data: childList = [] } = trpc.children.list.useQuery();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [confirmSwitch, setConfirmSwitch] = useState<Child | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  const [location] = useLocation();
  const urlChildId = location.match(/\/learn\/([^/]+)/)?.[1];
  const activeChildren = childList.filter(c => c.isActive);
  const activeChild = activeChildren.find(c => c.uuid === urlChildId) || activeChildren[0];

  const planType = user?.planType ?? 'free';
  const maxChildren = PLAN_CHILD_LIMITS[planType] ?? 1;
  const canAddMore = activeChildren.length < maxChildren;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (activeChildren.length < 2) return null;

  const handleSwitch = (child: Child) => {
    const inLesson = location.includes('/lesson/') || location.includes('/quiz/');
    if (inLesson && child.uuid !== activeChild?.uuid) {
      setConfirmSwitch(child);
      return;
    }
    doSwitch(child);
  };

  const doSwitch = (child: Child) => {
    setOpen(false);
    setConfirmSwitch(null);
    navigate(`/learn/${child.uuid}`);
  };

  const profileColorMap: Record<string, string> = {
    coral: '#D85A30',
    sky: '#4361EE',
    mint: '#0F6E56',
    lavender: '#7C3AED',
    sunshine: '#F59E0B',
    peach: '#F97316',
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-[#E5E5E0] hover:border-[#7C3AED]/50 transition-all bg-white"
      >
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: profileColorMap[activeChild?.profileColor || 'lavender'] || '#7C3AED' }} />
        <span className="font-bold text-sm text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>
          {activeChild?.displayName || 'Select Child'}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#888] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 w-56 bg-white rounded-2xl border-2 border-[#E5E5E0] shadow-lg z-50 overflow-hidden"
          >
            {activeChildren.map((child) => (
              <button
                key={child.id}
                onClick={() => handleSwitch(child)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FAFAF5] transition-colors ${child.uuid === activeChild?.uuid ? 'bg-[#FAFAF5]' : ''}`}
              >
                <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: profileColorMap[child.profileColor] || '#7C3AED' }} />
                <div className="text-left flex-1">
                  <div className="font-bold text-sm text-[#1C1B2E]">{child.displayName}</div>
                  <div className="text-xs text-[#888]">Age {child.age} · Grade {child.grade}</div>
                </div>
                {child.uuid === activeChild?.uuid && <Check className="w-4 h-4 text-[#7C3AED]" />}
              </button>
            ))}
            {canAddMore && (
              <button
                onClick={() => { setOpen(false); navigate('/onboard/child'); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FAFAF5] transition-colors border-t border-[#E5E5E0]"
              >
                <Plus className="w-4 h-4 text-[#7C3AED]" />
                <span className="text-sm text-[#7C3AED] font-semibold">Add child</span>
              </button>
            )}
            {!canAddMore && activeChildren.length < 4 && (
              <button
                onClick={() => { setOpen(false); navigate('/upgrade'); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FAFAF5] transition-colors border-t border-[#E5E5E0]"
              >
                <Plus className="w-4 h-4 text-[#D85A30]" />
                <span className="text-sm text-[#D85A30] font-semibold">Upgrade for more</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmSwitch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] p-4"
            onClick={() => setConfirmSwitch(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-black text-[#1C1B2E] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Switch to {confirmSwitch.displayName}?
              </h3>
              <p className="text-sm text-[#555] mb-5">
                {activeChild?.displayName}'s progress will be saved. Ready to switch?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmSwitch(null)}
                  className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] !shadow-[0_4px_0_#C5C5C0] flex-1 justify-center text-sm"
                >
                  Stay with {activeChild?.displayName}
                </button>
                <button
                  onClick={() => doSwitch(confirmSwitch)}
                  className="btn-gigi flex-1 justify-center text-sm"
                >
                  Yes, switch
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
