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
    name: "Gigi's Gold",
    subtitle: 'Full learning experience',
    price: '$7.99',
    period: '/mo',
    annualPrice: '$59.99',
    annualPeriod: '/year',
    annualPerMonth: '$5.00',
    annualKey: 'gold_annual' as const,
    icon: Crown,
    color: '#FBBF24',
    popular: true,
    features: [
      '540 lessons, all domains',
      'Unlimited YouTube channels',
      '1 child profile',
      '17 languages',
      'PDF compliance exports',
      'All flashcards',
    ],
  },
  {
    id: 'family_monthly' as const,
    planGroup: 'family',
    name: 'Family Plan',
    subtitle: 'For families with multiple kids',
    price: '$12.99',
    period: '/mo',
    annualPrice: '$99.99',
    annualPeriod: '/year',
    annualPerMonth: '$8.33',
    annualKey: 'family_annual' as const,
    icon: Users,
    color: '#EC4899',
    popular: false,
    features: [
      'Everything in Gold',
      'Up to 5 child profiles',
      'Individual progress tracking',
      'Family compliance dashboard',
    ],
  },
  {
    id: 'coop' as const,
    planGroup: 'coop',
    name: 'Co-op',
    subtitle: 'For homeschool groups',
    price: 'Contact Us',
    period: '',
    annualPrice: '',
    annualPeriod: '',
    annualPerMonth: '',
    annualKey: '' as const,
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
  const [showAnnual, setShowAnnual] = useState(true);
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
        planKey: planKey as "gold_monthly" | "gold_annual" | "family_monthly" | "family_annual",
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Unlock the Full Playhouse
          </h1>
          <p className="text-lg text-[#555] max-w-lg mx-auto mb-6">Every plan includes a 7-day free trial. Cancel anytime, no questions asked.</p>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
            <span className={`text-sm font-semibold ${!showAnnual ? 'text-[#1C1B2E]' : 'text-[#888]'}`}>Monthly</span>
            <button
              onClick={() => setShowAnnual(!showAnnual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${showAnnual ? 'bg-[#7C3AED]' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${showAnnual ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
            <span className={`text-sm font-semibold ${showAnnual ? 'text-[#1C1B2E]' : 'text-[#888]'}`}>Annual</span>
            {showAnnual && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Save 33%</span>}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-gigi !bg-[#F5F5F0] mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-[#888]" />
            <h3 className="font-black text-lg" style={{ fontFamily: 'var(--font-display)' }}>Free Forever {planType === 'free' ? '(Current)' : ''}</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#888]" /> 3 lessons/path</div>
            <div className="flex items-center gap-2"><Tv className="w-4 h-4 text-[#888]" /> 5 channels max</div>
            <div className="flex items-center gap-2"><Users className="w-4 h-4 text-[#888]" /> 1 child profile</div>
            <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#888]" /> Basic flashcards</div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => {
            const isCurrentPlan = planType === plan.planGroup;
            const isCoop = plan.id === 'coop';
            const displayPrice = showAnnual && plan.annualPerMonth ? plan.annualPerMonth : plan.price;
            const displayPeriod = isCoop ? '' : '/mo';
            const billingNote = showAnnual && plan.annualPrice ? `${plan.annualPrice} billed annually` : '';
            const checkoutKey = showAnnual && plan.annualKey ? plan.annualKey : plan.id;

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
                  <p className="text-xs text-[#888] mt-0.5">{plan.subtitle}</p>
                  <div className="mt-2">
                    <span className="text-3xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>{displayPrice}</span>
                    {displayPeriod && <span className="text-sm text-[#888]">{displayPeriod}</span>}
                  </div>
                  {billingNote && <p className="text-xs text-green-600 font-medium mt-1">{billingNote}</p>}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm"><Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: plan.color }} />{f}</li>
                  ))}
                </ul>
                <div className="space-y-2">
                  <button
                    onClick={() => handleUpgrade(isCoop ? 'coop' : checkoutKey)}
                    disabled={isCurrentPlan || (loadingPlan === checkoutKey)}
                    className="btn-gigi w-full !text-sm flex items-center justify-center gap-2"
                    style={isCurrentPlan ? { opacity: 0.5 } : { backgroundColor: plan.color }}
                  >
                    {loadingPlan === checkoutKey && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isCurrentPlan ? 'Current Plan' : isCoop ? 'Contact Us' : 'Start 7-Day Free Trial'}
                  </button>
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
