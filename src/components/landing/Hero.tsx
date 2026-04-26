"use client";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";

const DEMO_WORDS = [
  "Captivating Listings",
  "Perfect Descriptions",
  "Compelling Narratives",
  "Powerful Copy",
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % DEMO_WORDS.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-amber-500/[0.06] rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-teal-500/[0.04] rounded-full blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/[0.08] text-amber-400 text-xs font-medium mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Powered by GPT-4 · Trusted by 1,200+ agents
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6">
          Generate{" "}
          <span
            className="gradient-text transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {DEMO_WORDS[wordIndex]}
          </span>
          <br />
          <span className="text-slate-300 font-light">in Seconds.</span>
        </h1>

        {/* Sub */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Transform raw property details into captivating narratives that engage
          buyers, close deals faster, and set you apart from the competition.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/generate">
            <Button variant="primary" size="lg" className="min-w-[200px]">
              Generate Free Description
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="secondary" size="lg" className="min-w-[160px]">
              See How It Works
            </Button>
          </a>
        </div>

        {/* Social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
          {[
            { icon: "⚡", text: "Results in under 10 seconds" },
            { icon: "✦", text: "No prompt engineering needed" },
            { icon: "🔒", text: "Your data is private" },
          ].map((item) => (
            <span key={item.text} className="flex items-center gap-2">
              <span>{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>

        {/* Demo preview card */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f1e] z-10 pointer-events-none" />
          <div className="glass rounded-2xl p-6 text-left border border-white/[0.08] shadow-card max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-slate-600 text-xs ml-2">Generated output</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Nestled in the heart of{" "}
              <span className="text-amber-400">Pacific Heights</span>, this
              stunning 4-bedroom Victorian masterpiece seamlessly blends historic
              charm with contemporary luxury. Sun-drenched interiors flow
              effortlessly from the chef-caliber kitchen — featuring Calacatta
              marble countertops and Wolf appliances — to the lush private
              garden, perfect for entertaining. With panoramic city and bay
              views that inspire awe at every glance, this is more than a
              home; it's a{" "}
              <span className="text-amber-400">statement of extraordinary living</span>.
            </p>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/[0.06]">
              <span className="text-xs text-slate-600">Generated in 7.2s</span>
              <div className="flex gap-2 ml-auto">
                {["Copy", "Download", "Regenerate"].map((label) => (
                  <button
                    key={label}
                    className="text-xs text-slate-500 hover:text-slate-300 px-2.5 py-1 rounded-lg hover:bg-white/[0.06] transition-all"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
