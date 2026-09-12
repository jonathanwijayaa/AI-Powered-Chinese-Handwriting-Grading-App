'use client'

import { useRouter } from 'next/navigation'
import { WorksheetScanner } from '@/components/scanner/WorksheetScanner'

export default function ScanPage() {
  const router = useRouter()

  const handleCapture = (imageBlob: Blob) => {
    console.log('Captured Image Blob:', imageBlob)

    // Simpan blob / kirim ke state/API, lalu arahkan ke halaman feedback/hasil
    // Contoh: router.push('/feedback/week-4')
    alert(`Captured! Image size: ${(imageBlob.size / 1024 / 1024).toFixed(2)} MB`)
  }

  const handleClose = () => {
    // Kembali ke halaman dashboard sebelumnya
    router.back()
  }

  return (
    <WorksheetScanner
      onCapture={handleCapture}
      onClose={handleClose}
    />
  )
}