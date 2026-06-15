import { useState, useRef, useCallback } from "react";
import { useFeed } from "@/hooks/useFeed";
import FeedCategoryTabs from "@/components/feed/FeedCategoryTabs";
import FeedSortToggle from "@/components/feed/FeedSortToggle";
import PostCard from "@/components/feed/PostCard";
import PostCardSkeleton from "@/components/feed/PostCardSkeleton";
import FeedEmptyState from "@/components/feed/FeedEmptyState";
import { Loader2 } from "lucide-react";

const FeedPage = () => {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"latest" | "trending">("latest");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFeed({
    category: category === "all" ? undefined : category,
    sort,
  });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];


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

  return (
    <>
      {/* Feed header */}
      <div className="sticky top-14 lg:top-0 z-30 bg-[#080808]/80 backdrop-blur-md border-b border-[#2A2A2A]/50">
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-heading text-[#F5F5F5]">Home Feed</h1>
            <FeedSortToggle activeSort={sort} onSortChange={setSort} />
          </div>
          <FeedCategoryTabs
            activeCategory={category}
            onCategoryChange={setCategory}
          />
        </div>
      </div>

      {/* Posts list */}
      <div className="px-5 py-4 space-y-4">
        {isLoading && (
          <>
            {[1, 2, 3, 4].map((i) => (
              <PostCardSkeleton key={i} />
            ))}
          </>
        )}
        {isError && !isLoading && (
          <div className="flex flex-col items-center py-16 text-center">
            <p className="text-[#999999] mb-2">Something went wrong loading the feed.</p>
            <button
              onClick={() => window.location.reload()}
              className="text-sm text-[#E03030] hover:text-[#C42020] font-medium"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && posts.length === 0 && (
          <FeedEmptyState hasFilter={category !== "all"} />
        )}

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
            <p className="text-xs text-[#555555]">
              You've reached the end of the wall
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default FeedPage;