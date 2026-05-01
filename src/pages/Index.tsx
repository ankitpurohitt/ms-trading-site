import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { 
  ArrowRight, Star, MapPin, Clock, CheckCircle, PhoneCall, Building2, Quote 
} from "lucide-react";

// ✅ FEATURE: 15+ Years Stats Restored
const stats = [
  { label: "Projects Done", value: "500+" },
  { label: "Years Exp", value: "15+" }, 
  { label: "Quality", value: "100%" },
];

// ✅ FEATURE: Quality Metrics Restored
const metrics = [
  { label: "Quality", value: "5-Star Rated", icon: <Star className="fill-orange-500 w-4 h-4 md:w-5 md:h-5" />, bg: "bg-orange-50", text: "text-orange-500" },
  { label: "Delivery", value: "On-Time", icon: <Clock className="w-4 h-4 md:w-5 md:h-5" />, bg: "bg-blue-50", text: "text-blue-500" },
  { label: "Service", value: "Certified", icon: <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />, bg: "bg-green-50", text: "text-green-500" },
  { label: "Location", value: "Madar, Ajmer", icon: <MapPin className="w-4 h-4 md:w-5 md:h-5" />, bg: "bg-red-50", text: "text-red-500" },
];

// ✅ FEATURE: Hotel Architectural Images Restored
const testimonials = [
  {
    name: "Grand Xenia Hotel",
    location: "Ajmer",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop", 
    text: "M.S. Trading delivered exceptional toughened glass work for our lobby and suites. Their precision and professional approach are unmatched in Rajasthan.",
    rating: 5
  },
  {
    name: "The Fern Residency",
    location: "Ajmer",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    text: "The premium UPVC windows and ACP facade work provided by Amit and his team significantly enhanced our building's aesthetics and insulation.",
    rating: 5
  }
];

export default function Index() {
  // ✅ FEATURE: Callback Form Logic Restored
  const [callbackForm, setCallbackForm] = useState({ name: "", phone: "" });

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackForm.name || !callbackForm.phone) {
      toast.error("Please provide both name and phone");
      return;
    }

    try {
      await supabase.from('quotes').insert([{
        customer_name: callbackForm.name,
        phone_number: callbackForm.phone,
        glass_type: "Homepage Callback",
        status: 'New'
      }]);

      const text = `*New Callback Request*\n*Name:* ${callbackForm.name}\n*Phone:* ${callbackForm.phone}`;
      window.open(`https://wa.me/917425060129?text=${encodeURIComponent(text)}`, '_blank');
      
      toast.success("Request Sent Successfully!");
      setCallbackForm({ name: "", phone: "" });
    } catch (error) {
      toast.error("Opening WhatsApp directly...");
      window.open(`https://wa.me/917425060129?text=Inquiry: ${callbackForm.name}`, '_blank');
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white selection:bg-blue-600/30 font-sans overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      {/* ✅ FIX: pt-44 clears the Mobile Overlap bug */}
      <section className="relative min-h-screen flex items-center justify-center pt-44 pb-20 lg:pt-0 overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000" 
            className="w-full h-full object-cover opacity-20 md:opacity-30 scale-105"
            alt="Modern Architecture"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/95 via-[#020617]/80 to-[#020617]" />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center pt-12 lg:pt-0"
        >
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 backdrop-blur-md rounded-full mx-auto lg:mx-0">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                Ajmer's Trusted Glass Experts
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight leading-[1.1] md:leading-[0.9]">
              Transform Your Space <br className="hidden sm:block" />
              With Premium <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                Glass & Aluminium
              </span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed px-4 lg:px-0">
              High-quality windows, doors, and custom installations crafted with 15+ years of precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start px-6 lg:px-0">
              <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl font-bold uppercase tracking-wider hover:scale-105 transition-all text-center">
                Get Estimate
              </Link>
              <Link to="/portfolio" className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl font-bold uppercase tracking-wider hover:bg-white/10 transition-all text-center">
                View Work
              </Link>
            </div>

            <div className="flex justify-center lg:justify-start gap-8 md:gap-12 pt-6">
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="text-2xl md:text-3xl font-black">{s.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Inquiry Card */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative overflow-hidden max-w-md mx-auto w-full">
            <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
              <PhoneCall className="text-blue-500" size={20} /> Quick Inquiry
            </h3>
            <div className="space-y-4 relative z-10">
              <input 
                value={callbackForm.name}
                onChange={(e) => setCallbackForm({...callbackForm, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-white placeholder:text-slate-500 text-sm md:text-base"
                placeholder="Full Name"
              />
              <input 
                value={callbackForm.phone}
                onChange={(e) => setCallbackForm({...callbackForm, phone: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-white placeholder:text-slate-500 text-sm md:text-base"
                placeholder="Mobile Number"
              />
              <button 
                onClick={handleCallbackSubmit}
                className="w-full bg-white text-slate-900 p-4 rounded-xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-lg"
              >
                Request Callback
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= TRUST BAR ================= */}
      <section className="py-12 border-y border-slate-800 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((m, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
              <div className={`p-2.5 md:p-3 ${m.bg} ${m.text} rounded-xl`}>{m.icon}</div>
              <div>
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">{m.label}</p>
                <p className="font-black uppercase text-xs md:text-sm italic text-white">{m.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20 px-4">
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
              Trusted By The <br /> <span className="text-blue-500">Best In Ajmer</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white/[0.03] border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden backdrop-blur-sm"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 md:bottom-6 md:left-8 flex items-center gap-2">
                    <Building2 className="text-blue-500" size={18} />
                    <span className="font-black uppercase tracking-widest text-xs md:text-sm">{t.name}</span>
                  </div>
                </div>
                <div className="p-6 md:p-10 space-y-4 md:space-y-6">
                  <Quote className="text-blue-500/40 w-8 h-8 md:w-10 md:h-10" />
                  <p className="text-slate-300 text-base md:text-lg italic leading-relaxed">"{t.text}"</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500">Rajasthan</p>
                      <p className="font-bold text-sm">{t.location}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-blue-500 text-blue-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FULL CORPORATE FOOTER ================= */}
      <footer className="bg-white pt-16 md:pt-20 pb-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 md:mb-20">
          <div className="space-y-6 text-center md:text-left text-slate-900">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl">MS</div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                M.S. Trading <span className="text-blue-600">Co.</span>
              </h2>
            </div>
            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs mx-auto md:mx-0">
              Premium Toughened glass and aluminium fabrication specialists serving Ajmer and Rajasthan for over 15 years.
            </p>
          </div>

          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Contact & Support</h4>
            <div className="space-y-4">
              <div>
                <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1">General Manager</p>
                <p className="font-black text-lg text-slate-900">+91 74250-60129</p>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1">Site Supervisor</p>
                <p className="font-black text-lg text-slate-900">+91 98295-86830</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Factory Address</h4>
            <p className="text-slate-500 text-sm font-bold leading-loose text-slate-600">
              Madhav Colony, Gali No. 3, Main Road, Madar,<br/>
              Ajmer, Rajasthan - 305001
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">
            © 2026 M.S. TRADING CO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            <Link to="/admin-panel" className="text-[10px] font-black uppercase text-slate-400 tracking-widest hover:text-blue-600 transition-colors">
              Admin Panel
            </Link>
            <p className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">
              Designed & Engineered by <span className="text-slate-900 font-black">Ankit Develops</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}