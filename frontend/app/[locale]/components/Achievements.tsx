"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Rocket, Award, Newspaper, Calculator, Users, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function Achievements() {
  const t = useTranslations("Achievements");
  const ref = useRef<HTMLDivElement>(null);
  const [activeImg, setActiveImg] = useState<0 | 1>(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveImg((i) => (i === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const highlights = [
    { icon: <Trophy className="h-4 w-4" />, label: t("hCategoryLabel"), note: t("hCategoryNote") },
    { icon: <Award className="h-4 w-4" />, label: t("hAwardLabel"), note: t("hAwardNote") },
    { icon: <Newspaper className="h-4 w-4" />, label: t("hPressLabel"), note: t("hPressNote") },
    { icon: <Users className="h-4 w-4" />, label: t("hTeamLabel"), note: t("hTeamNote") },
  ];

  return (
    <section id="feitos" ref={ref} className="relative py-28 md:py-36">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: easeOut }}
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
          <p className="mt-5 max-w-2xl text-ink-muted">{t("intro")}</p>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mt-14 glass-strong overflow-hidden"
        >
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[560px] overflow-hidden bg-bg-card">
              <motion.div style={{ y: imgY }} className="absolute inset-0">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={activeImg}
                    src={activeImg === 0 ? "/foguete1.jpeg" : "/foguete2.jpeg"}
                    alt={activeImg === 0 ? t("altImg1") : t("altImg2")}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </AnimatePresence>
              </motion.div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-bg/70 via-transparent to-transparent" />

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-royal-500/40 bg-bg/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-royal-200 backdrop-blur-md"
              >
                <Rocket className="h-3 w-3" />
                {t("badge")}
              </motion.div>

              <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {[0, 1].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i as 0 | 1)}
                    aria-label={`Image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      activeImg === i ? "w-8 bg-royal-300" : "w-3 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative p-7 md:p-10">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-white">{t("projectTitle")}</h3>
                <span className="text-xs uppercase tracking-wider text-royal-300/80">{t("projectMeta")}</span>
              </div>

              <p className="mt-4 text-base leading-relaxed text-ink-muted">{t("projectDescription")}</p>

              <div className="mt-7 rounded-xl border border-royal-500/20 bg-royal-500/[0.06] p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-royal-500/20 text-royal-200 ring-1 ring-royal-500/40">
                    <Calculator className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-royal-300/80">{t("roleEyebrow")}</div>
                    <div className="mt-1 font-display text-base font-semibold text-white">{t("roleTitle")}</div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t("roleDescription")}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2">
                {highlights.map((h, i) => (
                  <motion.div
                    key={h.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-3"
                  >
                    <div className="inline-flex items-center gap-1.5 text-royal-200">
                      {h.icon}
                      <span className="text-xs font-medium uppercase tracking-wider">{h.label}</span>
                    </div>
                    <div className="mt-1 text-xs text-ink-subtle">{h.note}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-1.5">
                <span className="chip">{t("chip1")}</span>
                <span className="chip">{t("chip2")}</span>
                <span className="chip">{t("chip3")}</span>
                <span className="chip">{t("chip4")}</span>
                <span className="chip">{t("chip5")}</span>
              </div>
            </div>
          </div>
        </motion.article>


      </div>
    </section>
  );
}
