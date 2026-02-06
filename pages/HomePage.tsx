
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 sm:pt-28 lg:pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="sm:text-center md:max-w-3xl md:mx-auto lg:col-span-7 lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-left-4 duration-700">
                <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
                India's #1 Resale Platform
              </div>
              <h1 className="text-5xl tracking-tight font-black text-gray-900 sm:text-6xl md:text-7xl leading-[1.05]">
                Get Paid Cash <br />
                <span className="text-indigo-600">Instantly.</span>
              </h1>
              <p className="mt-8 text-lg text-gray-500 font-medium sm:text-xl lg:text-lg xl:text-xl leading-relaxed max-w-2xl">
                The smarter way to sell your old phone. <br className="hidden md:block" /> Guaranteed highest value, free doorstep pickup, and instant bank transfer.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/sell" className="inline-flex items-center justify-center px-10 py-5 border border-transparent text-lg font-black rounded-[2rem] text-white bg-indigo-600 hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition-all transform hover:scale-105 active:scale-95">
                  Check Payout Value
                </Link>
                <Link to="/shop" className="inline-flex items-center justify-center px-10 py-5 border-2 border-gray-100 text-lg font-black rounded-[2rem] text-gray-900 bg-white hover:border-indigo-100 transition-all">
                  Buy Refurbished
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap gap-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] justify-center lg:justify-start">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-3 font-bold text-base">✓</span>
                  No Hidden Costs
                </div>
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-3 font-bold text-base">✓</span>
                  Safe Data Wipe
                </div>
              </div>
            </div>
            <div className="mt-20 relative lg:mt-0 lg:col-span-5 flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="relative group">
                <div className="absolute -inset-10 bg-gradient-to-tr from-indigo-500/10 to-teal-500/10 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative w-full max-w-md bg-white rounded-[3.5rem] p-5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-50 -rotate-3 group-hover:rotate-0 transition duration-700 overflow-hidden">
                   <img
                    className="w-full h-full object-cover rounded-[2.8rem]"
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800"
                    alt="Modern Smartphone Concept"
                  />
                  <div className="absolute bottom-10 left-0 right-0 px-8 text-center bg-gradient-to-t from-white/95 to-transparent pt-24 pb-4">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Next-Gen Appraisal</p>
                    <p className="text-xl font-black text-gray-900">Highest Resale Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 space-y-4">
          <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em]">Our Method</p>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight sm:text-5xl">How ReCell <span className="text-indigo-600">Works</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { step: '01', title: 'Get Quote', desc: 'Answer minor health questions and get an AI-powered instant quote.', icon: '⚡' },
            { step: '02', title: 'Pickup', desc: 'Book a free slot. Our agent arrives at your door for a quick inspection.', icon: '🏡' },
            { step: '03', title: 'Instant Cash', desc: 'Hand over the phone and get paid via UPI or Bank Transfer instantly.', icon: '💰' }
          ].map((item, idx) => (
            <div key={idx} className="group relative bg-white p-12 rounded-[3rem] border-2 border-gray-50 hover:border-indigo-100 transition-all duration-500 hover:shadow-2xl">
              <span className="text-8xl absolute -top-4 -right-2 opacity-5 font-black text-indigo-900 group-hover:opacity-10 transition">{item.step}</span>
              <div className="text-6xl mb-10 group-hover:scale-110 transition duration-500">{item.icon}</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
