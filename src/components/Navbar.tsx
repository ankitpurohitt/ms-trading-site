import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // Make sure lucide-react is installed

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-2 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl"
      >
        {/* The Glass Container */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1.5rem] md:rounded-[2rem] px-4 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          
          {/* ================= BRAND LOGO SECTION ================= */}
          <Link to="/" className="flex items-center gap-2 md:gap-4 group shrink-0">
            <div className="relative h-10 md:h-14">
              <img 
                src="/logo.png" 
                alt="M.S. Trading Co." 
                className="h-full w-auto object-contain relative z-10" 
              />
            </div>
            
            <div className="hidden xs:flex flex-col border-l border-white/10 pl-2 md:pl-4">
              <span className="text-xs md:text-sm font-black uppercase text-white leading-none">
                M.S. Trading
              </span>
              <span className="text-[6px] md:text-[7px] font-bold uppercase tracking-widest text-slate-500 mt-1">
                Premium Architecture
              </span>
            </div>
          </Link>
          
          {/* ================= NAV & ACTIONS ================= */}
          <div className="flex items-center gap-2 md:gap-8">
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-white/70 hover:text-white font-black uppercase text-[10px] tracking-widest transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {/* Shimmer Button */}
            <Link 
              to="/contact"
              className="bg-white text-slate-900 px-4 md:px-6 py-2.5 md:py-3 rounded-full font-black uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl relative overflow-hidden group"
            >
              <span className="relative z-10">Get Quote</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] transition-transform" />
            </Link>

            {/* 🔥 MOBILE MENU TOGGLE */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 🔥 MOBILE DROPDOWN MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-2 bg-[#020617]/95 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] p-4 flex flex-col gap-4 md:hidden shadow-2xl"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-white font-black uppercase text-xs tracking-widest p-4 bg-white/5 rounded-xl hover:bg-blue-600 transition-all text-center"
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}