import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { CtaBanner } from "@/components/cta-banner";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Telal Al Qema Building Contracting is a Dubai-based contracting company delivering MEP, fit-out, renovation and maintenance services to homes and businesses.",
  path: "/about",
});

const team = [
  {
    src: "/images/Our Team/mr.issa.png",
    name: "Engr. Essa Almulla",
    role: "Founder / CEO",
  },
  {
    src: "/images/Our Team/sohel.png",
    name: "Eiahia Sohel",
    role: "Business Development Manager",
  },
  {
    src: "/images/Our Team/marllyn.jpg",
    name: "Marlyn Policarpio",
    role: "Accountant / Admin",
  },
  {
    src: "/images/Our Team/team1.jpeg",
    name: "Syed Talib Hussain",
    role: "Digital Marketing Manager",
    subrole: "Associate",
  },
  {
    src: "/images/Our Team/mahmoud.png",
    name: "Mahmoud Mandour",
    role: "PR Manager",
  },
  {
    src: "/images/Our Team/ghulam.png",
    name: "Ghulam Murtaza",
    role: "Supervisor",
  },
];

const values = [
  {
    title: "Quality without shortcuts",
    text: "Compliant materials, certified installers and clean finishes — every time.",
  },
  {
    title: "Accountability",
    text: "One project manager owns your job from quotation to handover.",
  },
  {
    title: "Transparent pricing",
    text: "Fixed-scope proposals with no hidden costs or surprise invoices.",
  },
  {
    title: "Respect for your site",
    text: "Safe, tidy and on-schedule works that respect neighbours and occupants.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        description="Who we are and what we stand for as a Dubai building contractor."
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
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-brand text-sm font-medium">Our story</p>
            <h2 className="font-heading text-navy mt-1 text-2xl font-semibold">
              Building trust across Dubai, one project at a time
            </h2>
            <p className="text-ink mt-4 text-sm leading-relaxed">
              Telal Al Qema Building Contracting delivers specialised
              contracting services across Dubai — from HVAC and electrical
              installation to complete fit-out, renovation and maintenance. We
              combine experienced in-house teams with disciplined project
              management so clients get one accountable partner for the whole
              job.
            </p>
            <p className="text-ink mt-3 text-sm leading-relaxed">
              Whether you&apos;re a homeowner refreshing a flat or a business
              fitting out office space, our approach is the same: a clear scope,
              a fair fixed quotation, and craftsmanship we&apos;re willing to
              stand behind.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/contact">Work With Us</Link>
              </Button>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
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
      </Container>
      <section className="bg-brand-soft/60 py-16">
        <Container>
          <div className="mb-10 text-center">
            <p className="text-brand text-sm font-medium">Our team</p>
            <h2 className="font-heading text-navy mt-1 text-2xl font-semibold">
              Meet Our Team
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="bg-brand-soft/40 rounded-full p-1.5">
                  <Image
                    src={member.src}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="mx-auto size-44 rounded-full border-4 border-white object-cover shadow-md sm:size-40 lg:size-44"
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
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
