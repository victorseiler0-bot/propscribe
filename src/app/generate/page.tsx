"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PropertyForm from "@/components/generate/PropertyForm";
import OutputDisplay from "@/components/generate/OutputDisplay";
import Card from "@/components/ui/Card";
import { PropertyFormData } from "@/lib/openai";

export default function GeneratePage() {
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastForm, setLastForm] = useState<PropertyFormData | null>(null);

  const generate = async (data: PropertyFormData) => {
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

      if (!res.ok) throw new Error(json.error || "Generation failed.");
      setDescription(json.description);

      // Scroll to output on mobile
      if (window.innerWidth < 768) {
        setTimeout(() => {
          document.getElementById("output")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
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
        {/* Background */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-6">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
              Generate Property Description
            </h1>
            <p className="text-slate-400">
              Fill in the details below and let AI craft your perfect listing copy.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <Card shine className="p-8">
              <PropertyForm onGenerate={generate} isLoading={isLoading} />
            </Card>

            {/* Output */}
            <div id="output" className="sticky top-24">
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/[0.06] p-5 mb-4">
                  <p className="text-red-400 text-sm">{error}</p>
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
                    {isLoading ? "Crafting your description..." : "Your description will appear here"}
                  </h3>
                  <p className="text-slate-500 text-sm max-w-xs">
                    {isLoading
                      ? "Our AI is writing compelling copy tailored to your property."
                      : "Complete the form on the left and click Generate to get started."}
                  </p>
                  {isLoading && (
                    <div className="w-48 h-1 rounded-full bg-white/[0.06] mt-6 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 shimmer" />
                    </div>
                  )}
                </Card>
              )}

              {/* Credits info */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-600 px-1">
                <span>5 free credits available</span>
                <Link href="#pricing" className="text-amber-500 hover:text-amber-400 transition-colors">
                  Buy more credits →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
