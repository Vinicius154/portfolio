"use client";

import { useState, useEffect } from "react";

interface Props {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
}

/**
 * Digita e apaga palavras em loop com cursor piscando.
 */
export default function Typewriter({
  words,
  speed = 75,
  deleteSpeed = 38,
  pauseMs = 2200,
}: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [pausing, setPausing] = useState(false);

  useEffect(() => {
    if (pausing) return;

    const current = words[index % words.length];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) {
            setPausing(true);
            setTimeout(() => {
              setPausing(false);
              setDeleting(true);
            }, pauseMs);
          }
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setIndex((i) => (i + 1) % words.length);
          }
        }
      },
      deleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, pausing, index, words, speed, deleteSpeed, pauseMs]);

  return (
    <span className="inline-flex items-baseline gap-[2px]">
      <span className="text-royal-300">{text}</span>
      <span
        className="ml-0.5 inline-block w-[2px] h-[1em] bg-royal-400 align-middle"
        style={{
          animation: "blink 1s step-end infinite",
        }}
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}
