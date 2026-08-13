import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  serviceSchemaJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { Service } from "@/lib/services";

const defaultIncluded = [
  "Free on-site inspection and written quotation",
  "Compliant materials and certified installers",
  "Fixed scope with clear timelines",
  "Dedicated project management & clean handover",
];

const defaultWhyChoose = [
  "Skilled technicians experienced with residential and commercial properties across Dubai.",
  "Transparent pricing with no hidden call-out fees.",
  "Available as a one-off service or as part of a wider Annual Maintenance Contract.",
];

const defaultProcess = [
  "Share your requirement via the contact form, call, or WhatsApp.",
  "We schedule a technician visit — usually within 24 hours.",
  "A clear, upfront quote before any work begins.",
  "Work completed, tested, and confirmed before we leave.",
];

const CONFIRM_PATTERN = /\[confirm/i;

export function ServiceDetail({
  service,
  image,
}: {
  service: Service;
  image?: { src: string; alt: string };
}) {
  const Icon = service.icon;
  const included = service.included ?? defaultIncluded;
  const whyChoose = service.whyChoose ?? defaultWhyChoose;
  // Placeholder FAQs (awaiting client confirmation) are excluded from the
  // rendered page and from FAQPage schema so nothing provisional ships live.
  const confirmedFaqs = (service.faqs ?? []).filter(
    (item) => !CONFIRM_PATTERN.test(item.answer),
  );

  return (
    <>
      <PageHeader
        title={`${service.title} in Dubai`}
        description={service.description}
        breadcrumb="Our Services"
      />
      <Container className="py-16">
        {image ? (
          <div className="relative mb-12 aspect-[2/1] w-full overflow-hidden rounded-xl shadow-sm">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-heading text-navy text-xl font-semibold">
              What&apos;s Included
            </h2>
            <ul className="mt-4 space-y-3">
              {included.map((point) => (
                <li
                  key={point}
                  className="text-ink flex items-start gap-3 text-sm"
                >
                  <CheckCircle2 className="text-brand mt-0.5 size-5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            <h2 className="font-heading text-navy mt-10 text-xl font-semibold">
              Our Process
            </h2>
            <ol className="mt-4 space-y-3">
              {defaultProcess.map((step, index) => (
                <li key={step} className="text-ink flex items-start gap-3 text-sm">
                  <span className="bg-brand text-white flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <h2 className="font-heading text-navy mt-10 text-xl font-semibold">
              Why Choose Telal Al Qema for {service.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {whyChoose.map((point) => (
                <li
                  key={point}
                  className="text-ink flex items-start gap-3 text-sm"
                >
                  <CheckCircle2 className="text-brand mt-0.5 size-5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            {confirmedFaqs.length > 0 ? (
              <>
                <h2 className="font-heading text-navy mt-10 text-xl font-semibold">
                  FAQs
                </h2>
                <div className="mt-4 space-y-4">
                  {confirmedFaqs.map((item) => (
                    <div
                      key={item.question}
                      className="rounded-xl border bg-white p-5 shadow-sm"
                    >
                      <h3 className="text-navy font-heading text-base font-semibold">
                        {item.question}
                      </h3>
                      <p className="text-ink mt-2 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            <div className="mt-10">
              <Button asChild>
                <Link href="/contact">
                  Get a Free Quote
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>

          <aside className="bg-brand-soft/60 h-fit rounded-xl border p-6">
            <span className="bg-brand flex size-12 items-center justify-center rounded-lg text-white">
              <Icon className="size-6" />
            </span>
            <p className="font-heading text-navy mt-4 text-sm font-semibold">
              Talk to our team
            </p>
            <p className="text-ink mt-1 text-xs leading-relaxed">
              Not sure if this service is right for your project? Call or
              message us and describe what you need — we&apos;ll advise honestly
              before quoting.
            </p>
            <div className="mt-4 space-y-3">
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-navy/30 text-navy hover:border-brand hover:text-brand"
              >
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchemaJsonLd({
              slug: service.slug,
              title: service.title,
              description: service.description,
            }),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Our Services", path: "/services" },
              { name: service.title, path: `/services/${service.slug}` },
            ]),
          ).replace(/</g, "\\u003c"),
        }}
      />
      {confirmedFaqs.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd(confirmedFaqs)).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      ) : null}
    </>
  );
}
