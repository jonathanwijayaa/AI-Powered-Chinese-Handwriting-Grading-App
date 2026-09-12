interface ScoreCardProps {
  score: number
  maxScore: number
  percentage: number
  date: string
  missedCount: number
}

export function ScoreCard({
  score,
  maxScore,
  percentage,
  date,
  missedCount,
}: ScoreCardProps) {
  const isPerfect = missedCount === 0

  const circleColorClass = isPerfect
    ? 'border-emerald-500 text-emerald-600'
    : 'border-rose-500 text-rose-500'

  const missedTextClass = isPerfect
    ? 'text-emerald-600 font-semibold'
    : 'text-rose-500 font-semibold'

  return (
    <div className="mt-4 flex items-center gap-4 rounded-3xl bg-white p-5 shadow-xs ring-1 ring-border/20">
      {/* Ring Chart Circle */}
      <div
        className={`relative flex size-20 shrink-0 items-center justify-center rounded-full border-4 text-base font-bold ${circleColorClass}`}
      >
        {percentage}%
      </div>
      <div className="flex flex-col justify-center space-y-1.5">
        <h2 className="text-xl font-bold leading-tight text-gray-900">
          Score: {score}/{maxScore}
        </h2>
        <p className="text-xs text-muted-foreground">{date}</p>
        <p className={`text-xs ${missedTextClass}`}>
          {missedCount === 0
            ? '0 characters missed! Excellent'
            : `${missedCount} character${missedCount > 1 ? 's' : ''} missed`}
        </p>
      </div>
    </div>
  )
}