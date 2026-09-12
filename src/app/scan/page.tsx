'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { WorksheetScanner } from '@/components/scanner/WorksheetScanner'
import { RefreshCw } from 'lucide-react'

export default function ScanPage() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)

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

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      router.push(`/feedback/${data.submissionId}`)
    } catch (err: any) {
      console.error('Upload Error:', err)
      alert(`Upload failed: ${err.message}`)
      setIsUploading(false)
    }
  }
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {isUploading && (
        <div className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md text-white">
          <RefreshCw className="size-10 animate-spin text-emerald-400 mb-4" />
          <p className="text-sm font-semibold tracking-wide">Uploading Worksheet...</p>
          <p className="text-xs text-white/60 mt-1">Saving to database</p>
        </div>
      )}

      <WorksheetScanner
        onCapture={handleCapture}
        onClose={() => router.back()}
      />
    </div>
  )
}