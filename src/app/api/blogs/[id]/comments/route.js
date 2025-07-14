import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import verifyToken from "@/middleware/auth";

export async function GET(_, { params }) {
  await dbConnect();
  const blog = await Blog.findById(params.id).select("comments");
  return NextResponse.json(blog?.comments || []);
}

export async function POST(req, { params }) {
  await dbConnect();
  const user = await verifyToken(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { text } = await req.json();
  if (!text || text.trim() === "")
    return NextResponse.json({ message: "Comment text cannot be empty" }, { status: 400 });

  const blog = await Blog.findById(params.id);
  if (!blog) return NextResponse.json({ message: "Blog not found" }, { status: 404 });

  const comment = {
    author: user.username,
    text: text.trim(),
    date: new Date(),
  };
  blog.comments.push(comment);
  await blog.save();

  return NextResponse.json(blog.comments.at(-1), { status: 201 });
}
