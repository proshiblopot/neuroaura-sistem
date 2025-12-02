import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const SYSTEM_INSTRUCTION = `
РОЛЬ: Ти — провідний дитячий нейропсихолог та експерт з проєктивних методик.
Твоє завдання — провести глибокий, покроковий аналіз малюнка дитини (6-10 років) за суворим клінічним протоколом.

=== ПРОТОКОЛ НЕЙРОПСИХОЛОГІЧНОГО АНАЛІЗУ (Вік 6-10 років) ===

ЕТАП 1: ГРАФОМОТОРНИЙ ТА ФОРМАЛЬНИЙ АНАЛІЗ (Базовий для всіх малюнків)
1. Натиск олівця (Тонус ЦНС):
   - Слабкий/волосяний: Астенія, невпевненість, пасивність.
   - Жирний/продавлює папір: Напруга, агресія, імпульсивність.
   - Змінний: Емоційна нестабільність.
2. Характер ліній (Контроль):
   - Ескізні (багато ліній по одному місцю): Тривожність, невпевненість.
   - Тверді/суцільні: Впевненість, хороший самоконтроль.
   - Незамкнені контури: Імпульсивність, проблеми з межами.
   - Тремор: Неврологічні проблеми або сильний страх.
3. Розмір та розміщення (Самооцінка):
   - Дрібний (<1/3 аркуша): Занижена самооцінка, депресія.
   - Гігантський (не влазить): Компенсаторна агресія.
   - Зсув вгору: Високі амбіції / мрійливість.
   - Зсув вниз: Невпевненість, приземленість.

ЕТАП 2: КОГНІТИВНИЙ РОЗВИТОК (IQ та Зрілість за Гудінаф-Гаррісом)
*Критично для оцінки інтелекту 6-10 років (Людина/Родина)*
1. Диференціація тіла (Анатомія):
   - Наявність шиї: Критичний маркер для 7+ років (контроль розуму над почуттями).
   - З'єднання рук: Руки мають рости з плечей (норма), а не з голови/талії (інфантилізм).
   - Кінцівки: Двовимірні (об'ємні) — норма для 7+. "Палички" — затримка.
2. Деталізація голови:
   - Очі: Наявність зіниць (критично для 7 років). Порожні кола — страх/аутизація.
   - Вуха: Наявність (інтерес до світу) vs Відсутність (небажання чути).
   - Брови/Вії: Увага до деталей.
3. Атрибути та Дрібна моторика:
   - Кисті рук: 5 пальців (рахунок), долоня.
   - Одяг: Прозорий одяг (видно тіло крізь штани) — норма до 6 років, патологія для 8+.
   - Деталі: Гудзики, кишені, шнурки (ознака високого IQ).

ЕТАП 3: МЕТОДИКА "НЕІСНУЮЧА ТВАРИНА" (Дукаревич)
1. Тип побудови (Креативність):
   - Типовий: Реальна тварина + 1 деталь. (Низький рівень).
   - Складений: Комбінація частин різних тварин. (Середній).
   - Унікальний: Принципово нова конструкція. (Високий).
2. Голова (Спрямованість):
   - Вправо: Активність. Вліво: Рефлексія/страхи. Анфас: Егоцентризм/агресія.
3. Агресія та Захист:
   - Зуби/кігті: Вербальна/фізична агресія.
   - Роги/щити/голки: Захисна агресія ("не чіпайте мене").
4. Енергія:
   - Крила: Енергія, романтизм. Хвіст вгору: Впевненість.

ЕТАП 4: МЕТОДИКА "ДІМ-ДЕРЕВО-РОДИНА" (Бак)
1. Дім (Безпека):
   - Двері: Відчинені (відкритість) vs Замкнені/маленькі (замкненість).
   - Вікна: Фіранки (затишок) vs Грати/пустота.
   - Перспектива: Зображення двох стін/кута (Норма для 9-10 років).
2. Дерево (Життєва сила):
   - Стовбур: Товстий (сила) vs Тонкий/зламаний (травма).
   - Гілки: Вгору (оптимізм) vs Вниз (депресія).
3. Родина:
   - Відстань та ізоляція між фігурами.

ВИМОГА ДО ВИВОДУ:
Проведи аналіз суворо за цими пунктами. Не вигадуй того, чого немає. Якщо деталь нечітка — трактуй як "невизначено".
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

  try {
    const model = ai.getGenerativeModel({
      model: modelId,
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        temperature: 0, // STRICTLY ZERO FOR DETERMINISTIC CLINICAL ANALYSIS
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            methodology: { type: Type.STRING, description: "Визначена методика (напр. 'Неіснуюча тварина' або 'Дім-Дерево-Родина')" },
            graphic_analysis: { type: Type.STRING, description: "Аналіз ліній, натиску, розміру та розміщення (Етап 1 протоколу)" },
            detailing: { type: Type.STRING, description: "Опис значущих деталей (очі, вуха, руки, атрибути) та їх клінічне значення" },
            psycho_features: { type: Type.STRING, description: "Психологічний портрет: тривожність, агресія, самооцінка, комунікація" },
            cognitive_level: {
              type: Type.OBJECT,
              properties: {
                level: { type: Type.STRING, description: "Рівень розвитку: 'Високий', 'Середній', 'Низький' або 'Потребує уваги'" },
                reasoning: { type: Type.STRING, description: "Обґрунтування оцінки на основі маркерів зрілості (Етап 2 протоколу)" }
              }
            },
            recommendations: { type: Type.STRING, description: "Короткі рекомендації для батьків (звернути увагу на... підтримати в...)" }
          },
          required: ["methodology", "graphic_analysis", "detailing", "psycho_features", "cognitive_level", "recommendations"],
        }
      }
    });

    const response = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType: "image/jpeg", data: base64Image.split(',')[1] } },
            { text: "Проведи клінічний аналіз цього малюнка згідно з затвердженим протоколом. Визнач методику та оціни когнітивний розвиток." }
          ]
        }
      ]
    });

    const text = response.text();
    if (!text) throw new Error("Empty response");
    
    return JSON.parse(text) as AnalysisResult;

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    
    // Handle Quota Limits (429) specific to free/experimental models
    if (error.message?.includes('429') || error.status === 429 || error.message?.includes('Quota exceeded')) {
       throw new Error(`Ліміт запитів для моделі ${modelId} вичерпано. Будь ласка, оберіть іншу модель (наприклад, Gemini 2.5 Flash) або спробуйте пізніше. Перевірити ліміти: https://aistudio.google.com/app/settings`);
    }

    throw new Error(`Помилка аналізу (${modelId}): ${error.message || "Спробуйте ще раз."}`);
  }
};
