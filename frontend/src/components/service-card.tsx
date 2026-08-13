import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  servicesByGroup,
  serviceGroups,
  type Service,
} from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Card className="bg-white p-2 transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="bg-brand-soft text-brand flex size-11 items-center justify-center rounded-lg">
            <Icon className="size-6" />
          </span>
        </div>
        <CardTitle className="text-navy">
          <Link
            href={`/services/${service.slug}`}
            className="hover:text-brand"
          >
            {service.title}
          </Link>
        </CardTitle>
        <CardDescription className="leading-relaxed">
          {service.short}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export function ServicesGrid({ limit }: { limit?: number }) {
  const items =
    typeof limit === "number"
      ? serviceGroups
          .map((group) => servicesByGroup(group.id))
          .flat()
          .slice(0, limit)
      : serviceGroups
          .map((group) => servicesByGroup(group.id))
          .flat();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}

export function GroupedServicesGrid() {
  return (
    <div className="space-y-12">
      {serviceGroups.map((group) => (
        <div key={group.id}>
          <h3 className="font-heading text-navy text-lg font-semibold">
            {group.title}
          </h3>
          <p className="text-ink mt-1 mb-5 max-w-2xl text-sm leading-relaxed">
            {group.intro}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesByGroup(group.id).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
