import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/landing/FAQ";
import Link from "next/link";

export const metadata = { title: "FAQ — PropScribe" };

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <FAQ />
        <div className="text-center pb-20">
          <p className="text-slate-400 text-sm mb-4">Une autre question ?</p>
          <Link href="/#contact" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
            Contacte-nous →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
