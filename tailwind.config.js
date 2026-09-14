/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        sky: "#0EA5E9",
        cyan: "#22D3EE",
        slate: "#64748B",
        mist: "#F8FAFC",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "vt-gradient": "linear-gradient(135deg, #0F172A 0%, #0EA5E9 100%)",
      },
    },
  },
  plugins: [],
};
