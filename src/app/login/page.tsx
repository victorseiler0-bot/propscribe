"use client";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    } else {
      router.push(redirect);
      router.refresh();
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${redirect}`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
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
            <span className="font-bold text-white text-lg">
              Prop<span className="text-amber-400">Scribe</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Bon retour</h1>
          <p className="text-slate-400 text-sm">Connecte-toi à ton compte</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="toi@agence.com"
            required
            autoComplete="email"
          />
          <div>
            <Input
              label="Mot de passe"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <div className="text-right mt-2">
              <Link href="/forgot-password" className="text-xs text-slate-500 hover:text-amber-400 transition-colors">
                Mot de passe oublié ?
              </Link>
            </div>
          </div>
          <Button type="submit" variant="primary" size="md" loading={loading} className="w-full">
            Se connecter
          </Button>
          <div className="relative flex items-center gap-3">
            <div className="flex-1 border-t border-white/[0.06]" />
            <span className="text-xs text-slate-600">ou</span>
            <div className="flex-1 border-t border-white/[0.06]" />
          </div>
          <Button type="button" variant="secondary" size="md" loading={googleLoading} onClick={handleGoogle} className="w-full">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" fill="#4285f4" />
            </svg>
            Continuer avec Google
          </Button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
            Inscription gratuite
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
