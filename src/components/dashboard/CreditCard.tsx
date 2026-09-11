import { SectionLabel } from '@/components/shared/SectionLabel'

interface CreditCardProps {
  remaining: number
  total: number
  expiryDate: string
}

export function CreditCard({ remaining, total, expiryDate }: CreditCardProps) {
  const pct = Math.round((remaining / total) * 100)

  return (
    <section
      className="animate-fade-up animate-fade-up-1 relative mt-5 overflow-hidden rounded-lg bg-card p-5 shadow-[0_8px_28px_rgba(50,80,70,0.08)] ring-1 ring-border/60"
      aria-label="Prepaid lesson credits"
    >
      {/* Decorative gradient blob */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-primary/6 blur-2xl"
        aria-hidden
      />

      <div className="flex items-start justify-between gap-3">
        <div>
          <SectionLabel>Prepaid lesson credits</SectionLabel>
          <p className="mt-1.5 text-2xl font-extrabold tracking-tight text-foreground">
            {remaining}
            <span className="ml-1.5 text-sm font-normal text-muted-foreground">
              of {total} remaining
            </span>
          </p>
        </div>
        <button className="shrink-0 rounded-md bg-primary px-4 py-2 text-[11px] font-medium text-primary-foreground shadow-[0_4px_12px_rgba(51,103,94,0.25)] transition-all hover:shadow-[0_6px_18px_rgba(51,103,94,0.35)] active:scale-95">
          Top Up
        </button>
      </div>

      {/* Progress track */}
      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${remaining} of ${total} credits remaining`}
      >
        <div
          className="animate-progress h-full rounded-full bg-gradient-to-r from-primary to-primary/80"
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="mt-2 text-[10px] text-muted-foreground">
        Credits expire on{' '}
        <span className="font-medium text-foreground/70">{expiryDate}</span>
      </p>
    </section>
  )
}
