import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, TOKEN_COOKIE_NAME } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;
  const payload = token ? verifyAdminToken(token) : null;

  if (!payload) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, email: payload.email });
}
