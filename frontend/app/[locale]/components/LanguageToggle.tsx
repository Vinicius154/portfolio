"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import clsx from "clsx";

/**
 * Toggle PT/EN — troca o locale via routing do next-intl,
 * mantendo a mesma rota e a posição de scroll do usuário.
 */
export default function LanguageToggle() {
  const t = useTranslations("LangToggle");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: "pt" | "en") => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const opts: Array<{ code: "pt" | "en"; label: string }> = [
    { code: "pt", label: t("pt") },
    { code: "en", label: t("en") },
  ];

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={clsx(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] p-0.5 text-[11px] font-mono transition-opacity",
        isPending && "opacity-60"
      )}
    >
      {opts.map((o) => (
        <button
          key={o.code}
          type="button"
          onClick={() => switchTo(o.code)}
          aria-pressed={locale === o.code}
          className={clsx(
            "rounded-full px-2.5 py-1 transition-all",
            locale === o.code
              ? "bg-royal-700/40 text-white shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]"
              : "text-ink-subtle hover:text-white"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
