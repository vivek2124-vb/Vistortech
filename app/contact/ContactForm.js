"use client";

import { useState } from "react";

const SERVICE_OPTIONS = [
  "Web Development",
  "App Development",
  "Digital Marketing",
  "E-commerce Website",
  "Not sure yet",
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sky/30 bg-sky/5 p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-ink">Message sent</h3>
        <p className="mt-2 text-slate">Thanks for reaching out — we'll get back to you within a day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Name</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate/25 px-4 py-2.5 text-ink focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate/25 px-4 py-2.5 text-ink focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Phone (optional)</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate/25 px-4 py-2.5 text-ink focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Service you're interested in</label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate/25 px-4 py-2.5 text-ink focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">Message</label>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate/25 px-4 py-2.5 text-ink focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
        />
      </div>

      {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-ink px-7 py-3 text-sm font-medium text-white hover:bg-sky transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
