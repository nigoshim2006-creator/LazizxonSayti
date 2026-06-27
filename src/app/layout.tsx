import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "sp.market — Sport & Cyber-Sport Marketplace + AI Agency",
  description:
    "Next-gen e-commerce marketplace for premium footwear, esports apparel, football kits, training gear, and AI-powered sports technology.",
  keywords: [
    "sport marketplace",
    "cyber sport",
    "esports",
    "nike",
    "adidas",
    "football kits",
    "training gear",
    "AI marketplace",
    "sp.market",
  ],
  openGraph: {
    title: "sp.market — Sport & Cyber-Sport Marketplace",
    description:
      "Premium sport & esports marketplace with AI-powered discovery. Nike, Adidas, Air Jordan, and more.",
    type: "website",
    siteName: "sp.market",
  },
  twitter: {
    card: "summary_large_image",
    title: "sp.market — Sport & Cyber-Sport Marketplace",
    description:
      "Premium sport & esports marketplace with AI-powered discovery.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${plusJakartaSans.variable}`}
    >
      <body className="min-h-screen bg-surface-white text-navy-900 antialiased font-sans">
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
