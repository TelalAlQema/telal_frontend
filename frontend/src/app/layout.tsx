import type { Metadata, Viewport } from "next";
import { Comfortaa, Geist_Mono, Mulish } from "next/font/google";
import Script from "next/script";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/lib/site";
import { defaultDescription } from "@/lib/seo";
import "./globals.css";

// Muli was retired from Google Fonts — Mulish is its maintained successor.
const mulish = Mulish({
  variable: "--font-muli",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} — Building Contracting in Dubai`,
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} — Building Contracting in Dubai`,
    description: defaultDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Building Contracting in Dubai`,
    description: defaultDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1432",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html
      lang="en"
      className={`${mulish.variable} ${comfortaa.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-screen flex-col font-sans">
        {isProd && siteConfig.adsenseClient ? (
          <Script
            id="adsense"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        ) : null}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
