/**
 * About Page — Founder story, Poole Method™, Dreamz In Ink LLC
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Heart, BookOpen, Brain, Users, Sparkles, GraduationCap, Mail, FileText } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-lg font-black" style={{ fontFamily: "'Nunito', sans-serif" }}>About Gigi's Playhouse</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 text-center" style={{ background: "linear-gradient(135deg, #FFF8E1 0%, #FFF3E0 50%, #FCE4EC 100%)" }}>
        <motion.div {...fadeUp} className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-bold mb-6">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Built From Our Home.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              For Yours.
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Lexend', sans-serif" }}>
            Gigi's Playhouse was born from a real family's real need — a safe, structured, 
            joyful learning space that works the way children actually learn.
          </p>
        </motion.div>
      </section>

      {/* Founder Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="bg-white rounded-3xl border-2 border-gray-100 shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl shrink-0 shadow-lg">
                <GraduationCap className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Justin Poole, MBA, MS
                </h3>
                <p className="text-purple-600 font-bold text-sm mb-4">Founder & Creator of The Poole Method™</p>
                <div className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "'Lexend', sans-serif" }}>
                  <p>
                    Justin Poole is a father, educator, and entrepreneur who built Gigi's Playhouse 
                    after watching his own children struggle with screen time that taught nothing and 
                    educational apps that felt like homework. He holds an MBA and an MS, and brings 
                    years of experience in education technology and curriculum design.
                  </p>
                  <p>
                    Together with his wife Rachel, Justin developed The Poole Method™ — a structured 
                    approach to early childhood learning that combines proven educational research with 
                    the reality of how modern families actually live. The method was tested first in 
                    their own home, with their own children, before becoming the foundation of Gigi's Playhouse.
                  </p>
                  <p>
                    Gigi's Playhouse is published by <strong>Dreamz In Ink LLC</strong>, the Poole family's 
                    education technology company dedicated to making high-quality learning accessible to every family.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Poole Method™ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-bold mb-4">
              The Poole Method™
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
              5 Principles That Guide Everything
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POOLE_PRINCIPLES.map((principle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-white"
                  style={{ background: principle.color }}
                >
                  <principle.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {principle.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "'Lexend', sans-serif" }}>
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Built Different Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Built Different
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto" style={{ fontFamily: "'Lexend', sans-serif" }}>
              What makes Gigi's Playhouse fundamentally different from every other learning app.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {BUILT_DIFFERENT.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "'Lexend', sans-serif" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Positioning Table */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
              How We Compare
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                  <th className="text-left p-4 font-bold">Feature</th>
                  <th className="text-center p-4 font-bold">Gigi's</th>
                  <th className="text-center p-4 font-bold">Khan Kids</th>
                  <th className="text-center p-4 font-bold">ABCmouse</th>
                  <th className="text-center p-4 font-bold">YouTube Kids</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="p-4 text-center">{row.gigis ? "✅" : "❌"}</td>
                    <td className="p-4 text-center">{row.khan ? "✅" : "❌"}</td>
                    <td className="p-4 text-center">{row.abc ? "✅" : "❌"}</td>
                    <td className="p-4 text-center">{row.ytk ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Contact / Footer */}
      <section className="py-16 px-4 text-center" style={{ background: "linear-gradient(135deg, #F3E5F5 0%, #FFF3E0 100%)" }}>
        <motion.div {...fadeUp} className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Get In Touch
          </h2>
          <p className="text-gray-600 mb-6" style={{ fontFamily: "'Lexend', sans-serif" }}>
            Questions, partnerships, or just want to say hi? We'd love to hear from you.
          </p>
          <a
            href="mailto:hello@gigisplayhouse.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition-colors shadow-lg"
          >
            <Mail className="w-5 h-5" />
            hello@gigisplayhouse.com
          </a>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-purple-600 transition-colors flex items-center gap-1">
              <FileText className="w-4 h-4" />
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-purple-600 transition-colors flex items-center gap-1">
              <FileText className="w-4 h-4" />
              Terms of Service
            </Link>
          </div>
          <p className="mt-8 text-xs text-gray-400">
            Dreamz In Ink LLC — "Built from lived experience, not theory."
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Gigi Character IP: GIGI-FND-PX002 | The Poole Method™
          </p>
        </motion.div>
      </section>
    </div>
  );
}

const POOLE_PRINCIPLES = [
  {
    title: "Structure Before Freedom",
    description: "Children thrive when they know what comes next. Every lesson follows the same Watch → Do → Apply → Reflect pattern so kids feel safe to explore.",
    icon: BookOpen,
    color: "linear-gradient(135deg, #7C3AED, #9333EA)",
  },
  {
    title: "Mastery Over Speed",
    description: "No rushing through content. Children advance only when they've truly understood — not when they've simply clicked through. The 5-phase micro-step system ensures deep learning.",
    icon: Brain,
    color: "linear-gradient(135deg, #F59E0B, #D97706)",
  },
  {
    title: "Parent as Partner",
    description: "Parents aren't locked out. They choose the channels, set the pace, track compliance, and get alerts. This is a partnership between the app and the family.",
    icon: Users,
    color: "linear-gradient(135deg, #10B981, #059669)",
  },
  {
    title: "Joy as Fuel",
    description: "Learning should feel like play. Characters celebrate wins, movement breaks prevent burnout, and the YouTube hub rewards focused learning with safe entertainment.",
    icon: Heart,
    color: "linear-gradient(135deg, #EC4899, #DB2777)",
  },
  {
    title: "Every Child is Different",
    description: "ADHD-friendly design, 17 language options, ASL integration, movement breaks, short day mode — because no two learners are the same.",
    icon: Sparkles,
    color: "linear-gradient(135deg, #3B82F6, #2563EB)",
  },
];

const BUILT_DIFFERENT = [
  {
    emoji: "🏠",
    title: "Born in a Real Home",
    description: "Not a Silicon Valley lab. Gigi's was built by parents who homeschool their own children. Every feature solves a problem we actually had.",
  },
  {
    emoji: "📺",
    title: "YouTube, But Safe",
    description: "No other learning app includes a parent-curated YouTube hub. Kids watch only approved channels — no search, no ads, no rabbit holes.",
  },
  {
    emoji: "📋",
    title: "Compliance Built In",
    description: "Homeschool families need records. Gigi's tracks hours per domain, generates PDF reports, and keeps a complete compliance log — automatically.",
  },
];

const COMPARISON_DATA = [
  { feature: "Structured K-3 Curriculum", gigis: true, khan: true, abc: true, ytk: false },
  { feature: "Parent-Curated YouTube Hub", gigis: true, khan: false, abc: false, ytk: false },
  { feature: "ADHD-Friendly Design", gigis: true, khan: false, abc: false, ytk: false },
  { feature: "Homeschool Compliance Logs", gigis: true, khan: false, abc: false, ytk: false },
  { feature: "17 Language Support", gigis: true, khan: false, abc: false, ytk: true },
  { feature: "ASL Integration", gigis: true, khan: false, abc: false, ytk: false },
  { feature: "Movement Breaks", gigis: true, khan: false, abc: false, ytk: false },
  { feature: "Free Forever Tier", gigis: true, khan: true, abc: false, ytk: true },
  { feature: "No Ads in Child View", gigis: true, khan: true, abc: false, ytk: false },
  { feature: "Spaced Repetition Flashcards", gigis: true, khan: false, abc: false, ytk: false },
  { feature: "PDF Report Export", gigis: true, khan: false, abc: false, ytk: false },
];
