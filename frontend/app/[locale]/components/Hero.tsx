"use client";

import {
  motion,
  useScroll,
  useTransform,
  useTime,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Typewriter from "./Typewriter";
import HeroParticles from "./HeroParticles";
import ScrambleText from "./ScrambleText";

const EASE = [0.16, 1, 0.3, 1] as const;

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

  // Órbita elíptica dos badges ao redor da foto — período de 14s
  const tempo = useTime();
  const rx = 205; // raio horizontal
  const ry = 165; // raio vertical

  // Badge de stack — inicia na posição inferior-esquerda (~210°)
  const a1 = useTransform(
    tempo,
    (t) => (t / 14000) * Math.PI * 2 + Math.PI * 1.15,
  );
  const ox1 = useTransform(a1, (a) => Math.cos(a) * rx);
  const oy1 = useTransform(a1, (a) => Math.sin(a) * ry);

  // Badge de anos — inicia na posição superior-direita (~30°), fase oposta
  const a2 = useTransform(
    tempo,
    (t) => (t / 14000) * Math.PI * 2 + Math.PI * 0.15,
  );
  const ox2 = useTransform(a2, (a) => Math.cos(a) * rx);
  const oy2 = useTransform(a2, (a) => Math.sin(a) * ry);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24"
    >
      {/* Constelação de partículas interativas */}
      <HeroParticles />

      {/* Varredura luminosa de entrada — dispara uma vez */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-[280px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.10) 50%, transparent 100%)",
          filter: "blur(12px)",
        }}
        initial={{ x: "-40vw", opacity: 0 }}
        animate={{ x: "130vw", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.4, delay: 1.5, ease: "easeInOut" }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="container-x grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]"
      >
        {/* ── Coluna esquerda ── */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-royal-400 animate-pulse-slow" />
            {t("available")}
          </motion.div>

          {/* Nome com efeito de scramble */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
            className="heading-xl mt-5"
          >
            <ScrambleText delayMs={1600} duracao={800}>
              {t("name1")}
            </ScrambleText>
            <br />
            <ScrambleText delayMs={1900} duracao={900}>
              {t("name2")}
            </ScrambleText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-ink-muted"
          >
            {t("descPart1")}
            {t("descPart1") && " "}
            <Typewriter words={[t("roleFullStack"), t("roleData")]} />{" "}
            {t("descPart2")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
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

        {/* ── Coluna direita — foto com anéis orbitais ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className="relative mx-auto"
        >
          {/*
            Área segura para os badges orbitais: padding generoso garante
            que o overflow visível dos badges não cause scroll horizontal.
            Em mobile os badges são ocultados, então o padding é removido.
          */}
          <div className="relative md:p-14">
            {/* Foto */}
            <div className="photo-ring relative h-[260px] w-[260px] md:h-[320px] md:w-[320px] overflow-hidden rounded-full border border-white/10 bg-bg-card shadow-glow-strong mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/vb.jpeg"
                alt="Vinicius Belchior"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Anel orbital externo — visível só em desktop */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 m-auto hidden md:block"
              style={{
                width: "calc(100% - 56px)",
                height: "calc(100% - 56px)",
                borderRadius: "50%",
                border: "1px solid transparent",
                borderTopColor: "rgba(59,130,246,0.35)",
                borderRightColor: "rgba(59,130,246,0.12)",
                borderBottomColor: "rgba(59,130,246,0.06)",
              }}
            />

            {/* Anel orbital interno — visível só em desktop */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 m-auto hidden md:block"
              style={{
                width: "calc(100% - 84px)",
                height: "calc(100% - 84px)",
                borderRadius: "50%",
                border: "1px dashed rgba(99,102,241,0.22)",
              }}
            />

            {/* Ponto luminoso no anel externo — visível só em desktop */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 m-auto hidden md:block"
              style={{
                width: "calc(100% - 56px)",
                height: "calc(100% - 56px)",
                borderRadius: "50%",
              }}
            >
              <div
                className="absolute h-2 w-2 rounded-full bg-royal-400"
                style={{
                  top: "0%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 8px 2px rgba(96,165,250,0.7)",
                }}
              />
            </motion.div>

            {/* Badges orbitais — apenas em desktop (md+) */}
            <motion.div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                x: ox1,
                y: oy1,
                marginLeft: "-60px",
                marginTop: "-20px",
              }}
              className="glass-strong px-3 py-2 text-[11px] font-medium text-white overflow-hidden min-w-[120px] hidden md:block"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={`stack-${badgeIdx}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex items-center gap-1.5"
                >
                  <span className="font-mono text-royal-300">{`</>`}</span>
                  {badgeIdx === 0 ? t("badgeStack") : t("badgeStack2")}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                x: ox2,
                y: oy2,
                marginLeft: "-45px",
                marginTop: "-20px",
              }}
              className="glass-strong px-3 py-2 text-[11px] font-medium text-white overflow-hidden min-w-[90px] hidden md:block"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={`anos-${badgeIdx}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex items-center gap-1.5"
                >
                  <span className="font-mono text-royal-300">@</span>
                  {badgeIdx === 0 ? t("badgeYears") : t("badgeYears2")}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Badges estáticos em mobile — aparecem abaixo da foto */}
            <div className="mt-6 flex justify-center gap-3 md:hidden">
              <div className="glass-strong px-3 py-2 text-[11px] font-medium text-white">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`m-stack-${badgeIdx}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-1.5"
                  >
                    <span className="font-mono text-royal-300">{`</>`}</span>
                    {badgeIdx === 0 ? t("badgeStack") : t("badgeStack2")}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="glass-strong px-3 py-2 text-[11px] font-medium text-white">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`m-anos-${badgeIdx}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-1.5"
                  >
                    <span className="font-mono text-royal-300">@</span>
                    {badgeIdx === 0 ? t("badgeYears") : t("badgeYears2")}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
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
