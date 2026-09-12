'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { WorksheetScanner } from '@/components/scanner/WorksheetScanner'
import { RefreshCw, ArrowRight } from 'lucide-react'

interface CharacterResultItem {
  character_name: string
  pinyin: string
  status: 'correct' | 'incorrect'
  feedback?: string
}

export default function ScanPage() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [overlayData, setOverlayData] = useState<{
    submissionId: string
    imageUrl: string
    results: CharacterResultItem[]
  } | null>(null)

  const handleCapture = async (imageBlob: Blob) => {
    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('file', imageBlob, 'worksheet.jpg')
      formData.append('studentId', 'student_lucas_p2')

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        const subId = data.submissionId || data.submission?.id
        const imgUrl = data.submission?.image_url
        const results = data.results || []

        // Simpan data untuk memicu tampilan Red Pen Overlay
        setOverlayData({
          submissionId: subId,
          imageUrl: imgUrl,
          results: results,
        })
      } else {
        alert(`Upload failed: ${data.error}`)
      }
    } catch (err: any) {
      console.error('Upload Error:', err)
      alert(`Upload failed: ${err.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  const incorrectItems = overlayData?.results.filter((r) => r.status === 'incorrect') || []
  const correctCount = overlayData?.results.filter((r) => r.status === 'correct').length || 0

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black select-none">
      {/* 1. State Loading Evaluasi AI */}
      {isUploading && (
        <div className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md text-white">
          <RefreshCw className="size-10 animate-spin text-emerald-400 mb-4" />
          <p className="text-sm font-semibold tracking-wide">Evaluating Tian Zige Worksheet...</p>
          <p className="text-xs text-white/60 mt-1">Analyzing strokes with Gemini AI Vision</p>
        </div>
      )}

      {/* 2. Red Pen Correction Overlay View */}
      {overlayData ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-slate-900">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                Red Pen Evaluation Layer
              </span>
              <h2 className="text-sm font-bold text-white"> Tian Zige Corrections</h2>
            </div>
            <button
              onClick={() => router.push(`/feedback/${overlayData.submissionId}`)}
              className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-md transition-all active:scale-95"
            >
              View Full Report
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Canvas Preview dengan Marker Tinta Merah */}
          <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center p-3">
            <div className="relative max-h-full max-w-full">
              <img
                src={overlayData.imageUrl}
                alt="Worksheet Evaluation"
                className="max-h-[72vh] w-auto rounded-xl object-contain shadow-2xl border border-white/20"
              />

              {/* Red Pen Overlay Container */}
              <div className="absolute inset-0 pointer-events-none rounded-xl border-2 border-rose-500/50 p-3 flex flex-col justify-between">
                {/* Score Stamp */}
                <div className="self-end rounded-md bg-rose-600/90 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md border border-rose-400">
                   Graded ({correctCount}/{overlayData.results.length})
                </div>

                {/* Boxes Kata yang Perlu Diperbaiki */}
                {incorrectItems.length > 0 && (
                  <div className="rounded-xl border border-rose-500/60 bg-rose-950/85 p-3.5 backdrop-blur-md shadow-2xl">
                    <p className="text-[11px] font-bold text-rose-300 uppercase tracking-wider mb-2">
                      Red Pen Corrections Needed:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {incorrectItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 rounded-lg border border-rose-400/60 bg-rose-900/60 px-2.5 py-1 text-rose-100"
                        >
                          <span className="font-serif text-lg font-bold text-rose-300">
                            {item.character_name}
                          </span>
                          <span className="text-[10px] text-rose-200">({item.pinyin})</span>
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
      ) : (
        <WorksheetScanner
          onCapture={handleCapture}
          onClose={() => router.back()}
        />
      )}
    </div>
  )
}