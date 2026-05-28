"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface Props {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

/**
 * Conta de 0 até `to` quando o elemento entra na viewport.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.8,
  decimals = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(val) {
        if (ref.current)
          ref.current.textContent =
            prefix + val.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix, duration, decimals]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}
