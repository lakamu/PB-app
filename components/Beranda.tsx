
import React, { useState, useEffect } from 'react';
import { Plus, Minus, Camera, Trash2, X, Calendar, Tag, Search, Box, ChevronRight, Layers, Package, Edit3, Save, Image as ImageIcon, Sparkles, LayoutGrid } from 'lucide-react';
import { Item } from '../types';

interface BerandaProps {
  items: Item[];
  onAddItem: (item: Item) => void;
  onDeleteItem: (id: string) => void;
  onUpdateItem: (item: Item) => void;
}

export const Beranda: React.FC<BerandaProps> = ({ items, onAddItem, onDeleteItem, onUpdateItem }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State (New & Edit)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    desc: '',
    quantity: 1,
    inputDate: new Date().toISOString().split('T')[0],
    image: null as string | null
  });

  // Sync edit form when selected item changes
  useEffect(() => {
    if (selectedItem) {
      setFormData({
        name: selectedItem.name,
        type: selectedItem.type,
        desc: selectedItem.description,
        quantity: selectedItem.quantity,
        inputDate: selectedItem.inputDate,
        image: selectedItem.image
      });
    } else {
      setIsEditing(false);
    }
  }, [selectedItem]);

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.type || !formData.image) return;
    
    if (isEditing && selectedItem) {
      const updatedItem: Item = {
        ...selectedItem,
        name: formData.name,
        type: formData.type,
        description: formData.desc,
        quantity: formData.quantity,
        inputDate: formData.inputDate,
        image: formData.image as string
      };
      onUpdateItem(updatedItem);
      setSelectedItem(updatedItem);
      setIsEditing(false);
    } else {
      const newItem: Item = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        type: formData.type,
        description: formData.desc,
        inputDate: formData.inputDate,
        quantity: formData.quantity,
        addedDate: new Date().toLocaleDateString('id-ID'),
        image: formData.image as string
      };
      onAddItem(newItem);
      setIsAdding(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      desc: '',
      quantity: 1,
      inputDate: new Date().toISOString().split('T')[0],
      image: null
    });
  };

  const adjustQuantity = (amount: number) => {
    setFormData(prev => ({ ...prev, quantity: Math.max(0, prev.quantity + amount) }));
  };

  return (
    <div className="space-y-8 pb-24">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-gray-900">Daftar Barang</h2>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <Layers size={12} className="text-indigo-500" />
            <span>TOTAL {items.length} ITEM TERSEDIA</span>
          </div>
        </div>
        <button
          onClick={() => { setIsAdding(true); resetForm(); }}
          className="bg-indigo-600 text-white p-4 rounded-2xl shadow-xl shadow-indigo-200 hover:bg-gray-900 transition-all active:scale-90"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Cari koleksi barang..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-6 py-4 bg-white border-2 border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/20 transition-all text-gray-900 font-bold placeholder:text-gray-300"
        />
      </div>

      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
          <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 border border-gray-100">
            <Box size={40} strokeWidth={1.5} />
          </div>
          <div className="space-y-1">
            <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Opps! Kosong</p>
            <p className="text-gray-500 text-sm max-w-[200px]">
              {searchQuery ? `Tidak ada barang bernama "${searchQuery}"` : 'Mulailah menambah barang baru.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:border-indigo-100 transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="h-48 overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-3 left-3">
                  <span className="bg-white/80 backdrop-blur-md text-gray-900 text-[9px] font-black px-3 py-1.5 rounded-full shadow-sm border border-white/40 uppercase tracking-widest">
                    {item.type}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg border border-indigo-400/30">
                    {item.quantity} unit
                  </span>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-black text-gray-900 truncate tracking-tight">{item.name}</h3>
                <div className="flex items-center justify-between mt-1">
                   <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">Lihat Detail</p>
                   <ChevronRight size={14} className="text-gray-300 group-hover:text-indigo-500 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modern Form Modal (Add / Edit) */}
      {(isAdding || (isEditing && selectedItem)) && (
        <div className="fixed inset-0 z-[70] bg-gray-900/60 flex items-center justify-center p-6 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative p-8 bg-gradient-to-r from-gray-900 to-indigo-900 text-white">
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black tracking-tight">{isEditing ? 'Perbarui Barang' : 'Barang Baru'}</h3>
                  <div className="flex items-center gap-2 mt-1 opacity-70">
                    <Sparkles size={14} className="text-indigo-400" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Sistem Inventaris Pro</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setIsAdding(false); setIsEditing(false); }} 
                  className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all border border-white/10"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Box size={120} strokeWidth={1} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Image Upload Section */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">Visual Produk</label>
                <div className="flex justify-center">
                  <label className="relative w-full h-48 bg-gray-50 rounded-[2rem] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 cursor-pointer overflow-hidden group hover:border-indigo-400 hover:bg-indigo-50/30 transition-all shadow-inner">
                    {formData.image ? (
                      <div className="relative w-full h-full">
                        <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="text-white" size={32} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 animate-pulse">
                        <div className="p-5 bg-white rounded-3xl shadow-sm text-indigo-500 group-hover:scale-110 transition-transform">
                          <ImageIcon size={32} />
                        </div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-indigo-500">Ketuk untuk Ambil Foto</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
              </div>

              {/* Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.15em] ml-1 flex items-center gap-1.5">
                    <Tag size={12} className="text-indigo-400" /> Nama Barang
                  </label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl focus:ring-4 focus:ring-indigo-500/5 transition-all text-gray-900 font-bold placeholder:text-gray-300 shadow-sm" placeholder="Contoh: Camera XL" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.15em] ml-1 flex items-center gap-1.5">
                    <LayoutGrid size={12} className="text-indigo-400" /> Kategori
                  </label>
                  <input required type="text" value={formData.type} onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl focus:ring-4 focus:ring-indigo-500/5 transition-all text-gray-900 font-bold placeholder:text-gray-300 shadow-sm" placeholder="Elektronik..." />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.15em] ml-1 flex items-center gap-1.5">
                    <Package size={12} className="text-indigo-400" /> Stok Tersedia
                  </label>
                  <div className="flex items-center gap-3 bg-gray-50 border-2 border-transparent rounded-2xl p-1.5 group-focus-within:bg-white group-focus-within:border-indigo-500/20 transition-all shadow-sm">
                    <button type="button" onClick={() => adjustQuantity(-1)} className="h-11 w-11 bg-white rounded-xl text-gray-900 shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"><Minus size={18} /></button>
                    <input required type="number" min="0" value={formData.quantity} onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))} className="w-full bg-transparent text-center font-black text-gray-900 focus:outline-none text-lg" />
                    <button type="button" onClick={() => adjustQuantity(1)} className="h-11 w-11 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-200 hover:bg-gray-900 transition-all"><Plus size={18} /></button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.15em] ml-1 flex items-center gap-1.5">
                    <Calendar size={12} className="text-indigo-400" /> Tanggal Input
                  </label>
                  <input required type="date" value={formData.inputDate} onChange={(e) => setFormData(prev => ({ ...prev, inputDate: e.target.value }))} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl focus:ring-4 focus:ring-indigo-500/5 transition-all text-gray-900 font-bold shadow-sm" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.15em] ml-1 flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-indigo-400 rotate-90" /> Deskripsi Produk
                </label>
                <textarea value={formData.desc} onChange={(e) => setFormData(prev => ({ ...prev, desc: e.target.value }))} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl focus:ring-4 focus:ring-indigo-500/5 transition-all min-h-[120px] text-gray-900 font-bold placeholder:text-gray-300 shadow-sm" placeholder="Tuliskan spesifikasi atau kondisi barang..." />
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-indigo-600 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-indigo-500/30 hover:bg-gray-900 active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3">
                  {isEditing ? <><Save size={20} /> Simpan Perubahan</> : <><Save size={20} /> Simpan Ke Katalog</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal View (Non-Editing) */}
      {selectedItem && !isEditing && (
        <div className="fixed inset-0 z-[60] bg-gray-900/80 flex items-center justify-center p-6 backdrop-blur-md">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 max-h-[95vh] overflow-y-auto">
            <div className="relative h-64 sm:h-72">
              <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 bg-white/40 backdrop-blur-xl text-gray-900 p-2.5 rounded-full hover:bg-white transition-colors shadow-lg border border-white/20">
                <X size={20} />
              </button>
              <div className="absolute bottom-6 left-8">
                 <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg shadow-indigo-500/30 uppercase tracking-[0.2em]">
                    {selectedItem.type}
                 </span>
              </div>
            </div>
            
            <div className="px-8 pb-8 -mt-2 relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">{selectedItem.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Premium Inventory Record</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsEditing(true)} 
                    className="p-3 bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all border border-transparent"
                  >
                    <Edit3 size={24} />
                  </button>
                  <button 
                    onClick={() => { onDeleteItem(selectedItem.id); setSelectedItem(null); }} 
                    className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all border border-transparent"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>

              <div className="bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100 flex items-center justify-between">
                <div className="space-y-0.5">
                   <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Persediaan</p>
                   <div className="flex items-center gap-3">
                      <Package className="text-indigo-600" size={24} />
                      <span className="text-3xl font-black text-gray-900 leading-none">{selectedItem.quantity}</span>
                      <span className="text-xs font-bold text-gray-400 uppercase">Unit Tersedia</span>
                   </div>
                </div>
                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-indigo-50">
                   <ChevronRight className="text-indigo-300" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.15em]">Tanggal Input</p>
                  <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Calendar size={14} className="text-indigo-500" /> {selectedItem.inputDate}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.15em]">Ditambahkan</p>
                  <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Tag size={14} className="text-indigo-500" /> {selectedItem.addedDate}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Detail Keterangan</h4>
                <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <p className="text-gray-700 text-sm leading-relaxed font-medium">
                    {selectedItem.description || 'Tidak ada catatan deskripsi untuk item ini.'}
                  </p>
                </div>
              </div>

              <button onClick={() => setSelectedItem(null)} className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-xl uppercase tracking-widest text-xs">
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
