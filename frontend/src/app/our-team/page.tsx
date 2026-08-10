import { Building2, FileCheck, Users } from "lucide-react";

import { CtaBanner } from "@/components/cta-banner";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Our Team",
  description:
    "Meet the Telal Al Qema team — experienced project managers, certified technicians and skilled tradespeople behind our contracting services in Dubai.",
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

const teamValues = [
  "Honest advice before a quote",
  "Accountable point of contact",
  "Respectful, on-time engineers",
  "Clean completion and aftercare",
];

export default function OurTeamPage() {
  return (
    <>
      <PageHeader
        title="Our Team"
        description="The people who plan, supervise and deliver your project to the promised standard."
        breadcrumb="Who we are"
      />
      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
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
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {teamValues.map((value) => (
              <li
                key={value}
                className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm"
              >
                <span className="bg-brand size-2 shrink-0 rounded-full" />
                <span className="text-navy text-sm font-medium">{value}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
