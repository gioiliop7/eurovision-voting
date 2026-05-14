"use client";

// Category voting component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { PlusCircle } from "lucide-react";
import type { CategoryVotingProps } from "@/types";
import { cn } from "@/lib/utils";

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
                ? "bg-[#E8007D] hover:bg-[#C5006A] border-0 text-white"
                : "bg-[#0D1535] hover:bg-[#E8007D] border border-white/20 text-white hover:text-white hover:border-0"
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
          className="max-w-xs bg-[#0D1535]/50 border-white/20 text-white rounded-md"
        />
        <Button
          onClick={onAddCategory}
          disabled={!newCategoryName.trim()}
          className="bg-[#E8007D] hover:bg-[#C5006A] text-white rounded-md transition-all duration-200"
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
              className="bg-[#0D1535]/80 backdrop-blur-md border border-[#00C8EC]/15 shadow-lg rounded-md overflow-hidden"
            >
              <CardHeader className="bg-[#091028] text-white p-3 border-b border-white/10">
                <CardTitle className="flex items-center gap-3 text-base">
                  <span className={`fi fi-${country.iso} fis text-3xl`}></span>
                  <span className="text-white uppercase tracking-wider">
                    {country.name}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 uppercase text-sm">
                      {
                        customCategories.find((c) => c.id === activeCategory)
                          ?.name
                      }
                      :
                    </span>
                    <span className="font-bold text-white bg-[#E8007D]/20 px-2 py-1 rounded-md">
                      {categoryVotes[activeCategory]?.[country.id] || 0}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[
                      categoryVotes[activeCategory]?.[country.id] || 0,
                    ]}
                    max={10}
                    step={1}
                    onValueChange={(value) =>
                      onCategoryVote(activeCategory, country.id, value[0])
                    }
                    className="[&>span]:bg-[#E8007D]"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
