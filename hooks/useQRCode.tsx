"use client"

// Custom hook for generating QR code
import { useRef, useCallback } from "react"
import QRCode from "qrcode"
import type { VoteData } from "@/types"
import { generateShareableLink } from "@/lib/utils"

export function useQRCode() {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null)

  const generateQRCode = useCallback(async (voteData: VoteData) => {
    if (qrCanvasRef.current) {
      try {
        const shareableLink = generateShareableLink(voteData)

        await QRCode.toCanvas(qrCanvasRef.current, shareableLink, {
          width: 200,
          margin: 1,
          color: {
            dark: "#7c3aed",
            light: "#ffffff",
          },
        })

        return qrCanvasRef.current.toDataURL()
      } catch (error) {
        console.error("Error generating QR code:", error)
        return null
      }
    }
    return null
  }, [])

  return {
    qrCanvasRef,
    generateQRCode,
  }
}
