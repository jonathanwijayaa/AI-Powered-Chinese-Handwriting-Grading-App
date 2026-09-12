import React from 'react'

export interface OverlayResult {
  character_name: string
  pinyin: string
  status: 'correct' | 'incorrect'
  feedback?: string
}

interface WorksheetOverlayProps {
  imageUrl: string
  results: OverlayResult[]
}

export function WorksheetOverlay({ imageUrl, results }: WorksheetOverlayProps) {
  const incorrectResults = results.filter((r) => r.status === 'incorrect')

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-black shadow-md">
      {/* 1. Gambar Asli Hasil Upload */}
      <img
        src={imageUrl}
        alt="Worksheet submission"
        className="h-auto w-full object-contain"
      />

      {/* 2. Layer Transparent Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 bg-black/10">
        {/* Stamp Keterangan Status */}
        <div className="self-end rounded-md bg-rose-600/90 px-3 py-1 text-xs font-bold text-white shadow-sm">
          RED PEN EVALUATION
        </div>

        {/* Dynamic Red Pen Corrections Box */}
        {incorrectResults.length > 0 && (
          <div className="rounded-xl border border-rose-500/40 bg-white/90 p-3 shadow-lg backdrop-blur-md">
            <p className="mb-2 text-[11px] font-bold text-rose-600 uppercase tracking-wider">
              Corrections Needed (Koreksi Tinta Merah):
            </p>
            <div className="flex flex-wrap gap-2">
              {incorrectResults.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 rounded-lg border border-rose-300 bg-rose-50 px-2.5 py-1"
                >
                  <span className="font-serif text-lg font-bold text-rose-600">
                    {item.character_name}
                  </span>
                  <span className="text-[10px] font-medium text-rose-500">
                    ({item.pinyin})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}