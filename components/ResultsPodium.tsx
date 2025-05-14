// Results podium component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Sparkles } from "lucide-react";
import type { ResultsPodiumProps } from "@/types";

export function ResultsPodium({
  topCountries,
  votes,
  reactions,
}: ResultsPodiumProps) {
  if (topCountries.length === 0) return null;

  return (
    <div className="relative flex flex-col md:flex-row gap-6 justify-center mb-12 mt-8 items-center md:items-end">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 w-full">
        <div className="flex justify-center">
          <Music className="h-8 w-8 text-[#FF0066] animate-bounce" />
        </div>
      </div>

      {/* Second Place */}
      {topCountries[1] && (
        <div className="relative w-full md:w-1/3 h-full">
          <Card className="bg-[#4A1073]/80 backdrop-blur-md border border-white/10 shadow-lg rounded-md overflow-hidden transform transition-all duration-500 hover:scale-105">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#4A1073]"></div>
            <CardHeader className="text-center pb-2 bg-gradient-to-b from-[#4A1073] to-[#3D0D5F] text-white border-b border-white/10">
              <CardTitle className="text-3xl text-white uppercase tracking-wider">
                🥈 2nd Place
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-8 bg-[#4A1073]/80">
              <div className="text-6xl mb-4 transform transition-all duration-300 hover:scale-110">
                {topCountries[1].flag}
              </div>
              <div className="text-xl font-bold text-white uppercase tracking-wider">
                {topCountries[1].name}
              </div>
              <div className="text-3xl font-bold mt-3 text-[#FF66A3]">
                {votes[topCountries[1].id] || 0} points
              </div>
              {reactions[topCountries[1].id] && (
                <div className="text-3xl mt-2">
                  {reactions[topCountries[1].id]}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* First Place */}
      {topCountries[0] && (
        <div className="relative w-full md:w-1/3 h-full md:mb-8 z-10">
          <Card className="bg-[#4A1073]/80 backdrop-blur-md border border-white/10 shadow-lg rounded-md overflow-hidden transform transition-all duration-500 hover:scale-105">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FF0066]"></div>
            <CardHeader className="text-center pb-2 bg-gradient-to-b from-[#FF0066] to-[#CC0052] text-white border-b border-white/10">
              <CardTitle className="text-4xl text-white uppercase tracking-wider flex justify-center items-center gap-2">
                <Sparkles className="h-6 w-6 text-white" />
                <span>🥇 Winner</span>
                <Sparkles className="h-6 w-6 text-white" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-10 bg-[#4A1073]/80">
              <div className="text-8xl mb-4 transform transition-all duration-300 hover:scale-110 hover:rotate-3">
                {topCountries[0].flag}
              </div>
              <div className="text-2xl font-bold text-white uppercase tracking-wider">
                {topCountries[0].name}
              </div>
              <div className="text-4xl font-bold mt-3 text-[#FF0066]">
                {votes[topCountries[0].id] || 0} points
              </div>
              {reactions[topCountries[0].id] && (
                <div className="text-4xl mt-2">
                  {reactions[topCountries[0].id]}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Third Place */}
      {topCountries[2] && (
        <div className="relative w-full md:w-1/3 h-full">
          <Card className="bg-[#4A1073]/80 backdrop-blur-md border border-white/10 shadow-lg rounded-md overflow-hidden transform transition-all duration-500 hover:scale-105">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#2E0A4A]"></div>
            <CardHeader className="text-center pb-2 bg-gradient-to-b from-[#2E0A4A] to-[#1F0733] text-white border-b border-white/10">
              <CardTitle className="text-3xl text-white uppercase tracking-wider">
                🥉 3rd Place
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-8 bg-[#4A1073]/80">
              <div className="text-6xl mb-4 transform transition-all duration-300 hover:scale-110">
                {topCountries[2].flag}
              </div>
              <div className="text-xl font-bold text-white uppercase tracking-wider">
                {topCountries[2].name}
              </div>
              <div className="text-3xl font-bold mt-3 text-[#FF66A3]">
                {votes[topCountries[2].id] || 0} points
              </div>
              {reactions[topCountries[2].id] && (
                <div className="text-3xl mt-2">
                  {reactions[topCountries[2].id]}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
