import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { verifyAdminToken, TOKEN_COOKIE_NAME } from "@/lib/auth";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

const MAX_FILE_BYTES = 8 * 1024 * 1024;

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

  return token ? verifyAdminToken(token) : null;
}

function createCloudinarySignature(params, apiSecret) {
  const sortedParams = Object.keys(params)
    .sort()
    .map(
      (key) =>
        `${key}=${params[key]}`
    )
    .join("&");

  return crypto
    .createHash("sha1")
    .update(sortedParams + apiSecret)
    .digest("hex");
}

async function uploadBufferToCloudinary(buffer) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const timestamp = Math.floor(Date.now() / 1000);

  const paramsToSign = {
    timestamp,
  };

  const signature = createCloudinarySignature(
    paramsToSign,
    apiSecret
  );

  const formData = new FormData();

  formData.append(
    "file",
    new Blob([buffer]),
    "image"
  );

  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Cloudinary error:", data);

    throw new Error(
      data?.error?.message || "Cloudinary upload failed"
    );
  }

  return data;
}

async function destroyCloudinaryAsset(publicId) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const timestamp = Math.floor(Date.now() / 1000);

  const paramsToSign = {
    public_id: publicId,
    timestamp,
  };

  const signature = createCloudinarySignature(
    paramsToSign,
    apiSecret
  );

  const formData = new FormData();

  formData.append("public_id", publicId);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Cloudinary delete error:", data);

    throw new Error(
      data?.error?.message || "Cloudinary delete failed"
    );
  }

  return data;
}

export async function POST(request) {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Use JPG, PNG, WEBP, GIF, or AVIF.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: "Image is larger than 8MB." },
        { status: 400 }
      );
    }

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Cloudinary environment variables are missing");

      return NextResponse.json(
        {
          error:
            "Cloudinary is not configured on the server yet.",
        },
        { status: 500 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await uploadBufferToCloudinary(buffer);

    return NextResponse.json(
      {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Upload failed. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: "publicId is required" },
        { status: 400 }
      );
    }

    await destroyCloudinaryAsset(publicId);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Delete failed",
      },
      { status: 500 }
    );
  }
}
