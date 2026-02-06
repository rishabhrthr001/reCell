
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { InventoryItem } from '../types';

declare var confetti: any;

interface CartPageProps {
  cart: InventoryItem[];
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const CartPage: React.FC<CartPageProps> = ({ cart, removeFromCart, clearCart }) => {
  const [checkoutStep, setCheckoutStep] = useState<'review' | 'checkout' | 'success'>('review');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const gst = Math.round(cartSubtotal * 0.18);
  const total = cartSubtotal + gst;

  const handleProceedToCheckout = () => {
    setCheckoutStep('checkout');
  };

  const handlePlaceOrder = () => {
    const id = `RC-${Math.floor(Math.random() * 90000) + 10000}`;
    setOrderId(id);
    setCheckoutStep('success');

    // Celebration!
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#4f46e5', '#10b981', '#fbbf24']
    });

    // Auto-redirect to home
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 6000);
  };

  if (cart.length === 0 && checkoutStep !== 'success') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center text-5xl mx-auto mb-8">
          🛒
        </div>
        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Your cart is empty</h2>
        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-10">Upgrade your tech game today</p>
        <Link to="/shop" className="inline-block px-10 py-5 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-700 transition shadow-2xl shadow-indigo-100 uppercase tracking-widest text-xs">
          Browse Store
        </Link>
      </div>
    );
  }

  if (checkoutStep === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="w-28 h-28 bg-indigo-600 text-white rounded-[2.5rem] flex items-center justify-center text-6xl mx-auto mb-12 shadow-2xl shadow-indigo-100 rotate-12">
          🎁
        </div>
        <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter leading-tight">Order Placed <br /> <span className="text-indigo-600">Successfully!</span></h2>
        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mb-12">Redirecting to home in 5 seconds...</p>
        
        <div className="bg-white p-12 rounded-[3.5rem] text-left border-2 border-indigo-50 shadow-2xl space-y-8">
          <div className="flex justify-between items-center border-b border-gray-50 pb-8">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Reference</span>
            <span className="font-mono text-xl font-black text-indigo-600">{orderId}</span>
          </div>
          <div className="space-y-4">
             {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-bold">{item.name}</span>
                  <span className="text-gray-900 font-black">{formatCurrency(item.price)}</span>
                </div>
             ))}
          </div>
          <div className="pt-8 border-t-4 border-indigo-50 flex justify-between items-center">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Paid</span>
            <span className="text-4xl font-black text-gray-900 tracking-tighter">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-16">
        <h1 className="text-5xl font-black text-gray-900 tracking-tighter">My <span className="text-indigo-600">Cart.</span></h1>
        <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.3em] mt-2">Step {checkoutStep === 'review' ? '1' : '2'} of 2: {checkoutStep === 'review' ? 'Review Items' : 'Secure Checkout'}</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-8">
          {checkoutStep === 'review' ? (
            <div className="space-y-6">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="group bg-white p-8 rounded-[2.5rem] border-2 border-gray-50 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 hover:border-indigo-100 transition duration-500 shadow-sm">
                  <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-4">
                    <img src={item.image} className="max-h-full max-w-full object-contain" alt="" />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">{item.brand}</p>
                    <h3 className="text-xl font-black text-gray-900 leading-tight">{item.name}</h3>
                    <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">{item.storage} • Grade {item.grade}</p>
                  </div>
                  <div className="text-center sm:text-right space-y-3">
                    <p className="text-2xl font-black text-gray-900 tracking-tighter">{formatCurrency(item.price)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 font-black uppercase text-[10px] tracking-[0.2em] hover:text-red-600 transition">Remove Item</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-10 animate-in slide-in-from-left duration-500">
              <div className="bg-white p-12 rounded-[3rem] border-2 border-gray-50 space-y-10">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em]">Delivery Information</h3>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full p-6 bg-gray-50 text-gray-900 border-none rounded-2xl font-bold focus:ring-2 focus:ring-indigo-600 outline-none transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Contact Number</label>
                    <input type="tel" placeholder="+91 98765 43210" className="w-full p-6 bg-gray-50 text-gray-900 border-none rounded-2xl font-bold focus:ring-2 focus:ring-indigo-600 outline-none transition" />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Shipping Address</label>
                    <textarea placeholder="Street, Landmark, City, State" className="w-full p-6 bg-gray-50 text-gray-900 border-none rounded-2xl font-bold focus:ring-2 focus:ring-indigo-600 outline-none transition h-32"></textarea>
                  </div>
                </div>
              </div>

              <div className="bg-white p-12 rounded-[3rem] border-2 border-gray-50 space-y-10">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em]">Payment Method (Mock)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['UPI', 'Credit Card', 'Cash on Delivery'].map(method => (
                    <button 
                      key={method} 
                      onClick={() => setPaymentMethod(method)}
                      className={`p-6 rounded-2xl border-2 font-black text-xs uppercase tracking-widest transition ${paymentMethod === method ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 text-gray-500 bg-white hover:border-indigo-100'}`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <div className="bg-gray-900 rounded-[3rem] p-12 text-white sticky top-28 shadow-2xl space-y-12">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Total Value</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                <span className="font-black">{formatCurrency(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">GST (18%)</span>
                <span className="font-black">{formatCurrency(gst)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Shipping</span>
                <span className="text-green-500 font-black uppercase text-[10px]">Free</span>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-800 space-y-10">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Grand Total</span>
                <span className="text-4xl font-black tracking-tighter">{formatCurrency(total)}</span>
              </div>

              {checkoutStep === 'review' ? (
                <button 
                  onClick={handleProceedToCheckout}
                  className="w-full py-7 bg-indigo-600 rounded-[2rem] font-black text-lg hover:bg-indigo-700 transition shadow-2xl shadow-indigo-900/50 uppercase tracking-widest"
                >
                  Checkout Items
                </button>
              ) : (
                <button 
                  onClick={handlePlaceOrder}
                  className="w-full py-7 bg-green-600 rounded-[2rem] font-black text-lg hover:bg-green-700 transition shadow-2xl shadow-green-900/50 uppercase tracking-widest"
                >
                  {paymentMethod === 'Cash on Delivery' ? 'Confirm COD Order' : `Pay via ${paymentMethod}`}
                </button>
              )}
              
              <div className="flex items-center justify-center space-x-3 opacity-50">
                <span className="text-[9px] font-black uppercase tracking-widest">🔒 Secure Payment</span>
                <span className="text-[9px] font-black uppercase tracking-widest">• Verified Seller</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
