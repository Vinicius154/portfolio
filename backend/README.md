# Backend — Portfolio Vinicius Belchior

API em **FastAPI** que serve o formulário de contato do portfólio, enviando as mensagens via **Resend** (API HTTP — sem SMTP, funciona em qualquer host gratuito).

## Endpoints

| Método | Rota           | Descrição                           |
|--------|----------------|--------------------------------------|
| GET    | `/api/health`  | Healthcheck                          |
| POST   | `/api/contact` | Recebe e envia a mensagem por e-mail |
| GET    | `/docs`        | Swagger UI (gerado pelo FastAPI)     |

### POST `/api/contact`

**Body**
```json
{
  "name": "Maria Souza",
  "email": "maria@empresa.com",
  "subject": "Oportunidade Full Stack",
  "message": "Olá, Vinicius..."
}
```

**Validações**
- `name` — 2 a 120 caracteres
- `email` — e-mail válido
- `subject` — opcional, máx. 200 caracteres
- `message` — 10 a 4000 caracteres

**Respostas**
- `200` `{ "ok": true, "message": "Mensagem enviada com sucesso." }`
- `422` Erro de validação (Pydantic)
- `503` `RESEND_API_KEY` não configurada
- `500` Erro inesperado

---

## Setup local

> **Python recomendado:** 3.12 ou 3.13. O 3.14 funciona com este `requirements.txt`, mas é menos estável para deps com bindings Rust (pydantic-core).

**Windows (PowerShell):**
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
# Edite .env com sua RESEND_API_KEY
python main.py
```

**Linux/macOS:**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edite .env com sua RESEND_API_KEY
python main.py
```

API em `http://localhost:8000`, docs em `http://localhost:8000/docs`.

---

## Variáveis de ambiente (`.env`)

```env
# Domínios autorizados (separados por vírgula)
ALLOWED_ORIGINS=http://localhost:3000,https://seu-dominio.vercel.app

# Resend — crie sua chave em https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx

# Use "onboarding@resend.dev" até verificar um domínio próprio no Resend
MAIL_FROM=onboarding@resend.dev
MAIL_TO=viniciusbelchior2017@gmail.com

LOG_LEVEL=INFO
PORT=8000
```

### Obtendo a chave do Resend

1. Crie conta gratuita em [resend.com](https://resend.com) (3.000 e-mails/mês grátis).
2. Vá em **API Keys → Create API Key**.
3. Cole o valor em `RESEND_API_KEY`.

> Enquanto não verificar um domínio próprio, use `MAIL_FROM=onboarding@resend.dev`. O e-mail chega normalmente, só o remetente fica genérico.

---

## Docker

```bash
cd backend
docker build -t portfolio-api .
docker run --env-file .env -p 8000:8000 portfolio-api
```

---

## Deploy (Render)

1. Crie um **Web Service** apontando para a pasta `backend/`.
2. **Build Command:** `pip install -r requirements.txt`
3. **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Adicione as variáveis de ambiente na aba **Environment**.
5. Copie a URL pública para o `NEXT_PUBLIC_API_URL` do frontend (Vercel).

---

## Estrutura

```
backend/
├── main.py            # App FastAPI + integração Resend
├── requirements.txt   # fastapi, uvicorn, pydantic[email], resend, python-dotenv
├── .env.example       # Modelo de variáveis de ambiente
├── Dockerfile
└── README.md
```
