import { BadgeCheck, Clock, Gem, HandCoins, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/container";

const features = [
  {
    icon: Gem,
    title: "Quality Materials",
    text: "We use only high-quality, tested materials across every service, so results last and hold up to Dubai's climate.",
  },
  {
    icon: BadgeCheck,
    title: "Expert, Licensed Team",
    text: "Our technicians and tradespeople bring hands-on field experience across MEP, fit-out, and renovation work — not subcontracted guesswork.",
  },
  {
    icon: HandCoins,
    title: "Transparent, Fair Pricing",
    text: "Clear quotes with no hidden costs, and practical recommendations that reduce long-term maintenance and energy spend.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Reliable Work",
    text: "Every project follows safe work practices from planning through handover, so your property and people stay protected.",
  },
  {
    icon: Clock,
    title: "Fast Response",
    text: "Free site visits and quotes typically within 24 hours, with scheduling that respects your timeline.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="font-heading text-navy text-2xl font-semibold sm:text-3xl">
            Why Dubai Chooses Telal Al Qema
          </h2>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="bg-brand-soft/60 flex items-start gap-4 rounded-xl border p-6"
            >
              <span className="bg-brand text-brand-soft flex size-11 shrink-0 items-center justify-center rounded-lg text-white">
                <feature.icon className="size-6" />
              </span>
              <div>
                <h3 className="text-navy font-heading text-base font-semibold">
                  {feature.title}
                </h3>
                <p className="text-ink mt-1.5 text-sm leading-relaxed">
                  {feature.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
