// app/new-post/page.tsx
"use client";
import { Suspense } from "react";
import PostEditorPage from "@/components/PostEditorPage";

export default function NewPost() {
  return (
    <Suspense fallback={<p className="text-center mt-12">Loading Editor...</p>}>
      <PostEditorPage />
    </Suspense>
  );
}
