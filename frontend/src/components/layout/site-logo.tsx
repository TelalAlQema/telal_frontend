import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteLogo() {
  return (
    <Link
      href="/"
      className="flex items-center"
      aria-label={`${siteConfig.name} — Home`}
    >
      <Image
        src="/images/logo/telal-logo.png"
        alt={siteConfig.name}
        width={200}
        height={36}
        className="h-10 w-auto"
        priority
      />
    </Link>
  );
}
