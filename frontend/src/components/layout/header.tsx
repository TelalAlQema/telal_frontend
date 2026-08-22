"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { SiteLogo } from "@/components/layout/site-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  serviceGroups,
  servicesByGroup,
} from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/our-team", label: "Our Team" },
  { href: "/services", label: "Our Services", hasChildren: true },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

function TopBar() {
  return (
    <div className="bg-navy text-white">
      <Container className="hidden justify-end gap-6 py-2 text-xs sm:flex">
        <a
          href={siteConfig.telUrl}
          className="hover:text-brand inline-flex items-center gap-1.5"
        >
          <Phone className="text-brand size-3.5" />
          {siteConfig.phone}
        </a>
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand inline-flex items-center gap-1.5"
        >
          <MessageCircle className="text-brand size-3.5" />
          {siteConfig.whatsapp}
        </a>
        <a
          href={siteConfig.emailHref}
          className="hover:text-brand inline-flex items-center gap-1.5"
        >
          <Mail className="text-brand size-3.5" />
          {siteConfig.email}
        </a>
        <a
          href={siteConfig.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand inline-flex items-center gap-1.5"
        >
          <MapPin className="text-brand size-3.5" />
          {siteConfig.address}
        </a>
      </Container>
    </div>
  );
}

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive ? "text-brand" : "hover:text-brand text-gray-600",
      )}
    >
      {label}
    </Link>
  );
}

function ServicesMenu() {
  return (
    <div className="w-[min(46rem,calc(100vw-2rem))] rounded-lg border bg-white p-4 shadow-lg">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-6">
        {serviceGroups.map((group) => (
          <div key={group.id}>
            <p className="font-heading text-navy mb-2 border-b pb-1 text-xs font-semibold tracking-wide uppercase">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {servicesByGroup(group.id).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:bg-accent hover:text-navy block rounded-md px-2 py-1.5 text-sm text-gray-700"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopNav() {
  const pathname = usePathname();
  const servicesActive = pathname.startsWith("/services");

  return (
    <nav
      className="hidden items-center gap-1 lg:flex"
      aria-label="Main navigation"
    >
      {navLinks.map((link) => {
        if (!link.hasChildren) {
          return (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href)
              }
            />
          );
        }

        return (
          <div key={link.href} className="group relative">
            <Link
              href="/services"
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                servicesActive
                  ? "text-brand"
                  : "hover:text-brand text-gray-600",
              )}
            >
              {link.label}
              <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute top-full left-0 z-40 pt-2 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ServicesMenu />
            </div>
          </div>
        );
      })}
    </nav>
  );
}

function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon-lg" aria-label="Open menu">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 bg-white">
          <SheetHeader>
            <SheetTitle className="sr-only">Navigation</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col overflow-y-auto px-4 pb-8">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-sm font-medium",
                    pathname === link.href || pathname.startsWith(link.href)
                      ? "text-brand"
                      : "text-gray-700",
                  )}
                >
                  {link.label}
                </Link>
                {link.hasChildren &&
                  serviceGroups.map((group) => (
                    <div key={group.id} className="ml-3 border-l pl-3">
                      <p className="text-navy mt-1 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
                        {group.title}
                      </p>
                      {servicesByGroup(group.id).map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="hover:text-brand block rounded-md px-3 py-2 text-sm text-gray-600"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  ))}
              </div>
            ))}
            <div className="mt-6">
              <Button asChild className="w-full">
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
            </div>
            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <a href={siteConfig.emailHref} className="hover:text-brand block">
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand block"
              >
                {siteConfig.whatsapp}
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <TopBar />
      <div className="border-t border-white/10 py-3">
        <Container className="flex items-center justify-between gap-4">
          <SiteLogo />
          <DesktopNav />
          <div className="flex items-center gap-2">
            <Button asChild className="hidden rounded-full lg:inline-flex">
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
            <MobileNav />
          </div>
        </Container>
      </div>
    </header>
  );
}
