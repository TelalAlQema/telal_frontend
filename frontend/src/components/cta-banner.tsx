import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="bg-brand">
      <Container className="flex flex-col items-center gap-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-white">
            Need a contractor you can trust?
          </h2>
          <p className="mt-1 text-sm text-white/90">
            Tell us about your project and get a free, no-obligation quotation
            within one working day.
          </p>
        </div>
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
  );
}
