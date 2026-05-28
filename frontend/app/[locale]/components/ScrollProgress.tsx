"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Barra fina de progresso de scroll no topo da página.
 * Reforça a sensação de "rolagem viva".
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-royal-700 via-royal-500 to-royal-300"
    />
  );
}
