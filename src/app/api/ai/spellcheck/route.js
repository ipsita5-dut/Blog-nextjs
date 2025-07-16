// /src/app/api/ai/spellcheck/route.js
export const dynamic = "force-dynamic"; // for Vercel

export async function POST(req) {
  try {
    const { word } = await req.json();

    const aiResponse = await fetch("https://blog-ai-production.up.railway.app/api/spellcheck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word }),
    });

    if (!aiResponse.ok) {
      throw new Error("Spellcheck API failed");
    }

    const data = await aiResponse.json();
    return Response.json({ suggestions: data.suggestions });
  } catch (error) {
    console.error("AI Spellcheck Route Error:", error.message);
    return new Response(JSON.stringify({ error: "Spellcheck failed" }), {
      status: 500,
    });
  }
}
