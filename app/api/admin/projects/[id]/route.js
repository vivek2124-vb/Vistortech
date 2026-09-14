import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { verifyAdminToken, TOKEN_COOKIE_NAME } from "@/lib/auth";
import { destroyCloudinaryAsset } from "@/lib/cloudinary";
import mongoose from "mongoose";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;
  return token ? verifyAdminToken(token) : null;
}

export async function PUT(request, { params }) {
  const admin = await requireAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });
  }

  await connectDB();
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const project = await Project.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }
  return NextResponse.json({ project });
}

export async function DELETE(request, { params }) {
  const admin = await requireAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });
  }

  await connectDB();

  const project = await Project.findByIdAndDelete(id);
  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  if (project?.imagePublicIds?.length) {
    await Promise.all(
      project.imagePublicIds.map((publicId) =>
        destroyCloudinaryAsset(publicId),
      ),
    );
  }

  return NextResponse.json({ success: true });
}
