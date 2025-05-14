"use client"

// Category results component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Country, CustomCategory } from "@/types"
import { cn } from "@/lib/utils"

interface CategoryResultsProps {
  countries: Country[]
  customCategories: CustomCategory[]
  categoryVotes: Record<string, Record<string, number>>
  activeCategory: string | null
  onCategorySelect: (categoryId: string) => void
}

export function CategoryResults({
  countries,
  customCategories,
  categoryVotes,
  activeCategory,
  onCategorySelect,
}: CategoryResultsProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {customCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => onCategorySelect(category.id)}
            className={cn(
              "rounded-full px-4 py-2",
              activeCategory === category.id
                ? "bg-gradient-to-r from-pink-500 to-purple-600 border-0 text-white"
                : "bg-white/5 border border-white/20 hover:bg-white/10 text-white",
            )}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {activeCategory && (
        <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-xl rounded-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-white/10 p-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <Trophy className="h-5 w-5 text-yellow-300" />
              {customCategories.find((c) => c.id === activeCategory)?.name} Results
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {countries
                .sort((a, b) => {
                  const pointsA = categoryVotes[activeCategory]?.[a.id] || 0
                  const pointsB = categoryVotes[activeCategory]?.[b.id] || 0
                  return pointsB - pointsA
                })
                .map((country, index) => {
                  const categoryPoints = categoryVotes[activeCategory]?.[country.id] || 0

                  return (
                    <div
                      key={country.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl transition-all duration-300",
                        index < 3
                          ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 shadow-md"
                          : "hover:bg-white/5 border border-white/5",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium",
                            index === 0
                              ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black"
                              : index === 1
                                ? "bg-gradient-to-r from-gray-300 to-gray-400 text-black"
                                : index === 2
                                  ? "bg-gradient-to-r from-amber-700 to-amber-800 text-white"
                                  : "bg-white/10 text-white",
                          )}
                        >
                          {index + 1}
                        </span>
                        <span className="text-2xl mr-2">{country.flag}</span>
                        <span className="text-white font-medium">{country.name}</span>
                      </div>
                      <div className="flex items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
                                  style={{ width: `${categoryPoints * 10}%` }}
                                ></div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#3D0D5F] border border-white/10 text-white">
                              <p>{categoryPoints} / 10</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <span className="ml-3 font-bold text-white">{categoryPoints}</span>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
