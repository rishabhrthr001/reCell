
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SellFlow from './pages/SellFlow';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminDashboard';
import { SellRequest, InventoryItem } from './types';

const Navbar = ({ cartCount }: { cartCount: number }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <span className="text-white font-black text-2xl tracking-tighter">R</span>
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 tracking-tighter">
                ReCell
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <Link 
              to="/sell" 
              className={`text-sm font-bold uppercase tracking-widest transition ${isActive('/sell') ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-gray-500 hover:text-indigo-600'}`}
            >
              Sell Phone
            </Link>
            <Link 
              to="/shop" 
              className={`text-sm font-bold uppercase tracking-widest transition ${isActive('/shop') ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-gray-500 hover:text-indigo-600'}`}
            >
              Buy Refurbished
            </Link>
            <Link 
              to="/admin" 
              className={`text-sm font-bold uppercase tracking-widest transition ${isActive('/admin') ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-gray-500 hover:text-indigo-600'}`}
            >
              Admin
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative group p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700 group-hover:text-indigo-600 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/sell" className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 hover:-translate-y-0.5 transform">
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl">R</span>
              </div>
              <span className="text-2xl font-black tracking-tighter">ReCell</span>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed">
              India's most trusted platform for buying and selling pre-owned gadgets. Get the best value for your old devices instantly.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                <a key={social} href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition duration-300">
                   <img src={`https://cdn.simpleicons.org/${social}/white`} className="w-5 h-5" alt={social} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-indigo-400">Sell Devices</h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              {['iPhone', 'Samsung', 'OnePlus', 'Google Pixel', 'Tablets', 'Laptops'].map(item => (
                <li key={item} className="hover:text-white transition cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-indigo-400">Shop Refurbished</h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              {['Refurbished iPhones', 'Premium Samsung', 'Google Pixel deals', 'Open Box Devices', 'Warranty Info', 'Shipping Policy'].map(item => (
                <li key={item} className="hover:text-white transition cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-indigo-400">Join our newsletter</h4>
              <p className="text-xs text-gray-500 font-bold mb-4 uppercase tracking-widest">Get tech deals & value alerts</p>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none flex-grow font-bold"
                />
                <button className="bg-indigo-600 px-4 py-3 rounded-xl hover:bg-indigo-700 transition font-black text-xs uppercase tracking-widest">Join</button>
              </div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Support Hotline</p>
              <p className="text-xl font-black text-white">1800-RECELL-99</p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
          <p>&copy; 2024 ReCell Tech Solutions. Made with ♥ in India.</p>
          <div className="flex space-x-8">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [cart, setCart] = useState<InventoryItem[]>([]);
  const [sellRequest, setSellRequest] = useState<SellRequest>({
    brand: null,
    model: null,
    storage: null,
    age: null,
    screenCondition: 'excellent',
    bodyCondition: 'excellent',
    functionalChecks: {
      touch: true,
      speaker: true,
      camera: true,
      buttons: true,
      biometrics: true,
      charging: true,
    },
    isPoweredOn: true,
    batteryHealth: 100,
    networkIssues: false,
    waterDamage: false,
    estimatedPrice: 0,
  });

  const addToCart = (item: InventoryItem) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-[#fcfcfd]">
        <Navbar cartCount={cart.length} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/sell" 
              element={<SellFlow sellRequest={sellRequest} setSellRequest={setSellRequest} />} 
            />
            <Route 
              path="/shop" 
              element={<ShopPage cart={cart} addToCart={addToCart} />} 
            />
            <Route 
              path="/cart" 
              element={<CartPage cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} 
            />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
