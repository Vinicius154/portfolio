"use client";

import { useEffect, useState } from "react";

// Conjunto de caracteres usados no embaralhamento
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";

interface Props {
  children: string;
  /** Atraso em ms antes de iniciar o efeito */
  delayMs?: number;
  /** Duração total do efeito em ms */
  duracao?: number;
}

/**
 * Exibe o texto real no servidor (evita erro de hidratação) e,
 * após a montagem no cliente, embaralha as letras e as resolve
 * da esquerda para a direita — efeito de entrada cinematográfico.
 */
export default function ScrambleText({ children, delayMs = 0, duracao = 900 }: Props) {
  const letras = children.split("");

  // Servidor e primeira hidratação recebem o texto real — sem divergência
  const [exibido, setExibido] = useState<string[]>(letras);
  const [montado, setMontado] = useState(false);

  // Sinaliza que estamos no cliente
  useEffect(() => {
    setMontado(true);
  }, []);

  useEffect(() => {
    if (!montado) return;

    let raf: number;
    let inicioReal = 0;
    let aguardando = true;

    const animar = (ts: number) => {
      // Fase de espera pelo delay inicial
      if (aguardando) {
        if (inicioReal === 0) inicioReal = ts + delayMs;
        if (ts < inicioReal) {
          raf = requestAnimationFrame(animar);
          return;
        }
        aguardando = false;
        inicioReal = ts; // reinicia como referência do início real
      }

      const decorrido = ts - inicioReal;
      const progresso = Math.min(decorrido / duracao, 1);

      setExibido(
        letras.map((char, i) => {
          if (char === " ") return " ";
          // Cada letra resolve sequencialmente da esquerda para a direita
          const limiar = i / letras.length;
          if (progresso >= limiar + 1 / letras.length) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
      );

      if (progresso < 1) raf = requestAnimationFrame(animar);
    };

    raf = requestAnimationFrame(animar);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [montado, children, delayMs, duracao]);

  return <span aria-label={children}>{exibido.join("")}</span>;
}
