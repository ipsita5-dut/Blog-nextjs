"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import { Button } from "@/components/ui/button";

interface TipTapEditorProps {
  clearTrigger?: boolean;
  onClearHandled?: () => void;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({clearTrigger,onClearHandled}) => {
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      Bold,
      Italic,
      Underline,
      Strike,
      Image,
      Link,
      Heading,
      Placeholder.configure({
        placeholder: "Start writing your blog...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const updatedContent = editor.getHTML();
      setContent(updatedContent);
      setCharCount(editor.getText().length);
    },
  });

  useEffect(() => {
    if (clearTrigger && editor) {
      setTitle("");
      setTags("");
      editor.commands.clearContent();  // Clear editor content
      setContent("");
      setCharCount(0);
      if (onClearHandled) onClearHandled(); // Tell parent it's done
    }
  }, [clearTrigger, editor]);

  // Auto-save draft every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const htmlContent = editor?.getHTML();
      if (htmlContent) {
        localStorage.setItem("draftContent", htmlContent);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [editor]);

  // Load draft content only if not editing a blog
  useEffect(() => {
    const savedContent = localStorage.getItem("draftContent");
    if (savedContent && editor && !blogId) {
      editor.commands.setContent(savedContent);
      setContent(savedContent);
    }
  }, [editor, blogId, setContent]);

  // Fetch existing blog when editing
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!blogId) return;
        const res = await axios.get(`/api/blogs/${blogId}`);
        const blog = res.data;
        setTitle(blog.title);
        setTags(blog.tags?.join(", ") || "");
        setContent(blog.content);
        if (editor) {
          editor.commands.setContent(blog.content);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    fetchBlog();
  }, [blogId, editor, setContent]);

  const handleCancel = () => {
    router.back();
  };

  const handlePost = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/blogs",
        { title, content, tags },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Blog posted successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Error posting blog:", err);
      alert("Post failed");
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/blogs/${blogId}`,
        { title, content, tags },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Blog updated successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Update failed");
    }
  };

  return (
    <div className="rounded-xl border bg-gray-50 p-4 shadow-inner min-h-[200px] max-h-[600px] overflow-y-auto focus-within:ring-2 focus-within:ring-indigo-300 transition">
      {/* Title Input */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-3xl font-light w-full outline-none border-b-2 border-sky-900 mb-4 pb-1"
      />

      {/* Tags Input */}
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="text-base w-full outline-none border-b border-gray-400 mb-6 pb-1"
      />

      <div className="flex justify-between items-center mb-4">
        {/* Toolbar */}
        <div className="flex gap-3">
          <Button onClick={() => editor?.chain().focus().toggleBold().run()}>B</Button>
          <Button onClick={() => editor?.chain().focus().toggleItalic().run()}>I</Button>
          <Button onClick={() => editor?.chain().focus().toggleUnderline().run()}>U</Button>
          <Button onClick={() => editor?.chain().focus().toggleStrike().run()}>S</Button>
          <Button onClick={() => editor?.chain().focus().setTextAlign("left").run()}>Left</Button>
          <Button onClick={() => editor?.chain().focus().setTextAlign("center").run()}>Center</Button>
          <Button onClick={() => editor?.chain().focus().setTextAlign("right").run()}>Right</Button>
        </div>

        <span className="text-sm text-gray-500">{charCount} characters</span>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="prose prose-lg max-w-full text-gray-800 focus:outline-none" />

      {/* Insert Image */}
      <div className="my-4">
        <Button
          onClick={() => {
            const url = prompt("Enter image URL");
            if (url) {
              editor?.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          Insert Image
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        {!blogId ? (
          <Button onClick={handlePost} className="bg-green-600 text-white hover:bg-green-700">
            Post
          </Button>
        ) : (
          <Button onClick={handleUpdate} className="bg-sky-600 text-white hover:bg-sky-700">
            Update
          </Button>
        )}
      </div>
    </div>
  );
};

export default TipTapEditor;

