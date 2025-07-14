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

type Props = {
  params: {
    id: string;
  };
};

export default async function BlogPage({ params }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const res = await fetch(`${baseUrl}/api/blogs/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const blog: Blog = await res.json();
  const stats = readingTime(blog.content);

  // ... rest of your JSX
}
