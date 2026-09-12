'use client'

import { useEffect, useRef, useState } from 'react'
import { ScannerTopBar } from './ScannerTopBar'
import { ScannerViewfinder } from './ScannerViewfinder'
import { ScannerShutter } from './ScannerShutter'

interface WorksheetScannerProps {
  onCapture: (imageBlob: Blob) => void
  onClose: () => void
}

export function WorksheetScanner({ onCapture, onClose }: WorksheetScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isTorchOn, setIsTorchOn] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

  useEffect(() => {
    async function startCamera() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter((d) => d.kind === 'videoinput')
        const mainRearCamera = videoDevices.find((device) => {
          const label = device.label.toLowerCase()
          return (
            (label.includes('back') || label.includes('rear') || label.includes('environment')) &&
            !label.includes('ultra') &&
            !label.includes('wide 0.5') &&
            !label.includes('0.5x')
          )
        })
        const constraints: MediaStreamConstraints = {
          video: {
            deviceId: mainRearCamera ? { exact: mainRearCamera.deviceId } : undefined,
            facingMode: mainRearCamera ? undefined : { ideal: 'environment' },
            width: { ideal: 3840, min: 1920 }, 
            height: { ideal: 2160, min: 1080 },
            frameRate: { ideal: 30 },
          },
          audio: false,
        }
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
        setStream(mediaStream)

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      } catch (err)
      {
        console.warn('High-res/Main camera stream fallback:', err)
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
            audio: false,
          })
          setStream(fallbackStream)
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream
          }
        } catch {
          setCameraError('Unable to access camera. Please check permissions.')
        }
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

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

  const handleCapture = () => {
    if (!videoRef.current || isCapturing) return
    setIsCapturing(true)

    const video = videoRef.current
    const track = stream?.getVideoTracks()[0]

    try {
      const settings = track?.getSettings()
      const rawWidth = settings?.width || video.videoWidth || 1920
      const rawHeight = settings?.height || video.videoHeight || 1080

      const canvas = document.createElement('canvas')
      canvas.width = rawWidth
      canvas.height = rawHeight

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(video, 0, 0, rawWidth, rawHeight)

        canvas.toBlob(
          async (blob) => {
            if (blob) {
              await onCapture(blob)
            }
            setIsCapturing(false)
          },
          'image/jpeg',
          0.95
        )
      } else {
        setIsCapturing(false)
      }
    } catch (err) {
      console.error('Error snapping frame:', err)
      setIsCapturing(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black text-white select-none">
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
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
            <ScannerTopBar
              onClose={onClose}
              isTorchOn={isTorchOn}
              onToggleTorch={toggleTorch}
            />

            <ScannerViewfinder />

            <ScannerShutter
              onCapture={handleCapture}
              isCapturing={isCapturing}
            />
          </div>
        </>
      )}
    </div>
  )
}