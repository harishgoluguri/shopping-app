import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User, ArrowRight, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu
  const [searchOpen, setSearchOpen] = useState(false); // Search Overlay
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopHovered, setShopHovered] = useState(false);
  
  const { user, logout } = useAuth();
  const { cartItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
    setShopHovered(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  // Dynamic Styles based on state
  const isTransparent = isHome && !scrolled && !isOpen && !searchOpen && !shopHovered;
  
  const navBgClass = isTransparent
    ? 'bg-transparent border-transparent'
    : 'bg-white/95 backdrop-blur-xl border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)]';
    
  const textColorClass = isTransparent ? 'text-white' : 'text-black';
  const iconColorClass = isTransparent ? 'text-white' : 'text-black';
  const logoColorClass = isTransparent ? 'text-white' : 'text-black';

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className={`hidden lg:flex justify-between items-center bg-black text-white px-12 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-transform duration-300 z-[60] relative ${scrolled ? '-translate-y-full absolute top-0 w-full' : 'translate-y-0 relative'}`}>
         <span>Complimentary Shipping on Orders Over ₹5000</span>
         <span>Master Copy Quality Guaranteed</span>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${navBgClass} ${scrolled ? 'lg:top-0' : 'lg:top-[35px]'}`}
        onMouseLeave={() => setShopHovered(false)}
      >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-24">
            
            {/* LEFT: Nav Links (Desktop) & Menu (Mobile) */}
            <div className="flex items-center flex-1">
               <button 
                onClick={() => setIsOpen(true)} 
                className={`lg:hidden p-2 -ml-2 hover:opacity-70 transition-opacity ${iconColorClass}`}
              >
                <Menu size={28} strokeWidth={1} />
              </button>

              <div className="hidden lg:flex items-center gap-10">
                <div 
                  className="h-24 flex items-center"
                  onMouseEnter={() => setShopHovered(true)}
                >
                  <Link 
                    to="/shop" 
                    className={`text-[11px] font-bold uppercase tracking-[0.2em] hover:opacity-60 transition-opacity ${textColorClass}`}
                  >
                    Shop
                  </Link>
                </div>
                <Link to="/shop?category=Sneakers" className={`text-[11px] font-bold uppercase tracking-[0.2em] hover:opacity-60 transition-opacity ${textColorClass}`}>Sneakers</Link>
                <Link to="/shop?category=Slides" className={`text-[11px] font-bold uppercase tracking-[0.2em] hover:opacity-60 transition-opacity ${textColorClass}`}>Slides</Link>
                <Link to="/about" className={`text-[11px] font-bold uppercase tracking-[0.2em] hover:opacity-60 transition-opacity ${textColorClass}`}>Story</Link>
              </div>
            </div>

            {/* CENTER: Logo */}
            <div className="flex-1 flex justify-center">
                <Link to="/" className="group">
                  <span className={`font-heading text-3xl lg:text-4xl font-black tracking-tighter transition-colors select-none ${logoColorClass}`}>
                    SDG<span className={isTransparent ? 'text-white' : 'text-black'}>SNEAKERS</span>
                  </span>
                </Link>
            </div>

            {/* RIGHT: Actions */}
            <div className="flex-1 flex justify-end items-center gap-2 lg:gap-6">
               <button 
                  onClick={() => setSearchOpen(true)}
                  className={`p-2 hover:opacity-60 transition-opacity ${iconColorClass}`}
               >
                  <Search size={24} strokeWidth={1} />
               </button>

               <Link to={user ? "/profile" : "/login"} className={`p-2 hover:opacity-60 transition-opacity hidden lg:block ${iconColorClass}`}>
                  <User size={24} strokeWidth={1} />
               </Link>
               
               <Link to="/cart" className={`p-2 hover:opacity-60 transition-opacity relative ${iconColorClass}`}>
                 <ShoppingBag size={24} strokeWidth={1}/>
                 {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-gold-500 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartItemCount}
                  </span>
                 )}
               </Link>
            </div>
          </div>
        </div>

        {/* 3. MEGA MENU (Desktop Hover) */}
        <div 
          className={`absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl transition-all duration-500 overflow-hidden ${shopHovered ? 'max-h-[400px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}
          onMouseEnter={() => setShopHovered(true)}
          onMouseLeave={() => setShopHovered(false)}
        >
          <div className="max-w-[1800px] mx-auto px-12 py-12">
            <div className="grid grid-cols-4 gap-12">
              {/* Column 1: Categories */}
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Categories</h4>
                <ul className="space-y-4">
                  {['Sneakers', 'Slides', 'Clogs', 'Shoes'].map(cat => (
                    <li key={cat}>
                      <Link to={`/shop?category=${cat}`} className="text-lg font-heading font-bold text-black hover:text-gold-500 transition-colors uppercase tracking-wide flex items-center gap-2 group">
                        {cat} <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"/>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Column 2: Collections */}
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Collections</h4>
                <ul className="space-y-4">
                   <li><Link to="/shop?search=jordan" className="text-sm font-bold text-gray-600 hover:text-black transition-colors uppercase tracking-wide">Air Jordan</Link></li>
                   <li><Link to="/shop?search=yeezy" className="text-sm font-bold text-gray-600 hover:text-black transition-colors uppercase tracking-wide">Yeezy Line</Link></li>
                   <li><Link to="/shop?search=dunk" className="text-sm font-bold text-gray-600 hover:text-black transition-colors uppercase tracking-wide">Nike Dunks</Link></li>
                   <li><Link to="/shop?search=new+balance" className="text-sm font-bold text-gray-600 hover:text-black transition-colors uppercase tracking-wide">New Balance</Link></li>
                </ul>
              </div>

              {/* Column 3 & 4: Featured Image */}
              <div className="col-span-2 relative h-64 rounded-2xl overflow-hidden group">
                 <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop" alt="Featured" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                 <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2">New Arrivals</p>
                    <h3 className="text-3xl font-heading font-black uppercase mb-4">The Summer Drop</h3>
                    <Link to="/shop" className="inline-block bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gold-500 transition-colors">Shop Now</Link>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 4. FULL SCREEN SEARCH OVERLAY */}
      <div className={`fixed inset-0 z-[100] bg-white/95 backdrop-blur-2xl transition-all duration-500 ${searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <button 
          onClick={() => setSearchOpen(false)}
          className="absolute top-8 right-8 p-4 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={32} strokeWidth={1} />
        </button>

        <div className="h-full flex flex-col items-center justify-center max-w-4xl mx-auto px-6">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-8 animate-fade-in-up">What are you looking for?</span>
          
          <form onSubmit={handleSearch} className="w-full relative mb-12 animate-fade-in-up" style={{animationDelay: '100ms'}}>
             <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH PRODUCTS..." 
              className="w-full bg-transparent border-b-2 border-gray-200 py-6 text-2xl md:text-5xl font-heading font-black uppercase placeholder-gray-300 outline-none focus:border-black transition-colors text-center"
              autoFocus={searchOpen}
             />
             <button type="submit" className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4 hover:text-gold-500 transition-colors">
               <ArrowRight size={32} />
             </button>
          </form>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{animationDelay: '200ms'}}>
             {['Jordan', 'Yeezy Slides', 'Dunks', 'Clogs'].map((term) => (
                <button 
                  key={term}
                  onClick={() => { setSearchQuery(term); navigate(`/shop?search=${term}`); setSearchOpen(false); }}
                  className="px-6 py-2 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest hover:border-black hover:bg-black hover:text-white transition-all"
                >
                  {term}
                </button>
             ))}
          </div>
        </div>
      </div>

      {/* 5. MOBILE MENU DRAWER */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      
      <div 
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm z-[101] bg-white shadow-2xl transform transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1) lg:hidden flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-8 flex justify-between items-center border-b border-gray-100">
            <span className="font-heading text-2xl font-black text-black tracking-tighter">MENU</span>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} strokeWidth={1.5}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
          <div className="space-y-6">
             {[
               { name: 'Home', path: '/' },
               { name: 'Shop All', path: '/shop' },
               { name: 'Sneakers', path: '/shop?category=Sneakers' },
               { name: 'Slides', path: '/shop?category=Slides' }
             ].map((link, idx) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between text-2xl font-heading font-black text-black hover:text-gold-500 transition-colors uppercase tracking-tight group"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {link.name}
                <ChevronRight size={20} className="text-gray-300 group-hover:text-gold-500 transition-colors" />
              </Link>
             ))}
          </div>
          
          <div className="w-full h-[1px] bg-gray-100"></div>

          <div className="space-y-4">
             <Link to="/about" onClick={() => setIsOpen(false)} className="block text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black">Our Story</Link>
             <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black">Client Services</Link>
             <Link to="/profile" onClick={() => setIsOpen(false)} className="block text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black">My Account</Link>
          </div>
        </div>
        
        <div className="p-8 border-t border-gray-100 bg-gray-50">
           {!user ? (
              <div className="grid grid-cols-2 gap-4">
                 <Link to="/login" onClick={() => setIsOpen(false)} className="bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest text-center text-xs shadow-lg">Sign In</Link>
                 <Link to="/register" onClick={() => setIsOpen(false)} className="bg-white border border-black text-black py-4 rounded-full font-bold uppercase tracking-widest text-center text-xs">Join</Link>
              </div>
           ) : (
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-red-500 font-bold uppercase tracking-widest text-xs py-4 border border-red-200 rounded-full hover:bg-red-50">Sign Out</button>
           )}
        </div>
      </div>
    </>
  );
};

export default Navbar;