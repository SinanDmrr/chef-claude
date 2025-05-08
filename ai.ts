// import {HfInference} from "@huggingface/inference"; For Mixtral KI
import Anthropic from "@anthropic-ai/sdk";
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Please ensure that the entire recipe, including the title, ingredients list, and preparation steps, is provided in German. Format your response in markdown to make it easier to render to a web page.
`;

const VITE_ANTHROPIC_API_KEY = (
  import.meta as unknown as {env: {VITE_ANTHROPIC_API_KEY?: string}}
).env.VITE_ANTHROPIC_API_KEY;

const anthropic = new Anthropic({
  apiKey: VITE_ANTHROPIC_API_KEY || "",
  dangerouslyAllowBrowser: true,
});

export async function getRecipeFromChefClaude(
  ingredientsArr: string[]
): Promise<string> {
  if (!VITE_ANTHROPIC_API_KEY) {
    throw new Error(
      "API-Schlüssel nicht gefunden. Bitte setze VITE_ANTHROPIC_API_KEY."
    );
  }

  const ingredientsString = ingredientsArr.join(", ");

  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Ich habe ${ingredientsString}. Bitte gib mir ein Rezept, das du empfehlen würdest!`,
        },
      ],
    });

    const textBlock = msg.content.find((block) => block.type === "text");

    if (!textBlock) {
      throw new Error("Keine Textantwort vom Modell erhalten.");
    }

    return textBlock.text;
  } catch (err) {
    console.error("Fehler beim Abrufen des Rezepts:", err);
    throw new Error(
      `Fehler beim Abrufen des Rezepts: ${err instanceof Error ? err.message : "Unbekannter Fehler"}`
    );
  }
}

// const VITE_HF_API_KEY = (
//   import.meta as unknown as {env: {VITE_HF_API_KEY: string | undefined}}
// ).env.VITE_HF_API_KEY;
// const hf = new HfInference(VITE_HF_API_KEY || "");

// export async function getRecipeFromMistral(
//   ingredientsArr: string[]
// ): Promise<string> {
//   if (!VITE_HF_API_KEY) {
//     throw new Error(
//       "API-Schlüssel nicht gefunden. Bitte setze VITE_HF_API_KEY in der .env-Datei."
//     );
//   }

//   const ingredientsString = ingredientsArr.join(", ");
//   try {
//     const response = await hf.chatCompletion({
//       model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
//       messages: [
//         {role: "system", content: SYSTEM_PROMPT},
//         {
//           role: "user",
//           content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
//         },
//       ],
//       max_tokens: 1024,
//     });

//     const content = response.choices[0]?.message?.content;
//     if (!content) {
//       throw new Error("Keine Rezeptantwort vom Modell erhalten.");
//     }
//     return content;
//   } catch (err) {
//     console.error("Fehler beim Abrufen des Rezepts:", err);
//     throw new Error(
//       `Fehler beim Abrufen des Rezepts: ${err instanceof Error ? err.message : "Unbekannter Fehler"}`
//     );
// }
// }
