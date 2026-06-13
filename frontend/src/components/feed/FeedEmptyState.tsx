import { FileText } from "lucide-react";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";

interface FeedEmptyStateProps {
  hasFilter: boolean;
}

const FeedEmptyState = ({ hasFilter }: FeedEmptyStateProps) => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#1C1C28] border border-[#2A2A3E] flex items-center justify-center mb-5">
        <FileText className="w-7 h-7 text-[#606078]" />
      </div>
      <h3 className="text-lg font-semibold text-[#EEEEF5] mb-2">
        {hasFilter ? "No posts in this category" : "The wall is empty"}
      </h3>
      <p className="text-sm text-[#606078] max-w-xs mb-6">
        {hasFilter
          ? "Try selecting a different category or check back later."
          : "Be the first to share your truth. Your words might be exactly what someone needs to hear."}
      </p>
      {isAuthenticated && !hasFilter && (
        <button
          onClick={() => navigate("/write")}
          className="px-5 py-2 rounded-full bg-[#7C6FF7] hover:bg-[#6B5FE6] text-white text-sm font-medium transition-all"
        >
          Write a confession
        </button>
      )}
    </div>
  );
};

export default FeedEmptyState;
