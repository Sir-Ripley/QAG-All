import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let ai: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const sendMessageToDrRipley = async (message: string): Promise<string> => {
  if (!ai) {
    return "Dr. Ripley is currently offline (API Key missing). Please check your connection to the QAG network.";
  }

  try {
    const modelId = "gemini-3-flash-preview";
    const response = await ai.models.generateContent({
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