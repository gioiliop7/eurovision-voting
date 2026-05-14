// Store all constants used across the application
import type { Country, Theme } from "@/types";

// Eurovision2026 FINAL countries - Vienna Grand Final
export const COUNTRIES: Country[] = [
  { id: "albania", name: "Albania", iso: "al" },
  { id: "australia", name: "Australia", iso: "au" },
  { id: "austria", name: "Austria", iso: "at" },
  { id: "belgium", name: "Belgium", iso: "be" },
  { id: "bulgaria", name: "Bulgaria", iso: "bg" },
  { id: "croatia", name: "Croatia", iso: "hr" },
  { id: "cyprus", name: "Cyprus", iso: "cy" },
  { id: "czechia", name: "Czechia", iso: "cz" },
  { id: "denmark", name: "Denmark", iso: "dk" },
  { id: "finland", name: "Finland", iso: "fi" },
  { id: "france", name: "France", iso: "fr" },
  { id: "germany", name: "Germany", iso: "de" },
  { id: "greece", name: "Greece", iso: "gr" },
  { id: "israel", name: "Israel", iso: "il" },
  { id: "italy", name: "Italy", iso: "it" },
  { id: "lithuania", name: "Lithuania", iso: "lt" },
  { id: "malta", name: "Malta", iso: "mt" },
  { id: "moldova", name: "Moldova", iso: "md" },
  { id: "norway", name: "Norway", iso: "no" },
  { id: "poland", name: "Poland", iso: "pl" },
  { id: "romania", name: "Romania", iso: "ro" },
  { id: "serbia", name: "Serbia", iso: "rs" },
  { id: "sweden", name: "Sweden", iso: "se" },
  { id: "ukraine", name: "Ukraine", iso: "ua" },
  { id: "united_kingdom", name: "United Kingdom", iso: "gb" },
];

// Available themes - Eurovision2026 Vienna
export const THEMES: Theme[] = [
  {
    id: "eurovision2025",
    name: "Eurovision 2026 Vienna",
    bgClass: "bg-gradient-to-br from-[#050A1E] via-[#0D1535] to-[#050A1E]",
  },
  {
    id: "eurovisionMagenta",
    name: "Magenta Night",
    bgClass: "bg-gradient-to-br from-[#1A0030] via-[#2D0055] to-[#1A0030]",
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
