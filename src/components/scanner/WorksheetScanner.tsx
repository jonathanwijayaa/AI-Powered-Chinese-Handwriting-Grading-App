'use client'

import { useEffect, useRef, useState } from 'react'
import { Camera, Flashlight, FlashlightOff, RefreshCw, X } from 'lucide-react'

interface WorksheetScannerProps {
  onCapture: (imageBlob: Blob) => void
  onClose: () => void
}

export function WorksheetScanner({ onCapture, onClose }: WorksheetScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isTorchOn, setIsTorchOn] = useState(false)
  const [hasTorch, setHasTorch] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

  // 1. Inisialisasi Kamera Belakang via HTML5 MediaDevices API
  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { exact: 'environment' }, // Pakai kamera belakang utama
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        })

        setStream(mediaStream)

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }

        // Cek dukungan Flash/Torch
        const track = mediaStream.getVideoTracks()[0]
        const capabilities = track.getCapabilities() as any
        if (capabilities?.torch) {
          setHasTorch(true)
        }
      } catch (err: any) {
        console.warn('Exact rear camera failed, falling back to general video:', err)
        // Fallback jika 'exact environment' diblokir oleh browser/perangkat
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
            audio: false,
          })
          setStream(fallbackStream)
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream
          }
        } catch (fallbackErr) {
          setCameraError('Unable to access camera. Please check browser permissions.')
        }
      }
    }

    startCamera()

    // Cleanup: Matikan kamera saat komponen unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // 2. Toggle Flashlight / Torch
  const toggleTorch = async () => {
    if (!stream) return
    const track = stream.getVideoTracks()[0]
    try {
      const nextState = !isTorchOn
      await track.applyConstraints({
        advanced: [{ torch: nextState } as any],
      })
      setIsTorchOn(nextState)
    } catch (err) {
      console.error('Failed to toggle flashlight:', err)
    }
  }

  // 3. Capture Trigger: Snap frame -> Canvas -> Blob Image
  const handleCapture = () => {
    if (!videoRef.current || isCapturing) return

    setIsCapturing(true)
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 1280
    canvas.height = video.videoHeight || 720

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Draw frame dari video ke canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Konversi canvas menjadi BLOB Image file (JPEG Quality 0.92)
    canvas.toBlob(
      (blob) => {
        if (blob) {
          onCapture(blob)
        }
        setIsCapturing(false)
      },
      'image/jpeg',
      0.92
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black text-white select-none">
      {/* ERROR STATE */}
      {cameraError ? (
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
          <p className="text-sm text-rose-400 mb-4">{cameraError}</p>
          <button
            onClick={onClose}
            className="rounded-full bg-white/20 px-6 py-2.5 text-xs font-semibold backdrop-blur-md"
          >
            Close Scanner
          </button>
        </div>
      ) : (
        <>
          {/* VIDEO FEED */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />

          {/* UI OVERLAY ABSOLUTE */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
            {/* Top Bar: Flash Toggle & Close Button */}
            <div className="flex items-center justify-between pt-safe pointer-events-auto">
              <button
                onClick={onClose}
                className="flex size-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md active:scale-95"
              >
                <X size={20} />
              </button>

              <div className="text-xs font-semibold tracking-wider uppercase text-white/80 drop-shadow-md">
                Align Worksheet
              </div>

              {hasTorch ? (
                <button
                  onClick={toggleTorch}
                  className={`flex size-10 items-center justify-center rounded-full backdrop-blur-md active:scale-95 transition-colors ${
                    isTorchOn ? 'bg-amber-400 text-black' : 'bg-black/40 text-white'
                  }`}
                >
                  {isTorchOn ? <Flashlight size={20} /> : <FlashlightOff size={20} />}
                </button>
              ) : (
                <div className="size-10" />
              )}
            </div>

            {/* Middle: Centered Viewfinder Box & Guidelines */}
            <div className="relative mx-auto flex h-[62vh] w-full max-w-[340px] items-center justify-center">
              {/* Outer Rectangular Frame */}
              <div className="relative h-full w-full rounded-2xl border-2 border-dashed border-white/40 bg-black/10 backdrop-blur-[1px]">
                {/* Corner Guidelines */}
                <div className="absolute -top-0.5 -left-0.5 size-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg" />
                <div className="absolute -top-0.5 -right-0.5 size-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg" />
                <div className="absolute -bottom-0.5 -left-0.5 size-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg" />
                <div className="absolute -bottom-0.5 -right-0.5 size-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" />

                {/* QR Code Target Box (Top-Right Angle) */}
                <div className="absolute top-4 right-4 flex flex-col items-center gap-1 rounded-lg border border-emerald-400/60 bg-black/30 p-2 backdrop-blur-xs">
                  <div className="size-8 rounded border-2 border-dashed border-emerald-400 flex items-center justify-center text-[9px] font-mono text-emerald-300">
                    QR
                  </div>
                  <span className="text-[9px] font-medium text-white/80">Align QR</span>
                </div>

                {/* Instructional Text */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/60 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
                  Keep page flat &amp; fit in frame
                </div>
              </div>
            </div>

            {/* Bottom Bar: Shutter Button */}
            <div className="flex items-center justify-center pb-safe pt-2 pointer-events-auto">
              <button
                onClick={handleCapture}
                disabled={isCapturing}
                className="group relative flex size-20 items-center justify-center rounded-full border-4 border-white bg-white/20 p-1 backdrop-blur-md active:scale-95 transition-transform disabled:opacity-50"
              >
                <div className="h-full w-full rounded-full bg-white transition-all group-active:scale-90 flex items-center justify-center">
                  {isCapturing ? (
                    <RefreshCw className="size-6 animate-spin text-gray-800" />
                  ) : (
                    <Camera className="size-7 text-gray-900" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}