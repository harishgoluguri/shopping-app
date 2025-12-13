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
    { name: 'Running', img: 'https://imvagofypivmtbuylqqo.supabase.co/storage/v1/object/public/product_images.image_url/Adizero_EVO_SL_Shoes_White_JH6208_HM1.avif' },
    { name: 'Slides', img: 'https://imvagofypivmtbuylqqo.supabase.co/storage/v1/object/public/product_images.image_url/WMNS+NIKE+OFFCOURT+SLIDE.avif' },
    { name: 'Clogs', img: 'https://imvagofypivmtbuylqqo.supabase.co/storage/v1/object/public/product_images.image_url/118-207521O001.webp' },
    { name: 'Sale', img: 'https://imvagofypivmtbuylqqo.supabase.co/storage/v1/object/public/product_images.image_url/adidasshoes-2025-09-23T121026.697.webp', isSale: true },
  ];

  return (
    <div className="bg-white">
      
      {/* 1. MOBILE-FIRST HERO */}
      <section className="relative w-full h-[70vh] lg:h-[90vh] bg-gray-100 lg:rounded-b-[5rem] rounded-b-[3rem] overflow-hidden mx-auto">
        <img 
          src="https://imvagofypivmtbuylqqo.supabase.co/storage/v1/object/public/product_images.image_url/dior-1.jpg" 
          alt="Hero" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 text-center md:text-left flex flex-col items-center md:items-start justify-end h-full">
          <div className="animate-fade-in-up max-w-[1600px] w-full mx-auto">
             <span className="inline-block bg-white text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 animate-bounce-slow">
                New Collection 2024
             </span>
             <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-black text-white leading-[0.9] mb-8 drop-shadow-2xl">
                FIND YOUR <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">VIBE.</span>
             </h1>
             <div className="flex justify-center md:justify-start">
                <Link 
                  to="/shop" 
                  className="bg-[#D4AF37] text-black px-10 py-5 rounded-full text-sm font-black uppercase tracking-[0.2em] hover:scale-105 hover:bg-white transition-all shadow-xl duration-300"
                >
                  Shop Now
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY BUBBLES */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
           {/* Desktop: Centered Grid, Mobile: Scroll */}
           <div className="flex gap-8 lg:gap-16 overflow-x-auto hide-scrollbar snap-x lg:justify-center lg:overflow-visible pb-4 lg:pb-0">
             {categories.map((cat, i) => (
                <Link to={`/shop?category=${cat.name === 'Sale' ? 'All' : cat.name}`} key={i} className="flex flex-col items-center gap-4 flex-shrink-0 snap-center group cursor-pointer">
                  <div className={`w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden p-1 border-2 ${cat.isSale ? 'border-red-500' : 'border-gray-200 group-hover:border-black'} transition-all duration-300 shadow-sm group-hover:shadow-xl`}>
                     <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className={`text-sm font-bold uppercase tracking-widest ${cat.isSale ? 'text-red-500' : 'text-black group-hover:text-gold-600 transition-colors'}`}>{cat.name}</span>
                </Link>
             ))}
           </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
           <div className="flex justify-between items-end mb-10">
              <h2 className="text-3xl lg:text-5xl font-heading font-black text-black uppercase tracking-tight">Fresh Drops</h2>
              <Link to="/shop" className="hidden lg:flex items-center gap-2 text-sm font-bold text-black uppercase tracking-widest hover:text-gold-600 transition-colors">
                View All <ArrowRight size={16}/>
              </Link>
           </div>

           {/* Mobile: Scroll, Desktop: Grid */}
           <div className="overflow-x-auto hide-scrollbar pb-8 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
             <div className="flex lg:grid lg:grid-cols-4 gap-4 lg:gap-8 w-max lg:w-full">
               {newArrivals.map(product => (
                 <div key={product.id} className="w-[200px] lg:w-auto flex-shrink-0">
                   <ProductCard product={product} />
                 </div>
               ))}
               
               {/* Mobile View More Card */}
               <Link to="/shop" className="lg:hidden w-[180px] aspect-[4/5] bg-gray-50 rounded-[2rem] flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black transition-colors flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center mb-2">
                     <ArrowRight size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase">View All</span>
               </Link>
             </div>
           </div>
           
           <div className="lg:hidden mt-4 text-center">
              <Link to="/shop" className="text-xs font-bold text-black border-b border-black pb-1">View All Products</Link>
           </div>
        </div>
      </section>

      {/* 4. PROMO BANNER */}
      <section className="px-4 lg:px-12 py-12 lg:py-20">
         <div className="max-w-[1600px] mx-auto bg-black rounded-[2.5rem] lg:rounded-[4rem] p-10 lg:p-24 text-center text-white relative overflow-hidden group">
            {/* Background Effect */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1533681904393-9ab6eee7e40b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-black/60"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
               <span className="inline-block border border-white/20 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">Premium Replicas</span>
               <h3 className="font-heading font-black text-4xl lg:text-7xl mb-8 uppercase tracking-tighter leading-none">Master Quality.<br/>Unbeatable Price.</h3>
               <p className="text-gray-300 font-medium mb-10 text-lg lg:text-xl">Get the look and feel of the original for a fraction of the cost. 7A/10A quality guaranteed with every pair.</p>
               <Link to="/about" className="inline-block bg-white text-black px-10 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4AF37] transition-colors shadow-2xl hover:scale-105">
                  Our Promise
               </Link>
            </div>
         </div>
      </section>

      {/* 5. BEST SELLERS */}
      <section className="py-16 lg:py-24 max-w-[1600px] mx-auto px-6 lg:px-12">
         <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-heading font-black text-black uppercase tracking-tight mb-4">Trending Now</h2>
            <p className="text-gray-500 max-w-md">The most coveted pairs of the season, curated just for you.</p>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {bestSellers.map(product => (
               <ProductCard key={product.id} product={product} />
            ))}
         </div>
      </section>

      {/* 6. TRUST PILLS */}
      <section className="py-12 lg:py-20 px-6 border-t border-gray-100 bg-[#FAFAFA]">
         <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="flex items-center gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-black">
                     <ShieldCheck size={28} />
                  </div>
                  <div>
                     <h4 className="text-lg font-black uppercase mb-1">Secure Payment</h4>
                     <p className="text-xs text-gray-500 font-medium">100% Encrypted transactions.</p>
                  </div>
               </div>
               <div className="flex items-center gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-black">
                     <Truck size={28} />
                  </div>
                  <div>
                     <h4 className="text-lg font-black uppercase mb-1">Express Shipping</h4>
                     <p className="text-xs text-gray-500 font-medium">Free delivery across India.</p>
                  </div>
               </div>
                <div className="flex items-center gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-black">
                     <Star size={28} />
                  </div>
                  <div>
                     <h4 className="text-lg font-black uppercase mb-1">Top Rated</h4>
                     <p className="text-xs text-gray-500 font-medium">Trusted by 10,000+ customers.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;