
import React, { useMemo } from 'react';
import { Mail, User, Info, Smartphone, ExternalLink, ShieldCheck, BadgeCheck, Code2, Sparkles } from 'lucide-react';

export const Akunku: React.FC = () => {
  // Generate a random 10-character ID once per component lifecycle
  const appId = useMemo(() => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Premium Profile Header */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-8 text-white shadow-2xl">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
              <User size={48} className="text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 rounded-full bg-emerald-400 p-1.5 border-4 border-indigo-700 shadow-lg">
              <BadgeCheck size={16} className="text-white" />
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-black tracking-tight">Kaka Tappi_80</h2>
            <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-indigo-100 opacity-90">
              <Code2 size={14} /> Senior Developer
            </p>
          </div>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {/* ID Section */}
        <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100">
              <ShieldCheck size={24} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">ID Aplikasi</p>
              <p className="font-mono text-xl font-bold tracking-widest text-gray-900">{appId}</p>
            </div>
            <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
               <Sparkles size={20} className="text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-100">
              <Mail size={24} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Hubungi Saya</p>
              <p className="text-lg font-bold text-gray-900">latapi100@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* App Stats / About Card */}
      <div className="relative rounded-[2rem] bg-gray-900 p-8 text-white shadow-xl group overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 transition-transform group-hover:scale-110 duration-700">
          <Smartphone size={160} strokeWidth={1} />
        </div>
        
        <div className="relative z-10">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-1 w-8 rounded-full bg-indigo-500"></div>
            <h3 className="text-lg font-bold tracking-wide">PINJAM-BARANG PRO</h3>
          </div>
          
          <p className="mb-8 text-sm leading-relaxed text-gray-400">
            Pinjam-Barang Pro adalah solusi manajemen inventaris cerdas yang dirancang untuk efisiensi tinggi. 
            Dikembangkan dengan fokus pada pengalaman pengguna yang mulus dan visual yang modern.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold shadow-lg shadow-indigo-900/20 transition-all hover:bg-indigo-500 active:scale-95">
              Dokumentasi <ExternalLink size={16} />
            </button>
            <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-6 py-3 text-sm font-bold border border-white/10">
              <Info size={16} className="text-indigo-400" />
              Ver 1.0.0
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="flex flex-col items-center gap-2 py-4">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
          Handcrafted by Kaka Tappi_80
        </p>
        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse"></div>
      </div>
    </div>
  );
};
