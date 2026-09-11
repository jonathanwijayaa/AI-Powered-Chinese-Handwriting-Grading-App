'use client'

import { Camera, CircleCheckBig , BookOpen } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { BottomNav } from '@/components/ui/BottomNav'
import { CreditCard } from '@/components/dashboard/CreditCard'
import { StatCard } from '@/components/dashboard/StatCard'
import { UpcomingCard } from '@/components/dashboard/UpcomingCard'

const week = [
  { day: 'Mon', date: '12' },
  { day: 'Tue', date: '13' },
  { day: 'Wed', date: '14', active: true },
  { day: 'Thu', date: '15' },
  { day: 'Fri', date: '16' },
  { day: 'Sat', date: '17' },
]

const upcomingEvent = {
  title: 'Week 4: 《第十课》 Spelling Test',
  subtitle: 'Wednesday, 14 Oct at 3:00 PM • P2 MOE Syllabus',
}

export default function DashboardPage() {
  return (
    <main id="dashboard" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background pb-24">
        <div className="px-5 pt-5">
          <PageHeader />

          <CreditCard remaining={12} total={20} expiryDate="30 Nov 2026" />

          <section
            className="mt-4 grid grid-cols-2 gap-3"
            aria-label="Student progress"
          >
            <StatCard
              label="Mastery rate"
              value="82.4%"
              sub="+3.1% this month"
              subVariant="primary"
              icon={CircleCheckBig}
              animDelay="120ms"
            />
            <StatCard
              label="Practiced"
              value="48 Characters"
              sub="8 lists covered"
              subVariant="muted"
              icon={BookOpen}
              animDelay="180ms"
            />
          </section>

          <UpcomingCard week={week} event={upcomingEvent} />

          {/* CTA */}
          <div className="animate-fade-up animate-fade-up-4 mt-8 flex justify-center">
            <button
              id="scan-grade-btn"
              className="flex items-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-[13px] font-semibold text-primary-foreground shadow-[0_8px_24px_rgba(51,103,94,0.28)] transition-all hover:shadow-[0_10px_30px_rgba(51,103,94,0.38)] hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
            >
              <Camera size={18} strokeWidth={2} />
              Scan &amp; Grade Worksheet
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
