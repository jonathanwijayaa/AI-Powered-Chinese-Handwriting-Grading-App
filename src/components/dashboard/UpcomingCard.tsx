import { Bell } from 'lucide-react'
import { WeekStrip, type WeekDay } from './WeekStrip'

interface UpcomingEvent {
  title: string
  subtitle: string
}

interface UpcomingCardProps {
  week: WeekDay[]
  event: UpcomingEvent
}

export function UpcomingCard({ week, event }: UpcomingCardProps) {
  return (
    <section
      className="animate-fade-up animate-fade-up-3 mt-6"
      aria-labelledby="upcoming-heading"
    >
      <div className="flex items-center justify-between">
        <h2 id="upcoming-heading" className="text-sm font-semibold tracking-tight">
          Upcoming Ting Xie
        </h2>
        <a
          href="#all"
          className="text-[11px] font-semibold text-primary transition-opacity hover:opacity-70"
        >
          View All
        </a>
      </div>

      <WeekStrip days={week} />

      {/* Event notification card */}
      <div className="mt-3 flex items-center gap-3 rounded-lg border border-primary bg-primary/8 p-3.5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-primary">
          <Bell size={16} strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-bold">{event.title}</p>
          <p className="mt-0.5 text-[10px] text-primary">
            {event.subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
