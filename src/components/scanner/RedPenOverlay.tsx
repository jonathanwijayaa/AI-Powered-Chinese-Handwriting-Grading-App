'use client'

import React from 'react'
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'

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
  const totalCount = results.length
  const isPerfect = incorrectList.length === 0

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-[#fdfbf7] text-gray-900 overflow-y-auto select-none">
      {/* Mobile Wrapper Centered */}
      <div className="flex min-h-full w-full max-w-[430px] flex-col px-4 pt-4 pb-8">
        {/* Header Info (Tanpa tombol Full Report di atas) */}
        <div className="mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            RED PEN EVALUATION
          </span>
          <h1 className="font-serif text-xl font-bold text-gray-900">
            Tian Zige Marking
          </h1>
        </div>

        {/* Card Frame Foto Worksheets (Diperpanjang ke bawah) */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-3 shadow-xs ring-1 ring-gray-200">
          <div className="relative overflow-hidden rounded-2xl bg-slate-900 flex items-center justify-center min-h-[360px]">
            {/* Gambar Lembar Kerja dengan Aspek Rasio Lebih Panjang */}
            <img
              src={imageUrl}
              alt="Worksheet Evaluation"
              className="h-auto max-h-[62vh] w-full object-contain"
            />

            {/* Score Stamp Top Right */}
            <div className="absolute top-3 right-3 pointer-events-none">
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-bold text-white shadow-md backdrop-blur-md ${
                  isPerfect ? 'bg-emerald-600/90' : 'bg-rose-600/90'
                }`}
              >
                Graded ({correctCount}/{totalCount})
              </span>
            </div>
          </div>
        </div>

        {/* Section Perbaikan Tinta Merah (Posisi di bawah gambar) */}
        <div className="mt-4 rounded-3xl bg-white p-4 shadow-xs ring-1 ring-gray-200">
          <div className="flex items-center gap-2 mb-3">
            {isPerfect ? (
              <CheckCircle2 className="size-4 text-emerald-600" />
            ) : (
              <AlertCircle className="size-4 text-rose-500" />
            )}
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              {isPerfect ? 'All Correct!' : 'RED PEN CORRECTIONS NEEDED:'}
            </h3>
          </div>

          {isPerfect ? (
            <p className="text-xs text-gray-500">
              Semua karakter ditulis dengan tepat sesuai stroke order!
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {incorrectList.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-2xl border border-rose-100 bg-rose-50/70 p-3"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-xl font-bold text-rose-600">
                      {item.character_name}
                    </span>
                    <span className="text-xs font-medium text-rose-400">
                      ({item.pinyin})
                    </span>
                  </div>
                  <span className="rounded-md border border-rose-200 bg-rose-100 px-2.5 py-0.5 text-[11px] font-medium text-rose-600">
                    ✘ Incorrect
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tombol Navigasi Bawah Utama */}
        <div className="mt-6 pt-2">
          <button
            onClick={onContinue}
            className="w-full rounded-full bg-emerald-800 py-3.5 text-xs font-semibold text-white shadow-xs transition-all active:scale-95 hover:bg-emerald-900 flex items-center justify-center gap-2"
          >
            View Results Matrix & Score
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}