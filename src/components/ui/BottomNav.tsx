'use client'

import { BookOpen, ClipboardList, Home, Star } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/syllabus', label: 'Syllabus', icon: BookOpen },
  { href: '/history', label: 'History', icon: ClipboardList },
  { href: '/premium', label: 'Premium', icon: Star },
] as const

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-20 flex h-[72px] w-full max-w-[430px] -translate-x-1/2 items-center justify-around border-t border-border/60 bg-card/95 px-4 pb-2 pt-2.5 shadow-[0_-4px_20px_rgba(50,80,70,0.06)] backdrop-blur-md"
      aria-label="Main navigation"
    >
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`relative flex flex-col items-center gap-1 transition-all active:scale-90 ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span
              className={`flex size-8 items-center justify-center rounded-xl transition-colors ${
                isActive ? 'bg-primary/12' : ''
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.7} />
            </span>
            <span className={`text-[9px] ${isActive ? 'font-bold' : 'font-medium'}`}>
              {label}
            </span>
            {isActive && (
              <span className="absolute -top-2.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
