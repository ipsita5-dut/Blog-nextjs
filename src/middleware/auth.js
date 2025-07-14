// src/middleware/auth.js
import jwt from "jsonwebtoken";

export default function verifyToken(req) {
  try {
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded; // return user object (e.g., username)
  } catch (err) {
    console.error("Token verification error:", err.message);
    return null;
  }
}
