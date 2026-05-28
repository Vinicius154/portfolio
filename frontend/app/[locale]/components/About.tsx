"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CountUp } from "./CountUp";

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function About() {
  const t = useTranslations("About");

  const stats = [
    {
      animated: true,
      prefix: "R$ ",
      to: 1,
      suffix: "Mi+",
      label: t("statPortfoliosLabel"),
      note: t("statPortfoliosNote"),
    },
    {
      animated: true,
      prefix: "R$ ",
      to: 2,
      suffix: "Mi",
      label: t("statImpactLabel"),
      note: t("statImpactNote"),
    },
    {
      animated: true,
      prefix: "",
      to: 3,
      suffix: "+",
      label: t("statYearsLabel"),
      note: t("statYearsNote"),
    },
    {
      animated: false,
      value: t("statStackValue"),
      label: t("statStackLabel"),
      note: t("statStackNote"),
    },
  ];

  return (
    <section id="sobre" className="relative py-28 md:py-36">
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
            </span>{" "}
            {t("headingPart2")}
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="space-y-5 text-base md:text-lg leading-relaxed text-ink-muted"
          >
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
            className="grid grid-cols-2 gap-3"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: easeOut }}
                className="glass p-5"
              >
                <div className="font-display text-2xl md:text-3xl font-semibold text-white">
                  {s.animated ? (
                    <CountUp to={s.to!} prefix={s.prefix} suffix={s.suffix} />
                  ) : (
                    s.value
                  )}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-royal-300/80">
                  {s.label}
                </div>
                <div className="mt-2 text-xs text-ink-subtle">{s.note}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
