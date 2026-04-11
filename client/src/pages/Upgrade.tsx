import { Link, useLocation } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { motion } from 'framer-motion';
import { Check, Crown, Users, Building2, ArrowLeft, Zap, Shield, BookOpen, Tv, FileText, Star, Loader2 } from 'lucide-react';
import AffiliateLink from '@/components/AffiliateLink';
import { toast } from 'sonner';
import { useState } from 'react';

const PLANS = [
  {
    id: 'gold_monthly' as const,
    planGroup: 'gold',
    name: 'Gold',
    price: '$18.99',
    period: '/month',
    annual: '$35.99/year (save 84%)',
    annualKey: 'gold_annual',
    icon: Crown,
    color: '#FBBF24',
    popular: true,
    features: [
      'All 540 lessons across 6 domains',
      'Unlimited flashcards & quizzes',
      'Unlimited YouTube channels',
      'PDF compliance reports',
      'Up to 4 child profiles',
      'Priority support',
    ],
  },
  {
    id: 'family' as const,
    planGroup: 'family',
    name: 'Family',
    price: '$45.99',
    period: '/month',
    annual: '',
    annualKey: '',
    icon: Users,
    color: '#7C3AED',
    popular: false,
    features: [
      'Everything in Gold',
      'Up to 8 child profiles',
      'Family progress dashboard',
      'Shared channel library',
      'Multi-device sync',
      'Early access to new content',
    ],
  },
  {
    id: 'coop' as const,
    planGroup: 'coop',
    name: 'Co-op',
    price: '$59.99',
    period: '/month',
    annual: '',
    annualKey: '',
    icon: Building2,
    color: '#4361EE',
    popular: false,
    features: [
      'Everything in Family',
      'Up to 30 child profiles',
      'Admin dashboard for co-op leaders',
      'Group compliance reporting',
      'Custom learning paths',
      'Dedicated support channel',
    ],
  },
];

export default function Upgrade() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const planType = (user as any)?.planType || 'free';
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const createCheckout = trpc.stripe.createCheckout.useMutation();

  const handleUpgrade = async (planKey: string) => {
    if (!isAuthenticated) { navigate('/signup'); return; }

    // Co-op plan is not yet available
    if (planKey === 'coop') {
      toast.info('Co-op plan coming soon! Contact us for group pricing.');
      return;
    }

    setLoadingPlan(planKey);
    try {
      const { url } = await createCheckout.mutateAsync({
        planKey: planKey as "gold_monthly" | "gold_annual" | "family",
        origin: window.location.origin,
      });
      toast.info('Redirecting to checkout...');
      window.open(url, '_blank');
    } catch (err: any) {
      toast.error(err.message || 'Failed to start checkout');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <header className="bg-white border-b-2 border-[#E5E5E0] sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <Link href={isAuthenticated ? '/dashboard' : '/landing'} className="flex items-center gap-1 text-sm font-bold text-[#7C3AED]"><ArrowLeft className="w-4 h-4" /> Back</Link>
          <span className="font-black text-sm" style={{ fontFamily: 'var(--font-display)' }}>Choose Your Plan</span>
          <div />
        </div>
      </header>

      <div className="container py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Unlock the Full Playhouse
          </h1>
          <p className="text-lg text-[#555] max-w-lg mx-auto">Every plan includes a 7-day free trial. Cancel anytime, no questions asked.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-gigi !bg-[#F5F5F0] mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-[#888]" />
            <h3 className="font-black text-lg" style={{ fontFamily: 'var(--font-display)' }}>Free Plan {planType === 'free' ? '(Current)' : ''}</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#888]" /> 3 lessons/path</div>
            <div className="flex items-center gap-2"><Tv className="w-4 h-4 text-[#888]" /> 5 channels max</div>
            <div className="flex items-center gap-2"><Users className="w-4 h-4 text-[#888]" /> 2 children</div>
            <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#888]" /> No PDF export</div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => {
            const isCurrentPlan = planType === plan.planGroup;
            return (
              <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.1 }} className={`card-gigi relative ${plan.popular ? '!border-[#FBBF24] ring-2 ring-[#FBBF24]/30' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FBBF24] text-[#1C1B2E] text-xs font-black px-4 py-1 rounded-full" style={{ fontFamily: 'var(--font-display)' }}>
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6 pt-2">
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: plan.color + '20' }}>
                    <plan.icon className="w-7 h-7" style={{ color: plan.color }} />
                  </div>
                  <h3 className="text-xl font-black" style={{ fontFamily: 'var(--font-display)', color: plan.color }}>{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{plan.price}</span>
                    <span className="text-sm text-[#888]">{plan.period}</span>
                  </div>
                  {plan.annual && <p className="text-xs text-[#888] mt-1">or {plan.annual}</p>}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm"><Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: plan.color }} />{f}</li>
                  ))}
                </ul>
                <div className="space-y-2">
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={isCurrentPlan || loadingPlan === plan.id}
                    className="btn-gigi w-full !text-sm flex items-center justify-center gap-2"
                    style={isCurrentPlan ? { opacity: 0.5 } : { backgroundColor: plan.color }}
                  >
                    {loadingPlan === plan.id && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isCurrentPlan ? 'Current Plan' : 'Start Free Trial'}
                  </button>
                  {plan.annualKey && !isCurrentPlan && (
                    <button
                      onClick={() => handleUpgrade(plan.annualKey)}
                      disabled={loadingPlan === plan.annualKey}
                      className="w-full text-xs text-center py-2 text-[#888] hover:text-[#555] transition-colors flex items-center justify-center gap-1"
                    >
                      {loadingPlan === plan.annualKey && <Loader2 className="w-3 h-3 animate-spin" />}
                      or save with annual billing
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="max-w-md mx-auto mt-10">
          <AffiliateLink placement="upgrade_page" maxLinks={2} />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-[#888]">
          <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#22C55E]" /> COPPA Compliant</div>
          <div className="flex items-center gap-2"><Star className="w-4 h-4 text-[#FBBF24]" /> 7-Day Free Trial</div>
          <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#7C3AED]" /> Cancel Anytime</div>
        </div>
      </div>
    </div>
  );
}
