import { Link, useNavigate, useLocation } from "react-router-dom";
import { House, PenSquare, Bell, User, LogIn, LogOut } from "lucide-react";
import useAuthStore from "@/store/authStore";
import logo from "@/assets/logo.png";

const FeedMobileNav = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top bar - mobile only */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b border-[#2A2A3E] bg-[#0A0A0F]/90 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-7 h-7 rounded-lg object-contain" />
            <span className="font-bold text-base text-[#EEEEF5]">
              Truth<span className="text-[#7C6FF7]">Wall</span>
            </span>
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/notifications")}
                className="w-9 h-9 rounded-full bg-[#1C1C28] border border-[#2A2A3E] flex items-center justify-center"
              >
                <Bell className="w-4 h-4 text-[#A0A0B8]" />
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/auth");
                }}
                className="w-9 h-9 rounded-full bg-[#1C1C28] border border-[#2A2A3E] flex items-center justify-center text-rose-500/70"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7C6FF7] text-white text-xs font-medium"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Bottom bar - mobile only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[#2A2A3E] bg-[#0A0A0F]/90 backdrop-blur-md">
        <div className="flex items-center justify-around h-14">
          <button 
            onClick={() => navigate("/feed")} 
            className={`flex flex-col items-center gap-0.5 transition-colors ${isActive("/feed") ? "text-[#7C6FF7]" : "text-[#606078]"}`}
          >
            <House className="w-5 h-5" />
            <span className="text-[10px]">Feed</span>
          </button>
          {isAuthenticated && (
            <button
              onClick={() => navigate("/write")}
              className={`flex items-center justify-center w-11 h-11 -mt-5 rounded-full shadow-lg transition-all ${isActive("/write") ? "bg-[#9D8FFF] scale-110" : "bg-[#7C6FF7] shadow-[#7C6FF7]/30"}`}
            >
              <PenSquare className="w-5 h-5 text-white" />
            </button>
          )}
          {isAuthenticated ? (
            <button 
              onClick={() => navigate("/profile")} 
              className={`flex flex-col items-center gap-0.5 transition-colors ${isActive("/profile") ? "text-[#7C6FF7]" : "text-[#606078]"}`}
            >
              <User className="w-5 h-5" />
              <span className="text-[10px]">Profile</span>
            </button>
          ) : (
            <button 
              onClick={() => navigate("/auth")} 
              className={`flex flex-col items-center gap-0.5 transition-colors ${isActive("/auth") ? "text-[#7C6FF7]" : "text-[#606078]"}`}
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
