import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { verifyAdminToken, TOKEN_COOKIE_NAME } from "@/lib/auth";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

async function getProjects() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(projects));
}

export default async function DashboardPage() {
  // middleware.js already guarantees a valid session reaches this far,
  // but we read the payload again here to display the admin's email.
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;
  const payload = verifyAdminToken(token);
  const projects = await getProjects();

  return <DashboardClient initialProjects={projects} adminEmail={payload?.email} />;
}
