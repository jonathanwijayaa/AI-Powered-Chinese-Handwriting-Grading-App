export interface WeekDay {
  day: string
  date: string
  active?: boolean
}

interface WeekStripProps {
  days: WeekDay[]
}

export function WeekStrip({ days }: WeekStripProps) {
  return (
    <div className="mt-3 flex items-center justify-between rounded-lg bg-card px-2 py-2 shadow-sm ring-1 ring-border/50">
      {days.map((item) => (
        <div
          key={item.day}
          aria-current={item.active ? 'date' : undefined}
          className={`flex h-[60px] w-10 flex-col items-center justify-center gap-1 rounded-md transition-all ${
            item.active
              ? 'bg-primary/10 text-primary shadow-[0_4px_12px_rgba(51,103,94,0.3)] border border-primary'
              : 'text-foreground hover:bg-muted/60'
          }`}
        >
          <span
            className={`text-[9px] font-medium ${item.active ? 'text-primary/80' : 'text-foreground/80'}`}
          >
            {item.day}
          </span>
          <span className="text-[13px] font-bold leading-none">{item.date}</span>
          {item.active && (
            <span className="size-1 rounded-full bg-primary" />
          )}
        </div>
      ))}
    </div>
  )
}
