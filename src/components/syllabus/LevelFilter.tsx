const ALL_LEVELS = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as const
type Level = (typeof ALL_LEVELS)[number]

interface LevelFilterProps {
  active: Level
  onChange?: (level: Level) => void
}

export function LevelFilter({ active, onChange }: LevelFilterProps) {
  return (
    <div className="mt-4 flex items-center gap-1.5">
      {ALL_LEVELS.map((level) => {
        const isActive = level === active
        return (
          <button
            key={level}
            aria-pressed={isActive}
            onClick={() => onChange?.(level)}
            className={`h-8 flex-1 rounded-xl text-[11px] font-bold transition-all active:scale-95 ${
              isActive
                ? 'bg-primary text-primary-foreground shadow-[0_3px_10px_rgba(51,103,94,0.25)]'
                : 'bg-card text-muted-foreground ring-1 ring-border hover:text-foreground hover:ring-primary/30'
            }`}
          >
            {level}
          </button>
        )
      })}
    </div>
  )
}
