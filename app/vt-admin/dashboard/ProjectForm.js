"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ImageUploader from "./components/ImageUploader";

const CATEGORIES = [
  { value: "web-development", label: "Web Development" },
  { value: "app-development", label: "App Development" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "ecommerce-website", label: "E-commerce Website" },
];

const EMPTY_FORM = {
  title: "",
  category: "web-development",
  description: "",
  techStack: "",
  liveUrl: "",
  clientName: "",
  testimonial: "",
  featured: false,
};

const fieldClass =
  "w-full rounded-xl border border-slate/20 bg-white/70 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none transition-all duration-200 focus:border-sky focus:ring-4 focus:ring-sky/15";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate/80";

export default function ProjectForm({ onCreated }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [images, setImages] = useState([]); // { tempId?, url, publicId?, uploading?, progress?, error? }
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  const stillUploading = images.some((img) => img.uploading);
  const readyImages = images.filter((img) => img.publicId && !img.uploading && !img.error);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (stillUploading) {
      setError("Hang tight — images are still uploading.");
      return;
    }

    setStatus("saving");

    const payload = {
      ...form,
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      images: readyImages.map((img) => img.url),
      imagePublicIds: readyImages.map((img) => img.publicId),
    };

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Could not save project");
      }

      const data = await res.json();
      setForm(EMPTY_FORM);
      setImages([]);
      setStatus("idle");
      onCreated?.(data.project);
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="relative space-y-6 overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 sm:p-8 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.35)] backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-vt-gradient opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan/20 blur-3xl" />

      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-vt-gradient text-white shadow-lg shadow-sky/30">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">Add a project</h2>
          <p className="text-xs text-slate">Upload images and publish it straight to the portfolio.</p>
        </div>
      </div>

      <div className="relative grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className={fieldClass}
            placeholder="Acme e-commerce revamp"
          />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className={fieldClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative">
        <label className={labelClass}>Description</label>
        <textarea
          required
          rows={3}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="relative">
        <label className={labelClass}>Portfolio images</label>
        <ImageUploader value={images} onChange={setImages} />
        {images.length > 0 && (
          <p className="mt-2 text-[11px] text-slate">
            First image becomes the cover photo. {readyImages.length}/{images.length} ready.
          </p>
        )}
      </div>

      <div className="relative grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Tech stack (comma-separated)</label>
          <input
            value={form.techStack}
            onChange={(e) => update("techStack", e.target.value)}
            placeholder="React, Node.js, MongoDB"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass}>Live URL</label>
          <input
            value={form.liveUrl}
            onChange={(e) => update("liveUrl", e.target.value)}
            placeholder="https://client-site.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="relative grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Client name</label>
          <input
            value={form.clientName}
            onChange={(e) => update("clientName", e.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="flex items-end pb-2.5">
          <label className="flex items-center gap-2 text-sm font-medium text-ink">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update("featured", e.target.checked)}
              className="h-4 w-4 rounded border-slate/40 text-sky focus:ring-sky/40"
            />
            Feature on homepage
          </label>
        </div>
      </div>

      <div className="relative">
        <label className={labelClass}>Client testimonial (optional)</label>
        <textarea
          rows={2}
          value={form.testimonial}
          onChange={(e) => update("testimonial", e.target.value)}
          className={fieldClass}
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}

      <motion.button
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "saving" || stillUploading}
        className="relative w-full rounded-full bg-vt-gradient px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky/30 transition-opacity disabled:opacity-60 sm:w-auto"
      >
        {status === "saving" ? "Saving…" : stillUploading ? "Uploading images…" : "Save project"}
      </motion.button>
    </motion.form>
  );
}
