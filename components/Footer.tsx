import React from 'react';
import { Facebook, Instagram, Twitter, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WHATSAPP_NUMBER } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 rounded-t-[2.5rem] lg:rounded-t-[4rem] mt-auto">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
             <Link to="/" className="inline-block mb-6 group">
                <span className="font-heading text-4xl lg:text-5xl font-black tracking-tighter text-white group-hover:text-gray-300 transition-colors">
                  SDG<span className="text-gold-500">.</span>
                </span>
             </Link>
             <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-sm mb-8">
                Curating the finest master-copy sneakers. Bridging the gap between aspiration and reality with uncompromising quality and detail.
             </p>
             <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                   <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                      <Icon size={18} />
                   </a>
                ))}
             </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-lg uppercase tracking-widest mb-6 text-white">Collections</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li><Link to="/shop?category=Sneakers" className="hover:text-gold-500 transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-gold-500 transition-all"></span> Sneakers</Link></li>
              <li><Link to="/shop?category=Slides" className="hover:text-gold-500 transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-gold-500 transition-all"></span> Slides</Link></li>
              <li><Link to="/shop" className="hover:text-gold-500 transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-gold-500 transition-all"></span> New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-gold-500 transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-gold-500 transition-all"></span> Best Sellers</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-lg uppercase tracking-widest mb-6 text-white">Support</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Client Services</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Authenticity</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4 bg-white/5 rounded-3xl p-8 border border-white/10">
            <h4 className="font-heading font-bold text-lg uppercase tracking-widest mb-6 text-white">Get in Touch</h4>
             <div className="space-y-6">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="flex items-start gap-4 group">
                   <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#25D366] transition-colors">
                      <MessageCircle size={20} className="text-white"/>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">WhatsApp Concierge</p>
                      <p className="text-white font-bold text-lg">+91 {WHATSAPP_NUMBER}</p>
                   </div>
                </a>
                
                <div className="flex items-start gap-4 group">
                   <div className="p-3 bg-white/10 rounded-xl group-hover:bg-gold-500 transition-colors">
                      <MapPin size={20} className="text-white"/>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Headquarters</p>
                      <p className="text-white font-medium text-sm leading-snug">Bandra West, Mumbai<br/>Maharashtra 400050</p>
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
             &copy; {new Date().getFullYear()} SDG Sneakers. All Rights Reserved.
           </p>
           
           <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;