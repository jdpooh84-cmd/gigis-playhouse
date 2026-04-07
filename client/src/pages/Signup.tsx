import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Eye, EyeOff, Shield } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const signup = useStore((s) => s.signup);
  const [, navigate] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirm) { setError('Please fill in all fields.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (!agreed) { setError('Please agree to the Terms of Service and Privacy Policy.'); return; }
    signup(email, password);
    navigate('/onboard/welcome');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl">🐱</span>
            <span className="font-black text-2xl text-[#7C3AED]" style={{ fontFamily: 'var(--font-display)' }}>Gigi's Playhouse</span>
          </Link>
          <h1 className="text-2xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>Create Your Free Account</h1>
          <p className="text-sm text-[#888] mt-1">No credit card required. Start learning today.</p>
        </div>
        <form onSubmit={handleSubmit} className="card-gigi space-y-5">
          {error && <div className="bg-red-50 text-red-600 rounded-xl p-3 text-sm font-semibold">{error}</div>}
          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Parent Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 text-base focus:border-[#7C3AED] focus:outline-none transition-colors" placeholder="parent@email.com" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 text-base focus:border-[#7C3AED] focus:outline-none transition-colors pr-12" placeholder="Min 8 characters" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888]">{showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Confirm Password</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 text-base focus:border-[#7C3AED] focus:outline-none transition-colors" placeholder="Confirm password" />
          </div>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-5 h-5 rounded border-2 border-[#E5E5E0] accent-[#7C3AED]" />
            <span className="text-sm text-[#555]">
              I am 13 years or older and agree to the <Link href="/terms" className="text-[#7C3AED] font-bold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#7C3AED] font-bold hover:underline">Privacy Policy</Link>.
            </span>
          </label>
          <button type="submit" className="btn-gigi w-full">Create Free Account</button>
          <p className="text-center text-sm text-[#888]">Already have an account? <Link href="/login" className="text-[#7C3AED] font-bold hover:underline">Log In</Link></p>
          <div className="flex items-center justify-center gap-2 text-xs text-[#888]">
            <Shield className="w-3.5 h-3.5" /> COPPA Compliant — We protect your family's data
          </div>
        </form>
      </motion.div>
    </div>
  );
}
