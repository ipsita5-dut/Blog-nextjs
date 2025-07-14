"use client";
import React, { useState, useEffect } from "react";

interface CommentFormProps {
  initialText?: string;
  label: string; // e.g., "Update", "Reply"
  onSubmit: (text: string) => void;
  onCancel: () => void;
    onEditSubmit: (commentId: string, updatedText: string) => void;

}

const CommentForm: React.FC<CommentFormProps> = ({
  initialText = "",
  label,
  onSubmit,
  onCancel,
  onEditSubmit,
}) => {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText); // Reset when switching between edit/reply
  }, [initialText]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (text.trim()) {
          onSubmit(text.trim());
          setText("");
        }
      }}
      className="flex flex-col space-y-2"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Write your message..."
        className="resize-none rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
            className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          {label}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
