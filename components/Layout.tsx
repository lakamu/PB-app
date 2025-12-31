
import React from 'react';
import { Home, History, User } from 'lucide-react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFF]">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 py-5 flex justify-between items-center border-b border-gray-100/50">
        <div>
          <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Pinjam-Barang Pro
          </h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Premium Inventory</p>
        </div>
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
      </header>
      
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-8">
        {children}
      </main>

      {/* Floating Dock Navigation */}
      <div className="fixed bottom-6 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none">
        <nav className="pointer-events-auto bg-gray-900/95 backdrop-blur-lg border border-white/10 flex items-center justify-around py-3 px-6 rounded-[2rem] shadow-2xl w-full max-w-sm">
          <button
            onClick={() => onViewChange('beranda')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeView === 'beranda' ? 'text-indigo-400 scale-110' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Home size={22} strokeWidth={activeView === 'beranda' ? 2.5 : 2} />
            <span className={`text-[10px] font-bold uppercase tracking-tighter ${activeView === 'beranda' ? 'opacity-100' : 'opacity-0'}`}>Home</span>
          </button>
          
          <div className="h-6 w-[1px] bg-white/10"></div>

          <button
            onClick={() => onViewChange('history')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeView === 'history' ? 'text-indigo-400 scale-110' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <History size={22} strokeWidth={activeView === 'history' ? 2.5 : 2} />
            <span className={`text-[10px] font-bold uppercase tracking-tighter ${activeView === 'history' ? 'opacity-100' : 'opacity-0'}`}>History</span>
          </button>

          <div className="h-6 w-[1px] bg-white/10"></div>

          <button
            onClick={() => onViewChange('akunku')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeView === 'akunku' ? 'text-indigo-400 scale-110' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <User size={22} strokeWidth={activeView === 'akunku' ? 2.5 : 2} />
            <span className={`text-[10px] font-bold uppercase tracking-tighter ${activeView === 'akunku' ? 'opacity-100' : 'opacity-0'}`}>Account</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
