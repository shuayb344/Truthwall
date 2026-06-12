const AuthLeftPanel = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, #0A0A0F 0%, #1a0a2e 50%, #0A0A0F 100%)`,
        }}
      />
      {/* Violet crack light effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-px h-3/4 bg-gradient-to-b from-transparent via-[#7C6FF7] to-transparent opacity-60" />
        <div className="absolute w-32 h-32 bg-[#7C6FF7]/20 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 flex flex-col justify-end p-12 text-white">
        <p className="font-mono text-xs text-[#7C6FF7] tracking-widest mb-4 uppercase">
          RADICAL_HONESTY
        </p>
        <h2 className="text-4xl font-bold mb-3 leading-tight">
          Speak your truth.
        </h2>
        <p className="text-[#A0A0B8] text-sm leading-relaxed max-w-sm">
          A sanctuary for vulnerability and anonymous expression, protected by
          the dark.
        </p>
      </div>
    </div>
  );
};

export default AuthLeftPanel;
