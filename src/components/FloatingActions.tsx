import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Calculator, X, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Centralized contact info to match your business requirements
const WHATSAPP_NUMBER = "917425060129";
const CALL_NUMBER = "917425060129";
const WHATSAPP_TEXT = "Hi MS Trading, I am interested in glass/aluminum work. Please contact me.";

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  // Auto-hide the "Request Quote" nudge after 6 seconds for a clean look
  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const actions = [
    {
      icon: <Phone size={22} />,
      label: "Call Amit",
      href: `tel:+${CALL_NUMBER}`,
      color: "bg-slate-900",
    },
    {
      icon: <MessageCircle size={22} />,
      label: "WhatsApp",
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`,
      color: "bg-[#25D366]", // Official WhatsApp Green
    },
    {
      icon: <Calculator size={22} />,
      label: "Get Estimate",
      to: "/contact",
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-4">
      
      {/* 1. EXPANDING ACTION MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="flex flex-col gap-4 mb-2"
          >
            {actions.map((action, i) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 group"
              >
                {/* Desktop Tooltip */}
                <span className="bg-white px-3 py-1.5 rounded-lg shadow-xl text-[10px] font-black uppercase tracking-widest text-slate-900 border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                  {action.label}
                </span>

                {action.to ? (
                  <Link
                    to={action.to}
                    onClick={() => setIsOpen(false)}
                    className={`${action.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform active:scale-95`}
                  >
                    {action.icon}
                  </Link>
                ) : (
                  <a
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${action.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform active:scale-95`}
                  >
                    {action.icon}
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN HUB BUTTON */}
      <div className="relative flex items-center gap-3">
        <AnimatePresence>
          {showLabel && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-2xl text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-0.5 whitespace-nowrap"
            >
              Get Free Quote
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle contact options"
          className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center shadow-2xl transition-all duration-500 ${
            isOpen ? "bg-slate-900 text-white rotate-90" : "bg-blue-600 text-white hover:scale-105"
          }`}
        >
          {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        </button>
      </div>
    </div>
  );
}