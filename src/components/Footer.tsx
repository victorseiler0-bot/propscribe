import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4h12M2 8h8M2 12h10" stroke="#0a0f1e" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-semibold text-white text-sm">
                Prop<span className="text-amber-400">Scribe</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              AI-powered property descriptions for modern real estate professionals.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: [
                { href: "/generate", label: "Generate" },
                { href: "#pricing", label: "Pricing" },
                { href: "#how-it-works", label: "How It Works" },
              ],
            },
            {
              title: "Legal",
              links: [
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ],
            },
            {
              title: "Support",
              links: [
                { href: "#faq", label: "FAQ" },
                { href: "#contact", label: "Contact" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-sm font-medium mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} PropScribe. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Built for real estate professionals who value their time.
          </p>
        </div>
      </div>
    </footer>
  );
}
