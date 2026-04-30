import { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, using a simple professional-grade hardcoded check
    // In a real app, this would use Supabase Auth
    if (password === "MST7425") { 
      setIsAuthorized(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
            <Lock className="text-blue-600" size={32} />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Admin Access</h2>
          <p className="text-slate-500 text-sm mb-8 font-medium">Please enter your secure PIN to manage M.S. Trading leads.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input 
                type="password" 
                placeholder="Enter Password" 
                className={`w-full p-5 bg-slate-100 rounded-2xl outline-none border-2 transition-all font-bold tracking-widest ${error ? 'border-red-500 animate-shake' : 'border-transparent focus:border-blue-600'}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all group">
              Unlock Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          {error && <p className="text-red-500 text-[10px] font-black uppercase text-center mt-4 tracking-widest">Incorrect Password</p>}
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}