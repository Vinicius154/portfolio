import "./globals.css";

// O root layout fica intencionalmente vazio: o <html>/<body> e o
// NextIntlClientProvider vivem em app/[locale]/layout.tsx, onde temos
// acesso ao locale dinâmico (lang attribute, metadata, etc).
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
