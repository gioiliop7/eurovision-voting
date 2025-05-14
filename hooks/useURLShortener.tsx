"use client"

// Custom hook for URL shortening
import { useCallback } from "react"
import type { VoteData } from "@/types"
import { generateShareableLink } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

export function useURLShortener() {
  const shortenUrl = useCallback(async (voteData: VoteData) => {
    try {
      const shareableLink = generateShareableLink(voteData)
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(shareableLink)}`)
      const data = await response.text()

      toast({
        title: "URL Shortened",
        description: "Your shortened URL is ready to share!",
        duration: 3000,
      })

      return data
    } catch (error) {
      console.error("Error shortening URL:", error)

      toast({
        title: "Error",
        description: "Failed to shorten URL. Please try again.",
        variant: "destructive",
        duration: 3000,
      })

      throw error
    }
  }, [])

  return { shortenUrl }
}
