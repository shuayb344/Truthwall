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
    <section className="pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-[#606078] mb-6">
          What people are saying
        </p>
        <div className="grid md:grid-cols-2 gap-4 relative">
          {samplePosts.map((post, i) => (
            <div
              key={i}
              className="relative rounded-xl border border-[#2A2A3E] bg-[#12121A] p-5 overflow-hidden"
            >
              {i >= 2 && (
                <div className="absolute inset-0 backdrop-blur-sm bg-[#0A0A0F]/60 z-10 rounded-xl" />
              )}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[#9D8FFF]">{post.alias}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
              </div>
              <p className="text-sm text-[#A0A0B8] leading-relaxed mb-4">{post.content}</p>
              <div className="flex items-center gap-1 text-xs text-[#606078]">
                <Heart className="w-3 h-3" />
                <span>{post.reactions} felt this</span>
              </div>
            </div>
          ))}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-8 z-20 pointer-events-none">
            <button
              onClick={onCTA}
              className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7C6FF7] hover:bg-[#6B5FE6] text-white text-sm font-medium shadow-lg shadow-[#7C6FF7]/20 transition-all hover:scale-[1.02]"
            >
              Join to read more
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingSamplePosts;
