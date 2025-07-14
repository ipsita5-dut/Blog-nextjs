export const dynamic = 'force-dynamic';

import { notFound } from "next/navigation";
import readingTime from "reading-time";

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

interface PageProps {
  params: {
    id: string; // Ensure this is correctly defined
  };
}

export default async function BlogPage({ params }: PageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  console.log("Fetching blog with ID:", params.id); // Debugging log

  const res = await fetch(`${baseUrl}/api/blogs/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch blog:", res.statusText);
    return notFound();
  }

  let blog: Blog;

  try {
    blog = await res.json();
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return notFound();
  }

  const stats = readingTime(blog.content);

  // ... rest of your JSX
}
