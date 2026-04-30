import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import FloatingActions from "./components/FloatingActions";
import AdminGuard from "./components/AdminGuard"; // Added Secure Guard

// Pages
import Index from "./pages/Index";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// 1. Scroll To Top Fix (The "Premium" touch)
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Animation Wrapper for "Premium" transitions
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        
        {/* 2. PROTECTED ADMIN ROUTE */}
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

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <HashRouter>
      <ScrollToTop /> {/* Ensures users start at the top of every page */}
      <div className="selection:bg-blue-600 selection:text-white">
        <Navbar />
        
        <FloatingActions /> 
        
        <main className="overflow-x-hidden min-h-screen">
          <AnimatedRoutes />
        </main>

        <div id="toast-root" /> 
      </div>
    </HashRouter>
  );
}

export default App;