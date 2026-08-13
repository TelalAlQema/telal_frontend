import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { breadcrumbJsonLd } from "@/lib/seo";

export function LegalPage({
  title,
  updated,
  sections,
  breadcrumb = "Legal",
  path,
}: {
  title: string;
  updated: string;
  breadcrumb?: string;
  path: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <PageHeader title={title} breadcrumb={breadcrumb} />
      <Container className="max-w-3xl py-14">
        <p className="text-ink text-xs">Last updated: {updated}</p>
        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-heading text-navy text-lg font-semibold">
                {section.heading}
              </h2>
              {section.body.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-ink mt-2 text-sm leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: title, path },
            ]),
          ).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
