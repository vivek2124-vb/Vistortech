import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["web-development", "app-development", "digital-marketing", "ecommerce-website"],
  },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  images: [{ type: String }],
  imagePublicIds: [{ type: String }],
  liveUrl: { type: String },
  clientName: { type: String },
  testimonial: { type: String },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
