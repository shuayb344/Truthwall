import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

interface LandingNavbarProps {
  onGetStarted: () => void;
}

const LandingNavbar = ({ onGetStarted }: LandingNavbarProps) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#2A2A3E] bg-[#0A0A0F]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
          <span className="font-bold text-xl tracking-tight">
            Truth<span className="text-[#7C6FF7]">Wall</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/auth")}
            className="text-sm text-[#A0A0B8] hover:text-[#EEEEF5] transition-colors"
          >
            Sign in
          </button>
          <button
            onClick={onGetStarted}
            className="text-sm px-4 py-2 rounded-full bg-[#7C6FF7] hover:bg-[#6B5FE6] text-white transition-colors"
          >
            Get started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
