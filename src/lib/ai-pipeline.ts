import { GoogleGenAI, Type } from '@google/genai'

export interface EvaluationItem {
  word: string
  is_correct: boolean
  feedback?: string
}

export interface EvaluationResult {
  correctCount: number
  totalWords: number
  percentage: number
  results: EvaluationItem[]
}

export const EXPECTED_WORDS = ['操场', '礼堂', '老师']

export async function evaluateWorksheetWithGemini(
  fileBuffer: Buffer,
  mimeType: string
): Promise<EvaluationResult> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not defined.')
  }

  const ai = new GoogleGenAI({ apiKey })
  const base64Image = fileBuffer.toString('base64')

  const prompt = `Analyze this Tian Zige handwritten Chinese worksheet. 
Compare against expected words: ["操场", "礼堂", "老师"].
Return JSON array for all 3 words evaluating if written correctly.`

  const aiResponse = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [
      {
        role: 'user',
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: mimeType || 'image/jpeg',
              data: base64Image,
            },
          },
        ],
      },
    ],
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            is_correct: { type: Type.BOOLEAN },
            feedback: { type: Type.STRING },
          },
          required: ['word', 'is_correct'],
        },
      },
    },
  })

  const rawText = aiResponse.text || '[]'
  let parsed: any[] = []
  try {
    parsed = JSON.parse(rawText)
  } catch (e) {
    console.error('Failed to parse AI JSON:', e)
  }

  const results: EvaluationItem[] = EXPECTED_WORDS.map((word) => {
    const match = parsed.find((p) => p.word === word || p.word?.includes(word))
    return {
      word,
      is_correct: match ? Boolean(match.is_correct) : false,
      feedback: match?.feedback || '',
    }
  })

  const correctCount = results.filter((r) => r.is_correct).length
  const totalWords = EXPECTED_WORDS.length
  const percentage = Math.round((correctCount / totalWords) * 100)

  return {
    correctCount,
    totalWords,
    percentage,
    results,
  }
}