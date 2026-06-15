import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transforms based on mouse position
  const heroX = useTransform(smoothX, [-500, 500], [-5, 5]);
  const heroY = useTransform(smoothY, [-500, 500], [-5, 5]);
  const cardX = useTransform(smoothX, [-500, 500], [-10, 10]);
  const cardY = useTransform(smoothY, [-500, 500], [-10, 10]);
  const orbX = useTransform(smoothX, [-500, 500], [-20, 20]);
  const orbY = useTransform(smoothY, [-500, 500], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = clientX - window.innerWidth / 2;
      const y = clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleCTA = () => {
    if (isAuthenticated) {
      navigate("/feed");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary relative overflow-x-hidden scrollbar-hide">
      {/* Animated Background Red Orb with Parallax */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, 50, 100, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: Math.random() * 0.3,
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%" 
            }}
            animate={{
              y: ["0%", "-10%"],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-1 h-1 bg-white rounded-full bg-primary/20"
          />
        ))}
      </div>

      <div className="relative z-10">
        <LandingNavbar onGetStarted={handleCTA} />
        
        <motion.div style={{ x: heroX, y: heroY }}>
          <LandingHero onCTA={handleCTA} />
        </motion.div>

        <motion.div style={{ x: cardX, y: cardY }}>
          <LandingSamplePosts onCTA={handleCTA} />
        </motion.div>

        <LandingFeatures />
        <LandingFooterCTA onCTA={handleCTA} />
      </div>
    </div>
  );
};

export default LandingPage;
