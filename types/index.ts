export type VoteData = {
  points: Record<string, number>;
  categories?: Record<string, Record<string, number>>;
  reactions?: Record<string, string>;
  theme?: string;
  customCategories?: CustomCategory[];
};

export type Country = {
  id: string;
  name: string;
  flag?: string;
  iso?: string;
};

export type CustomCategory = {
  id: string;
  name: string;
};

export type Theme = {
  id: string;
  name: string;
  bgClass: string;
};

export interface CategoryResultsProps {
  countries: Country[];
  customCategories: CustomCategory[];
  categoryVotes: Record<string, Record<string, number>>;
  activeCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
}

export interface CategoryVotingProps {
  countries: Country[];
  customCategories: CustomCategory[];
  categoryVotes: Record<string, Record<string, number>>;
  activeCategory: string | null;
  newCategoryName: string;
  onCategorySelect: (categoryId: string) => void;
  onCategoryVote: (
    categoryId: string,
    countryId: string,
    points: number
  ) => void;
  onNewCategoryNameChange: (name: string) => void;
  onAddCategory: () => void;
}

export interface CountryVotingCardProps {
  country: Country;
  points: number;
  reaction?: string;
  isSelected: boolean;
  onSelect: (countryId: string) => void;
  onVote: (countryId: string, points: number) => void;
  onReaction: (countryId: string, emoji: string) => void;
}

export interface DouzePointsAnimationProps {
  show: boolean;
  countryId: string;
  countries: Country[];
}

export interface ResultsListProps {
  countries: Country[];
  votes: Record<string, number>;
  reactions: Record<string, string>;
}

export interface ResultsPodiumProps {
  topCountries: Country[];
  votes: Record<string, number>;
  reactions: Record<string, string>;
}

export interface ShareOptionsProps {
  onNewVote: () => void;
  onCopyLink: () => void;
  onShortenUrl: () => Promise<string>;
  qrCodeUrl: string;
  resultCardUrl: string;
  onDownloadCard: () => void;
}
