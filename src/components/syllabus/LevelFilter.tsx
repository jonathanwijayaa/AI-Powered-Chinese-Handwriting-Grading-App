const ALL_LEVELS = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as const
type Level = (typeof ALL_LEVELS)[number]

interface LevelFilterProps {
  active: Level
  onChange?: (level: Level) => void
}

export function LevelFilter({ active, onChange }: LevelFilterProps) {
  return (
    <div className="mt-4 grid grid-cols-6 gap-1.5 w-full">
      {ALL_LEVELS.map((level) => {
        const isActive = level === active
        return (
          <button
            key={level}
            aria-pressed={isActive}
            onClick={() => onChange?.(level)}
            className={`flex h-8 w-12 items-center justify-center rounded-full text-xs font-semibold transition-all active:scale-95 ${
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card text-muted-foreground ring-1 ring-border hover:text-foreground'
            }`}
          >
            {level}
          </button>
        )
      })}
    </div>
  )
}