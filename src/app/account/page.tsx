"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login?redirect=/account"); return; }
      setUser(user);
      setDisplayName(user.user_metadata?.full_name || "");
      const { data } = await supabase.from("profiles").select("credits").eq("id", user.id).single();
      setCredits(data?.credits ?? 0);
      setLoading(false);
    };
    load();
  }, [router]);

  const handleSaveName = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase.auth.updateUser({ data: { full_name: displayName } });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleResetPassword = async () => {
    if (!user?.email) return;
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || location.origin}/auth/callback?next=/account`,
    });
    setResetSent(true);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-500 text-sm">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-16 px-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_16px_rgba(245,158,11,0.4)]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M2 8h8M2 12h10" stroke="#0a0f1e" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-bold text-white">Prop<span className="text-amber-400">Scribe</span></span>
        </Link>
        <Link href="/dashboard" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
          ← Tableau de bord
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-white mb-8">Mon compte</h1>

      {/* Credits card */}
      <div className="glass rounded-2xl p-6 mb-5">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Crédits disponibles</p>
        <div className="flex items-end gap-2 mb-3">
          <span className="text-4xl font-bold text-amber-400">{credits}</span>
          <span className="text-slate-500 text-sm mb-1">crédits</span>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-amber-400 hover:text-amber-300 transition-colors font-medium"
        >
          Acheter des crédits →
        </Link>
      </div>

      {/* Profile */}
      <div className="glass rounded-2xl p-6 mb-5 space-y-5">
        <h2 className="font-semibold text-white">Profil</h2>

        <div>
          <p className="text-xs text-slate-500 mb-1">Email</p>
          <p className="text-sm text-slate-300">{user?.email}</p>
        </div>

        <div className="space-y-3">
          <Input
            label="Nom complet"
            value={displayName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)}
            placeholder="Ton prénom et nom"
          />
          <Button
            variant={saved ? "secondary" : "primary"}
            size="sm"
            onClick={handleSaveName}
            loading={saving}
            disabled={saving}
          >
            {saved ? "✓ Enregistré" : "Enregistrer le nom"}
          </Button>
        </div>
      </div>

      {/* Password */}
      <div className="glass rounded-2xl p-6 mb-5">
        <h2 className="font-semibold text-white mb-4">Sécurité</h2>
        {resetSent ? (
          <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3">
            <p className="text-green-400 text-sm">Email de réinitialisation envoyé — vérifie ta boîte mail.</p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-slate-400 mb-3">Un email te sera envoyé pour choisir un nouveau mot de passe.</p>
            <Button variant="secondary" size="sm" onClick={handleResetPassword}>
              Changer mon mot de passe
            </Button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <Link href="/generate">
          <Button variant="primary" size="sm">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Générer une description
          </Button>
        </Link>
        <button
          onClick={handleSignOut}
          className="text-sm text-slate-500 hover:text-red-400 transition-colors"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
