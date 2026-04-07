/**
 * TrialBanner — Dismissible banner showing trial days remaining
 * Appears on day 3+ in the parent dashboard
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { X, Clock, Crown } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function TrialBanner() {
  const { user: profile } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  if (!profile || profile.planType !== "free" || dismissed) return null;

  const trialStart = profile.trialStart ? new Date(profile.trialStart) : null;
  if (!trialStart) return null;

  const trialEnd = new Date(trialStart.getTime() + 7 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((trialEnd.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)));
  const daysSinceStart = Math.floor((now.getTime() - trialStart.getTime()) / (24 * 60 * 60 * 1000));

  // Only show after day 3
  if (daysSinceStart < 3) return null;

  const isUrgent = daysLeft <= 2;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`${isUrgent ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"} border-2 rounded-2xl p-4 mb-4`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isUrgent ? "bg-red-100" : "bg-amber-100"}`}>
              <Clock className={`w-5 h-5 ${isUrgent ? "text-red-500" : "text-amber-500"}`} />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {daysLeft === 0
                  ? "Your free trial ends today!"
                  : daysLeft === 1
                  ? "1 day left in your free trial!"
                  : `${daysLeft} days left in your free trial`}
              </p>
              <p className="text-xs text-[#888]">
                {isUrgent
                  ? "Upgrade now to keep unlimited access"
                  : "Upgrade anytime to unlock all features"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/upgrade"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black text-white transition-colors ${
                isUrgent ? "bg-red-500 hover:bg-red-600" : "bg-amber-500 hover:bg-amber-600"
              }`}
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              <Crown className="w-3.5 h-3.5" /> Upgrade
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 rounded-lg hover:bg-black/5 text-[#888] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
