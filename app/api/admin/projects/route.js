import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { verifyAdminToken, TOKEN_COOKIE_NAME } from "@/lib/auth";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;
  return token ? verifyAdminToken(token) : null;
}

export async function POST(request) {
  const admin = await requireAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    await connectDB();
    const project = await Project.create(body);
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    if (error?.name === "ValidationError" || error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid project data." },
        { status: 400 },
      );
    }
    throw error;
  }
}
