"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TiltCard from "./components/TiltCard";

const CATEGORY_LABELS = {
  "web-development": "Web Development",
  "app-development": "App Development",
  "digital-marketing": "Digital Marketing",
  "ecommerce-website": "E-commerce",
};

export default function ProjectList({ projects, onDeleted }) {
  const [deletingId, setDeletingId] = useState(null);

  async function handleDelete(id) {
    if (!confirm("Delete this project? Its images will also be removed from Cloudinary.")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) onDeleted?.(id);
    } finally {
      setDeletingId(null);
    }
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate/25 bg-white/50 px-6 py-12 text-center">
        <p className="text-sm text-slate">No projects yet — add your first one above.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {projects.map((project, i) => (
          <motion.div
            key={project._id}
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: (i % 6) * 0.06, ease: "easeOut" }}
          >
            <TiltCard maxTilt={7}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-[0_15px_40px_-20px_rgba(15,23,42,0.4)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_25px_55px_-20px_rgba(14,165,233,0.45)]">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate/10">
                  {project.images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-slate/50">
                      No image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                  {project.featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-cyan/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink shadow">
                      Featured
                    </span>
                  )}
                  {project.images?.length > 1 && (
                    <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                      +{project.images.length - 1} more
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5" style={{ transform: "translateZ(30px)" }}>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-sky">
                    {CATEGORY_LABELS[project.category] || project.category}
                  </p>
                  <h3 className="mt-1 font-display font-semibold text-ink">{project.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-xs text-slate">{project.description}</p>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <a
                      href={`/portfolio/${project._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-sky hover:underline"
                    >
                      View live →
                    </a>
                    <button
                      onClick={() => handleDelete(project._id)}
                      disabled={deletingId === project._id}
                      className="text-xs font-medium text-red-600 transition-colors hover:text-red-700 disabled:opacity-50"
                    >
                      {deletingId === project._id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
