import { Heart, Users, Shield, Sparkles } from "lucide-react";
import type { ReactionType } from "@/types";

export const categoryConfig: Record<string, { label: string; color: string; bg: string }> = {
  "mental-health": { label: "Mental Health", color: "text-[#A855F7]", bg: "bg-[#A855F7]/10 border-[#A855F7]/20" },
  relationships: { label: "Relationships", color: "text-[#2DD4BF]", bg: "bg-[#2DD4BF]/10 border-[#2DD4BF]/20" },
  work: { label: "Workplace", color: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10 border-[#3B82F6]/20" },
  family: { label: "Family", color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10 border-[#F59E0B]/20" },
  identity: { label: "Identity", color: "text-[#FF6B6B]", bg: "bg-[#FF6B6B]/10 border-[#FF6B6B]/20" },
};

export const reactionConfig: { type: ReactionType; icon: typeof Heart; label: string; activeColor: string }[] = [
  { type: "feel_this", icon: Heart, label: "Feel This", activeColor: "text-[#E03030]" },
  { type: "not_alone", icon: Users, label: "Not Alone", activeColor: "text-[#3B82F6]" },
  { type: "stay_strong", icon: Shield, label: "Stay Strong", activeColor: "text-[#10B981]" },
  { type: "sending_strength", icon: Sparkles, label: "Sending Strength", activeColor: "text-[#A855F7]" },
];
