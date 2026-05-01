import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  MessageSquare, 
  ChevronRight, 
  CheckCircle2, 
  MapPin, 
  Navigation 
} from 'lucide-react';
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

const projectTypes = ["Toughened Glass", "ACP Sheet", "Aluminium Windows", "UPVC Windows"];
const MAP_QUERY = "M.S. Trading Co Madar Ajmer Rajasthan";

export default function Contact() {
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  
  const [form, setForm] = useState({ 
    name: "", 
    phone: "", 
    projectType: "", 
    width: "", 
    height: "",
    quantity: "1" 
  });

  const totalSqFt = useMemo(() => {
    const w = parseFloat(form.width);
    const h = parseFloat(form.height);
    const q = parseInt(form.quantity);
    return isNaN(w) || isNaN(h) ? 0 : w * h * q;
  }, [form.width, form.height, form.quantity]);

  const handleGetDirections = () => {
    setLoadingLocation(true);
    const destination = encodeURIComponent(MAP_QUERY);

    if (!navigator.geolocation) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, "_blank");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const origin = `${position.coords.latitude},${position.coords.longitude}`;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
        window.open(url, "_blank");
        setLoadingLocation(false);
      },
      () => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, "_blank");
        setLoadingLocation(false);
      }
    );
  };

  const handleNext = () => {
    if (step === 1 && (!form.name || !form.phone)) return toast.error("Enter contact details");
    if (step === 2 && !form.projectType) return toast.error("Select a service");
    
    if (step === 2) {
      setIsCalculating(true);
      setTimeout(() => { 
        setIsCalculating(false); 
        setStep(3); 
      }, 800);
    } else {
      setStep(s => s + 1);
    }
  };

  const submitToDatabase = async () => {
    try {
      const { error } = await supabase.from('quotes').insert([{
        customer_name: form.name,
        phone_number: form.phone,
        glass_type: form.projectType,
        width: parseFloat(form.width),
        height: parseFloat(form.height),
        total_sqft: totalSqFt,
        status: 'New'
      }]);
      if (error) throw error;
      
      const text = `*M.S. Trading Inquiry*\n*User:* ${form.name}\n*Work:* ${form.projectType}\n*Dimensions:* ${form.width}x${form.height}ft (Qty: ${form.quantity})\n*Total:* ${totalSqFt.toFixed(2)} sq.ft`;
      window.open(`https://wa.me/917425060129?text=${encodeURIComponent(text)}`, '_blank');
      setStep(4);
    } catch (e) {
      toast.error("Database connection error");
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* PROGRESS TRACKER */}
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between mb-16 max-w-xs mx-auto">
            {[1, 2, 3].map(i => (
                <div key={i} className={`h-1 w-16 rounded-full transition-all duration-700 ${step >= i ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-white/10'}`} />
            ))}
            </div>

            {/* FORM CONTAINER */}
            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden mb-32">
            <AnimatePresence mode="wait">
                {step === 1 && (
                <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Identity</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold placeholder:text-slate-700 text-white" placeholder="Your Name" />
                    <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold placeholder:text-slate-700 text-white" placeholder="Mobile Number" />
                    </div>
                    <button onClick={handleNext} className="w-full bg-blue-600 p-6 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
                    Next Stage <ChevronRight size={16} />
                    </button>
                </motion.div>
                )}

                {/* STEP 2: SERVICE & DIMENSIONS */}
{step === 2 && (
  <motion.div 
    key="2" 
    initial={{ opacity: 0, x: 20 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: -20 }} 
    className="space-y-8"
  >
    <div className="space-y-2">
      <h2 className="text-4xl font-black uppercase tracking-tighter">Project Details</h2>
      <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Step 02 — Select Service & Dimensions</p>
    </div>

    {/* Project Type Selection */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {projectTypes.map(t => (
        <button 
          key={t} 
          type="button"
          onClick={() => setForm({...form, projectType: t})} 
          className={`p-4 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all ${
            form.projectType === t 
              ? 'border-blue-500 bg-blue-500/10 text-white' 
              : 'border-white/10 text-slate-500 hover:border-white/20'
          }`}
        >
          {t}
        </button>
      ))}
    </div>

    {/* Dimension Inputs - NOW RESTORED */}
    <div className="grid grid-cols-3 gap-6 pt-4">
      <div className="space-y-2 text-center">
        <label className="text-[8px] font-black uppercase text-blue-500 tracking-widest">Width (ft)</label>
        <input 
          type="number" 
          value={form.width} 
          onChange={e => setForm({...form, width: e.target.value})} 
          className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-center text-2xl font-black text-white focus:border-blue-500 outline-none transition-all" 
          placeholder="0" 
        />
      </div>
      <div className="space-y-2 text-center">
        <label className="text-[8px] font-black uppercase text-blue-500 tracking-widest">Height (ft)</label>
        <input 
          type="number" 
          value={form.height} 
          onChange={e => setForm({...form, height: e.target.value})} 
          className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-center text-2xl font-black text-white focus:border-blue-500 outline-none transition-all" 
          placeholder="0" 
        />
      </div>
      <div className="space-y-2 text-center">
        <label className="text-[8px] font-black uppercase text-blue-500 tracking-widest">Quantity</label>
        <input 
          type="number" 
          value={form.quantity} 
          onChange={e => setForm({...form, quantity: e.target.value})} 
          className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-center text-2xl font-black text-white focus:border-blue-500 outline-none transition-all" 
        />
      </div>
    </div>

    <button 
      onClick={handleNext} 
      disabled={isCalculating} 
      className="w-full bg-white text-black p-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-xl"
    >
      {isCalculating ? "Calculating Precision..." : "Confirm & View Estimate"}
    </button>
  </motion.div>
)}

                {step === 3 && (
                <motion.div key="3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 text-center">
                    <h2 className="text-6xl font-black tracking-tighter uppercase">{totalSqFt.toFixed(2)} SQ.FT</h2>
                    <button onClick={submitToDatabase} className="bg-blue-600 px-10 py-6 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 mx-auto">
                    Send to WhatsApp <MessageSquare size={16} />
                    </button>
                </motion.div>
                )}

                {step === 4 && (
                <motion.div key="4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-12 text-center space-y-6">
                    <CheckCircle2 size={60} className="text-green-500 mx-auto" />
                    <h2 className="text-4xl font-black tracking-tighter uppercase">Inquiry Sent</h2>
                    <Link to="/" className="inline-block text-blue-500 font-black uppercase text-[10px] tracking-[0.3em] underline underline-offset-8">Return Home</Link>
                </motion.div>
                )}
            </AnimatePresence>
            </div>
        </div>

        {/* ================= EXPERTISE & MAP SECTION ================= */}
        <section className="grid lg:grid-cols-2 gap-12 items-stretch">
          
          {/* LEFT: EXPERTISE PANEL */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0f1e] border border-white/5 rounded-[3rem] p-12 md:p-16 flex flex-col justify-between shadow-2xl"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-12 text-white">
                Our Expertise, <br /> Your Vision.
              </h2>

              <div className="space-y-10">
                {/* Amit Yadav */}
                <div className="border-l-4 border-blue-600 pl-6 space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Amit Yadav</p>
                  <p className="text-2xl md:text-3xl font-black text-white tracking-tight">+91 7425060129</p>
                </div>

                {/* Manoj Yadav */}
                <div className="border-l-4 border-slate-700 pl-6 space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Manoj Yadav</p>
                  <p className="text-2xl md:text-3xl font-black text-white tracking-tight">+91 9829586830</p>
                  <p className="text-2xl md:text-3xl font-black text-white tracking-tight">+91 7014825782</p>
                </div>

                {/* Abhishek Yadav */}
                <div className="border-l-4 border-slate-700 pl-6 space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Abhishek Yadav</p>
                  <p className="text-2xl md:text-3xl font-black text-white tracking-tight">+91 9079060129</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5">
              <p className="text-slate-500 font-bold uppercase text-[9px] tracking-widest leading-relaxed">
                Factory: Madhav Colony, Gali No. 3, Main Road, Madar, Ajmer
              </p>
            </div>
          </motion.div>

          {/* RIGHT: MAP & DIRECTIONS */}
          <div className="flex flex-col gap-8">
          <div className="h-[450px] lg:h-full min-h-[400px] rounded-[3rem] overflow-hidden border border-white/10 relative group shadow-2xl bg-slate-900">
  <iframe 
    title="MS Trading Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.2183214876734!2d74.67844467542456!3d26.46481717691656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396be3a01f2b634d%3A0x5fddc3c962c9d4ce!2sM.S.%20Trading%20Co.!5e0!3m2!1sen!2sin!4v1709280000000!5m2!1sen!2sin1"
    className="absolute inset-0 w-full h-full grayscale invert opacity-70 contrast-125 transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0"
    style={{ border: 0 }}
    allowFullScreen={true}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
  {/* Thematic Overlay Frame */}
  <div className="absolute inset-0 pointer-events-none border-[12px] border-[#030712] rounded-[3rem] z-10"></div>
</div>

            <button 
              onClick={handleGetDirections}
              className="w-full px-10 py-6 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
            >
              <Navigation size={20} className={loadingLocation ? "animate-spin" : ""} />
              {loadingLocation ? "Fetching Location..." : "Get Directions from my location"}
            </button>
          </div>

        </section>

      </div>
    </div>
  );
}