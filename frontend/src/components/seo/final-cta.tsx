import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="bg-brand-soft/40 py-16">
      <Container className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-heading text-navy text-2xl font-semibold sm:text-3xl">
            One Call Can Solve Every Technical Problem
          </h2>
          <p className="text-ink mt-4 text-sm leading-relaxed sm:text-base">
            Tell us what you need — we&apos;ll get back to you with a free
            quote, usually within 24 hours.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={siteConfig.telUrl}>
                <Phone />
                Call Us Now
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-navy/30 text-navy hover:border-brand hover:text-brand"
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
          <p className="text-ink mt-6 text-sm">
            Prefer to browse first?{" "}
            <Link href="/services" className="text-brand hover:text-brand-strong">
              Explore our services
            </Link>{" "}
            or{" "}
            <Link href="/about" className="text-brand hover:text-brand-strong">
              learn about our team
            </Link>
            .
          </p>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
