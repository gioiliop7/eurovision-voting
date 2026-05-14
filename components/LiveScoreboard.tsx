"use client";

import { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, BarChart2 } from "lucide-react";
import { COUNTRIES } from "@/lib/constants";

interface LiveScoreboardProps {
  votes: Record<string, number>;
}

export function LiveScoreboard({ votes }: LiveScoreboardProps) {
  const [isOpen, setIsOpen] = useState(true);

  const sorted = useMemo(() => {
    return [...COUNTRIES]
      .map((c) => ({ ...c, points: votes[c.id] || 0 }))
      .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
  }, [votes]);

  const maxPoints = Math.max(...sorted.map((c) => c.points), 12);
  const hasVotes = sorted.some((c) => c.points > 0);

  return (
    <div
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-[224px]"
      }`}
    >
      {/* Toggle tab */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close scoreboard" : "Open scoreboard"}
        className="flex flex-col items-center justify-center w-8 h-20 bg-[#E8007D] rounded-l-xl text-white hover:bg-[#C5006A] transition-colors shadow-lg shadow-[#E8007D]/30 gap-1"
      >
        {isOpen ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
        <BarChart2 className="h-3 w-3 opacity-70" />
      </button>

      {/* Panel */}
      <div className="w-56 max-h-[80vh] bg-[#050A1E]/95 backdrop-blur-md border-l border-t border-b border-[#00C8EC]/20 rounded-l-xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-3 border-b border-white/10 flex-shrink-0">
          <BarChart2 className="h-4 w-4 text-[#E8007D]" />
          <span className="text-white text-xs font-bold uppercase tracking-widest">
            Live Score
          </span>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 px-3 py-2 space-y-2 scrollbar-thin">
          {!hasVotes && (
            <p className="text-white/30 text-[10px] text-center py-4 uppercase tracking-wider">
              No votes yet
            </p>
          )}
          {sorted.map((country, index) => {
            const pct = maxPoints > 0 ? (country.points / maxPoints) * 100 : 0;
            const isTop3 = index < 3 && country.points > 0;

            return (
              <div
                key={country.id}
                className="flex items-center gap-2 group"
              >
                {/* Rank */}
                <span
                  className={`text-[10px] font-bold w-4 text-right flex-shrink-0 transition-colors ${
                    index === 0 && country.points > 0
                      ? "text-[#E8007D]"
                      : index === 1 && country.points > 0
                      ? "text-[#00C8EC]"
                      : index === 2 && country.points > 0
                      ? "text-[#5B21B6]"
                      : "text-white/30"
                  }`}
                >
                  {index + 1}
                </span>

                {/* Flag */}
                <span
                  className={`fi fi-${country.iso} fis flex-shrink-0`}
                  style={{ fontSize: "14px", width: "20px", height: "14px" }}
                />

                {/* Bar + name */}
                <div className="flex-1 min-w-0">
                  <div className="text-white/70 text-[9px] truncate uppercase tracking-wide mb-[3px] group-hover:text-white transition-colors">
                    {country.name}
                  </div>
                  <div className="h-[5px] bg-white/8 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${pct}%`,
                        background: isTop3
                          ? "linear-gradient(to right, #E8007D, #5B21B6, #00C8EC)"
                          : "rgba(255,255,255,0.2)",
                      }}
                    />
                  </div>
                </div>

                {/* Points */}
                <span
                  className={`text-[11px] font-bold w-5 text-right flex-shrink-0 transition-all duration-300 ${
                    country.points > 0 ? "text-white" : "text-white/20"
                  }`}
                >
                  {country.points > 0 ? country.points : "·"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-3 py-2 border-t border-white/10 flex-shrink-0">
          <div className="w-full h-[2px] bg-gradient-to-r from-[#E8007D] via-[#5B21B6] to-[#00C8EC] rounded-full opacity-40" />
          <p className="text-white/25 text-[9px] text-center mt-1 uppercase tracking-widest">
            Vienna 2025
          </p>
        </div>
      </div>
    </div>
  );
}
