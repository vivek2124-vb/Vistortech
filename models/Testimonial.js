import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  companyOrWebsite: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
