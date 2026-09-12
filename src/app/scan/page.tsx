'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { WorksheetScanner } from '@/components/scanner/WorksheetScanner'
import { RedPenOverlay, CharacterResultItem } from '@/components/scanner/RedPenOverlay'
import { RefreshCw } from 'lucide-react'

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

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black select-none">
      {/* 1. State Loading Evaluasi AI */}
      {isUploading && (
        <div className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md text-white">
          <RefreshCw className="size-10 animate-spin text-emerald-400 mb-4" />
          <p className="text-sm font-semibold tracking-wide">Evaluating Worksheet...</p>
          <p className="text-xs text-white/60 mt-1">Analyzing strokes with AI</p>
        </div>
      )}

      {/* 2. Red Pen Overlay View Bertema Warm Cream (Dipanggil dari Komponen RedPenOverlay) */}
      {overlayData ? (
        <RedPenOverlay
          imageUrl={overlayData.imageUrl}
          results={overlayData.results}
          onContinue={() => router.push(`/feedback/${overlayData.submissionId}`)}
        />
      ) : (
        /* 3. Live Scanner Viewfinder */
        <WorksheetScanner
          onCapture={handleCapture}
          onClose={() => router.back()}
        />
      )}
    </div>
  )
}