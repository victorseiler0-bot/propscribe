import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerSupabaseClient, createServiceClient } from "@/lib/supabase-server";

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const service = createServiceClient();

  // Get profile (credits)
  const { data: profile } = await service
    .from("profiles")
    .select("credits")
    .eq("id", user.id)
    .single();

  // Get recent generations
  const { data: generations } = await service
    .from("generations")
    .select("id, property_type, location, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  // Get purchases
  const { data: purchases } = await service
    .from("purchases")
    .select("id, credits, amount_cents, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const credits = profile?.credits ?? 0;
  const userName = user.user_metadata?.first_name || user.email?.split("@")[0] || "là";

  return (
    <div className="min-h-screen pt-8 pb-16 px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M2 8h8M2 12h10" stroke="#0a0f1e" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-bold text-white">Prop<span className="text-amber-400">Scribe</span></span>
        </Link>
        <form action="/api/auth/signout" method="POST">
          <button type="submit" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
            Déconnexion
          </button>
        </form>
      </div>

      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Bonjour, {userName} 👋</h1>
        <p className="text-slate-400 text-sm mt-1">{user.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Credits */}
        <div className="glass rounded-2xl p-6">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Crédits restants</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-amber-400">{credits}</span>
            <span className="text-slate-500 text-sm mb-1">crédits</span>
          </div>
          <p className="text-xs text-slate-600 mt-2">1 crédit = 1 description générée</p>
        </div>

        {/* Generations */}
        <div className="glass rounded-2xl p-6">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Descriptions créées</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-white">{generations?.length ?? 0}</span>
          </div>
          <p className="text-xs text-slate-600 mt-2">Ce mois-ci</p>
        </div>

        {/* Quick action */}
        <div className="glass rounded-2xl p-6 flex flex-col justify-between">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Action rapide</p>
          <Link
            href="/generate"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-semibold text-sm rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            Générer une description
          </Link>
        </div>
      </div>

      {/* Buy credits */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-white">Acheter des crédits</h2>
          {credits <= 2 && (
            <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/20 px-2 py-1 rounded-full">
              Crédits bas
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Starter", credits: 50, price: "10€", priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_50 },
            { label: "Pro", credits: 200, price: "35€", priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_200, popular: true },
            { label: "Agency", credits: 500, price: "75€", priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_500 },
          ].map((tier) => (
            <form key={tier.label} action="/api/stripe/checkout" method="POST">
              <input type="hidden" name="priceId" value={tier.priceId} />
              <button
                type="submit"
                className={`w-full rounded-xl p-4 text-left border transition-all hover:border-amber-500/40 ${
                  tier.popular
                    ? "border-amber-500/30 bg-amber-500/[0.06]"
                    : "border-white/[0.08] bg-white/[0.02]"
                }`}
              >
                {tier.popular && (
                  <span className="text-xs text-amber-400 font-medium block mb-1">Populaire</span>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">{tier.credits} crédits</span>
                  <span className="text-amber-400 font-bold">{tier.price}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{tier.label}</p>
              </button>
            </form>
          ))}
        </div>
      </div>

      {/* Recent generations */}
      {generations && generations.length > 0 && (
        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-white mb-4">Dernières descriptions</h2>
          <div className="space-y-2">
            {generations.map((g) => (
              <div key={g.id} className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-0">
                <div>
                  <span className="text-sm text-white">{g.property_type || "Bien immobilier"}</span>
                  {g.location && <span className="text-slate-500 text-sm"> — {g.location}</span>}
                </div>
                <span className="text-xs text-slate-600">
                  {new Date(g.created_at).toLocaleDateString("fr-FR")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Purchases */}
      {purchases && purchases.length > 0 && (
        <div className="glass rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">Historique des achats</h2>
          <div className="space-y-2">
            {purchases.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-0">
                <span className="text-sm text-white">+{p.credits} crédits</span>
                <div className="text-right">
                  <span className="text-sm text-amber-400">{(p.amount_cents / 100).toFixed(0)}€</span>
                  <span className="text-xs text-slate-600 block">{new Date(p.created_at).toLocaleDateString("fr-FR")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
