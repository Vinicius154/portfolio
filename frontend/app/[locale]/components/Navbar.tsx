"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import { useTranslations, useLocale } from "next-intl";
import { X, Menu } from "lucide-react";
import LanguageToggle from "./LanguageToggle";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const cvHref = locale === "en" ? "/Vinicius_Belchior_English.pdf" : "/Vinicius_Belchior_CV.pdf";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const links = [
    { href: "#sobre",       sectionId: "sobre",       label: t("about") },
    { href: "#stack",       sectionId: "stack",        label: t("stack") },
    { href: "#experiencia", sectionId: "experiencia",  label: t("experience") },
    { href: "#impactos",    sectionId: "impactos",     label: t("impacts") },
    { href: "#feitos",      sectionId: "feitos",       label: t("achievements") },
    { href: "#contato",     sectionId: "contato",      label: t("contact") },
  ];

  // Travar scroll do body quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy — detecta qual seção está visível
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const fechar = () => setOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed top-3 inset-x-0 z-40 px-3"
      >
        <div
          className={clsx(
            "container-x flex items-center justify-between rounded-full border transition-all duration-500",
            scrolled
              ? "border-white/10 bg-bg/70 backdrop-blur-xl py-2.5 px-4 shadow-glow"
              : "border-transparent bg-transparent py-3"
          )}
        >
          {/* Logo */}
          <a href="#top" aria-label={t("home")} className="group inline-flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Logo"
              width={52}
              height={35}
              className="transition-opacity duration-300 group-hover:opacity-70"
            />
            <span className="font-mono text-[13px] font-medium tracking-tight text-white/90">
              vinicius<span className="text-royal-400">.</span>belchior
            </span>
          </a>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const isActive = activeSection === l.sectionId;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={clsx(
                    "relative rounded-full px-4 py-1.5 text-sm transition-all duration-200",
                    isActive
                      ? "bg-royal-500/20 text-royal-300 ring-1 ring-royal-500/40"
                      : "text-ink/80 hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          {/* Direita — desktop */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <LanguageToggle />
            </div>
            <a
              href={cvHref}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex btn-ghost !py-2 !px-4 text-xs"
            >
              {t("downloadCV")}
            </a>

            {/* Botão hamburguer — mobile */}
            <button
              aria-label={open ? "Fechar menu" : t("openMenu")}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.08]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="fechar"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="abrir"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Menu mobile — overlay full-screen ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Fundo escuro */}
            <motion.div
              key="overlay-fundo"
              className="fixed inset-0 z-50 bg-bg/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={fechar}
            />

            {/* Painel lateral */}
            <motion.div
              key="overlay-painel"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(85vw,340px)] flex-col bg-bg/95 backdrop-blur-xl border-l border-white/[0.07] md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: EASE }}
            >
              {/* Cabeçalho do painel */}
              <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
                <span className="font-mono text-[13px] font-medium text-white/90">
                  vinicius<span className="text-royal-400">.</span>belchior
                </span>
                <button
                  onClick={fechar}
                  aria-label="Fechar menu"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-ink-muted hover:bg-white/[0.08] hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Links de navegação */}
              <nav className="flex flex-col gap-1 flex-1 overflow-y-auto px-4 py-6">
                {links.map((l, i) => {
                  const isActive = activeSection === l.sectionId;
                  return (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      onClick={fechar}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: EASE }}
                      className={clsx(
                        "flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all",
                        isActive
                          ? "bg-royal-500/15 text-royal-300 ring-1 ring-royal-500/30"
                          : "text-ink/70 hover:bg-white/[0.05] hover:text-white"
                      )}
                    >
                      <span className="font-mono text-[10px] text-ink-subtle w-5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {l.label}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Rodapé do painel */}
              <motion.div
                className="border-t border-white/[0.07] px-6 py-5 flex items-center justify-between gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                <a
                  href={cvHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={fechar}
                  className="btn-ghost !py-2 !px-4 text-xs flex-1 justify-center"
                >
                  {t("downloadCV")}
                </a>
                <LanguageToggle />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
