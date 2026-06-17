import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

interface LandingNavbarProps {
  onGetStarted: () => void;
}

const LandingNavbar = ({ onGetStarted }: LandingNavbarProps) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-default/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-1.5"
        >
          <img src={logo} alt="Logo" className="w-7 h-7 md:w-8 md:h-8 rounded-lg object-contain" />
          <span className="font-heading text-lg md:text-xl tracking-tight">
            Truth<span className="text-primary">Wall</span>
          </span>
        </motion.div>
        <div className="flex items-center gap-3">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate("/auth")}
            className="hidden sm:block text-sm cursor-pointer text-text-secondary hover:text-text-primary transition-colors"
          >
            Sign in
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={onGetStarted}
            className="text-sm px-4 py-2 rounded-full cursor-pointer bg-primary hover:bg-primary-hover text-white transition-all shadow-lg shadow-primary/20"
          >
            Get started
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
