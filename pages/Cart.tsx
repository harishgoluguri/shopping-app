import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CURRENCY } from '../constants';
import { Trash2, ArrowRight, Minus, Plus, Tag, X, Check, ShoppingBag } from 'lucide-react';

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
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
           <ShoppingBag size={32} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-heading font-black mb-3 text-black">Bag is Empty</h2>
        <p className="text-gray-400 font-medium mb-8 max-w-xs mx-auto">Looks like you haven't found your vibe yet.</p>
        <Link to="/shop" className="bg-black text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all shadow-xl">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-20 pb-40 lg:pb-20">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-12">
        <h1 className="text-3xl md:text-5xl font-heading font-black mb-8 lg:mb-12 mt-4">MY BAG <span className="text-gray-300 text-2xl">({cart.length})</span></h1>
        
        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Cart Items List */}
          <div className="flex-1 space-y-4">
            {cart.map((item) => {
              const displayImage = item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150';
              
              return (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 bg-white border border-gray-100 p-4 rounded-[1.5rem] shadow-sm relative group">
                  <Link to={`/product/${item.id}`} className="w-24 h-24 bg-[#F5F5F7] rounded-xl flex-shrink-0 flex items-center justify-center p-2">
                    <img src={displayImage} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                  </Link>
                  
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <Link to={`/product/${item.id}`} className="text-sm md:text-base font-bold text-black leading-tight line-clamp-2 mb-1">{item.title}</Link>
                        <p className="text-xs text-gray-400 font-bold uppercase">{item.category} • Size {item.selectedSize}</p>
                      </div>
                      <span className="font-heading font-bold text-sm">{CURRENCY}{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                      {/* Qty Stepper */}
                      <div className="flex items-center bg-[#F5F5F7] rounded-full px-2 py-1 gap-3">
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, -1)} 
                            disabled={item.quantity <= 1} 
                            className="w-6 h-6 flex items-center justify-center bg-white rounded-full text-black shadow-sm disabled:opacity-50"
                          >
                            <Minus size={12}/>
                          </button>
                          <span className="text-xs font-bold w-3 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, 1)} 
                            className="w-6 h-6 flex items-center justify-center bg-black text-white rounded-full shadow-sm"
                          >
                            <Plus size={12}/>
                          </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Summary Card */}
          <div className="hidden lg:block lg:w-[380px] flex-shrink-0">
            <div className="bg-[#F5F5F7] p-8 rounded-[2rem] sticky top-28">
              <h2 className="text-xl font-heading font-black mb-6 uppercase">Order Summary</h2>
              
              {/* Coupon Input */}
              <div className="mb-6">
                 {!appliedCoupon ? (
                   <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={couponCode} 
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="PROMO CODE"
                        className="flex-1 bg-white border-none rounded-xl px-4 py-3 text-xs font-bold uppercase placeholder-gray-400 outline-none focus:ring-2 focus:ring-black"
                      />
                      <button 
                        onClick={handleApplyCoupon}
                        className="bg-black text-white px-4 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37] hover:text-black transition-colors"
                      >
                        Apply
                      </button>
                   </div>
                 ) : (
                   <div className="bg-white p-3 rounded-xl flex justify-between items-center shadow-sm">
                      <div className="flex items-center gap-2">
                         <div className="bg-green-100 text-green-600 p-1.5 rounded-full"><Tag size={12} /></div>
                         <div>
                           <span className="text-xs font-black uppercase text-green-700 block">{appliedCoupon.code}</span>
                           <span className="text-[10px] text-gray-500 block">Applied successfully</span>
                         </div>
                      </div>
                      <button onClick={removeCoupon} className="text-gray-400 hover:text-red-500 transition-colors"><X size={14} /></button>
                   </div>
                 )}
                 {couponMsg && (
                   <p className={`text-[10px] font-bold mt-2 ml-1 ${couponMsg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                     {couponMsg.text}
                   </p>
                 )}
              </div>

              <div className="space-y-3 mb-6 text-sm font-medium border-t border-gray-200 pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">{CURRENCY}{cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- {CURRENCY}{discount.toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between text-xl font-heading font-black mb-8 border-t border-black pt-6">
                <span>Total</span>
                <span>{CURRENCY}{cartTotal.toLocaleString()}</span>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-black text-white py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-lg flex items-center justify-center gap-2"
              >
                Checkout <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Summary Footer */}
      {/* Changed bottom-[72px] to bottom-0 now that the nav bar is gone */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-40 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-[1.5rem]">
         {/* Coupon Toggler (Simplified for mobile space) */}
         <div className="flex items-center justify-between mb-3 text-xs">
            <button onClick={() => document.getElementById('mobile-coupon')?.classList.toggle('hidden')} className="font-bold text-gray-500 flex items-center gap-1 underline">
               {appliedCoupon ? 'Promo Applied' : 'Have a promo code?'}
            </button>
            <div className="flex flex-col items-end">
               {appliedCoupon && <span className="text-green-600 font-bold text-[10px]">- {CURRENCY}{discount}</span>}
               <span className="font-heading font-black text-lg">{CURRENCY}{cartTotal.toLocaleString()}</span>
            </div>
         </div>

         {/* Hidden Coupon Input for Mobile */}
         <div id="mobile-coupon" className="hidden mb-3 animate-fade-in">
             {!appliedCoupon ? (
               <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={couponCode} 
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="CODE"
                    className="flex-1 bg-gray-50 border-none rounded-lg px-3 py-2 text-xs font-bold uppercase"
                  />
                  <button onClick={handleApplyCoupon} className="bg-black text-white px-3 rounded-lg font-bold text-xs uppercase">Apply</button>
               </div>
             ) : (
                <div className="flex justify-between bg-green-50 p-2 rounded-lg text-xs">
                   <span className="font-bold text-green-700">{appliedCoupon.code} Applied</span>
                   <button onClick={removeCoupon} className="text-red-500 font-bold">Remove</button>
                </div>
             )}
         </div>

         <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-black text-white py-3.5 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-transform flex justify-between px-6 items-center"
         >
            <span>Checkout</span>
            <ArrowRight size={18} />
         </button>
      </div>
    </div>
  );
};

export default Cart;