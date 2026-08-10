import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/services";

const bulletPoints = [
  "Free on-site inspection and written quotation",
  "Compliant materials and certified installers",
  "Fixed scope with clear timelines",
  "Dedicated project management & clean handover",
];

export function ServiceDetail({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <>
      <PageHeader
        title={service.title}
        description={service.description}
        breadcrumb="Our Services"
      />
      <Container className="grid gap-10 py-16 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="font-heading text-navy text-xl font-semibold">
            About this service
          </h2>
          <p className="text-ink mt-3 text-sm leading-relaxed">
            {service.description}
          </p>
          <h3 className="font-heading text-navy mt-8 text-lg font-semibold">
            What&apos;s included
          </h3>
          <ul className="mt-4 space-y-3">
            {bulletPoints.map((point) => (
              <li
                key={point}
                className="text-ink flex items-start gap-3 text-sm"
              >
                <CheckCircle2 className="text-brand mt-0.5 size-5 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8">
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
            Not sure if this service is right for your project? Call or message
            us and describe what you need — we&apos;ll advise honestly before
            quoting.
          </p>
          <div className="mt-4">
            <Button asChild variant="outline" className="w-full">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </aside>
      </Container>
    </>
  );
}
