"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

const PLANS = [
  {
    name: "Gratuit",
    monthly: 0,
    annual: 0,
    color: "border-white/[0.08]",
    badge: null,
    credits: "5 crédits offerts",
    features: [
      "5 fiches produits à la création du compte",
      "8 langues disponibles",
      "Copier / télécharger les fiches",
      "Accès au tableau de bord",
    ],
    cta: "Commencer gratuitement",
    href: "/register",
    primary: false,
  },
  {
    name: "Solo",
    monthly: 9,
    annual: 79,
    color: "border-amber-500/40",
    badge: "Populaire",
    credits: "75 fiches / mois",
    features: [
      "100 descriptions par mois",
      "8 langues disponibles",
      "Historique illimité",
      "Crédits cumulables",
      "Support prioritaire",
    ],
    cta: "Démarrer en Pro",
    href: "/register",
    primary: true,
  },
  {
    name: "Business",
    monthly: 19,
    annual: 159,
    color: "border-white/[0.08]",
    badge: null,
    credits: "Fiches illimitées",
    features: [
      "Descriptions illimitées",
      "8 langues disponibles",
      "Jusqu'à 5 agents",
      "Historique illimité",
      "Support dédié",
      "Facturation mensuelle ou annuelle",
    ],
    cta: "Contacter l'équipe",
    href: "/#contact",
    primary: false,
  },
];

export default function TarifsPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium text-amber-400 uppercase tracking-[0.15em] mb-4">Tarifs</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Simple et transparent
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
              Commence gratuitement. Passe au niveau supérieur quand tu en as besoin.
            </p>

            {/* Toggle mensuel / annuel */}
            <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <button
                onClick={() => setAnnual(false)}
                className={`text-sm px-4 py-2 rounded-lg transition-all ${!annual ? "bg-amber-500 text-slate-900 font-semibold" : "text-slate-400 hover:text-white"}`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`text-sm px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${annual ? "bg-amber-500 text-slate-900 font-semibold" : "text-slate-400 hover:text-white"}`}
              >
                Annuel
                <span className={`text-xs px-2 py-0.5 rounded-full ${annual ? "bg-slate-900/30 text-slate-900" : "bg-green-500/20 text-green-400"}`}>-30%</span>
              </button>
            </div>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 flex flex-col ${plan.color} ${plan.primary ? "bg-amber-500/[0.06]" : "bg-white/[0.02]"}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-semibold text-slate-900 bg-amber-400 px-3 py-1 rounded-full">{plan.badge}</span>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-sm font-medium text-slate-400 mb-3">{plan.name}</p>
                  <div className="flex items-end gap-1">
                    {plan.monthly === 0 ? (
                      <span className="text-4xl font-bold text-white">Gratuit</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-white">
                          {annual ? Math.round(plan.annual / 12) : plan.monthly}€
                        </span>
                        <span className="text-slate-500 text-sm mb-1">/mois</span>
                      </>
                    )}
                  </div>
                  {annual && plan.annual > 0 && (
                    <p className="text-xs text-green-400 mt-1">soit {plan.annual}€/an · économisez {plan.monthly * 12 - plan.annual}€</p>
                  )}
                  <p className="text-amber-400 text-sm font-medium mt-3">{plan.credits}</p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3.5 3.5L13 4" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block text-center py-3 px-4 rounded-xl font-semibold text-sm transition-all ${plan.primary ? "bg-amber-500 hover:bg-amber-400 text-slate-900" : "border border-white/[0.12] text-white hover:border-white/30 hover:bg-white/[0.04]"}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ rapide */}
          <div className="text-center">
            <p className="text-slate-500 text-sm">
              Des questions sur les tarifs ?{" "}
              <Link href="/faq" className="text-amber-400 hover:text-amber-300 transition-colors">Consulte la FAQ</Link>
              {" "}ou{" "}
              <Link href="/#contact" className="text-amber-400 hover:text-amber-300 transition-colors">contacte-nous</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
