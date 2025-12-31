
import React, { useState } from 'react';
import { Plus, Trash2, X, Calendar, ClipboardList, Package, Info, Search, Activity as ActivityIcon, ArrowRight, Save, LayoutList, History as HistoryIcon, User } from 'lucide-react';
import { Item, Activity, BorrowedItem } from '../types';

interface HistoryProps {
  activities: Activity[];
  items: Item[];
  onAddActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
}

export const HistoryView: React.FC<HistoryProps> = ({ activities, items, onAddActivity, onDeleteActivity }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [activityName, setActivityName] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [borrowedItems, setBorrowedItems] = useState<BorrowedItem[]>([{ itemId: '', quantity: 1 }]);

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddRow = () => setBorrowedItems([...borrowedItems, { itemId: '', quantity: 1 }]);
  const handleItemChange = (index: number, itemId: string) => {
    const newRows = [...borrowedItems];
    newRows[index].itemId = itemId;
    setBorrowedItems(newRows);
  };
  const handleQuantityChange = (index: number, quantity: number) => {
    const newRows = [...borrowedItems];
    newRows[index].quantity = Math.max(1, quantity);
    setBorrowedItems(newRows);
  };
  const handleRemoveRow = (index: number) => {
    if (borrowedItems.length > 1) setBorrowedItems(borrowedItems.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = borrowedItems.filter(bi => bi.itemId !== '');
    if (!activityName || !activityDate || filtered.length === 0) return;
    const newActivity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      name: activityName, date: activityDate, items: filtered
    };
    onAddActivity(newActivity);
    setIsAdding(false);
    resetForm();
  };

  const resetForm = () => {
    setActivityName(''); setActivityDate(''); setBorrowedItems([{ itemId: '', quantity: 1 }]);
  };

  const handleDelete = (id: string) => {
    onDeleteActivity(id);
    setSelectedActivity(null);
  };

  return (
    <div className="space-y-8 pb-24">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-gray-900">History</h2>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <ActivityIcon size={12} className="text-indigo-500" />
            <span>LACAK {activities.length} AKTIVITAS PEMINJAMAN</span>
          </div>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 text-white p-4 rounded-2xl shadow-xl shadow-indigo-200 hover:bg-gray-900 transition-all active:scale-90"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Modern Search */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Cari histori kegiatan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-6 py-4 bg-white border-2 border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/20 transition-all text-gray-900 font-bold placeholder:text-gray-300"
        />
      </div>

      {filteredActivities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
          <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 border border-gray-100">
            <ClipboardList size={40} strokeWidth={1.5} />
          </div>
          <div className="space-y-1">
            <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Histori Kosong</p>
            <p className="text-gray-500 text-sm max-w-[220px]">Belum ada kegiatan yang tercatat. Silakan tambah baru.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 relative ml-3">
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-100"></div>
          {filteredActivities.map((activity, idx) => (
            <div
              key={activity.id}
              onClick={() => setSelectedActivity(activity)}
              className="group relative pl-10 animate-in fade-in slide-in-from-left-4 duration-500"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="absolute left-[-5px] top-6 h-2.5 w-2.5 rounded-full bg-white border-2 border-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)] z-10 transition-transform group-hover:scale-150"></div>
              
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-xl hover:border-indigo-100 transition-all">
                <div className="flex items-center gap-5">
                  <div className="bg-indigo-50 h-14 w-14 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                    <Package size={28} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-gray-900 tracking-tight text-lg leading-none">{activity.name}</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        <Calendar size={10} className="text-indigo-400" /> {activity.date}
                      </div>
                      <div className="h-1 w-1 rounded-full bg-gray-200"></div>
                      <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">
                        {activity.items.length} Barang
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl group-hover:bg-indigo-50 transition-colors">
                  <ArrowRight className="text-gray-300 group-hover:text-indigo-600 transition-colors" size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modern Add Activity Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[70] bg-gray-900/60 flex items-center justify-center p-6 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-8 bg-gradient-to-br from-indigo-600 to-violet-800 text-white relative">
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black tracking-tight">Catat Kegiatan</h3>
                  <div className="flex items-center gap-2 mt-1 opacity-70">
                    <HistoryIcon size={14} className="text-indigo-200" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Alur Peminjaman Barang</p>
                  </div>
                </div>
                <button onClick={() => setIsAdding(false)} className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all border border-white/10">
                  <X size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {/* Basic Info Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1 flex items-center gap-2">
                    <LayoutList size={12} className="text-indigo-500" /> Nama Kegiatan
                  </label>
                  <input required type="text" value={activityName} onChange={(e) => setActivityName(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl focus:ring-4 focus:ring-indigo-500/5 transition-all text-gray-900 font-bold placeholder:text-gray-300 shadow-sm" placeholder="Contoh: Rapat Kerja" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1 flex items-center gap-2">
                    <Calendar size={12} className="text-indigo-500" /> Tanggal Pinjam
                  </label>
                  <input required type="date" value={activityDate} onChange={(e) => setActivityDate(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl focus:ring-4 focus:ring-indigo-500/5 transition-all text-gray-900 font-bold shadow-sm" />
                </div>
              </div>

              {/* Items List Selection */}
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <div className="space-y-0.5">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Daftar Inventaris</label>
                    <p className="text-[9px] text-gray-400 font-bold">Pilih barang dan tentukan jumlahnya</p>
                  </div>
                  <button type="button" onClick={handleAddRow} className="group flex items-center gap-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white px-4 py-2 rounded-xl transition-all shadow-sm">
                    <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Tambah Baris</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {borrowedItems.map((row, index) => (
                    <div key={index} className="flex gap-3 items-center bg-gray-50 p-3 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-white transition-all group animate-in slide-in-from-right duration-300">
                      <div className="flex-1">
                        <select required value={row.itemId} onChange={(e) => handleItemChange(index, e.target.value)} className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none cursor-pointer">
                          <option value="">Pilih Barang...</option>
                          {items.map(item => (
                            <option key={item.id} value={item.id}>
                              {item.name} ({item.quantity} unit)
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-gray-100">
                        <span className="text-[9px] font-black text-gray-400 uppercase">Qty</span>
                        <input required type="number" min="1" value={row.quantity} onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))} className="w-12 bg-transparent text-center font-black text-indigo-600 focus:outline-none" />
                      </div>
                      <button type="button" onClick={() => handleRemoveRow(index)} className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button type="submit" className="w-full bg-gray-900 text-white font-black py-5 rounded-[2rem] shadow-2xl hover:bg-indigo-600 active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3">
                   <Save size={20} /> Simpan Histori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-[60] bg-gray-900/80 flex items-center justify-center p-6 backdrop-blur-md">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-10 bg-gradient-to-br from-indigo-600 to-violet-700 text-white relative">
              <button onClick={() => setSelectedActivity(null)} className="absolute top-8 right-8 bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors border border-white/10">
                <X size={20} />
              </button>
              <div className="space-y-4">
                <div className="bg-white/20 w-fit p-3 rounded-2xl backdrop-blur-md">
                   <ActivityIcon size={32} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-3xl font-black tracking-tight">{selectedActivity.name}</h3>
                  <p className="text-indigo-100 text-[10px] font-black uppercase tracking-[0.2em]">{selectedActivity.date}</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                   <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rincian Barang</h4>
                   <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full uppercase">Receipt</span>
                </div>
                <div className="space-y-3 bg-gray-50/50 p-6 rounded-[2.5rem] border border-gray-100/50">
                  {selectedActivity.items.map((bi, idx) => {
                    const item = items.find(i => i.id === bi.itemId);
                    return (
                      <div key={idx} className="flex items-center gap-5 group">
                        <div className="h-12 w-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-white">
                           {item ? <img src={item.image} className="h-full w-full object-cover" /> : <div className="h-full w-full bg-gray-100 flex items-center justify-center"><Package size={16} className="text-gray-300" /></div>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-gray-900 text-sm truncate uppercase tracking-tight">{item ? item.name : 'Item Terhapus'}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item ? item.type : 'Unknown'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black text-indigo-600">{bi.quantity}</p>
                          <p className="text-[8px] text-gray-400 uppercase font-black tracking-widest">Qty</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => handleDelete(selectedActivity.id)} 
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-red-50 text-red-600 font-black rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm uppercase tracking-widest text-[10px]"
                  title="Hapus Instan"
                >
                  <Trash2 size={16} /> Hapus
                </button>
                <button onClick={() => setSelectedActivity(null)} className="flex-[2] py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-xl uppercase tracking-widest text-[10px]">
                  Selesai
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
