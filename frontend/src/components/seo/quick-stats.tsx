import { Container } from "@/components/layout/container";

type Stat = { value: string; label: string };

/**
 * Homepage trust stats. The "[X]+" years figure is a PDF placeholder that the
 * client must confirm before launch — do not replace it with a guessed number.
 */
const stats: Stat[] = [
  { value: "[X]+", label: "Years in Business in Dubai" },
  { value: "500+", label: "Projects Completed" },
  { value: "15", label: "Specialist Services Under One Roof" },
  { value: "< 24 hrs", label: "Average Quote Response Time" },
];

export function QuickStats() {
  return (
    <section className="border-y border-white/10 bg-navy-dark text-white">
      <Container className="grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-brand text-3xl font-bold sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-gray-300 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </Container>
    </section>
  );
}
