"use client"

import { useEffect, useRef } from "react"

interface Flower {
  x: number
  y: number
  size: number
  rotation: number
  speed: number
  opacity: number
  image: HTMLImageElement
}

export default function FlowerBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create flower images
    const flowerImages: HTMLImageElement[] = []
    const flowerTypes = 3

    for (let i = 0; i < flowerTypes; i++) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = `/flowers/flower${i + 1}.png`
      flowerImages.push(img)
    }

    // Create initial flowers
    const flowers: Flower[] = []
    const flowerCount = Math.min(Math.floor(window.innerWidth / 100), 15)

    const createFlower = () => {
      // Make sure we have at least one valid image
      if (flowerImages.length === 0) {
        // Create a fallback image if no images are available
        const fallbackImg = new Image()
        fallbackImg.src = "/placeholder.svg?height=30&width=30"
        flowerImages.push(fallbackImg)
      }

      const randomIndex = Math.floor(Math.random() * flowerImages.length)
      const randomImage = flowerImages[randomIndex] || flowerImages[0]

      return {
        x: Math.random() * canvas.width,
        y: -50 - Math.random() * 100,
        size: 20 + Math.random() * 30,
        rotation: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.6 + Math.random() * 0.4,
        image: randomImage,
      }
    }

    // Initialize flowers
    for (let i = 0; i < flowerCount; i++) {
      flowers.push({
        ...createFlower(),
        y: Math.random() * canvas.height, // Distribute initially across screen
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw flowers
      flowers.forEach((flower, index) => {
        // Update position
        flower.y += flower.speed
        flower.rotation += 0.005

        // Reset if off screen
        if (flower.y > canvas.height + 50) {
          flowers[index] = createFlower()
        }

        // Draw flower
        ctx.save()
        ctx.translate(flower.x, flower.y)
        ctx.rotate(flower.rotation)
        ctx.globalAlpha = flower.opacity

        // Only draw if image is loaded and valid
        if (flower.image && flower.image.complete && flower.image.naturalWidth > 0) {
          ctx.drawImage(flower.image, -flower.size / 2, -flower.size / 2, flower.size, flower.size)
        }

        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    // Start animation when images are loaded
    Promise.all(
      flowerImages.map((img) => {
        return new Promise((resolve) => {
          if (img.complete) resolve(null)
          else img.onload = () => resolve(null)
        })
      }),
    ).then(() => {
      animate()
    })

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed left-0 top-0 h-full w-full pointer-events-none" />
}
