"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { CountryVotingCardProps } from "@/types";
import { POINT_OPTIONS, EMOJI_REACTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CountryVotingCard({
  country,
  points,
  reaction,
  isSelected,
  onSelect,
  onVote,
  onReaction,
}: CountryVotingCardProps) {
  return (
    <Card
      className={cn(
        "bg-[#0D1535]/80 backdrop-blur-md border border-[#00C8EC]/15 shadow-lg rounded-md overflow-hidden transition-all duration-300",
        isSelected ? "ring-2 ring-[#E8007D] scale-105" : ""
      )}
      onClick={() => onSelect(country.id)}
    >
      <CardHeader className="bg-[#091028] text-white p-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <span className={`fi fi-${country.iso} fis text-3xl`}></span>
            <span className="text-white uppercase font-bold tracking-wider">
              {country.name}
            </span>
          </div>

          {/* Emoji Reaction */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10"
              >
                {reaction ? (
                  <span className="text-xl">{reaction}</span>
                ) : (
                  <span className="text-xs text-white/70">+</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 border border-white/10 bg-[#091028]">
              <div className="flex gap-2 flex-wrap">
                {EMOJI_REACTIONS.map((emoji) => (
                  <Button
                    key={emoji}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      onReaction(country.id, emoji);
                    }}
                  >
                    <span className="text-xl">{emoji}</span>
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {POINT_OPTIONS.map((pointValue) => (
            <Button
              key={pointValue}
              variant={points === pointValue ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onVote(country.id, pointValue);
              }}
              className={cn(
                "min-w-[40px] rounded-md transition-all duration-200",
                points === pointValue
                  ? "bg-[#E8007D] hover:bg-[#C5006A] border-0 text-white"
                  : "bg-[#0D1535]/50 border border-white/20 hover:bg-[#0D1535] text-white"
              )}
            >
              {pointValue}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
