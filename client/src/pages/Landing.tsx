// ============================================================
// Landing Page — Conversion-optimized, bold toybox aesthetic
// ============================================================
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { BookOpen, Tv, Brain, Star, Shield, Globe, ChevronDown, Check, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

const HERO_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663407626762/iASgnCeomTwRZiq44kFhuJ/hero-landing-AxsZ8bo6AFYuGPVHaa36pf.webp';
const LEARN_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663407626762/iASgnCeomTwRZiq44kFhuJ/hero-learning-FKJmUMTLG3C2SueDA8HK76.webp';
const YT_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663407626762/iASgnCeomTwRZiq44kFhuJ/hero-youtube-i2mp7N9noPBzVscW6euxwM.webp';
const DASH_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663407626762/iASgnCeomTwRZiq44kFhuJ/hero-dashboard-8f9Rjm2F7LJezrppKeK7F9.webp';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const FAQS = [
  { q: 'Is it really free?', a: 'Yes! The free tier includes 3 lessons per learning path, 5 YouTube channel slots, and basic flashcards. No credit card required to start.' },
  { q: 'What grade levels does it cover?', a: 'Gigi\'s Playhouse covers Pre-K through Grade 3 across 6 learning domains: Literacy, Math, Science, Social Studies, Social-Emotional Learning, and Executive Function.' },
  { q: 'Can I cancel anytime?', a: 'Absolutely. You can cancel your subscription at any time through your account settings. No contracts, no hidden fees.' },
  { q: 'Is it COPPA-compliant and safe for kids?', a: 'Yes. We follow all COPPA requirements. No behavioral tracking of children, no ads, no data collection from kids. YouTube videos play in privacy-enhanced mode.' },
  { q: 'What devices does it work on?', a: 'Gigi\'s Playhouse works on any device with a web browser — phones, tablets, laptops, and desktops. You can even add it to your home screen like an app!' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-3 border-[#E5E5E0] rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>{q}</span>
        <ChevronDown className={`w-5 h-5 text-[#7C3AED] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="px-5 pb-5 text-[#555]"
        >
          {a}
        </motion.div>
      )}
    </div>
  );
}

export default function Landing() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b-2 border-[#E5E5E0]">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🐱</span>
            <span className="font-black text-xl text-[#7C3AED]" style={{ fontFamily: 'var(--font-display)' }}>
              Gigi's Playhouse
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="font-semibold text-sm hover:text-[#7C3AED] transition-colors">Features</a>
            <a href="#pricing" className="font-semibold text-sm hover:text-[#7C3AED] transition-colors">Pricing</a>
            <a href="#faq" className="font-semibold text-sm hover:text-[#7C3AED] transition-colors">FAQ</a>
            <Link href="/login" className="font-semibold text-sm hover:text-[#7C3AED] transition-colors">Log In</Link>
            <Link href="/signup" className="btn-gigi !py-2.5 !px-6 !text-base">Start Free</Link>
          </div>
          <Link href="/signup" className="md:hidden btn-gigi !py-2 !px-4 !text-sm">Start Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-[#7C3AED]/10 text-[#7C3AED] rounded-full px-4 py-1.5 text-sm font-bold">
                <Sparkles className="w-4 h-4" /> New: 17 Languages Supported
              </motion.div>
              <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>
                The Learning App Your Child Will{' '}
                <span className="text-[#7C3AED] relative">
                  Actually Ask For
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none"><path d="M2 8C50 2 250 2 298 8" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" /></svg>
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-[#555] max-w-lg">
                Curriculum + their favorite YouTube channels. In one safe place. Free to try.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
                <Link href="/signup" className="btn-gigi text-xl">
                  Start Free — No Credit Card Needed
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#444]">
                  <span className="text-xl">🏆</span> K-3 Curriculum
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#444]">
                  <span className="text-xl">📺</span> YouTube Hub
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#444]">
                  <span className="text-xl">🧩</span> ADHD-Friendly
                </div>
              </motion.div>
              <motion.p variants={fadeUp} custom={5} className="text-sm text-[#888]">
                Trusted by 1,000+ homeschool families
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <img src={HERO_IMG} alt="Gigi the cat mascot sitting on colorful books" className="w-full" loading="eager" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#FBBF24] text-[#1C1B2E] rounded-2xl px-4 py-2 font-black text-sm shadow-lg rotate-[-3deg]" style={{ fontFamily: 'var(--font-display)' }}>
                100% Free to Start!
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature: Two Apps in One */}
      <section id="features" className="py-20 bg-white">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-black text-[#1C1B2E] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Two Apps in One
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-lg text-[#555] max-w-2xl mx-auto">
              Full K-3 curriculum AND a safe YouTube hub where your child watches only parent-approved channels. No more app-switching.
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-gigi overflow-hidden !p-0">
              <img src={LEARN_IMG} alt="Children learning together in a colorful playroom" className="w-full h-56 object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="text-xl font-black text-[#1C1B2E] mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                  <BookOpen className="w-6 h-6 text-[#4361EE]" /> Learning Engine
                </h3>
                <p className="text-[#555]">540 structured lessons across 6 domains. Watch, Do, Apply, Reflect — every lesson follows a proven 4-step method.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-gigi overflow-hidden !p-0">
              <img src={YT_IMG} alt="Gigi the cat watching videos on a tablet" className="w-full h-56 object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="text-xl font-black text-[#1C1B2E] mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                  <Tv className="w-6 h-6 text-[#F72585]" /> YouTube Hub
                </h3>
                <p className="text-[#555]">Parents add their approved channels. Kids watch safely inside the app — no search, no recommendations, no rabbit holes.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#FAFAF5]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-black text-center text-[#1C1B2E] mb-12" style={{ fontFamily: 'var(--font-display)' }}>
            What Parents Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah M.', text: 'My daughter asks to "play Gigi" every morning. The YouTube hub alone is worth it — no more fighting over what to watch.', emoji: '⭐⭐⭐⭐⭐' },
              { name: 'Marcus T.', text: 'As a homeschool dad, the compliance log saves me hours. I can export PDF records for our state requirements in one click.', emoji: '⭐⭐⭐⭐⭐' },
              { name: 'Jennifer L.', text: 'My ADHD son actually finishes lessons here. The movement breaks and short day mode are game-changers.', emoji: '⭐⭐⭐⭐⭐' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card-gigi"
              >
                <p className="text-sm mb-1">{t.emoji}</p>
                <p className="text-[#444] mb-4 italic">"{t.text}"</p>
                <p className="font-bold text-sm text-[#7C3AED]" style={{ fontFamily: 'var(--font-display)' }}>{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-black text-center text-[#1C1B2E] mb-12" style={{ fontFamily: 'var(--font-display)' }}>
            How Gigi's Playhouse Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', icon: '👤', title: 'Create a Profile', desc: 'Sign up free. Add your child\'s name, age, and learning preferences. Takes 2 minutes.' },
              { step: '2', icon: '📺', title: 'Pick Channels', desc: 'Choose from 17 pre-loaded educational YouTube channels or add your own favorites.' },
              { step: '3', icon: '🚀', title: 'Start Learning', desc: 'Your child explores 6 learning domains with guided lessons, quizzes, and flashcards.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-4xl mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="inline-block bg-[#7C3AED] text-white rounded-full w-8 h-8 text-sm font-black leading-8 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-black text-[#1C1B2E] mb-2" style={{ fontFamily: 'var(--font-display)' }}>{item.title}</h3>
                <p className="text-[#555]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 bg-[#FAFAF5]">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-center text-[#1C1B2E] mb-12" style={{ fontFamily: 'var(--font-display)' }}>
            Unlike Other Apps, Gigi's Includes:
          </h2>
          <div className="card-gigi !p-0 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#7C3AED] text-white">
                  <th className="p-4 font-bold" style={{ fontFamily: 'var(--font-display)' }}>Feature</th>
                  <th className="p-4 text-center font-bold" style={{ fontFamily: 'var(--font-display)' }}>Gigi's</th>
                  <th className="p-4 text-center font-bold" style={{ fontFamily: 'var(--font-display)' }}>Others</th>
                </tr>
              </thead>
              <tbody>
                {[
                  'Parent-curated YouTube Hub',
                  'ADHD-friendly design',
                  'Homeschool compliance logs',
                  '17 language support',
                  'ASL integration',
                  'Movement breaks',
                  'Free forever tier',
                ].map((f, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF5]'}>
                    <td className="p-4 font-semibold text-[#333]">{f}</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-[#22C55E] mx-auto" /></td>
                    <td className="p-4 text-center"><X className="w-5 h-5 text-[#EF4444] mx-auto" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-black text-center text-[#1C1B2E] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Simple, Honest Pricing
          </h2>
          <p className="text-center text-[#555] mb-8 max-w-xl mx-auto">Start free. Upgrade when you're ready. Cancel anytime.</p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className={`font-semibold text-sm ${!annual ? 'text-[#1C1B2E]' : 'text-[#888]'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${annual ? 'bg-[#7C3AED]' : 'bg-[#D1D5DB]'}`}
              aria-label="Toggle annual pricing"
            >
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${annual ? 'translate-x-7' : 'translate-x-0.5'}`} />
            </button>
            <span className={`font-semibold text-sm ${annual ? 'text-[#1C1B2E]' : 'text-[#888]'}`}>
              Annual <span className="text-[#22C55E] font-bold">Save 33%</span>
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="card-gigi text-center">
              <h3 className="text-xl font-black text-[#1C1B2E] mb-1" style={{ fontFamily: 'var(--font-display)' }}>Free Forever</h3>
              <p className="text-[#888] text-sm mb-4">Get started, no strings attached</p>
              <div className="text-4xl font-black text-[#1C1B2E] mb-6" style={{ fontFamily: 'var(--font-display)' }}>$0</div>
              <ul className="text-left space-y-3 mb-8 text-sm">
                {['3 lessons per path', '5 YouTube channels', '1 child profile', 'Basic flashcards', 'English only'].map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="w-4 h-4 text-[#22C55E] mt-0.5 shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="/signup" className="btn-gigi !bg-[#E5E5E0] !text-[#1C1B2E] w-full !shadow-[0_4px_0_#C5C5C0]">
                Start Free
              </Link>
            </div>

            {/* Gold */}
            <div className="card-gigi text-center !border-[#7C3AED] !border-3 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FBBF24] text-[#1C1B2E] rounded-full px-4 py-1 text-xs font-black" style={{ fontFamily: 'var(--font-display)' }}>
                MOST POPULAR
              </div>
              <h3 className="text-xl font-black text-[#7C3AED] mb-1" style={{ fontFamily: 'var(--font-display)' }}>Gigi's Gold</h3>
              <p className="text-[#888] text-sm mb-4">Full learning experience</p>
              <div className="text-4xl font-black text-[#1C1B2E] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                {annual ? '$3.33' : '$4.99'}<span className="text-lg font-semibold text-[#888]">/mo</span>
              </div>
              {annual && <p className="text-xs text-[#22C55E] font-bold mb-4">$39.99 billed annually</p>}
              {!annual && <p className="text-xs text-[#888] mb-4">&nbsp;</p>}
              <ul className="text-left space-y-3 mb-8 text-sm">
                {['540 lessons, all domains', 'Unlimited YouTube channels', '1 child profile', '17 languages', 'PDF compliance exports', 'All flashcards'].map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="w-4 h-4 text-[#22C55E] mt-0.5 shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="/signup" className="btn-gigi w-full">
                Start 7-Day Free Trial
              </Link>
            </div>

            {/* Family */}
            <div className="card-gigi text-center">
              <h3 className="text-xl font-black text-[#1C1B2E] mb-1" style={{ fontFamily: 'var(--font-display)' }}>Family Plan</h3>
              <p className="text-[#888] text-sm mb-4">For families with multiple kids</p>
              <div className="text-4xl font-black text-[#1C1B2E] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                {annual ? '$5.00' : '$7.99'}<span className="text-lg font-semibold text-[#888]">/mo</span>
              </div>
              {annual && <p className="text-xs text-[#22C55E] font-bold mb-4">$59.99 billed annually</p>}
              {!annual && <p className="text-xs text-[#888] mb-4">&nbsp;</p>}
              <ul className="text-left space-y-3 mb-8 text-sm">
                {['Everything in Gold', 'Up to 5 child profiles', 'Individual progress tracking', 'Family compliance dashboard'].map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="w-4 h-4 text-[#22C55E] mt-0.5 shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="/signup" className="btn-gigi !bg-[#F72585] w-full !shadow-[0_4px_0_#C01A68,0_6px_20px_rgba(247,37,133,0.3)]">
                Start 7-Day Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-[#FAFAF5]">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-center text-[#1C1B2E] mb-12" style={{ fontFamily: 'var(--font-display)' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#7C3AED] text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Join 1,000+ Families Learning with Gigi
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Start your child's learning adventure today. Free forever, upgrade anytime.
          </p>
          <Link href="/signup" className="btn-gigi !bg-[#FBBF24] !text-[#1C1B2E] !shadow-[0_4px_0_#D4A017,0_6px_20px_rgba(251,191,36,0.4)] text-xl">
            Start Free — No Credit Card Needed
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#1C1B2E] text-white/70">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🐱</span>
                <span className="font-black text-lg text-white" style={{ fontFamily: 'var(--font-display)' }}>Gigi's Playhouse</span>
              </div>
              <p className="text-sm">The learning app your child will actually ask for. Built by Dreamz In Ink LLC.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-sm" style={{ fontFamily: 'var(--font-display)' }}>Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-sm" style={{ fontFamily: 'var(--font-display)' }}>Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-sm" style={{ fontFamily: 'var(--font-display)' }}>Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:support@gigisplayhouse.app" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Dreamz In Ink LLC. All rights reserved.</p>
            <p className="mt-1 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" /> COPPA Compliant <span className="mx-1">|</span> <Globe className="w-4 h-4" /> 17 Languages
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
