import Image from "next/image";

import { Container } from "@/components/layout/container";

export function AboutSection() {
  return (
    <section className="py-16">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-navy text-2xl font-semibold sm:text-3xl">
            A Building Contracting Company Dubai Businesses &amp; Homeowners
            Trust
          </h2>
          <p className="text-ink mt-5 text-sm leading-relaxed sm:text-base">
            Telal Al Qema Building Contracting is a Dubai-based technical
            services and building contracting company delivering quality,
            reliability, and craftsmanship across every project we take on. From
            HVAC and electrical systems to fit-out, renovation, and annual
            maintenance contracts (AMC), our experienced team manages the full
            lifecycle of a project — planning, execution, and after-care —
            under one roof.
          </p>
          <p className="text-ink mt-4 text-sm leading-relaxed sm:text-base">
            We work with villas, apartments, offices, and commercial spaces
            across Dubai, combining skilled tradespeople with modern equipment
            and a straightforward, transparent approach to pricing. Whether you
            need a single repair, a full villa renovation, or an ongoing
            maintenance contract, our goal is the same: dependable work, done
            right, at a fair cost.
          </p>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-sm">
          <Image
            src="/images/About Us/telal-building-contracting-services-dubai-about-us.png"
            alt="Telal Al Qema Building Contracting team on a renovation project site in Dubai"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
