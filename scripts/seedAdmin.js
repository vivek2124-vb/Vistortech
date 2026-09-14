/**
 * Run once to create the first admin account:
 *   node scripts/seedAdmin.js
 * Reads ADMIN_EMAIL, ADMIN_PASSWORD, MONGODB_URI from .env
 */
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: "admin" },
  createdAt: { type: Date, default: Date.now },
});

async function seed() {
  const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("Missing MONGODB_URI, ADMIN_EMAIL, or ADMIN_PASSWORD in .env");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

  const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (existing) {
    console.log("Admin already exists for", ADMIN_EMAIL);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await Admin.create({ email: ADMIN_EMAIL.toLowerCase(), passwordHash });

  console.log("Admin account created for", ADMIN_EMAIL);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
