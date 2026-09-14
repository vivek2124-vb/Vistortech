import { NextResponse } from "next/server";
import { verifyAdminToken, TOKEN_COOKIE_NAME } from "@/lib/auth";

// jsonwebtoken needs Node APIs, so this middleware runs on the Node.js
// runtime (stable since Next.js 15.5) rather than the default Edge runtime.
export const runtime = "nodejs";

const ADMIN_ROUTE = process.env.ADMIN_ROUTE || "vt-admin";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isAdminPath = pathname.startsWith(`/${ADMIN_ROUTE}`);
  const isLoginPath = pathname === `/${ADMIN_ROUTE}/login`;

  if (isAdminPath && !isLoginPath) {
    const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;
    const payload = token ? verifyAdminToken(token) : null;

    if (!payload) {
      const loginUrl = new URL(`/${ADMIN_ROUTE}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/vt-admin/:path*"],
};
