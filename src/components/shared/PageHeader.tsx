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
    <header className="py-1 animate-fade-up flex items-center justify-between gap-2">
      {/* Avatar + greeting */}
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f0f5f3] font-serif text-base font-semibold text-primary">
          {parentName[0]}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] leading-none text-muted-foreground">
            Welcome back,
          </p>
          <p className="mt-0.5 truncate text-sm font-semibold tracking-tight">
            {parentName}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          className="flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1.5 text-[10px] font-semibold text-primary shadow-sm ring-1 ring-border transition-shadow hover:shadow-md active:scale-95"
          aria-label="Change student"
        >
          {studentName} — {studentLevel}
          <ChevronDown size={12} className="text-primary/60 shrink-0" />
        </button>
        <button
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-foreground transition-all hover:text-primary active:scale-90"
          aria-label="Notifications"
        >
          <Bell size={21} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  )
}
