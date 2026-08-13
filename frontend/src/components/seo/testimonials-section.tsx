import { Container } from "@/components/layout/container";

export type Testimonial = {
  quote: string;
  name: string;
  area: string;
};

/**
 * Testimonials data source.
 *
 * The SEO brief marks testimonials as PLACEHOLDER content. Only genuine client
 * quotes (e.g. from the Google Business Profile) should be added here. The
 * section stays hidden until real quotes are provided — never fabricate them.
 */
export const testimonials: Testimonial[] = [];

export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="font-heading text-navy text-2xl font-semibold sm:text-3xl">
            What Our Clients Say
          </h2>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.name}
              className="flex flex-col rounded-xl border bg-white p-6 shadow-sm"
            >
              <blockquote className="text-ink flex-1 text-sm leading-relaxed">
                “{testimonial.quote}”
              </blockquote>
              <footer className="mt-4">
                <p className="text-navy font-heading text-sm font-semibold">
                  {testimonial.name}
                </p>
                <p className="text-ink text-xs">{testimonial.area}</p>
              </footer>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
