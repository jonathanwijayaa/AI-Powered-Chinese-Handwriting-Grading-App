'use client'

import { Bell, ChevronDown } from 'lucide-react'

interface PageHeaderProps {
  parentName?: string
  studentName?: string
  studentLevel?: string
}

export function PageHeader({
  parentName = 'Sarah',
  studentName = 'Lucas',
  studentLevel = 'Primary 2',
}: PageHeaderProps) {
  return (
    <header className="pt-8 px-4  animate-fade-up flex items-center justify-between">
      {/* Avatar + greeting */}
      <div className="flex items-center gap-3">
        <div className="relative flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 font-serif text-base font-semibold text-primary ring-2 ring-primary/10">
          {parentName[0]}
          <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background bg-emerald-400" />
        </div>
        <div>
          <p className="text-[10px] leading-none text-muted-foreground">
            Welcome back,
          </p>
          <p className="mt-0.5 text-sm font-bold tracking-tight">
            {parentName}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-[10px] font-semibold text-primary shadow-sm ring-1 ring-border transition-shadow hover:shadow-md active:scale-95"
          aria-label="Change student"
        >
          {studentName} — {studentLevel}
          <ChevronDown size={12} className="text-primary/60" />
        </button>
        <button
          className="flex size-8 items-center justify-center rounded-full text-foreground transition-all hover:text-primary active:scale-90"
          aria-label="Notifications"
        >
          <Bell size={21} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  )
}
