import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import verifyToken from "@/middleware/auth";

export async function PUT(req, { params }) {
  await dbConnect();
  const user = await verifyToken(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { blogId, commentId } = params;
  const { text } = await req.json();

  const blog = await Blog.findById(blogId);
  const comment = blog?.comments.id(commentId);
  if (!comment) return NextResponse.json({ message: "Comment not found" }, { status: 404 });

  comment.text = text.trim();
  await blog.save();
  return NextResponse.json(comment);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const user = await verifyToken(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { blogId, commentId } = params;

  const blog = await Blog.findById(blogId);
  const comment = blog?.comments.id(commentId);
  if (!comment) return NextResponse.json({ message: "Comment not found" }, { status: 404 });

  comment.remove();
  await blog.save();
  return NextResponse.json({ message: "Comment deleted successfully" });
}
