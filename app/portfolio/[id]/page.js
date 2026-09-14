import { notFound } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

async function getProject(id) {
  try {
    await connectDB();
    const project = await Project.findById(id);
    return project ? JSON.parse(JSON.stringify(project)) : null;
  } catch (err) {
    return null;
  }
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return notFound();

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <Link href="/portfolio" className="text-sm text-sky">
        ← Back to portfolio
      </Link>

      <h1 className="mt-4 font-display text-4xl font-bold text-ink">
        {project.title}
      </h1>

      {project.images?.[0] && (
        <div className="mt-8">
          <div className="max-h-[80vh] overflow-auto rounded-2xl border border-slate/15 bg-white p-2">
            {/* Keep the source at its intrinsic size so small screenshots are not stretched. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.images[0]}
              alt={project.title}
              className="h-auto w-auto max-w-full object-contain"
            />
          </div>
          <a
            href={project.images[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-sky hover:text-ink"
          >
            Open original image
          </a>
        </div>
      )}

      <p className="mt-8 text-lg text-slate leading-relaxed">
        {project.description}
      </p>

      {project.techStack?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white border border-slate/20 px-3 py-1 text-xs text-slate"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {project.testimonial && (
        <blockquote className="mt-10 rounded-2xl border border-slate/15 p-6">
          <p className="text-ink leading-relaxed">"{project.testimonial}"</p>
          {project.clientName && (
            <footer className="mt-3 text-sm text-slate">
              {project.clientName}
            </footer>
          )}
        </blockquote>
      )}

      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-sky transition-colors"
        >
          Visit live site
        </a>
      )}
    </section>
  );
}
