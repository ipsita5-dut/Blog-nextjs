// /src/app/api/ai/correct/route.js
export const dynamic = "force-dynamic"; // for Vercel

export async function POST(req) {
  try {
    const { text } = await req.json();

    const aiResponse = await fetch("https://blog-ai-production.up.railway.app/api/correct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!aiResponse.ok) {
      throw new Error("AI correction API failed");
    }

    const data = await aiResponse.json();
    return Response.json({ corrected: data.corrected });
  } catch (error) {
    console.error("AI Correct Route Error:", error.message);
    return new Response(JSON.stringify({ error: "AI service unavailable" }), {
      status: 500,
    });
  }
}
