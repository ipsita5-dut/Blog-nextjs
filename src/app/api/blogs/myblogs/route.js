import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import verifyToken from "@/middleware/auth";

export async function GET(req) {
  await dbConnect();
  const user = await verifyToken(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const blogs = await Blog.find({ author: user.username }).sort({ createdAt: -1 });
  return NextResponse.json(blogs);
}
