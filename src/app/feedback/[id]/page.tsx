import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { ScoreCard } from '@/components/feedback/ScoreCard'
import { ResultsTable, type CharacterResult } from '@/components/feedback/ResultsTable'
import { TestFeedbackActions } from '@/components/feedback/TestFeedbackActions'

export const revalidate = 0
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function FeedbackPage({ params }: PageProps) {
  const resolvedParams = await params
  const id = resolvedParams?.id

  if (!id) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <p className="text-rose-500 font-semibold">Invalid Submission ID</p>
      </main>
    )
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // 1. Fetch Current Submission
  const { data: currentSubmission, error: subError } = await supabase
    .from('submissions')
    .select('*, character_results(*)')
    .eq('id', id)
    .maybeSingle()

  if (subError || !currentSubmission) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-3 bg-white p-6 rounded-2xl shadow-sm border border-border">
          <h2 className="text-lg font-bold text-gray-900">Submission Not Found</h2>
          <Link href="/scan" className="text-xs text-primary underline">
            Back to Scanner
          </Link>
        </div>
      </main>
    )
  }

  // 2. Fetch All Student History Submissions
  const { data: historyData } = await supabase
    .from('submissions')
    .select('id, created_at, character_results(word, is_correct)')
    .eq('student_id', currentSubmission.student_id || 'student_lucas_p2')
    .order('created_at', { ascending: true })

  const hasHistory = Array.isArray(historyData) && historyData.length > 0

  // Dynamic Dates Header
  const dates: string[] = hasHistory
    ? historyData.map((h: any) =>
        new Date(h.created_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
      )
    : [
        new Date(currentSubmission.created_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
      ]

  const expectedWords = [
    { char: '操场', pinyin: 'cāo chǎng' },
    { char: '礼堂', pinyin: 'lǐ táng' },
    { char: '老师', pinyin: 'lǎo shī' },
  ]

    const matrixData: CharacterResult[] = expectedWords.map((item) => ({
      char: item.char,
      pinyin: item.pinyin,
      historyData: hasHistory
        ? historyData.map((sub: any) => {
            const match = sub.character_results?.find(
              (cr: any) => cr.word === item.char
            )
            return match?.is_correct ? 'correct' : 'incorrect'
          })
        : (currentSubmission.character_results?.map((cr: any) =>
            cr.word === item.char && cr.is_correct ? 'correct' : 'incorrect'
          ) || ['correct']),
    }))

  const charResults = currentSubmission.character_results || []
  const missedCount = charResults.filter((cr: any) => !cr.is_correct).length

  const formattedDate = currentSubmission.created_at
    ? `Graded on ${new Date(currentSubmission.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })}`
    : 'Graded today'

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[430px] px-4 pt-4 pb-24">
        {/* Header Info */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              TEST FEEDBACK
            </span>
            <h1 className="font-serif text-xl font-bold text-foreground">
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

        {/* 1. Score Overview Header */}
        <ScoreCard
          score={currentSubmission.total_score ?? 0}
          maxScore={currentSubmission.max_score ?? 3}
          percentage={currentSubmission.percentage ?? 0}
          date={formattedDate}
          missedCount={missedCount}
        />

        {/* 2. Historical Matrix Table */}
        <ResultsTable dates={dates} data={matrixData} />

        {/* 3. Action Buttons */}
        <TestFeedbackActions />
      </div>
    </main>
  )
}