import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B1528",
          foreground: "#FFFFFF",
        },
        "on-primary": "#FFFFFF",
        secondary: {
          DEFAULT: "#C28B28",
          foreground: "#0B1528",
        },
        "on-secondary": "#0B1528",
        surface: {
          DEFAULT: "#F8FAFC",
          card: "#FFFFFF",
          muted: "#F1F5F9",
        },
        "on-surface": "#1A2232",
        "surface-card": "#FFFFFF",
        "surface-muted": "#F1F5F9",
        "border-seam": "#CBD5E1",
        "border-subtle": "#E2E8F0",
        "accent-tape": {
          DEFAULT: "#FFC72C",
          foreground: "#0B1528",
        },
        "on-accent-tape": "#0B1528",
        "accent-emerald": {
          DEFAULT: "#0A5C36",
          foreground: "#FFFFFF",
        },
        "on-accent-emerald": "#FFFFFF",
        "text-muted": "#475569",
        error: {
          DEFAULT: "#B91C1C",
          foreground: "#FFFFFF",
        },
        "on-error": "#FFFFFF",
      },
      fontFamily: {
        display: ["Cabinet Grotesk", "Space Grotesk", "sans-serif"],
        heading: ["Cabinet Grotesk", "Space Grotesk", "sans-serif"],
        body: ["Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        md: "4px",
        lg: "8px",
        full: "9999px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
        gutter: "16px",
        margin: "24px",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(11, 21, 40, 0.05)",
        card: "0 2px 4px rgba(11, 21, 40, 0.06)",
        raised: "0 4px 12px rgba(11, 21, 40, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;

