import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMeta = {
  /** Full SEO title tag, e.g. "Building Contracting Company in Dubai | Telal Al Qema". */
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  /** Explicit per-page robots directives, e.g. `{ index: false, follow: true }`. */
  robots?: Metadata["robots"];
  /** Convenience flag: emits `<meta name="robots" content="noindex, follow" />`. */
  noIndex?: boolean;
};

export const defaultDescription =
  "Telal Al Qema is a trusted building contracting company in Dubai offering MEP, fit-out, renovation, and AMC services. Get a free quote today.";

export function createMetadata({
  title,
  description,
  path = "/",
  ogImage,
  robots: robotsDirective,
  noIndex = false,
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
    robots:
      robotsDirective ?? (noIndex ? { index: false, follow: true } : undefined),
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
          alt: `${siteConfig.legalName} — ${title}`,
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

/**
 * Canonical entity identifiers. Every schema across the site references these
 * so search engines resolve one business identity instead of duplicates.
 */
const organizationId = `${siteConfig.url}/#organization`;
const localBusinessId = `${siteConfig.url}/#localbusiness`;

function businessAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: "Al Reem Tower, Office 1301",
    addressLocality: "Dubai",
    addressCountry: "AE",
  };
}

function businessContactPoint() {
  return {
    "@type": "ContactPoint",
    telephone: siteConfig.phoneRaw,
    contactType: "customer service",
    email: siteConfig.email,
    areaServed: "AE",
  };
}

function organizationNode(): JsonLd {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo/telal-logo.png`,
    image: new URL(siteConfig.ogImage, siteConfig.url).toString(),
    address: businessAddress(),
    contactPoint: businessContactPoint(),
  };
}

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    ...organizationNode(),
  };
}

function generalContractorNode(): JsonLd {
  return {
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": localBusinessId,
    name: siteConfig.legalName,
    url: siteConfig.url,
    image: new URL(siteConfig.ogImage, siteConfig.url).toString(),
    telephone: siteConfig.phoneRaw,
    email: siteConfig.email,
    address: businessAddress(),
    // Verified against the real Al Reem Tower (Al Maktoum Road, Deira, Dubai)
    // listing: 25.263336, 55.315545 (Mapio) / 25.263205, 55.315658 (SKYDB).
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.26325,
      longitude: 55.31559,
    },
    areaServed: "Dubai",
    parentOrganization: { "@id": organizationId },
  };
}

export function generalContractorJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    ...generalContractorNode(),
  };
}

function websiteNode(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "en",
    publisher: { "@id": organizationId },
  };
}

/**
 * Homepage entity graph. Organization, LocalBusiness/GeneralContractor and
 * WebSite are connected through shared @id references so search engines treat
 * them as one business identity.
 */
export function siteGraphJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), generalContractorNode(), websiteNode()],
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
      "@id": localBusinessId,
      "@type": ["LocalBusiness", "GeneralContractor"],
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    areaServed: "Dubai",
  };
}
