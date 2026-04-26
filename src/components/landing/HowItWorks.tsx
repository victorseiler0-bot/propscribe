import Card from "@/components/ui/Card";

const STEPS = [
  {
    number: "01",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 8h10M7 12h6M7 16h8" strokeLinecap="round" />
      </svg>
    ),
    title: "Input Property Details",
    description:
      "Fill in a simple form — property type, location, features, and your desired tone. No prompt engineering, no complexity.",
    color: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-500/20",
    textColor: "text-amber-400",
  },
  {
    number: "02",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" strokeLinecap="round" />
      </svg>
    ),
    title: "Click Generate",
    description:
      "Our AI instantly crafts a compelling, professional listing description tailored to your target audience and specifications.",
    color: "from-sky-500/20 to-sky-600/5",
    border: "border-sky-500/20",
    textColor: "text-sky-400",
  },
  {
    number: "03",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
    title: "Copy & Publish",
    description:
      "Instantly copy your polished description, download it, make manual edits, or regenerate for a fresh take — your content, your way.",
    color: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/20",
    textColor: "text-emerald-400",
  },
];

const BENEFITS = [
  { icon: "⚡", title: "Save 2+ Hours Per Listing", desc: "What takes you 30 minutes now takes 10 seconds." },
  { icon: "📈", title: "Boost Engagement", desc: "AI-crafted copy that resonates with buyers emotionally." },
  { icon: "🎯", title: "Always On-Tone", desc: "Luxury, family-friendly, or first-time buyers — nail the voice every time." },
  { icon: "♾️", title: "Unlimited Creativity", desc: "Regenerate until you have the perfect description." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-medium text-amber-400 uppercase tracking-[0.15em] mb-4">
            Simple · Fast · Professional
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Three steps to perfect copy
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            No AI expertise required. PropScribe handles all the complexity so you can focus on closing deals.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {STEPS.map((step, i) => (
            <Card key={i} shine className="p-8 group hover:scale-[1.02] transition-transform duration-300">
              {/* Step number */}
              <div className="flex items-start justify-between mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${step.color} border ${step.border} ${step.textColor}`}>
                  {step.icon}
                </div>
                <span className="text-5xl font-bold text-white/[0.04] leading-none">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map((b, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
            >
              <span className="text-2xl">{b.icon}</span>
              <div>
                <p className="text-white text-sm font-medium mb-1">{b.title}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
