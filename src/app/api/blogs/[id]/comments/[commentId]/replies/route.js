import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import verifyToken from "@/middleware/auth";

export async function POST(req, { params }) {
  await dbConnect();
  const user = await verifyToken(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { blogId, commentId } = params;
  const { text } = await req.json();

  if (!text || text.trim() === "")
    return NextResponse.json({ message: "Reply text cannot be empty" }, { status: 400 });

  const blog = await Blog.findById(blogId);
  const comment = blog?.comments.id(commentId);
  if (!comment) return NextResponse.json({ message: "Comment not found" }, { status: 404 });

  const reply = {
    author: user.username,
    text: text.trim(),
  };

  comment.replies.push(reply);
  await blog.save();
  return NextResponse.json(reply, { status: 201 });
}
