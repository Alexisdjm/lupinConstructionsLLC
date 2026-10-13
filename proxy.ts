import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "es"] as const;

type Locale = (typeof locales)[number];

function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const tags = header
    .split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase() ?? "");

  for (const tag of tags) {
    if (tag.startsWith("es")) return "es";
    if (tag.startsWith("en")) return "en";
  }

  return "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return;

  const locale = preferredLocale(request);
  request.nextUrl.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
