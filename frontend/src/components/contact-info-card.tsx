import type { LucideIcon } from "lucide-react";

export function ContactInfoCard({
  icon: Icon,
  title,
  link,
  linkLabel,
  hint,
}: {
  icon: LucideIcon;
  title: string;
  link: string;
  linkLabel: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <Icon className="text-brand size-7" />
      <h3 className="font-heading text-navy mt-3 text-base font-semibold">
        {title}
      </h3>
      <a
        href={link}
        target={link.startsWith("http") ? "_blank" : undefined}
        rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-brand hover:text-brand-strong mt-2 block text-sm font-medium break-words"
      >
        {linkLabel}
      </a>
      <p className="text-ink mt-1 text-xs">{hint}</p>
    </div>
  );
}
