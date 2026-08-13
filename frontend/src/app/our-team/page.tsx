import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, FileCheck, MessageCircle, Users } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
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
    text: "A single accountable project manager for every job, coordinating scope, schedule, materials and subcontractors from first visit to handover.",
  },
  {
    icon: FileCheck,
    title: "Certified Technicians",
    text: "Trained and certified installers across HVAC, electrical, plumbing and finishing trades who work to manufacturer and municipal standards.",
  },
  {
    icon: Building2,
    title: "Site Supervision",
    text: "Supervisors who inspect every stage of the work, keep sites safe and tidy, and sign off each phase before the next one starts.",
  },
];

export default function OurTeamPage() {
  return (
    <>
      <PageHeader
        title="The Team Behind Every Project"
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
                  <p className="text-brand-strong text-xs font-semibold uppercase tracking-wide">
                    {member.role}
                  </p>
                  {member.subrole ? (
                    <p className="text-ink mt-1 text-xs">{member.subrole}</p>
                  ) : null}
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
            <Button asChild size="lg" className="bg-white text-navy hover:bg-white/90">
              <Link href="/contact">
                Get a Free Quote
                <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 bg-transparent text-white hover:bg-white hover:text-navy"
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
