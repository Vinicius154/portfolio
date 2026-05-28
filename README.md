# Vinicius Belchior — Portfolio

Portfólio profissional de **Vinicius Belchior**, Desenvolvedor Full Stack & Analista de Dados.

Monorepo dividido em duas aplicações independentes:

```
portfolio/
├── frontend/     Next.js 14 (App Router) · TypeScript · TailwindCSS · Framer Motion
└── backend/      FastAPI · Pydantic · SMTP (formulário de contato)
```

---

## Stack

**Frontend**
- Next.js 14 (App Router, RSC)
- TypeScript
- TailwindCSS
- Framer Motion (animações on-scroll, parallax sutil, reveals)
- Lucide Icons

**Backend**
- Python 3.12
- FastAPI + Pydantic v2
- SMTP (Gmail / qualquer provedor compatível)
- Docker pronto para deploy

---

## Identidade visual

- **Cor principal:** Azul royal escuro (`#1E40AF`)
- **Acentos:** tons de azul vibrante (`#3B82F6`, `#6366F1`)
- **Estética:** minimalista, dark-first, com aurora animada no fundo, grid sutil e tipografia *Space Grotesk* para títulos / *Inter* para corpo.
- **Movimento:** smooth scroll nativo, barra de progresso de scroll, reveals com `whileInView`, parallax leve no hero, badges flutuantes e glow conic na foto.

---

## Como rodar localmente

### 1) Frontend

**Windows (PowerShell ou CMD):**
```bat
cd frontend
copy .env.example .env.local
npm install
npm run dev
```

**Linux/macOS:**
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```
Acesse `http://localhost:3000`.

### 2) Backend

**Recomendado: Python 3.12 ou 3.13** (3.14 funciona, mas pode exigir build via Rust se faltar wheel).

**Windows (CMD):**
```bat
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
:: Edite .env com SMTP_USER e SMTP_PASSWORD (App Password do Gmail)
python main.py
```

**Windows (PowerShell):**
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python main.py
```

**Linux/macOS:**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python main.py
```
API em `http://localhost:8000` — docs interativos em `/docs`.

---

## Deploy

| Camada    | Sugestão                                |
|-----------|------------------------------------------|
| Frontend  | Vercel (zero config) / Netlify           |
| Backend   | Render / Railway / Fly.io / Azure App Service (Dockerfile incluso) |

Após publicar o backend, defina `NEXT_PUBLIC_API_URL` no frontend para a URL pública dele.

---

## Troubleshooting

### Frontend — `Cannot find module './lib/stringify'` no braces

`node_modules` corrompido (geralmente após mesclar instalações antigas). Limpe e reinstale:

**Windows (CMD):**
```bat
cd frontend
rmdir /s /q node_modules
del package-lock.json
npm install
```
**Linux/macOS:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Backend — falha ao compilar `pydantic-core` no Python 3.14

`pydantic-core 2.23` (PyO3 0.22) só suporta até Python 3.13. O `requirements.txt` deste projeto já usa `pydantic>=2.10` que tem wheels pré-compilados. Se ainda assim falhar:

1. **Use Python 3.12 ou 3.13** (recomendado para servidores em produção).
2. Ou force a flag de forward-compat do PyO3:
   ```bat
   set PYO3_USE_ABI3_FORWARD_COMPATIBILITY=1
   pip install -r requirements.txt
   ```

---

## Contato

- **E-mail:** viniciusbelchior2017@gmail.com
- **LinkedIn:** [linkedin.com/in/viniciusbelchior14](https://linkedin.com/in/viniciusbelchior14/)
- **GitHub:** [github.com/Vinicius154](https://github.com/Vinicius154)
- **Localização:** Bauru — SP, Brasil

---

© 2026 Vinicius Belchior.
