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
        <p className="text-sm text-[#888] mb-8">Last updated: April 11, 2026</p>

        <div className="space-y-6">
          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>1. Acceptance of Terms</h2>
            <p className="text-sm text-[#555] leading-relaxed">By creating an account on Gigi's Playhouse ("the Platform"), you ("Parent," "Guardian," or "User") agree to be bound by these Terms of Service ("Terms"). You must be at least 18 years of age and the parent or legal guardian of any child for whom you create a profile. By creating child profiles, you provide verifiable parental consent for your child's use of the Platform under your supervision, in accordance with the Children's Online Privacy Protection Act (COPPA).</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>2. Nature of Services</h2>
            <p className="text-sm text-[#555] leading-relaxed mb-3">Gigi's Playhouse is a supplemental learning platform that provides guided learning experiences, interactive activities, flashcard practice, and curated video content for children ages 3–9. The Platform covers six learning domains: literacy, math, science, social studies, creative arts, and life skills.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-3">
              <p className="text-sm text-amber-800 font-semibold mb-1">Important Disclaimer</p>
              <p className="text-sm text-amber-700 leading-relaxed">This platform provides supplemental learning experiences and is not a substitute for accredited education, formal schooling, or state-approved homeschooling programs. The content provided does not constitute an accredited curriculum, and completion of activities on this Platform does not confer academic credit, diplomas, certificates, or any form of educational accreditation. Parents and guardians remain solely responsible for ensuring compliance with their state or jurisdiction's educational requirements.</p>
            </div>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>3. The Poole Method™</h2>
            <p className="text-sm text-[#555] leading-relaxed">The Poole Method™ is a proprietary framework developed by Dreamz In Ink LLC that guides the structure and sequencing of learning experiences on the Platform. The Poole Method™ is informed by educational research but has not been independently validated by a third-party academic institution. References to "research-backed" or "proven" approaches describe the educational principles that informed the method's design, not the results of controlled clinical studies of the Platform itself.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>4. Subscription & Billing</h2>
            <p className="text-sm text-[#555] leading-relaxed mb-3">Gigi's Playhouse offers a free tier and paid subscription plans:</p>
            <ul className="list-disc list-inside text-sm text-[#555] space-y-1">
              <li><strong>Free:</strong> Limited learning experiences, 5 YouTube channels, 2 child profiles</li>
              <li><strong>Gold ($9.99/mo or $79.99/yr):</strong> Full access to all learning experiences, unlimited channels, enhanced features</li>
              <li><strong>Family ($14.99/mo):</strong> Gold features for up to 4 children, family dashboard</li>
            </ul>
            <p className="text-sm text-[#555] leading-relaxed mt-3">All paid plans include a 7-day free trial. You may cancel at any time through your account settings or by contacting support. Cancellation takes effect at the end of the current billing period. Refund requests within 30 days of initial purchase may be submitted to our support team.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>5. YouTube Content & Third-Party Services</h2>
            <p className="text-sm text-[#555] leading-relaxed">The Platform enables parents to curate and approve YouTube channels for their children to view within the app. Gigi's Playhouse embeds YouTube content via the YouTube API but does not host, control, or guarantee the content of third-party videos. Parents are solely responsible for reviewing and approving channels. While we may suggest educational channels, we make no warranty that third-party content will remain appropriate, accurate, or available. Parents may report concerns and remove channels at any time.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>6. Compliance Tracking</h2>
            <p className="text-sm text-[#555] leading-relaxed">The Platform provides tools to help parents track learning activity, including time-per-domain logs and exportable reports. These tools are provided as a convenience to assist with record-keeping. Gigi's Playhouse does not guarantee that these records will satisfy the specific compliance requirements of any state, school district, or regulatory body. Parents are responsible for verifying that their documentation meets applicable legal requirements.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>7. Children's Privacy (COPPA Compliance)</h2>
            <p className="text-sm text-[#555] leading-relaxed">Gigi's Playhouse is designed to comply with the Children's Online Privacy Protection Act (COPPA). We do not collect personal information from children under 13 without verifiable parental consent. Child profiles are created and managed exclusively by the parent or guardian. We do not serve behavioral advertising to children, and we do not share children's data with third parties for marketing purposes. Parents may review, modify, or delete their child's data at any time through the Settings page. Data is retained for a maximum of 24 months after account inactivity, after which it is permanently deleted.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>8. Intellectual Property</h2>
            <p className="text-sm text-[#555] leading-relaxed">All original learning content, activities, quizzes, flashcards, character designs (including Gigi and associated characters), The Poole Method™, and related materials are the intellectual property of Dreamz In Ink LLC. Users may not reproduce, distribute, modify, or commercially use any Platform content without prior written permission. Personal compliance reports generated for homeschool record-keeping are exempt from this restriction.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>9. Limitation of Liability</h2>
            <p className="text-sm text-[#555] leading-relaxed">THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. DREAMZ IN INK LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM. THE LEARNING EXPERIENCES PROVIDED ARE SUPPLEMENTAL IN NATURE AND DO NOT REPLACE PROFESSIONAL EDUCATIONAL ASSESSMENT, SPECIAL EDUCATION SERVICES, OR ACCREDITED INSTRUCTION.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>10. ADHD & Accessibility Features</h2>
            <p className="text-sm text-[#555] leading-relaxed">The Platform includes design features intended to support children with attention differences, including movement breaks, short day mode, and structured activity flow. These features are informed by general best practices for inclusive design and are not a substitute for professional diagnosis, therapy, or individualized education programs (IEPs). If your child has been diagnosed with ADHD or another learning difference, consult with their healthcare provider or educational specialist regarding appropriate interventions.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>11. Account Termination</h2>
            <p className="text-sm text-[#555] leading-relaxed">We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or misuse the Platform. Parents may delete their account and all associated data at any time through the Settings page. Upon account deletion, all personal data and child profiles will be permanently removed within 30 days.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>12. Modifications to Terms</h2>
            <p className="text-sm text-[#555] leading-relaxed">We may update these Terms from time to time. Material changes will be communicated via email or in-app notification at least 14 days before taking effect. Continued use of the Platform after changes take effect constitutes acceptance of the updated Terms.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>13. Governing Law</h2>
            <p className="text-sm text-[#555] leading-relaxed">These Terms shall be governed by and construed in accordance with the laws of the State of Virginia, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the courts of the Commonwealth of Virginia.</p>
          </section>

          <section className="card-gigi">
            <h2 className="font-black text-lg text-[#1C1B2E] mb-3" style={{ fontFamily: 'var(--font-display)' }}>14. Contact</h2>
            <p className="text-sm text-[#555] leading-relaxed">For questions about these Terms, contact us at:</p>
            <p className="text-sm text-[#555] leading-relaxed mt-2">
              <strong>Dreamz In Ink LLC</strong><br />
              Email: <strong>legal@gigisplayhouse.app</strong>
            </p>
          </section>
        </div>

        <div className="mt-8 mb-12 text-center">
          <p className="text-xs text-[#AAA]">
            This platform provides supplemental learning experiences and is not a substitute for accredited education or homeschooling programs.
          </p>
        </div>
      </div>
    </div>
  );
}
