import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  CheckCircle, 
  Trash2, 
  Clock, 
  Users, 
  TrendingUp, 
  Phone, 
  Calendar,
  LogOut
} from 'lucide-react';
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Quote {
  id: number;
  customer_name: string;
  phone_number: string;
  glass_type: string;
  message: string;
  created_at: string;
  status: string;
}

export default function Admin() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (err) {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'New' ? 'Contacted' : 'Closed';
    const { error } = await supabase
      .from('quotes')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      toast.success(`Updated to ${newStatus}`);
      fetchQuotes();
    }
  };

  const deleteLead = async (id: number) => {
    if (!window.confirm("Delete this lead permanently?")) return;
    const { error } = await supabase.from('quotes').delete().eq('id', id);
    if (!error) {
      toast.success("Lead deleted");
      fetchQuotes();
    }
  };

  // Analytics Logic
  const totalLeads = quotes.length;
  const newLeads = quotes.filter(q => q.status === 'New').length;
  const contactedLeads = quotes.filter(q => q.status === 'Contacted').length;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">Leads Dashboard</h1>
            <p className="text-slate-500 font-medium">Manage inquiries for M.S. Trading Co.</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
          >
            <LogOut size={16} /> Logout Session
          </button>
        </div>

        {/* ANALYTICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4"><Users size={24}/></div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Inquiries</p>
            <p className="text-4xl font-black text-slate-900">{totalLeads}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4"><Clock size={24}/></div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">New Requests</p>
            <p className="text-4xl font-black text-slate-900">{newLeads}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4"><TrendingUp size={24}/></div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Contacted</p>
            <p className="text-4xl font-black text-slate-900">{contactedLeads}</p>
          </motion.div>
        </div>

        {/* LEADS TABLE */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Customer Info</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Requirement</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Status</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6">
                      <p className="font-black text-slate-900 uppercase tracking-tight">{quote.customer_name}</p>
                      <div className="flex items-center gap-2 text-blue-600 mt-1">
                        <Phone size={12} />
                        <a href={`tel:${quote.phone_number}`} className="text-xs font-bold hover:underline">{quote.phone_number}</a>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block mb-1">
                        {quote.glass_type}
                      </span>
                      <p className="text-xs text-slate-500 font-medium">{quote.message}</p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2 font-bold uppercase">
                        <Calendar size={10} /> {new Date(quote.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        quote.status === 'New' ? 'bg-orange-100 text-orange-600' : 
                        quote.status === 'Contacted' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => updateStatus(quote.id, quote.status)}
                          className="p-3 bg-slate-100 text-slate-900 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                          title="Advance Status"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          onClick={() => deleteLead(quote.id)}
                          className="p-3 bg-slate-100 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                          title="Delete Lead"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {quotes.length === 0 && (
            <div className="p-20 text-center text-slate-400 uppercase font-black tracking-widest text-xs">
              No inquiries found in the database.
            </div>
          )}
        </div>

        {/* YOUR SIGNATURE FOOTER */}
        <footer className="mt-20 py-10 border-t border-slate-100 flex flex-col items-center gap-4">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.3em]">
            Enterprise System Managed by <span className="text-slate-900 font-black hover:text-blue-600 transition-colors cursor-crosshair">Ankit Develops</span>
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Server Secure • Version 2.0.4</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
