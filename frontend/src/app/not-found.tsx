import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-heading text-brand text-6xl font-bold">404</p>
      <h1 className="font-heading text-navy text-xl font-semibold">
        Page not found
      </h1>
      <p className="text-ink max-w-md text-sm">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
        Head back home or browse our services.
      </p>
      <div className="mt-2 flex gap-3">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/services">Our Services</Link>
        </Button>
      </div>
    </Container>
  );
}
