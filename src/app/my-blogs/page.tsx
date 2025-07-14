"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "../dashboard/mainNav";

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

const Page = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("No token found in localStorage");
          return;
        }

        const res = await axios.get("/api/blogs/myblogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(res.data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) setBlogs(blogs.filter((b) => b._id !== id));
      else {
        const errorData = await res.json();
        console.error("Delete failed:", errorData.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (blog: Blog) => {
    router.push(`/new-post?id=${blog._id}`);
  };

  return (
    <div className="bg-gradient-to-r from-orange-200 via-pink-100 to-yellow-200 bg-[length:200%_200%] animate-gradient-x min-h-screen">
      <Navbar />

      <div className="pt-20 max-w-4xl mx-auto">
        <div className="min-h-screen py-10 px-4">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800 drop-shadow-md">
            ✍️ My Blogs
          </h2>

          <div className="max-w-6xl mx-auto space-y-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="relative bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md border border-white/30 hover:shadow-xl transition-transform duration-200"
              >
                {/* Icons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <Pencil
                    className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => handleEdit(blog)}
                  />
                  <Trash2
                    className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDelete(blog._id)}
                  />
                </div>

                {/* Blog Info */}
                <h3
                  className="text-xl font-bold text-gray-800 truncate mb-2 cursor-pointer"
                  onClick={() => setSelectedBlog(blog)}
                >
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">{blog.content}</p>
                <div className="text-xs text-gray-400 mt-1">
                  ⏰ {format(blog.createdAt)}
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {selectedBlog && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
              <div className="bg-white p-6 rounded-2xl max-w-2xl w-full relative shadow-2xl border border-gray-200">
                <button
                  className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl"
                  onClick={() => setSelectedBlog(null)}
                >
                  &times;
                </button>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {selectedBlog.title}
                </h2>
                <div className="text-gray-700 whitespace-pre-wrap mb-6 leading-relaxed">
                  {selectedBlog.content}
                </div>
                <div className="text-sm text-gray-500">
                  🏷️ {selectedBlog.category} • {format(selectedBlog.createdAt)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;