"use client";

// Custom hook for managing voting state and logic
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { VoteData, CustomCategory } from "@/types";
import { DEFAULT_CATEGORIES } from "@/lib/constants";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  triggerConfetti,
  safeBase64Encode,
  safeBase64Decode,
} from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export function useVotingSystem() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const votesParam = searchParams.get("votes");

  // State
  const [isVoting, setIsVoting] = useState(!votesParam);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [categoryVotes, setCategoryVotes] = useState<
    Record<string, Record<string, number>>
  >({});
  const [reactions, setReactions] = useState<Record<string, string>>({});
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>("eurovision");
  const [showDouzePoints, setShowDouzePoints] = useState<boolean>(false);
  const [douzePointsCountry, setDouzePointsCountry] = useState<string>("");
  const [customCategories, setCustomCategories] =
    useState<CustomCategory[]>(DEFAULT_CATEGORIES);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Load data from URL parameters
  useEffect(() => {
    if (votesParam) {
      try {
        const decodedData: VoteData = safeBase64Decode(votesParam);

        // Set points
        setVotes(decodedData.points || {});

        // Set categories if available
        if (decodedData.categories) {
          setCategoryVotes(decodedData.categories);
        }

        // Set reactions if available
        if (decodedData.reactions) {
          setReactions(decodedData.reactions);
        }

        // Set custom categories if available
        if (decodedData.customCategories) {
          setCustomCategories(decodedData.customCategories);
        }

        setIsVoting(false);
      } catch (e) {
        console.error("Failed to parse votes", e);
        setIsVoting(true);
      }
    }

    // Load from localStorage if available
    const savedData = loadFromLocalStorage();
    if (savedData && !votesParam && Object.keys(votes).length === 0) {
      setVotes(savedData.points || {});
      setCategoryVotes(savedData.categories || {});
      setReactions(savedData.reactions || {});

      if (savedData.customCategories) {
        setCustomCategories(savedData.customCategories);
      }

      toast({
        title: "Votes Restored",
        description: "Your previous voting data has been loaded.",
        duration: 3000,
      });
    }
  }, [votesParam]);

  // Show douze points animation
  useEffect(() => {
    if (showDouzePoints) {
      triggerConfetti();
      const timer = setTimeout(() => {
        setShowDouzePoints(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showDouzePoints]);

  // Handle voting
  const handleVote = (countryId: string, points: number) => {
    // Check if giving 12 points
    if (points === 12 && votes[countryId] !== 12) {
      setDouzePointsCountry(countryId);
      setShowDouzePoints(true);
    }

    setVotes((prev) => ({
      ...prev,
      [countryId]: points,
    }));
  };

  // Handle category voting
  const handleCategoryVote = (
    categoryId: string,
    countryId: string,
    points: number
  ) => {
    setCategoryVotes((prev) => ({
      ...prev,
      [categoryId]: {
        ...(prev[categoryId] || {}),
        [countryId]: points,
      },
    }));
  };

  // Handle reaction
  const handleReaction = (countryId: string, emoji: string) => {
    setReactions((prev) => ({
      ...prev,
      [countryId]: emoji,
    }));
  };

  // Save current votes
  const saveVotes = () => {
    const dataToSave: VoteData = {
      points: votes,
      categories: categoryVotes,
      reactions: reactions,
      theme: currentTheme,
      customCategories: customCategories,
    };

    saveToLocalStorage(dataToSave);
  };

  // Finish voting
  const finishVoting = () => {
    // Save to localStorage
    saveVotes();

    // Generate encoded data
    const dataToEncode: VoteData = {
      points: votes,
      categories: categoryVotes,
      reactions: reactions,
      theme: currentTheme,
      customCategories: customCategories,
    };

    const encodedData = safeBase64Encode(dataToEncode);
    router.push(`?votes=${encodedData}`);
    setIsVoting(false);
  };

  // Start new vote
  const startNewVote = () => {
    setVotes({});
    setCategoryVotes({});
    setReactions({});
    setIsVoting(true);
    router.push("/");
  };

  // Add custom category
  const addCustomCategory = () => {
    if (!newCategoryName.trim()) return;

    const categoryId = newCategoryName.toLowerCase().replace(/\s+/g, "_");

    setCustomCategories((prev) => [
      ...prev,
      { id: categoryId, name: newCategoryName },
    ]);
    setNewCategoryName("");

    toast({
      title: "Category Added",
      description: `"${newCategoryName}" has been added as a voting category.`,
      duration: 3000,
    });
  };

  return {
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
  };
}
