import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PropScribe — Fiches produits rédigées par l'IA en 10 secondes",
  description:
    "Génère des fiches produits optimisées SEO pour Shopify, WooCommerce et Amazon. 8 langues, 1 crédit par fiche. Essai gratuit — 5 fiches offertes.",
  keywords: ["fiche produit", "IA", "Shopify", "e-commerce", "rédaction automatique", "SEO", "WooCommerce"],
  openGraph: {
    title: "PropScribe — Fiches produits IA pour e-commerce",
    description: "Des fiches produits qui convertissent, rédigées par l'IA en 10 secondes.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <body className="bg-bg-primary antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
