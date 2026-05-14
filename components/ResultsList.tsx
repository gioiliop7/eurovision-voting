// Results list component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import type { ResultsListProps } from "@/types";
import { cn } from "@/lib/utils";

export function ResultsList({ countries, votes, reactions }: ResultsListProps) {
  return (
    <Card className="bg-[#0D1535]/80 backdrop-blur-md border border-[#00C8EC]/15 shadow-lg rounded-md overflow-hidden">
      <CardHeader className="bg-[#091028] border-b border-white/10 p-4">
        <CardTitle className="flex items-center gap-2 text-white uppercase tracking-wider">
          <Trophy className="h-5 w-5 text-[#E8007D]" />
          Full Results
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {countries.map((country, index) => {
            const countryPoints = votes[country.id] || 0;

            return (
              <div
                key={country.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-md transition-all duration-300",
                  index < 3
                    ? "bg-[#0D1535]/50 border border-[#00C8EC]/15 shadow-md"
                    : "hover:bg-[#0D1535]/30 border border-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md",
                      index === 0
                        ? "bg-[#E8007D] text-white"
                        : index === 1
                        ? "bg-[#00C8EC] text-[#050A1E]"
                        : index === 2
                        ? "bg-[#5B21B6] text-white"
                        : "bg-white/10 text-white"
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className={`fi fi-${country?.iso} fis`}></span>
                  <span className="text-white font-medium uppercase tracking-wider">
                    {country.name}
                  </span>
                  {reactions[country.id] && (
                    <span className="text-xl ml-2">
                      {reactions[country.id]}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <span
                    className={cn(
                      "font-bold text-lg px-4 py-1 rounded-md",
                      countryPoints > 0
                        ? "bg-[#E8007D]/20 text-white"
                        : "text-gray-400"
                    )}
                  >
                    {countryPoints} pts
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
