import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/landing/HowItWorks";
import Link from "next/link";

export const metadata = { title: "Comment ça marche — PropScribe" };

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HowItWorks />
        <div className="text-center pb-20">
          <Link href="/register" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity">
            Commencer gratuitement — 5 crédits offerts
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
