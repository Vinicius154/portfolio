"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

// Divide em duas palavras mantendo o ponto de destaque em "belchior"
const WORD_1 = "vinicius".split("");
const WORD_2 = "belchior".split("");

const LETTER_DURATION = 0.45;
const LETTER_DELAY = 0.04; // atraso por letra
const TOTAL_LETTERS = WORD_1.length + 1 + WORD_2.length; // +1 pelo ponto
const LINE_START = TOTAL_LETTERS * LETTER_DELAY + LETTER_DURATION * 0.5;
const HIDE_AFTER = LINE_START + 0.6 + 0.3; // linha cresce + pausa

function Letter({
  char,
  delay,
  accent,
}: {
  char: string;
  delay: number;
  accent?: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: LETTER_DURATION, delay, ease: easeOut }}
      className={accent ? "text-royal-400" : "text-white/90"}
      style={{ display: "inline-block" }}
    >
      {char}
    </motion.span>
  );
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setTimeout(
      () => setVisible(false),
      (HIDE_AFTER + 0.2) * 1000, // pequena margem extra de tempo
    );
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          {/* Nome */}
          <div className="font-mono text-[22px] md:text-[28px] font-medium tracking-tight select-none">
            {WORD_1.map((char, i) => (
              <Letter key={`w1-${i}`} char={char} delay={i * LETTER_DELAY} />
            ))}
            <Letter char="." delay={WORD_1.length * LETTER_DELAY} accent />
            {WORD_2.map((char, i) => (
              <Letter
                key={`w2-${i}`}
                char={char}
                delay={(WORD_1.length + 1 + i) * LETTER_DELAY}
              />
            ))}
          </div>

          {/* Linha crescente */}
          <motion.div
            className="mt-5 h-px bg-gradient-to-r from-transparent via-royal-400/70 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 180, opacity: 1 }}
            transition={{ duration: 0.5, delay: LINE_START, ease: easeOut }}
          />

          {/* Subtítulo de cargo */}
          <motion.p
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-subtle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: LINE_START + 0.2, ease: easeOut }}
          >
            software engineer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
