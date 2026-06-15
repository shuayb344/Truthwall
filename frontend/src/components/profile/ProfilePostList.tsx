import { useRef, useCallback } from "react";
import PostCard from "@/components/feed/PostCard";
import PostCardSkeleton from "@/components/feed/PostCardSkeleton";
import { Loader2, FileText, Bookmark } from "lucide-react";
import type { Post } from "@/types";

interface ProfilePostListProps {
  posts: Post[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  tab: "posts" | "bookmarks";
}

const ProfilePostList = ({
  posts,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  tab,
}: ProfilePostListProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { rootMargin: "200px" }
      );

      if (node) observerRef.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    const Icon = tab === "posts" ? FileText : Bookmark;
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#111111] border border-[#2A2A2A] flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-[#555555]" />
        </div>
        <p className="text-[#999999] mb-1 text-sm font-medium">
          {tab === "posts" ? "No truths shared yet" : "No bookmarks yet"}
        </p>
        <p className="text-xs text-[#555555]">
          {tab === "posts"
            ? "Your confessions will appear here"
            : "Posts you bookmark will appear here"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      <div ref={sentinelRef} />

      {isFetchingNextPage && (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-5 h-5 text-[#E03030] animate-spin" />
          <span className="ml-2 text-sm text-[#555555]">Loading more...</span>
        </div>
      )}

      {!hasNextPage && posts.length > 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-xs text-[#555555]">End of Truths</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePostList;
