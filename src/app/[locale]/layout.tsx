import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "../globals.css";
import RootWrapper from "@/components/RootWrapper";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
  weight: ["300", "400", "500"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Hakkenbroek Housing Company | Luxury Amsterdam Real Estate",
  description:
    "Boutique real estate agency in Amsterdam with 20+ years of discretion and excellence. Specialists in luxury property buying, selling, renting, and expat relocation. Off-market access, international buyer network, and bespoke property management.",
  keywords: [
    "Amsterdam real estate",
    "luxury property Amsterdam",
    "buy house Amsterdam",
    "sell property Amsterdam",
    "expat housing Amsterdam",
    "property management Amsterdam",
    "boutique real estate agency",
    "canal house Amsterdam",
    "Amsterdam rental",
    "international buyers Amsterdam"
  ],
  authors: [{ name: "Hakkenbroek Housing Company" }],
  openGraph: {
    title: "Hakkenbroek Housing Company | Luxury Amsterdam Real Estate",
    description: "Boutique real estate agency in Amsterdam with 20+ years of discretion and excellence. Specialists in luxury property buying, selling, renting, and expat relocation.",
    type: "website",
    locale: "en_US",
    url: "https://hakkenbroek.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkenbroek Housing Company | Luxury Amsterdam Real Estate",
    description: "Boutique real estate agency in Amsterdam with 20+ years of discretion and excellence.",
  },
  alternates: {
    canonical: "https://hakkenbroek.com",
  },
};

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale} className={`${jost.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased bg-stone-50 text-ink">
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
