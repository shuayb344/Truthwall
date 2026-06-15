import { Star } from "lucide-react";
import type { ProfileStats } from "@/api/profileApi";

interface ProfileHeaderProps {
  profile: ProfileStats;
}

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const { user } = profile;
  const initials = user.alias.slice(0, 2).toUpperCase();

  return (
    <div className="flex flex-col items-center sm:items-start sm:flex-row gap-5 mb-6">
      {/* Avatar with glowing border */}
      <div className="relative">
        <div className="relative w-24 h-24 rounded-full bg-surface border-2 border-border-default flex items-center justify-center overflow-hidden">
          {user.avatarUrl && !user.avatarUrl.includes("gravatar.com") ? (
            <img
              src={user.avatarUrl}
              alt={user.alias}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-heading text-text-alias select-none">
              {initials}
            </span>
          )}
        </div>
      </div>

      {/* Name + empathy badge */}
      <div className="flex flex-col items-center sm:items-start gap-2 mt-1">
        <h1 className="text-2xl font-heading text-[#F5F5F5] tracking-tight font-mono">
          {user.alias}
        </h1>

        {/* Empathy score badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#E03030]/20 to-[#FF6B6B]/10 border border-[#E03030]/40">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-heading text-amber-300 tracking-wide uppercase">
            {user.empathyScore.toLocaleString()} Empathy Score
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
