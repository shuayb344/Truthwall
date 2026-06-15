import { useState } from "react";
import { useProfileStats, useUserPosts, useUserBookmarks } from "@/hooks/useProfile";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStatsBar from "@/components/profile/ProfileStats";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfilePostList from "@/components/profile/ProfilePostList";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"posts" | "bookmarks">("posts");

  const { data: profile, isLoading: isStatsLoading } = useProfileStats();

  const {
    data: postsData,
    isLoading: isPostsLoading,
    isFetchingNextPage: isPostsFetchingNext,
    hasNextPage: postsHasNext,
    fetchNextPage: fetchNextPosts,
  } = useUserPosts();

  const {
    data: bookmarksData,
    isLoading: isBookmarksLoading,
    isFetchingNextPage: isBookmarksFetchingNext,
    hasNextPage: bookmarksHasNext,
    fetchNextPage: fetchNextBookmarks,
  } = useUserBookmarks();

  const posts = postsData?.pages.flatMap((page) => page.posts) ?? [];
  const bookmarks = bookmarksData?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className="px-5 py-6">
      {/* Profile header skeleton */}
      {isStatsLoading && (
        <div className="animate-pulse">
          <div className="flex flex-col items-center sm:items-start sm:flex-row gap-5 mb-6">
            <div className="w-24 h-24 rounded-full bg-[#1A1A1A]" />
            <div className="flex flex-col items-center sm:items-start gap-3 mt-1">
              <div className="h-7 w-48 bg-[#1A1A1A] rounded-lg" />
              <div className="h-7 w-56 bg-[#1A1A1A] rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-5 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-5">
                {i > 1 && <div className="w-px h-8 bg-[#2A2A2A]" />}
                <div className="text-center">
                  <div className="h-5 w-10 bg-[#1A1A1A] rounded mx-auto mb-1" />
                  <div className="h-3 w-16 bg-[#1A1A1A] rounded mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile header */}
      {profile && (
        <>
          <ProfileHeader profile={profile} />
          <ProfileStatsBar stats={profile.stats} />
        </>
      )}

      {/* Tabs */}
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Post lists */}
      {activeTab === "posts" ? (
        <ProfilePostList
          posts={posts}
          isLoading={isPostsLoading}
          isFetchingNextPage={isPostsFetchingNext}
          hasNextPage={postsHasNext}
          fetchNextPage={fetchNextPosts}
          tab="posts"
        />
      ) : (
        <ProfilePostList
          posts={bookmarks}
          isLoading={isBookmarksLoading}
          isFetchingNextPage={isBookmarksFetchingNext}
          hasNextPage={bookmarksHasNext}
          fetchNextPage={fetchNextBookmarks}
          tab="bookmarks"
        />
      )}
    </div>
  );
}