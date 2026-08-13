import Image from "next/image";

import { Container } from "@/components/layout/container";

export type FeaturedProject = {
  title: string;
  serviceType: string;
  area: string;
  image: { src: string; alt: string };
};

/**
 * Featured Projects data source.
 *
 * The SEO brief requires REAL project information only — never invent projects.
 * Populate this array with verified project photography, service type and Dubai
 * area. The section stays hidden (renders nothing) until data is provided.
 */
export const featuredProjects: FeaturedProject[] = [];

function projectAltText(project: FeaturedProject): string {
  return (
    project.image.alt ||
    `${project.serviceType} project in ${project.area} by Telal Al Qema Building Contracting`
  );
}

export function ProjectsSection() {
  if (featuredProjects.length === 0) return null;

  return (
    <section className="bg-brand-soft/40 py-16">
      <Container>
        <div className="mb-10">
          <h2 className="font-heading text-navy text-2xl font-semibold sm:text-3xl">
            Recent Work Across Dubai
          </h2>
          <p className="text-ink mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
            A look at recent fit-out, renovation, and MEP projects completed
            for our clients.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <figure
              key={project.title}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-sm"
            >
              <Image
                src={project.image.src}
                alt={projectAltText(project)}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                <p className="font-heading text-sm font-semibold text-white">
                  {project.title}
                </p>
                <p className="text-xs text-white/80">
                  {project.serviceType} · {project.area}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
