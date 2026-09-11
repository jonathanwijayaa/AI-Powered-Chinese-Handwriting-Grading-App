'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { BottomNav } from '@/components/ui/BottomNav'
import { LevelFilter } from '@/components/syllabus/LevelFilter'
import { LessonCard, type Lesson } from '@/components/syllabus/LessonCard'

const lessons: Lesson[] = [
  {
    week: 'Week 4',
    title: '《第十课 – 我们的校园》',
    status: 'Pending Practice',
    tone: 'pending',
    words: [
      ['校园', 'xiào yuán'],
      ['操场', 'cāo chǎng'],
      ['老师', 'lǎo shī'],
      ['礼堂', 'lǐ táng'],
    ],
  },
  {
    week: 'Week 3',
    title: '《第九课 – 我爱我的家》',
    status: 'Completed (80%)',
    tone: 'completed',
    words: [
      ['爸爸', 'bà bà'],
      ['妈妈', 'mā ma'],
      ['温暖', 'wēn nuǎn'],
    ],
  },
  {
    week: 'Week 2',
    title: '《第八课 – 快乐的周末》',
    status: 'Needs Revision',
    tone: 'revision',
    words: [
      ['玩耍', 'wán shuǎ'],
      ['公园', 'gōng yuán'],
    ],
  },
]

export default function SyllabusPage() {
  const [activeLevel, setActiveLevel] = useState<
    'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6'
  >('P2')

  return (
    <main id="syllabus" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background pb-24">
        <div className="px-5 pb-6 pt-5">
          <PageHeader />

          <LevelFilter active={activeLevel} onChange={setActiveLevel} />

          <section className="mt-5" aria-labelledby="syllabus-heading">
            <div className="flex items-center justify-between">
              <h1 id="syllabus-heading" className="text-sm font-semibold tracking-tight">
                MOE {activeLevel.replace('P', 'Primary ')} Syllabus
              </h1>
              <span className="rounded-full px-2.5 py-1 text-xs font-medium text-muted-foreground">
                24 Lessons Total
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-3">
              {lessons.map((lesson) => (
                <LessonCard key={lesson.week} lesson={lesson} />
              ))}
            </div>
          </section>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
