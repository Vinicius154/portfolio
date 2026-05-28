"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, ArrowUpRight } from "lucide-react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type Item = {
  tag: string;
  metric: string;
  title: string;
  short: string;
  long: string;
};

/* ─── Modal de detalhe ────────────────────────────────────────── */
function Modal({
  item,
  index,
  onClose,
  closeLabel,
}: {
  item: Item;
  index: number;
  onClose: () => void;
  closeLabel: string;
}) {
  // fechar ao pressionar Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // travar scroll do body enquanto o modal está aberto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Fundo escuro */}
      <motion.div
        className="absolute inset-0 bg-bg/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Card do modal */}
      <motion.div
        className="glass-strong relative w-full max-w-xl p-7 md:p-9"
        initial={{ opacity: 0, scale: 0.94, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.42, ease: easeOut }}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-ink-muted hover:bg-white/[0.08] hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Índice */}
        <span className="font-mono text-[10px] text-ink-subtle tracking-widest">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Tag */}
        <div className="mt-3 mb-1">
          <span className="chip">{item.tag}</span>
        </div>

        {/* Título e métrica */}
        <h3 className="mt-4 font-display text-xl md:text-2xl font-semibold text-white leading-snug">
          {item.title}
        </h3>
        <p className="mt-1 font-mono text-sm font-semibold text-royal-300">
          {item.metric}
        </p>

        {/* Divisor */}
        <div className="my-5 h-px bg-white/[0.07]" />

        {/* Descrição completa */}
        <p className="text-[14px] md:text-[15px] leading-relaxed text-ink-muted">
          {item.long}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Card individual ─────────────────────────────────────────── */
function AchievementCard({
  item,
  index,
  onOpen,
  readMore,
}: {
  item: Item;
  index: number;
  onOpen: () => void;
  readMore: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.65, delay: index * 0.09, ease: easeOut }}
    >
      <motion.div
        onClick={onOpen}
        whileHover={{ y: -5, transition: { duration: 0.3, ease: easeOut } }}
        className="glass group relative flex h-full flex-col cursor-pointer p-5 md:p-6"
        style={{ willChange: "transform" }}
      >
        {/* Borda de brilho no hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(59,130,246,0.35), 0 0 24px -8px rgba(59,130,246,0.25)",
          }}
        />

        {/* Linha superior */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[11px] text-ink-subtle select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs font-bold text-royal-300">{item.metric}</span>
        </div>

        {/* Tag */}
        <span className="chip mb-3 w-fit">{item.tag}</span>

        {/* Título */}
        <h3 className="font-display text-base md:text-[17px] font-semibold text-white leading-snug mb-3 flex-1">
          {item.title}
        </h3>

        {/* Descrição curta */}
        <p className="text-[13px] leading-relaxed text-ink-muted mb-5">{item.short}</p>

        {/* Divisor */}
        <div className="h-px bg-white/[0.07] mb-4" />

        {/* Ação */}
        <div className="flex items-center justify-between text-xs font-medium text-royal-400">
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-royal-400" />
            {readMore}
          </span>
          <motion.div
            className="flex h-6 w-6 items-center justify-center rounded-full border border-royal-500/30 bg-royal-500/10"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight className="h-3 w-3" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Seção principal ─────────────────────────────────────────── */
export default function WorkAchievements() {
  const t = useTranslations("WorkAchievements");
  const [selected, setSelected] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const items: Item[] = [1, 2, 3, 4, 5].map((n) => ({
    tag: t(`item${n}Tag`),
    metric: t(`item${n}Metric`),
    title: t(`item${n}Title`),
    short: t(`item${n}Short`),
    long: t(`item${n}Long`),
  }));

  return (
    <>
      {/* Portal do modal */}
      <AnimatePresence>
        {selected !== null && (
          <Modal
            key={selected}
            item={items[selected]}
            index={selected}
            onClose={() => setSelected(null)}
            closeLabel={t("close")}
          />
        )}
      </AnimatePresence>

      <section ref={sectionRef} id="impactos" className="relative py-28 md:py-36">
        <div className="container-x">
          {/* Cabeçalho da seção */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={headingInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: easeOut }}
            className="mb-14"
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
            <p className="mt-4 max-w-xl text-sm text-ink-muted leading-relaxed">
              {t("intro")}
            </p>
          </motion.div>

          {/* Grade de cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <AchievementCard
                key={i}
                item={item}
                index={i}
                onOpen={() => setSelected(i)}
                readMore={t("readMore")}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
