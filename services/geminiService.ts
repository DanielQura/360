import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSceneDescription = async (sceneName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a knowledgeable and friendly tour guide in Jordan. 
      The user is currently looking at a 360-degree view of "${sceneName}". 
      
      Provide a concise, interesting, and engaging 2-sentence fact or description about this specific location or general area in Jordan. 
      Focus on history, culture, or modern significance. 
      Do not use markdown. Keep it conversational.`,
    });
    
    return response.text || "I'm having trouble retrieving information about this location right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am unable to connect to the tour guide service at the moment.";
  }
};