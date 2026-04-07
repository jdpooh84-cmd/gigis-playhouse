import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { X, ArrowLeft, HelpCircle } from 'lucide-react';

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
        <div className="w-20 h-20 rounded-full bg-[#F72585]/10 flex items-center justify-center mx-auto mb-6">
          <X className="w-10 h-10 text-[#F72585]" />
        </div>
        <h1 className="text-3xl font-black text-[#1C1B2E] mb-2" style={{ fontFamily: 'var(--font-display)' }}>Payment Cancelled</h1>
        <p className="text-[#555] mb-6">No worries! You weren't charged. Your free plan is still active.</p>
        <div className="card-gigi !bg-[#F5F5F0] mb-6">
          <div className="flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#888]" /><span className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>Need help?</span></div>
          <p className="text-sm text-[#555]">If you had trouble with payment, please contact support and we'll help you out.</p>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/dashboard/upgrade" className="btn-gigi w-full justify-center">Try Again</Link>
          <Link href="/dashboard" className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] !shadow-[0_4px_0_#C5C5C0] w-full justify-center"><ArrowLeft className="w-5 h-5" /> Back to Dashboard</Link>
        </div>
      </motion.div>
    </div>
  );
}
