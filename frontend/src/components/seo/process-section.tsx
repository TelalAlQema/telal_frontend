import { ClipboardList, FileCheck2, Home, Wrench } from "lucide-react";

import { Container } from "@/components/layout/container";

const steps = [
  {
    icon: ClipboardList,
    title: "Request a Free Quote",
    text: "Share your project or service needs via the form, call, or WhatsApp.",
  },
  {
    icon: Home,
    title: "Free Site Visit & Assessment",
    text: "Our team visits, assesses the scope, and confirms a transparent quote.",
  },
  {
    icon: FileCheck2,
    title: "Approval & Scheduling",
    text: "Once approved, we schedule the work around your availability.",
  },
  {
    icon: Wrench,
    title: "Professional Execution & Handover",
    text: "Our technicians complete the work to spec, with a final walkthrough before handover.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="font-heading text-navy text-2xl font-semibold sm:text-3xl">
            How It Works
          </h2>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-xl border bg-white p-6 shadow-sm"
            >
              <span className="text-brand font-heading text-xs font-bold tracking-wider">
                Step {index + 1}
              </span>
              <span className="bg-brand-soft text-brand mt-3 flex size-11 items-center justify-center rounded-lg">
                <step.icon className="size-6" />
              </span>
              <h3 className="text-navy font-heading mt-4 text-base font-semibold">
                {step.title}
              </h3>
              <p className="text-ink mt-1.5 text-sm leading-relaxed">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
