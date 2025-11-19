import { GoogleGenAI, Type } from "@google/genai";
import { AIPlan } from '../types';
import { CROP_CALENDAR, MARINE_STATUS } from '../constants';


const API_KEY = process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

// Define the schema for the structured response
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    introduction: {
      type: Type.STRING,
      description: "A brief, encouraging, and culturally relevant introduction to the plan in the requested language."
    },
    farmingPlan: {
      type: Type.ARRAY,
      description: "A timetable of farming tasks. Only populate if crops were selected.",
      items: {
        type: Type.OBJECT,
        properties: {
          timing: { type: Type.STRING, description: "When to perform the task (e.g., Week 1, Daily, Mid-Month)." },
          task: { type: Type.STRING, description: "The specific farming task (e.g., Soil Preparation, Planting Taro)." },
          details: { type: Type.STRING, description: "Detailed instructions or tips for the task." },
          seasonalNote: { type: Type.STRING, description: "A note on seasonal suitability based on the provided Traditional Knowledge Context (e.g., 'Ideal Planting Season', 'Harvest Time', 'Not Recommended')." }
        },
        required: ["timing", "task", "details"]
      }
    },
    fishingPlan: {
      type: Type.ARRAY,
      description: "A timetable of fishing tasks. Only populate if fish were selected.",
      items: {
        type: Type.OBJECT,
        properties: {
          timing: { type: Type.STRING, description: "The best time to fish (e.g., High Tide, Full Moon, Early Morning)." },
          task: { type: Type.STRING, description: "The fishing activity or target (e.g., Trolling for Walu, Netting near reef)." },
          details: { type: Type.STRING, description: "Specific techniques, safety tips, or traditional knowledge." },
          abundance: { type: Type.STRING, description: "The abundance status of the target species for the month, based ONLY on the Traditional Knowledge Context (e.g., 'Abundant', 'Low Supply', 'Spawning Season')." },
          recommendation: { type: Type.STRING, description: "If the target fish is in low supply, suggest an alternative abundant fish from the Traditional Knowledge Context." }
        },
        required: ["timing", "task", "details"]
      }
    }
  },
  required: ["introduction", "farmingPlan", "fishingPlan"]
};

export const generateFarmingAdvice = async (
  selectedMonth: string,
  crops: string[],
  fish: string[],
  language: 'en' | 'fj' = 'en',
  customGoals: string[] = []
): Promise<AIPlan | null> => {
  if (!ai) {
    return { 
      introduction: "Gemini API Key is missing. Please configure the environment.",
      farmingPlan: [],
      fishingPlan: []
    };
  }
  
  // Build Traditional Knowledge Context for the prompt
  const cropContext = CROP_CALENDAR
    .filter(c => c.month_name_en === selectedMonth)
    .map(c => `- ${c.crop_name_en}: ${c.recommendation}`)
    .join('\n');

  const marineContext = MARINE_STATUS
    .filter(m => m.month_name_en === selectedMonth)
    .map(m => `- ${m.species_name_en}: Status is '${m.status}'. ${m.note || ''}`)
    .join('\n');

  const traditionalKnowledgeContext = `
    **Traditional Knowledge for ${selectedMonth}:**
    *Available Crops & Recommendations:*
    ${cropContext || "No specific crop data for this month."}

    *Marine Species Activity:*
    ${marineContext || "No specific marine data for this month."}
  `;


  const cropList = crops.length > 0 ? crops.join(', ') : "none";
  const fishList = fish.length > 0 ? fish.join(', ') : "none";

  const languageInstruction = language === 'fj' 
    ? "Please write the response primarily in the Fijian language (Vosa Vakaviti), suitable for a local farmer." 
    : "Please write the response in English.";
  
  const goalInstruction = customGoals.length > 0
    ? `The user has specific goals: "${customGoals.join(', ')}". Ensure the advice directly addresses these goals.`
    : "";

  const prompt = `
    You are VOLAU, an expert Fijian agricultural and fishing guide, integrating traditional knowledge with practical advice.
    Your task is to generate a practical, timetable-style plan for a user in Fiji for the month of **${selectedMonth}**.

    **User Selections:**
    - Crops: ${cropList}
    - Marine Species: ${fishList}
    
    **User Goals:**
    - ${goalInstruction}

    **Language for Response:**
    - ${languageInstruction}

    **Data Sourcing & JSON Schema Rules (CRITICAL):**
    1.  Your ONLY data source is the **Traditional Knowledge Context** provided below. Use it for all seasonal notes and abundance statuses. You MUST NOT use any external knowledge.
    2.  If information for 'seasonalNote', 'abundance', or 'recommendation' is **NOT FOUND** in the Traditional Knowledge Context for a selected item, you **MUST OMIT** that field entirely from the JSON object for that task.
    3.  **DO NOT** write any text that explains that data is missing (e.g., do not write "Data Not Available", "No guidance found", etc.). The field must be left out of the JSON response for that item.
    4.  If a fish is found to have a 'low_supply' status (based on the provided context), you MUST use the 'recommendation' field to suggest an alternative fish that IS listed as abundant in the Traditional Knowledge Context.
    5.  Return a valid JSON object that strictly matches the provided schema. If a plan (e.g., farmingPlan) is not applicable because nothing was selected, return an empty array for it.

    ---
    **Traditional Knowledge Context for ${selectedMonth}:**
    ${traditionalKnowledgeContext}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      },
    });

    const text = response.text?.trim();
    if (text) {
      // Clean potential markdown and parse
      const cleanedText = text.replace(/^```json\s*|```\s*$/g, '');
      return JSON.parse(cleanedText) as AIPlan;
    }
    return null;
  } catch (error) {
    console.error("Gemini API Error or JSON parsing failed:", error);
    return {
        introduction: "Sorry, I couldn't connect to the spirits of the shed (API Error) or the response was not in the correct format. Please try again.",
        farmingPlan: [],
        fishingPlan: []
    };
  }
};