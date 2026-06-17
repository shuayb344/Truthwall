import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";

interface SamplePost {
  alias: string;
  category: string;
  content: string;
  reactions: number;
}

const samplePosts: SamplePost[] = [
  {
    alias: "Silent Wolf #4821",
    category: "Mental Health",
    content: "Tonight feels heavier than usual. I've been holding it all together for so long that I've forgotten what it's like to just be okay.",
    reactions: 142,
  },
  {
    alias: "FadingEcho #1092",
    category: "Relationships",
    content: "I told my best friend I was fine. I've been saying that for eight months. I don't think either of us believes it anymore.",
    reactions: 89,
  },
  {
    alias: "UrbanMonk #505",
    category: "Work",
    content: "I built someone else's dream for three years. Today I quit. I have no plan. I've never felt more alive or more terrified.",
    reactions: 203,
  },
  {
    alias: "VelvetGhost #99",
    category: "Identity",
    content: "I finally told my therapist about the thing. The one I keep in a box under the bed of my mind. The world didn't end.",
    reactions: 317,
  },
];

const categoryColors: Record<string, string> = {
  "Mental Health": "text-violet-400 bg-violet-400/10",
  Relationships: "text-teal-400 bg-teal-400/10",
  Work: "text-blue-400 bg-blue-400/10",
  Identity: "text-rose-400 bg-rose-400/10",
};

interface LandingSamplePostsProps {
  onCTA: () => void;
}

const LandingSamplePosts = ({ onCTA }: LandingSamplePostsProps) => {
  return (
    <section className="pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Animated Title */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          whileInView={{ opacity: 1, letterSpacing: "normal" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-xs uppercase text-text-muted mb-12 text-center"
        >
          What people are saying
        </motion.p>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 relative">
          {samplePosts.map((post, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: isLeft ? -50 : 50,
                  rotate: isLeft ? -2 : 2
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  rotate: 0
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: "easeOut"
                }}
                className="relative"
              >
                {/* Floating Animation Wrapper */}
                <motion.div
                  animate={{
                    y: [0, -8, 0, 8, 0],
                    rotate: [0, 0.5, 0, -0.5, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 0 30px rgba(224, 48, 48, 0.2)",
                    borderColor: "rgba(224, 48, 48, 0.4)"
                  }}
                  className="rounded-2xl border border-border-default bg-surface p-6 overflow-hidden transition-colors"
                >
                  {i >= 2 && (
                    <div className="absolute inset-0 backdrop-blur-sm bg-background/60 z-10" />
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-heading text-primary flex-shrink-0">
                        {post.alias.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-mono text-xs text-text-alias">{post.alias}</span>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5">{post.content}</p>
                  <div className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Heart className="w-3.5 h-3.5 fill-primary/10 text-primary" />
                    <span>{post.reactions} felt this</span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Bottom CTA with Bounce */}
          <div className="absolute -bottom-12 left-0 right-0 flex justify-center z-20 pointer-events-none">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.2
              }}
              onClick={onCTA}
              className="pointer-events-auto inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95"
            >
              Join to read more
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingSamplePosts;
