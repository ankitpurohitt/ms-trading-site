import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

// 1. INDUSTRY-LEVEL PRODUCT DATA
const products = [
  {
    title: "Toughened Glass",
    description: "Premium safety glass engineered for high-impact resistance. Ideal for office partitions, shower cubicles, and modern storefronts.",
    image: "https://images.unsplash.com/photo-1591375275635-43034c442475?q=80&w=800&auto=format&fit=crop", // Professional Architectural Image
    features: ["Impact Resistant", "Custom Sizes"]
  },
  {
    title: "UPVC Windows",
    description: "Weather-proof and noise-canceling window systems. Designed for maximum energy efficiency and zero maintenance in the Rajasthan heat.",
    image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop",
    features: ["Noise Reduction", "Heat Insulation"]
  },
  {
    title: "Aluminium Windows",
    description: "Slim-profile, heavy-duty aluminium frames. Perfect for large balcony doors and structural glazing with a sleek, minimalist finish.",
    image: "https://images.unsplash.com/photo-1605117814632-f3c578a7828a?q=80&w=800&auto=format&fit=crop",
    features: ["Slim Profile", "Rust Proof"]
  },
  {
    title: "ACP Sheet",
    description: "Architectural Aluminum Composite Panels for stunning exterior elevations. High gloss, durable, and available in multiple textures.",
    image: "https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=800&auto=format&fit=crop",
    features: ["Weather Proof", "Vibrant Colors"]
  }
];

// 2. PREMIUM PRODUCT CARD COMPONENT
const ProductCard = ({ title, description, image, features }: any) => (
  <motion.div 
    whileHover={{ y: -12 }}
    className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full"
  >
    {/* Image Container with Zoom */}
    <div className="aspect-[4/5] overflow-hidden relative">
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Small Feature Tags on Image */}
      <div className="absolute bottom-4 left-4 flex gap-2 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
        {features.map((f: string) => (
          <span key={f} className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter text-slate-900">
            {f}
          </span>
        ))}
      </div>
    </div>

    {/* Content Section */}
    <div className="p-8 flex-1 flex flex-col justify-between">
      <div className="space-y-3">
        <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 leading-none">
          {title}
        </h3>
        <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Modern Action Link */}
      <Link 
        to={`/contact?type=${encodeURIComponent(title)}`}
        className="mt-8 inline-flex items-center justify-between w-full bg-slate-900 p-5 rounded-2xl transition-all duration-300 hover:bg-blue-600 shadow-xl active:scale-95"
      >
        <span className="font-black text-[10px] uppercase tracking-[0.2em] text-white">
          Get Instant Quote
        </span>
        <div className="bg-white/20 text-white rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
          <ArrowUpRight size={18} />
        </div>
      </Link>
    </div>
  </motion.div>
);

// 3. MAIN PAGE LAYOUT
export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">Our Catalog</span>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-slate-900">
            Engineered <br/> Solutions
          </h1>
          <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </div>

        {/* Industry Trust Banner */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 border-t border-slate-200 pt-16">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><ShieldCheck size={24}/></div>
            <div>
              <h4 className="font-black uppercase text-xs tracking-widest mb-1">Quality Assured</h4>
              <p className="text-slate-500 text-[10px] font-bold">Industry leading glass standards for Ajmer projects.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Zap size={24}/></div>
            <div>
              <h4 className="font-black uppercase text-xs tracking-widest mb-1">Fast Delivery</h4>
              <p className="text-slate-500 text-[10px] font-bold">Fabricated and installed within promised timelines.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Award size={24}/></div>
            <div>
              <h4 className="font-black uppercase text-xs tracking-widest mb-1">Expert Team</h4>
              <p className="text-slate-500 text-[10px] font-bold">10+ years of professional installation experience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}