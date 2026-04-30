import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Shield, Star, Clock, Award, MapPin, ArrowRight, Send } from 'lucide-react';
import { toast } from "sonner";
import Testimonials from "../components/Testimonials";

export default function Index() {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase.from('quotes').insert([{
        customer_name: formData.get('name'),
        phone_number: formData.get('phone'),
        glass_type: formData.get('service'),
        message: `Hero Section Inquiry: ${formData.get('service')}`,
        status: 'New'
      }]);

      if (error) throw error;
      toast.success("Request sent! Amit will call you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error("Error! Please call Amit directly: 74250-60129");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white selection:bg-blue-600 selection:text-white">
      
      {/* 1. PREMIUM HERO SECTION */}
      <header className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/hero-building.jpg" 
            className="w-full h-full object-cover opacity-40"
            alt="Modern Architecture"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 backdrop-blur-md mb-8 text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase">
              <Shield size={14} /> Certified Glass Engineering
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
              Crystal <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Clear</span> <br /> Strength.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-medium max-w-xl mb-12">
              Ajmer's leading experts in Toughened Glass, ACP Facades, and Aluminium Elevations. Expertly built for durability.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all flex items-center gap-3 group">
                Get Quote <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/portfolio" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">
                View Projects
              </Link>
            </div>
          </motion.div>

          {/* QUICK ACTION FORM */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100"
          >
            <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Quick Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" placeholder="Full Name" className="w-full p-4 bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition font-bold" required />
              <input name="phone" placeholder="Mobile Number" className="w-full p-4 bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition font-bold" required />
              <select name="service" className="w-full p-4 bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition font-black text-xs uppercase tracking-widest">
                <option>Toughened Glass</option>
                <option>ACP Sheet Elevation</option>
                <option>UPVC Windows</option>
                <option>Aluminium Partition</option>
              </select>
              <button disabled={loading} className="w-full bg-slate-900 text-white p-5 rounded-xl font-black uppercase tracking-widest hover:bg-blue-600 transition flex items-center justify-center gap-2">
                {loading ? "Sending..." : "Request Callback"} <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </header>

      {/* 2. TRUST BAR */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Quality", val: "5-Star Rated", icon: <Star className="text-yellow-500" fill="currentColor" /> },
            { label: "Delivery", val: "On-Time", icon: <Clock className="text-blue-600" /> },
            { label: "Service", val: "Certified", icon: <Award className="text-blue-600" /> },
            { label: "Location", val: "Madar, Ajmer", icon: <MapPin className="text-blue-600" /> },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">{stat.icon}</div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">{stat.label}</p>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TESTIMONIALS */}
      <Testimonials />

      {/* 4. MOBILE-FRIENDLY INQUIRY */}
      <section className="lg:hidden bg-slate-900 py-20 px-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl">
          <h3 className="text-2xl font-black uppercase text-center mb-8 tracking-tighter">Start Your Project</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" placeholder="Name" className="w-full p-4 bg-slate-50 rounded-xl font-bold" required />
            <input name="phone" placeholder="Mobile" className="w-full p-4 bg-slate-50 rounded-xl font-bold" required />
            <button className="w-full bg-blue-600 text-white p-5 rounded-xl font-black uppercase tracking-widest">
              Send Now
            </button>
          </form>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-white py-24 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="bg-slate-900 w-12 h-12 rounded-xl flex items-center justify-center">
               <img src="/logo.png" alt="M.S. Trading" className="h-8 w-auto invert" />
            </div>
            <div>
              <h4 className="font-black text-2xl tracking-tighter uppercase">M.S. Trading <span className="text-blue-600">Co.</span></h4>
              <p className="text-slate-500 text-sm font-medium mt-2 leading-relaxed">Premium glass and aluminium fabrication specialists serving Ajmer and Rajasthan for over 15 years.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h5 className="font-black text-blue-600 uppercase text-[10px] tracking-[0.2em]">Contact & Support</h5>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">General Manager</span>
                <a href="tel:+917425060129" className="font-black text-lg hover:text-blue-600 transition-colors">+91 74250-60129</a>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Site Supervisor</span>
                <a href="tel:+919829586830" className="font-black text-lg hover:text-blue-600 transition-colors">+91 98295-86830</a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="font-black text-blue-600 uppercase text-[10px] tracking-[0.2em]">Factory Address</h5>
            <p className="font-bold text-slate-800 leading-relaxed">
              Madhav Colony, Gali No. 3,<br />
              Main Road, Madar,<br />
              Ajmer, Rajasthan - 305001
            </p>
          </div>
        </div>
        
        {/* THE SIGNATURE SECTION */}
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © 2026 M.S. Trading Co. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link to="/admin-panel" className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">
              Admin Dashboard
            </Link>
            <div className="h-4 w-[1px] bg-slate-200 hidden md:block"></div>
            
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.3em]">
              Designed & Engineered by <span className="text-slate-900 font-black hover:text-blue-600 transition-colors cursor-crosshair">Ankit Develops</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}