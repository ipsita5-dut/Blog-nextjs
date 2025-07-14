"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


const BlogPost = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("Title & Content required!");

    const blogData = { title, content, author: "USER_ID_HERE" };

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (res.ok) {
        alert("Blog posted successfully!");
        setTitle("");
        setContent("");
      } else {
        alert("Failed to post blog");
        router.push("/login");   // eta add korechi
      }
    } catch (error) {
      console.error("Error posting blog:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full border p-2 mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 h-40"
          placeholder="Write your blog here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="mt-3 bg-blue-500 text-white p-2 rounded" type="submit">
          Post Blog
        </button>
      </form>
    </div>
  );
};

export default BlogPost;
