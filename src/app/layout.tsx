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
  title: "PropScribe — AI Property Description Generator for Real Estate Agents",
  description:
    "Generate captivating, professional real estate property descriptions in seconds with PropScribe's AI-powered platform. Trusted by 1,200+ agents.",
  keywords: ["real estate", "property description", "AI", "listing copy", "real estate agent tools"],
  openGraph: {
    title: "PropScribe — AI Property Descriptions",
    description: "Transform property details into captivating narratives that sell.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg-primary antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
