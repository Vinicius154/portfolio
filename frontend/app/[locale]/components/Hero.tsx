"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Typewriter from "./Typewriter";

export default function Hero() {
  const t = useTranslations("Hero");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const [badgeIdx, setBadgeIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setBadgeIdx((i) => (i + 1) % 2), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="container-x grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-royal-400 animate-pulse-slow" />
            {t("available")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="heading-xl mt-5"
          >
            {t("name1")}
            <br />
            {t("name2")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-ink-muted"
          >
            {t("descPart1")}{t("descPart1") && " "}
            <Typewriter words={[t("roleFullStack"), t("roleData")]} />{" "}
            {t("descPart2")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#contato" className="btn-primary">
              <Mail className="h-4 w-4" />
              {t("ctaContact")}
            </a>
            <a
              href="https://github.com/Vinicius154"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/viniciusbelchior14/"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 flex items-center gap-6 text-xs text-ink-subtle"
          >
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-royal-500/40" />
              {t("location")}
            </div>
            <div>{t("age")}</div>
            <div>{t("company")}</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto"
        >
          <div className="relative">
            <div className="photo-ring relative h-[280px] w-[280px] md:h-[360px] md:w-[360px] overflow-hidden rounded-full border border-white/10 bg-bg-card shadow-glow-strong">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/vb.jpeg"
                alt="Vinicius Belchior"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Badge esquerdo */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 top-10 glass-strong px-3 py-2 text-[11px] font-medium text-white overflow-hidden min-w-[120px]"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={`left-${badgeIdx}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex items-center gap-1.5"
                >
                  <span className="font-mono text-royal-300">{`</>`}</span>
                  {badgeIdx === 0 ? t("badgeStack") : t("badgeStack2")}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Badge direito */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 bottom-10 glass-strong px-3 py-2 text-[11px] font-medium text-white overflow-hidden min-w-[90px]"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={`right-${badgeIdx}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex items-center gap-1.5"
                >
                  <span className="font-mono text-royal-300">@</span>
                  {badgeIdx === 0 ? t("badgeYears") : t("badgeYears2")}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#sobre"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-ink-subtle hover:text-royal-300 transition-colors"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          {t("scrollCue")}
          <ArrowDown className="h-3 w-3" />
        </motion.span>
      </motion.a>
    </section>
  );
}
