import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMeta = {
  title: string;
  description: string;
  path?: string;
};

export const defaultDescription =
  "Telal Al Qema Building Contracting — trusted contracting services in Dubai: HVAC, electrical, plumbing, fit-out, renovation and maintenance for homes and businesses.";

export function createMetadata({
  title,
  description,
  path = "/",
}: PageMeta): Metadata {
  const fullTitle =
    title === "Home" ? siteConfig.name : `${title} | ${siteConfig.name}`;
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: path === "/" ? siteConfig.url : url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
  };
}
