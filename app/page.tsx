"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FlowerBackground from "@/components/flower-background"
import SelfieCamera from "@/components/selfie-camera"
import Timeline from "@/components/timeline"
import Gallery from "@/components/gallery"
import MusicPlayer from "@/components/music-player"
import RandomQuote from "@/components/random-quote"

export default function HomePage() {
  const [showCamera, setShowCamera] = useState(false)

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-pink-50 to-white">
      <FlowerBackground />

      <div className="container relative z-10 mx-auto max-w-4xl px-4 py-8">
        {/* Header Section */}
        <section className="mb-16 text-center">
          <div className="mb-6 inline-block rounded-full border-4 border-pink-200 p-1">
            <div className="relative h-48 w-48 overflow-hidden rounded-full md:h-64 md:w-64">
              <Image
                src="/girlfriend.jpg"
                alt="Your Girlfriend"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <h1 className="mb-4 font-serif text-4xl font-bold text-pink-600 md:text-5xl">For My Beloved</h1>

          <p className="mx-auto max-w-2xl text-lg text-pink-700">
            Ndutku sayang, tiap lihat senyum kamu, rasanya dunia ikut tenang—kamu itu rumah paling nyaman yang nggak pernah aku temuin sebelumnya. Nggak perlu banyak kata, cukup kamu tahu: aku sayang kamu, tiap hari, tanpa jeda, dan pelan-pelan kita bakal sampai di "amin paling serius" itu bareng-bareng.

          </p>

          <div className="mt-6 flex justify-center">
            <Button
              className="bg-pink-500 hover:bg-pink-600"
              onClick={() =>
                window.scrollTo({
                  top: document.getElementById("gallery")?.offsetTop,
                  behavior: "smooth",
                })
              }
            >
              <Heart className="mr-2 h-4 w-4" /> Explore Our Love
            </Button>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-pink-600">Our Beautiful Moments</h2>
            <p className="text-pink-400">Every picture tells a story of our love</p>
          </div>

          <Gallery />
        </section>

        {/* Random Quote */}
        <section className="mb-16">
          <Card className="border-pink-200 bg-pink-50/50 p-6 text-center shadow-md">
            <CardContent className="pt-6">
              <RandomQuote />
            </CardContent>
          </Card>
        </section>

        {/* Timeline Section */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-pink-600">Cerita Kita</h2>
            <p className="text-pink-400">The journey of our love story</p>
          </div>

          <Timeline />
        </section>

        {/* Selfie Camera Section */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-pink-600">Capture Our Love</h2>
            <p className="text-pink-400">Take a selfie with love-themed filters</p>
          </div>

          {showCamera ? (
            <SelfieCamera onClose={() => setShowCamera(false)} />
          ) : (
            <div className="flex justify-center">
              <Button className="bg-pink-500 hover:bg-pink-600" onClick={() => setShowCamera(true)}>
                <Camera className="mr-2 h-4 w-4" /> Open Camera
              </Button>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-pink-400">
          <p>Made with ❤️ just for you</p>
        </footer>
      </div>

      {/* Fixed Music Player */}
      <div className="fixed bottom-4 right-4 z-20">
        <MusicPlayer />
      </div>
    </main>
  )
}
