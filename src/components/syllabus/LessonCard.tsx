import { ChevronRight, FileText } from 'lucide-react'
import { StatusPill } from './StatusPill'

export interface Lesson {
  week: string
  title: string
  status: string
  tone: 'pending' | 'completed' | 'revision'
  words: [string, string][]
}

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <article className="animate-pop-in rounded-2xl bg-card p-4 shadow-[0_4px_18px_rgba(50,80,70,0.07)] ring-1 ring-border/50 transition-shadow hover:shadow-[0_6px_24px_rgba(50,80,70,0.11)]">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-primary/70">
            {lesson.week}
          </p>
          <h2 className="mt-0.5 text-[12px] font-bold leading-snug">
            {lesson.title}
          </h2>
        </div>
        <StatusPill tone={lesson.tone}>{lesson.status}</StatusPill>
      </div>

      {/* Vocabulary chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        {lesson.words.map(([word, pronunciation]) => (
          <div
            key={word}
            className="group flex min-w-[52px] flex-col items-center rounded-xl bg-secondary px-3 py-2 transition-colors hover:bg-primary/8"
          >
            <span className="text-sm font-bold leading-none transition-colors group-hover:text-primary">
              {word}
            </span>
            <span className="mt-1 text-[8px] text-muted-foreground">
              {pronunciation}
            </span>
          </div>
        ))}
      </div>

      {/* Footer link */}
      <a
        href="#worksheet"
        className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[10px] font-semibold text-primary transition-opacity hover:opacity-70"
      >
        <span className="flex items-center gap-1.5">
          <FileText size={13} />
          Print A4 Worksheet (PDF)
        </span>
        <ChevronRight size={14} className="opacity-60" />
      </a>
    </article>
  )
}
