"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";

export default function DashboardClient({ initialProjects, adminEmail }) {
  const [projects, setProjects] = useState(initialProjects);
  const router = useRouter();

  const featuredCount = useMemo(() => projects.filter((p) => p.featured).length, [projects]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.push("/vt-admin/login");
    router.refresh();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-mist">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-vt-gradient opacity-95" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-96 w-96 rounded-full bg-cyan/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">Vistortech Admin</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">Project dashboard</h1>
            <p className="mt-2 text-sm text-white/70">Signed in as {adminEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-fit rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            Sign out
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:max-w-lg"
        >
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-2xl font-bold text-white">{projects.length}</p>
            <p className="text-xs text-white/70">Total projects</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-2xl font-bold text-white">{featuredCount}</p>
            <p className="text-xs text-white/70">Featured</p>
          </div>
          <div className="col-span-2 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md sm:col-span-1">
            <p className="text-2xl font-bold text-white">Cloudinary</p>
            <p className="text-xs text-white/70">Image storage</p>
          </div>
        </motion.div>

        <div className="mt-12">
          <ProjectForm onCreated={(p) => setProjects((prev) => [p, ...prev])} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mt-14"
        >
          <h2 className="font-display text-lg font-semibold text-ink mb-5">
            Existing projects <span className="text-slate font-normal">({projects.length})</span>
          </h2>
          <ProjectList
            projects={projects}
            onDeleted={(id) => setProjects((prev) => prev.filter((p) => p._id !== id))}
          />
        </motion.div>
      </div>
    </div>
  );
}
