"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProductForm from "@/components/generate/PropertyForm";
import OutputDisplay from "@/components/generate/OutputDisplay";
import Card from "@/components/ui/Card";
import { ProductFormData } from "@/lib/openai";
import { createClient } from "@/lib/supabase";

export default function GeneratePage() {
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastForm, setLastForm] = useState<ProductFormData | null>(null);
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data } = await supabase.from("profiles").select("credits").eq("id", user.id).single();
      if (data) setCredits(data.credits);
    });
  }, []);

  const generate = async (data: ProductFormData) => {
    setIsLoading(true);
    setError(null);
    setLastForm(data);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Échec de la génération.");
      setDescription(json.description);
      if (json.creditsLeft !== undefined) setCredits(json.creditsLeft);

      if (window.innerWidth < 768) {
        setTimeout(() => {
          document.getElementById("output")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastForm) generate(lastForm);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-16">
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-6">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Mon tableau de bord
            </Link>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                  Générer une fiche produit
                </h1>
                <p className="text-slate-400">
                  Remplis les infos produit — l'IA rédige une fiche SEO optimisée.
                </p>
              </div>
              {credits !== null && (
                <div className="glass rounded-xl px-4 py-2.5 text-center">
                  <span className="text-amber-400 font-bold text-lg block">{credits}</span>
                  <span className="text-slate-500 text-xs">crédits</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card shine className="p-8">
              <ProductForm onGenerate={generate} isLoading={isLoading} />
            </Card>

            <div id="output" className="sticky top-24">
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/[0.06] p-5 mb-4">
                  <p className="text-red-400 text-sm">{error}</p>
                  {error.includes("Crédits insuffisants") && (
                    <Link href="/dashboard" className="text-amber-400 text-sm font-medium hover:underline block mt-2">
                      Acheter des crédits →
                    </Link>
                  )}
                </div>
              )}

              {description ? (
                <Card shine className="p-8">
                  <OutputDisplay
                    description={description}
                    onRegenerate={handleRegenerate}
                    isLoading={isLoading}
                  />
                </Card>
              ) : (
                <Card className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center border-dashed">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/[0.08] border border-amber-500/20 flex items-center justify-center mb-5">
                    {isLoading ? (
                      <svg className="animate-spin w-7 h-7 text-amber-400" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M4 8h20M4 14h14M4 20h17" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {isLoading ? "Rédaction en cours..." : "Ta fiche produit apparaîtra ici"}
                  </h3>
                  <p className="text-slate-500 text-sm max-w-xs">
                    {isLoading
                      ? "L'IA rédige ta fiche produit optimisée SEO."
                      : "Remplis les infos à gauche et clique sur Générer."}
                  </p>
                  {isLoading && (
                    <div className="w-48 h-1 rounded-full bg-white/[0.06] mt-6 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 shimmer" />
                    </div>
                  )}
                </Card>
              )}

              <div className="mt-4 flex items-center justify-between text-xs text-slate-600 px-1">
                <span>{credits !== null ? `${credits} crédit${credits > 1 ? "s" : ""} restant${credits > 1 ? "s" : ""}` : "Chargement..."}</span>
                <Link href="/dashboard" className="text-amber-500 hover:text-amber-400 transition-colors">
                  Acheter des crédits →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
