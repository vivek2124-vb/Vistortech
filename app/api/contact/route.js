import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ContactSubmission from "@/models/ContactSubmission";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, email, phone, service, message } = body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !message.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { error: "Enter a valid name, email, and message." },
      { status: 400 },
    );
  }

  await connectDB();
  const submission = await ContactSubmission.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone,
    service,
    message,
  });

  // Optional: send a notification email via nodemailer here using
  // process.env.SMTP_HOST / SMTP_USER / SMTP_PASS / CONTACT_TO_EMAIL

  return NextResponse.json({ success: true, id: submission._id });
}
