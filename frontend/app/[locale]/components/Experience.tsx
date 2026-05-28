"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";
import { TiltCard } from "./TiltCard";

const easeOut = [0.16, 1, 0.3, 1] as const;

type Item = {
  role: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
};

export default function Experience() {
  const t = useTranslations("Experience");

  const items: Item[] = [
    {
      role: t("role1Title"),
      period: t("role1Period"),
      location: t("role1Location"),
      bullets: [t("role1B1"), t("role1B2"), t("role1B3"), t("role1B4")],
      stack: ["Python", "Django", "Next.js", "TypeScript", "MongoDB", "PostgreSQL", "Azure", "Nginx"],
    },
    {
      role: t("role2Title"),
      period: t("role2Period"),
      location: t("role2Location"),
      bullets: [t("role2B1"), t("role2B2"), t("role2B3"), t("role2B4")],
      stack: ["Python", "Django", "React", "Next.js", "TypeScript", "MongoDB", "PostgreSQL", "Azure"],
    },
    {
      role: t("role3Title"),
      period: t("role3Period"),
      location: t("role3Location"),
      bullets: [t("role3B1"), t("role3B2"), t("role3B3")],
      stack: ["Python", "Django", "Pandas", "NumPy", "R", "Jupyter", "Azure"],
    },
    {
      role: t("role4Title"),
      period: t("role4Period"),
      location: t("role4Location"),
      bullets: [t("role4B1"), t("role4B2"), t("role4B3"), t("role4B4")],
      stack: ["Python", "R", "Pandas", "Matplotlib", "Seaborn", "Azure"],
    },
  ];

  return (
    <section id="experiencia" className="relative py-28 md:py-36">
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

        <div className="relative mt-14">
          <div className="pointer-events-none absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-royal-500/60 via-royal-500/20 to-transparent md:left-6" />

          <ol className="space-y-10">
            {items.map((it, idx) => (
              <motion.li
                key={it.role + it.period}
                initial={{ opacity: 0, x: -20, y: 16 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: idx * 0.05, ease: easeOut }}
                className="relative pl-12 md:pl-16"
              >
                <div className="absolute left-[9px] top-1.5 h-3 w-3 rounded-full bg-royal-400 shadow-glow md:left-[17px]" />

                <TiltCard className="glass p-5 md:p-6" intensity={5}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg md:text-xl font-semibold text-white">{it.role}</h3>
                    <span className="text-xs uppercase tracking-wider text-royal-300/80">{it.period}</span>
                  </div>
                  <div className="mt-1 inline-flex items-center gap-2 text-xs text-ink-subtle">
                    <Briefcase className="h-3 w-3" />
                    {it.location}
                  </div>

                  <ul className="mt-4 space-y-2 text-sm md:text-[15px] leading-relaxed text-ink-muted">
                    {it.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-royal-400/80" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {it.stack.map((s) => (<span key={s} className="chip">{s}</span>))}
                  </div>
                </TiltCard>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mt-14 glass p-6 md:p-8"
        >
          <span className="eyebrow">
            <span className="h-px w-6 bg-royal-500/60" />
            {t("educationEyebrow")}
          </span>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <div className="font-display text-base font-semibold text-white">{t("edu1Title")}</div>
              <div className="text-sm text-ink-muted">{t("edu1Institution")}</div>
              <div className="mt-1 text-xs text-royal-300/80">{t("edu1Period")}</div>
            </div>
            <div>
              <div className="font-display text-base font-semibold text-white">{t("edu2Title")}</div>
              <div className="text-sm text-ink-muted">{t("edu2Institution")}</div>
              <div className="mt-1 text-xs text-royal-300/80">{t("edu2Period")}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
