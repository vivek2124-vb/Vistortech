import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, getServiceBySlug } from "@/lib/data";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  return { title: service ? `${service.title} — Vistortech` : "Service — Vistortech" };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return notFound();

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="font-display text-4xl font-bold text-ink">{service.title}</h1>
      <p className="mt-5 text-lg text-slate leading-relaxed">{service.description}</p>

      <h2 className="mt-12 font-display text-2xl font-semibold text-ink">How it works</h2>
      <ol className="mt-6 space-y-4">
        {service.process.map((step, i) => (
          <li key={step} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-white text-sm font-medium">
              {i + 1}
            </span>
            <span className="text-slate leading-relaxed pt-1">{step}</span>
          </li>
        ))}
      </ol>

      <div className="mt-12 rounded-2xl bg-white border border-slate/15 p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-ink">
          Ready to talk about your {service.title.toLowerCase()} project?
        </h3>
        <Link
          href="/contact"
          className="mt-5 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-sky transition-colors"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}
