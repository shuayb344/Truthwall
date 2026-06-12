import { ArrowRight } from "lucide-react";

interface LandingFooterCTAProps {
  onCTA: () => void;
}

const LandingFooterCTA = ({ onCTA }: LandingFooterCTAProps) => {
  return (
    <section className="py-24 px-6 border-t border-[#2A2A3E]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Your truth deserves to be heard.
        </h2>
        <p className="text-[#A0A0B8] mb-8">No account required to browse. One minute to post.</p>
        <button
          onClick={onCTA}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7C6FF7] hover:bg-[#6B5FE6] text-white font-medium transition-all hover:scale-[1.02]"
        >
          Start posting anonymously
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default LandingFooterCTA;
