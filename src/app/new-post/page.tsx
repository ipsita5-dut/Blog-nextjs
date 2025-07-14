// At the top of your file
"use client";
import { Suspense } from "react";
import PostEditorPage from "../components/PostEditorPage"; // assuming the full component you showed is in PostEditorPage

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-12">Loading Editor...</div>}>
      <PostEditorPage />
    </Suspense>
  );
}
