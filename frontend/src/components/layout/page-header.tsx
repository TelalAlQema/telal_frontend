import { Container } from "@/components/layout/container";

export function PageHeader({
  title,
  description,
  breadcrumb,
}: {
  title: string;
  description?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="bg-navy text-white">
      <Container className="py-14 sm:py-16">
        {breadcrumb ? (
          <p className="text-brand mb-2 text-xs tracking-wide uppercase">
            {breadcrumb}
          </p>
        ) : null}
        <h1 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-gray-300">{description}</p>
        ) : null}
      </Container>
    </section>
  );
}
