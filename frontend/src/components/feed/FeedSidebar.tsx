import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import logo from "@/assets/logo.png";
import {
  House,
  Bell,
  User,
  Shield,
  LogOut,
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
  const { isAuthenticated, user, logout } = useAuthStore();
  const { data: notificationData } = useNotifications();
  const unreadCount = notificationData?.unreadCount ?? 0;

  return (
    <aside className="hidden lg:flex flex-col w-[220px] flex-shrink-0 sticky top-0 h-screen py-6 pr-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-1.5 px-3 mb-10 group">
        <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg object-contain transition-transform group-hover:scale-105" />
        <div>
          <span className="font-heading text-text-aliasase tracking-tight text-[#F5F5F5]">
            Truth<span className="text-[#E03030]">Wall</span>
          </span>
          <p className="text-[10px] text-[#555555] leading-none">Digital Confessional</p>
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
                  ? "text-[#F5F5F5] bg-[#1A1A1A]"
                  : "text-[#999999] hover:text-[#F5F5F5] hover:bg-[#1A1A1A]/50"
                }`}
            >
              <div className="flex items-center gap-3">
                {isActive && (
                  <span className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-[#E03030] to-transparent shadow-[0_0_8px_rgba(224,48,48,0.4)]" />
                )}
                <Icon className={`w-[18px] h-[18px] ${isActive ? "text-[#E03030]" : ""}`} />
                {item.label}
              </div>

              {item.isNotification && unreadCount > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#E03030] text-[10px] font-heading text-white transition-transform group-hover:scale-110">
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
          className="mx-3 mb-4 py-2.5 rounded-full bg-[#E03030] hover:bg-[#C42020] text-white text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#E03030]/20"
        >
          New Confession
        </button>
      )}

      {/* User badge */}
      {isAuthenticated && user ? (
        <div className="mx-3 flex items-center gap-2.5 bg-[#111111] border border-[#2A2A2A] rounded-xl px-3 py-2.5">
          <div className="w-8 h-8 rounded-full bg-[#E03030]/20 border border-[#E03030]/30 flex items-center justify-center text-xs font-heading text-[#E03030]">
            {user.alias.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#F5F5F5] truncate">{user.alias}</p>
            <p className="text-[10px] text-[#555555]">♡ Empathy: {user.empathyScore.toLocaleString()}</p>
          </div>
          <button 
            onClick={() => {
              logout();
              navigate("/auth");
            }}
            className="ml-auto p-1.5 rounded-lg text-[#555555] hover:text-rose-400 hover:bg-rose-500/10 transition-all"
            title="Log Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      ) : (
        <div className="mx-3 flex flex-col gap-2">
          <button
            onClick={() => navigate("/auth")}
            className="w-full py-2.5 rounded-full bg-[#E03030] hover:bg-[#C42020] text-white text-sm font-semibold transition-all"
          >
            Sign In
          </button>
          <p className="text-[10px] text-[#555555] text-center">Sign in to post & react</p>
        </div>
      )}
    </aside>
  );
};

export default FeedSidebar;
