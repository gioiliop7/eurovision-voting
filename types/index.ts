// Define all types used across the application

export type VoteData = {
  points: Record<string, number>
  categories?: Record<string, Record<string, number>>
  reactions?: Record<string, string>
  theme?: string
  customCategories?: CustomCategory[]
}

export type Country = {
  id: string
  name: string
  flag: string
}

export type CustomCategory = {
  id: string
  name: string
}

export type Theme = {
  id: string
  name: string
  bgClass: string
}
