"use client"

// Category voting component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { PlusCircle } from "lucide-react"
import type { Country, CustomCategory } from "@/types"
import { cn } from "@/lib/utils"

interface CategoryVotingProps {
  countries: Country[]
  customCategories: CustomCategory[]
  categoryVotes: Record<string, Record<string, number>>
  activeCategory: string | null
  newCategoryName: string
  onCategorySelect: (categoryId: string) => void
  onCategoryVote: (categoryId: string, countryId: string, points: number) => void
  onNewCategoryNameChange: (name: string) => void
  onAddCategory: () => void
}

export function CategoryVoting({
  countries,
  customCategories,
  categoryVotes,
  activeCategory,
  newCategoryName,
  onCategorySelect,
  onCategoryVote,
  onNewCategoryNameChange,
  onAddCategory,
}: CategoryVotingProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {customCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => onCategorySelect(category.id)}
            className={cn(
              "rounded-md uppercase tracking-wider px-4 py-2",
              activeCategory === category.id
                ? "bg-[#FF0066] hover:bg-[#E6005C] border-0 text-white"
                : "bg-[#4A1073]/50 border border-white/20 hover:bg-[#4A1073] text-white",
            )}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-3 justify-center mb-8">
        <Input
          placeholder="Add new category..."
          value={newCategoryName}
          onChange={(e) => onNewCategoryNameChange(e.target.value)}
          className="max-w-xs bg-[#4A1073]/50 border-white/20 text-white rounded-md"
        />
        <Button
          onClick={onAddCategory}
          disabled={!newCategoryName.trim()}
          className="bg-[#FF0066] hover:bg-[#E6005C] text-white rounded-md transition-all duration-200"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      {activeCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Card
              key={country.id}
              className="bg-[#4A1073]/80 backdrop-blur-md border border-white/10 shadow-lg rounded-md overflow-hidden"
            >
              <CardHeader className="bg-[#3D0D5F] text-white p-3 border-b border-white/10">
                <CardTitle className="flex items-center gap-3 text-base">
                  <span className="text-3xl">{country.flag}</span>
                  <span className="text-white uppercase tracking-wider">{country.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 uppercase text-sm">
                      {customCategories.find((c) => c.id === activeCategory)?.name}:
                    </span>
                    <span className="font-bold text-white bg-[#FF0066]/20 px-2 py-1 rounded-md">
                      {categoryVotes[activeCategory]?.[country.id] || 0}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[categoryVotes[activeCategory]?.[country.id] || 0]}
                    max={10}
                    step={1}
                    onValueChange={(value) => onCategoryVote(activeCategory, country.id, value[0])}
                    className="[&>span]:bg-[#FF0066]"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
