import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Decorative red glow background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <span className="text-primary font-mono text-xl mb-4 block tracking-widest">ERROR: 404</span>
        
        <h1 className="text-6xl md:text-8xl font-heading font-extrabold text-text-primary mb-6 tracking-tighter">
          LOST IN THE <span className="text-primary italic">WALLS</span>
        </h1>
        
        <p className="text-text-secondary text-lg md:text-xl max-w-md mx-auto mb-10 leading-relaxed">
          The secret you're looking for has vanished into the shadows, or maybe it never existed at all.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            to="/feed"
            className="flex items-center gap-3 bg-surface border border-border-default hover:border-primary/50 text-text-primary px-8 py-4 rounded-full transition-all duration-300 group shadow-lg hover:shadow-primary/10"
          >
            <MoveLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-semibold tracking-tight">Return to the Truth</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Subtle floating "ghost" elements to match the "confessional" vibe */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-20 bg-gradient-to-b from-primary/20 to-transparent blur-sm rounded-full pointer-events-none"
          initial={{ 
            x: Math.random() * 100 - 50 + "%", 
            y: "110%", 
            opacity: 0 
          }}
          animate={{ 
            y: "-10%", 
            opacity: [0, 0.4, 0] 
          }}
          transition={{ 
            duration: 8 + Math.random() * 10, 
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "linear"
          }}
          style={{
            left: Math.random() * 100 + "%",
          }}
        />
      ))}
    </div>
  );
};

export default NotFoundPage;
