"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

const easeOut = [0.16, 1, 0.3, 1] as const;

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      subject: String(data.get("subject") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setErrorMsg(t("errorRequired"));
      return;
    }

    if (payload.name.length < 2) {
      setStatus("error");
      setErrorMsg(t("errorNameShort"));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setStatus("error");
      setErrorMsg(t("errorEmailInvalid"));
      return;
    }

    if (payload.message.length < 10) {
      setStatus("error");
      setErrorMsg(t("errorMessageShort"));
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.detail || t("errorRequest"));
      }

      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : t("errorFallback"));
    }
  }

  return (
    <section id="contato" className="relative py-28 md:py-36">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="text-center"
        >
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-royal-500/60" />
            {t("eyebrow")}
          </span>
          <h2 className="heading-lg mt-4">
            {t("headingPart1")}{" "}
            <span className="bg-gradient-to-r from-royal-400 to-royal-200 bg-clip-text text-transparent">
              {t("headingHighlight")}
            </span>
            {t("headingPart2")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">{t("subheading")}</p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="glass-strong p-6 md:p-8"
          >
            <div className="space-y-5">
              <a href="mailto:viniciusbelchior2017@gmail.com" className="group flex items-start gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-royal-500/15 text-royal-200 ring-1 ring-royal-500/30 transition-colors group-hover:bg-royal-500/25">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-subtle">{t("labelEmail")}</div>
                  <div className="font-mono text-sm text-white link-underline">viniciusbelchior2017@gmail.com</div>
                </div>
              </a>

              <a href="tel:+5514991949623" className="group flex items-start gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-royal-500/15 text-royal-200 ring-1 ring-royal-500/30 transition-colors group-hover:bg-royal-500/25">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-subtle">{t("labelPhone")}</div>
                  <div className="font-mono text-sm text-white link-underline">+55 (14) 99194-9623</div>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-royal-500/15 text-royal-200 ring-1 ring-royal-500/30">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-subtle">{t("labelLocation")}</div>
                  <div className="text-sm text-white">{t("valueLocation")}</div>
                </div>
              </div>
            </div>

            <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="space-y-3 text-sm text-ink-muted">
              <p>
                {t("otherChannels")}{" "}
                <a href="https://linkedin.com/in/viniciusbelchior14/" target="_blank" rel="noreferrer" className="text-royal-300 link-underline">LinkedIn</a>{" "}&{" "}
                <a href="https://github.com/Vinicius154" target="_blank" rel="noreferrer" className="text-royal-300 link-underline">GitHub</a>.
              </p>
            </div>
          </motion.aside>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
            onSubmit={handleSubmit}
            className="glass-strong p-6 md:p-8 space-y-5"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label={t("fieldName")} name="name" placeholder={t("fieldNamePh")} />
              <Field label={t("fieldEmail")} name="email" type="email" placeholder={t("fieldEmailPh")} />
            </div>
            <Field label={t("fieldSubject")} name="subject" placeholder={t("fieldSubjectPh")} />
            <div>
              <label className="block text-xs uppercase tracking-wider text-ink-subtle">{t("fieldMessage")}</label>
              <textarea
                name="message"
                rows={6}
                required
                placeholder={t("fieldMessagePh")}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-ink-subtle focus:border-royal-500/60 focus:outline-none focus:ring-2 focus:ring-royal-500/30 transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("btnSending")}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {t("btnSend")}
                  </>
                )}
              </button>

              {status === "success" && (
                <motion.span initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 text-sm text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                  {t("success")}
                </motion.span>
              )}
              {status === "error" && (
                <motion.span initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 text-sm text-rose-300">
                  <AlertCircle className="h-4 w-4" />
                  {errorMsg || t("errorFallback")}
                </motion.span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-ink-subtle">{label}</label>
      <input
        type={type}
        name={name}
        required={label.endsWith("*")}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-ink-subtle focus:border-royal-500/60 focus:outline-none focus:ring-2 focus:ring-royal-500/30 transition-all"
      />
    </div>
  );
}
