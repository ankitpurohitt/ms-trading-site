import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, Phone, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Make sure AnimatePresence is here

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/portfolio", label: "Portfolio" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Change navbar style on scroll for "Modern" feel
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[999] transition-all duration-300 ${
      scrolled ? "bg-white/80 backdrop-blur-lg border-b py-2" : "bg-transparent py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center gap-4">
        
        {/* 1. BRANDING (Left) */}
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <div className="bg-slate-900 p-1.5 rounded-xl group-hover:bg-blue-600 transition-colors">
             <img src="/logo.png" alt="M.S. Trading" className="h-8 w-auto invert" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-black tracking-tighter leading-none uppercase">M.S. Trading</p>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">Aluminium & Glass</p>
          </div>
        </Link>

        {/* 2. DESKTOP NAV (Middle) */}
        <div className="hidden md:flex items-center bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                pathname === l.path 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* 3. CTA GROUP (Right) */}
        <div className="flex items-center gap-3">
          <a 
            href="tel:+917425060129" 
            className="hidden lg:flex items-center gap-2 text-slate-900 hover:text-blue-600 transition-colors mr-4"
          >
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                <Phone size={14} className="text-blue-600" />
            </div>
            <span className="text-xs font-black uppercase tracking-tight">+91 74250-60129</span>
          </a>

          <Link 
            to="/contact" 
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 group"
          >
            Get Quote <Send size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* MOBILE TOGGLE */}
          <button 
            className="md:hidden p-3 bg-slate-100 rounded-2xl text-slate-900" 
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER (Animated) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md md:hidden" 
              onClick={() => setOpen(false)} 
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[85%] bg-white z-[1000] shadow-2xl md:hidden"
            >
              <div className="flex flex-col p-8 pt-24 gap-4">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Main Menu</p>
                {navLinks.map((l) => (
                  <Link
                    key={l.path}
                    to={l.path}
                    onClick={() => setOpen(false)}
                    className={`flex justify-between items-center p-5 rounded-2xl text-xl font-black uppercase tracking-tight transition-all ${
                      pathname === l.path ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-50 text-slate-900"
                    }`}
                  >
                    {l.label}
                    <ChevronRight size={20} />
                  </Link>
                ))}
                
                <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Contact Us</p>
                    <a href="tel:+917425060129" className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                        <Phone className="text-blue-600" />
                        <span className="font-bold">+91 74250 60129</span>
                    </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}