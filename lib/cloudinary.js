import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const FOLDER = process.env.CLOUDINARY_FOLDER || "vistortech/portfolio";

/**
 * Uploads a Buffer to Cloudinary using an upload stream (no temp files needed).
 * Returns the Cloudinary result, which includes secure_url + public_id.
 */
export function uploadBufferToCloudinary(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: FOLDER,
        resource_type: "image",
        // Keeps files reasonably sized without hurting quality noticeably.
        transformation: [{ width: 2000, height: 2000, crop: "limit" }, { quality: "auto" }],
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

export function destroyCloudinaryAsset(publicId) {
  if (!publicId) return Promise.resolve(null);
  return cloudinary.uploader.destroy(publicId).catch(() => null);
}

export default cloudinary;
