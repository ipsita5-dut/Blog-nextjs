// src/app/api/ai/generate/route.js
import axios from "axios";

export async function POST(req) {
  const { topic, tone } = await req.json();

  if (!topic || !tone) {
    return Response.json({ error: "Topic and tone are required" }, { status: 400 });
  }

  try {
    const response = await axios.post("https://blog-nextjs-production-4138.up.railway.app/api/ghostwriter/generate", {
      topic,
      tone,
    });

    const generated = response.data.generated_text;

    if (generated) {
      return Response.json({ generated_text: generated });
    } else {
      return Response.json({ error: "No generated text returned from AI backend." }, { status: 500 });
    }
  } catch (error) {
    console.error("AI generation error:", error.message);
    return Response.json({ error: "AI generation failed" }, { status: 500 });
  }
}
