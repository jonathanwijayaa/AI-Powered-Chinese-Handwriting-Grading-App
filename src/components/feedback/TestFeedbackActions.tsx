import { Share2, RotateCcw } from 'lucide-react'

interface TestFeedbackActionsProps {
  onShare?: () => void
  onRetest?: () => void
}

export function TestFeedbackActions({
  onShare,
  onRetest,
}: TestFeedbackActionsProps) {
  return (
    <div className="mt-6 flex gap-3">
      <button
        onClick={onShare}
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#edf4f0] py-3 text-xs font-bold text-[#2d5a4c] transition-all active:scale-95"
      >
        <Share2 size={16} />
        Share Report
      </button>
      <button
        onClick={onRetest}
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-xs font-bold text-primary-foreground shadow-md transition-all active:scale-95"
      >
        <RotateCcw size={16} />
        Retest Missed
      </button>
    </div>
  )
}