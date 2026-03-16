import { expect, test, describe, mock, beforeEach, afterEach } from "bun:test";

const mockGenerateContent = mock();

mock.module("@google/genai", () => {
  return {
    GoogleGenAI: class {
      constructor() {}
      models = {
        generateContent: mockGenerateContent
      }
    }
  }
});

import { sendMessageToDrRipley, _resetAIForTesting } from "./gemini";

describe("sendMessageToDrRipley", () => {
  let originalApiKey: string | undefined;
  // Mute console.error during tests so it doesn't pollute test output
  const originalConsoleError = console.error;

  beforeEach(() => {
    originalApiKey = process.env.API_KEY;
    mockGenerateContent.mockClear();
    _resetAIForTesting();
    console.error = () => {};
  });

  afterEach(() => {
    if (originalApiKey !== undefined) {
      process.env.API_KEY = originalApiKey;
    } else {
      delete process.env.API_KEY;
    }
    console.error = originalConsoleError;
  });

  test("returns offline message when API_KEY is missing", async () => {
    delete process.env.API_KEY;

    const response = await sendMessageToDrRipley("Hello");

    expect(response).toBe("Dr. Ripley is currently offline (API Key missing). Please check your connection to the QAG network.");
    expect(mockGenerateContent).not.toHaveBeenCalled();
  });

  test("generates content successfully when API_KEY is present", async () => {
    process.env.API_KEY = "mock-api-key";

    const mockResponseText = "The equations are clear.";
    mockGenerateContent.mockResolvedValueOnce({ text: mockResponseText });

    const response = await sendMessageToDrRipley("What is QAG?");

    expect(response).toBe(mockResponseText);
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
    expect(mockGenerateContent).toHaveBeenCalledWith({
      model: "gemini-3-flash-preview",
      contents: "What is QAG?",
      config: expect.any(Object)
    });
  });

  test("returns fallback message if response text is empty", async () => {
    process.env.API_KEY = "mock-api-key";

    mockGenerateContent.mockResolvedValueOnce({ text: "" });

    const response = await sendMessageToDrRipley("Hello");

    expect(response).toBe("The equations are unclear at this moment.");
  });

  test("catches errors and returns interference message", async () => {
    process.env.API_KEY = "mock-api-key";

    mockGenerateContent.mockRejectedValueOnce(new Error("API Error"));

    const response = await sendMessageToDrRipley("Hello");

    expect(response).toBe("Interference detected in the Affinity Field. Unable to process query.");
  });
});
