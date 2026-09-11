type Tone = 'pending' | 'completed' | 'revision'

const toneClasses: Record<Tone, string> = {
  pending:
    'border-amber-200 bg-amber-50 text-amber-600',
  completed:
    'border-primary/20 bg-primary/8 text-primary',
  revision:
    'border-destructive/20 bg-destructive/8 text-destructive',
}

interface StatusPillProps {
  tone: Tone
  children: React.ReactNode
}

export function StatusPill({ tone, children }: StatusPillProps) {
  return (
    <span
      className={`shrink-0 rounded-sm border px-2 py-1 text-[9px] font-semibold tracking-wide ${toneClasses[tone]}`}
    >
      {children}
    </span>
  )
}
