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
    <div className="mt-3 flex items-center justify-between rounded-lg bg-card px-4 py-5 shadow-sm ring-1 ring-border/30">
      {days.map((item) => (
        <div
          key={item.day}
          aria-current={item.active ? 'date' : undefined}
          className={`flex h-[76px] w-[46px] flex-col items-center justify-center rounded-lg transition-all ${
            item.active
              ? 'bg-primary/10 text-primary shadow-sm border border-primary'
              : 'text-foreground hover:bg-muted/60'
          }`}
        >
          <span
            className={`text-[11px] font-medium ${item.active ? 'text-primary/80' : 'text-muted-foreground'}`}
          >
            {item.day}
          </span>
          
          <span className="mt-1.5 text-lg font-semibold leading-none">
            {item.date}
          </span>

          {item.active ? (
            <span className="mt-1.5 size-1 rounded-full bg-primary" />
          ) : (
            <span className="mt-1.5 size-1" /> 
          )}
        </div>
      ))}
    </div>
  )
}