import { Link } from 'wouter';
import { ArrowLeft, FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <header className="bg-white border-b-2 border-[#E5E5E0] sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <Link href="/landing" className="flex items-center gap-1 text-sm font-bold text-[#7C3AED]"><ArrowLeft className="w-4 h-4" /> Back</Link>
          <span className="font-black text-sm" style={{ fontFamily: 'var(--font-display)' }}>Terms of Service</span>
          <div />
        </div>
      </header>

      <div className="container py-8 max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-[#4361EE]" />
          <h1 className="text-3xl font-black text-[#1C1B2E]" style={{ fontFamily: 'var(--font-display)' }}>Terms of Service</h1>
        </div>
        <p className="text-sm text-[#888] mb-8">Last updated: April 7, 2026</p>

        <div className="space-y-6">
          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>1. Acceptance of Terms</h2>
            <p className="text-sm text-[#555] leading-relaxed">By creating an account on Gigi's Playhouse, you agree to these Terms of Service. You must be at least 18 years old and a parent or legal guardian to create an account. By creating child profiles, you consent to your child's use of the platform under your supervision.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>2. Service Description</h2>
            <p className="text-sm text-[#555] leading-relaxed">Gigi's Playhouse is a K-3 educational platform providing structured daily lessons, interactive quizzes, flashcard practice, and curated YouTube content. The platform is designed for children ages 3-9 under parental supervision. Content covers literacy, math, science, social studies, social-emotional learning, and executive function skills.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>3. Subscription & Billing</h2>
            <p className="text-sm text-[#555] leading-relaxed mb-3">Gigi's Playhouse offers a free tier and paid subscription plans:</p>
            <ul className="list-disc list-inside text-sm text-[#555] space-y-1">
              <li><strong>Free:</strong> 3 lessons per learning path, 5 YouTube channels, 2 child profiles</li>
              <li><strong>Gold ($4.99/mo):</strong> All 540 lessons, unlimited channels, 4 profiles, PDF reports</li>
              <li><strong>Family ($9.99/mo):</strong> Gold features + 8 profiles, family dashboard</li>
              <li><strong>Co-op ($19.99/mo):</strong> Family features + 30 profiles, admin tools</li>
            </ul>
            <p className="text-sm text-[#555] leading-relaxed mt-3">All paid plans include a 7-day free trial. You may cancel at any time. Refunds are available within 30 days of purchase.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>4. YouTube Content</h2>
            <p className="text-sm text-[#555] leading-relaxed">Gigi's Playhouse curates and embeds YouTube videos but does not host video content. Parents are responsible for reviewing and approving YouTube channels. While we pre-load educational channels, we cannot guarantee all content on third-party channels remains appropriate. Parents can report concerns and remove channels at any time.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>5. Intellectual Property</h2>
            <p className="text-sm text-[#555] leading-relaxed">All lesson content, quizzes, flashcards, and original materials are the intellectual property of Gigi's Playhouse. Users may not reproduce, distribute, or commercially use any content without written permission. Compliance reports generated for personal homeschool use are exempt.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>6. Account Termination</h2>
            <p className="text-sm text-[#555] leading-relaxed">We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or misuse the platform. Parents may delete their account and all associated data at any time through the Settings page.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>7. Limitation of Liability</h2>
            <p className="text-sm text-[#555] leading-relaxed">Gigi's Playhouse is provided "as is" without warranties of any kind. We are not liable for any damages arising from use of the platform. Educational content is supplementary and does not replace formal schooling or professional educational assessment.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>8. Contact</h2>
            <p className="text-sm text-[#555] leading-relaxed">For questions about these terms, contact us at <strong>legal@gigisplayhouse.app</strong>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
