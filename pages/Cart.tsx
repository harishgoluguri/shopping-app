import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CURRENCY } from '../constants';
import { Trash2, ArrowRight, Minus, Plus, Tag, X, ShoppingBag, ShieldCheck } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartSubtotal, discount, applyCoupon, removeCoupon, appliedCoupon } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    setCouponMsg(null);
    const result = applyCoupon(couponCode);
    if (result.success) {
      setCouponMsg({ type: 'success', text: result.message });
      setCouponCode('');
    } else {
      setCouponMsg({ type: 'error', text: result.message });
    }
    setTimeout(() => setCouponMsg(null), 3000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white px-6 text-center pt-20">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
           <ShoppingBag size={32} className="text-gray-300" strokeWidth={1.5} />
        </div>
        <h2 className="text-4xl font-heading font-black mb-4 text-black uppercase tracking-tight">Your Bag is Empty</h2>
        <p className="text-gray-400 font-medium mb-10 max-w-md mx-auto leading-relaxed">
          Invest in your style. Explore our latest arrivals and find your next statement piece.
        </p>
        <Link to="/shop" className="bg-black text-white px-12 py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all shadow-xl hover:scale-105">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-40 lg:pb-24">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <h1 className="text-3xl lg:text-5xl font-heading font-black mb-12 lg:mb-16 mt-4 uppercase tracking-tighter">
          Shopping Bag <span className="text-gray-300 ml-2 text-2xl lg:text-4xl align-top">({cart.length})</span>
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-16 relative">
          
          {/* Cart Items List */}
          <div className="flex-1 space-y-0">
            {cart.map((item, index) => {
              const displayImage = item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150';
              
              return (
                <div key={`${item.id}-${item.selectedSize}`} className={`flex gap-6 lg:gap-10 py-10 group ${index !== cart.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="w-32 h-40 lg:w-48 lg:h-56 bg-[#F9F9F9] rounded-2xl flex-shrink-0 flex items-center justify-center p-4 overflow-hidden relative">
                    <img src={displayImage} alt={item.title} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" />
                  </Link>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between py-1 lg:py-2">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <Link to={`/product/${item.id}`} className="text-lg lg:text-2xl font-heading font-bold text-black leading-none uppercase tracking-wide hover:text-gray-600 transition-colors">
                          {item.title}
                        </Link>
                        <span className="font-heading font-bold text-lg lg:text-xl whitespace-nowrap">{CURRENCY}{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] lg:text-xs text-gray-400 font-bold uppercase tracking-widest">{item.category} / Size {item.selectedSize}</p>
                      
                      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 w-fit px-2 py-1 rounded">
                         <ShieldCheck size={12}/> Authenticity Guaranteed
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end mt-6">
                      {/* Qty Stepper - Premium */}
                      <div className="flex items-center border border-gray-200 rounded-full h-10 lg:h-12 w-32 lg:w-40 px-1 relative">
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, -1)} 
                            disabled={item.quantity <= 1} 
                            className="w-10 h-full flex items-center justify-center text-black hover:bg-gray-50 rounded-full transition-colors disabled:opacity-30"
                          >
                            <Minus size={14} strokeWidth={2}/>
                          </button>
                          <span className="flex-1 text-center font-bold text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, 1)} 
                            className="w-10 h-full flex items-center justify-center text-black hover:bg-gray-50 rounded-full transition-colors"
                          >
                            <Plus size={14} strokeWidth={2}/>
                          </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors underline decoration-1 underline-offset-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Summary Card */}
          <div className="hidden lg:block lg:w-[450px] flex-shrink-0">
            <div className="bg-[#F9F9F9] p-10 lg:p-12 rounded-[2.5rem] sticky top-32">
              <h2 className="text-2xl font-heading font-black mb-8 uppercase tracking-tight">Summary</h2>
              
              {/* Coupon Input */}
              <div className="mb-8 relative">
                 {!appliedCoupon ? (
                   <div className="flex gap-0 border-b border-gray-300 pb-1 focus-within:border-black transition-colors">
                      <input 
                        type="text" 
                        value={couponCode} 
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="ENTER PROMO CODE"
                        className="flex-1 bg-transparent border-none px-0 py-3 text-xs font-bold uppercase placeholder-gray-400 outline-none"
                      />
                      <button 
                        onClick={handleApplyCoupon}
                        className="text-black font-black text-xs uppercase tracking-widest hover:opacity-60 transition-opacity"
                      >
                        Apply
                      </button>
                   </div>
                 ) : (
                   <div className="bg-black text-white p-4 rounded-xl flex justify-between items-center shadow-lg">
                      <div className="flex items-center gap-3">
                         <Tag size={14} className="text-gold-500" />
                         <div>
                           <span className="text-xs font-black uppercase text-gold-500 block tracking-widest">{appliedCoupon.code}</span>
                           <span className="text-[10px] text-gray-400 block font-medium">Discount applied</span>
                         </div>
                      </div>
                      <button onClick={removeCoupon} className="text-white/50 hover:text-white transition-colors"><X size={16} /></button>
                   </div>
                 )}
                 {couponMsg && (
                   <p className={`text-[10px] font-bold mt-2 absolute -bottom-6 left-0 ${couponMsg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                     {couponMsg.text}
                   </p>
                 )}
              </div>

              <div className="space-y-4 mb-8 text-sm font-medium border-t border-gray-200 pt-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 uppercase tracking-wide text-xs font-bold">Subtotal</span>
                  <span className="font-bold font-heading text-lg">{CURRENCY}{cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 uppercase tracking-wide text-xs font-bold">Shipping</span>
                  <span className="text-green-700 font-bold text-xs uppercase tracking-widest bg-green-100 px-2 py-1 rounded">Free Express</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between items-center text-green-700">
                    <span className="uppercase tracking-wide text-xs font-bold">Discount</span>
                    <span className="font-bold">- {CURRENCY}{discount.toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-baseline text-2xl font-heading font-black mb-10 border-t border-black pt-6">
                <span className="uppercase tracking-tighter">Total</span>
                <span>{CURRENCY}{cartTotal.toLocaleString()}</span>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-black text-white py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                Checkout Securely <ArrowRight size={16} />
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                 <ShieldCheck size={14} /> Secure Encrypted Payment
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Summary Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 pb-safe z-40 lg:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-[2rem]">
         <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</span>
               <span className="font-heading font-black text-2xl">{CURRENCY}{cartTotal.toLocaleString()}</span>
            </div>
            
            <button 
                onClick={() => document.getElementById('mobile-coupon')?.classList.toggle('hidden')}
                className="text-[10px] font-bold uppercase tracking-widest underline decoration-1 underline-offset-4"
            >
                {appliedCoupon ? 'Promo Applied' : 'Add Promo'}
            </button>
         </div>

         {/* Hidden Coupon Input for Mobile */}
         <div id="mobile-coupon" className="hidden mb-4 animate-fade-in">
             {!appliedCoupon ? (
               <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={couponCode} 
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="CODE"
                    className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-xs font-bold uppercase"
                  />
                  <button onClick={handleApplyCoupon} className="bg-black text-white px-5 rounded-xl font-bold text-xs uppercase">Apply</button>
               </div>
             ) : (
                <div className="flex justify-between bg-black text-white p-3 rounded-xl text-xs items-center">
                   <span className="font-bold text-gold-500 uppercase tracking-wider">{appliedCoupon.code} Applied</span>
                   <button onClick={removeCoupon} className="text-white/70 hover:text-white font-bold"><X size={14}/></button>
                </div>
             )}
         </div>

         <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-black text-white py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-transform flex justify-center items-center gap-3"
         >
            Checkout <ArrowRight size={16} />
         </button>
      </div>
    </div>
  );
};

export default Cart;