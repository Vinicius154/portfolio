"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#sobre", label: t("about") },
    { href: "#stack", label: t("stack") },
    { href: "#experiencia", label: t("experience") },
    { href: "#feitos", label: t("achievements") },
    { href: "#contato", label: t("contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-4 py-1.5 text-sm text-ink/80 transition-colors hover:text-white hover:bg-white/[0.05]">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageToggle />
          </div>
          <a href="/Vinicius_Belchior_CV.pdf" target="_blank" rel="noreferrer" className="hidden md:inline-flex btn-ghost !py-2 !px-4 text-xs">
            {t("downloadCV")}
          </a>
          <button aria-label={t("openMenu")} onClick={() => setOpen((v) => !v)} className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
            <span className="relative block h-3 w-4">
              <span className={clsx("absolute left-0 top-0 h-px w-full bg-white transition-transform", open ? "translate-y-1.5 rotate-45" : "")} />
              <span className={clsx("absolute left-0 top-1.5 h-px w-full bg-white transition-opacity", open ? "opacity-0" : "opacity-100")} />
              <span className={clsx("absolute left-0 top-3 h-px w-full bg-white transition-transform", open ? "-translate-y-1.5 -rotate-45" : "")} />
            </span>
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="container-x overflow-hidden md:hidden"
      >
        <div className="mt-2 rounded-2xl border border-white/10 bg-bg/80 p-3 backdrop-blur-xl space-y-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-2 text-sm text-ink/80 hover:bg-white/[0.05] hover:text-white">
              {l.label}
            </a>
          ))}
          <a href="/Vinicius_Belchior_CV.pdf" target="_blank" rel="noreferrer" className="block rounded-xl px-4 py-2 text-sm text-royal-200 hover:bg-white/[0.05]">
            {t("downloadCV")}
          </a>
          <div className="px-3 pt-2">
            <LanguageToggle />
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
