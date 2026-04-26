import Card from "@/components/ui/Card";

const TESTIMONIALS = [
  {
    quote: "PropScribe cut my listing prep time in half. The descriptions it generates are better than what I was writing myself after 15 years in the business.",
    author: "Sarah M.",
    role: "RE/MAX Agent · Denver, CO",
    avatar: "SM",
    color: "from-amber-400 to-orange-500",
    stars: 5,
  },
  {
    quote: "I was skeptical about AI writing, but the quality is genuinely impressive. My clients keep asking who writes my listings now. The answer is PropScribe.",
    author: "James T.",
    role: "Independent Agent · Miami, FL",
    avatar: "JT",
    color: "from-sky-400 to-blue-500",
    stars: 5,
  },
  {
    quote: "Game changer for our boutique agency. We process 40+ listings per month and PropScribe has become an essential part of our workflow.",
    author: "Linda K.",
    role: "Principal Broker · Portland, OR",
    avatar: "LK",
    color: "from-emerald-400 to-teal-500",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-medium text-amber-400 uppercase tracking-[0.15em] mb-4">
            Social Proof
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Loved by top producers
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Join 1,200+ real estate professionals who use PropScribe to win more listings.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} shine className="p-8 hover:scale-[1.02] transition-transform duration-300">
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array(t.stars).fill(null).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#f59e0b">
                    <path d="M7 1l1.545 3.13 3.455.503-2.5 2.437.59 3.438L7 8.885l-3.09 1.623.59-3.438L2 4.633l3.455-.502L7 1z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.author}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
