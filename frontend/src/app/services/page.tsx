import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { GroupedServicesGrid } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Our Services | MEP, Fit-Out, Renovation & AMC Dubai",
  description:
    "Explore all technical and contracting services from Telal Al Qema: HVAC, electrical, plumbing, fit-out, renovation, waterproofing, cleaning & AMC in Dubai.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Technical & Contracting Services in Dubai"
        description="Telal Al Qema offers fifteen specialist services across MEP, fit-out, renovation, and maintenance — all delivered by one accountable team. Explore each service below, or contact us for a project that spans more than one."
        breadcrumb="What we do"
      />
      <section className="py-16">
        <Container>
          <GroupedServicesGrid />
          <div className="mt-12 text-center">
            <p className="text-ink text-sm">
              Need something not listed here?{" "}
              <Link href="/contact" className="text-brand hover:text-brand-strong">
                Contact us — we likely still cover it.
              </Link>
            </p>
          </div>
        </Container>
      </section>
      <section className="bg-brand">
        <Container className="flex flex-col items-center gap-4 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-heading text-lg font-semibold text-white">
            Not sure which service fits your project?
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="hover:text-navy rounded-full border-white bg-transparent text-white hover:bg-white"
          >
            <Link href="/contact">
              Get a Free Quote
              <ArrowRight />
            </Link>
          </Button>
        </Container>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Our Services", path: "/services" },
            ]),
          ).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
