"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    try {
      // Create audio element
      audioRef.current = new Audio("/music/amin-paling-serius.mp3")
      audioRef.current.volume = volume
      audioRef.current.loop = true

      // Add error handling
      audioRef.current.onerror = (e) => {
        console.error("Audio error:", e)
        setIsPlaying(false)
      }
    } catch (error) {
      console.error("Error initializing audio:", error)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error)
        setIsPlaying(false)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!audioRef.current) return

    if (isMuted) {
      audioRef.current.volume = 0
    } else {
      audioRef.current.volume = volume
    }
  }, [isMuted, volume])

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (value[0] > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-pink-600 hover:bg-pink-100"
          onClick={() => setShowVolumeControl((prev) => !prev)}
          onMouseEnter={() => setShowVolumeControl(true)}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>

        {showVolumeControl && (
          <div
            className="absolute -left-24 bottom-full mb-2 rounded-lg bg-white p-3 shadow-lg"
            onMouseLeave={() => setShowVolumeControl(false)}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-pink-600">Volume</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-pink-600" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
              </Button>
            </div>
            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        )}

        <span className="text-xs font-medium text-pink-600">
          {isPlaying ? "Now Playing: Sal Priadi - Amin Paling Serius" : "Play Music"}
        </span>
      </div>
    </div>
  )
}
