import type { LucideIcon } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'

interface StatCardProps {
  label: string
  value: string
  sub: string
  subVariant?: 'primary' | 'muted'
  icon: LucideIcon
  animDelay?: string
}

export function StatCard({
  label,
  value,
  sub,
  subVariant = 'muted',
  icon: Icon,
  animDelay,
}: StatCardProps) {
  return (
    <div
      className="animate-fade-up relative overflow-hidden rounded-lg bg-card p-4 shadow-[0_4px_16px_rgba(50,80,70,0.07)] ring-1 ring-border/60 transition-shadow hover:shadow-[0_6px_22px_rgba(50,80,70,0.11)]"
      style={animDelay ? { animationDelay: animDelay } : undefined}
    >
      {/* Subtle background glow */}
      <div
        className={`pointer-events-none absolute -right-4 -top-4 size-16 rounded-full blur-xl ${
          subVariant === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
        }`}
        aria-hidden
      />

      <div className="flex items-center justify-between">
        <SectionLabel>{label}</SectionLabel>
        <span
          className={`flex size-7 items-center justify-center rounded-lg ${
            subVariant === 'primary'
              ? 'bg-primary/10 text-primary'
              : 'bg-accent/15 text-accent'
          }`}
        >
          <Icon size={15} strokeWidth={2} />
        </span>
      </div>

      <p className="mt-2 text-lg font-semibold tracking-tight">{value}</p>
      <p
        className={`mt-1 text-[10px] font-medium ${
          subVariant === 'primary' ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        {sub}
      </p>
    </div>
  )
}
