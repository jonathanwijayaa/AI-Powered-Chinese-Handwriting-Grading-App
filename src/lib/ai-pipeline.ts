import { GoogleGenAI, Type } from '@google/genai'

export interface EvaluationItem {
  character_name: string
  pinyin: string
  status: 'correct' | 'incorrect'
  feedback?: string
}

export interface EvaluationResult {
  correctCount: number
  totalWords: number
  percentage: number
  results: EvaluationItem[]
}

// Perbaikan 1: Ubah EXPECTED_WORDS menjadi array of objects lengkap dengan Pinyin
export const EXPECTED_WORDS = [
  { char: '操场', pinyin: 'cāo chǎng' },
  { char: '礼堂', pinyin: 'lǐ táng' },
  { char: '老师', pinyin: 'lǎo shī' },
]

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

  // Perbaikan 2: Mengambil array nama karakter untuk dimasukkan ke prompt
  const wordListStr = JSON.stringify(EXPECTED_WORDS.map((w) => w.char))

  const prompt = `Analyze this Tian Zige handwritten Chinese worksheet. 
Compare against expected words: ${wordListStr}.
Return a JSON array for all 3 words evaluating if written correctly or incorrectly.`

  const aiResponse = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
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
            status: { type: Type.STRING, enum: ['correct', 'incorrect'] },
            feedback: { type: Type.STRING },
          },
          required: ['word', 'status'],
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

  // Perbaikan 3: item.char dan item.pinyin sekarang valid sepenuhnya
  const results: EvaluationItem[] = EXPECTED_WORDS.map((item) => {
    const match = parsed.find(
      (p) => p.word === item.char || p.word?.includes(item.char)
    )
    return {
      character_name: item.char,
      pinyin: item.pinyin,
      status: match?.status === 'correct' ? 'correct' : 'incorrect',
      feedback: match?.feedback || '',
    }
  })

  const correctCount = results.filter((r) => r.status === 'correct').length
  const totalWords = EXPECTED_WORDS.length
  const percentage = Math.round((correctCount / totalWords) * 100)

  return {
    correctCount,
    totalWords,
    percentage,
    results,
  }
}