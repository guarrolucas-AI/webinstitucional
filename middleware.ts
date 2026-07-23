import { NextResponse, type NextRequest } from "next/server";
import { geolocation } from "@vercel/functions";

const LOCALE_COOKIE = "NEXT_LOCALE";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.get(LOCALE_COOKIE)) {
    const { country } = geolocation(request);
    const locale = country && country !== "AR" ? "en" : "es";

    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
}

export const config = {
  matcher: "/((?!_next|api|.*\\..*).*)",
};
