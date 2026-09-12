'use client'

import { X, Zap, ZapOff } from 'lucide-react'

interface ScannerTopBarProps {
  onClose: () => void
  isTorchOn: boolean
  onToggleTorch: () => void
}

export function ScannerTopBar({
  onClose,
  isTorchOn,
  onToggleTorch,
}: ScannerTopBarProps) {
  return (
    <div className="flex items-center justify-between pt-safe pointer-events-auto">
      <button
        onClick={onClose}
        className="flex size-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md active:scale-95 transition-transform"
        aria-label="Close Scanner"
      >
        <X size={20} />
      </button>

      <span className="text-sm font-medium tracking-wide text-white drop-shadow-md">
        Align Worksheet
      </span>

      <button
        onClick={onToggleTorch}
        className={`flex size-11 items-center justify-center rounded-full backdrop-blur-md active:scale-95 transition-all ${
          isTorchOn
            ? 'bg-white text-black shadow-lg'
            : 'bg-black/40 text-white hover:bg-black/60'
        }`}
        aria-label="Toggle Flash"
      >
        {isTorchOn ? (
          <Zap size={20} className="fill-current text-amber-500" />
        ) : (
          <ZapOff size={20} />
        )}
      </button>
    </div>
  )
}