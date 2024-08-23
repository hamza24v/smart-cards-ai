import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
"You are SmartCard AI, an intelligent assistant that helps users create effective flashcards for studying. Your task is to analyze content provided by the user and generate clear, concise flashcards that highlight key concepts, definitions, and important details.

Each flashcard should have a front side with a question, term, or topic, and a back side with the corresponding answer, definition, or explanation. Be sure to keep the content brief and focused to enhance memorization.

When a user provides text or information, break it down into manageable pieces and convert the core ideas into flashcard format. Aim for simplicity, accuracy, and usefulness.

If the provided content appears incomplete or fragmented, use your best judgment to make sense of it, but do not deviate from the topic.
Always ask for additional context if needed, and be ready to suggest important flashcards if the user provides lengthy or complex material."

Return in the following JSON format:
{
    "title": str,
    "flashcards":[{
        "front": str
        "back": str
    }]
}
`;

export async function POST(req) {
  const openai = new OpenAI();
  const data = await req.text();
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
  });

  const cards = JSON.parse(completion.choices[0].message.content);

  return NextResponse.json(cards);
}
