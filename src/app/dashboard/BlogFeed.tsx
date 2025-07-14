"use client";
import React, { useState, useEffect } from "react";

interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
}

const BlogFeed: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("/api/blogs") // Fetch blogs from backend
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <div className="mt-8 bg-white p-6 shadow-lg rounded-xl max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Latest Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="border-b pb-4 mb-4">
            <h3 className="font-bold text-lg">{blog.title}</h3>
            <p className="text-gray-600">{blog.content.substring(0, 150)}...</p>
            <p className="text-sm text-gray-500">By {blog.author}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogFeed;
