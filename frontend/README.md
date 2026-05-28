# Frontend — Portfolio Vinicius Belchior

Aplicação Next.js 14 (App Router) em TypeScript com TailwindCSS e Framer Motion.

## Scripts

```bash
npm install        # instala dependências
npm run dev        # desenvolvimento (localhost:3000)
npm run build      # build de produção
npm run start      # roda o build (após npm run build)
npm run lint       # ESLint
```

## Variáveis de ambiente

Crie `.env.local` a partir de `.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Em produção, aponte para a URL do backend publicado.

## Internacionalização (PT / EN)

O site é bilíngue via **next-intl** com rotas distintas:

- `/` → redireciona para PT (default)
- `/en` → versão em inglês
- `/pt` → equivalente explícito ao default

Toggle **PT/EN** vive no Navbar (desktop e mobile) e troca a URL preservando a rota e o scroll. As traduções ficam em:

```
messages/
├── pt.json
└── en.json
```

Para adicionar uma nova string: adicione a chave em **ambos** os arquivos e consuma com `useTranslations("Namespace")`.

Para adicionar outro idioma (ex.: `es`):
1. Crie `messages/es.json` com as mesmas chaves.
2. Adicione `"es"` em `i18n/routing.ts → locales`.
3. Atualize `LanguageToggle.tsx` com o novo botão.

## Estrutura

```
frontend/
├── app/
│   ├── [locale]/
│   │   ├── components/
│   │   │   ├── Aurora.tsx           # luzes animadas de fundo
│   │   │   ├── ScrollProgress.tsx   # barra de progresso de scroll
│   │   │   ├── Navbar.tsx           # navegação fixa com blur
│   │   │   ├── LanguageToggle.tsx   # toggle PT/EN
│   │   │   ├── Hero.tsx             # hero com parallax + foto
│   │   │   ├── About.tsx            # perfil + stats
│   │   │   ├── Stack.tsx            # grid de tecnologias
│   │   │   ├── Experience.tsx       # timeline + formação
│   │   │   ├── Achievements.tsx     # seção do foguete LASC
│   │   │   ├── Contact.tsx          # form de contato (chama backend)
│   │   │   └── Footer.tsx
│   │   ├── layout.tsx               # html/body + NextIntlClientProvider
│   │   └── page.tsx
│   ├── globals.css                  # tema, componentes, utilitários
│   └── layout.tsx                   # root layout (apenas children)
├── i18n/
│   ├── routing.ts                   # locales suportados + navegação tipada
│   └── request.ts                   # carrega messages por locale
├── messages/
│   ├── pt.json                      # traduções PT
│   └── en.json                      # traduções EN
├── middleware.ts                    # routing de locale (next-intl)
├── public/
│   ├── vb.jpeg
│   ├── foguete1.jpeg
│   ├── foguete2.jpeg
│   └── Vinicius_Belchior_CV.pdf
├── tailwind.config.ts
├── next.config.js                   # wrapped com next-intl/plugin
├── tsconfig.json
└── package.json
```

## Identidade visual

- **Paleta:** azul royal escuro (`royal-800: #1E40AF`) como protagonista, dark background `#050912`, tipografia *Space Grotesk* (display) + *Inter* (body) + *JetBrains Mono* (mono).
- **Animações:** Framer Motion (`whileInView`, parallax via `useScroll`/`useTransform`), aurora pulsando, ring conic na foto, badges flutuando, shimmer nos cards do stack.
- **Acessibilidade:** prefere-cores escuras nativas, alvos clicáveis amplos, contraste alto em texto, foco visível com ring royal.

## Troubleshooting

**`Cannot find module './lib/stringify'` no braces** — `node_modules` corrompido. Limpe e reinstale:

```bat
:: Windows
rmdir /s /q node_modules
del package-lock.json
npm install
```
```bash
# Linux/macOS
rm -rf node_modules package-lock.json
npm install
```

O `package.json` já tem `overrides` que travam `braces@3.0.3` para evitar regressões.

---

## Deploy na Vercel

1. Conecte o repositório no [vercel.com](https://vercel.com).
2. Defina `NEXT_PUBLIC_API_URL` em *Project Settings → Environment Variables*.
3. Commit & push — deploy automático.
