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
  return (
    <div className="mt-4 flex items-center gap-4 rounded-3xl bg-white p-5 shadow-xs ring-1 ring-border/20">
      {/* Ring Chart Circle */}
      <div className="relative flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-rose-500 text-base font-bold text-rose-500">
        {percentage}%
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Score: {score}/{maxScore}
        </h2>
        <p className="text-xs text-muted-foreground">{date}</p>
        <p className="mt-1 text-xs font-semibold text-rose-500">
          {missedCount} characters missed
        </p>
      </div>
    </div>
  )
}