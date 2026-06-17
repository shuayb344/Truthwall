import { Link, useNavigate, useLocation } from "react-router-dom";
import { House, PenSquare, Bell, User, LogIn, LogOut, Shield } from "lucide-react";
import useAuthStore from "@/store/authStore";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import logo from "@/assets/logo.png";

const FeedMobileNav = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const scrollDirection = useScrollDirection();

  const isActive = (path: string) => location.pathname === path;
  const isAdmin = user?.role === "admin";
  const isHidden = scrollDirection === "down";

  return (
    <>
      {/* Top bar - mobile only */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 border-b border-[#2A2A2A] bg-[#080808]/90 backdrop-blur-md transition-transform duration-300 ${isHidden ? "-translate-y-full" : "translate-y-0"}`}>
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="flex items-center gap-1.5">
            <img src={logo} alt="Logo" className="w-7 h-7 rounded-lg object-contain" />
            <span className="font-heading text-text-aliasase text-[#F5F5F5]">
              Truth<span className="text-[#E03030]">Wall</span>
            </span>
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/notifications")}
                className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center"
              >
                <Bell className="w-4 h-4 text-[#999999]" />
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/auth");
                }}
                className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-rose-500/70"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E03030] text-white text-xs font-medium"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Bottom bar - mobile only */}
      <nav className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[#2A2A2A] bg-[#080808]/90 backdrop-blur-md transition-transform duration-300 ${isHidden ? "translate-y-full" : "translate-y-0"}`}>
        <div className="flex items-center justify-around h-14">
          <button
            onClick={() => navigate("/feed")}
            className={`flex flex-col items-center gap-0.5 transition-colors ${isActive("/feed") ? "text-[#E03030]" : "text-[#555555]"}`}
          >
            <House className="w-5 h-5" />
            <span className="text-[10px]">Feed</span>
          </button>
          {isAuthenticated && (
            <button
              onClick={() => navigate("/write")}
              className={`flex items-center justify-center w-11 h-11 -mt-5 rounded-full shadow-lg transition-all ${isActive("/write") ? "bg-[#FF6B6B] scale-110" : "bg-[#E03030] shadow-[#E03030]/30"}`}
            >
              <PenSquare className="w-5 h-5 text-white" />
            </button>
          )}
          {isAuthenticated && isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className={`flex flex-col items-center gap-0.5 transition-colors ${isActive("/admin") ? "text-[#E03030]" : "text-[#555555]"}`}
            >
              <Shield className="w-5 h-5" />
              <span className="text-[10px]">Admin</span>
            </button>
          )}
          {isAuthenticated ? (
            <button
              onClick={() => navigate("/profile")}
              className={`flex flex-col items-center gap-0.5 transition-colors ${isActive("/profile") ? "text-[#E03030]" : "text-[#555555]"}`}
            >
              <User className="w-5 h-5" />
              <span className="text-[10px]">Profile</span>
            </button>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className={`flex flex-col items-center gap-0.5 transition-colors ${isActive("/auth") ? "text-[#E03030]" : "text-[#555555]"}`}
            >
              <LogIn className="w-5 h-5" />
              <span className="text-[10px]">Sign In</span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default FeedMobileNav;
