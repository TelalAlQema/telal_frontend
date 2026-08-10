import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ServicesGrid } from "@/components/service-card";
import { CtaBanner } from "@/components/cta-banner";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Our Services",
  description:
    "A full range of contracting services in Dubai — HVAC, electrical, plumbing, fit-out, renovation, wood works, tiling, ceiling, glass & aluminium, cleaning, lighting, steel works and waterproofing.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        description="One partner for everything your building needs — from mechanical and electrical systems to interior finishes."
        breadcrumb="What we do"
      />
      <section className="py-16">
        <Container>
          <ServicesGrid />
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
