

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[999] bg-slate-900 flex flex-col items-center justify-center">
      {/* The Animated Logo Container */}
      <div className="relative">
        {/* Outer Pulsing Ring */}
        <div className="absolute inset-0 rounded-xl border-2 border-blue-500 animate-ping opacity-20"></div>
        
        {/* The "MS" Icon Box */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl relative z-10 animate-bounce">
          <img src="/logo.png" alt="M.S. Trading" className="h-16 w-auto object-contain" />
        </div>
      </div>

      {/* Progress Text */}
      <div className="mt-10 text-center">
        <p className="text-white font-black text-xs uppercase tracking-[0.4em] animate-pulse">
          M.S. Trading Co.
        </p>
        <div className="w-48 h-1 bg-white/10 rounded-full mt-4 overflow-hidden mx-auto">
          <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_infinite] rounded-full"></div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0%); }
          100% { width: 0%; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}