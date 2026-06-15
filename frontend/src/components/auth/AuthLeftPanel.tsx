const AuthLeftPanel = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-[#111111] overflow-hidden border-r border-border-default/50">
      {/* Red crack light effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-px h-3/4 bg-gradient-to-b from-transparent via-[#E03030] to-transparent opacity-80 shadow-[0_0_15px_rgba(224,48,48,0.4)]" />
        <div className="absolute w-64 h-64 bg-[#E03030]/5 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 flex flex-col justify-end p-12 text-white">
        <p className="font-mono text-xs text-[#E03030] tracking-widest mb-4 uppercase">
          RADICAL_HONESTY
        </p>
        <h2 className="text-4xl font-heading mb-3 leading-tight">
          Speak your truth.
        </h2>
        <p className="text-[#999999] text-sm leading-relaxed max-w-sm">
          A sanctuary for vulnerability and anonymous expression, protected by
          the dark.
        </p>
      </div>
    </div>
  );
};

export default AuthLeftPanel;
