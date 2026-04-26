"use client";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M2 8h8M2 12h10" stroke="#0a0f1e" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-bold text-white text-lg">Prop<span className="text-amber-400">Scribe</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-slate-400 text-sm">5 free credits included — no card required</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="Alex" required />
            <Input label="Last Name" placeholder="Johnson" required />
          </div>
          <Input label="Email" type="email" placeholder="you@agency.com" required autoComplete="email" />
          <Input label="Password" type="password" placeholder="Min. 8 characters" required minLength={8} autoComplete="new-password" />
          <div className="flex items-start gap-3">
            <input type="checkbox" id="terms" required className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 accent-amber-400" />
            <label htmlFor="terms" className="text-xs text-slate-400 leading-relaxed">
              I agree to the{" "}
              <Link href="/terms" className="text-amber-400 hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-amber-400 hover:underline">Privacy Policy</Link>
            </label>
          </div>
          <Button type="submit" variant="primary" size="md" loading={loading} className="w-full">
            Create Account — It's Free
          </Button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
