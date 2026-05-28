import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except:
  // - /_next, /api, /static, /favicon.ico, arquivos com extensão
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
