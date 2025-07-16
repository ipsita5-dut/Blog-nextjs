"use client";
import { useState, useEffect ,useRef} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export default function PostEditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("informative");
  const [aiLoading, setAiLoading] = useState(false);
  const [popupInstance, setPopupInstance] = useState<any>(null);

    const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const splitTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    setTags(splitTags);
  }, [tagsInput]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Start writing your blog..." }),
    ],
    content: "",
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!postId) return;
    if (!editor || !editor.isEditable) return;

    setLoading(true);

    fetch(`/api/blogs/${postId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load post");
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setTagsInput(data.tags?.join(", ") || "");
        setExistingImageUrl(data.image || null);

        setTimeout(() => {
          editor.commands.setContent(data.content || "");
        }, 0);
      })
      .catch((err) => {
        console.error(err);
        alert("Error loading post");
      })
      .finally(() => setLoading(false));
  }, [postId, editor]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      setExistingImageUrl(null);
    } else {
      setImagePreview(null);
    }
  };


  const handleSubmit = async () => {
    const content = editor?.getHTML();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username") || "anonymous";

    if (!token) {
      alert("User  not authenticated. Please log in.");
      router.push("/login");
      return;
    }
    if (!title.trim() || !content?.trim()) {
      alert("Please add title and content");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", username);
    formData.append("tags", tags.join(","));
    if (image) formData.append("image", image);
    else if (existingImageUrl) formData.append("existingImage", existingImageUrl);

    try {
      const res = await fetch(
        postId
          ? `/api/blogs/${postId}`
          : "/api/blogs",
        {
          method: postId ? "PUT" : "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to save post");

      alert(postId ? "Post updated!" : "Post created!");
      router.push("/dashboard");
    } catch (err) {
      alert("Error saving post");
      console.error(err);
    }
  };

// --- Utility: Map plain text offset to ProseMirror position ---
function textOffsetToPos(doc: any, offset: number): number {
  let pos = 0;
  let counted = 0;
  let found = false;
  doc.descendants((node: any, posHere: number) => {
    if (node.isText) {
      const len = node.text.length;
      if (counted + len >= offset) {
        pos = posHere + (offset - counted);
        found = true;
        return false;
      }
      counted += len;
    }
    return true;
  });
  return found ? pos : doc.content.size;
}

// --- Utility: Get word at cursor and its start/end positions in plain text ---
function getWordAtPos(docText: string, pos: number) {
  let start = pos, end = pos;
  while (start > 0 && /\w/.test(docText[start - 1])) start--;
  while (end < docText.length && /\w/.test(docText[end])) end++;
  const word = docText.slice(start, end);
  return word ? { word, start, end } : null;
}

// --- Utility: Replace word in editor at given start/end (plain text indices) with newWord ---
function replaceWordAtPos(editor: any, start: number, end: number, newWord: string) {
  if (!editor) return;
  const doc = editor.state.doc;
  const from = textOffsetToPos(doc, start);
  const to = textOffsetToPos(doc, end);
  editor.chain().focus().deleteRange({ from, to }).insertContentAt(from, newWord + " ").run();
}

// --- Main effect: attach click handler for spelling suggestions ---
useEffect(() => {
  if (!editor) return;

  const handleClick = async (event: MouseEvent) => {
    const posObj = editor.view.posAtCoords({ left: event.clientX, top: event.clientY });
    if (!posObj?.pos) return;

    const pos = posObj.pos;
    const docText = editor.state.doc.textBetween(0, editor.state.doc.content.size, " ", "\n");
    const wordInfo = getWordAtPos(docText, pos - 1);
    if (!wordInfo) return;
    const { word, start, end } = wordInfo;

    // Only check spelling for non-empty, non-numeric words
    if (!word || /^\d+$/.test(word)) return;

    

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_AI_API_URL}/api/ai/spellcheck`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word }),
      });

      if (!res.ok) throw new Error("Spellcheck failed");
      const data = await res.json();
      const suggestions = data?.suggestions || [];
      if (!Array.isArray(suggestions)) return;

      if (suggestions.length > 0) {
        if (popupInstance) popupInstance.destroy();

        const domAtPos = editor.view.domAtPos(pos);
        const targetEl = domAtPos.node.nodeType === 3
          ? domAtPos.node.parentElement
          : domAtPos.node as HTMLElement;

        if (!targetEl) return;

        const newPopup = tippy(targetEl, {
          content: (() => {
            const container = document.createElement("div");
            container.style.padding = "0";
            container.style.margin = "0";
            container.style.background = "black";
            container.style.border = "1px solid #ccc";
            container.style.borderRadius = "8px";
            container.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
            container.style.fontSize = "1rem";
            container.innerHTML = `<div style="font-weight:bold;padding:4px 8px;">Suggestions:</div>`;
            const ul = document.createElement("ul");
            ul.style.listStyle = "none";
            ul.style.padding = "0";
            ul.style.margin = "0";
            suggestions.forEach((sugg: string) => {
              const li = document.createElement("li");
              li.textContent = sugg;
              li.style.cursor = "pointer";
              li.style.padding = "4px 12px";
              li.style.borderBottom = "1px solid #eee";
              li.onmouseenter = () => (li.style.background = "#f0f0f0");
              li.onmouseleave = () => (li.style.background = "transparent");
              li.onclick = () => {
                replaceWordAtPos(editor, start, end, sugg);
                if (newPopup) newPopup.destroy();
              };
              ul.appendChild(li);
            });
            container.appendChild(ul);
            return container;
          })(),
          interactive: true,
          trigger: "manual",
          placement: "top",
          appendTo: () => document.body,
        });

        newPopup.show();
        setPopupInstance(newPopup);
      }
    } catch (error) {
      if (popupInstance) popupInstance.destroy();
      alert("No spelling suggestions available for this word. Please check your input.");
        setPopupInstance(null);

    }
  };

  

  editor.view.dom.addEventListener("click", handleClick);

  return () => {
    editor.view.dom.removeEventListener("click", handleClick);
    if (popupInstance) popupInstance.destroy();
  };
}, [editor, popupInstance, setPopupInstance]);

//CORRECTLY WORKING AI FUNCTION
  const handleGrammarCorrection = async () => {
  if (!editor) return;

  const rawText = editor.getText(); // Extract plain text from editor
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AI_API_URL}/api/ai/correct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: rawText }),
    });

    if (!response.ok) throw new Error("Failed to correct grammar");

    const data = await response.json();
    const correctedText = data.corrected;

    // Replace editor content with corrected version
    editor.commands.setContent(correctedText);
  } catch (err) {
    console.error(err);
    alert("Grammar correction failed.");
  }
};
const typeTextInEditor = async (text: string, editor: any, delay = 30) => {
  if (!editor) return;

  editor.commands.setContent(""); // Clear current content
  for (let i = 0; i < text.length; i++) {
    if (!editor || !editor.isEditable) return;
    editor.commands.insertContent(text[i]);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};

const handleGenerate = async () => {
  if (!title.trim()) {
    alert("Please enter a title");
    return;
  }
  setAiLoading(true);

  // Abort previous request if needed
  if (abortControllerRef.current) {
    abortControllerRef.current.abort();
  }
  abortControllerRef.current = new AbortController();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_AI_API_URL}/api/ai/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: title, tone }),
      signal: abortControllerRef.current.signal,
    });

    if (!res.ok) {
      throw new Error("Failed to generate blog");
    }

    const data = await res.json();

    if (editor && data.generated_text) {
      await typeTextInEditor(data.generated_text, editor); // smooth effect
    } else {
      alert("No generated content received.");
    }
  } catch (error) {
  if (error instanceof DOMException && error.name === "AbortError") {
    console.log("Previous request aborted");
  } else {
    console.error("Blog generation failed:", error);
    alert("AI generation failed");
  }
}
 finally {
    setAiLoading(false);
  }
};

   
    if (loading) return <p className="text-center mt-12">Loading post...</p>;


  
  return (
    <main className="min-h-screen flex justify-center pt-12 px-4 bg-gradient-to-br from-blue-100 to-blue-50 font-poppins text-gray-700">
      <section className="bg-white rounded-2xl max-w-4xl w-full p-8 shadow-lg">
        <h1 className="text-center font-semibold mb-8 text-3xl text-blue-800">
          {postId ? "Edit Your Blog Post" : "Write Your Blog Post"}
        </h1>

        {/* Title */}
        <label htmlFor="title" className="block font-semibold mb-2">
          Post Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 mb-6 rounded-xl border-2 border-gray-300 bg-white text-gray-900"
        />

        {/* Tags */}
        <label htmlFor="tags-input" className="block font-semibold mb-2">
          Tags (comma separated)
        </label>
        <input
          id="tags-input"
          type="text"
          placeholder="Add tags separated by commas"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          className="w-full px-4 py-3 mb-6 rounded-xl border-2 border-gray-300 bg-white text-gray-900"
          style={{ caretColor: "black" }}
        />

        {/* Tone */}
        <label htmlFor="tone-select" className="block font-semibold mb-2">
          Select Tone
        </label>
        <select
          id="tone-select"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full px-4 py-3 mb-6 rounded-xl border-2 border-gray-300 bg-white text-gray-900"
        >
          <option value="informative">Informative</option>
        <option value="emotional">Emotional</option>
        <option value="casual">Casual</option>
        <option value="inspirational">Inspirational</option>
        <option value="formal">Formal</option>
        </select>

        {/* Image */}
        <label htmlFor="photo" className="block font-semibold mb-2">
          Select Photo
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full mb-6"
        />
        {(imagePreview || existingImageUrl) && (
          <div className="relative mb-4">
            <img
              src={imagePreview || existingImageUrl!}
              alt="Preview"
              className="w-full max-h-64 object-cover rounded"
            />
            <button
              onClick={() => {
                setImage(null);
                setImagePreview(null);
                setExistingImageUrl(null);
              }}
              className="absolute top-2 right-2 bg-white rounded-full px-2 text-red-600"
              aria-label="Remove image"
            >
              ✕
            </button>
          </div>
        )}

         {/* AI Generate Button */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={aiLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold shadow-lg disabled:bg-gray-400"
          >
            {aiLoading ? "Generating..." : "Generate with AI"}
          </button>
        </div>

        {/* Editor toolbar */}
        <div className="flex gap-4 bg-gray-100 rounded-xl px-4 py-2 mb-4">
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            aria-pressed={editor?.isActive("bold")}
            className={`w-10 h-10 flex items-center justify-center rounded-lg ${
              editor?.isActive("bold") ? "text-blue-600 scale-125" : "text-gray-600"
            }`}
            title="Bold (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            aria-pressed={editor?.isActive("italic")}
            className={`w-10 h-10 flex items-center justify-center rounded-lg ${
              editor?.isActive("italic") ? "text-blue-600 scale-125" : "text-gray-600"
            }`}
            title="Italic (Ctrl+I)"
          >
            <em>I</em>
          </button>
        </div>

        <button
            type="button"
            onClick={handleGrammarCorrection}
            className="rounded-lg bg-green-500 text-white px-4 py-2"
          >
            Check Grammar
          </button>

        {/* Editor content */}
        <div className="rounded-2xl border border-gray-300 bg-gray-50 p-6 min-h-[250px] max-h-[600px] overflow-auto prose prose-lg">
          <EditorContent editor={editor} />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="rounded-xl px-6 py-3 bg-gray-300 text-gray-800 font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg"
          >
            {postId ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </section>
    </main>
  );
}
