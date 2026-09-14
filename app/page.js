import Link from "next/link";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import Testimonial from "@/models/Testimonial";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import { SERVICES } from "@/lib/data";

export const dynamic = "force-dynamic";

async function getFeaturedProjects() {
  try {
    await connectDB();
    const projects = await Project.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(3);
    return JSON.parse(JSON.stringify(projects));
  } catch (err) {
    return [];
  }
}

async function getTestimonials() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
      .limit(3);
    return JSON.parse(JSON.stringify(testimonials));
  } catch (err) {
    return [];
  }
}

export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([
    getFeaturedProjects(),
    getTestimonials(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-tight">
            Websites and apps that turn visitors into customers
          </h1>
          <p className="mt-5 text-lg text-slate leading-relaxed max-w-md">
            Vistortech designs and builds web experiences, mobile apps, and
            marketing systems for businesses that are ready to grow online.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-sky transition-colors"
            >
              Start a project
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-slate/30 px-6 py-3 text-sm font-medium text-ink hover:border-sky hover:text-sky transition-colors"
            >
              See our work
            </Link>
          </div>
        </div>

        <div className="relative h-72 sm:h-96">
          <svg viewBox="0 0 400 320" className="h-full w-full">
            <defs>
              <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#0EA5E9" />
              </linearGradient>
            </defs>
            <polygon
              points="60,20 100,20 200,300 160,300"
              fill="url(#heroGrad)"
              opacity="0.95"
            />
            <polygon
              points="300,20 340,20 200,300 240,300"
              fill="url(#heroGrad)"
              opacity="0.95"
            />
            <circle cx="200" cy="312" r="10" fill="#22D3EE" />
          </svg>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-white border-y border-slate/10">
        <div className="mx-auto max-w-6xl px-6 py-16 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            [
              "Built to launch on time",
              "Clear timelines and weekly check-ins, so there are no surprises.",
            ],
            [
              "One team, every skill",
              "Design, development, and marketing under one roof.",
            ],
            [
              "Fast, modern builds",
              "Sites and apps built on current frameworks, not outdated templates.",
            ],
            [
              "Support after launch",
              "We stay involved after your site goes live, not just until payment clears.",
            ],
          ].map(([title, body]) => (
            <div key={title}>
              <h3 className="font-display font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm text-slate leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl font-bold text-ink">What we do</h2>
        <p className="mt-2 text-slate max-w-xl">
          Four core services, one team that understands how they work together.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
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

      {/* Featured projects */}
      {projects.length > 0 && (
        <section className="bg-white border-y border-slate/10">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold text-ink">
                  Recent work
                </h2>
                <p className="mt-2 text-slate">
                  A few projects we've shipped recently.
                </p>
              </div>
              <Link
                href="/portfolio"
                className="text-sm font-medium text-sky hidden sm:block"
              >
                View all
              </Link>
            </div>
            {/* The grid that holds your new ProjectCards */}
            <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl font-bold text-ink">
            What clients say
          </h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <blockquote
                key={t._id}
                className="rounded-2xl border border-slate/15 p-6"
              >
                <p className="text-sm text-ink leading-relaxed">
                  "{t.message}"
                </p>
                <footer className="mt-4 text-sm text-slate">
                  {t.clientName}
                  {t.companyOrWebsite && `, ${t.companyOrWebsite}`}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {/* CTA banner */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="font-display text-3xl font-bold text-white">
            Ready to start your project?
          </h2>
          <p className="mt-3 text-white/70">
            Tell us what you're building — we'll get back to you within a day.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-sky px-7 py-3 text-sm font-medium text-white hover:bg-cyan transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
