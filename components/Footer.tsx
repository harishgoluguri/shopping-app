import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 mt-auto border-t border-gray-900">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 border-b border-gray-800 pb-16">
          
          {/* Support */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-xs uppercase tracking-widest text-white">Support</h4>
            <ul className="space-y-3 text-xs font-medium text-gray-400">
               <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
               <li><Link to="/policies?section=faq" className="hover:text-white transition-colors">FAQs</Link></li>
               <li><Link to="/policies?section=shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
               <li><Link to="/policies?section=returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
               <li><Link to="/policies?section=cancellation" className="hover:text-white transition-colors">Cancellation Policy</Link></li>
               <li><Link to="/policies?section=payment" className="hover:text-white transition-colors">Payment Methods</Link></li>
               <li><Link to="/contact" className="hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-xs uppercase tracking-widest text-white">Legal & Privacy</h4>
            <ul className="space-y-3 text-xs font-medium text-gray-400">
               <li><Link to="/policies?section=privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
               <li><Link to="/policies?section=terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
               <li><Link to="/policies?section=disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
               <li><Link to="/policies?section=copyright" className="hover:text-white transition-colors">Copyright & IP Policy</Link></li>
               <li><Link to="/policies?section=grievance" className="hover:text-white transition-colors">Grievance Redressal</Link></li>
               <li><Link to="/policies?section=cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-xs uppercase tracking-widest text-white">About SDG</h4>
            <ul className="space-y-3 text-xs font-medium text-gray-400">
               <li><Link to="/about" className="hover:text-white transition-colors">Company Info</Link></li>
               <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
               <li><Link to="/about" className="hover:text-white transition-colors">Sustainability</Link></li>
               <li><Link to="/contact" className="hover:text-white transition-colors">Corporate News</Link></li>
               <li><Link to="/contact" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Connect & Payments */}
          <div className="flex flex-col gap-8">
            <div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-white mb-6">Stay in Touch</h4>
                <div className="flex gap-4">
                   {[Instagram, Facebook, Twitter].map((Icon, i) => (
                      <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                         <Icon size={16} />
                      </a>
                   ))}
                </div>
            </div>

            <div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-white mb-4">Secure Payment</h4>
                <div className="flex gap-2 flex-wrap opacity-70">
                    {/* Simple CSS shapes for card icons style */}
                    <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                    <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">MC</div>
                    <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">UPI</div>
                    <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">COD</div>
                </div>
            </div>
            
             <div className="text-gray-500 text-[10px] leading-relaxed">
                 <p>SDG Sneakers,</p>
                 <p>Bandra West, Mumbai - 400050</p>
                 <p>support@sdgsneakers.com</p>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-4">
               <span className="font-heading font-black text-2xl tracking-tighter text-white">SDG<span className="text-gold-500">.</span></span>
           </div>

           <div className="flex gap-6 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
               <span className="flex items-center gap-2"><div className="w-4 h-3 bg-gradient-to-b from-orange-500 via-white to-green-600 border border-white/20"></div> India</span>
               <span>© {new Date().getFullYear()} SDG Sneakers. All Rights Reserved.</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;