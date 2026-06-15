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
    <section className="py-24 px-6 border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
              <Icon className="w-5 h-5 text-[#E03030]" />
            </div>
            <h3 className="font-semibold text-[#F5F5F5]">{title}</h3>
            <p className="text-sm text-[#999999] leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LandingFeatures;
