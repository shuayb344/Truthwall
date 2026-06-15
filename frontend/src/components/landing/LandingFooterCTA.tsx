import { ArrowRight } from "lucide-react";

interface LandingFooterCTAProps {
  onCTA: () => void;
}

const LandingFooterCTA = ({ onCTA }: LandingFooterCTAProps) => {
  return (
    <section className="py-24 px-6 border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-heading text-text-primary mb-4">
          Your truth deserves to be heard.
        </h2>
        <p className="text-[#999999] mb-8">No account required to browse. One minute to post.</p>
        <button
          onClick={onCTA}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E03030] hover:bg-[#C42020] text-white font-medium transition-all hover:scale-[1.02]"
        >
          Start posting anonymously
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default LandingFooterCTA;
