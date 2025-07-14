
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import moment from "moment";
import readingTime from "reading-time";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CommentModal from "./commentForm"; // Adjust path as needed
import { useSearch } from "../context/SearchContext";

interface Reply {
  _id?: string;
  author: string;
  text: string;
  createdAt?: string;
    replies?: Reply[]; // ✅ recursive nesting

}

interface Comment {
  _id?: string;
  author: string;
  text: string;
  date: string;
  replies?: Reply[];
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags?: string[];
  image?: string;
  comments?: Comment[];
}

export default function CreatePost() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [selectedPost, setSelectedPost] = useState<Blog | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const { searchQuery } = useSearch();
  const router = useRouter();

  const fetchBlogs = () => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data.reverse()))
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setIsAuthenticated(true);
        setUsername(payload.username); // Assuming token contains `username`
      } catch (error) {
        console.error("Invalid token format", error);
      }
    }
  }, []);


  // In CreatePost component:

// Handle editing a comment
const handleEditSubmit = async (commentId: string, newText: string) => {
  if (!selectedPost) return;

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to edit comments.");
    return;
  }

  try {
    const res = await fetch(`/api/blogs/${selectedPost._id}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: newText }),
    });

    if (res.ok) {
      setBlogs((prev) =>
        prev.map((blog) =>
          blog._id === selectedPost._id
            ? {
                ...blog,
                comments: blog.comments?.map((c) =>
                  c._id === commentId ? { ...c, text: newText } : c
                ),
              }
            : blog
        )
      );

      setSelectedPost((prev) =>
        prev
          ? {
              ...prev,
              comments: prev.comments?.map((c) =>
                c._id === commentId ? { ...c, text: newText } : c
              ),
            }
          : null
      );
    } else {
      alert("Failed to update comment.");
    }
  } catch (error) {
    console.error("Error updating comment:", error);
    alert("An error occurred while updating your comment.");
  }
};

// Handle replying to a comment
const handleReplySubmit = async (parentCommentId: string, replyText: string) => {
  if (!selectedPost) return;

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to reply.");
    return;
  }

  try {
    const res = await fetch(`/api/blogs/${selectedPost._id}/comments/${parentCommentId}/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: replyText }),
    });

    if (res.ok) {
      const newReply = { author: "You", text: replyText, createdAt: new Date().toISOString() };

      setBlogs((prev) =>
        prev.map((blog) =>
          blog._id === selectedPost._id
            ? {
                ...blog,
                comments: blog.comments?.map((comment) =>
                  comment._id === parentCommentId
                    ? { ...comment, replies: [...(comment.replies || []), newReply] }
                    : comment
                ),
              }
            : blog
        )
      );

      setSelectedPost((prev) =>
        prev
          ? {
              ...prev,
              comments: prev.comments?.map((comment) =>
                comment._id === parentCommentId
                  ? { ...comment, replies: [...(comment.replies || []), newReply] }
                  : comment
              ),
            }
          : null
      );
    } else {
      alert("Failed to post reply.");
    }
  } catch (error) {
    console.error("Error posting reply:", error);
    alert("An error occurred while posting your reply.");
  }
};

  const handleCommentChange = (value: string) => {
    if (!selectedPost) return;
    setCommentInputs((prev) => ({ ...prev, [selectedPost._id]: value }));
  };

  const handleCommentSubmit = async () => {
    if (!selectedPost) return;
    const commentText = commentInputs[selectedPost._id]?.trim();
    if (!commentText) return alert("Comment cannot be empty.");

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to comment.");
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${selectedPost._id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: commentText }),
      });

      if (res.ok) {
        setBlogs((prev) =>
          prev.map((blog) =>
            blog._id === selectedPost._id
              ? {
                  ...blog,
                  comments: [
                    ...(blog.comments || []),
                    { author: "You", text: commentText, date: new Date().toISOString() },
                  ],
                }
              : blog
          )
        );
        setCommentInputs((prev) => ({ ...prev, [selectedPost._id]: "" }));
        setSelectedPost((prev) =>
          prev
            ? {
                ...prev,
                comments: [
                  ...(prev.comments || []),
                  { author: "You", text: commentText, date: new Date().toISOString() },
                ],
              }
            : null
        );
      } else {
        alert("Failed to post comment.");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("An error occurred while posting your comment.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete posts.");
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Post deleted successfully.");
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      } else {
        alert("Failed to delete post.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the post.");
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="space-y-12 mt-8">
        {filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-400 italic">No blogs found.</p>
        ) : (
          filteredBlogs.map((blog) => {
            const stats = readingTime(blog.content);
            const wordCount = stats.words;

            return (
              <motion.div
                key={blog._id}
                className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h2 className="text-3xl font-serif font-semibold text-gray-900 hover:text-indigo-600 transition duration-300">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2 italic">
                  {moment(blog.createdAt).format("LL")} • {stats.text} read
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

                {wordCount > 60 && (
                  <div className="mt-4">
                    <Link
                      href={`/blog/${blog._id}`}
                      className="inline-block text-sm text-blue-600 hover:underline font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                )}

                <div className="mt-6 flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{blog.author}</p>
                    <p className="text-xs text-gray-400">{moment(blog.createdAt).fromNow()}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
                  <div className="flex space-x-6">
                    <button
                      onClick={() => setSelectedPost(blog)}
                      className="hover:text-indigo-600 cursor-pointer bg-transparent border-none p-0 text-sm"
                    >
                      {blog.comments?.length || 0} Comments
                    </button>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(`${window.location.origin}/blog/${blog._id}`)
                      }
                      className="hover:text-indigo-600"
                    >
                      Copy Link
                    </button>
                  </div>

                  {isAuthenticated && username === blog.author && (
                    <div className="flex space-x-4">
                      <Link
                        href={`/new-post?id=${blog._id}`}
                        className="px-4 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="px-4 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Comment Modal */}
      <CommentModal
        isOpen={!!selectedPost}
  onClose={() => setSelectedPost(null)}
  selectedPost={selectedPost}
  commentText={selectedPost ? commentInputs[selectedPost._id] || "" : ""}
  setCommentText={handleCommentChange}
  onSubmit={handleCommentSubmit}
  onEditSubmit={handleEditSubmit}      // <-- here
  onReplySubmit={handleReplySubmit}    // <-- and herecom

      />
    </>
  );
}
