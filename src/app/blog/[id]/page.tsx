export const dynamic = 'force-dynamic';

import { notFound } from "next/navigation";
import moment from "moment";
import readingTime from "reading-time";
import CommentForm from "../../dashboard/commentForm";

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

// ✅ THIS is the correct format Next.js App Router expects
export default async function BlogPage({
  params,
}: {
  params: { id: string };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  const res = await fetch(`${baseUrl}/api/blogs/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const blog: Blog = await res.json();
  const stats = readingTime(blog.content);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 italic mb-4">
        By {blog.author} • {moment(blog.createdAt).format("LL")} • {stats.text} read
      </p>

      {blog.tags?.length > 0 && (
        <div className="mb-4">
          {blog.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs mr-2 font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full"
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
          className="mb-6 w-full max-h-[500px] object-cover rounded"
        />
      )}

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-2">Comments</h2>
        {blog.comments?.length ? (
          blog.comments.map((comment, idx) => (
            <div key={idx} className="mb-4 border-b pb-2">
              <p className="font-medium">{comment.author}</p>
              <p className="text-sm text-gray-600">
                {moment(comment.date).fromNow()}
              </p>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
