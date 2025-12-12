import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Star, Truck, ShieldCheck, Loader2 } from 'lucide-react';

const Home: React.FC = () => {
  const { products, loading } = useProducts();

  const bestSellers = products.slice(0, 4);
  const newArrivals = products.slice(0, 8); 

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-black" size={48} />
      </div>
    );
  }

  // Category Bubbles Data
  const categories = [
    { name: 'Sneakers', img: 'https://imvagofypivmtbuylqqo.supabase.co/storage/v1/object/public/product_images.image_url/TravisScottxNikeAirJordan1RetroLowOGSP_Olive_Sneakers-Front.webp' },
    { name: 'Slides', img: 'https://imvagofypivmtbuylqqo.supabase.co/storage/v1/object/public/product_images.image_url/WMNS+NIKE+OFFCOURT+SLIDE.avif' },
    { name: 'Clogs', img: 'https://imvagofypivmtbuylqqo.supabase.co/storage/v1/object/public/product_images.image_url/118-207521O001.webp' },
    { name: 'Sale', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop', isSale: true },
  ];

  return (
    <div className="bg-white overflow-hidden pb-10">
      
      {/* 1. MOBILE-FIRST HERO */}
      <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-gray-100 lg:rounded-b-[4rem] rounded-b-[2.5rem] overflow-hidden mx-auto">
        <img 
          src="https://imvagofypivmtbuylqqo.supabase.co/storage/v1/object/public/product_images.image_url/dior-1.jpg" 
          alt="Hero" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-center md:text-left">
          <span className="inline-block bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-4 animate-bounce-slow">
            New Collection
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-heading font-black text-white leading-none mb-4 drop-shadow-md">
            FIND YOUR <br/>VIBE.
          </h1>
          <div className="flex justify-center md:justify-start">
             <Link 
              to="/shop" 
              className="bg-[#D4AF37] text-black px-8 py-3.5 rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY BUBBLES (Horizontal Scroll) */}
      <section className="py-10">
        <div className="px-6 flex gap-6 overflow-x-auto hide-scrollbar snap-x">
          {categories.map((cat, i) => (
             <Link to={`/shop?category=${cat.name === 'Sale' ? 'All' : cat.name}`} key={i} className="flex flex-col items-center gap-2 flex-shrink-0 snap-center group">
               <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden p-1 border-2 ${cat.isSale ? 'border-red-500' : 'border-gray-200 group-hover:border-black'} transition-colors`}>
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-full" />
               </div>
               <span className={`text-xs font-bold uppercase tracking-wide ${cat.isSale ? 'text-red-500' : 'text-black'}`}>{cat.name}</span>
             </Link>
          ))}
        </div>
      </section>

      {/* 3. NEW ARRIVALS (Horizontal Cards) */}
      <section className="py-8 border-t border-gray-100">
        <div className="px-6 flex justify-between items-end mb-6">
           <h2 className="text-2xl md:text-4xl font-heading font-black text-black">FRESH DROPS</h2>
           <Link to="/shop" className="text-xs font-bold text-gray-500 underline">View All</Link>
        </div>

        <div className="overflow-x-auto hide-scrollbar pb-8 px-6">
          <div className="flex gap-4 w-max">
            {newArrivals.map(product => (
              <div key={product.id} className="w-[180px] md:w-[250px]">
                <ProductCard product={product} />
              </div>
            ))}
             {/* View More Card */}
             <Link to="/shop" className="w-[180px] md:w-[250px] aspect-[4/5] bg-gray-50 rounded-[2rem] flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black transition-colors flex-shrink-0">
                <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center mb-2">
                   <ArrowRight size={20} />
                </div>
                <span className="text-xs font-bold uppercase">View All</span>
             </Link>
          </div>
        </div>
      </section>

      {/* 4. PROMO BANNER */}
      <section className="px-4 py-6">
         <div className="bg-black rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] rounded-full blur-[80px] opacity-30"></div>
            <div className="relative z-10">
               <h3 className="font-heading font-black text-3xl md:text-5xl mb-4">MASTER QUALITY.</h3>
               <p className="text-gray-400 font-medium mb-8 max-w-lg mx-auto">Get the look and feel of the original for a fraction of the price. 7A/10A quality guaranteed.</p>
               <Link to="/about" className="inline-block bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-colors">
                  Our Promise
               </Link>
            </div>
         </div>
      </section>

      {/* 5. BEST SELLERS (Grid) */}
      <section className="py-12 px-6 max-w-[1600px] mx-auto">
         <h2 className="text-2xl md:text-4xl font-heading font-black text-black mb-8">TRENDING NOW</h2>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
            {bestSellers.map(product => (
               <ProductCard key={product.id} product={product} />
            ))}
         </div>
      </section>

      {/* 6. TRUST PILLS */}
      <section className="py-10 px-6 overflow-x-auto hide-scrollbar">
         <div className="flex gap-4 min-w-max">
            <div className="flex items-center gap-3 bg-[#F5F5F7] px-6 py-4 rounded-full">
               <ShieldCheck className="text-black" size={20} />
               <div className="flex flex-col">
                  <span className="text-xs font-black uppercase">Secure Checkout</span>
               </div>
            </div>
            <div className="flex items-center gap-3 bg-[#F5F5F7] px-6 py-4 rounded-full">
               <Truck className="text-black" size={20} />
               <div className="flex flex-col">
                  <span className="text-xs font-black uppercase">Fast Shipping</span>
               </div>
            </div>
             <div className="flex items-center gap-3 bg-[#F5F5F7] px-6 py-4 rounded-full">
               <Star className="text-black" size={20} />
               <div className="flex flex-col">
                  <span className="text-xs font-black uppercase">Top Rated</span>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;