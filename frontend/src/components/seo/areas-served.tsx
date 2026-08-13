import { Container } from "@/components/layout/container";

const areas = [
  "Downtown Dubai",
  "Business Bay",
  "Dubai Marina",
  "JBR",
  "Jumeirah Lake Towers (JLT)",
  "Jumeirah",
  "Palm Jumeirah",
  "Al Barsha",
  "Arabian Ranches",
  "Mirdif",
  "Deira",
  "DIFC",
];

export function AreasServed() {
  return (
    <section className="bg-brand-soft/40 py-16">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="font-heading text-navy text-2xl font-semibold sm:text-3xl">
            Proudly Serving Homes &amp; Businesses Across Dubai
          </h2>
          <p className="text-ink mt-3 text-sm leading-relaxed sm:text-base">
            We provide contracting and technical services throughout Dubai,
            including:
          </p>
        </div>
        <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
          {areas.map((area) => (
            <li
              key={area}
              className="rounded-full border bg-white px-5 py-2 text-sm font-medium text-navy shadow-sm"
            >
              {area}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
