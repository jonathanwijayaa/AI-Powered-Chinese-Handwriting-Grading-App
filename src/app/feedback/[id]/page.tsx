'use client'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { ScoreCard } from '@/components/feedback/ScoreCard'
import { ResultsTable, type CharacterResult } from '@/components/feedback/ResultsTable'
import { TestFeedbackActions } from '@/components/feedback/TestFeedbackActions'

export const revalidate = 0

interface PageProps {
  params: Promise<{ id: string }>
}
// const mockHistoryData: CharacterResult[] = [
//   { char: '操场', pinyin: 'cāo chǎng', history: ['incorrect', 'incorrect', 'correct', 'correct', 'correct'] },
//   { char: '礼堂', pinyin: 'lǐ táng', history: ['incorrect', 'incorrect', 'incorrect', 'incorrect', 'correct'] },
//   { char: '校园', pinyin: 'xiào yuán', history: ['incorrect', 'correct', 'correct', 'correct', 'correct'] },
//   { char: '老师', pinyin: 'lǎo shī', history: ['correct', 'correct', 'correct', 'correct', 'correct'] },
//   { char: '同学', pinyin: 'tóng xué', history: ['incorrect', 'correct', 'correct', 'correct', 'correct'] },
//   { char: '教室', pinyin: 'jiào shì', history: ['correct', 'correct', 'correct', 'correct', 'correct'] },
//   { char: '图书馆', pinyin: 'tú shū guǎn', history: ['incorrect', 'incorrect', 'correct', 'correct', 'correct'] },
//   { char: '食堂', pinyin: 'shí táng', history: ['correct', 'correct', 'correct', 'correct', 'correct'] },
//   { char: '花园', pinyin: 'huā yuán', history: ['incorrect', 'correct', 'correct', 'correct', 'correct'] },
//   { char: '运动场', pinyin: 'yùn dòng chǎng', history: ['incorrect', 'incorrect', 'correct', 'correct', 'correct'] },
// ]

// const dates = ['8 Oct', '10 Oct', '12 Oct', '14 Oct', '16 Oct']

export default async function FeedbackPage({ params }: PageProps) {
  const { id } = await params
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const { data: currentSubmission } = await supabase
    .from('submissions')
    .select('*, character_results(*)')
    .eq('id', id)
    .single()

  const { data: historyData } = await supabase
    .from('submissions')
    .select('id, created_at, character_results(word, is_correct)')
    .eq('student_id', currentSubmission?.student_id || 'student_lucas_p2')
    .order('created_at', { ascending: true })

  const dates = historyData?.map((h) =>
    new Date(h.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  ) || ['8 Oct', '10 Oct', '12 Oct', '14 Oct', '16 Oct']

  const uniqueWords = ['操场', '礼堂', '老师']
  const pinyinMap: Record<string, string> = {
    操场: 'cāo chǎng',
    礼堂: 'lǐ táng',
    老师: 'lǎo shī',
  }
  const matrixData: CharacterResult[] = uniqueWords.map((word) => ({
    char: word,
    pinyin: pinyinMap[word] || '',
    historyData: historyData?.map((sub) => {
      const match = sub.character_results?.find((cr: any) => cr.word === word)
      return match?.is_correct ? 'correct' : 'incorrect'
    }) || ['correct', 'correct'],
  }))

  const missedCount =
    currentSubmission?.character_results?.filter((cr: any) => !cr.is_correct).length || 0

  const formattedDate = currentSubmission?.created_at
    ? `Graded on ${new Date(currentSubmission.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })}`
    : 'Graded today'
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[430px] bg-background px-4 pt-3 pb-24">
        {/* Header Info */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              TEST FEEDBACK
            </span>
            <h1 className="text-xl font-bold font-serif text-foreground">
              Week 4 Syllabus Test
            </h1>
          </div>
          <span
            className={`shrink-0 rounded-md border px-2.5 py-1 text-[11px] font-medium ${
              missedCount === 0
                ? 'border-emerald-200 bg-emerald-100 text-emerald-700'
                : 'border-rose-200 bg-rose-100 text-rose-600'
            }`}
          >
            {missedCount === 0 ? 'Passed' : 'Needs Revision'}
          </span>
        </div>  

        {/* Main UI Elements */}
        <ScoreCard
          score={currentSubmission?.total_score || 0}
          maxScore={currentSubmission?.max_score || 3}
          percentage={currentSubmission?.percentage || 0}
          date={formattedDate}
          missedCount={missedCount}
        />

        <ResultsTable dates={dates} data={matrixData} />

        <TestFeedbackActions
          onShare={() => alert('Sharing report...')}
          onRetest={() => alert('Starting retest...')}
        />
      </div>
      
    </main>
  )
}