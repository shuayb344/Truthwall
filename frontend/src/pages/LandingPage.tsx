import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Clock, Heart } from "lucide-react";
import useAuthStore from "@/store/authStore";
 
const samplePosts = [
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
    <div className="min-h-screen bg-[#0A0A0F] text-[#EEEEF5] overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#2A2A3E] bg-[#0A0A0F]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight">
            Truth<span className="text-[#7C6FF7]">Wall</span>
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/auth")}
              className="text-sm text-[#A0A0B8] hover:text-[#EEEEF5] transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={handleCTA}
              className="text-sm px-4 py-2 rounded-full bg-[#7C6FF7] hover:bg-[#6B5FE6] text-white transition-colors"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>
 
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2A2A3E] bg-[#1C1C28] text-xs text-[#A0A0B8] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C6FF7] animate-pulse" />
            Anonymous. Honest. Heard.
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
            Say what you{" "}
            <span className="text-[#7C6FF7]">can't</span>{" "}
            say out loud.
          </h1>
          <p className="text-lg md:text-xl text-[#A0A0B8] leading-relaxed mb-10 max-w-xl">
            TruthWall is a space to post what you carry in silence — and find others who understand. No names. No judgment. Just truth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCTA}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#7C6FF7] hover:bg-[#6B5FE6] text-white font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Post anonymously
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/feed")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#2A2A3E] hover:border-[#7C6FF7] text-[#A0A0B8] hover:text-[#EEEEF5] font-medium transition-all"
            >
              Browse the wall
            </button>
          </div>
        </div>
      </section>
 
      {/* Blurred sample posts */}
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
                onClick={handleCTA}
                className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7C6FF7] hover:bg-[#6B5FE6] text-white text-sm font-medium shadow-lg shadow-[#7C6FF7]/20 transition-all hover:scale-[1.02]"
              >
                Join to read more
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
 
      {/* Features */}
      <section className="py-24 px-6 border-t border-[#2A2A3E]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Fully anonymous",
              desc: "Your identity is never stored or shared. You post as a generated alias — always.",
            },
            {
              icon: Heart,
              title: "Empathy, not likes",
              desc: "Reactions are designed to support: Feel This, Not Alone, Stay Strong, Sending Strength.",
            },
            {
              icon: Clock,
              title: "Posts expire",
              desc: "Truths disappear after 7 days, keeping the wall honest and the past in the past.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1C1C28] border border-[#2A2A3E] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#7C6FF7]" />
              </div>
              <h3 className="font-semibold text-[#EEEEF5]">{title}</h3>
              <p className="text-sm text-[#A0A0B8] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* Footer CTA */}
      <section className="py-24 px-6 border-t border-[#2A2A3E]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Your truth deserves to be heard.
          </h2>
          <p className="text-[#A0A0B8] mb-8">No account required to browse. One minute to post.</p>
          <button
            onClick={handleCTA}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7C6FF7] hover:bg-[#6B5FE6] text-white font-medium transition-all hover:scale-[1.02]"
          >
            Start posting anonymously
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
 
export default LandingPage;
