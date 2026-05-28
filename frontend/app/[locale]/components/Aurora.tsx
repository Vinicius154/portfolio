"use client";

import { motion } from "framer-motion";

/**
 * Aurora — luz ambiente animada no fundo da página.
 * Fica fixa, segue o scroll, dá vida sem competir com o conteúdo.
 */
export default function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Brilho 1 — azul royal pulsando */}
      <motion.div
        aria-hidden
        className="absolute -top-1/3 -left-1/4 h-[80vh] w-[80vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(30,64,175,0.45) 0%, rgba(30,64,175,0) 60%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, 30, -20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Brilho 2 — azul de destaque */}
      <motion.div
        aria-hidden
        className="absolute top-1/4 -right-1/4 h-[70vh] w-[70vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.30) 0%, rgba(59,130,246,0) 60%)",
          filter: "blur(70px)",
        }}
        animate={{
          x: [0, -40, 20, 0],
          y: [0, -20, 40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      {/* Vinheta inferior */}
      <div
        className="absolute inset-x-0 bottom-0 h-64"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,9,18,0) 0%, rgba(5,9,18,0.9) 100%)",
        }}
      />
    </div>
  );
}
