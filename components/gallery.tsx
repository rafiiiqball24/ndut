"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleryImages = [
  {
    src: "/photos/photo1.jpg",
    alt: "Our first date",
    caption: "",
  },
  {
    src: "/photos/photo2.jpg",
    alt: "Beach vacation",
    caption: "",
  },
  {
    src: "/photos/photo3.jpg",
    alt: "Birthday celebration",
    caption: "",
  },
  {
    src: "/photos/photo4.jpg",
    alt: "Movie night",
    caption: "",
  },
  {
    src: "/photos/photo5.jpg",
    alt: "Hiking adventure",
    caption: "",
  },
  {
    src: "/photos/photo6.jpg",
    alt: "Dinner date",
    caption: "R",
  },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    if (direction === "prev") {
      setSelectedImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
    } else {
      setSelectedImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev! + 1))
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform hover:scale-[1.02]"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src || "/photos/photo1.jpg"}
              alt={image.alt || "Gallery image"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <p className="text-sm font-medium">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={() => navigateImage("prev")}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <div className="relative h-[80vh] w-[80vw] max-w-4xl">
            <Image
              src={galleryImages[selectedImage]?.src || "/placeholder.svg?height=400&width=600"}
              alt={galleryImages[selectedImage]?.alt || "Gallery image"}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-center text-white">
              <p>{galleryImages[selectedImage].caption}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={() => navigateImage("next")}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      )}
    </>
  )
}
