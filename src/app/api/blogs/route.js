import { NextResponse } from "next/server";
import { Readable } from "stream";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import verifyToken from "@/middleware/auth";
import upload from "@/middleware/upload";

// Use Node.js runtime
export const runtime = "nodejs";

// Disable Next.js built-in body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// GET all blogs
export async function GET() {
  await dbConnect();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return NextResponse.json(blogs);
}

// POST new blog
export async function POST(req) {
  await dbConnect();

  const user = await verifyToken(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return new Promise(async (resolve) => {
    try {
      // Convert Web API Request to Node.js stream for multer
      const nodeReq = Object.assign(Readable.fromWeb(req.body), {
        headers: Object.fromEntries(req.headers),
        method: req.method,
        url: req.url || "",
      });

      // Dummy response for multer
      const dummyRes = {
        statusCode: 200,
        headers: {},
        setHeader: () => {},
        getHeader: () => {},
        end: () => {},
      };

      // Use multer to handle file upload
      upload.single("image")(nodeReq, dummyRes, async (err) => {
        if (err) {
          console.error("Multer error:", err);
          return resolve(NextResponse.json({ message: "Upload error", error: err.message }, { status: 400 }));
        }

        try {
          const { title, content, tags, existingImage } = nodeReq.body || {};

          if (!title || !content) {
            return resolve(NextResponse.json({ message: "Title and content required" }, { status: 400 }));
          }

          const tagArray = tags?.split(",").map((t) => t.trim()) || [];

          // const imageUrl = nodeReq.file
          //   ? `${nodeReq.headers.origin}/uploads/${nodeReq.file.filename}`
          //   : existingImage || "";
          const imageUrl = nodeReq.file
              ? nodeReq.file.path  // ✅ this is Cloudinary's public URL
              : existingImage || "";


          const newBlog = new Blog({
            title,
            content,
            tags: tagArray,
            image: imageUrl,
            author: user.username,
          });

          await newBlog.save();
          resolve(NextResponse.json(newBlog, { status: 201 }));
        } catch (err) {
          console.error("Error saving blog:", err);
          resolve(NextResponse.json({ message: "Error creating blog", error: err.message }, { status: 500 }));
        }
      });
    } catch (err) {
      console.error("Outer error:", err);
      return resolve(NextResponse.json({ message: "Internal server error", error: err.message }, { status: 500 }));
    }
  });
}
