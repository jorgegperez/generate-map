import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#06b6d4", // cyan-500
          hover: "#0891b2", // cyan-600
          light: "#67e8f9", // cyan-300
        },
        secondary: {
          DEFAULT: "#1f2937", // gray-800
          dark: "#111827", // gray-900
          light: "#374151", // gray-700
        },
        accent: {
          DEFAULT: "#dc2626", // red-600
          hover: "#ef4444", // red-500
        },
        text: {
          primary: "#f3f4f6", // gray-100
          secondary: "#9ca3af", // gray-400
          muted: "#6b7280", // gray-500
        },
        border: {
          DEFAULT: "#4b5563", // gray-600
          hover: "#06b6d4", // cyan-500
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
