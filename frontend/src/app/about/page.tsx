import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { aboutPageJsonLd, breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { teamMembers } from "@/lib/team";

export const metadata = createMetadata({
  title: "About Us | Telal Al Qema Building Contracting Dubai",
  description:
    "Learn about Telal Al Qema Building Contracting — a Dubai-based technical services company delivering MEP, fit-out, renovation & AMC services since 2022.",
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
  {
    title: "Full Lifecycle Accountability",
    text: "One team, one contract across the full project lifecycle — from renovation and fit-out to ongoing annual maintenance.",
  },
];

const credentials = [
  {
    label: "Dubai Trade License",
    value:
      "Issued by Dubai Economy & Tourism (DED) — license number pending confirmation.",
  },
  {
    label: "DEWA Approval",
    value: "Registration for electrical and HVAC works — pending confirmation.",
  },
  {
    label: "Dubai Civil Defence",
    value:
      "Certification for fit-out and fire-safety-related scope — pending confirmation.",
  },
  {
    label: "ISO Certifications",
    value: "Quality and safety management standards — pending confirmation.",
  },
  {
    label: "Professional Memberships",
    value: "Dubai Chamber and industry associations — pending confirmation.",
  },
];

const companyFacts = [
  { label: "Founded", value: "2022 — Dubai, UAE" },
  { label: "Founder / CEO", value: "Engr. Essa Almulla" },
  { label: "Headquarters", value: "Al Reem Tower, Office 1301, Dubai, UAE" },
  {
    label: "Services",
    value: "MEP, Fit-Out, Renovation, AMC — 15 specialist services",
  },
  { label: "Coverage", value: "All of Dubai (12+ named areas)" },
  {
    label: "Trade License",
    value: "Dubai trade license — number pending confirmation",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Telal Al Qema — Dubai's Building Contracting & Technical Services Company"
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

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-navy text-2xl font-semibold">
            Our Story
          </h2>
          <p className="text-ink mt-4 text-sm leading-relaxed sm:text-base">
            Telal Al Qema Building Contracting was founded in 2022 in Dubai,
            UAE, to solve a common problem for property owners: needing multiple
            separate contractors for one project. The company brought MEP,
            fit-out, renovation, and maintenance services under a single,
            accountable team, led by Founder &amp; CEO Engr. Essa Almulla.
          </p>
          <p className="text-ink mt-4 text-sm leading-relaxed sm:text-base">
            Today, we work across villas, apartments, offices, and commercial
            spaces throughout Dubai, from single repairs to full renovations and
            ongoing Annual Maintenance Contracts. Our approach hasn&apos;t
            changed: transparent pricing, skilled tradespeople, and a commitment
            to finishing every job properly.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="font-heading text-navy text-center text-2xl font-semibold">
            Company Facts
          </h2>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companyFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border bg-white p-5 shadow-sm"
              >
                <dt className="text-brand-strong text-xs font-semibold tracking-wide uppercase">
                  {fact.label}
                </dt>
                <dd className="text-navy mt-1 text-sm font-medium">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 rounded-xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-heading text-navy text-center text-xl font-semibold">
            Our Mission
          </h2>
          <p className="text-ink mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed sm:text-base">
            To deliver reliable, high-quality technical and contracting services
            to every client in Dubai — on time, on budget, and without the
            hassle of managing multiple contractors.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="font-heading text-navy text-center text-2xl font-semibold">
            Our Values
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
            Telal Al Qema Building Contracting operates under a Dubai trade
            license and our technical teams work in line with the regulatory
            approvals required for electrical, HVAC, and fire-safety-related
            work in the UAE.
          </p>
          <ul className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
            {credentials.map((credential) => (
              <li
                key={credential.label}
                className="rounded-lg border bg-white p-4 shadow-sm"
              >
                <BadgeCheck className="text-brand size-5" />
                <p className="text-navy mt-2 text-sm font-semibold">
                  {credential.label}
                </p>
                <p className="text-ink mt-1 text-xs leading-relaxed">
                  {credential.value}
                </p>
              </li>
            ))}
          </ul>
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
                <p className="text-brand-strong text-xs font-semibold tracking-wide uppercase">
                  {member.role}
                </p>
                {member.subrole ? (
                  <p className="text-ink mt-1 text-xs">{member.subrole}</p>
                ) : null}
                {member.bio ? (
                  <p className="text-ink mx-auto mt-2 max-w-[260px] text-xs leading-relaxed">
                    {member.bio}
                  </p>
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
          __html: JSON.stringify(aboutPageJsonLd()).replace(/</g, "\\u003c"),
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
