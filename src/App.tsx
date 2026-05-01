import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import FloatingActions from "./components/FloatingActions";
import AdminGuard from "./components/AdminGuard";

// Pages
import Index from "./pages/Index";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// 🔥 Premium WhatsApp Floating Button
const QuickActionButton = () => (
  <motion.a
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
    href="https://wa.me/917425060129"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-24 right-6 z-[60] group"
  >
    <div className="relative flex items-center justify-center">

      {/* Glow */}
      <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition duration-300" />

      {/* Button */}
      <div className="relative bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-full shadow-2xl border border-white/20 backdrop-blur-md hover:scale-110 transition-all duration-300 flex items-center justify-center">
        <MessageSquare size={22} fill="currentColor" />
      </div>

      {/* Tooltip */}
      <span className="absolute right-16 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
        Chat on WhatsApp
      </span>
    </div>
  </motion.a>
);

// 🔥 Smooth Page Transition Wrapper
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.98 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// 🔥 Animated Routes
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route 
          path="/admin-panel" 
          element={
            <AdminGuard>
              <PageWrapper><Admin /></PageWrapper>
            </AdminGuard>
          } 
        />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

// 🔥 MAIN APP
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <HashRouter>
      <ScrollToTop />

      <div className="selection:bg-blue-600 selection:text-white bg-[#020617] text-white min-h-screen relative overflow-hidden">

        {/* 🌌 Premium Background Glow */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        </div>

        <Navbar />
        <FloatingActions />
        <QuickActionButton />

        <main className="overflow-x-hidden">
          <AnimatedRoutes />
        </main>

        {/* 🎯 Subtle Noise Texture */}
        <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />

        <div id="toast-root" />
      </div>
    </HashRouter>
  );
}