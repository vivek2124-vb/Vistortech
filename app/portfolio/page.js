import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "Portfolio — Vistortech",
};

export const dynamic = "force-dynamic";

async function getProjects(category) {
  try {
    await connectDB();
    const query = category ? { category } : {};
    const projects = await Project.find(query).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(projects));
  } catch (err) {
    return [];
  }
}

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "web-development", label: "Web Development" },
  { value: "app-development", label: "App Development" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "ecommerce-website", label: "E-commerce" },
];

export default async function PortfolioPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams?.category || "";
  const projects = await getProjects(category);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="font-display text-4xl font-bold text-ink">Portfolio</h1>
      <p className="mt-4 text-lg text-slate max-w-xl">A selection of projects we've delivered for clients.</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {CATEGORIES.map((c) => (
          <a
            key={c.value}
            href={c.value ? `/portfolio?category=${c.value}` : "/portfolio"}
            className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
              category === c.value
                ? "bg-ink text-white border-ink"
                : "border-slate/25 text-slate hover:border-sky hover:text-sky"
            }`}
          >
            {c.label}
          </a>
        ))}
      </div>

      {projects.length === 0 ? (
        <p className="mt-16 text-slate">No projects here yet — check back soon.</p>
      ) : (
        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
