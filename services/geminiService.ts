import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const apiKey = process.env.API_KEY || ''; // In a real app, ensure this is set securely.

// A singleton to reuse the client
let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient && apiKey) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const getCookieRecommendation = async (userPreference: string, availableProducts: Product[]) => {
  const client = getClient();
  if (!client) {
    console.warn("Gemini API Key missing");
    // Fallback or error handling
    return null;
  }

  const productListString = availableProducts
    .map(p => `ID: ${p.id}, Name: ${p.name}, Description: ${p.description}, Flavor Profile: ${p.ingredients.join(', ')}`)
    .join('\n');

  try {
    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        You are an expert Baker and Sommelier at 'Origene Bakery'.
        User Preference: "${userPreference}"
        
        Available Cookies:
        ${productListString}
        
        Task: Select the single best matching cookie from the list above for the user.
        Return a short, warm, and appetizing reason why this cookie is perfect for them.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedProductId: { type: Type.STRING },
            reason: { type: Type.STRING },
          },
          required: ["recommendedProductId", "reason"]
        }
      }
    });

    if (response.text) {
        return JSON.parse(response.text);
    }
    return null;

  } catch (error) {
    console.error("Gemini recommendation failed:", error);
    return null;
  }
};
