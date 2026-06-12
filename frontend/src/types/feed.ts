import type{ Category } from "./index";
export type SortMode = "latest" | "trending";
 
 
export interface CategoryMeta {
  value: Category | "all";
  label: string;
  emoji: string;
}
 
export const CATEGORIES: CategoryMeta[] = [
  { value: "all",           label: "All",          emoji: "✦"  },
  { value: "mental-health", label: "Mental Health", emoji: "🧠" },
  { value: "relationships", label: "Relationships", emoji: "💔" },
  { value: "work",          label: "Work",          emoji: "💼" },
  { value: "family",        label: "Family",        emoji: "🏠" },
  { value: "identity",      label: "Identity",      emoji: "🪞" },
];


