"use client";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const firstName = form.get("firstName") as string;
    const lastName = form.get("lastName") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${firstName} ${lastName}`,
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo: `${location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (signUpError) {
      if (signUpError.message.toLowerCase().includes("already registered") ||
          signUpError.message.toLowerCase().includes("already exists")) {
        setError("Un compte existe déjà avec cet email.");
      } else if (signUpError.message.toLowerCase().includes("password")) {
        setError("Le mot de passe doit contenir au moins 8 caractères.");
      } else {
        setError(`Erreur : ${signUpError.message}`);
      }
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=/dashboard`,
      },
    });
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[100px]" />
        </div>
        <div className="w-full max-w-sm relative z-10 text-center">
          <div className="glass rounded-2xl p-10">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Vérifie tes emails</h2>
            <p className="text-slate-400 text-sm">
              On t'a envoyé un lien de confirmation. Clique dessus pour activer ton compte et recevoir tes{" "}
              <span className="text-amber-400 font-semibold">5 crédits offerts</span>.
            </p>
            <Link href="/login" className="inline-block mt-6 text-sm text-amber-400 hover:text-amber-300 transition-colors">
              Retour à la connexion →
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-white mb-2">Crée ton compte</h1>
          <p className="text-slate-400 text-sm">5 crédits offerts — sans carte bancaire</p>
        </div>

        <div className="glass rounded-2xl p-8 space-y-5">
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Google OAuth button */}
          <Button
            type="button"
            variant="secondary"
            size="md"
            loading={googleLoading}
            onClick={handleGoogle}
            className="w-full"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" fill="#4285f4" />
            </svg>
            Continuer avec Google
          </Button>

          {/* Divider */}
          <div className="relative flex items-center gap-3">
            <div className="flex-1 border-t border-white/[0.06]" />
            <span className="text-xs text-slate-600">ou avec email</span>
            <div className="flex-1 border-t border-white/[0.06]" />
          </div>

          {/* Email/password form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input name="firstName" label="Prénom" placeholder="Alex" required />
              <Input name="lastName" label="Nom" placeholder="Martin" required />
            </div>
            <Input name="email" label="Email" type="email" placeholder="toi@agence.com" required autoComplete="email" />
            <Input name="password" label="Mot de passe" type="password" placeholder="8 caractères min." required minLength={8} autoComplete="new-password" />
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 accent-amber-400"
              />
              <label htmlFor="terms" className="text-xs text-slate-400 leading-relaxed">
                J'accepte les{" "}
                <Link href="/terms" className="text-amber-400 hover:underline">CGU</Link>
                {" "}et la{" "}
                <Link href="/privacy" className="text-amber-400 hover:underline">Politique de confidentialité</Link>
              </label>
            </div>
            <Button type="submit" variant="primary" size="md" loading={loading} className="w-full">
              Créer mon compte — C'est gratuit
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-600 mt-6">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
