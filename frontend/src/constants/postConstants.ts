import { Heart, Users, Shield, Sparkles } from "lucide-react";
import type { ReactionType } from "@/types";

export const categoryConfig: Record<string, { label: string; color: string; bg: string }> = {
  "mental-health": { label: "Mental Health", color: "text-violet-400", bg: "bg-violet-400/10 border-violet-400/20" },
  relationships: { label: "Relationships", color: "text-teal-400", bg: "bg-teal-400/10 border-teal-400/20" },
  work: { label: "Workplace", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  family: { label: "Family", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
  identity: { label: "Identity", color: "text-rose-400", bg: "bg-rose-400/10 border-rose-400/20" },
};

export const reactionConfig: { type: ReactionType; icon: typeof Heart; label: string; activeColor: string }[] = [
  { type: "feel_this", icon: Heart, label: "Feel This", activeColor: "text-rose-400" },
  { type: "not_alone", icon: Users, label: "Not Alone", activeColor: "text-blue-400" },
  { type: "stay_strong", icon: Shield, label: "Stay Strong", activeColor: "text-emerald-400" },
  { type: "sending_strength", icon: Sparkles, label: "Sending Strength", activeColor: "text-amber-400" },
];

