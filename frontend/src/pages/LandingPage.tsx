import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingHero from "@/components/landing/LandingHero";
import LandingSamplePosts from "@/components/landing/LandingSamplePosts";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingFooterCTA from "@/components/landing/LandingFooterCTA";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();



  const handleCTA = () => {
    if (isAuthenticated) {
      navigate("/feed");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#EEEEF5] overflow-x-hidden scrollbar-hide">
      <LandingNavbar onGetStarted={handleCTA} />
      <LandingHero onCTA={handleCTA} />
      <LandingSamplePosts onCTA={handleCTA} />
      <LandingFeatures />
      <LandingFooterCTA onCTA={handleCTA} />
    </div>
  );
};

export default LandingPage;
