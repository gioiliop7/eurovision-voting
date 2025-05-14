// Utility functions
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Country, VoteData } from "@/types"
import { toast } from "@/hooks/use-toast"

// Combine class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Sort countries by votes
export function sortCountriesByVotes(countries: Country[], votes: Record<string, number>): Country[] {
  return [...countries].sort((a, b) => {
    const pointsA = votes[a.id] || 0
    const pointsB = votes[b.id] || 0
    return pointsB - pointsA
  })
}

// Safe base64 encoding for Unicode strings
export function safeBase64Encode(data: any): string {
  // Convert the data to a JSON string
  const jsonString = JSON.stringify(data)

  // Use encodeURIComponent to handle Unicode characters
  const encodedData = encodeURIComponent(jsonString)

  // Convert to base64
  return btoa(encodedData)
}

// Safe base64 decoding for Unicode strings
export function safeBase64Decode(base64: string): any {
  try {
    // Decode from base64
    const encodedData = atob(base64)

    // Decode the URI component to get the original JSON string
    const jsonString = decodeURIComponent(encodedData)

    // Parse the JSON string
    return JSON.parse(jsonString)
  } catch (error) {
    console.error("Error decoding data:", error)
    throw error
  }
}

// Generate shareable link
export function generateShareableLink(data: VoteData): string {
  const encodedData = safeBase64Encode(data)
  return `${window.location.origin}?votes=${encodedData}`
}

// Save votes to localStorage
export function saveToLocalStorage(data: VoteData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("eurovisionVotes", JSON.stringify(data))

    toast({
      title: "Votes Saved",
      description: "Your voting data has been saved locally.",
      duration: 3000,
    })
  }
}

// Load votes from localStorage
export function loadFromLocalStorage(): VoteData | null {
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem("eurovisionVotes")
    if (savedData) {
      try {
        return JSON.parse(savedData)
      } catch (e) {
        console.error("Failed to load from localStorage", e)
      }
    }
  }
  return null
}

// Trigger confetti animation
export function triggerConfetti() {
  if (typeof window !== "undefined" && window.confetti) {
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }
}
