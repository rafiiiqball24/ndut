"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Download, X, RefreshCw } from "lucide-react"
import Image from "next/image"

interface SelfieProps {
  onClose: () => void
}

const FILTERS = [
  { name: "Normal", filter: "" },
  { name: "Rosy", filter: "sepia(0.3) hue-rotate(300deg) saturate(1.4)" },
  { name: "Vintage", filter: "sepia(0.5) contrast(1.2)" },
  { name: "Dreamy", filter: "brightness(1.2) contrast(0.85) saturate(1.4)" },
]

const FRAMES = [
  { name: "None", src: null },
  { name: "Hearts", src: "/frames/hearts-frame.png" },
  { name: "Flowers", src: "/frames/flowers-frame.png" },
  { name: "Love", src: "/frames/love-frame.png" },
]

export default function SelfieCamera({ onClose }: SelfieProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState(0)
  const [selectedFrame, setSelectedFrame] = useState(0)
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")

  // Initialize camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        })

        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
        setCameraPermission(true)
      } catch (err) {
        console.error("Error accessing camera:", err)
        setCameraPermission(false)
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [facingMode])

  const switchCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw video frame to canvas
    context.filter = FILTERS[selectedFilter].filter
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Draw frame if selected
    if (selectedFrame > 0 && FRAMES[selectedFrame].src) {
      const frameImg = new window.Image()
      frameImg.crossOrigin = "anonymous"
      frameImg.onload = () => {
        context.drawImage(frameImg, 0, 0, canvas.width, canvas.height)
        setCapturedImage(canvas.toDataURL("image/png"))
      }
      frameImg.src = FRAMES[selectedFrame].src || ""

      // In case the frame doesn't load, still set the captured image
      frameImg.onerror = () => {
        console.error("Error loading frame image")
        setCapturedImage(canvas.toDataURL("image/png"))
      }
    } else {
      setCapturedImage(canvas.toDataURL("image/png"))
    }
  }

  const downloadPhoto = () => {
    if (!capturedImage) return

    const link = document.createElement("a")
    link.href = capturedImage
    link.download = "love-selfie.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const retakePhoto = () => {
    setCapturedImage(null)
  }

  if (cameraPermission === false) {
    return (
      <div className="rounded-lg bg-white p-6 text-center shadow-lg">
        <p className="mb-4 text-red-500">Camera access denied. Please allow camera access to use this feature.</p>
        <Button onClick={onClose}>Close</Button>
      </div>
    )
  }

  return (
    <div className="relative mx-auto max-w-md overflow-hidden rounded-lg bg-white p-4 shadow-lg">
      <Button variant="ghost" size="icon" className="absolute right-2 top-2 z-10" onClick={onClose}>
        <X className="h-5 w-5" />
      </Button>

      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-black">
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
              style={{ filter: FILTERS[selectedFilter].filter }}
            />

            {selectedFrame > 0 && FRAMES[selectedFrame].src && (
              <div className="absolute inset-0 pointer-events-none">
                <Image
                  src={FRAMES[selectedFrame].src! || "/placeholder.svg"}
                  alt="Frame"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              <Button
                size="icon"
                className="h-12 w-12 rounded-full bg-white/80 text-pink-600 hover:bg-white"
                onClick={capturePhoto}
              >
                <Camera className="h-6 w-6" />
              </Button>

              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 rounded-full bg-white/80 text-pink-600 hover:bg-white"
                onClick={switchCamera}
              >
                <RefreshCw className="h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <img
              src={capturedImage || "/placeholder.svg"}
              alt="Captured selfie"
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              <Button variant="outline" className="bg-white/80 text-pink-600 hover:bg-white" onClick={retakePhoto}>
                Retake
              </Button>

              <Button className="bg-pink-500 hover:bg-pink-600" onClick={downloadPhoto}>
                <Download className="mr-2 h-4 w-4" /> Save
              </Button>
            </div>
          </>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {!capturedImage && (
        <>
          {/* Filter options */}
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-pink-600">Filters:</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {FILTERS.map((filter, index) => (
                <button
                  key={filter.name}
                  className={`flex-shrink-0 rounded-md px-3 py-1 text-sm ${
                    selectedFilter === index ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                  }`}
                  onClick={() => setSelectedFilter(index)}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          {/* Frame options */}
          <div className="mt-3">
            <p className="mb-2 text-sm font-medium text-pink-600">Frames:</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {FRAMES.map((frame, index) => (
                <button
                  key={frame.name}
                  className={`flex-shrink-0 rounded-md px-3 py-1 text-sm ${
                    selectedFrame === index ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                  }`}
                  onClick={() => setSelectedFrame(index)}
                >
                  {frame.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
