// src/app/api/ai/correct/route.js
import axios from "axios";

export async function POST(req) {
  const { text } = await req.json();

  try {
    const response = await axios.post("http://localhost:8001/correct", { text });
    return Response.json({ corrected: response.data.corrected });
  } catch (error) {
    console.error("AI Service Error:", error.message);
    return Response.json({ error: "AI service unavailable" }, { status: 500 });
  }
}
