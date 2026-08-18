// import Link from "next/link";
// import Image from "next/image";
// import { ArrowRight, CalendarDays, Clock } from "lucide-react";

// import { CtaBanner } from "@/components/cta-banner";
// import { Container } from "@/components/layout/container";
// import { PageHeader } from "@/components/layout/page-header";
// import { blogCategories, posts } from "@/lib/blog";
// import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";

// export const metadata = createMetadata({
//   title: "Blog | Contracting, MEP & Renovation Tips | Telal Al Qema",
//   description:
//     "Practical guides on MEP maintenance, renovation, fit-out, and property upkeep in Dubai — from the team at Telal Al Qema Building Contracting.",
//   path: "/blog",
// });

// export default async function BlogPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ category?: string | string[] }>;
// }) {
//   const { category } = await searchParams;
//   const activeCategory =
//     typeof category === "string" ? category : undefined;
//   const filteredPosts = activeCategory
//     ? posts.filter((post) =>
//         blogCategories.some(
//           (cat) => cat.slug === activeCategory && cat.title === post.category,
//         ),
//       )
//     : posts;

//   return (
//     <>
//       <PageHeader
//         title="Guides & Insights for Dubai Property Owners"
//         description="Practical, no-fluff guides on MEP, fit-out, renovation, and property care — written for Dubai homeowners, facility managers, and businesses."
//         breadcrumb="Blog"
//       />
//       <section className="py-16">
//         <Container>
//           <div className="mb-10">
//             <h2 className="text-navy font-heading text-2xl font-semibold">
//               Browse by Topic
//             </h2>
//             <div className="mt-4 flex flex-wrap gap-2">
//               <Link
//                 href="/blog"
//                 className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
//                   !activeCategory
//                     ? "bg-brand border-brand text-white"
//                     : "text-ink border-gray-200 bg-white hover:border-brand hover:text-brand-strong"
//                 }`}
//               >
//                 All Posts
//               </Link>
//               {blogCategories.map((cat) => (
//                 <Link
//                   key={cat.slug}
//                   href={`/blog?category=${cat.slug}`}
//                   className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
//                     activeCategory === cat.slug
//                       ? "bg-brand border-brand text-white"
//                       : "text-ink border-gray-200 bg-white hover:border-brand hover:text-brand-strong"
//                   }`}
//                 >
//                   {cat.title}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           <h2 className="text-navy font-heading mb-6 text-2xl font-semibold">
//             Recent Posts
//           </h2>

//           {filteredPosts.length === 0 ? (
//             <p className="text-ink py-8 text-center">
//               No posts in this topic yet — check back soon.
//             </p>
//           ) : (
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {filteredPosts.map((post) => (
//                 <article
//                   key={post.slug}
//                   className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md"
//                 >
//                   <Link
//                     href={`/blog/${post.slug}`}
//                     className="relative block aspect-[16/10] overflow-hidden"
//                   >
//                     <Image
//                       src={post.image.src}
//                       alt={post.image.alt}
//                       fill
//                       sizes="(min-width: 1152px) 352px, (min-width: 768px) 50vw, 100vw"
//                       className="object-cover transition-transform duration-300 group-hover:scale-105"
//                     />
//                   </Link>
//                   <div className="flex flex-1 flex-col p-6">
//                     <div className="flex flex-wrap items-center gap-2">
//                       <span className="bg-brand-soft text-brand-strong rounded-full px-3 py-1 text-xs font-semibold">
//                         {post.category}
//                       </span>
//                     </div>
//                     <h3 className="font-heading text-navy mt-3 text-lg leading-snug font-semibold">
//                       <Link
//                         href={`/blog/${post.slug}`}
//                         className="hover:text-brand-strong transition-colors"
//                       >
//                         {post.title}
//                       </Link>
//                     </h3>
//                     <p className="text-ink mt-2 flex-1 text-sm leading-relaxed">
//                       {post.excerpt}
//                     </p>
//                     <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
//                       <span className="inline-flex items-center gap-1.5">
//                         <CalendarDays className="text-brand size-3.5" />
//                         <time dateTime={post.date}>{post.dateLabel}</time>
//                       </span>
//                       <span className="inline-flex items-center gap-1.5">
//                         <Clock className="text-brand size-3.5" />
//                         {post.readTimeMinutes} min read
//                       </span>
//                     </div>
//                     <Link
//                       href={`/blog/${post.slug}`}
//                       className="text-brand-strong mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
//                     >
//                       Read Article
//                       <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
//                     </Link>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           )}
//         </Container>
//       </section>
//       <CtaBanner />
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(
//             breadcrumbJsonLd([
//               { name: "Home", path: "/" },
//               { name: "Blog", path: "/blog" },
//             ]),
//           ).replace(/</g, "\\u003c"),
//         }}
//       />
//     </>
//   );
// }


import { CtaBanner } from "@/components/cta-banner";
import { PageHeader } from "@/components/layout/page-header";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import BlogContent from "@/components/blog/blog-content";

export const metadata = createMetadata({
  title: "Blog | Contracting, MEP & Renovation Tips | Telal Al Qema",
  description:
    "Practical guides on MEP maintenance, renovation, fit-out, and property upkeep in Dubai — from the team at Telal Al Qema Building Contracting.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Guides & Insights for Dubai Property Owners"
        description="Practical, no-fluff guides on MEP, fit-out, renovation, and property care — written for Dubai homeowners, facility managers, and businesses."
        breadcrumb="Blog"
      />

      <BlogContent />

      <CtaBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ]),
          ).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}