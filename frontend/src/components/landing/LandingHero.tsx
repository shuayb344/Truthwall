import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface LandingHeroProps {
  onCTA: () => void;
}

const LandingHero = ({ onCTA }: LandingHeroProps) => {
  const navigate = useNavigate();

  return (
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
            onClick={onCTA}
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
  );
};

export default LandingHero;
