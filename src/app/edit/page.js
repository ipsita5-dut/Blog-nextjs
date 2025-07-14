"use client";

import { Suspense } from "react";
import TipTapEditor from "../dashboard/TipTapEditor";

export const dynamic = "force-dynamic"; // still needed

export default function EditPage() {
  return (
    <Suspense fallback={<div className="text-center mt-12">Loading editor...</div>}>
      <TipTapEditor />
    </Suspense>
  );
}
