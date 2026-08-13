import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function AmcBanner() {
  return (
    <section className="bg-navy-dark text-white">
      <Container className="flex flex-col items-center gap-6 py-14 text-center">
        <h2 className="font-heading max-w-2xl text-2xl font-semibold sm:text-3xl">
          One Contract. Every Technical Need. All Year.
        </h2>
        <p className="max-w-2xl text-sm text-gray-300 sm:text-base">
          Cover HVAC, plumbing, electrical, cleaning, and more under a single
          Annual Maintenance Contract — priced to your property, scheduled
          around you.
        </p>
        <Button asChild size="lg">
          <Link href="/services/amc">
            Get My AMC Quote
            <ArrowRight />
          </Link>
        </Button>
      </Container>
    </section>
  );
}
