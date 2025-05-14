"use client"

// Share options component
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, Copy, Download, QrCode, Share2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface ShareOptionsProps {
  onNewVote: () => void
  onCopyLink: () => void
  onShortenUrl: () => Promise<string>
  qrCodeUrl: string
  resultCardUrl: string
  onDownloadCard: () => void
}

export function ShareOptions({
  onNewVote,
  onCopyLink,
  onShortenUrl,
  qrCodeUrl,
  resultCardUrl,
  onDownloadCard,
}: ShareOptionsProps) {
  const [copied, setCopied] = useState(false)
  const [shortUrl, setShortUrl] = useState<string>("")

  const handleCopy = (text?: string) => {
    onCopyLink()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShortenUrl = async () => {
    try {
      const url = await onShortenUrl()
      setShortUrl(url)
    } catch (error) {
      console.error("Error shortening URL:", error)
    }
  }

  return (
    <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={onNewVote}
          className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-full px-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          New Vote
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-full"
            >
              <QrCode className="mr-2 h-4 w-4" />
              QR Code
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#3D0D5F] border border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Share Your Results</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center p-4">
              {qrCodeUrl && (
                <div className="bg-white p-4 rounded-lg mb-4">
                  <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code" width={200} height={200} />
                </div>
              )}
              <p className="text-center text-sm text-white/70 mb-4">Scan this QR code to view these results</p>
              <Button onClick={() => handleCopy()} className="w-full bg-[#FF0066] hover:bg-[#E6005C] text-white">
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Result Card
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-[#3D0D5F] border border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Share Your Results</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center p-4">
              <div className="bg-white p-2 rounded-lg mb-4 max-w-full overflow-hidden">
                <img
                  src={resultCardUrl || ""}
                  alt="Results Card"
                  className="max-w-full h-auto rounded"
                  style={{ maxHeight: "300px" }}
                />
              </div>
              <Button onClick={onDownloadCard} className="w-full bg-[#FF0066] hover:bg-[#E6005C] text-white">
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              className={cn(
                "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full px-6 transition-all duration-300",
                copied ? "bg-green-500" : "",
              )}
            >
              <Share2 className="mr-2 h-4 w-4" />
              {copied ? "Copied!" : "Share Results"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-[#3D0D5F] border border-white/10 text-white">
            <div className="space-y-4">
              <h4 className="font-medium">Share Options</h4>
              <div className="space-y-3">
                <Button onClick={() => handleCopy()} className="w-full bg-[#FF0066] hover:bg-[#E6005C] text-white">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Full Link
                </Button>
                <Button onClick={handleShortenUrl} className="w-full bg-[#FF0066] hover:bg-[#E6005C] text-white">
                  <Share2 className="mr-2 h-4 w-4" />
                  Get Short URL
                </Button>
                {shortUrl && (
                  <div className="flex items-center gap-2 mt-2 p-3 bg-[#2E0A4A] rounded-md border border-white/10">
                    <code className="text-sm flex-1 overflow-x-auto text-white">{shortUrl}</code>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        navigator.clipboard.writeText(shortUrl)
                        toast({
                          title: "Copied",
                          description: "Short URL copied to clipboard",
                          duration: 3000,
                        })
                      }}
                      className="h-8 w-8 bg-white/5 hover:bg-white/10"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
