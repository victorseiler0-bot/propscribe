import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — PropScribe",
  description: "Lisez les conditions générales d'utilisation de PropScribe.",
};

export default function TermsPage() {
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

        <h1 className="text-3xl font-bold text-white mb-2">Conditions Générales d'Utilisation</h1>
        <p className="text-slate-500 text-sm mb-10">Dernière mise à jour : avril 2025</p>

        <div className="space-y-8 text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Acceptation des conditions</h2>
            <p>
              En utilisant PropScribe, vous acceptez les présentes conditions générales d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Description du service</h2>
            <p>
              PropScribe est une plateforme d'intelligence artificielle permettant aux agents immobiliers de générer des descriptions de biens immobiliers. Le service fonctionne sur la base d'un système de crédits.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Compte utilisateur</h2>
            <p>
              Pour utiliser PropScribe, vous devez créer un compte. Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités effectuées depuis votre compte.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Crédits et paiements</h2>
            <p>
              Chaque génération de description consomme 1 crédit. Les crédits achetés ne sont pas remboursables. Les 5 crédits offerts à l'inscription sont destinés à l'usage personnel et ne peuvent pas être transférés.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Utilisation acceptable</h2>
            <p>
              Vous vous engagez à utiliser PropScribe uniquement à des fins légales et conformément aux présentes conditions. Il est interdit d'utiliser le service pour générer du contenu trompeur, frauduleux ou illégal.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Propriété intellectuelle</h2>
            <p>
              Les descriptions générées par PropScribe vous appartiennent pleinement. Vous êtes libre de les utiliser, modifier et publier sans restriction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Limitation de responsabilité</h2>
            <p>
              PropScribe est fourni "tel quel". Nous ne garantissons pas que les descriptions générées conviennent à tous les usages. Vous restez responsable de la vérification et de la publication du contenu.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Modification des conditions</h2>
            <p>
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés par email de tout changement significatif.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Contact</h2>
            <p>
              Pour toute question concernant ces conditions, contactez-nous à <a href="mailto:support@propscribe.com" className="text-amber-400 hover:underline">support@propscribe.com</a>.
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
