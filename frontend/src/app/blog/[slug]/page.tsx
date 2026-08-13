import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  User,
} from "lucide-react";

import { CtaBanner } from "@/components/cta-banner";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { getPostBySlug, posts, type BlogBlock } from "@/lib/blog";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return createMetadata({
      title: "Post Not Found",
      description: "This blog post could not be found.",
      path: "/blog",
    });
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

function BlogBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className="text-navy pt-4 text-xl font-semibold"
              >
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={index} className="text-ink leading-relaxed">
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul key={index} className="space-y-3">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="text-ink flex items-start gap-3 leading-relaxed"
                  >
                    <span className="text-brand mt-1.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                      <Check className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "faq":
            return (
              <div key={index} className="space-y-4">
                {block.items.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-xl border bg-white p-5 shadow-sm"
                  >
                    <h3 className="text-navy font-heading text-base font-semibold">
                      {item.question}
                    </h3>
                    <p className="text-ink mt-2 text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            );
          case "cta": {
            const anchorParts =
              block.anchor && block.href ? block.text.split(block.anchor) : null;
            return (
              <div className="bg-brand-soft/60 rounded-xl border p-6 sm:p-8">
                <p className="text-navy leading-relaxed font-medium">
                  {anchorParts ? (
                    <>
                      {anchorParts[0]}
                      <a
                        href={block.href}
                        className="text-brand-strong font-semibold underline underline-offset-2"
                      >
                        {block.anchor}
                      </a>
                      {anchorParts[1]}
                    </>
                  ) : (
                    block.text
                  )}
                </p>
                <Button asChild size="lg" className="mt-5">
                  <Link href={block.buttonHref ?? "/contact"}>
                    {block.buttonLabel ?? "Get a Free Quote"}
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            );
          }
        }
      })}
    </div>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.image.src}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: post.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logo/telal-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
    timeRequired: `PT${post.readTimeMinutes}M`,
    articleSection: post.category,
  };

  const relatedPosts = (post.relatedSlugs ?? [])
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 3);

  return (
    <>
      <PageHeader
        title={post.title}
        breadcrumb="Blog"
        description={post.description}
      />
      <Container className="max-w-4xl py-16">
        <article>
          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <span className="bg-brand-soft text-brand-strong rounded-full px-3 py-1 text-xs font-semibold">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="text-brand size-4" />
              <time dateTime={post.date}>{post.dateLabel}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="text-brand size-4" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="text-brand size-4" />
              {post.readTimeMinutes} min read
            </span>
          </div>
          <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-xl shadow-sm">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              priority
              sizes="(min-width: 1152px) 896px, 100vw"
              className="object-cover"
            />
          </div>
          <BlogBlocks blocks={post.content} />
          {relatedPosts.length > 0 && (
            <div className="mt-12 border-t pt-8">
              <h2 className="text-navy font-heading mb-4 text-xl font-semibold">
                Related Posts
              </h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-lg">
                      <Image
                        src={related.image.src}
                        alt={related.image.alt}
                        fill
                        sizes="(min-width: 1024px) 256px, (min-width: 640px) 33vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-navy font-heading text-sm leading-snug font-semibold">
                      {related.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="mt-12 border-t pt-8">
            <Link
              href="/blog"
              className="text-brand-strong hover:text-navy inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to Blog
            </Link>
          </div>
        </article>
      </Container>
      <CtaBanner />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
