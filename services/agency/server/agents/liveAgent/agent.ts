import { LlmAgent } from "@google/adk";
import { GoogleGenAI } from "@google/genai";

// Initialize Google Genai client
const googleApiKey = process.env.GOOGLE_API_KEY || '';
const modelName = process.env.DEMO_AGENT_MODEL || 'gemini-2.5-flash';

// Create client instance
export const client = new GoogleGenAI({
    apiKey: googleApiKey,
});

export const agent = new LlmAgent({
    name: "lembria-demo-agent",
    description: "An agent that demonstrates the capabilities of Lembria.",
    // model: modelName, 
    model: "gemini-2.5-flash", // Use a specific model that supports audio and CFC
});