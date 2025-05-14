"use client"

// Custom hook for generating results card
import { useRef, useCallback } from "react"
import type { Country } from "@/types"
import { toast } from "@/hooks/use-toast"

export function useResultsCard(sortedCountries: Country[], votes: Record<string, number>) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateResultCard = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (!ctx) return null

      // Set canvas size
      canvas.width = 1200
      canvas.height = 630

      // Draw background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#7c3aed")
      gradient.addColorStop(1, "#c026d3")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw title
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 60px Arial"
      ctx.textAlign = "center"
      ctx.fillText("My Eurovision 2025 Votes", canvas.width / 2, 100)

      // Draw top 3 countries
      const top3 = sortedCountries.slice(0, 3)

      if (top3.length > 0) {
        // Draw podium background
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
        ctx.fillRect(canvas.width / 2 - 400, 400, 800, 180)

        // Draw countries
        top3.forEach((country, index) => {
          const x = canvas.width / 2 + (index - 1) * 250
          const y = 300

          // Save context state before drawing each country
          ctx.save()

          // Draw flag emoji (approximation)
          ctx.font = "120px Arial"
          ctx.fillStyle = "#ffffff"
          ctx.fillText(country.flag, x, y)

          // Draw country name
          ctx.font = "bold 30px Arial"
          ctx.fillStyle = "#ffffff"
          ctx.fillText(country.name, x, y + 80)

          // Draw points
          ctx.font = "bold 50px Arial"
          ctx.fillStyle = "#ffffff"
          ctx.fillText(`${votes[country.id] || 0} pts`, x, y + 140)

          // Draw position
          ctx.fillStyle = index === 0 ? "#ffd700" : index === 1 ? "#c0c0c0" : "#cd7f32"
          ctx.beginPath()
          ctx.arc(x, y - 140, 40, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = "#000000"
          ctx.font = "bold 40px Arial"
          ctx.fillText(`${index + 1}`, x, y - 125)

          // Restore context state after drawing each country
          ctx.restore()
        })
      }

      // Draw footer
      ctx.fillStyle = "#ffffff"
      ctx.font = "24px Arial"
      ctx.fillText("Created with Eurovision Voting App", canvas.width / 2, canvas.height - 50)

      return canvas.toDataURL("image/png")
    }

    return null
  }, [sortedCountries, votes])

  const downloadResultCard = useCallback(() => {
    const dataUrl = generateResultCard()
    if (dataUrl) {
      const link = document.createElement("a")
      link.download = "eurovision-votes.png"
      link.href = dataUrl
      link.click()

      toast({
        title: "Image Downloaded",
        description: "Your results card has been downloaded.",
        duration: 3000,
      })
    }
  }, [generateResultCard])

  return {
    canvasRef,
    generateResultCard,
    downloadResultCard,
  }
}
