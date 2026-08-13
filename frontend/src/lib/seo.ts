import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMeta = {
  /** Full SEO title tag, e.g. "Building Contracting Company in Dubai | Telal Al Qema". */
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
};

export const defaultDescription =
  "Telal Al Qema is a trusted building contracting company in Dubai offering MEP, fit-out, renovation, and AMC services. Get a free quote today.";

export function createMetadata({
  title,
  description,
  path = "/",
  ogImage,
}: PageMeta): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  const image = new URL(
    ogImage ?? siteConfig.ogImage,
    siteConfig.url,
  ).toString();

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: path === "/" ? siteConfig.url : url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.legalName,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: siteConfig.legalName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo/telal-logo.png`,
    image: new URL(siteConfig.ogImage, siteConfig.url).toString(),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Reem Tower, Office 1301",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phoneRaw,
      contactType: "customer service",
      email: siteConfig.email,
      areaServed: "AE",
    },
  };
}

export function generalContractorJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    name: siteConfig.legalName,
    url: siteConfig.url,
    image: new URL(siteConfig.ogImage, siteConfig.url).toString(),
    telephone: siteConfig.phoneRaw,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Reem Tower, Office 1301",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.26325,
      longitude: 55.31559,
    },
    areaServed: "Dubai",
    sameAs: [siteConfig.whatsappUrl],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function faqJsonLd(
  items: { question: string; answer: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceSchemaJsonLd(
  service: {
    slug: string;
    title: string;
    description: string;
  },
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.description,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.legalName,
      url: siteConfig.url,
      telephone: siteConfig.phoneRaw,
    },
    areaServed: "Dubai",
  };
}
