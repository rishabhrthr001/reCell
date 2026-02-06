
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INVENTORY } from '../constants';
import { InventoryItem } from '../types';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

interface ShopPageProps {
  cart: InventoryItem[];
  addToCart: (item: InventoryItem) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ cart, addToCart }) => {
  const [filterBrand, setFilterBrand] = useState<string>('All');
  const navigate = useNavigate();
  
  const filtered = filterBrand === 'All' 
    ? INVENTORY 
    : INVENTORY.filter(i => i.brand === filterBrand);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
        <div className="space-y-3">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Upgrade <span className="text-indigo-600">Smart.</span></h1>
          <p className="text-lg text-gray-500 font-medium">Verified refurbished flagships. 12-Month warranty.</p>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
          {['All', 'Apple', 'Samsung', 'Google'].map(b => (
            <button
              key={b}
              onClick={() => setFilterBrand(b)}
              className={`px-8 py-3 rounded-2xl font-black transition whitespace-nowrap text-sm tracking-tight ${filterBrand === b ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-100 scale-105' : 'bg-white text-gray-600 border-2 border-gray-50 hover:border-gray-200'}`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filtered.map((item) => (
          <ProductCard key={item.id} item={item} onAddToCart={() => addToCart(item)} />
        ))}
      </div>

      {cart.length > 0 && (
        <button 
          onClick={() => navigate('/cart')}
          className="fixed bottom-10 right-10 bg-gray-900 text-white p-6 rounded-[2.5rem] shadow-2xl flex items-center space-x-4 z-40 hover:scale-110 active:scale-95 transition group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <div className="text-left leading-none">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{cart.length} Items</p>
            <p className="text-xl font-black tracking-tighter">{formatCurrency(cartTotal)}</p>
          </div>
        </button>
      )}
    </div>
  );
};

const ProductCard: React.FC<{ item: InventoryItem; onAddToCart: () => void }> = ({ item, onAddToCart }) => {
  const gradeColors = {
    'A': 'bg-green-100 text-green-700',
    'B': 'bg-blue-100 text-blue-700',
    'C': 'bg-gray-100 text-gray-700'
  };

  const gradeLabels = {
    'A': 'Pristine',
    'B': 'Excellent',
    'C': 'Fair'
  };

  return (
    <div className="group bg-white rounded-[3rem] border-2 border-gray-50 overflow-hidden hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 flex flex-col p-4 relative">
      <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-[2.5rem] flex items-center justify-center p-12">
        <img 
          src={item.image} 
          alt={item.name} 
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition duration-700 drop-shadow-2xl" 
        />
        <div className="absolute top-6 left-6">
          <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${gradeColors[item.grade]}`}>
            Grade {item.grade}: {gradeLabels[item.grade]}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex-grow flex flex-col">
        <div className="space-y-2 mb-6">
          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">{item.brand}</p>
          <h3 className="text-2xl font-black text-gray-900 leading-tight tracking-tight">{item.name}</h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.storage}</p>
        </div>
        
        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-300 line-through font-bold mb-1">{formatCurrency(item.originalPrice)}</p>
            <p className="text-3xl font-black text-gray-900 tracking-tighter leading-none">{formatCurrency(item.price)}</p>
          </div>
          <button 
            onClick={onAddToCart}
            className="w-14 h-14 bg-gray-900 text-white rounded-[1.5rem] flex items-center justify-center hover:bg-indigo-600 transition shadow-xl group-hover:rotate-6 active:scale-90"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
