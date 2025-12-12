import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CURRENCY, WHATSAPP_NUMBER } from '../constants';
import { MessageCircle, ArrowLeft, Receipt, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, cartTotal, cartSubtotal, discount, appliedCoupon } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleWhatsAppOrder = () => {
    if (!user) return;

    let message = `
*NEW ORDER REQUEST* 🛒
------------------
*Customer:* ${user.name}
*Phone:* ${user.phone_number}
*Address:* ${user.address}

*Order Details:*
`;
    
    cart.forEach((item) => {
      message += `
• ${item.title} (Size: ${item.selectedSize}) x ${item.quantity} - ${CURRENCY}${item.price * item.quantity}`;
    });

    if (appliedCoupon) {
      message += `
------------------
Subtotal: ${CURRENCY}${cartSubtotal}
Discount (${appliedCoupon.code}): -${CURRENCY}${discount}
*TOTAL PAYABLE: ${CURRENCY}${cartTotal}*`;
    } else {
      message += `
------------------
*TOTAL PAYABLE: ${CURRENCY}${cartTotal}*`;
    }

    message += `
------------------
Please confirm availability and payment details.`;

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (cart.length === 0) return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center">Redirecting to Login...</div>;

  return (
    <div className="min-h-screen bg-[#F5F5F7] pt-24 pb-24 px-4">
      <div className="max-w-md mx-auto">
        <Link to="/cart" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black mb-6">
           <ArrowLeft size={14} /> Edit Bag
        </Link>
        
        {/* Receipt Card */}
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden relative">
          
          {/* Top Edge Decoration */}
          <div className="h-3 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#fff_10px,#fff_20px)] opacity-10"></div>
          
          <div className="p-8 text-center">
             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <Receipt size={32} />
             </div>
             <h1 className="text-2xl font-heading font-black uppercase mb-1">Order Summary</h1>
             <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Review before confirming</p>
          </div>

          {/* User Info */}
          <div className="px-8 pb-6 border-b border-dashed border-gray-200">
             <div className="bg-[#F5F5F7] rounded-xl p-4 flex gap-3 items-start">
                <CheckCircle2 size={20} className="text-black shrink-0 mt-0.5" />
                <div>
                   <p className="text-xs font-bold uppercase text-gray-400 mb-1">Shipping To</p>
                   <p className="font-bold text-sm">{user.name}</p>
                   <p className="text-xs text-gray-500 mt-1 leading-relaxed">{user.address}</p>
                   <p className="text-xs text-gray-500 mt-1">{user.phone_number}</p>
                </div>
             </div>
          </div>

          {/* Items */}
          <div className="px-8 py-6 space-y-4 max-h-[300px] overflow-y-auto">
             {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-start text-sm">
                   <div className="flex-1 pr-4">
                      <p className="font-bold text-black line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-400">Size: {item.selectedSize} <span className="mx-1">•</span> Qty: {item.quantity}</p>
                   </div>
                   <span className="font-bold whitespace-nowrap">{CURRENCY}{(item.price * item.quantity).toLocaleString()}</span>
                </div>
             ))}
          </div>

          {/* Totals */}
          <div className="bg-gray-50 px-8 py-6 space-y-2">
             <div className="flex justify-between text-xs text-gray-500 font-bold">
                <span>Subtotal</span>
                <span>{CURRENCY}{cartSubtotal.toLocaleString()}</span>
             </div>
             {appliedCoupon && (
                <div className="flex justify-between text-xs text-green-600 font-bold">
                   <span>Coupon ({appliedCoupon.code})</span>
                   <span>-{CURRENCY}{discount.toLocaleString()}</span>
                </div>
             )}
             <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-200">
                <span className="font-heading font-black text-lg">Total</span>
                <span className="font-heading font-black text-2xl">{CURRENCY}{cartTotal.toLocaleString()}</span>
             </div>
          </div>

          {/* Bottom Action */}
          <div className="p-6">
             <button 
               onClick={handleWhatsAppOrder}
               className="w-full bg-[#25D366] text-white py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-lg shadow-green-200 hover:bg-[#20b957] active:scale-95 transition-all flex items-center justify-center gap-2"
             >
               <MessageCircle size={20} fill="white" /> Place Order
             </button>
             <p className="text-[10px] text-gray-400 text-center mt-4 font-medium">
               You will be redirected to WhatsApp to complete your payment securely with our agent.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;