import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const login = useStore((s) => s.login);
  const onboardingComplete = useStore((s) => s.onboardingComplete);
  const [, navigate] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    login(email, password);
    navigate(onboardingComplete ? '/dashboard' : '/onboard/welcome');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl">🐱</span>
            <span className="font-black text-2xl text-[#7C3AED]" style={{ fontFamily: 'var(--font-display)' }}>Gigi's Playhouse</span>
          </Link>
          <h1 className="text-2xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>Welcome Back!</h1>
        </div>
        <form onSubmit={handleSubmit} className="card-gigi space-y-5">
          {error && <div className="bg-red-50 text-red-600 rounded-xl p-3 text-sm font-semibold">{error}</div>}
          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 text-base focus:border-[#7C3AED] focus:outline-none transition-colors" placeholder="parent@email.com" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-2 border-[#E5E5E0] rounded-xl px-4 py-3 text-base focus:border-[#7C3AED] focus:outline-none transition-colors pr-12" placeholder="Your password" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888]">{showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
            </div>
          </div>
          <button type="submit" className="btn-gigi w-full">Log In</button>
          <p className="text-center text-sm text-[#888]">Don't have an account? <Link href="/signup" className="text-[#7C3AED] font-bold hover:underline">Sign Up Free</Link></p>
        </form>
      </motion.div>
    </div>
  );
}
