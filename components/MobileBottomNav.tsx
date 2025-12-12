import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { cartItemCount } = useCart();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 py-3 px-6 pb-safe z-50 lg:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.03)] rounded-t-[2rem]">
      <div className="flex justify-between items-center max-w-sm mx-auto">
        <Link to="/" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-black' : 'text-gray-400'}`}>
          <Home size={24} strokeWidth={isActive('/') ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        
        <Link to="/shop" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/shop') ? 'text-black' : 'text-gray-400'}`}>
          <Search size={24} strokeWidth={isActive('/shop') ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Shop</span>
        </Link>

        <Link to="/cart" className={`relative flex flex-col items-center gap-1 transition-colors ${isActive('/cart') ? 'text-black' : 'text-gray-400'}`}>
          <div className="relative">
            <ShoppingBag size={24} strokeWidth={isActive('/cart') ? 2.5 : 2} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">Bag</span>
        </Link>

        <Link to="/profile" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/profile') ? 'text-black' : 'text-gray-400'}`}>
          <User size={24} strokeWidth={isActive('/profile') ? 2.5 : 2} />
          <span className="text-[10px] font-bold">You</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomNav;