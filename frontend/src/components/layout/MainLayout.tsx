import { Outlet } from "react-router-dom";
import FeedSidebar from "@/components/feed/FeedSidebar";
import FeedRightSidebar from "@/components/feed/FeedRightSidebar";
import FeedMobileNav from "@/components/feed/FeedMobileNav";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <FeedMobileNav />

      <div className="max-w-[1400px] mx-auto flex">
        <FeedSidebar />

        <main className="flex-1 min-w-0 border-x border-border-default/50 pt-14 lg:pt-0">
          <Outlet />

          <div className="h-16 lg:h-0" />
        </main>

        <FeedRightSidebar />
      </div>
    </div>
  );
};

export default MainLayout;
