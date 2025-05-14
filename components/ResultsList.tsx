// Results list component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import type { Country } from "@/types"
import { cn } from "@/lib/utils"

interface ResultsListProps {
  countries: Country[]
  votes: Record<string, number>
  reactions: Record<string, string>
}

export function ResultsList({ countries, votes, reactions }: ResultsListProps) {
  return (
    <Card className="bg-[#4A1073]/80 backdrop-blur-md border border-white/10 shadow-lg rounded-md overflow-hidden">
      <CardHeader className="bg-[#3D0D5F] border-b border-white/10 p-4">
        <CardTitle className="flex items-center gap-2 text-white uppercase tracking-wider">
          <Trophy className="h-5 w-5 text-[#FF0066]" />
          Full Results
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {countries.map((country, index) => {
            const countryPoints = votes[country.id] || 0

            return (
              <div
                key={country.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-md transition-all duration-300",
                  index < 3
                    ? "bg-[#4A1073]/50 border border-white/10 shadow-md"
                    : "hover:bg-[#4A1073]/30 border border-white/5",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md",
                      index === 0
                        ? "bg-[#FF0066] text-white"
                        : index === 1
                          ? "bg-[#4A1073] text-white"
                          : index === 2
                            ? "bg-[#2E0A4A] text-white"
                            : "bg-white/10 text-white",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="text-2xl mr-2">{country.flag}</span>
                  <span className="text-white font-medium uppercase tracking-wider">{country.name}</span>

                  {reactions[country.id] && <span className="text-xl ml-2">{reactions[country.id]}</span>}
                </div>
                <div className="flex items-center">
                  <span
                    className={cn(
                      "font-bold text-lg px-4 py-1 rounded-md",
                      countryPoints > 0 ? "bg-[#FF0066]/20 text-white" : "text-gray-400",
                    )}
                  >
                    {countryPoints} pts
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
