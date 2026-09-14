import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { signAdminToken, authCookieOptions, TOKEN_COOKIE_NAME } from "@/lib/auth";

export async function POST(request) {
  await connectDB();
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const token = signAdminToken({ id: admin._id.toString(), email: admin.email });

  const response = NextResponse.json({ success: true });
  response.cookies.set(TOKEN_COOKIE_NAME, token, authCookieOptions);
  return response;
}
