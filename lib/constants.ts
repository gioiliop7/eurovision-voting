// Store all constants used across the application
import type { Country, Theme } from "@/types"

// Eurovision 2024 countries
export const COUNTRIES: Country[] = [
  { id: "albania", name: "Albania", flag: "🇦🇱" },
  { id: "armenia", name: "Armenia", flag: "🇦🇲" },
  { id: "australia", name: "Australia", flag: "🇦🇺" },
  { id: "austria", name: "Austria", flag: "🇦🇹" },
  { id: "azerbaijan", name: "Azerbaijan", flag: "🇦🇿" },
  { id: "belgium", name: "Belgium", flag: "🇧🇪" },
  { id: "croatia", name: "Croatia", flag: "🇭🇷" },
  { id: "cyprus", name: "Cyprus", flag: "🇨🇾" },
  { id: "czechia", name: "Czechia", flag: "🇨🇿" },
  { id: "denmark", name: "Denmark", flag: "🇩🇰" },
  { id: "estonia", name: "Estonia", flag: "🇪🇪" },
  { id: "finland", name: "Finland", flag: "🇫🇮" },
  { id: "france", name: "France", flag: "🇫🇷" },
  { id: "georgia", name: "Georgia", flag: "🇬🇪" },
  { id: "germany", name: "Germany", flag: "🇩🇪" },
  { id: "greece", name: "Greece", flag: "🇬🇷" },
  { id: "iceland", name: "Iceland", flag: "🇮🇸" },
  { id: "ireland", name: "Ireland", flag: "🇮🇪" },
  { id: "israel", name: "Israel", flag: "🇮🇱" },
  { id: "italy", name: "Italy", flag: "🇮🇹" },
  { id: "latvia", name: "Latvia", flag: "🇱🇻" },
  { id: "lithuania", name: "Lithuania", flag: "🇱🇹" },
  { id: "luxembourg", name: "Luxembourg", flag: "🇱🇺" },
  { id: "malta", name: "Malta", flag: "🇲🇹" },
  { id: "moldova", name: "Moldova", flag: "🇲🇩" },
  { id: "netherlands", name: "Netherlands", flag: "🇳🇱" },
  { id: "norway", name: "Norway", flag: "🇳🇴" },
  { id: "poland", name: "Poland", flag: "🇵🇱" },
  { id: "portugal", name: "Portugal", flag: "🇵🇹" },
  { id: "romania", name: "Romania", flag: "🇷🇴" },
  { id: "serbia", name: "Serbia", flag: "🇷🇸" },
  { id: "slovenia", name: "Slovenia", flag: "🇸🇮" },
  { id: "spain", name: "Spain", flag: "🇪🇸" },
  { id: "sweden", name: "Sweden", flag: "🇸🇪" },
  { id: "switzerland", name: "Switzerland", flag: "🇨🇭" },
  { id: "ukraine", name: "Ukraine", flag: "🇺🇦" },
  { id: "united_kingdom", name: "United Kingdom", flag: "🇬🇧" },
]

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
  { id: "retro", name: "Retro 80s", bgClass: "bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-800" },
  { id: "dark", name: "Elegant Dark", bgClass: "bg-gradient-to-br from-gray-900 via-gray-800 to-black" },
]

// Emoji reactions
export const EMOJI_REACTIONS = ["❤️", "🔥", "👏", "✨", "🎵", "🎤", "🎸", "🥳", "🤩", "😍"]

// Point options
export const POINT_OPTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12]

// Default custom categories
export const DEFAULT_CATEGORIES = [
  { id: "staging", name: "Staging & Performance" },
  { id: "vocals", name: "Vocal Performance" },
  { id: "costume", name: "Costume & Styling" },
]
