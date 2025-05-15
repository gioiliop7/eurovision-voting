// Store all constants used across the application
import type { Country, Theme } from "@/types";

// Eurovision 2025 FINAL countries
export const COUNTRIES: Country[] = [
  { id: "albania", name: "Albania", iso: "al" },
  { id: "armenia", name: "Armenia", iso: "am" },
  { id: "austria", name: "Austria", iso: "at" },
  { id: "denmark", name: "Denmark", iso: "dk" },
  { id: "estonia", name: "Estonia", iso: "ee" },
  { id: "finland", name: "Finland", iso: "fi" },
  { id: "france", name: "France", iso: "fr" },
  { id: "germany", name: "Germany", iso: "de" },
  { id: "greece", name: "Greece", iso: "gr" },
  { id: "iceland", name: "Iceland", iso: "is" },
  { id: "israel", name: "Israel", iso: "il" },
  { id: "italy", name: "Italy", iso: "it" },
  { id: "latvia", name: "Latvia", iso: "lv" },
  { id: "lithuania", name: "Lithuania", iso: "lt" },
  { id: "luxembourg", name: "Luxembourg", iso: "lu" },
  { id: "malta", name: "Malta", iso: "mt" },
  { id: "netherlands", name: "Netherlands", iso: "nl" },
  { id: "norway", name: "Norway", iso: "no" },
  { id: "poland", name: "Poland", iso: "pl" },
  { id: "portugal", name: "Portugal", iso: "pt" },
  { id: "spain", name: "Spain", iso: "es" },
  { id: "sweden", name: "Sweden", iso: "se" },
  { id: "switzerland", name: "Switzerland", iso: "ch" },
  { id: "ukraine", name: "Ukraine", iso: "ua" },
  { id: "united_kingdom", name: "United Kingdom", iso: "gb" },
  { id: "san_marino", name: "San Marino", iso: "sm" },
];

// Available themes - updated for Eurovision 2025
export const THEMES: Theme[] = [
  {
    id: "eurovision2025",
    name: "Eurovision 2025",
    bgClass: "bg-gradient-to-br from-[#2E0A4A] via-[#4A1073] to-[#3D0D5F]",
  },
  {
    id: "eurovisionRed",
    name: "Eurovision Red",
    bgClass: "bg-gradient-to-br from-[#8A0303] via-[#B80000] to-[#8A0303]",
  },
  {
    id: "classic",
    name: "Classic Eurovision",
    bgClass: "bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900",
  },
  {
    id: "retro",
    name: "Retro 80s",
    bgClass: "bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-800",
  },
  {
    id: "dark",
    name: "Elegant Dark",
    bgClass: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
  },
];

// Emoji reactions
export const EMOJI_REACTIONS = [
  "❤️",
  "🔥",
  "👏",
  "✨",
  "🎵",
  "🎤",
  "🎸",
  "🥳",
  "🤩",
  "😍",
];

// Point options
export const POINT_OPTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12];

// Default custom categories
export const DEFAULT_CATEGORIES = [
  { id: "staging", name: "Staging & Performance" },
  { id: "vocals", name: "Vocal Performance" },
  { id: "costume", name: "Costume & Styling" },
];
