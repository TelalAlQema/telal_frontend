import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { teamMembers } from "@/lib/team";

export const metadata = createMetadata({
  title: "About Us | Telal Al Qema Building Contracting Dubai",
  description:
    "Learn about Telal Al Qema Building Contracting — a Dubai-based technical services company delivering MEP, fit-out, renovation & AMC services since [year].",
  path: "/about",
});

const values = [
  {
    title: "Quality First",
    text: "We use tested materials and proper technique on every job, not just the ones that are visible.",
  },
  {
    title: "Transparency",
    text: "Clear quotes, honest timelines, and no hidden costs.",
  },
  {
    title: "Accountability",
    text: "One team responsible for the whole project, from quote to handover.",
  },
  {
    title: "Safety",
    text: "Every job follows safe working practices, for our team and your property.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Telal Al Qema Building Contracting"
        description="Dubai's dependable partner for technical services, fit-out, and renovation — one accountable team, start to finish."
      />
      <Container className="py-16">
        <Image
          src="/images/About Us/telal-building-contracting-services-dubai-about-us.png"
          alt="Telal Al Qema building contracting team on a project in Dubai"
          width={1774}
          height={552}
          priority
          className="mb-12 w-full rounded-xl object-cover shadow-sm"
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h2 className="font-heading text-navy text-2xl font-semibold">
              Our Story
            </h2>
            <p className="text-ink mt-4 text-sm leading-relaxed sm:text-base">
              Telal Al Qema Building Contracting was founded to solve a simple
              problem: property owners and businesses in Dubai needing too many
              different contractors for one project. We brought MEP, fit-out,
              renovation, and maintenance services under a single, accountable
              team — so clients get one point of contact, one standard of
              quality, and one company that stands behind the work.
            </p>
            <p className="text-ink mt-4 text-sm leading-relaxed sm:text-base">
              Today, we work across villas, apartments, offices, and commercial
              spaces throughout Dubai, from single repairs to full renovations
              and ongoing Annual Maintenance Contracts. Our approach hasn&apos;t
              changed: transparent pricing, skilled tradespeople, and a
              commitment to finishing every job properly.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-navy text-xl font-semibold">
              Our Mission
            </h2>
            <p className="text-ink mt-3 text-sm leading-relaxed sm:text-base">
              To deliver reliable, high-quality technical and contracting
              services to every client in Dubai — on time, on budget, and
              without the hassle of managing multiple contractors.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-heading text-navy text-center text-2xl font-semibold">
            Our Values
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <li key={value.title} className="bg-brand-soft/60 rounded-lg p-5">
                <CheckCircle2 className="text-brand size-6" />
                <p className="text-navy mt-3 text-sm font-semibold">
                  {value.title}
                </p>
                <p className="text-ink mt-1 text-xs leading-relaxed">
                  {value.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <h2 className="font-heading text-navy text-center text-2xl font-semibold">
            Licensing &amp; Certifications
          </h2>
          <p className="text-ink mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed sm:text-base">
            [Placeholder — list actual trade licenses, DEWA approvals, Dubai
            Civil Defense certifications, or ISO certifications here. This
            section carries real SEO and trust weight for a contracting company
            and should not be left generic.]
          </p>
        </div>

        <div className="mt-16">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-navy text-2xl font-semibold">
              Meet the Team
            </h2>
            <p className="text-ink mt-2 text-sm">
              Behind every project is a team of experienced technicians,
              tradespeople, and project managers.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="bg-brand-soft/40 rounded-full p-1.5">
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.role} at Telal Al Qema Building Contracting Dubai`}
                    width={200}
                    height={200}
                    className="mx-auto size-40 rounded-full border-4 border-white object-cover shadow-md"
                  />
                </div>
                <p className="font-heading text-navy mt-4 text-base font-semibold">
                  {member.name}
                </p>
                <p className="text-brand-strong text-xs font-semibold uppercase tracking-wide">
                  {member.role}
                </p>
                {member.subrole ? (
                  <p className="text-ink mt-1 text-xs">{member.subrole}</p>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/our-team">
                View Our Team
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </Container>

      <section className="bg-navy-dark text-white">
        <Container className="flex flex-col items-center gap-6 py-14 text-center">
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
            Ready to Work With Us?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Get a Free Quote
                <ArrowRight />
              </Link>
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
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Telal Al Qema Building Contracting",
            url: `${siteConfig.url}/about`,
            description:
              "Telal Al Qema Building Contracting is a Dubai-based technical services and building contracting company delivering MEP, fit-out, renovation and AMC services.",
          }).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
            ]),
          ).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
