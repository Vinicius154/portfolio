"use client";

import { useEffect, useRef } from "react";

interface Particula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tamanho: number;
  opacidade: number;
}

const TOTAL = 95;
const DIST_CONEXAO = 125;
const DIST_REPULSAO = 130;
const FORCA_REPULSAO = 1.4;
const DIST_BRILHO_MOUSE = 90;

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Não renderizar em dispositivos touch (sem cursor)
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const redimensionar = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    redimensionar();

    const particulas: Particula[] = Array.from({ length: TOTAL }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      tamanho: Math.random() * 1.4 + 0.6,
      opacidade: Math.random() * 0.4 + 0.15,
    }));

    const aoMoverMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener("mousemove", aoMoverMouse);
    window.addEventListener("resize", redimensionar);

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const p of particulas) {
        // Repulsão magnética do cursor
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < DIST_REPULSAO && d > 0) {
          const forca = ((DIST_REPULSAO - d) / DIST_REPULSAO) * FORCA_REPULSAO;
          p.vx += (dx / d) * forca * 0.14;
          p.vy += (dy / d) * forca * 0.14;
        }

        // Amortecimento natural
        p.vx *= 0.97;
        p.vy *= 0.97;

        p.x += p.vx;
        p.y += p.vy;

        // Rebote nas bordas
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Brilho extra quando o cursor está próximo
        const distMouse = Math.sqrt((p.x - mouse.current.x) ** 2 + (p.y - mouse.current.y) ** 2);
        const boost = distMouse < DIST_BRILHO_MOUSE ? (1 - distMouse / DIST_BRILHO_MOUSE) * 0.55 : 0;
        const opacidadeFinal = Math.min(p.opacidade + boost, 0.95);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.tamanho, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${opacidadeFinal})`;
        ctx.fill();
      }

      // Linhas de constelação entre partículas próximas
      for (let i = 0; i < particulas.length; i++) {
        for (let j = i + 1; j < particulas.length; j++) {
          const dx = particulas[i].x - particulas[j].x;
          const dy = particulas[i].y - particulas[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < DIST_CONEXAO) {
            const alpha = (1 - d / DIST_CONEXAO) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(particulas[i].x, particulas[i].y);
            ctx.lineTo(particulas[j].x, particulas[j].y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", aoMoverMouse);
      window.removeEventListener("resize", redimensionar);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden
    />
  );
}
