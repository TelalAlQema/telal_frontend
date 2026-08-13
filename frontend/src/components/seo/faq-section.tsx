import { ChevronDown } from "lucide-react";

import { Container } from "@/components/layout/container";
import { faqJsonLd } from "@/lib/seo";

type FaqItem = { question: string; answer: string };

/**
 * Homepage FAQ. Answers are sourced from the approved legacy site copy
 * (refined for tone) plus the SEO brief's new keyword-targeted questions.
 * No facts are invented — items requiring client confirmation are marked
 * [confirm].
 */
const faqItems: FaqItem[] = [
  {
    question: "What is an Annual Maintenance Contract (AMC)?",
    answer:
      "An Annual Maintenance Contract (AMC) is an agreement between the technical service provider and client in which the client's property is maintained and taken care of for the entire year. The services outlined in the agreement are provided to customers at their convenience, and it's a great way to get support at affordable prices.",
  },
  {
    question:
      "Is it worth getting an AMC contract with Telal Al Qema Building Contracting?",
    answer:
      "Absolutely! With our AMC, you get numerous technical services of your preference at pocket-friendly prices. With our AMC, you can stop worrying about everything because it will take care of all your technical needs for a year. It makes maintenance an easy and stress-free job for you with high-quality results.",
  },
  {
    question: "What services are offered in your AMC package?",
    answer:
      "Our AMC package includes services such as cleaning of appliances, AC maintenance services, maintenance of property, extra-low voltage services, commercial cleaning, and much more.",
  },
  {
    question:
      "What makes Telal Al Qema the best building contracting company in Dubai?",
    answer:
      "Telal Al Qema Building Contracting is trusted for several reasons. We offer a wide range of services to our customers, have all the modern machinery you need for maintenance, have a professional and highly reliable staff, charge what we work for, and welcome entities of all sizes including villas.",
  },
  {
    question: "Do your technical services provide quality results?",
    answer:
      "Yes, definitely. We work with professionalism and have skilled laborers with modern machinery to provide you with the best services. Quality is ensured because our team works through detailed planning.",
  },
  {
    question: "Do you also offer villa maintenance in your AMC?",
    answer:
      "Yes! Our company offers Annual Maintenance Contracts to customers who own villas, ensuring the maintenance of such large properties. A wide range of services is offered including cleaning, painting, water tank cleaning, and several others.",
  },
  {
    question: "How much does renovation or fit-out cost in Dubai?",
    answer:
      "The cost of renovation or fit-out depends on your property's size, the scope of work, and the finish level you choose. Rather than a fixed price, we provide clear, itemised quotes — request a free quote and we'll confirm a transparent figure for your project.",
  },
  {
    question: "Do you provide free quotes and site visits?",
    answer:
      "Yes. We provide free site visits and quotes, typically within 24 hours of your enquiry.",
  },
  {
    question: "Which areas of Dubai do you cover?",
    answer:
      "We provide contracting and technical services throughout Dubai, including Downtown Dubai, Business Bay, Dubai Marina, JBR, Jumeirah Lake Towers (JLT), Jumeirah, Palm Jumeirah, Al Barsha, Arabian Ranches, Mirdif, Deira, and DIFC.",
  },
  {
    question: "How quickly can you start a project?",
    answer:
      "Once your quote is approved, we schedule the work around your availability and confirm a start date for your project. For an indicative turnaround time for your project type, request a free quote.",
  },
];

export function FaqSection() {
  return (
    <section className="py-16">
      <Container className="max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-navy text-2xl font-semibold sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border bg-white shadow-sm"
            >
              <summary className="text-navy font-heading flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold sm:text-base [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown className="text-brand size-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="text-ink border-t px-5 py-4 text-sm leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd(faqItems)).replace(/</g, "\\u003c"),
          }}
        />
      </Container>
    </section>
  );
}
