
import React, { useState, useEffect } from 'react';
import { SellRequest, DeviceModel, Brand } from '../types';
import { BRANDS, BRAND_LOGOS, MODELS, STORAGE_OPTIONS, AGE_OPTIONS } from '../constants';

interface SellFlowProps {
  sellRequest: SellRequest;
  setSellRequest: React.Dispatch<React.SetStateAction<SellRequest>>;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const SellFlow: React.FC<SellFlowProps> = ({ sellRequest, setSellRequest }) => {
  const [step, setStep] = useState(1);
  const [calculating, setCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const calculatePrice = () => {
    if (!sellRequest.model) return 0;
    
    let price = sellRequest.model.basePrice;
    
    if (sellRequest.screenCondition === 'minor') price *= 0.85;
    if (sellRequest.screenCondition === 'cracked') price *= 0.5;
    if (sellRequest.bodyCondition === 'minor') price *= 0.92;
    if (sellRequest.bodyCondition === 'heavy') price *= 0.7;
    
    const failures = Object.values(sellRequest.functionalChecks).filter(v => !v).length;
    price *= Math.pow(0.88, failures);
    
    if (!sellRequest.isPoweredOn) price *= 0.4;
    if (sellRequest.networkIssues) price *= 0.8;
    if (sellRequest.waterDamage) price *= 0.3;
    if (sellRequest.batteryHealth < 80) price *= 0.9;
    
    return Math.round(price);
  };

  const handleFinishAssessment = () => {
    setCalculating(true);
    const finalPrice = calculatePrice();
    setSellRequest(prev => ({ ...prev, estimatedPrice: finalPrice }));
    
    setTimeout(() => {
      setCalculating(false);
      setShowResult(true);
      setStep(4);
    }, 1800);
  };

  const updateFunctional = (key: keyof SellRequest['functionalChecks']) => {
    setSellRequest(prev => ({
      ...prev,
      functionalChecks: { ...prev.functionalChecks, [key]: !prev.functionalChecks[key] }
    }));
  };

  if (showResult && step === 4) {
    return <PriceResult sellRequest={sellRequest} onSchedule={() => setStep(5)} />;
  }

  if (step === 5) {
    return <PickupForm sellRequest={sellRequest} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-2">
          {['Device', 'Specs', 'Condition'].map((s, i) => (
            <div key={i} className={`text-xs font-bold uppercase tracking-wider ${step > i + 1 ? 'text-green-500' : step === i + 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              {s}
            </div>
          ))}
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-black text-gray-900 leading-tight">Which phone are you <span className="text-indigo-600">selling?</span></h2>
          
          <div className="space-y-4">
            <p className="font-bold text-gray-700">Select Brand</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {BRANDS.map(b => (
                <button
                  key={b}
                  onClick={() => setSellRequest(prev => ({ ...prev, brand: b, model: null }))}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-2 ${sellRequest.brand === b ? 'border-indigo-600 bg-indigo-50 shadow-md scale-105' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                >
                  <img src={BRAND_LOGOS[b]} alt={b} className="h-6 w-auto opacity-80" />
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${sellRequest.brand === b ? 'text-indigo-700' : 'text-gray-400'}`}>{b}</span>
                </button>
              ))}
            </div>
          </div>

          {sellRequest.brand && (
            <div className="space-y-4 pt-4 animate-in fade-in zoom-in-95">
              <p className="font-bold text-gray-700">Select Model</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {MODELS.filter(m => m.brand === sellRequest.brand).map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSellRequest(prev => ({ ...prev, model: m }))}
                    className={`flex flex-col items-center p-5 rounded-3xl border-2 transition-all group overflow-hidden ${sellRequest.model?.id === m.id ? 'border-indigo-600 bg-indigo-50 shadow-lg' : 'border-gray-100 bg-white hover:border-indigo-200'}`}
                  >
                    <div className="w-full aspect-square mb-4 flex items-center justify-center">
                       <img src={m.image} alt={m.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition duration-300" />
                    </div>
                    <span className={`text-sm text-center font-black ${sellRequest.model?.id === m.id ? 'text-indigo-700' : 'text-gray-800'}`}>
                      {m.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-6">
            <button
              disabled={!sellRequest.model}
              onClick={handleNext}
              className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg disabled:opacity-50 hover:bg-indigo-700 transition shadow-xl shadow-indigo-100"
            >
              Check Exact Value
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex items-center space-x-6 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <img src={sellRequest.model?.image} className="w-20 h-20 object-contain" alt="" />
            <div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{sellRequest.brand}</p>
              <h2 className="text-2xl font-black text-gray-900 leading-tight">{sellRequest.model?.name}</h2>
              <button onClick={() => setStep(1)} className="text-indigo-600 text-xs font-black uppercase tracking-widest flex items-center mt-2 group">
                <span className="mr-1 group-hover:-translate-x-1 transition-transform">←</span> Change device
              </button>
            </div>
          </div>

          <div className="space-y-8 bg-white p-8 rounded-3xl border border-gray-50">
            <div>
              <label className="block text-xs font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">1. Storage Capacity</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {STORAGE_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSellRequest(prev => ({ ...prev, storage: opt }))}
                    className={`py-4 rounded-2xl border-2 font-black text-sm transition ${sellRequest.storage === opt ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 text-gray-500 bg-white hover:bg-gray-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">2. Device Age</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {AGE_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSellRequest(prev => ({ ...prev, age: opt }))}
                    className={`p-5 rounded-2xl border-2 font-black text-sm text-left transition ${sellRequest.age === opt ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 text-gray-600 bg-white hover:bg-gray-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button onClick={handleBack} className="flex-1 py-5 border-2 border-gray-100 rounded-2xl font-black text-gray-600 hover:bg-gray-50 transition">Back</button>
            <button disabled={!sellRequest.storage || !sellRequest.age} onClick={handleNext} className="flex-[2] py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-100">Proceed to Diagnostic</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Health <span className="text-indigo-600">Verification</span></h2>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Self-Assessment Tool</p>
          </div>
          
          <div className="space-y-8">
             <div>
              <p className="font-black text-gray-800 mb-4 uppercase text-xs tracking-widest">Screen Condition</p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'excellent', label: 'Flawless', desc: 'No scratches or screen burn-in', icon: '✨' },
                  { id: 'minor', label: 'Normal Wear', desc: 'Hairline scratches only', icon: '📱' },
                  { id: 'cracked', label: 'Damaged', desc: 'Cracks, dead pixels or spots', icon: '⚡' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSellRequest(prev => ({ ...prev, screenCondition: opt.id as any }))}
                    className={`flex items-center p-6 rounded-3xl border-2 text-left transition-all ${sellRequest.screenCondition === opt.id ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                  >
                    <span className="text-2xl mr-5">{opt.icon}</span>
                    <div>
                      <span className={`block font-black text-lg ${sellRequest.screenCondition === opt.id ? 'text-indigo-700' : 'text-gray-800'}`}>{opt.label}</span>
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">{opt.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-black text-gray-800 mb-4 uppercase text-xs tracking-widest">Body Condition</p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'excellent', label: 'Pristine', desc: 'Zero dents or paint chips', icon: '💎' },
                  { id: 'minor', label: 'Minor Scuffs', desc: 'Light scuffs on sides/corners', icon: '🛠️' },
                  { id: 'heavy', label: 'Rough Shape', desc: 'Deep dents or broken glass back', icon: '💥' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSellRequest(prev => ({ ...prev, bodyCondition: opt.id as any }))}
                    className={`flex items-center p-6 rounded-3xl border-2 text-left transition-all ${sellRequest.bodyCondition === opt.id ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                  >
                    <span className="text-2xl mr-5">{opt.icon}</span>
                    <div>
                      <span className={`block font-black text-lg ${sellRequest.bodyCondition === opt.id ? 'text-indigo-700' : 'text-gray-800'}`}>{opt.label}</span>
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">{opt.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="font-black text-gray-800 uppercase text-xs tracking-widest">Functional Scan</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'touch', label: 'Touch Screen', icon: '👆' },
                { key: 'speaker', label: 'Audio Hardware', icon: '🔊' },
                { key: 'camera', label: 'All Cameras', icon: '📸' },
                { key: 'buttons', label: 'Side Buttons', icon: '🔘' },
                { key: 'biometrics', label: 'FaceID / TouchID', icon: '🔒' },
                { key: 'charging', label: 'Charging Input', icon: '🔌' }
              ].map(check => (
                <button
                  key={check.key}
                  onClick={() => updateFunctional(check.key as any)}
                  className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all ${sellRequest.functionalChecks[check.key as keyof SellRequest['functionalChecks']] ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'}`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-xl">{check.icon}</span>
                    <span className="text-sm font-black text-gray-800">{check.label}</span>
                  </div>
                  <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${sellRequest.functionalChecks[check.key as keyof SellRequest['functionalChecks']] ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                    {sellRequest.functionalChecks[check.key as keyof SellRequest['functionalChecks']] ? 'OK' : 'Fail'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border-2 border-gray-100 p-10 rounded-[2.5rem] space-y-10">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-black text-gray-900 text-xl">Power Status</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Does it switch on?</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={sellRequest.isPoweredOn} onChange={(e) => setSellRequest(prev => ({ ...prev, isPoweredOn: e.target.checked }))} className="sr-only peer" />
                <div className="w-16 h-9 bg-gray-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="font-black text-gray-900 text-xl">Battery Health</p>
                <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-2xl text-sm font-black tracking-tighter">{sellRequest.batteryHealth}%</span>
              </div>
              <input 
                type="range" min="0" max="100" 
                value={sellRequest.batteryHealth} 
                onChange={(e) => setSellRequest(prev => ({ ...prev, batteryHealth: parseInt(e.target.value) }))}
                className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[9px] text-gray-400 font-black uppercase tracking-[0.3em]">
                <span>Needs Repair</span>
                <span>Optimized</span>
              </div>
            </div>
          </div>

          <div className="flex gap-6 pt-10">
            <button onClick={handleBack} className="flex-1 py-5 border-2 border-gray-100 rounded-3xl font-black text-gray-600 hover:bg-gray-50 transition uppercase tracking-widest text-xs">Back</button>
            <button 
              onClick={handleFinishAssessment} 
              className={`flex-[2] py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition flex items-center justify-center shadow-2xl shadow-indigo-100 uppercase tracking-widest`}
              disabled={calculating}
            >
              {calculating ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-4 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Calculating...
                </div>
              ) : 'Get Final Quote'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const PriceResult: React.FC<{ sellRequest: SellRequest, onSchedule: () => void }> = ({ sellRequest, onSchedule }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-12 animate-in zoom-in-95 duration-700">
      <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-50">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 p-12 text-center text-white relative">
          <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Locked Offer</div>
          <p className="text-indigo-100/70 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Total Payout</p>
          <h2 className="text-6xl font-black tracking-tighter">{formatCurrency(sellRequest.estimatedPrice)}</h2>
          <p className="mt-6 text-indigo-100/60 text-[10px] font-black uppercase tracking-widest">No Hidden Deductions • Free Shipping</p>
        </div>
        
        <div className="p-10 space-y-10">
          <div className="flex items-center space-x-6 p-6 bg-gray-50 rounded-3xl border border-gray-100">
            <img src={sellRequest.model?.image} className="w-20 h-20 object-contain drop-shadow-xl" alt="" />
            <div>
              <p className="font-black text-gray-900 text-xl leading-tight">{sellRequest.model?.name}</p>
              <p className="text-[10px] font-black text-gray-400 mt-2 uppercase tracking-[0.2em]">{sellRequest.storage} • {sellRequest.age}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] border-b border-gray-50 pb-3">Valuation Insights</h4>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Market Base</span>
              <span className="text-gray-900 font-black">{formatCurrency(sellRequest.model?.basePrice || 0)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Diagnostics</span>
              <span className="text-green-600 font-black uppercase text-[10px] tracking-widest">Verified</span>
            </div>
          </div>

          <div className="bg-indigo-50/50 p-6 rounded-3xl flex items-start space-x-4 border border-indigo-100/30">
            <span className="text-2xl mt-1">⚡</span>
            <p className="text-[11px] text-indigo-900 leading-relaxed font-bold uppercase tracking-tight">
              Instant payout via UPI, IMPS, or Amazon Pay upon doorstep inspection. Takes less than 5 minutes.
            </p>
          </div>

          <button 
            onClick={onSchedule}
            className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition transform hover:-translate-y-1 uppercase tracking-widest"
          >
            Sell Instantly
          </button>
        </div>
      </div>
    </div>
  );
};

const PickupForm: React.FC<{ sellRequest: SellRequest }> = ({ sellRequest }) => {
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center animate-in fade-in duration-1000">
        <div className="w-28 h-28 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center text-6xl mx-auto mb-10 shadow-2xl shadow-green-50 border-4 border-white animate-bounce">
          ✓
        </div>
        <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">Your Slot is <br /> <span className="text-indigo-600">Confirmed!</span></h2>
        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mb-12">Pickup details sent to your registered mobile</p>
        
        <div className="bg-white p-10 rounded-[3rem] text-left mb-12 border-2 border-gray-50 shadow-sm">
          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-6">Booking Details</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Device</span>
            <span className="text-gray-900 font-black tracking-tight">{sellRequest.model?.name}</span>
          </div>
          <div className="flex justify-between items-center pt-6 border-t border-gray-50">
            <span className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Net Payout</span>
            <span className="text-3xl font-black text-indigo-600 tracking-tighter">{formatCurrency(sellRequest.estimatedPrice)}</span>
          </div>
        </div>
        <a href="/" className="inline-block px-12 py-5 bg-gray-900 text-white font-black rounded-3xl hover:scale-105 transition shadow-2xl uppercase tracking-widest text-xs">Done</a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-in slide-in-from-right-12 duration-700">
      <div className="mb-12 space-y-4">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">Confirm <br /> <span className="text-indigo-600">Pickup Details</span></h2>
        <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.3em]">Home Evaluation Specialist Slot</p>
      </div>
      
      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
            <input required type="text" className="w-full p-6 bg-white text-gray-900 border-2 border-gray-100 rounded-3xl focus:border-indigo-600 outline-none transition font-bold shadow-sm" placeholder="e.g. Rahul Sharma" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">WhatsApp Number</label>
            <input required type="tel" className="w-full p-6 bg-white text-gray-900 border-2 border-gray-100 rounded-3xl focus:border-indigo-600 outline-none transition font-bold shadow-sm" placeholder="10 Digit Mobile" />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Evaluation Address</label>
          <textarea required className="w-full p-6 bg-white text-gray-900 border-2 border-gray-100 rounded-3xl focus:border-indigo-600 outline-none h-36 transition font-bold shadow-sm" placeholder="Complete address with landmark & pincode"></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">City</label>
            <select className="w-full p-6 bg-white text-gray-900 border-2 border-gray-100 rounded-3xl focus:border-indigo-600 outline-none transition font-black appearance-none shadow-sm">
              <option>Mumbai</option>
              <option>Delhi NCR</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>Pune</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Pickup Date</label>
            <input 
              required 
              type="date" 
              min={today}
              className="w-full p-6 bg-white text-gray-900 border-2 border-gray-100 rounded-3xl focus:border-indigo-600 outline-none transition font-black shadow-sm" 
            />
          </div>
        </div>

        <div className="pt-10">
          <button type="submit" className="w-full py-7 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition shadow-2xl shadow-indigo-100 uppercase tracking-[0.2em]">
            Schedule Visit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellFlow;
