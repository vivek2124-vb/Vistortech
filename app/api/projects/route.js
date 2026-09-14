import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const query = category ? { category } : {};
  const projects = await Project.find(query).sort({ createdAt: -1 });

  return NextResponse.json({ projects });
}
