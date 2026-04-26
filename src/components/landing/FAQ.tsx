"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "What is a credit?",
    a: "One credit = one property description generation. Each time you click 'Generate Description', one credit is deducted from your account. Regenerating also costs one credit.",
  },
  {
    q: "Do credits expire?",
    a: "No. Your credits never expire. Buy them when you need them, use them at your own pace.",
  },
  {
    q: "How good is the AI output?",
    a: "PropScribe uses GPT-4, the most advanced language model available, with a carefully engineered prompt specifically trained for real estate copy. Most agents use the output as-is or with minor tweaks.",
  },
  {
    q: "Can I edit the generated descriptions?",
    a: "Absolutely. After generating, you can manually edit the text directly in the output area before copying or downloading.",
  },
  {
    q: "What property types are supported?",
    a: "PropScribe supports residential (single-family, condo, townhouse, multi-family), commercial, land/lot, vacation rentals, and luxury properties.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We use Supabase for secure authentication and data storage. We never sell your data to third parties, and your generated descriptions are stored privately in your account.",
  },
  {
    q: "Can I use PropScribe for commercial properties?",
    a: "Yes! The form includes commercial property options, and the AI adapts its tone and content accordingly for commercial and investment listings.",
  },
  {
    q: "Do you offer refunds?",
    a: "If you're unsatisfied with the quality of your first 5 generations, we offer a full refund within 7 days of purchase. Contact us at support@propscribe.ai.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-medium text-amber-400 uppercase tracking-[0.15em] mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Common questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl border transition-all duration-200 overflow-hidden",
                open === i
                  ? "border-amber-500/30 bg-amber-500/[0.04]"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
              )}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className={cn("text-sm font-medium", open === i ? "text-white" : "text-slate-300")}>
                  {faq.q}
                </span>
                <span className={cn("shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all", open === i ? "border-amber-500/50 text-amber-400 rotate-45" : "border-white/[0.12] text-slate-500")}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
