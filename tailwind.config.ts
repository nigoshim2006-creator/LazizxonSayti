import type { Config } from "tailwindcss";

const tailwindConfig: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4ff",
          100: "#dbe4ff",
          200: "#bac8ff",
          300: "#91a7ff",
          400: "#748ffc",
          500: "#5c7cfa",
          600: "#4c6ef5",
          700: "#3b5bdb",
          800: "#1E293B",
          900: "#0A192F",
          950: "#020617",
        },
        accent: {
          blue: "#00A3FF",
          cyan: "#80EEFF",
        },
        surface: {
          white: "#FFFFFF",
          soft: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        glass: "20px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 163, 255, 0.08)",
        "glass-lg": "0 16px 48px rgba(0, 163, 255, 0.12)",
        "glass-xl": "0 24px 64px rgba(0, 163, 255, 0.16)",
        inner: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      },
      animation: {
        "search-pulse": "searchPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
      },
      keyframes: {
        searchPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(0, 163, 255, 0.2)" },
          "100%": { boxShadow: "0 0 40px rgba(0, 163, 255, 0.4)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
