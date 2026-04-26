import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — PropScribe",
  description: "Découvrez comment PropScribe collecte et utilise vos données personnelles.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-12">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M2 8h8M2 12h10" stroke="#0a0f1e" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-bold text-white">Prop<span className="text-amber-400">Scribe</span></span>
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Politique de Confidentialité</h1>
        <p className="text-slate-500 text-sm mb-10">Dernière mise à jour : avril 2025</p>

        <div className="space-y-8 text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Données collectées</h2>
            <p>Nous collectons les informations suivantes :</p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
              <li>Informations de compte : prénom, nom, adresse email</li>
              <li>Données d'utilisation : descriptions générées, crédits utilisés</li>
              <li>Données de paiement : traitées de façon sécurisée via Stripe (nous ne stockons pas vos données bancaires)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Utilisation des données</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
              <li>Vous fournir et améliorer notre service</li>
              <li>Gérer votre compte et vos crédits</li>
              <li>Traiter vos paiements</li>
              <li>Vous envoyer des communications liées au service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Partage des données</h2>
            <p>
              Nous ne vendons jamais vos données personnelles. Vos données peuvent être partagées uniquement avec nos prestataires techniques (Supabase pour la base de données, Stripe pour les paiements, OpenAI pour la génération de contenu) dans le cadre strict de la fourniture du service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Sécurité</h2>
            <p>
              Vos données sont stockées de façon sécurisée sur une infrastructure chiffrée (Supabase). Les mots de passe sont hachés et ne sont jamais visibles par notre équipe.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Cookies</h2>
            <p>
              PropScribe utilise des cookies essentiels pour maintenir votre session de connexion. Nous n'utilisons pas de cookies publicitaires ou de pistage tiers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Vos droits (RGPD)</h2>
            <p>Conformément au RGPD, vous avez le droit de :</p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
              <li>Accéder à vos données personnelles</li>
              <li>Corriger des informations inexactes</li>
              <li>Supprimer votre compte et vos données</li>
              <li>Exporter vos données</li>
            </ul>
            <p className="mt-3">Pour exercer ces droits, contactez-nous à <a href="mailto:support@propscribe.com" className="text-amber-400 hover:underline">support@propscribe.com</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Durée de conservation</h2>
            <p>
              Vos données sont conservées tant que votre compte est actif. En cas de suppression de compte, vos données personnelles sont effacées dans un délai de 30 jours.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Contact</h2>
            <p>
              Pour toute question relative à la protection de vos données, contactez-nous à <a href="mailto:support@propscribe.com" className="text-amber-400 hover:underline">support@propscribe.com</a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <Link href="/register" className="text-amber-400 hover:text-amber-300 text-sm transition-colors">
            ← Retour à l'inscription
          </Link>
        </div>
      </div>
    </div>
  );
}
