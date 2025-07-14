// frontend/src/pages/api/user/logout.js

export default function handler(req, res) {
  res.setHeader("Set-Cookie", "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT");
  res.status(200).json({ message: "Logged out successfully" });
}
