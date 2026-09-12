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

  const prompt = `Compare the handwriting in this Tian Zige grid against the expected spelling list ${JSON.stringify(
    EXPECTED_WORDS
  )}. Return a JSON array detailing which words were written correctly or incorrectly.`

  const aiResponse = await ai.models.generateContent({
    model: 'gemini-1.5-flash-latest',
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
  const evalResults: EvaluationItem[] = JSON.parse(rawText)

  const correctCount = evalResults.filter((r) => r.is_correct).length
  const totalWords = EXPECTED_WORDS.length
  const percentage = Number(((correctCount / totalWords) * 100).toFixed(2))

  return {
    correctCount,
    totalWords,
    percentage,
    results: evalResults,
  }
}