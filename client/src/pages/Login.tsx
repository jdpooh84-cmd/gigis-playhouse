import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import { Link, Redirect } from 'wouter';
import { motion } from 'framer-motion';
import CharacterHeadshot from '@/components/CharacterHeadshot';
import LoadingScreen from '@/components/LoadingScreen';

export default function Login() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <CharacterHeadshot character="cat" size={48} color="#F59E0B" />
            <span className="font-black text-2xl text-[#7C3AED]" style={{ fontFamily: 'var(--font-display)' }}>Gigi's Playhouse</span>
          </Link>
          <h1 className="text-2xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>Welcome Back!</h1>
          <p className="text-[#555] mt-2" style={{ fontFamily: 'var(--font-body)' }}>
            Sign in to continue your learning adventure
          </p>
        </div>

        <div className="card-gigi space-y-5 text-center">
          <a
            href={getLoginUrl()}
            className="btn-gigi w-full inline-flex items-center justify-center gap-2"
          >
            Sign In
          </a>

          <p className="text-sm text-[#888]">
            Don't have an account?{' '}
            <a href={getLoginUrl()} className="text-[#7C3AED] font-bold hover:underline">
              Sign Up Free
            </a>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-[#999]">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-[#7C3AED] hover:underline">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-[#7C3AED] hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
