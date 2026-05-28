"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 text-xs text-ink-subtle md:flex-row">
        <div>
          © {year} Vinicius Belchior — {t("builtWith")}{" "}
          <span className="text-royal-300">Next.js</span> +{" "}
          <span className="text-royal-300">FastAPI</span>.
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/Vinicius154" target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full border border-white/10 p-2 transition-colors hover:bg-white/[0.05] hover:text-white">
            <Github className="h-3.5 w-3.5" />
          </a>
          <a href="https://linkedin.com/in/viniciusbelchior14/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-white/10 p-2 transition-colors hover:bg-white/[0.05] hover:text-white">
            <Linkedin className="h-3.5 w-3.5" />
          </a>
          <a href="mailto:viniciusbelchior2017@gmail.com" aria-label="Email" className="rounded-full border border-white/10 p-2 transition-colors hover:bg-white/[0.05] hover:text-white">
            <Mail className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
