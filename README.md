# Vinicius Belchior — Portfolio

Portfólio profissional de **Vinicius Belchior**, Desenvolvedor Full Stack & Analista de Dados.

Monorepo dividido em duas aplicações independentes:

```
portfolio/
├── frontend/   Next.js 14 · TypeScript · TailwindCSS · Framer Motion · next-intl
└── backend/    FastAPI · Pydantic v2 · Resend (formulário de contato)
```

---

## Stack

**Frontend**

- Next.js 14 (App Router, RSC)
- TypeScript
- TailwindCSS
- Framer Motion — cursor spotlight, typewriter, tilt 3D, contadores animados, blur reveals, parallax
- next-intl — internacionalização PT/EN
- Lucide Icons

**Backend**

- Python 3.12+
- FastAPI + Pydantic v2
- Resend - envio de e-mail via API HTTP (sem SMTP)
- uv - gerenciamento de dependências

---

## Funcionalidades

- Suporte completo a **PT / EN** via next-intl com detecção de rota
- **Cursor spotlight** — glow suave que segue o mouse
- **Typewriter** no Hero — roles alternando com cursor piscando
- **Tilt 3D** nos cards de Stack e Experience
- **Contadores animados** nas estatísticas do About
- **Blur reveal** nas seções ao rolar
- **Slideshow automático** na seção de Achievements (troca a cada 3s)
- **Barra de progresso** de scroll no topo
- Aurora animada no fundo
- Formulário de contato com validação client-side e envio via Resend

---

## Identidade visual

- **Cor principal:** Azul royal escuro (`#1E40AF`)
- **Acentos:** `#3B82F6`, `#6366F1`
- **Estética:** dark-first, glass morphism, tipografia _Space Grotesk_ (títulos) / _Inter_ (corpo) / _JetBrains Mono_ (código)

---

## Como rodar localmente

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:3000`.

Para configurar a URL do backend, crie `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend

```powershell
cd backend
uv sync
Copy-Item .env.example .env
# Edite .env com sua RESEND_API_KEY
uv run python main.py
```

API em `http://localhost:8000` — docs interativos em `/docs`.

---

## Deploy

| Camada   | Plataforma recomendada                   |
| -------- | ---------------------------------------- |
| Frontend | **Vercel** (zero config para Next.js)    |
| Backend  | **Render** (free tier, suporte a Python) |

### Passos rápidos

**Backend (Render):**

1. New Web Service → conecta o repositório → Root Directory: `backend`
2. Build: `pip install uv && uv sync --frozen --no-dev`
3. Start: `uv run uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Adiciona as variáveis: `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_TO`, `ALLOWED_ORIGINS`

**Frontend (Vercel):**

1. New Project → importa o repositório → Root Directory: `frontend`
2. Adiciona a variável: `NEXT_PUBLIC_API_URL=https://sua-api.onrender.com`

Após o deploy, atualize `ALLOWED_ORIGINS` no Render com a URL do Vercel.

---

## Troubleshooting

**`hasLocale is not exported from 'next-intl'`**
Instalação corrompida do next-intl. O projeto já usa `.includes()` como substituto — não é necessário nenhuma ação.

**Frontend — node_modules corrompido**

```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

**E-mail não chega (Render free tier)**
O Render bloqueia conexões SMTP. Por isso o projeto usa **Resend** (API HTTP). Confirme que `RESEND_API_KEY` está configurada nas variáveis de ambiente do serviço.

---

## Contato

- **E-mail:** viniciusbelchior2017@gmail.com
- **LinkedIn:** [linkedin.com/in/viniciusbelchior14](https://linkedin.com/in/viniciusbelchior14/)
- **GitHub:** [github.com/Vinicius154](https://github.com/Vinicius154)
- **Localização:** Bauru — SP, Brasil

---

© 2026 Vinicius Belchior.
