"""
Backend do portfólio — Vinicius Belchior.

API mínima em FastAPI com:
- /api/contact (POST): recebe mensagem do formulário e envia por e-mail (SMTP).
- /api/health (GET): healthcheck.

Pensado para deploy simples (Render, Railway, Fly.io, Azure App Service).
"""

from __future__ import annotations

import logging
import os
import smtplib
import ssl
from email.message import EmailMessage
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, field_validator

# ---------------------------------------------------------------------------
# Setup
# ---------------------------------------------------------------------------

load_dotenv()

logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO"),
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger("portfolio.backend")

ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if o.strip()
]

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
MAIL_FROM = os.getenv("MAIL_FROM", SMTP_USER)
MAIL_TO = os.getenv("MAIL_TO", "viniciusbelchior2017@gmail.com")

# ---------------------------------------------------------------------------
# App
# ---------------------------------------------------------------------------

app = FastAPI(
    title="Vinicius Belchior — Portfolio API",
    description="API que serve o formulário de contato do portfólio.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------

class ContactPayload(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(default="", max_length=200)
    message: str = Field(..., min_length=10, max_length=4000)

    @field_validator("name", "subject", "message")
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        return (v or "").strip()


class ContactResponse(BaseModel):
    ok: bool
    message: str


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def build_email(payload: ContactPayload) -> EmailMessage:
    msg = EmailMessage()
    subject_prefix = "[Portfólio]"
    subject = f"{subject_prefix} {payload.subject}" if payload.subject else f"{subject_prefix} Nova mensagem"
    msg["Subject"] = subject
    msg["From"] = MAIL_FROM
    msg["To"] = MAIL_TO
    msg["Reply-To"] = payload.email

    body = (
        f"Você recebeu uma nova mensagem pelo portfólio.\n\n"
        f"Nome: {payload.name}\n"
        f"E-mail: {payload.email}\n"
        f"Assunto: {payload.subject or '(sem assunto)'}\n\n"
        f"Mensagem:\n{payload.message}\n"
    )
    msg.set_content(body)

    html = f"""
    <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#0f172a; background:#f8fafc; padding:24px;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e2e8f0;">
        <h2 style="margin:0 0 8px;color:#1e3a8a;">Nova mensagem pelo portfólio</h2>
        <p style="color:#475569;margin:0 0 16px;">Você recebeu uma nova mensagem.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#64748b;width:90px;">Nome</td><td style="padding:6px 0;color:#0f172a;">{payload.name}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b;">E-mail</td><td style="padding:6px 0;color:#0f172a;">{payload.email}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b;">Assunto</td><td style="padding:6px 0;color:#0f172a;">{payload.subject or '(sem assunto)'}</td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#f1f5f9;border-radius:8px;color:#0f172a;white-space:pre-wrap;font-size:14px;line-height:1.55;">
          {payload.message}
        </div>
      </div>
    </div>
    """
    msg.add_alternative(html, subtype="html")
    return msg


def send_email(msg: EmailMessage) -> None:
    """Envia o e-mail via SMTP com STARTTLS."""
    if not SMTP_USER or not SMTP_PASSWORD:
        raise RuntimeError(
            "SMTP_USER/SMTP_PASSWORD não configurados. Defina-os no .env"
        )

    context = ssl.create_default_context()
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as server:
        server.ehlo()
        server.starttls(context=context)
        server.ehlo()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "service": "portfolio-api"}


@app.post(
    "/api/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_200_OK,
)
def contact(payload: ContactPayload, request: Request) -> ContactResponse:
    client_ip = request.client.host if request.client else "?"
    logger.info(
        "Nova mensagem de %s <%s> (origem=%s)",
        payload.name,
        payload.email,
        client_ip,
    )

    try:
        msg = build_email(payload)
        send_email(msg)
    except RuntimeError as e:
        logger.error("Configuração SMTP ausente: %s", e)
        raise HTTPException(
            status_code=503,
            detail="Serviço de e-mail indisponível. Tente novamente em instantes.",
        )
    except smtplib.SMTPAuthenticationError:
        logger.exception("Falha de autenticação SMTP.")
        raise HTTPException(
            status_code=502,
            detail="Falha ao autenticar com o provedor de e-mail.",
        )
    except Exception:
        logger.exception("Erro ao enviar e-mail.")
        raise HTTPException(
            status_code=500,
            detail="Erro inesperado ao enviar a mensagem.",
        )

    return ContactResponse(ok=True, message="Mensagem enviada com sucesso.")


# ---------------------------------------------------------------------------
# Local entry
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", "8000")),
        reload=True,
    )
