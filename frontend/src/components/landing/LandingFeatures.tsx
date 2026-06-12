import { Shield, Clock, Heart } from "lucide-react";

const features = [
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
];

const LandingFeatures = () => {
  return (
    <section className="py-24 px-6 border-t border-[#2A2A3E]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map(({ icon: Icon, title, desc }) => (
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
  );
};

export default LandingFeatures;
