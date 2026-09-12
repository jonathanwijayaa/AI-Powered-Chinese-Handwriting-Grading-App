'use client'

import { RefreshCw } from 'lucide-react'

interface ScannerShutterProps {
  onCapture: () => void
  isCapturing: boolean
}

export function ScannerShutter({ onCapture, isCapturing }: ScannerShutterProps) {
  return (
    <div className="flex flex-col items-center gap-2 pb-safe pointer-events-auto">
      <button
        onClick={onCapture}
        disabled={isCapturing}
        className="group flex size-18 items-center justify-center rounded-full border-4 border-white/60 bg-white/30 p-1 backdrop-blur-md active:scale-95 transition-transform disabled:opacity-50"
      >
        <div className="h-full w-full rounded-full bg-white flex items-center justify-center shadow-md">
          {isCapturing && <RefreshCw className="size-6 animate-spin text-gray-800" />}
        </div>
      </button>
      <span className="text-xs font-semibold tracking-wide text-white drop-shadow-md">
        Capture &amp; Grade
      </span>
    </div>
  )
}