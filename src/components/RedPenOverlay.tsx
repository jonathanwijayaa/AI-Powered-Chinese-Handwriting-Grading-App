'use client'

import React from 'react'

export interface CharacterResultItem {
  character_name: string
  pinyin: string
  status: 'correct' | 'incorrect'
  feedback?: string
}

interface RedPenOverlayProps {
  imageUrl: string
  results: CharacterResultItem[]
  onContinue: () => void
}

export function RedPenOverlay({ imageUrl, results, onContinue }: RedPenOverlayProps) {
  const incorrectList = results.filter((r) => r.status === 'incorrect')
  const correctCount = results.filter((r) => r.status === 'correct').length

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white">
      {/* Header Overlay */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-slate-900">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
            AI Evaluation Overlay
          </span>
          <h2 className="text-sm font-bold">Red Pen Marking</h2>
        </div>
        <button
          onClick={onContinue}
          className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-md"
        >
          View Full Dashboard →
        </button>
      </div>

      {/* Main Image Container dengan Red Pen Annotation */}
      <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center p-2">
        <div className="relative max-h-full max-w-full">
          {/* Gambar Asli Worksheets */}
          <img
            src={imageUrl}
            alt="Captured Tian Zige Worksheet"
            className="max-h-[75vh] w-auto rounded-lg object-contain shadow-2xl border border-white/20"
          />

          {/* Layer Overlay Tinta Merah */}
          <div className="absolute inset-0 pointer-events-none border-2 border-rose-500/50 rounded-lg">
            {/* Red Pen Correction Badge */}
            <div className="absolute top-3 right-3 rounded-md bg-rose-600/90 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md border border-rose-400">
               Red Pen Graded ({correctCount}/{results.length})
            </div>

            {/* Kotak Koreksi Tinta Merah untuk Kata yang Salah */}
            {incorrectList.length > 0 && (
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border-2 border-rose-500 bg-rose-950/85 p-3.5 backdrop-blur-md shadow-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="size-2 rounded-full bg-rose-500 animate-ping" />
                  <p className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                    Needs Correction (Perlu Diperbaiki):
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {incorrectList.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 rounded-lg border border-rose-400/60 bg-rose-900/60 px-3 py-1.5 text-rose-100 shadow-inner"
                    >
                      <span className="font-serif text-xl font-bold text-rose-300">
                        {item.character_name}
                      </span>
                      <span className="text-[11px] text-rose-200">({item.pinyin})</span>
                      <span className="text-[10px] rounded bg-rose-500/40 px-1.5 py-0.5 font-mono text-rose-200">
                        ✘ Incorrect
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}