// src/app/api/ai/spellcheck/route.js
import axios from "axios";

export async function POST(req) {
  const { word } = await req.json();

  try {
    const response = await axios.post("http://localhost:8001/spellcheck", { word });
    return Response.json({ suggestions: response.data.suggestions });
  } catch (error) {
    console.error("Spellcheck Error:", error.message);
    return Response.json({ error: "Spellcheck failed" }, { status: 500 });
  }
}
