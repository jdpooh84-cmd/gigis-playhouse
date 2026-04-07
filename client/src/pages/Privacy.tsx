import { Link } from 'wouter';
import { ArrowLeft, Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <header className="bg-white border-b-2 border-[#E5E5E0] sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <Link href="/landing" className="flex items-center gap-1 text-sm font-bold text-[#7C3AED]"><ArrowLeft className="w-4 h-4" /> Back</Link>
          <span className="font-black text-sm" style={{ fontFamily: 'var(--font-display)' }}>Privacy Policy</span>
          <div />
        </div>
      </header>

      <div className="container py-8 max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-[#22C55E]" />
          <h1 className="text-3xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>Privacy Policy</h1>
        </div>
        <p className="text-sm text-[#888] mb-8">Last updated: April 7, 2026</p>

        <div className="prose max-w-none space-y-6">
          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>1. COPPA Compliance</h2>
            <p className="text-sm text-[#555] leading-relaxed">Gigi's Playhouse is fully compliant with the Children's Online Privacy Protection Act (COPPA). We do not collect personal information from children under 13. All accounts are created and managed by parents or legal guardians. Children interact with the platform through parent-controlled profiles that contain only a display name and avatar emoji — no real names, photos, or identifying information.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>2. Information We Collect</h2>
            <p className="text-sm text-[#555] leading-relaxed mb-3">From parents/guardians only:</p>
            <ul className="list-disc list-inside text-sm text-[#555] space-y-1">
              <li>Email address (for account creation and communication)</li>
              <li>Payment information (processed securely by Stripe — we never store card details)</li>
              <li>Child profile preferences (display name, age range, learning preferences)</li>
              <li>YouTube channel selections</li>
            </ul>
            <p className="text-sm text-[#555] leading-relaxed mt-3">From children's usage (anonymized):</p>
            <ul className="list-disc list-inside text-sm text-[#555] space-y-1">
              <li>Lesson completion status</li>
              <li>Quiz scores (for adaptive learning)</li>
              <li>Flashcard review progress</li>
              <li>Time spent per session (for compliance reporting)</li>
            </ul>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>3. YouTube Integration</h2>
            <p className="text-sm text-[#555] leading-relaxed">Videos are embedded using YouTube's privacy-enhanced mode (youtube-nocookie.com). This means YouTube does not set tracking cookies on your child's device. Children cannot search YouTube, access comments, or navigate away from parent-approved channels. No YouTube viewing data is shared with third parties.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>4. Data Security</h2>
            <p className="text-sm text-[#555] leading-relaxed">All data is encrypted in transit (TLS 1.3) and at rest. We use Supabase with Row Level Security (RLS) to ensure parents can only access their own family's data. Payment processing is handled entirely by Stripe with PCI DSS compliance. We conduct regular security audits and maintain SOC 2 compliance.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>5. Data Retention & Deletion</h2>
            <p className="text-sm text-[#555] leading-relaxed">Parents can request complete deletion of all family data at any time through the Settings page or by contacting support. Upon account deletion, all data is permanently removed within 30 days. Compliance logs can be exported before deletion for homeschool record-keeping.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>6. Third-Party Services</h2>
            <ul className="list-disc list-inside text-sm text-[#555] space-y-1">
              <li><strong>Supabase</strong> — Database and authentication</li>
              <li><strong>Stripe</strong> — Payment processing</li>
              <li><strong>YouTube</strong> — Video content (privacy-enhanced mode)</li>
              <li><strong>Resend</strong> — Transactional emails to parents only</li>
            </ul>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>7. Contact Us</h2>
            <p className="text-sm text-[#555] leading-relaxed">For privacy concerns or data requests, contact us at <strong>privacy@gigisplayhouse.app</strong>. We respond to all COPPA-related inquiries within 48 hours.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
