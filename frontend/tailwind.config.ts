import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./app/[locale]/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#050912",
          alt: "#0A1024",
          card: "#0E1530",
        },
        royal: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#3730A3",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#172554",
        },
        ink: {
          DEFAULT: "#E5E7EB",
          muted: "#94A3B8",
          subtle: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
        display: ["var(--font-space)", "Space Grotesk", "Inter", "system-ui"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace"],
      },
      backgroundImage: {
        aurora:
          "radial-gradient(60% 80% at 20% 10%, rgba(30,64,175,0.35) 0%, rgba(5,9,18,0) 60%), radial-gradient(50% 60% at 80% 30%, rgba(59,130,246,0.22) 0%, rgba(5,9,18,0) 60%), radial-gradient(50% 60% at 50% 100%, rgba(99,102,241,0.18) 0%, rgba(5,9,18,0) 60%)",
        grid: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-sm": "32px 32px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
      },
      boxShadow: {
        glow: "0 0 40px rgba(59, 130, 246, 0.25)",
        "glow-strong": "0 0 60px rgba(59, 130, 246, 0.45)",
        "inner-glow": "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
