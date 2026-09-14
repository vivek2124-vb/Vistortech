"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * value: array of { url, publicId, uploading?, progress?, error? }
 * onChange: (nextValue) => void
 */
export default function ImageUploader({ value, onChange }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const uploadFile = useCallback(
    (file, tempId) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", file);

      xhr.upload.addEventListener("progress", (e) => {
        if (!e.lengthComputable) return;
        const progress = Math.round((e.loaded / e.total) * 100);
        onChange((prev) =>
          prev.map((img) => (img.tempId === tempId ? { ...img, progress } : img))
        );
      });

      xhr.addEventListener("load", () => {
        let data = {};
        try {
          data = JSON.parse(xhr.responseText);
        } catch {
          // ignore parse errors, handled by status check below
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          onChange((prev) =>
            prev.map((img) =>
              img.tempId === tempId
                ? { url: data.url, publicId: data.publicId, uploading: false, progress: 100 }
                : img
            )
          );
        } else {
          onChange((prev) =>
            prev.map((img) =>
              img.tempId === tempId
                ? { ...img, uploading: false, error: data.error || "Upload failed" }
                : img
            )
          );
        }
      });

      xhr.addEventListener("error", () => {
        onChange((prev) =>
          prev.map((img) =>
            img.tempId === tempId ? { ...img, uploading: false, error: "Network error" } : img
          )
        );
      });

      xhr.open("POST", "/api/admin/upload");
      xhr.send(formData);
    },
    [onChange]
  );

  const handleFiles = useCallback(
    (fileList) => {
      const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
      if (files.length === 0) return;

      const newEntries = files.map((file) => ({
        tempId: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        url: URL.createObjectURL(file),
        localPreview: true,
        uploading: true,
        progress: 0,
      }));

      onChange((prev) => [...prev, ...newEntries]);
      newEntries.forEach((entry, i) => uploadFile(files[i], entry.tempId));
    },
    [onChange, uploadFile]
  );

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }

  function handleRemove(img) {
    onChange((prev) => prev.filter((i) => (i.tempId || i.publicId) !== (img.tempId || img.publicId)));
    if (img.publicId) {
      fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: img.publicId }),
      }).catch(() => {});
    }
  }

  function handleRetry(img) {
    // Retry isn't possible without the original File object, so just remove it.
    handleRemove(img);
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-all duration-300 ${
          dragActive
            ? "border-sky bg-sky/10 scale-[1.01]"
            : "border-slate/25 bg-gradient-to-br from-white to-mist hover:border-sky/60"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <div className="pointer-events-none flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vt-gradient text-white shadow-lg shadow-sky/30">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9l5-5 5 5M12 4v13" />
            </svg>
          </div>
          <p className="text-sm font-medium text-ink">
            Drag & drop images, or <span className="text-sky">browse</span>
          </p>
          <p className="text-xs text-slate">JPG, PNG, WEBP, GIF, or AVIF — up to 8MB each</p>
        </div>
      </div>

      {value.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <AnimatePresence>
            {value.map((img) => (
              <motion.div
                key={img.tempId || img.publicId || img.url}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25 }}
                className="group relative aspect-square overflow-hidden rounded-xl border border-slate/15 bg-slate/5 shadow-sm"
                style={{ perspective: 800 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt="Portfolio upload preview"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                {img.uploading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink/60 backdrop-blur-sm">
                    <div className="h-1.5 w-3/4 overflow-hidden rounded-full bg-white/25">
                      <motion.div
                        className="h-full rounded-full bg-cyan"
                        initial={{ width: 0 }}
                        animate={{ width: `${img.progress || 0}%` }}
                        transition={{ ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-white">{img.progress || 0}%</span>
                  </div>
                )}

                {img.error && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-red-900/70 p-2 text-center">
                    <span className="text-[11px] font-medium text-white">{img.error}</span>
                    <button
                      type="button"
                      onClick={() => handleRetry(img)}
                      className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {!img.uploading && !img.error && (
                  <button
                    type="button"
                    onClick={() => handleRemove(img)}
                    className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ink/70 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 hover:bg-red-600"
                    aria-label="Remove image"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
