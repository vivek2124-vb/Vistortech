import ServiceCard from "@/components/ServiceCard";
import { SERVICES } from "@/lib/data";

export const metadata = {
  title: "Services — Vistortech",
};

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="font-display text-4xl font-bold text-ink">Services</h1>
      <p className="mt-4 text-lg text-slate max-w-xl">
        Four services that cover what most businesses need to grow online — from a first website
        to ongoing marketing.
      </p>
      <div className="mt-12 grid sm:grid-cols-2 gap-6">
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.slug}
            title={service.title}
            slug={service.slug}
            description={service.short}
          />
        ))}
      </div>
    </section>
  );
}
