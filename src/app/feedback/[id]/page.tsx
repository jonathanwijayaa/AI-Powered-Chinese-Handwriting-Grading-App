'use client'

import { ScoreCard } from '@/components/feedback/ScoreCard'
import { ResultsTable, type CharacterResult } from '@/components/feedback/ResultsTable'
import { TestFeedbackActions } from '@/components/feedback/TestFeedbackActions'

const mockHistoryData: CharacterResult[] = [
  { char: '操场', pinyin: 'cāo chǎng', history: ['incorrect', 'incorrect', 'correct', 'correct', 'correct'] },
  { char: '礼堂', pinyin: 'lǐ táng', history: ['incorrect', 'incorrect', 'incorrect', 'incorrect', 'correct'] },
  { char: '校园', pinyin: 'xiào yuán', history: ['incorrect', 'correct', 'correct', 'correct', 'correct'] },
  { char: '老师', pinyin: 'lǎo shī', history: ['correct', 'correct', 'correct', 'correct', 'correct'] },
  { char: '同学', pinyin: 'tóng xué', history: ['incorrect', 'correct', 'correct', 'correct', 'correct'] },
  { char: '教室', pinyin: 'jiào shì', history: ['correct', 'correct', 'correct', 'correct', 'correct'] },
  { char: '图书馆', pinyin: 'tú shū guǎn', history: ['incorrect', 'incorrect', 'correct', 'correct', 'correct'] },
  { char: '食堂', pinyin: 'shí táng', history: ['correct', 'correct', 'correct', 'correct', 'correct'] },
  { char: '花园', pinyin: 'huā yuán', history: ['incorrect', 'correct', 'correct', 'correct', 'correct'] },
  { char: '运动场', pinyin: 'yùn dòng chǎng', history: ['incorrect', 'incorrect', 'correct', 'correct', 'correct'] },
]

const dates = ['8 Oct', '10 Oct', '12 Oct', '14 Oct', '16 Oct']

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[430px] bg-background p-5 pb-24">
        {/* Header Info */}
        <div className="flex items-center justify-between pt-8">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              TEST FEEDBACK
            </span>
            <h1 className="text-xl font-bold font-serif text-foreground">
              Week 4 Syllabus Test
            </h1>
          </div>
          <span className="rounded-md border border-rose-200 bg-rose-100 px-3 py-1 text-[11px] font-medium text-rose-600">
            Needs Revision
          </span>
        </div>

        {/* Main UI Elements */}
        <ScoreCard
          score={8}
          maxScore={10}
          percentage={80}
          date="Graded on 14 Oct, 3:12 PM"
          missedCount={2}
        />

        <ResultsTable dates={dates} data={mockHistoryData} />

        <TestFeedbackActions
          onShare={() => alert('Sharing report...')}
          onRetest={() => alert('Starting retest...')}
        />
      </div>
    </main>
  )
}