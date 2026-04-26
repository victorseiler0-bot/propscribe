"use client";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useState } from "react";

const PLANS = [
  {
    name: "Starter",
    price: 10,
    credits: 50,
    perCredit: "0.20",
    description: "Perfect for agents getting started with AI copy.",
    features: [
      "50 property descriptions",
      "All property types",
      "Copy & download outputs",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: 35,
    credits: 200,
    perCredit: "0.175",
    description: "The sweet spot for active real estate professionals.",
    features: [
      "200 property descriptions",
      "All property types & tones",
      "Regeneration included",
      "Priority email support",
      "Saved history (30 days)",
    ],
    cta: "Start with Pro",
    popular: true,
  },
  {
    name: "Business",
    price: 75,
    credits: 500,
    perCredit: "0.15",
    description: "For top producers and agencies with high volume needs.",
    features: [
      "500 property descriptions",
      "All features included",
      "Team collaboration (soon)",
      "Priority phone support",
      "Saved history (unlimited)",
      "Custom tone presets",
    ],
    cta: "Go Business",
    popular: false,
  },
];

export default function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section id="pricing" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-medium text-amber-400 uppercase tracking-[0.15em] mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Pay only for what you use
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Credits never expire. No monthly fees, no subscriptions — just powerful AI copy when you need it.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={cn(
                "relative rounded-2xl border transition-all duration-300",
                plan.popular
                  ? "border-amber-500/40 bg-gradient-to-b from-amber-500/[0.08] to-transparent shadow-[0_0_40px_rgba(245,158,11,0.12)]"
                  : "border-white/[0.08] bg-white/[0.03]",
                hoveredPlan === plan.name && !plan.popular && "border-white/[0.16] bg-white/[0.05]"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-amber-500 text-slate-900 text-xs font-semibold shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <p className="text-slate-400 text-sm font-medium mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                </div>
                <p className="text-slate-500 text-xs mb-1">
                  {plan.credits} credits · ${plan.perCredit}/description
                </p>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">{plan.description}</p>

                <Link href="/generate">
                  <Button
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full mb-8"
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <svg className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M5 8l2.5 2.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-slate-300">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-slate-600 text-sm">
          <span className="flex items-center gap-2">🔒 Secure payments via Stripe</span>
          <span className="flex items-center gap-2">⚡ Instant delivery</span>
          <span className="flex items-center gap-2">♾️ Credits never expire</span>
          <span className="flex items-center gap-2">💳 No subscription required</span>
        </div>
      </div>
    </section>
  );
}
