import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

const HERO_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663407626762/iASgnCeomTwRZiq44kFhuJ/hero-landing-AxsZ8bo6AFYuGPVHaa36pf.webp';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg text-center">
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mb-6">
          <img src={HERO_IMG} alt="Gigi the cat" className="w-48 h-48 object-contain mx-auto rounded-3xl" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-black text-[#1C1B2E] mb-4" style={{ fontFamily: 'var(--font-display)' }}>Welcome to Gigi's Playhouse!</h1>
        <p className="text-lg text-[#555] mb-8 max-w-md mx-auto">Hi there! I'm Gigi, and I'm so excited to learn with your family. Let's set up your child's profile in just a few steps!</p>
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <Link href="/onboard/child" className="btn-gigi w-full justify-center">Let's Get Started <ArrowRight className="w-5 h-5" /></Link>
          <p className="text-xs text-[#888]">Takes about 2 minutes</p>
        </div>
        <div className="flex items-center justify-center gap-2 mt-8">
          {[1,2,3,4,5].map((i) => (<div key={i} className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-[#7C3AED]' : 'bg-[#E5E5E0]'}`} />))}
        </div>
      </motion.div>
    </div>
  );
}
