"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code2, Database, Cloud, BarChart3 } from "lucide-react";
import { useTranslations } from "next-intl";
import { TiltCard } from "./TiltCard";

const easeOut = [0.16, 1, 0.3, 1] as const;

type Category = {
  title: string;
  impact: string;
  icon: React.ReactNode;
  heroImg: string;
  heroName: string;
  tone: string;
  glowColor: string;
  items: string[];
};

export default function Stack() {
  const t = useTranslations("Stack");

  const categories: Category[] = [
    {
      title: t("frontend"),
      impact: t("impactFrontend"),
      icon: <Code2 className="h-4 w-4" />,
      heroImg: "/stack/typescript.png",
      heroName: "TypeScript",
      tone: "from-royal-500/20 to-royal-700/10",
      glowColor: "rgba(59,130,246,0.25)",
      items: ["React.js", "Next.js", "JavaScript", "TailwindCSS", "CSS3", "HTML5"],
    },
    {
      title: t("backend"),
      impact: t("impactBackend"),
      icon: <Database className="h-4 w-4" />,
      heroImg: "/stack/python.png",
      heroName: "Python",
      tone: "from-indigo-500/20 to-royal-700/10",
      glowColor: "rgba(99,102,241,0.25)",
      items: ["Django", "Django REST Framework", "FastAPI", "REST APIs", "WebSockets"],
    },
    {
      title: t("data"),
      impact: t("impactData"),
      icon: <BarChart3 className="h-4 w-4" />,
      heroImg: "/stack/bi.png",
      heroName: "Power BI",
      tone: "from-sky-500/20 to-royal-700/10",
      glowColor: "rgba(14,165,233,0.25)",
      items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "R (ggplot2)", "Jupyter"],
    },
    {
      title: t("cloud"),
      impact: t("impactCloud"),
      icon: <Cloud className="h-4 w-4" />,
      heroImg: "/stack/cloud.png",
      heroName: "Azure",
      tone: "from-blue-500/20 to-royal-700/10",
      glowColor: "rgba(59,130,246,0.25)",
      items: ["CI/CD", "Git", "GitHub", "Nginx", "Observability", "MongoDB", "PostgreSQL"],
    },
  ];

  return (
    <section id="stack" className="relative py-28 md:py-36">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <span className="eyebrow">
            <span className="h-px w-6 bg-royal-500/60" />
            {t("eyebrow")}
          </span>
          <h2 className="heading-lg mt-4 max-w-3xl">
            {t("headingPart1")}{" "}
            <span className="bg-gradient-to-r from-royal-400 to-royal-200 bg-clip-text text-transparent">
              {t("headingHighlight")}
            </span>
            {t("headingPart2")}
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: easeOut }}
            >
              <TiltCard
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${cat.tone} p-6 transition-shadow duration-500 hover:shadow-glow h-full`}
              >
                {/* Shimmer hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -inset-x-1/2 -top-1/2 h-[200%] w-[200%] rotate-12 bg-gradient-to-r from-transparent via-royal-400/10 to-transparent animate-shimmer" />
                </div>

                {/* Header: ícone + título + frase de impacto */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-royal-500/15 text-royal-200 ring-1 ring-royal-500/30">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white leading-snug">
                      {cat.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-ink-subtle">
                      {cat.impact}
                    </p>
                  </div>
                </div>

                {/* Divisor */}
                <div className="my-5 h-px w-full bg-white/[0.06]" />

                {/* Hero technology */}
                <div className="flex items-center gap-4">
                  <div
                    className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2 transition-all duration-300 group-hover:scale-105"
                    style={{
                      boxShadow: `0 0 24px ${cat.glowColor}`,
                    }}
                  >
                    <Image
                      src={cat.heroImg}
                      alt={cat.heroName}
                      width={52}
                      height={52}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-white">
                      {cat.heroName}
                    </div>
                    <div className="mt-0.5 text-[11px] uppercase tracking-widest text-royal-300/70">
                      Principal
                    </div>
                  </div>
                </div>

                {/* Divisor */}
                <div className="my-5 h-px w-full bg-white/[0.06]" />

                {/* Chips secundários */}
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
