import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { GroupedServicesGrid } from "@/components/service-card";
import { Button } from "@/components/ui/button";

export function ServicesSection() {
  return (
    <section className="bg-brand-soft/40 py-16">
      <Container>
        <div className="mb-10">
          <h2 className="font-heading text-navy text-2xl font-semibold sm:text-3xl">
            Technical &amp; Contracting Services We Offer in Dubai
          </h2>
          <p className="text-ink mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
            Fifteen specialist services, one accountable contractor — explore
            what we can handle for your property.
          </p>
        </div>
        <GroupedServicesGrid />
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/services">
              View All Services
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
