import { BottomNav } from '@/components/ui/BottomNav'
export default function HistoryPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-5 text-center">
      <h1 className="text-xl font-bold text-foreground">History</h1>
      <p className="mt-2 text-xs text-muted-foreground">
      </p>
      <BottomNav />
    </main>
  )
}