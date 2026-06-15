import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import logo from "@/assets/logo.png";
import {
  House,
  Bell,
  User,
  Shield,
} from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

const navItems = [
  { icon: House, label: "Feed", path: "/feed" },
  { icon: Bell, label: "Notifications", path: "/notifications", requireAuth: true, isNotification: true },
  { icon: User, label: "Profile", path: "/profile", requireAuth: true },
  { icon: Shield, label: "Admin", path: "/admin", requireAuth: true, isAdmin: true },
];

const FeedSidebar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { data: notificationData } = useNotifications();
  const unreadCount = notificationData?.unreadCount ?? 0;

  return (
    <aside className="hidden lg:flex flex-col w-[220px] flex-shrink-0 sticky top-0 h-screen py-6 pr-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 px-3 mb-10">
        <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
        <div>
          <span className="font-bold text-base tracking-tight text-[#EEEEF5]">
            Truth<span className="text-[#7C6FF7]">Wall</span>
          </span>
          <p className="text-[10px] text-[#606078] leading-none">Digital Confessional</p>
        </div>
      </Link>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          if (item.requireAuth && !isAuthenticated) return null;
          if (item.isAdmin && user?.role !== "admin") return null;
          const Icon = item.icon;
          const isActive = window.location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${isActive
                  ? "text-[#EEEEF5] bg-[#1C1C28]"
                  : "text-[#A0A0B8] hover:text-[#EEEEF5] hover:bg-[#1C1C28]/50"
                }`}
            >
              <div className="flex items-center gap-3">
                {isActive && (
                  <span className="absolute left-0 w-[3px] h-4 rounded-r-full bg-[#7C6FF7]" />
                )}
                <Icon className={`w-[18px] h-[18px] ${isActive ? "text-[#7C6FF7]" : ""}`} />
                {item.label}
              </div>

              {item.isNotification && unreadCount > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#7C6FF7] text-[10px] font-bold text-white transition-transform group-hover:scale-110">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* New Confession button */}
      {isAuthenticated && (
        <button
          onClick={() => navigate("/write")}
          className="mx-3 mb-4 py-2.5 rounded-full bg-[#7C6FF7] hover:bg-[#6B5FE6] text-white text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#7C6FF7]/20"
        >
          New Confession
        </button>
      )}

      {/* User badge */}
      {isAuthenticated && user ? (
        <div className="mx-3 flex items-center gap-2.5 bg-[#12121A] border border-[#2A2A3E] rounded-xl px-3 py-2.5">
          <div className="w-8 h-8 rounded-full bg-[#7C6FF7]/20 border border-[#7C6FF7]/30 flex items-center justify-center text-xs font-bold text-[#7C6FF7]">
            {user.alias.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#EEEEF5] truncate">{user.alias}</p>
            <p className="text-[10px] text-[#606078]">♡ Empathy: {user.empathyScore.toLocaleString()}</p>
          </div>
        </div>
      ) : (
        <div className="mx-3 flex flex-col gap-2">
          <button
            onClick={() => navigate("/auth")}
            className="w-full py-2.5 rounded-full bg-[#7C6FF7] hover:bg-[#6B5FE6] text-white text-sm font-semibold transition-all"
          >
            Sign In
          </button>
          <p className="text-[10px] text-[#606078] text-center">Sign in to post & react</p>
        </div>
      )}
    </aside>
  );
};

export default FeedSidebar;
