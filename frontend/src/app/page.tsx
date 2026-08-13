import Link from "next/link";
import { BadgeCheck, MessageCircle, Truck, Wrench } from "lucide-react";

import { AboutSection } from "@/components/seo/about-section";
import { AmcBanner } from "@/components/seo/amc-banner";
import { AreasServed } from "@/components/seo/areas-served";
import { FaqSection } from "@/components/seo/faq-section";
import { FinalCta } from "@/components/seo/final-cta";
import { PartnersSection } from "@/components/seo/partners-section";
import { ProcessSection } from "@/components/seo/process-section";
import { ProjectsSection } from "@/components/seo/projects-section";
import { QuickStats } from "@/components/seo/quick-stats";
import { ServicesSection } from "@/components/seo/services-section";
import { TestimonialsSection } from "@/components/seo/testimonials-section";
import { WhyChooseUs } from "@/components/seo/why-choose-us";
import { DomeGallery } from "@/components/dome-gallery";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { createMetadata, generalContractorJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Building Contracting Company in Dubai | Telal Al Qema",
  description:
    "Telal Al Qema is a trusted building contracting company in Dubai offering MEP, fit-out, renovation, and AMC services. Get a free quote today.",
});

const galleryImages = [
  {
    src: "/images/dome/hvac.webp",
    alt: "Telal Al Qema building contracting and MEP technical services team working on-site in Dubai",
  },
  { src: "/images/dome/electrician.webp", alt: "Electrical works in Dubai" },
  { src: "/images/dome/ceiling.jpg", alt: "Ceiling installation in Dubai" },
  { src: "/images/dome/steel.jpg", alt: "Steel works in Dubai" },
  { src: "/images/dome/tile.jpg", alt: "Tiling works in Dubai" },
  { src: "/images/dome/wood.jpg", alt: "Wood works in Dubai" },
  { src: "/images/dome/renovation.jpg", alt: "Renovation project in Dubai" },
  { src: "/images/dome/fitout.jpg", alt: "Fit-out project in Dubai" },
  { src: "/images/dome/glassalum.jpeg", alt: "Glass and aluminium works" },
  { src: "/images/dome/glass.webp", alt: "Glass works in Dubai" },
  { src: "/images/dome/light.jpg", alt: "Lighting works in Dubai" },
  { src: "/images/dome/carpenter.jpg", alt: "Carpentry works in Dubai" },
  { src: "/images/dome/clean.jpg", alt: "Cleaning services in Dubai" },
  {
    src: "/images/dome/automatication.jpg",
    alt: "Home automation services in Dubai",
  },
];

const trustItems = [
  { icon: BadgeCheck, text: "Licensed Building Contractor" },
  { icon: Truck, text: "500+ Projects Delivered" },
  { icon: Wrench, text: "Serving All of Dubai" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[2fr_3fr] lg:items-center">
          <div className="relative z-10">
            <p className="text-brand mb-3 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-medium tracking-wide uppercase">
              Dubai · UAE
            </p>
            <h1 className="font-heading text-lg leading-tight font-bold text-white sm:text-2xl lg:text-3xl">
              Dubai&apos;s Trusted Building Contracting &amp; Technical
              Services Company
            </h1>
            <p className="mt-5 max-w-lg text-gray-300">
              From MEP and fit-out to renovation and maintenance — Telal Al
              Qema delivers licensed, end-to-end contracting services for homes
              and businesses across Dubai.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="hover:text-navy rounded-full border-white/30 bg-transparent text-white hover:bg-white"
              >
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-300 sm:text-sm">
              {trustItems.map((item) => (
                <li key={item.text} className="inline-flex items-center gap-1.5">
                  <item.icon className="text-brand size-4" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            <DomeGallery
              images={galleryImages}
              fit={0.85}
              fitBasis="min"
              minRadius={260}
              maxRadius={800}
              maxVerticalRotationDeg={20}
              grayscale={false}
            />
          </div>
        </Container>
      </section>

      {/* Quick Stats / Trust Bar */}
      <QuickStats />

      {/* About / Introduction */}
      <AboutSection />

      {/* Services */}
      <ServicesSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Featured Projects (hidden until real project data is provided) */}
      <ProjectsSection />

      {/* How We Work */}
      <ProcessSection />

      {/* AMC Banner */}
      <AmcBanner />

      {/* Testimonials (hidden until real client quotes are provided) */}
      <TestimonialsSection />

      {/* Areas We Serve */}
      <AreasServed />

      {/* Brand Partners / Certifications (hidden until real logos are provided) */}
      <PartnersSection />

      {/* FAQ */}
      <FaqSection />

      {/* Final CTA / Contact */}
      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generalContractorJsonLd()).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
    </>
  );
}
