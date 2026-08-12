import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { CtaBanner } from "@/components/cta-banner";
import { DomeGallery } from "@/components/dome-gallery";
import { Container } from "@/components/layout/container";
import { ServicesGrid } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Home",
  description:
    "Telal Al Qema Building Contracting — trusted contracting services in Dubai: HVAC, electrical, plumbing, fit-out, renovation and maintenance for homes and businesses.",
});

const galleryImages = [
  { src: "/images/dome/hvac.webp", alt: "HVAC installation" },
  { src: "/images/dome/electrician.webp", alt: "Electrical works" },
  { src: "/images/dome/ceiling.jpg", alt: "Ceiling installation" },
  { src: "/images/dome/steel.jpg", alt: "Steel works" },
  { src: "/images/dome/tile.jpg", alt: "Tiling works" },
  { src: "/images/dome/wood.jpg", alt: "Wood works" },
  { src: "/images/dome/renovation.jpg", alt: "Renovation project" },
  { src: "/images/dome/fitout.jpg", alt: "Fit-out project" },
  { src: "/images/dome/glassalum.jpeg", alt: "Glass & aluminium works" },
  { src: "/images/dome/glass.webp", alt: "Glass works" },
  { src: "/images/dome/light.jpg", alt: "Lighting works" },
  { src: "/images/dome/carpenter.jpg", alt: "Carpentry works" },
  { src: "/images/dome/clean.jpg", alt: "Cleaning services" },
  { src: "/images/dome/automatication.jpg", alt: "Automation services" },
];

const whyUs = [
  {
    title: "Certified, vetted installers",
    description:
      "Trained technicians working to Dubai codes and manufacturer standards.",
  },
  {
    title: "Transparent, fixed quotations",
    description:
      "Clear scope and pricing up front — no hidden costs or surprise invoices.",
  },
  {
    title: "Accountable single team",
    description:
      "One project manager from estimate to handover, with a documented clean finish.",
  },
  {
    title: "Reliability you can rely on",
    description:
      "We show up when promised and keep the site safe, tidy and on schedule.",
  },
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
            <h1 className="font-heading text-lg leading-tight font-bold text-white sm:text-xl">
              Reliable building
              <br />
              <span className="text-brand">contracting</span> for your next
              project
            </h1>
            <p className="mt-5 max-w-lg text-gray-300">
              From HVAC and electrical works to complete fit-out and renovation
              — Telal Al Qema delivers professional contracting across Dubai,
              managed end-to-end by one accountable team.
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
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
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

      {/* Why us */}
      <section className="py-14">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <p className="text-brand text-sm font-medium">Why us</p>
            <h2 className="font-heading text-navy mt-1 text-2xl font-semibold">
              Why choose Telal Al Qema?
            </h2>
            <p className="text-ink mt-3 text-sm leading-relaxed">
              A Dubai-based contracting company focused on doing the job
              properly the first time — certified installers, compliant
              materials, and teams that show up when promised.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {whyUs.map((item) => (
              <li
                key={item.title}
                className="bg-brand-soft/60 flex items-start gap-3 rounded-lg p-4"
              >
                <CheckCircle2 className="text-brand mt-0.5 size-5 shrink-0" />
                <div>
                  <p className="text-navy text-sm font-semibold">
                    {item.title}
                  </p>
                  <p className="text-ink text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Services */}
      <section className="py-16">
        <Container>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-brand text-sm font-medium">What we do</p>
              <h2 className="font-heading text-navy mt-1 text-2xl font-semibold">
                Our Contracting Services
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/services">
                View all services
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <ServicesGrid limit={6} />
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
