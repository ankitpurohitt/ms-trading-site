import React, { useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import { Send, MapPin, Calculator, MessageSquare } from 'lucide-react'; // Added MessageSquare
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "../lib/supabase";

const projectTypes = [
  "Toughened Glass",
  "ACP Sheet",
  "Aluminium Windows",
  "UPVC Windows",
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  projectType: z.string().min(1, "Select a project type"),
  widthFt: z.coerce.number().finite().positive("Enter width in feet"),
  heightFt: z.coerce.number().finite().positive("Enter height in feet"),
  message: z.string().max(1000).optional(),
});

const contacts = [
  { name: "Amit Yadav", phones: ["7425060129"] },
  { name: "Manoj Yadav", phones: ["9829586830", "7014825782"] },
  { name: "Abhishek Yadav", phones: ["9079060129"] },
];

export default function Contact() {
  const [form, setForm] = useState({ 
    name: "", 
    phone: "", 
    projectType: "", 
    widthFt: "", 
    heightFt: "", 
    message: "" 
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const totalSqFt = useMemo(() => {
    const w = parseFloat(form.widthFt);
    const h = parseFloat(form.heightFt);
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return null;
    return w * h;
  }, [form.widthFt, form.heightFt]);

  const update = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => { 
        fieldErrors[i.path[0] as string] = i.message; 
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { name, phone, projectType, widthFt, heightFt, message } = result.data;

      // 1. SAVE TO SUPABASE (Admin Panel)
      const { error } = await supabase.from('quotes').insert([
        { 
          customer_name: name,
          phone_number: phone,
          glass_type: projectType,
          width: widthFt,
          height: heightFt,
          total_sqft: totalSqFt,
          message: message || `Estimator Quote: ${totalSqFt?.toFixed(2)} SQFT of ${projectType}`,
          status: 'New'
        }
      ]);

      if (error) throw error;

      // 2. TRIGGER WHATSAPP TO AMIT
      const whatsappNumber = "917425060129";
      const text = `*New Quote Request - M.S. Trading Co.*\n\n` +
                   `*Name:* ${name}\n` +
                   `*Phone:* ${phone}\n` +
                   `*Work:* ${projectType}\n` +
                   `*Area:* ${widthFt}ft x ${heightFt}ft = ${totalSqFt?.toFixed(2)} SQ.FT.\n` +
                   `*Message:* ${message || 'No additional notes'}`;
      
      const encodedText = encodeURIComponent(text);
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');

      toast.success("Quote saved & WhatsApp opened!");
      setForm({ name: "", phone: "", projectType: "", widthFt: "", heightFt: "", message: "" });
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to save quote. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      <div className="max-w-7xl mx-auto px-6 py-12 pt-32">
        <div className="grid lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full"></div>
              <h2 className="text-3xl font-black mb-8 uppercase tracking-tight leading-tight">Our Expertise,<br/> Your Vision.</h2>
              
              <div className="space-y-6">
                {contacts.map((c) => (
                  <div key={c.name} className="border-l-2 border-blue-500 pl-4 py-1">
                    <p className="font-black text-[10px] uppercase tracking-widest text-blue-400 mb-1">{c.name}</p>
                    {c.phones.map((ph) => (
                      <a key={ph} href={`tel:+91${ph}`} className="block text-xl font-bold hover:text-blue-400 transition-colors">
                        +91 {ph}
                      </a>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Workshop Address</p>
                <p className="text-sm leading-relaxed text-slate-300 font-medium">
                  Naka Madar, Madhav Colony, Street No. 3, Main Road, Madar Railway Station, Ajmer, Rajasthan
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-[3rem] p-10 shadow-xl border border-slate-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Calculator size={24} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Project Estimator</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Name</label>
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 transition font-bold" placeholder="Enter name" />
                  {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Phone</label>
                  <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 transition font-bold" placeholder="+91..." />
                  {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Work Category</label>
                <select value={form.projectType} onChange={(e) => update("projectType", e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 transition font-black appearance-none">
                  <option value="">Select project type</option>
                  {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.projectType && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.projectType}</p>}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Width (ft)</label>
                  <input type="number" step="any" value={form.widthFt} onChange={(e) => update("widthFt", e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 transition font-black text-xl" placeholder="0" />
                  {errors.widthFt && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.widthFt}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Height (ft)</label>
                  <input type="number" step="any" value={form.heightFt} onChange={(e) => update("heightFt", e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 transition font-black text-xl" placeholder="0" />
                  {errors.heightFt && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.heightFt}</p>}
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Total Calculation</span>
                <span className="font-black text-2xl text-slate-900">{totalSqFt === null ? "0.00" : totalSqFt.toFixed(2)} <span className="text-xs">SQ.FT.</span></span>
              </div>

              <button disabled={submitting} type="submit" className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95">
                {submitting ? "Processing..." : "Get Estimate & Chat"} <MessageSquare size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* MAP SECTION */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-black uppercase tracking-widest text-slate-900">Visit Our Workshop</h3>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 mb-10 rounded-full"></div>

          <section className="w-full h-[550px] rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white relative">
            <iframe
              title="M S Trading Co Madar Ajmer"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.9765236688!2d74.67844467542456!3d26.461609876918884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396be7a01f2b634d%3A0x5fddc3c962c9d4ce!2sM.S.%20Trading%20Co.!5e0!3m2!1sen!2sin!4v1714468000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            <a 
              href="https://www.google.com/maps/place/M.S.+Trading+Co./@26.4616051,74.6810196,17z/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black shadow-2xl hover:bg-slate-900 transition-all flex items-center gap-3 uppercase text-xs tracking-widest"
            >
              <MapPin size={20} /> Get GPS Directions
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}