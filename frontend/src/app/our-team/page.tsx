import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileCheck,
  MessageCircle,
  Users,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, createMetadata, ourTeamJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { teamMembers } from "@/lib/team";

export const metadata = createMetadata({
  title: "Our Team | Telal Al Qema Building Contracting Dubai",
  description:
    "Meet the technicians, tradespeople, and project managers behind Telal Al Qema Building Contracting's work across Dubai.",
  path: "/our-team",
});

const roles = [
  {
    icon: Users,
    title: "Project Management",
    text: "One dedicated project manager for every job — the same person from first site visit to handover — coordinating scope, schedule, materials and subcontractors so nothing slips through the cracks.",
  },
  {
    icon: FileCheck,
    title: "Certified Technicians",
    text: "Trained and certified installers across HVAC, electrical, plumbing and finishing trades, including DEWA-compliant electrical installation and testing, working to manufacturer specifications and Dubai's regulatory standards.",
  },
  {
    icon: Building2,
    title: "Site Supervision",
    text: "Supervisors who inspect every stage of the work, keep sites safe and tidy, and sign off each phase before the next one starts.",
  },
];

const trades = [
  {
    trade: "HVAC",
    credential:
      "Certified installation and servicing — certifying body pending confirmation.",
  },
  {
    trade: "Electrical",
    credential: "DEWA-compliant installation and testing.",
  },
  {
    trade: "Plumbing",
    credential: "Certified installation — standard pending confirmation.",
  },
  {
    trade: "Fit-Out & Carpentry",
    credential: "Skilled finishing trades — standard pending confirmation.",
  },
  {
    trade: "Site Safety",
    credential:
      "Safety practices in line with Dubai Civil Defence requirements — pending confirmation.",
  },
];

const teamStats = [
  {
    value: "[X]+",
    label: "Certified Technicians & Tradespeople",
  },
  { value: "500+", label: "Projects Completed" },
  { value: "15", label: "Specialist Trades Covered" },
  { value: "1", label: "Accountable Project Manager per Job" },
];

export default function OurTeamPage() {
  return (
    <>
      <PageHeader
        title="Meet the Team Behind Telal Al Qema Building Contracting in Dubai"
        description="Skilled tradespeople and experienced project managers, working as one team from quote to handover."
        breadcrumb="Who we are"
      />
      <section className="py-16">
        <Container>
          <Image
            src="/images/Our Team/our-team-engineers-contractors-dubai-skyline.png"
            alt="Telal Al Qema engineers and contractors in Dubai"
            width={1774}
            height={887}
            priority
            className="mb-12 w-full rounded-xl object-cover shadow-sm"
          />
          <p className="text-ink mx-auto max-w-3xl text-center text-sm leading-relaxed sm:text-base">
            Every project at Telal Al Qema is backed by a team that combines
            hands-on trade experience with proper project management — so
            nothing falls through the cracks between disciplines. From the first
            site visit to final handover, the same team stays accountable for
            the result.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {roles.map((role) => (
              <div
                key={role.title}
                className="bg-brand-soft/60 rounded-xl border p-6"
              >
                <role.icon className="text-brand size-8" />
                <h2 className="font-heading text-navy mt-4 text-lg font-semibold">
                  {role.title}
                </h2>
                <p className="text-ink mt-2 text-sm leading-relaxed">
                  {role.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="font-heading text-navy text-center text-2xl font-semibold">
              Meet Our Team
            </h2>
            <p className="text-ink mt-2 text-center text-sm">
              The leadership and senior staff behind our work in Dubai.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
          </div>

          <div className="mt-16">
            <div className="mb-8 text-center">
              <h2 className="font-heading text-navy text-2xl font-semibold">
                Our Trades &amp; Certifications
              </h2>
              <p className="text-ink mt-2 text-sm">
                Behind the projects are certified tradespeople across the full
                MEP, fit-out and maintenance scope.
              </p>
            </div>
            <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
              {trades.map((item) => (
                <li
                  key={item.trade}
                  className="rounded-lg border bg-white p-4 shadow-sm"
                >
                  <BadgeCheck className="text-brand size-5" />
                  <p className="text-navy mt-2 text-sm font-semibold">
                    {item.trade}
                  </p>
                  <p className="text-ink mt-1 text-xs leading-relaxed">
                    {item.credential}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-navy-dark mt-16 rounded-xl py-10 text-white sm:py-12">
            <h2 className="font-heading text-center text-2xl font-semibold">
              By the Numbers
            </h2>
            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-y-8 sm:grid-cols-4">
              {teamStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-heading text-brand text-3xl font-bold sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-gray-300 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand">
        <Container className="flex flex-col items-center gap-6 py-14 text-center text-white">
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
            Want to work with our team?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="text-navy bg-white hover:bg-white/90"
            >
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
          __html: JSON.stringify(ourTeamJsonLd()).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Our Team", path: "/our-team" },
            ]),
          ).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
