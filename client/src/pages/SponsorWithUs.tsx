/**
 * SponsorWithUs — /sponsor-with-us — Public landing page for potential sponsors
 * "Playroom Canvas" design — Bold, chunky, kid-friendly
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft, Megaphone, Eye, Shield, BarChart3,
  CheckCircle2, Star, Users, Zap, Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const BENEFITS = [
  {
    icon: Eye,
    title: "Premium Visibility",
    description: "Your brand appears as a curated SponsorCard inside the YouTube Channel Hub — the most-visited section of the app.",
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
    description: "Real-time impression counts, cap utilization, and monthly reports. No hidden metrics — you see exactly what you get.",
    color: "bg-amber-500",
  },
];

const PRICING_TIERS = [
  {
    name: "Starter",
    price: "$199",
    period: "/month",
    impressions: "5,000",
    features: ["1 SponsorCard", "Basic analytics", "Monthly report", "Email support"],
  },
  {
    name: "Growth",
    price: "$499",
    period: "/month",
    impressions: "15,000",
    features: ["2 SponsorCards", "Advanced analytics", "Weekly report", "Priority support", "A/B testing"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    impressions: "Unlimited",
    features: ["Unlimited SponsorCards", "Real-time dashboard", "Dedicated manager", "Custom integrations", "Quarterly reviews"],
  },
];

export default function SponsorWithUs() {
  const [formData, setFormData] = useState({
    brand: "",
    contact: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted! We'll review and respond within 2 business days.");
    setFormData({ brand: "", contact: "", email: "", message: "" });
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full text-amber-700 text-sm font-medium mb-6">
              <Star className="w-4 h-4" /> Now Accepting Sponsors
            </div>
            <h1
              className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Reach Families Who Care About{" "}
              <span className="text-amber-500">Education</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "'Lexend', sans-serif" }}>
              Place your brand inside the most trusted K-3 learning app. Our SponsorCard system
              ensures your message reaches parents in a COPPA-compliant, child-safe environment.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="#apply">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 rounded-2xl shadow-lg shadow-amber-200">
                  Apply Now
                </Button>
              </a>
              <a href="#pricing">
                <Button size="lg" variant="outline" className="font-bold px-8 rounded-2xl">
                  View Pricing
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Apply & Get Approved", desc: "Submit your brand details. Our team reviews every application to ensure alignment with our family-friendly values." },
              { step: "2", title: "Create Your SponsorCard", desc: "Design a compelling card with your headline, body text, and call-to-action. We'll help optimize for engagement." },
              { step: "3", title: "Reach Families", desc: "Your SponsorCard appears in the YouTube Channel Hub. Track impressions and engagement in real-time." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl font-black mx-auto mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>{item.title}</h3>
                <p className="text-sm text-gray-600" style={{ fontFamily: "'Lexend', sans-serif" }}>{item.desc}</p>
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
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
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

      {/* Pricing */}
      <section id="pricing" className="py-16">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Sponsorship Pricing
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto" style={{ fontFamily: "'Lexend', sans-serif" }}>
            Transparent pricing with no hidden fees. All plans include COPPA compliance and content review.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`border-0 shadow-sm h-full relative ${tier.popular ? "ring-2 ring-amber-400" : ""}`}>
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>{tier.name}</h3>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-black text-gray-900">{tier.price}</span>
                      <span className="text-gray-500 text-sm">{tier.period}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">Up to {tier.impressions} impressions/month</p>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a href="#apply">
                      <Button
                        className={`w-full rounded-xl font-bold ${tier.popular ? "bg-amber-500 hover:bg-amber-600 text-white" : ""}`}
                        variant={tier.popular ? "default" : "outline"}
                      >
                        Get Started
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 bg-gray-50">
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Apply to Sponsor
          </h2>
          <p className="text-center text-gray-500 mb-8" style={{ fontFamily: "'Lexend', sans-serif" }}>
            Tell us about your brand. We review every application within 2 business days.
          </p>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData((p) => ({ ...p, brand: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                    placeholder="Your company or brand name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Name</label>
                    <input
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData((p) => ({ ...p, contact: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tell Us About Your Brand</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 resize-none"
                    placeholder="What does your brand do? Why is it a good fit for families with K-3 children?"
                  />
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
