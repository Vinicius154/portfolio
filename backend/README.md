# Backend — Portfolio Vinicius Belchior

API em **FastAPI** que serve o formulário de contato do portfólio, enviando as mensagens por SMTP para o e-mail configurado.

## Endpoints

| Método | Rota             | Descrição                                |
|--------|------------------|-------------------------------------------|
| GET    | `/api/health`    | Healthcheck                               |
| POST   | `/api/contact`   | Recebe e envia a mensagem por e-mail      |
| GET    | `/docs`          | Swagger UI (FastAPI autogenerado)         |

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

**Respostas**
- `200` `{ "ok": true, "message": "Mensagem enviada com sucesso." }`
- `422` Erro de validação (Pydantic)
- `502` Falha de autenticação no provedor SMTP
- `503` SMTP não configurado
- `500` Erro inesperado

## Setup local

> **Python recomendado:** 3.12 ou 3.13. O 3.14 funciona com este `requirements.txt`, mas é menos estável para deps com bindings Rust (pydantic-core).

**Windows (CMD):**
```bat
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
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

API em `http://localhost:8000`, docs em `http://localhost:8000/docs`.

### Troubleshooting

**`Failed building wheel for pydantic-core` no Python 3.14**

O Python 3.14 ainda é muito recente. Soluções (em ordem de preferência):

1. **Use Python 3.12 ou 3.13** (recomendado).
2. Atualize o pip para a versão mais nova: `python -m pip install --upgrade pip`
3. Force forward-compat do PyO3 (lento, compila via Rust):
   ```bat
   set PYO3_USE_ABI3_FORWARD_COMPATIBILITY=1
   pip install -r requirements.txt
   ```

## Variáveis de ambiente (`.env`)

```env
ALLOWED_ORIGINS=http://localhost:3000,https://seu-dominio.com

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=viniciusbelchior2017@gmail.com
SMTP_PASSWORD=APP_PASSWORD_DO_GMAIL          # ver abaixo
MAIL_FROM=viniciusbelchior2017@gmail.com
MAIL_TO=viniciusbelchior2017@gmail.com

LOG_LEVEL=INFO
PORT=8000
```

### Gerando a App Password do Gmail

1. Ative **2FA** na sua conta Google.
2. Vá em [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
3. Crie uma senha de aplicativo (16 caracteres) e cole em `SMTP_PASSWORD`.

> Você também pode usar **Resend**, **Mailgun**, **SendGrid** ou qualquer SMTP — basta ajustar `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` e `SMTP_PASSWORD`.

## Docker

```bash
cd backend
docker build -t portfolio-api .
docker run --env-file .env -p 8000:8000 portfolio-api
```

## Deploy

### Render / Railway / Fly.io
1. Aponte o serviço para esta pasta (`backend/`).
2. Configure as variáveis de ambiente da seção acima.
3. Comando de start: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
4. Copie a URL pública para o `NEXT_PUBLIC_API_URL` do frontend.

### Azure App Service (Python)
- Suba a pasta `backend/` e configure as env vars.
- Startup command: `uvicorn main:app --host 0.0.0.0 --port 8000`.

## Estrutura

```
backend/
├── main.py            # app FastAPI + lógica SMTP
├── requirements.txt
├── .env.example
├── Dockerfile
└── README.md
```
