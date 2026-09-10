'use client'

import {
  Bell,
  BookOpen,
  Camera,
  Check,
  ChevronDown,
  ClipboardList,
  Home,
  Library,
  Star,
} from 'lucide-react'

const week = [
  { day: 'Mon', date: '12' },
  { day: 'Tue', date: '13' },
  { day: 'Wed', date: '14', active: true },
  { day: 'Thu', date: '15' },
  { day: 'Fri', date: '16' },
  { day: 'Sat', date: '17' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">{children}</p>
}

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 flex h-[76px] w-full max-w-[430px] -translate-x-1/2 items-center justify-around border-t border-border bg-card px-4 pb-2 pt-3">
      <a className="flex flex-col items-center gap-1 text-primary" href="#dashboard" aria-current="page">
        <Home size={21} strokeWidth={1.8} />
        <span className="text-[9px] font-semibold">Dashboard</span>
      </a>
      <a className="flex flex-col items-center gap-1 text-muted-foreground" href="#syllabus">
        <BookOpen size={21} strokeWidth={1.8} />
        <span className="text-[9px]">Syllabus</span>
      </a>
      <a className="flex flex-col items-center gap-1 text-muted-foreground" href="#history">
        <ClipboardList size={21} strokeWidth={1.8} />
        <span className="text-[9px]">History</span>
      </a>
      <a className="flex flex-col items-center gap-1 text-muted-foreground" href="#premium">
        <Star size={21} strokeWidth={1.8} />
        <span className="text-[9px]">Premium</span>
      </a>
    </nav>
  )
}

export default function Page() {
  return (
    <main id="dashboard" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background pb-24 shadow-sm">
        <div className="px-5 pt-4">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/5 font-serif text-lg text-primary">S</div>
              <div>
                <p className="text-[10px] text-muted-foreground">Welcome back,</p>
                <p className="text-sm font-semibold">Sarah</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 rounded-full bg-card px-3 py-2 text-[10px] font-semibold text-primary shadow-sm" aria-label="Change student">
                Lucas — Primary 2 <ChevronDown size={13} />
              </button>
              <button className="text-foreground" aria-label="Notifications"><Bell size={20} strokeWidth={1.8} /></button>
            </div>
          </header>

          <section className="mt-4 rounded-2xl bg-card p-4 shadow-[0_6px_22px_rgba(50,80,70,0.06)]" aria-label="Prepaid lesson credits">
            <div className="flex items-start justify-between">
              <div>
                <SectionLabel>Prepaid lesson credits</SectionLabel>
                <p className="mt-1 text-lg font-bold tracking-tight">12 <span className="text-sm font-normal text-muted-foreground">of 20 Remaining</span></p>
              </div>
              <button className="rounded-md bg-primary px-3.5 py-2 text-[11px] font-semibold text-primary-foreground transition-transform active:scale-95">Top Up</button>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full w-3/5 bg-primary" /></div>
            <p className="mt-1 text-[10px] text-muted-foreground">Credits expire on 30 Nov 2026</p>
          </section>

          <section className="mt-5 grid grid-cols-2 gap-3" aria-label="Student progress">
            <div className="rounded-xl bg-card p-3.5">
              <div className="flex items-center justify-between"><SectionLabel>Mastery rate</SectionLabel><Check size={18} className="text-primary" /></div>
              <p className="mt-1 text-lg font-bold">82.4%</p><p className="mt-1 text-[10px] text-primary">+3.1% this month</p>
            </div>
            <div className="rounded-xl bg-card p-3.5">
              <div className="flex items-center justify-between"><SectionLabel>Practiced</SectionLabel><Library size={18} className="text-accent" /></div>
              <p className="mt-1 text-lg font-bold">48 Characters</p><p className="mt-1 text-[10px] text-muted-foreground">8 lists covered</p>
            </div>
          </section>

          <section className="mt-5" aria-labelledby="upcoming-heading">
            <div className="flex items-center justify-between"><h1 id="upcoming-heading" className="text-sm font-bold">Upcoming Ting Xie</h1><a href="#all" className="text-[11px] font-semibold text-primary">View All</a></div>
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-card px-3 py-2">
              {week.map((item) => <div key={item.day} className={`flex h-[58px] w-10 flex-col items-center justify-center gap-1 rounded-xl text-[10px] ${item.active ? 'border-2 border-primary/40 bg-primary/5 text-primary' : 'text-foreground'}`}><span className="text-[9px] text-muted-foreground">{item.day}</span><span className="font-semibold">{item.date}</span>{item.active && <span className="size-1 rounded-full bg-primary" />}</div>)}
            </div>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-primary/50 bg-primary/5 p-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-card text-primary"><Bell size={17} /></div>
              <div><p className="text-xs font-bold">Week 4: 《第十课》 Spelling Test</p><p className="mt-0.5 text-[10px] text-muted-foreground">Wednesday, 14 Oct at 3:00 PM • P2 MOE Syllabus</p></div>
            </div>
          </section>

          <button className="mx-auto mt-10 flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-xs font-semibold text-primary-foreground shadow-[0_8px_18px_rgba(51,103,94,0.2)] transition-transform active:scale-95"><Camera size={17} /> Scan &amp; Grade Worksheet</button>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
