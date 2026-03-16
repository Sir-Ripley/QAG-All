import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let ai: GoogleGenAI | null = null;
let aiInitialized = false;

const getAI = () => {
  if (!aiInitialized) {
    if (process.env.API_KEY) {
      ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    aiInitialized = true;
  }
  return ai;
};

// For testing purposes, we need a way to reset the initialization state
export const _resetAIForTesting = () => {
  ai = null;
  aiInitialized = false;
};

export const sendMessageToDrRipley = async (message: string): Promise<string> => {
  const client = getAI();

  if (!client) {
    return "Dr. Ripley is currently offline (API Key missing). Please check your connection to the QAG network.";
  }

  try {
    const modelId = "gemini-3-flash-preview";
    const response = await client.models.generateContent({
      model: modelId,
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "The equations are unclear at this moment.";
  } catch (error) {
    console.error("QAG Transmission Error:", error);
    return "Interference detected in the Affinity Field. Unable to process query.";
  }
};
