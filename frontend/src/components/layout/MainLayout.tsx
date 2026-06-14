import { Outlet } from "react-router-dom";
import FeedSidebar from "@/components/feed/FeedSidebar";
import FeedRightSidebar from "@/components/feed/FeedRightSidebar";
import FeedMobileNav from "@/components/feed/FeedMobileNav";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#EEEEF5]">
      <FeedMobileNav />

      <div className="max-w-[1400px] mx-auto flex">
        <FeedSidebar />

        <main className="flex-1 min-w-0 border-x border-[#2A2A3E]/50 pt-14 lg:pt-0">
          <Outlet />

          <div className="h-16 lg:h-0" />
        </main>

        <FeedRightSidebar />
      </div>
    </div>
  );
};

export default MainLayout;
