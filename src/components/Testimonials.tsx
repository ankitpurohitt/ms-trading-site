import { motion } from "framer-motion";
import { Star, Quote, Building2 } from "lucide-react";

const testimonials = [
  {
    name: "Grand Xenia Hotel",
    location: "Ajmer",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000",
    text: "M.S. Trading delivered exceptional toughened glass work for our lobby and suites. Their precision and professional approach are unmatched in Rajasthan.",
    rating: 5
  },
  {
    name: "The Fern Residency",
    location: "Ajmer",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
    text: "The premium UPVC windows and ACP facade work provided by Amit and his team significantly enhanced our building's aesthetics and insulation.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 px-6 bg-[#020617] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs">Landmark Projects</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-4 text-white">
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
              className="group relative bg-white/[0.03] border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-sm"
            >
              <div className="aspect-video overflow-hidden relative">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
                <div className="absolute bottom-6 left-8 flex items-center gap-2 text-white">
                  <Building2 className="text-blue-500" size={20} />
                  <span className="font-black uppercase tracking-widest text-sm">{t.name}</span>
                </div>
              </div>

              <div className="p-10 space-y-6">
                <Quote className="text-blue-500/40" size={40} />
                <p className="text-slate-300 text-lg italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="text-white">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Location</p>
                    <p className="font-bold">{t.location}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, index) => (
                      <Star key={index} size={16} className="fill-blue-500 text-blue-500" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}