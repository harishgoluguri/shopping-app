import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CURRENCY, WHATSAPP_NUMBER } from '../constants';
import { 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  Lock, 
  ArrowLeft,
  CheckCircle,
  QrCode,
  AlertCircle,
  Copy
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, cartTotal, cartSubtotal, discount, appliedCoupon } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSummaryOpen, setSummaryOpen] = useState(false);
  
  // Payment State
  const [utrNumber, setUtrNumber] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleWhatsAppOrder = () => {
    if (!user) return;
    
    // Validation: Require UTR Number
    if (!utrNumber.trim()) {
        const paymentSection = document.getElementById('payment-section');
        paymentSection?.scrollIntoView({ behavior: 'smooth' });
        alert("Please enter the UTR/Transaction ID to proceed.");
        return;
    }

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
*Payment Details:*
Transaction ID / UTR: ${utrNumber}
    
(Please verify this transaction)`;

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (cart.length === 0) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Redirecting...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Redirecting to Login...</div>;

  return (
    <div className="min-h-screen bg-white lg:flex flex-row-reverse font-sans text-[#333]">
      
      {/* RIGHT COLUMN - ORDER SUMMARY */}
      <div className={`lg:w-[45%] bg-[#FAFAFA] border-b lg:border-b-0 lg:border-l border-gray-200 lg:min-h-screen flex flex-col`}>
         
         {/* Mobile Toggle Bar */}
         <div 
            className="lg:hidden bg-[#FAFAFA] p-5 flex justify-between items-center cursor-pointer select-none" 
            onClick={() => setSummaryOpen(!isSummaryOpen)}
         >
            <div className="flex items-center gap-2 text-sm font-bold text-[#111]">
                <span className="text-[#111] flex items-center gap-2">
                    Show order summary {isSummaryOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </span>
            </div>
            <span className="font-heading font-black text-xl">{CURRENCY}{cartTotal.toLocaleString()}</span>
         </div>

         {/* Summary Content */}
         <div className={`${isSummaryOpen ? 'block' : 'hidden'} lg:block flex-1 p-6 lg:p-12 lg:sticky lg:top-0 h-fit`}>
            {/* Cart Items */}
            <div className="space-y-4 mb-8">
                {cart.map(item => {
                    const img = item.images && item.images.length > 0 ? item.images[0] : '';
                    return (
                        <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 items-center">
                            <div className="relative w-16 h-16 border border-gray-200 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                                <img src={img} alt={item.title} className="w-full h-full object-contain mix-blend-multiply p-1"/>
                                <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm z-10">{item.quantity}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-[#111] truncate pr-2">{item.title}</p>
                                <p className="text-xs text-gray-500 font-medium">Size: {item.selectedSize}</p>
                            </div>
                            <p className="text-sm font-bold text-[#111] whitespace-nowrap">{CURRENCY}{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                    )
                })}
            </div>
            
            {/* Breakdown */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="font-bold text-[#111]">{CURRENCY}{cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Shipping</span>
                    <span className="font-bold text-green-700 text-xs uppercase tracking-wider">Free Express</span>
                </div>
                {appliedCoupon && (
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Discount <span className="text-[10px] ml-1 bg-gray-200 px-1.5 py-0.5 rounded text-black font-bold uppercase">{appliedCoupon.code}</span></span>
                        <span className="font-bold text-green-700">-{CURRENCY}{discount.toLocaleString()}</span>
                    </div>
                )}
                <div className="flex justify-between items-center pt-6 mt-2 border-t border-gray-200">
                     <span className="text-base font-bold text-[#111]">Total</span>
                     <div className="flex items-baseline gap-2">
                        <span className="text-xs text-gray-400 font-bold">INR</span>
                        <span className="text-2xl font-heading font-black text-[#111]">{CURRENCY}{cartTotal.toLocaleString()}</span>
                     </div>
                </div>
            </div>
         </div>
      </div>

      {/* LEFT COLUMN - CHECKOUT FORM */}
      <div className="lg:w-[55%] p-6 lg:p-16 lg:pt-20">
        <div className="max-w-xl mx-auto">
            
            {/* Header */}
            <div className="mb-10 text-center lg:text-left">
                <Link to="/" className="font-heading font-black text-2xl tracking-tighter text-[#111] hover:text-gray-600 transition-colors">
                    SDG<span className="text-gold-500">SNEAKERS</span>
                </Link>
                
                {/* Breadcrumbs */}
                <div className="flex items-center justify-center lg:justify-start gap-2 text-[11px] font-bold uppercase tracking-widest mt-6 text-gray-400">
                    <Link to="/cart" className="hover:text-black transition-colors text-black">Cart</Link>
                    <ChevronRight size={12} />
                    <span className="text-black">Information</span>
                    <ChevronRight size={12} />
                    <span className="text-black">Payment</span>
                </div>
            </div>

            {/* Content Box */}
            <div className="space-y-8">
                
                {/* Contact & Ship To Group */}
                <div className="space-y-4">
                     <div className="flex justify-between items-center">
                         <h2 className="text-lg font-heading font-black uppercase tracking-tight">Contact Information</h2>
                         {!user && <Link to="/login" className="text-xs font-bold underline text-black">Log in</Link>}
                     </div>
                     
                     <div className="border border-gray-200 rounded-2xl overflow-hidden text-sm">
                         {/* Email */}
                         <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 bg-white">
                             <span className="text-xs font-bold text-gray-400 uppercase w-20 shrink-0">Contact</span>
                             <span className="font-medium text-[#111] flex-1 truncate">{user.email}</span>
                         </div>
                         
                         {/* Address */}
                         <div className="p-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 bg-white">
                             <span className="text-xs font-bold text-gray-400 uppercase w-20 shrink-0">Ship to</span>
                             <div className="font-medium text-[#111] flex-1 leading-relaxed">
                                {user.address || 'No address provided'}
                             </div>
                             <Link to="/profile" className="text-xs font-bold text-black underline hover:text-gold-600 shrink-0 self-start md:self-center mt-2 md:mt-0">Change</Link>
                         </div>
                     </div>
                </div>

                {/* Shipping Method */}
                <div>
                    <h2 className="text-lg font-heading font-black uppercase tracking-tight mb-4">Shipping Method</h2>
                    <div className="border border-black bg-gray-50 rounded-2xl p-4 flex justify-between items-center relative">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center shadow-sm">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-sm font-bold text-[#111]">Express Courier (Bluedart/Delhivery)</span>
                        </div>
                        <span className="text-sm font-bold text-[#111]">Free</span>
                    </div>
                </div>

                {/* Payment Method */}
                <div id="payment-section">
                    <h2 className="text-lg font-heading font-black uppercase tracking-tight mb-2">Payment</h2>
                    <p className="text-xs text-gray-400 font-medium mb-4 flex items-center gap-1">
                        <Lock size={12} /> All transactions are secure and encrypted.
                    </p>
                    
                    <div className="border border-black rounded-2xl overflow-hidden">
                        <div className="bg-[#F9F9F9] p-4 flex justify-between items-center border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center shadow-sm">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <span className="text-sm font-bold text-[#111]">Scan to Pay (UPI/QR)</span>
                            </div>
                            <QrCode size={20} className="text-black" />
                        </div>
                        
                        <div className="p-8 bg-white flex flex-col items-center">
                            {/* QR CODE DISPLAY */}
                            <div className="mb-6 text-center">
                                <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-300 mb-3 inline-block">
                                    {/* REPLACE THE SRC BELOW WITH YOUR ACTUAL PAYMENT QR CODE */}
                                    <img 
                                        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=sdgsneakers@upi&pn=SDGSneakers" 
                                        alt="Payment QR" 
                                        className="w-40 h-40 object-contain"
                                    />
                                </div>

                                {/* Account Details */}
                                <div className="flex flex-col gap-1 mb-4">
                                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Account Name</p>
                                   <p className="text-sm font-black text-black mb-2">SDG Sneakers</p>
                                   
                                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">UPI ID</p>
                                   <div className="flex items-center justify-center gap-2 bg-gray-100 py-1.5 px-4 rounded-full mx-auto w-fit">
                                     <p className="text-sm font-mono font-bold text-black tracking-wide">sdgsneakers@upi</p>
                                   </div>
                                </div>

                                <div className="my-4">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Payable Amount</p>
                                    <p className="text-3xl font-heading font-black text-black">{CURRENCY}{cartTotal.toLocaleString()}</p>
                                </div>
                            </div>
                            
                            {/* Warning Note */}
                             <div className="w-full bg-red-50 border border-red-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                                <div className="bg-red-100 p-1.5 rounded-full shrink-0">
                                    <AlertCircle size={16} className="text-red-600" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[11px] font-bold text-red-800 uppercase tracking-wide mb-1">Payment Warning</p>
                                    <p className="text-[10px] text-red-600 font-medium leading-relaxed">
                                        Please ensure you transfer the exact amount. Sending a lower amount may result in loss of funds. 
                                        Providing a fake UTR/Transaction ID will result in an <span className="underline font-bold">immediate and permanent account ban</span>.
                                    </p>
                                </div>
                             </div>

                            <div className="w-full h-[1px] bg-gray-100 mb-6"></div>

                            {/* UTR INPUT SECTION */}
                            <div className="w-full">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold uppercase tracking-widest text-black">Enter UTR / Transaction ID</span>
                                    <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded">* Required</span>
                                </div>
                                
                                <input 
                                    type="text" 
                                    value={utrNumber}
                                    onChange={(e) => setUtrNumber(e.target.value)}
                                    placeholder="e.g. 123456789012"
                                    className="w-full bg-[#F9F9F9] border-2 border-gray-200 rounded-2xl px-5 py-4 font-bold text-black placeholder-gray-400 focus:bg-white focus:border-black focus:outline-none transition-all"
                                />
                                <div className="flex items-start gap-2 mt-3">
                                    <CheckCircle size={14} className="text-green-600 mt-0.5 shrink-0" />
                                    <p className="text-[10px] text-gray-400 leading-tight">
                                        After making the payment via UPI or Scanning the QR code above, please find the 12-digit UTR number or Transaction ID in your payment app and enter it here for verification.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button 
                        onClick={handleWhatsAppOrder}
                        disabled={!utrNumber.trim()}
                        className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.15em] text-sm shadow-xl transition-all active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-3
                        ${utrNumber.trim() 
                            ? 'bg-[#25D366] hover:bg-[#20b957] text-white shadow-green-100 hover:shadow-green-200 hover:-translate-y-1' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    >
                         <MessageCircle size={20} fill={utrNumber.trim() ? "white" : "none"} /> 
                         {utrNumber.trim() ? "Complete Order" : "Enter UTR to Continue"}
                    </button>
                    
                    <Link to="/cart" className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400 hover:text-black mt-6 transition-colors">
                        <ArrowLeft size={14} /> Return to Bag
                    </Link>
                </div>
                
                {/* Footer Links */}
                <div className="border-t border-gray-100 pt-6 flex gap-6 text-[10px] text-gray-400 font-medium">
                    <a href="#" className="hover:underline">Refund Policy</a>
                    <a href="#" className="hover:underline">Shipping Policy</a>
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:underline">Terms of Service</a>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;