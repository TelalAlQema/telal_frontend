import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";

import { CtaBanner } from "@/components/cta-banner";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { posts } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Practical advice for Dubai property owners, facility managers and businesses — on HVAC, annual maintenance contracts, fit-out, waterproofing and more from Telal Al Qema Building Contracting.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Blog"
        description="Practical advice for Dubai property owners, facility managers and businesses — on HVAC, maintenance, fit-out and more."
        breadcrumb="Insights & advice"
      />
      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[16/10] overflow-hidden"
                >
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    sizes="(min-width: 1152px) 352px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CalendarDays className="text-brand size-3.5" />
                    <time dateTime={post.date}>{post.dateLabel}</time>
                  </div>
                  <h2 className="font-heading text-navy mt-3 text-lg leading-snug font-semibold">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-brand-strong transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-ink mt-2 flex-1 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-brand-strong mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
                  >
                    Read Article
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
