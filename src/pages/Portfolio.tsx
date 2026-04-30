import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Camera } from 'lucide-react';

const projects = [
  { 
    title: "Commercial Toughened Elevation", 
    category: "Commercial", 
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070", 
    desc: "Large scale structural glazing for a multi-story shopping complex in Ajmer." 
  },
  { 
    title: "Glass & Aluminium Facade", 
    category: "Industrial", 
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070", 
    desc: "High-durability ACP and glass cladding for manufacturing units." 
  },
  { 
    title: "Modern Office Partitions", 
    category: "Office", 
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2070", 
    desc: "Frameless glass cabins with premium hardware fittings for luxury workspaces." 
  },
  { 
    title: "Luxury UPVC Fenestration", 
    category: "Residential", 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070", 
    desc: "Premium soundproof window systems for high-end villas and apartments." 
  },
  { 
    title: "Mall Interior Glasswork", 
    category: "Retail", 
    image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=2070", 
    desc: "Glass railings and automatic sliding door systems for high-traffic areas." 
  },
  { 
    title: "Showroom Front Glazing", 
    category: "Commercial", 
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070", 
    desc: "High-visibility toughened glass for luxury car and fashion showrooms." 
  }
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- REMOVED LOCAL NAVBAR --- */}
      {/* Navbar is now handled globally in App.tsx to prevent overlapping */}

      {/* 1. Hero Header - pt-32 added to sit below global navbar */}
      <header className="relative pt-32 pb-24 px-6 bg-[#0a192f] text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 text-blue-400 text-xs font-bold tracking-widest uppercase">
            <Camera size={14} /> Completed Projects
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Masterpieces.</span></h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            From industrial elevations to luxury residential glasswork, we deliver quality that defines Ajmer's modern architecture.
          </p>
        </div>
      </header>

      {/* 2. Projects Grid - Aluminium spelling fixed in data above */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((p, i) => (
            <div key={i} className="group overflow-hidden rounded-[2.5rem] bg-white border border-slate-200 shadow-xl transition-all hover:shadow-2xl">
              <div className="h-80 overflow-hidden relative bg-slate-100">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 border border-white/20 shadow-sm">
                  {p.category}
                </div>
              </div>
              
              <div className="p-10">
                <h3 className="text-2xl font-black mb-3 text-slate-900 uppercase tracking-tighter">{p.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed text-sm font-medium">{p.desc}</p>
                
                <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-100">
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 text-blue-600 font-black hover:gap-3 transition-all group/btn text-xs uppercase tracking-widest"
                  >
                    Request Design 
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  <a 
                    href="tel:+917425060129" 
                    className="inline-flex items-center gap-2 bg-slate-100 text-slate-900 px-5 py-2.5 rounded-xl text-[10px] font-black hover:bg-blue-600 hover:text-white transition-all shadow-sm uppercase tracking-widest active:scale-95"
                  >
                    <Phone size={14} /> Call Amit
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Footer Placeholder */}
      <footer className="py-16 text-center text-slate-400 border-t border-slate-200">
        <p className="font-black uppercase tracking-[0.3em] text-[10px]">© 2026 M.S. TRADING CO. - NEAR MADAR RAILWAY STATION, AJMER</p>
      </footer>

    </div>
  );
}