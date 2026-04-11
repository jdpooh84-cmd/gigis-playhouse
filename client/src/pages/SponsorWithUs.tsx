/**
 * SponsorWithUs — /sponsor-with-us — Public landing page for potential sponsors
 * 3-tier system: Friend ($49/mo), Supporter ($149/mo), Champion ($399/mo)
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft, Megaphone, Eye, Shield, BarChart3,
  CheckCircle2, Star, Users, Heart, Award, Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const BENEFITS = [
  {
    icon: Eye,
    title: "Premium Visibility",
    description: "Your brand appears throughout the app — on the Sponsors Page, lesson loading screens, and even as an exclusive domain sponsor.",
    color: "bg-blue-500",
  },
  {
    icon: Shield,
    title: "COPPA-Safe Environment",
    description: "All sponsor content is reviewed by our team. No tracking pixels, no behavioral targeting, no data collection from children.",
    color: "bg-green-500",
  },
  {
    icon: Users,
    title: "Engaged Parent Audience",
    description: "Parents actively choose educational content for their K-3 children. Your brand reaches decision-makers in a trusted context.",
    color: "bg-purple-500",
  },
  {
    icon: BarChart3,
    title: "Transparent Reporting",
    description: "Real-time impression and click tracking. Supporter and Champion tiers receive quarterly impact reports with app engagement stats.",
    color: "bg-amber-500",
  },
];

const SPONSOR_TIERS = [
  {
    id: "TIER-FRIEND",
    name: "Friend of Gigi",
    icon: Heart,
    price: "$49",
    annual: "$499",
    period: "/month",
    badgeColor: "text-amber-600 bg-amber-50",
    ringColor: "",
    features: [
      "Logo displayed on the app Sponsors Page",
      "Name listed in the app credits section",
      "Monthly sponsor newsletter mention",
    ],
    maxSponsors: 50,
  },
  {
    id: "TIER-SUPPORTER",
    name: "Learning Supporter",
    icon: Star,
    price: "$149",
    annual: "$1,499",
    period: "/month",
    badgeColor: "text-blue-600 bg-blue-50",
    ringColor: "ring-2 ring-blue-400",
    popular: true,
    features: [
      "Everything in Friend of Gigi tier",
      "Logo on lesson loading screens (non-intrusive, kid-safe)",
      "Featured on Sponsors Page with description and link",
      "Quarterly impact report with engagement stats",
    ],
    maxSponsors: 25,
  },
  {
    id: "TIER-CHAMPION",
    name: "Education Champion",
    icon: Award,
    price: "$399",
    annual: "$3,999",
    period: "/month",
    badgeColor: "text-purple-600 bg-purple-50",
    ringColor: "ring-2 ring-purple-400",
    features: [
      "Everything in Learning Supporter tier",
      "Exclusive domain sponsorship (Math, Science, etc.)",
      "Branded splash card on lesson intros",
      "Logo on app home screen sponsor carousel",
      "Co-branded social media shoutout monthly",
      "Direct line to the founder for partnership ideas",
    ],
    maxSponsors: 6,
    exclusive: true,
  },
];

const DOMAINS = ["Literacy", "Math", "Science", "Social Studies", "Creative Arts", "Life Skills"];

export default function SponsorWithUs() {
  const [formData, setFormData] = useState({
    brand: "",
    contact: "",
    email: "",
    website: "",
    tier: "",
    domain: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted! We'll review and respond within 48 hours.");
    setFormData({ brand: "", contact: "", email: "", website: "", tier: "", domain: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Gigi's Playhouse</span>
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Sponsor Program
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full text-amber-700 text-sm font-medium mb-6">
              <Star className="w-4 h-4" /> Now Accepting Sponsors
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Support Early Childhood{" "}
              <span className="text-amber-500">Education</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "'Lexend', sans-serif" }}>
              Place your brand inside the most trusted K-3 learning app. Three sponsorship tiers
              designed for brands that care about kids, families, and education.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="#apply">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 rounded-2xl shadow-lg shadow-amber-200">
                  Apply Now
                </Button>
              </a>
              <a href="#pricing">
                <Button size="lg" variant="outline" className="font-bold px-8 rounded-2xl">
                  View Tiers
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-12" style={{ fontFamily: "'Nunito', sans-serif" }}>
            How Sponsorship Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "1", title: "Choose a Tier", desc: "Pick Friend, Supporter, or Champion based on your goals and budget." },
              { step: "2", title: "Fill Your Profile", desc: "Provide your company details, logo, and a short description." },
              { step: "3", title: "Select Billing", desc: "Monthly auto-renewal or annual (save ~15%)." },
              { step: "4", title: "Admin Review", desc: "We review for kid-safety compliance within 48 hours." },
              { step: "5", title: "Go Live", desc: "Once approved, your brand appears across the app." },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-black mx-auto mb-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>{item.title}</h3>
                <p className="text-xs text-gray-600" style={{ fontFamily: "'Lexend', sans-serif" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-12" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Why Sponsor With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BENEFITS.map((benefit, i) => (
              <motion.div key={benefit.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="border-0 shadow-sm h-full">
                  <CardContent className="p-6 flex gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${benefit.color}`}>
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>{benefit.title}</h3>
                      <p className="text-sm text-gray-600" style={{ fontFamily: "'Lexend', sans-serif" }}>{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing" className="py-16">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Sponsorship Tiers
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto" style={{ fontFamily: "'Lexend', sans-serif" }}>
            Transparent pricing. All tiers include COPPA compliance review and kid-safe content standards.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SPONSOR_TIERS.map((tier, i) => {
              const TierIcon = tier.icon;
              return (
                <motion.div key={tier.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className={`border-0 shadow-sm h-full relative ${tier.ringColor}`}>
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                        Most Popular
                      </div>
                    )}
                    {tier.exclusive && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <Crown className="w-3 h-3" /> Limited to {tier.maxSponsors}
                      </div>
                    )}
                    <CardContent className="p-6 pt-8">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4 ${tier.badgeColor}`}>
                        <TierIcon className="w-4 h-4" /> {tier.name}
                      </div>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-3xl font-black text-gray-900">{tier.price}</span>
                        <span className="text-gray-500 text-sm">{tier.period}</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-6">or {tier.annual}/year (save ~15%)</p>
                      <ul className="space-y-3 mb-6">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-gray-400 mb-4">Up to {tier.maxSponsors} sponsors per tier</p>
                      <a href="#apply">
                        <Button
                          className={`w-full rounded-xl font-bold ${tier.popular ? "bg-blue-500 hover:bg-blue-600 text-white" : tier.exclusive ? "bg-purple-500 hover:bg-purple-600 text-white" : ""}`}
                          variant={tier.popular || tier.exclusive ? "default" : "outline"}
                        >
                          Get Started
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kid Safety Rules */}
      <section className="py-16 bg-green-50">
        <div className="container max-w-3xl mx-auto text-center">
          <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Our Kid-Safety Promise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[
              "No external links visible to children — parent dashboard only",
              "No flashing animations, loud sounds, or attention-hijacking design",
              "All content reviewed and approved before going live",
              "No data collection from children or targeted advertising",
              "Clearly labeled as 'Sponsored by [Name]' — never disguised",
              "No products inappropriate for children (alcohol, tobacco, etc.)",
              "Parents can toggle sponsor visibility off in settings",
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16">
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Apply to Sponsor
          </h2>
          <p className="text-center text-gray-500 mb-8" style={{ fontFamily: "'Lexend', sans-serif" }}>
            Tell us about your brand. We review every application within 48 hours.
          </p>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Name *</label>
                  <input
                    type="text" required
                    value={formData.brand}
                    onChange={(e) => setFormData((p) => ({ ...p, brand: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                    placeholder="Your company or brand name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Name *</label>
                    <input
                      type="text" required
                      value={formData.contact}
                      onChange={(e) => setFormData((p) => ({ ...p, contact: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                    <input
                      type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                    placeholder="https://yourcompany.com"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Tier *</label>
                    <select
                      required
                      value={formData.tier}
                      onChange={(e) => setFormData((p) => ({ ...p, tier: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white"
                    >
                      <option value="">Select a tier</option>
                      <option value="TIER-FRIEND">Friend of Gigi ($49/mo)</option>
                      <option value="TIER-SUPPORTER">Learning Supporter ($149/mo)</option>
                      <option value="TIER-CHAMPION">Education Champion ($399/mo)</option>
                    </select>
                  </div>
                  {formData.tier === "TIER-CHAMPION" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Domain</label>
                      <select
                        value={formData.domain}
                        onChange={(e) => setFormData((p) => ({ ...p, domain: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white"
                      >
                        <option value="">Select a domain to sponsor</option>
                        {DOMAINS.map((d) => (
                          <option key={d} value={d.toLowerCase().replace(" ", "_")}>{d}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Short Description (150 chars max) *</label>
                  <textarea
                    required rows={3} maxLength={150}
                    value={formData.description}
                    onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 resize-none"
                    placeholder="A brief description of your brand and why it's a good fit for families with K-3 children."
                  />
                  <p className="text-xs text-gray-400 mt-1">{formData.description.length}/150 characters</p>
                </div>
                <Button type="submit" size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-lg shadow-amber-200">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100">
        <div className="container text-center">
          <p className="text-sm text-gray-500" style={{ fontFamily: "'Lexend', sans-serif" }}>
            Gigi's Playhouse is a product of Dreamz In Ink LLC. All sponsor content is reviewed for COPPA compliance.
          </p>
        </div>
      </footer>
    </div>
  );
}
