import React from 'react';
import { Facebook, Instagram, Twitter, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WHATSAPP_NUMBER } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111] text-white pt-24 pb-12 rounded-t-[3rem]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Top Section with Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-12">
           <div className="max-w-md">
              <h2 className="text-4xl font-heading font-black tracking-tighter mb-6">JOIN THE CULT.</h2>
              <p className="text-gray-300 mb-8 leading-relaxed font-medium">Subscribe to receive updates, access to exclusive deals, and more.</p>
              <div className="flex gap-4">
                 <input type="email" placeholder="Enter your email" className="bg-white/10 border-none rounded-full px-6 py-4 w-full text-white placeholder-gray-400 focus:ring-1 focus:ring-white font-medium" />
                 <button className="bg-white text-black px-8 rounded-full font-bold hover:bg-gold-500 transition-colors"><ArrowRight/></button>
              </div>
           </div>

           <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                 <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                    <Icon size={20} />
                 </a>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
          
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-heading text-2xl font-black tracking-tighter mb-6 block">
            SDG<span className="text-gold-500">SNEAKERS</span>
            </span>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Redefining the replica market with premium quality and transparency.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">Shop</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li><Link to="/shop?category=Sneakers" className="hover:text-white transition-colors">Sneakers</Link></li>
              <li><Link to="/shop?category=Slides" className="hover:text-white transition-colors">Slides</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">Support</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Shipping Policy</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">Contact</h4>
            <div className="space-y-4 text-sm font-medium text-gray-400">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="flex items-center gap-2 hover:text-white">
                <MessageCircle size={16} /> +91 {WHATSAPP_NUMBER}
              </a>
              <p>Mon - Sat: 10AM - 8PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-bold uppercase tracking-wider">
          <p>&copy; 2024 SDG SNEAKERS Inc.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;