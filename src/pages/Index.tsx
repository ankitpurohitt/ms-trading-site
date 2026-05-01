import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Star, MapPin, Clock, CheckCircle, PhoneCall, Building2, Quote 
} from "lucide-react";

// Updated to 15+ Years
const stats = [
  { label: "Projects Done", value: "500+" },
  { label: "Years Exp", value: "15+" }, 
  { label: "Quality", value: "100%" },
];

const metrics = [
  { label: "Quality", value: "5-Star Rated", icon: <Star className="fill-orange-500" />, bg: "bg-orange-50", text: "text-orange-500" },
  { label: "Delivery", value: "On-Time", icon: <Clock />, bg: "bg-blue-50", text: "text-blue-500" },
  { label: "Service", value: "Certified", icon: <CheckCircle />, bg: "bg-green-50", text: "text-green-500" },
  { label: "Location", value: "Madar, Ajmer", icon: <MapPin />, bg: "bg-red-50", text: "text-red-500" },
];

// Testimonials Data with Real-World Architectural Imagery
const testimonials = [
  {
    name: "Grand Xenia Hotel",
    location: "Ajmer",
    // Premium architectural glass facade representation
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop", 
    text: "M.S. Trading delivered exceptional toughened glass work for our lobby and suites. Their precision and professional approach are unmatched in Rajasthan.",
    rating: 5
  },
  {
    name: "The Fern Residency",
    location: "Ajmer",
    // Modern high-rise hotel exterior representation
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    text: "The premium UPVC windows and ACP facade work provided by Amit and his team significantly enhanced our building's aesthetics and insulation.",
    rating: 5
  }
];
export default function Index() {
  return (
    <div className="bg-[#020617] min-h-screen text-white selection:bg-blue-600/30 font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000" 
            className="w-full h-full object-cover opacity-30 scale-105"
            alt="Modern Architecture"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-[#020617]/70 to-[#020617]" />
        </div>

        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px]" />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center pt-24"
        >
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 backdrop-blur-md rounded-full"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                Ajmer's Trusted Glass Experts
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]">
              Transform Your Space <br />
              With Premium <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                Glass & Aluminium
              </span>
            </h1>

            <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
              High-quality windows, doors, and custom installations crafted with 15+ years of precision, durability, and modern aesthetics.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.3)] flex items-center gap-2"
              >
                Get Instant Estimate <ArrowRight size={18} />
              </Link>
              <Link 
                to="/portfolio"
                className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl font-bold uppercase tracking-wider hover:bg-white/10 transition-all"
              >
                View Our Work
              </Link>
            </div>

            <div className="flex gap-10 pt-6">
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-black">{s.value}</p>
                  <p className="text-xs uppercase tracking-widest text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block"
          >
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-[2.5rem]" />
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <PhoneCall className="text-blue-500" size={20} /> Quick Inquiry
              </h3>
              <div className="space-y-4">
                <input 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                  placeholder="Full Name"
                />
                <input 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                  placeholder="Mobile Number"
                />
                <button className="w-full bg-white text-slate-900 p-4 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all">
                  Request Callback
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= TRUST BAR ================= */}
      <section className="py-12 border-y border-slate-800 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`p-3 ${m.bg} ${m.text} rounded-xl`}>{m.icon}</div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{m.label}</p>
                <p className="font-black uppercase text-sm italic text-white">{m.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs"
            >
              Landmark Projects
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-4">
              Trusted By The <br /> <span className="text-blue-500">Best In Ajmer</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative bg-white/[0.03] border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-sm"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
                  <div className="absolute bottom-6 left-8 flex items-center gap-2">
                    <Building2 className="text-blue-500" size={20} />
                    <span className="font-black uppercase tracking-widest text-sm">{t.name}</span>
                  </div>
                </div>

                <div className="p-10 space-y-6">
                  <Quote className="text-blue-500/40" size={40} />
                  <p className="text-slate-300 text-lg italic leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Location</p>
                      <p className="font-bold">{t.location}, Rajasthan</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-blue-500 text-blue-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CORPORATE FOOTER --- */}
      <footer className="bg-white pt-20 pb-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl">MS</div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">
                M.S. Trading <span className="text-blue-600">Co.</span>
              </h2>
            </div>
            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">
              Premium glass and aluminium fabrication specialists serving Ajmer and Rajasthan for over 15 years.
            </p>
          </div>

          <div className="space-y-6">
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

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Factory Address</h4>
            <p className="text-slate-500 text-sm font-bold leading-loose">
              Madhav Colony, Gali No. 3,<br/>
              Main Road, Madar,<br/>
              Ajmer, Rajasthan - 305001
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            © 2026 M.S. TRADING CO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/admin-panel" className="text-[10px] font-black uppercase text-slate-400 tracking-widest hover:text-blue-600 transition-colors">
              Admin Dashboard
            </Link>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
              Designed & Engineered by <span className="text-slate-900 font-black">Ankit Develops</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}