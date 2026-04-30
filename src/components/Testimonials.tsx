import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Rajesh Sharma",
    work: "Aluminium Windows",
    text: "Excellent finish and very professional team. Amit personally ensured the installation was perfect.",
    rating: 5
  },
  {
    name: "Suman Verma",
    work: "Toughened Glass Partition",
    text: "The quality of the glass is top-notch. It completely changed the look of our office.",
    rating: 5
  },
  {
    name: "Vikram Singh",
    work: "ACP Sheet Elevation",
    text: "M.S. Trading provided a very competitive quote and delivered on time. Highly recommended.",
    rating: 4
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Client Feedback</p>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900">What People Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-slate-50 p-8 rounded-[2.5rem] relative group hover:bg-blue-600 transition-colors duration-500"
            >
              <Quote className="absolute top-6 right-8 text-slate-200 group-hover:text-blue-400 transition-colors" size={40} />
              
              <div className="flex gap-1 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-slate-600 group-hover:text-white transition-colors mb-6 font-medium italic">
                "{rev.text}"
              </p>

              <div>
                <p className="font-black uppercase tracking-tight group-hover:text-white">{rev.name}</p>
                <p className="text-[10px] font-bold text-blue-600 group-hover:text-blue-200 uppercase tracking-widest">{rev.work}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}