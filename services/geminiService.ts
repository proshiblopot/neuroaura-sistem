import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const SYSTEM_INSTRUCTION = `
Ти — експерт-психолог з багаторічним стажем у дитячій психодіагностиці. Твоя спеціалізація — аналіз проєктивних методик для визначення рівня когнітивного розвитку дітей молодшого шкільного віку (6-10 років).

Твоя мета: Проаналізувати наданий малюнок та повернути структурований JSON об'єкт.

ВАЖЛИВО:
1. Якщо на малюнку є підпис, ім'я дитини, його слід повністю виключити з аналізу. Зосередься виключно на графічних елементах.
2. Всі оцінки (Низький/Середній/Високий) мають бути СТРОГО калібровані відповідно до вікових норм 6-10 років. Те, що є примітивним для дорослого, може бути нормою для 6-річної дитини.

АЛГОРИТМ РОБОТИ:
1. Ідентифікація методики: Визнач, до якої з двох методик належить малюнок: "Неіснуюча тварина" або "Дім-Дерево-Родина". Інші варіанти (наприклад, "вільний малюнок") заборонені.
2. Аналіз графічних ознак (натиск, лінії, штрихування).
3. Аналіз деталізації та змісту (логіка, частини тіла, елементи).
4. Психологічні гіпотези (тривожність, агресія, ресурсність).
5. Оцінка рівня когнітивного розвитку (Низький/Середній/Високий) з обґрунтуванням, що базується на стандартах для віку 6-10 років.
6. Рекомендації для батьків/педагогів дітей цього віку.

ФОРМАТ ВІДПОВІДІ (JSON):
{
  "methodology": "Назва методики (Тільки 'Неіснуюча тварина' або 'Дім-Дерево-Родина')",
  "graphic_analysis": "Текст опису графічних ознак...",
  "detailing": "Текст аналізу деталей та логіки...",
  "psycho_features": "Текст гіпотез щодо психологічного стану...",
  "cognitive_level": {
    "level": "Високий / Середній / Низький",
    "reasoning": "Текст обґрунтування з посиланням на норми 6-10 років..."
  },
  "recommendations": "Текст рекомендацій..."
}
`;

export const analyzeDrawing = async (base64Image: string, modelId: string): Promise<AnalysisResult> => {
  // CRITICAL FIX FOR VERCEL/VITE:
  // We utilize import.meta.env.VITE_GOOGLE_API_KEY because Vite does not polyfill process.env in the browser.
  // We use 'as any' to bypass potential TS restrictions in some environments, ensuring the build passes.
  // WARNING: Do not share code with API keys.
  const apiKey = (import.meta as any).env.VITE_GOOGLE_API_KEY;

  if (!apiKey) {
     console.error("CRITICAL ERROR: API Key is missing. Make sure VITE_GOOGLE_API_KEY is set in Vercel Environment Variables.");
     throw new Error("API Key is missing. Please configure VITE_GOOGLE_API_KEY.");
  }

  const ai = new GoogleGenAI({ apiKey });

  let mimeType = 'image/jpeg';
  let base64Data = base64Image;

  if (base64Image.includes('base64,')) {
    const parts = base64Image.split('base64,');
    base64Data = parts[1];
    
    const header = parts[0];
    const match = header.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);/);
    if (match && match[1]) {
      mimeType = match[1];
    }
  }

  const config = {
    temperature: 0, // Strict deterministic output for diagnostics
    systemInstruction: SYSTEM_INSTRUCTION,
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        methodology: { type: Type.STRING },
        graphic_analysis: { type: Type.STRING },
        detailing: { type: Type.STRING },
        psycho_features: { type: Type.STRING },
        cognitive_level: {
          type: Type.OBJECT,
          properties: {
            level: { type: Type.STRING },
            reasoning: { type: Type.STRING },
          },
          required: ["level", "reasoning"],
        },
        recommendations: { type: Type.STRING },
      },
      required: ["methodology", "graphic_analysis", "detailing", "psycho_features", "cognitive_level", "recommendations"],
    },
  };

  const requestContents = {
    parts: [
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Data
        }
      },
      {
        text: "Проаналізуй малюнок дитини (6-10 років) і поверни результат виключно у форматі JSON згідно інструкції."
      }
    ]
  };
  
  try {
    console.log(`Attempting analysis with selected model: ${modelId}`);
    
    const response = await ai.models.generateContent({
      model: modelId,
      config: config,
      contents: requestContents
    });

    if (!response.text) throw new Error("No text response received from AI.");
    return JSON.parse(response.text) as AnalysisResult;

  } catch (error: any) {
    console.error("Analysis Error:", error);
    
    // Check for Quota Exceeded (429) or Service Overloaded (503)
    const isQuotaError = error.message?.includes('429') || error.status === 429 || error.status === 503;

    if (isQuotaError) {
       throw new Error(`Ліміт запитів для моделі ${modelId} вичерпано. Будь ласка, спробуйте обрати іншу модель зі списку або зачекайте.`);
    }

    // Pass through other errors
    throw error;
  }
};