"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Star, Save } from "lucide-react";
import { CountryVotingCard } from "@/components/CountryVotingCard";
import { CategoryVoting } from "@/components/CategoryVoting";
import { ResultsPodium } from "@/components/ResultsPodium";
import { ResultsList } from "@/components/ResultsList";
import { CategoryResults } from "@/components/CategoryResults";
import { ShareOptions } from "@/components/ShareOptions";
import { DouzePointsAnimation } from "@/components/DouzePointsAnimation";
import { EurovisionHeader } from "@/components/EurovisionHeader";
import { useVotingSystem } from "@/hooks/useVotingSystem";
import { useResultsCard } from "@/hooks/useResultsCard";
import { useQRCode } from "@/hooks/useQRCode";
import { useURLShortener } from "@/hooks/useURLShortener";
import { COUNTRIES, THEMES } from "@/lib/constants";
import { sortCountriesByVotes, generateShareableLink, cn } from "@/lib/utils";
import type { VoteData } from "@/types";
import { toast } from "@/hooks/use-toast";

export default function Home() {
  const {
    isVoting,
    votes,
    categoryVotes,
    reactions,
    selectedCountry,
    currentTheme,
    showDouzePoints,
    douzePointsCountry,
    customCategories,
    newCategoryName,
    activeCategory,
    setSelectedCountry,
    setCurrentTheme,
    setNewCategoryName,
    setActiveCategory,
    handleVote,
    handleCategoryVote,
    handleReaction,
    saveVotes,
    finishVoting,
    startNewVote,
    addCustomCategory,
  } = useVotingSystem();

  const sortedCountries = sortCountriesByVotes(COUNTRIES, votes);
  const { canvasRef, generateResultCard, downloadResultCard } = useResultsCard(
    sortedCountries,
    votes
  );
  const { qrCanvasRef, generateQRCode } = useQRCode();
  const { shortenUrl } = useURLShortener();

  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [resultCardUrl, setResultCardUrl] = useState<string>("");

  useEffect(() => {
    const generateData = async () => {
      if (!isVoting) {
        const voteData: VoteData = {
          points: votes,
          categories: categoryVotes,
          reactions: reactions,
          theme: currentTheme,
          customCategories: customCategories,
        };

        // Generate QR code
        generateQRCode(voteData).then((url) => {
          if (url) setQrCodeUrl(url);
        });

        const cardUrl = await generateResultCard();
        if (cardUrl) setResultCardUrl(cardUrl);
      }
    };

    generateData();
  }, [
    isVoting,
    votes,
    categoryVotes,
    reactions,
    currentTheme,
    customCategories,
    generateQRCode,
    generateResultCard,
  ]);

  // Get current theme class
  const getCurrentThemeClass = () => {
    const theme = THEMES.find((t) => t.id === currentTheme);
    return theme ? theme.bgClass : THEMES[0].bgClass;
  };

  // Handle copy to clipboard
  const handleCopyLink = () => {
    const voteData: VoteData = {
      points: votes,
      categories: categoryVotes,
      reactions: reactions,
      theme: currentTheme,
      customCategories: customCategories,
    };

    navigator.clipboard.writeText(generateShareableLink(voteData));

    toast({
      title: "Link Copied",
      description: "Share this link with your friends!",
      duration: 3000,
    });
  };

  // Handle URL shortening
  const handleShortenUrl = async () => {
    const voteData: VoteData = {
      points: votes,
      categories: categoryVotes,
      reactions: reactions,
      theme: currentTheme,
      customCategories: customCategories,
    };

    return await shortenUrl(voteData);
  };

  return (
    <main className={cn("min-h-screen", getCurrentThemeClass())}>
      {/* Hidden canvas for result card and QR code generation */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <canvas ref={qrCanvasRef} style={{ display: "none" }} />

      {/* Douze Points Animation */}
      <DouzePointsAnimation
        show={showDouzePoints}
        countryId={douzePointsCountry}
        countries={COUNTRIES}
      />

      {/* Eurovision Header */}
      <EurovisionHeader />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {isVoting ? (
            <>
              {/* Voting Interface */}
              <Tabs defaultValue="points" className="mb-8">
                <TabsList className="grid w-full grid-cols-2 lg:w-1/2 lg:mx-auto mb-8 bg-[#2E0A4A] text-white rounded-md overflow-hidden border border-white/10">
                  <TabsTrigger
                    value="points"
                    className="data-[state=active]:bg-[#FF0066] data-[state=active]:text-white py-1"
                  >
                    Points
                  </TabsTrigger>
                  <TabsTrigger
                    value="categories"
                    className="data-[state=active]:bg-[#FF0066] data-[state=active]:text-white py-1"
                  >
                    Categories
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="points">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {COUNTRIES.map((country) => (
                      <CountryVotingCard
                        key={country.id}
                        country={country}
                        points={votes[country.id] || 0}
                        reaction={reactions[country.id]}
                        isSelected={selectedCountry === country.id}
                        onSelect={setSelectedCountry}
                        onVote={handleVote}
                        onReaction={handleReaction}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="categories">
                  <CategoryVoting
                    countries={COUNTRIES}
                    customCategories={customCategories}
                    categoryVotes={categoryVotes}
                    activeCategory={activeCategory}
                    newCategoryName={newCategoryName}
                    onCategorySelect={setActiveCategory}
                    onCategoryVote={handleCategoryVote}
                    onNewCategoryNameChange={setNewCategoryName}
                    onAddCategory={addCustomCategory}
                  />
                </TabsContent>
              </Tabs>

              <div className="flex justify-center gap-6 mt-8">
                <Button
                  variant="outline"
                  onClick={saveVotes}
                  className="bg-[#4A1073]/50 backdrop-blur-sm border border-white/20 hover:bg-[#4A1073] text-white hover:text-white rounded-md px-6 py-2"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Progress
                </Button>

                <Button
                  size="lg"
                  onClick={finishVoting}
                  disabled={Object.keys(votes).length === 0}
                  className="bg-[#FF0066] hover:bg-[#E6005C] text-white rounded-md px-8 py-6 text-lg font-medium shadow-lg shadow-[#FF0066]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF0066]/40"
                >
                  <Star className="mr-2 h-5 w-5" />
                  Finish Voting
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Results Interface */}
              <ShareOptions
                onNewVote={startNewVote}
                onCopyLink={handleCopyLink}
                onShortenUrl={handleShortenUrl}
                qrCodeUrl={qrCodeUrl}
                resultCardUrl={resultCardUrl}
                onDownloadCard={downloadResultCard}
              />

              {/* Results Podium */}
              <ResultsPodium
                topCountries={sortedCountries.slice(0, 3)}
                votes={votes}
                reactions={reactions}
              />

              {/* Results Tabs */}
              <Tabs defaultValue="points" className="mb-8">
                <TabsList className="grid w-full grid-cols-2 lg:w-1/2 lg:mx-auto mb-8 bg-[#2E0A4A] text-white rounded-md overflow-hidden border border-white/10">
                  <TabsTrigger
                    value="points"
                    className="data-[state=active]:bg-[#FF0066] data-[state=active]:text-white py-1"
                  >
                    Points
                  </TabsTrigger>
                  <TabsTrigger
                    value="categories"
                    className="data-[state=active]:bg-[#FF0066] data-[state=active]:text-white py-1"
                  >
                    Categories
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="points">
                  <ResultsList
                    countries={sortedCountries}
                    votes={votes}
                    reactions={reactions}
                  />
                </TabsContent>

                <TabsContent value="categories">
                  <CategoryResults
                    countries={COUNTRIES}
                    customCategories={customCategories}
                    categoryVotes={categoryVotes}
                    activeCategory={activeCategory}
                    onCategorySelect={setActiveCategory}
                  />
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
