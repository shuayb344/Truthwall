import { AlertTriangle } from "lucide-react";

interface CrisisBannerProps {
  className?: string;
}

const CrisisBanner = ({ className = "" }: CrisisBannerProps) => {
  return (
    <div className={`flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 border-b border-amber-500/20 ${className}`}>
      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
      <p className="text-xs text-amber-300/90">
        <span className="font-semibold">NEEDS SUPPORT</span> — If you or someone you know needs help, please reach out to a crisis helpline.
      </p>
    </div>
  );
};

export default CrisisBanner;
