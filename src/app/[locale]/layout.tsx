import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import RootWrapper from "@/components/RootWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hakkenbroek Housing Company | Amsterdam Real Estate",
  description:
    "Boutique real estate agency in Amsterdam with 20+ years of experience. Specialists in buying, selling, renting, and expat housing throughout the Netherlands.",
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
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-stone-50 text-ink">
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
