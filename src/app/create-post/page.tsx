"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import readingTime from "reading-time";
import { motion } from "framer-motion";

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags?: string[];
  image?: string;
  comments?: { author: string; text: string; date: string }[];
}

export default function CreatePostPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data.reverse()))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <motion.div
        className="border border-gray-300 p-4 rounded-lg cursor-pointer text-gray-500"
        onClick={() => router.push("/new-post")}
        whileHover={{ scale: 1.02 }}
      >
        <p className="italic text-blue-500">What's on your mind?</p>
      </motion.div>

      <div className="space-y-12 mt-8">
        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <h2 className="text-3xl font-serif font-semibold text-gray-900 hover:text-indigo-600 transition duration-300">
              {blog.title}
            </h2>
            <p className="text-sm text-gray-500 mt-2 italic">
              {moment(blog.createdAt).format("LL")} •{" "}
              {readingTime(blog.content).text} read
            </p>
            {Array.isArray(blog.tags) && blog.tags.length > 0 && (
  <div className="mt-2">
    {blog.tags.map((tag, i) => (
      <span
        key={i}
        className="text-xs mr-3 font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full"
      >
        #{tag}
      </span>
    ))}
  </div>
)}

            {blog.image && (
              <img
                src={blog.image}
                alt="Post cover"
                className="my-4 w-full max-h-[400px] object-cover rounded-md"
              />
            )}
            <div
              className="prose prose-sm text-gray-800 max-w-none line-clamp-5"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <div className="mt-6 flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-700">{blog.author}</p>
                <p className="text-xs text-gray-400">
                  {moment(blog.createdAt).fromNow()}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
              <div className="flex space-x-6">
                <Link
                  href={`/blog/${blog._id}#comments`}
                  className="hover:text-indigo-600"
                >
                  {blog.comments?.length || 0} Comments
                </Link>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${window.location.origin}/blog/${blog._id}`
                    )
                  }
                  className="hover:text-indigo-600"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
