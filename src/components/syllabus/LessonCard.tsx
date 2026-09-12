'use client'

import { useRouter } from 'next/navigation'
import { ChevronRight, Printer } from 'lucide-react'
import { StatusPill } from './StatusPill'

export interface Lesson {
  id?: string
  week: string
  title: string
  status: string
  tone: 'pending' | 'completed' | 'revision'
  words: [string, string][]
}

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const router = useRouter()
  // Mengarahkan ke 'latest' jika lesson.id tidak valid/dummy
  const lessonId = lesson.id || 'latest'

  const handleGoToFeedback = () => {
    router.push(`/feedback/${lessonId}`)
  }

  const handlePrint = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <article
      onClick={handleGoToFeedback}
      className="group cursor-pointer rounded-xl bg-card p-4 shadow-[0_4px_18px_rgba(50,80,70,0.07)] ring-1 ring-border/50 transition-all hover:shadow-[0_6px_24px_rgba(50,80,70,0.11)] active:scale-[0.99]"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-bold tracking-wider text-primary/70">
            {lesson.week}
          </p>
          <h2 className="mt-0.5 text-sm font-bold leading-snug">
            {lesson.title}
          </h2>
        </div>
        <StatusPill tone={lesson.tone}>{lesson.status}</StatusPill>
      </div>

      {/* Vocabulary chips */}
      <div className="mt-3 flex flex-wrap gap-2.5">
        {lesson.words.map(([word, pronunciation]) => (
          <div
            key={word}
            className="flex w-[24%] shrink-0 flex-col items-center justify-center rounded-xl bg-[#f8f6f0] py-3.5 text-center transition-colors group-hover:bg-[#f1eee4]"
          >
            <span className="text-lg font-semibold leading-none text-foreground">
              {word}
            </span>
            <span className="mt-2 text-[10px] font-medium text-muted-foreground/80">
              {pronunciation}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 border-t border-border pt-3">
        <button
          type="button"
          onClick={handlePrint}
          className="flex w-full items-center justify-between text-xs font-medium text-primary transition-opacity hover:opacity-70"
        >
          <span className="flex items-center gap-1.5">
            <Printer size={14} strokeWidth={2.5} />
            Print A4 Worksheet (PDF)
          </span>
          <ChevronRight size={14} className="opacity-60" />
        </button>
      </div>
    </article>
  )
}