"use client"

import { useEffect, useState } from "react"
import { Quote } from "lucide-react"

const loveQuotes = [
  "Cinta itu seperti angin, tidak dapat dilihat tetapi dapat dirasakan.",
  "Aku mencintaimu bukan karena siapa dirimu, melainkan karena siapa diriku saat bersamamu.",
  "Cinta tidak perlu sempurna, cukup tulus dan setia.",
  "Cinta sejati adalah ketika dua jiwa saling menyentuh dan memahami tanpa kata-kata.",
  "Mencintaimu adalah hal termudah yang pernah kulakukan.",
  "Kamu adalah alasan mengapa aku tersenyum setiap hari.",
  "Bersamamu, setiap hari terasa seperti petualangan baru.",
  "Cinta adalah ketika kebahagiaan orang lain lebih penting daripada kebahagiaanmu sendiri.",
  "Aku ingin menghabiskan sisa hidupku dengan mengenal kamu setiap hari.",
  "Kamu adalah rumah yang selalu ingin kembali.",
  "Cinta tidak mengenal jarak, karena cinta ada di hati.",
  "Mencintaimu adalah keputusan terbaik yang pernah kubuat.",
]

export default function RandomQuote() {
  const [quote, setQuote] = useState("")

  useEffect(() => {
    // Select random quote on mount
    const randomIndex = Math.floor(Math.random() * loveQuotes.length)
    setQuote(loveQuotes[randomIndex])
  }, [])

  return (
    <div className="flex flex-col items-center">
      <Quote className="mb-4 h-8 w-8 text-pink-400" />
      <p className="font-serif text-xl italic text-pink-700">{quote}</p>
    </div>
  )
}
