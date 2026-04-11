import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Rocket, Shield, CreditCard, BookOpen, Users, Eye, Settings, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import AdminLayout from '@/components/AdminLayout';

interface Gate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  checks: { label: string; status: 'pass' | 'fail' | 'warn'; note?: string }[];
}

const GATES: Gate[] = [
  {
    id: 'coppa',
    name: 'COPPA Compliance',
    description: 'All child privacy protections are in place',
    icon: <Shield className="w-5 h-5" />,
    checks: [
      { label: 'Verifiable parental consent flow', status: 'pass' },
      { label: 'No persistent identifiers on children', status: 'pass' },
      { label: 'Data deletion request mechanism', status: 'pass' },
      { label: 'Privacy policy updated with COPPA language', status: 'pass' },
      { label: 'No third-party tracking on child views', status: 'pass' },
      { label: 'YouTube embeds use youtube-nocookie.com', status: 'warn', note: 'Currently using placeholder — verify on real embed' },
    ],
  },
  {
    id: 'payments',
    name: 'Stripe Payments',
    description: 'Payment processing is production-ready',
    icon: <CreditCard className="w-5 h-5" />,
    checks: [
      { label: 'Stripe API keys configured (live mode)', status: 'fail', note: 'Currently using mock — needs real Stripe integration' },
      { label: 'Subscription creation flow tested', status: 'fail', note: 'Needs backend integration' },
      { label: 'Webhook endpoint for payment events', status: 'fail', note: 'Needs backend' },
      { label: 'Plan upgrade/downgrade logic', status: 'pass' },
      { label: 'Payment success/cancel pages', status: 'pass' },
      { label: 'Trial-to-paid conversion flow', status: 'pass' },
    ],
  },
  {
    id: 'learning-content',
    name: 'Learning Content',
    description: 'Learning content is complete and reviewed',
    icon: <BookOpen className="w-5 h-5" />,
    checks: [
      { label: 'All 6 domains have seed lessons', status: 'pass' },
      { label: 'Quiz questions for each lesson', status: 'pass' },
      { label: 'Flashcard decks per domain', status: 'pass' },
      { label: 'Content reviewed for age-appropriateness', status: 'warn', note: 'Needs human review of all content' },
      { label: 'Lesson progression logic tested', status: 'pass' },
      { label: 'All 540 lessons populated', status: 'fail', note: 'Currently 6 seed lessons — needs full learning content' },
    ],
  },
  {
    id: 'auth',
    name: 'Authentication & Security',
    description: 'User authentication is secure and functional',
    icon: <Users className="w-5 h-5" />,
    checks: [
      { label: 'Email/password signup flow', status: 'pass' },
      { label: 'Login persistence (localStorage)', status: 'pass' },
      { label: 'Protected route guards', status: 'pass' },
      { label: 'Backend auth with JWT', status: 'fail', note: 'Currently frontend-only — needs backend' },
      { label: 'Password reset flow', status: 'fail', note: 'Not yet implemented' },
      { label: 'Rate limiting on auth endpoints', status: 'fail', note: 'Needs backend' },
    ],
  },
  {
    id: 'ux',
    name: 'User Experience',
    description: 'UI is polished and accessible',
    icon: <Eye className="w-5 h-5" />,
    checks: [
      { label: 'Mobile responsive (all pages)', status: 'pass' },
      { label: 'Keyboard navigation', status: 'pass' },
      { label: 'Loading states on all async actions', status: 'pass' },
      { label: 'Error boundaries on all routes', status: 'pass' },
      { label: 'Splash screen with theme song', status: 'pass' },
      { label: 'Character system integrated', status: 'pass' },
      { label: 'Movement break timer', status: 'pass' },
      { label: 'Child switcher for multi-child families', status: 'pass' },
    ],
  },
  {
    id: 'monetization',
    name: 'Monetization',
    description: 'Revenue streams are configured',
    icon: <CreditCard className="w-5 h-5" />,
    checks: [
      { label: 'Subscription tiers defined (Free/Gold/Family)', status: 'pass' },
      { label: 'Sponsor card system', status: 'pass' },
      { label: 'Sponsor-with-us landing page', status: 'pass' },
      { label: 'Affiliate link system', status: 'pass' },
      { label: 'Paywall modal for premium content', status: 'pass' },
      { label: 'Trial countdown banner', status: 'pass' },
    ],
  },
  {
    id: 'infra',
    name: 'Infrastructure',
    description: 'Deployment and monitoring are ready',
    icon: <Settings className="w-5 h-5" />,
    checks: [
      { label: 'Database schema (Supabase/Postgres)', status: 'fail', note: 'Currently localStorage — needs database' },
      { label: 'CDN for static assets', status: 'pass' },
      { label: 'Error monitoring (Sentry)', status: 'fail', note: 'Not yet configured' },
      { label: 'Analytics tracking', status: 'pass' },
      { label: 'PWA manifest', status: 'pass' },
      { label: 'SEO meta tags', status: 'pass' },
    ],
  },
];

export default function AdminPublishReadiness() {
  const summary = useMemo(() => {
    let pass = 0, fail = 0, warn = 0;
    GATES.forEach(g => g.checks.forEach(c => {
      if (c.status === 'pass') pass++;
      else if (c.status === 'fail') fail++;
      else warn++;
    }));
    return { pass, fail, warn, total: pass + fail + warn };
  }, []);

  const overallStatus = summary.fail > 0 ? 'NO-GO' : summary.warn > 0 ? 'CONDITIONAL' : 'GO';
  const overallColor = overallStatus === 'GO' ? '#22C55E' : overallStatus === 'CONDITIONAL' ? '#F59E0B' : '#EF4444';

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#1C1B2E] flex items-center gap-3" style={{ fontFamily: 'var(--font-display)' }}>
              <Rocket className="w-7 h-7 text-[#7C3AED]" />
              Publish Readiness
            </h1>
            <p className="text-[#888] mt-1">7-gate GO/NO-GO checklist</p>
          </div>
          <div className="text-center px-6 py-3 rounded-2xl border-3" style={{ borderColor: overallColor, backgroundColor: overallColor + '15' }}>
            <div className="text-2xl font-black" style={{ color: overallColor, fontFamily: 'var(--font-display)' }}>{overallStatus}</div>
            <div className="text-xs text-[#888]">{summary.pass}/{summary.total} checks passed</div>
          </div>
        </div>

        {/* Summary bar */}
        <div className="card-gigi">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#22C55E]" />
              <span className="font-bold text-[#22C55E]">{summary.pass} Pass</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
              <span className="font-bold text-[#F59E0B]">{summary.warn} Warn</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-[#EF4444]" />
              <span className="font-bold text-[#EF4444]">{summary.fail} Fail</span>
            </div>
          </div>
          <div className="mt-3 h-4 bg-[#E5E5E0] rounded-full overflow-hidden flex">
            <div className="h-full bg-[#22C55E] transition-all" style={{ width: `${(summary.pass / summary.total) * 100}%` }} />
            <div className="h-full bg-[#F59E0B] transition-all" style={{ width: `${(summary.warn / summary.total) * 100}%` }} />
            <div className="h-full bg-[#EF4444] transition-all" style={{ width: `${(summary.fail / summary.total) * 100}%` }} />
          </div>
        </div>

        {/* Gates */}
        {GATES.map((gate, idx) => {
          const gatePass = gate.checks.filter(c => c.status === 'pass').length;
          const gateFail = gate.checks.filter(c => c.status === 'fail').length;
          const gateWarn = gate.checks.filter(c => c.status === 'warn').length;
          const gateStatus = gateFail > 0 ? 'FAIL' : gateWarn > 0 ? 'WARN' : 'PASS';
          const gateColor = gateStatus === 'PASS' ? '#22C55E' : gateStatus === 'WARN' ? '#F59E0B' : '#EF4444';

          return (
            <motion.div
              key={gate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="card-gigi"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: gateColor + '15', color: gateColor }}>
                    {gate.icon}
                  </div>
                  <div>
                    <h2 className="font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{gate.name}</h2>
                    <p className="text-xs text-[#888]">{gate.description}</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: gateColor + '15', color: gateColor }}>
                  {gatePass}/{gate.checks.length}
                </div>
              </div>

              <div className="space-y-2">
                {gate.checks.map((check, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 px-3 rounded-xl bg-[#FAFAF5]">
                    {check.status === 'pass' ? (
                      <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                    ) : check.status === 'warn' ? (
                      <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-[#1C1B2E]">{check.label}</span>
                      {check.note && <p className="text-xs text-[#888] mt-0.5">{check.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </AdminLayout>
  );
}
