import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface LandingHeroProps {
  onCTA: () => void;
}

const LandingHero = ({ onCTA }: LandingHeroProps) => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 lg:pt-40 pb-16 lg:pb-24 px-6 max-w-6xl mx-auto overflow-hidden">
      <div className="max-w-3xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-default bg-elevated text-xs text-text-secondary mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Anonymous. Honest. Heard.
        </motion.div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading leading-tight md:leading-[1.05] tracking-tight mb-6 flex flex-col gap-1">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="block"
          >
            Say what you
          </motion.span>
          <span className="flex items-center gap-x-3 md:gap-x-4 flex-wrap">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                textShadow: ["0 0 0px #E03030", "0 0 20px #E03030", "0 0 0px #E03030"]
              }}
              transition={{
                opacity: { duration: 0.7, delay: 0.5 },
                y: { duration: 0.7, delay: 0.5 },
                textShadow: { duration: 1, delay: 1.2 }
              }}
              className="text-primary"
            >
              can't
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              say out loud.
            </motion.span>
          </span>
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-xl"
        >
          TruthWall is a space to post what you carry in silence — and find others who understand. No names. No judgment. Just truth.
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(224, 48, 48, 0.4)" }}
            onClick={onCTA}
            className="inline-flex items-center justify-center cursor-pointer gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-hover text-white font-medium shadow-lg shadow-primary/20"
          >
            Post anonymously
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.05, borderColor: "#E03030", color: "#F5F5F5" }}
            onClick={() => navigate("/feed")}
            className="inline-flex items-center justify-center cursor-pointer gap-2 px-6 py-3 rounded-full border border-border-default text-text-secondary font-medium transition-all hover:bg-surface"
          >
            Browse the wall
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
