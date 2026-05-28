"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Glow suave que segue o cursor — dá profundidade e vida à página.
 * Fica atrás de tudo (z-20) e não interfere em cliques.
 */
export default function CursorSpotlight() {
  const x = useMotionValue(-800);
  const y = useMotionValue(-800);

  const springX = useSpring(x, { stiffness: 60, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden>
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.12) 0%, rgba(99,102,241,0.06) 35%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
