import Link from "next/link";

export default function ServiceCard({ title, slug, description }) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group block rounded-2xl border border-slate/15 p-7 hover:border-sky transition-colors"
    >
      <h3 className="font-display text-lg font-semibold text-ink group-hover:text-sky transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate leading-relaxed">{description}</p>
      <span className="mt-4 inline-block text-sm font-medium text-sky">Learn more</span>
    </Link>
  );
}
