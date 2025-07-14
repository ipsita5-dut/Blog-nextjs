import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { verifyToken } from "@/middleware/auth";

async function handler(req, res) {
  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const user = await User.findById(req.user.userId).select("-password"); // remove password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export default verifyToken(handler); // 👈 Protect this route
