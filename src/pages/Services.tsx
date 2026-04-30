import { Link } from 'react-router-dom';
import { 
  Shield, Building2, Wind, ArrowUpRight, 
  CheckCircle2, Phone, Settings, Wrench, Award 
} from 'lucide-react';

const serviceList = [
  { 
    title: "Toughened Glass", 
    desc: "High-tensile safety glass processed at 650°C. Ideal for structural glazing, frameless doors, and shower cubicles.",
    features: ["ISI Certified 12mm-19mm", "Crystal Clear / Frosted / Tinted", "Precision Edge Grinding"],
    brands: "Saint-Gobain / Gold Plus",
    icon: <Shield className="text-blue-600" size={32} />
  },
  { 
    title: "ACP Elevations", 
    desc: "Aluminium Composite Panels for modern building facades. Lightweight, weather-resistant, and available in 50+ shades.",
    features: ["Fire Retardant Grade", "Anti-Fungal Coating", "15+ Years Color Warranty"],
    brands: "Aludecor / Alstrong",
    icon: <Building2 className="text-blue-600" size={32} />
  },
  { 
    title: "UPVC Window Systems", 
    desc: "Multi-chambered profiles for 100% noise reduction and dust protection. High energy efficiency for Rajasthan's climate.",
    features: ["Double/Triple Glazing", "Multi-point Locking", "Lead-Free Profiles"],
    brands: "Fenesta / Deceuninck",
    icon: <Wind className="text-blue-600" size={32} />
  },
  { 
    title: "Hardware & Fittings", 
    desc: "Premium patch fittings, floor springs, and spider fittings for seamless glass installations.",
    features: ["Hydraulic Soft-Close", "Stainless Steel 316 Grade", "Rust-Proof Coating"],
    brands: "Ozone / Dorma / Enox",
    icon: <Settings className="text-blue-600" size={32} />
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- REMOVED LOCAL NAVBAR --- */}
      {/* Navbar is now global in App.tsx */}

      {/* 1. Professional Hero Section - Spelling Fixed to Aluminium */}
      <header className="pt-32 pb-24 px-6 bg-[#0a192f] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-md">
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">Precision Engineering & Quality</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase">Capabilities.</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed italic">
            "Delivering architectural brilliance with the world's most trusted glass and aluminium brands."
          </p>
        </div>
      </header>

      {/* 2. Main Services Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          {serviceList.map((s, idx) => (
            <div key={idx} className="group bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between border-b-8 border-b-transparent hover:border-b-blue-600">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h3 className="text-3xl font-black mb-4 text-slate-900 uppercase tracking-tighter">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6 text-sm">{s.desc}</p>
                
                <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Key Specifications</p>
                  <div className="space-y-3">
                    {s.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <CheckCircle2 size={14} className="text-blue-600" /> {feat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Trusted Brands</p>
                    <p className="text-sm font-black text-slate-800 tracking-tight">{s.brands}</p>
                </div>
                <Link to="/contact" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-slate-900 transition-colors shadow-lg">
                  <ArrowUpRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Brand Showcase */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10">Authorized Material Partners</h4>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <span className="text-2xl font-black italic tracking-tighter">SAINT-GOBAIN</span>
                <span className="text-2xl font-black tracking-tight uppercase">Ozone</span>
                <span className="text-2xl font-black tracking-widest uppercase">Dorma</span>
                <span className="text-2xl font-black italic uppercase">Gold Plus</span>
            </div>
        </div>
      </section>

      {/* 4. After-Sales Commitment Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="bg-blue-600 rounded-[4rem] p-10 md:p-20 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
                <Award size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-[1.1] uppercase tracking-tighter">Lifetime Commitment <br/>& After-Sales.</h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-8 font-medium">
                Our service doesn't end with installation. We provide a **1-Year Complimentary Maintenance Warranty** on all hardware fittings to ensure smooth operation.
              </p>
              <div className="flex flex-wrap gap-4">
                 <div className="bg-blue-700/50 px-6 py-3 rounded-2xl border border-blue-400/30">
                    <p className="text-[10px] font-black uppercase opacity-70">Support</p>
                    <p className="font-bold text-lg uppercase">24/7 Hotline</p>
                 </div>
                 <div className="bg-blue-700/50 px-6 py-3 rounded-2xl border border-blue-400/30">
                    <p className="text-[10px] font-black uppercase opacity-70">Response</p>
                    <p className="font-bold text-lg uppercase">Under 12 Hrs</p>
                 </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20">
              <h4 className="font-black text-xl mb-6 flex items-center gap-3 uppercase tracking-tight"><Wrench size={20}/> Maintenance Includes:</h4>
              <ul className="space-y-4">
                {["Hydraulic Floor Spring Tensioning", "Glass Door Realignment", "Silicon Re-sealing", "Hardware Lubrication", "UPVC Channel Cleaning"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-blue-50">
                    <CheckCircle2 size={16} className="text-blue-300 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call to Action Footer - Clickable Link Fixed */}
      <footer className="bg-slate-900 py-20 px-6 text-center text-white">
        <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Start Your Project with Confidence</h3>
        <p className="text-slate-500 mb-10 max-w-md mx-auto uppercase text-xs font-bold tracking-[0.2em]">Free Technical Site Visit Near Madar, Ajmer</p>
        <a href="tel:+917425060129" className="bg-white text-slate-900 px-12 py-5 rounded-full font-black text-lg hover:bg-blue-600 hover:text-white transition-all shadow-2xl inline-flex items-center gap-3 active:scale-95">
          <Phone size={20} /> +91 74250-60129
        </a>
      </footer>
    </div>
  );
}