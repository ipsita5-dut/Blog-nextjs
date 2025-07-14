import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import verifyToken from "@/middleware/auth";
import upload from "@/middleware/upload";

export const config = { api: { bodyParser: false } };

export async function GET(_, { params }) {
  await dbConnect();
  const blog = await Blog.findById(params.id);
  if (!blog) return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  return NextResponse.json(blog);
}

export async function PUT(req, { params }) {
  await dbConnect();
  return new Promise((resolve) => {
    upload.single("image")(req, {}, async (err) => {
      if (err) return resolve(NextResponse.json({ message: "Upload error" }, { status: 400 }));

      try {
        const { title, content, tags, image } = req.body;
        const tagArray = tags?.split(",").map((tag) => tag.trim()) || [];
        const imageUrl = req.file
          ? `${req.headers.origin}/uploads/${req.file.filename}`
          : image;

        const updatedBlog = await Blog.findByIdAndUpdate(
          params.id,
          { title, content, tags: tagArray, image: imageUrl },
          { new: true, runValidators: true }
        );
        if (!updatedBlog)
          return resolve(NextResponse.json({ message: "Blog not found" }, { status: 404 }));
        resolve(NextResponse.json(updatedBlog));
      } catch (err) {
        resolve(NextResponse.json({ message: "Error updating blog" }, { status: 500 }));
      }
    });
  });
}

export async function DELETE(_, { params }) {
  await dbConnect();
  const user = await verifyToken(_);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const deleted = await Blog.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "Deleted successfully" });
}
