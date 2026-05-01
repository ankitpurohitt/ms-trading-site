import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl"
    >
      {/* The Glass Container */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] px-8 py-4 flex items-center justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        
        {/* ================= BRAND LOGO SECTION ================= */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative">
            {/* Glass Glow effect behind logo */}
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-0 group-hover:scale-110 transition-transform duration-500" />
            
            {/* 🔥 FIXED: Extension changed to .png to match your explorer */}
            <img 
              src="/logo.png" 
              alt="M.S. Trading Co. Logo" 
              className="h-12 md:h-14 w-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-105" 
            />
          </div>

          <div className="hidden sm:flex flex-col border-l border-white/10 pl-4">
            <span className="text-sm font-black uppercase tracking-tighter text-white">
              M.S. Trading <span className="text-blue-500">Co.</span>
            </span>
            <span className="text-[7px] font-bold uppercase tracking-[0.4em] text-slate-500">
              Premium Architecture
            </span>
          </div>
        </Link>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            {['Services', 'Portfolio'].map((item) => (
              <Link 
                key={item} 
                to={`/${item.toLowerCase()}`}
                className="text-white/70 hover:text-white font-black uppercase text-[10px] tracking-widest transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
          
          {/* 🔥 NEW: Premium Shimmer Button */}
          <Link 
            to="/contact"
            className="bg-white text-slate-900 px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-white/5 relative overflow-hidden group"
          >
            <span className="relative z-10">Get Quote</span>
            {/* Subtle shine animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] transition-transform" />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}