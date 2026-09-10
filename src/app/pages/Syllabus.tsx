'use client'

import {
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  Home,
  ListChecks,
  Star,
} from 'lucide-react'

const levels = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6']

const lessons = [
  {
    week: 'Week 4',
    title: '《第十课 – 我们的校园》',
    status: 'Pending Practice',
    tone: 'pending',
    words: [
      ['校园', 'xiào yuán'],
      ['操场', 'cāo chǎng'],
      ['老师', 'lǎo shī'],
      ['礼堂', 'lǐ táng'],
    ],
  },
  {
    week: 'Week 3',
    title: '《第九课 – 我爱我的家》',
    status: 'Completed (80%)',
    tone: 'completed',
    words: [
      ['爸爸', 'bà bà'],
      ['妈妈', 'mā ma'],
      ['温暖', 'wēn nuǎn'],
    ],
  },
  {
    week: 'Week 2',
    title: '《第八课 – 快乐的周末》',
    status: 'Needs Revision',
    tone: 'revision',
    words: [
      ['玩耍', 'wán shuǎ'],
      ['公园', 'gōng yuán'],
    ],
  },
]

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 flex h-[74px] w-full max-w-[430px] -translate-x-1/2 items-center justify-around border-t border-border bg-card px-4 pb-2 pt-3">
      <a className="flex flex-col items-center gap-1 text-muted-foreground" href="#dashboard">
        <Home size={20} strokeWidth={1.8} />
        <span className="text-[9px]">Dashboard</span>
      </a>
      <a className="flex flex-col items-center gap-1 text-primary" href="#syllabus" aria-current="page">
        <BookOpen size={21} strokeWidth={1.9} />
        <span className="text-[9px] font-semibold">Syllabus</span>
      </a>
      <a className="flex flex-col items-center gap-1 text-muted-foreground" href="#history">
        <ListChecks size={20} strokeWidth={1.8} />
        <span className="text-[9px]">History</span>
      </a>
      <a className="flex flex-col items-center gap-1 text-muted-foreground" href="#premium">
        <Star size={21} strokeWidth={1.8} />
        <span className="text-[9px]">Premium</span>
      </a>
    </nav>
  )
}

function StatusPill({ tone, children }: { tone: string; children: React.ReactNode }) {
  const toneClass = {
    pending: 'border-accent/30 bg-accent/10 text-accent-foreground',
    completed: 'border-primary/20 bg-primary/10 text-primary',
    revision: 'border-destructive/20 bg-destructive/10 text-destructive',
  }[tone]

  return <span className={`rounded-md border px-2 py-1 text-[9px] font-semibold ${toneClass}`}>{children}</span>
}

function LessonCard({ lesson }: { lesson: (typeof lessons)[number] }) {
  return (
    <article className="rounded-2xl bg-card px-3 py-3 shadow-[0_5px_15px_rgba(50,80,70,0.055)]">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[9px] font-semibold text-primary">{lesson.week}</p>
          <h2 className="mt-0.5 text-[11px] font-bold">{lesson.title}</h2>
        </div>
        <StatusPill tone={lesson.tone}>{lesson.status}</StatusPill>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {lesson.words.map(([word, pronunciation]) => (
          <div key={word} className="flex min-w-[48px] flex-col items-center rounded-md bg-secondary px-2.5 py-2">
            <span className="text-sm font-bold leading-none">{word}</span>
            <span className="mt-1 text-[8px] text-muted-foreground">{pronunciation}</span>
          </div>
        ))}
      </div>
      <a href="#worksheet" className="mt-3 flex items-center justify-between border-t border-border pt-2 text-[10px] font-medium text-primary">
        <span className="flex items-center gap-1"><FileText size={13} /> Print A4 Worksheet (PDF)</span>
        <ChevronRight size={15} />
      </a>
    </article>
  )
}

export default function Page() {
  return (
    <main id="syllabus" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background pb-24">
        <div className="px-5 pb-5 pt-4">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/5 font-serif text-base text-primary">S</div>
              <div>
                <p className="text-[9px] text-muted-foreground">Welcome back,</p>
                <p className="text-xs font-semibold">Sarah</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 rounded-full bg-card px-3 py-2 text-[10px] font-semibold text-primary shadow-sm" aria-label="Change student">
                Lucas — Primary 2 <ChevronDown size={12} />
              </button>
              <button aria-label="Notifications"><Bell size={18} strokeWidth={1.8} /></button>
            </div>
          </header>

          <div className="mt-4 flex items-center justify-between gap-1">
            {levels.map((level) => (
              <button key={level} className={`h-7 min-w-9 rounded-full border px-2 text-[10px] font-semibold ${level === 'P2' ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground'}`} aria-pressed={level === 'P2'}>{level}</button>
            ))}
          </div>

          <section className="mt-4" aria-labelledby="syllabus-heading">
            <div className="flex items-center justify-between">
              <h1 id="syllabus-heading" className="text-sm font-bold">MOE Primary 2 Syllabus</h1>
              <span className="text-[9px] text-muted-foreground">24 Lessons Total</span>
            </div>
            <div className="mt-3 flex flex-col gap-3">
              {lessons.map((lesson) => <LessonCard key={lesson.week} lesson={lesson} />)}
            </div>
          </section>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
