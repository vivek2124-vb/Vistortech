import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_COOKIE_NAME = "vt_session";
const TOKEN_MAX_AGE = 60 * 60 * 8; // 8 hours

export function signAdminToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_MAX_AGE });
}

export function verifyAdminToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: TOKEN_MAX_AGE,
};

export { TOKEN_COOKIE_NAME };
