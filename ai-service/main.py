from fastapi import FastAPI
from pydantic import BaseModel
from transformers import GPT2LMHeadModel, GPT2Tokenizer, pipeline
import torch
import uvicorn
import traceback
import google.generativeai as genai
import os

# Configure Gemini API Key (Replace with your actual key or use env variable)
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

# Load GPT2 Final Model
save_directory = os.path.join(os.path.dirname(__file__), "final-model")
model = GPT2LMHeadModel.from_pretrained(save_directory, local_files_only=True)
tokenizer = GPT2Tokenizer.from_pretrained(save_directory, local_files_only=True)
tokenizer.pad_token = tokenizer.eos_token

# Setup device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()

# Optional: Setup expansion pipeline (if needed)
expansion_generator = pipeline(
    "text-generation", model="gpt2-medium", device=0 if torch.cuda.is_available() else -1
)

# Define Request Schema
class BlogRequest(BaseModel):
    topic: str
    tone: str

# Gemini: Validate or Rewrite based on topic relevance
def validate_with_gemini(topic: str, tone: str, gpt2_text: str) -> str:
    prompt = f"""
You are an expert blog editor and writer.

Topic: "{topic}"
Tone: {tone}

Step 1: Read the article below.
Step 2: If it's relevant to the topic and coherent:
         — Polish grammar, vocabulary, structure, headings, and readability.
         — Output only the improved blog.
       If it's irrelevant:
         — If it is irrelevant or poor, generate a new high-quality blog using the same topic and tone.

--- BLOG CONTENT START ---
{gpt2_text}
--- BLOG CONTENT END ---

Write the final post in clear, well‑structured paragraphs with headings where appropriate.
"""
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print("Gemini Error:", str(e))
        return gpt2_text.strip()  # Fallback to original GPT2 output if Gemini fails

# Main Route
@app.post("/api/ghostwriter/generate")
def generate_blog(req: BlogRequest):
    try:
        # Step 1: Generate base content using GPT-2
        prompt = f"{req.tone} {req.topic}"
        encoding = tokenizer.encode_plus(prompt, return_tensors="pt", padding=True, truncation=True)
        inputs = encoding['input_ids'].to(device)
        attention_mask = encoding['attention_mask'].to(device)

        with torch.no_grad():
            outputs = model.generate(
                inputs,
                max_length=350,
                num_beams=5,
                no_repeat_ngram_size=2,
                early_stopping=True,
                pad_token_id=tokenizer.pad_token_id,
                attention_mask=attention_mask
            )

        gpt2_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

        # Step 2: Expand (optional) — You can comment out if not needed
        expanded = expansion_generator(
            gpt2_text,
            max_length=600,
            temperature=0.85,
            top_k=50,
            top_p=0.95,
            do_sample=True
        )
        expanded_text = expanded[0]['generated_text']

        # Step 3: Final polish and validation with Gemini
        final_blog = validate_with_gemini(req.topic, req.tone, expanded_text)

        return {"generated_text": final_blog}

    except Exception as e:
        print("❗ API ERROR:", str(e))
        traceback.print_exc()
        return {"error": str(e)}

# Run locally
import os
port = int(os.environ.get("PORT", 8000))
uvicorn.run("main:app", host="0.0.0.0", port=port)


# from fastapi import FastAPI
# from pydantic import BaseModel
# from transformers import GPT2LMHeadModel, GPT2Tokenizer, pipeline
# import torch
# import uvicorn

# app = FastAPI()

# save_directory = r'C:\Users\ipsit\OneDrive\Desktop\SOCIAL_BLOG\ai-service\final-model'
# model = GPT2LMHeadModel.from_pretrained(save_directory,local_files_only=True)
# tokenizer = GPT2Tokenizer.from_pretrained(save_directory,local_files_only=True)
# tokenizer.pad_token = tokenizer.eos_token
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# model.to(device)
# model.eval()

# expansion_generator = pipeline("text-generation", model="gpt2-medium", device=0 if torch.cuda.is_available() else -1)

# class BlogRequest(BaseModel):
#     topic: str
#     tone: str

# @app.post("/api/ghostwriter/generate")
# def generate_blog(req: BlogRequest):
#     try:
#         # Generate base blog
#         prompt = f"{req.tone} {req.topic}"
#         encoding = tokenizer.encode_plus(prompt, return_tensors="pt", padding=True, truncation=True)
#         inputs = encoding['input_ids'].to(device)
#         attention_mask = encoding['attention_mask'].to(device)

#         with torch.no_grad():
#             outputs = model.generate(
#                 inputs,
#                 max_length=350,
#                 num_beams=5,
#                 no_repeat_ngram_size=2,
#                 early_stopping=False,
#                 pad_token_id=tokenizer.pad_token_id,
#                 attention_mask=attention_mask
#             )

#         base_blog = tokenizer.decode(outputs[0], skip_special_tokens=True)

#         # Expand the blog
#         expanded_result = expansion_generator(
#             base_blog,
#             max_length=600,
#             temperature=0.85,
#             top_k=50,
#             top_p=0.95,
#             do_sample=True
#         )

#         expanded_blog = expanded_result[0]['generated_text']
#         return {"generated_text": expanded_blog.strip()}
    
#     except Exception as e:
#         print("❗ ERROR in API:", str(e))
#         traceback.print_exc()
#         return {"error": str(e)}


# if __name__ == "__main__":
#     uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)


# from fastapi import FastAPI
# from pydantic import BaseModel
# from transformers import GPT2LMHeadModel, GPT2Tokenizer
# import torch
# from fastapi.middleware.cors import CORSMiddleware
# import uvicorn

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Replace with your frontend URL in prod
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# model_path = "./gpt2-final-model"
# model = GPT2LMHeadModel.from_pretrained(model_path)
# tokenizer = GPT2Tokenizer.from_pretrained(model_path)

# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# model.to(device)
# model.eval()

# class GenerateRequest(BaseModel):
#     topic: str
#     tone: str

# @app.post("/api/ghostwriter/generate")
# async def generate_blog(req: GenerateRequest):
#     prompt = f"Write a {req.tone} blog about {req.topic}. Make sure it is at least 10 lines long and meaningful."
#     inputs = tokenizer.encode(prompt, return_tensors="pt").to(device)

#     with torch.no_grad():
#         outputs = model.generate(
#             inputs,
#             max_length=500,
#             num_beams=5,
#             no_repeat_ngram_size=2,
#             early_stopping=True,
#             pad_token_id=tokenizer.eos_token_id
#         )

#     generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
#     content = generated_text.split("<|content|>")[-1].strip()

#     return {
#         "topic": req.topic,
#         "tone": req.tone,
#         "generated_text": content
#     }

# if __name__ == "__main__":
#     uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
