import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CURRENCY } from '../constants';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { ChevronRight, MessageCircle, ShoppingBag, Star, Share2, Loader2, Minus, Plus } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [mainImage, setMainImage] = useState<string>('');
  const [addingToCart, setAddingToCart] = useState(false);
  const [qty, setQty] = useState(1);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (products.length > 0 && id) {
      const found = products.find(p => p.id === id);
      if (found) {
        setProduct(found);
        setMainImage(found.images && found.images.length > 0 ? found.images[0] : '');
        setSelectedSize('');
      }
    }
  }, [products, id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-black" size={40}/></div>;
  if (!product) return <div className="h-screen flex items-center justify-center font-heading text-xl">Product Not Found</div>;

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const currentStock = selectedSize ? (product.sizes[selectedSize] || 0) : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      // Shake effect or toast here could be good
      return;
    }
    setAddingToCart(true);
    // Add logic to add 'qty' times could be added to context, but simple addToCart adds 1
    // For now we loop or assuming addToCart handles 1.
    for(let i=0; i<qty; i++) {
        addToCart(product, selectedSize);
    }
    setTimeout(() => setAddingToCart(false), 1500);
  };

  return (
    <div className="bg-white min-h-screen pb-32">
      
      {/* 1. IMAGE SECTION (Takes top 40-50% on mobile) */}
      <div className="bg-[#F4F4F4] lg:rounded-b-[4rem] rounded-b-[3rem] pb-12 pt-24 lg:pt-32 relative overflow-hidden">
         <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-center">
            
            {/* Main Image */}
            <div className="w-full lg:w-1/2 aspect-square flex items-center justify-center relative z-10">
               <img 
                 src={mainImage} 
                 alt={product.title} 
                 className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl animate-fade-in-up" 
               />
            </div>

            {/* Thumbnails (Floating on mobile or side on desktop) */}
            {product.images && product.images.length > 1 && (
               <div className="flex lg:flex-col gap-3 mt-8 lg:mt-0 lg:ml-8 overflow-x-auto hide-scrollbar w-full lg:w-auto px-4 lg:px-0 justify-center">
                 {product.images.map((img: string, idx: number) => (
                   <button 
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 rounded-2xl border-2 transition-all bg-white ${mainImage === img ? 'border-black scale-105' : 'border-transparent opacity-70'}`}
                   >
                     <img src={img} alt="" className="w-full h-full object-contain p-2" />
                   </button>
                 ))}
               </div>
             )}
         </div>
      </div>

      {/* 2. DETAILS SHEET */}
      <div className="max-w-[1200px] mx-auto px-6 -mt-8 relative z-20">
         <div className="bg-white rounded-[2.5rem] p-6 lg:p-12 shadow-xl border border-gray-100">
            
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h1 className="text-2xl md:text-4xl font-heading font-black text-black leading-tight mb-2">{product.title}</h1>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{product.category}</p>
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-2xl font-black text-black font-body">{CURRENCY}{product.price.toLocaleString()}</span>
                  <div className="flex items-center gap-1 mt-1 text-gold-500">
                     <Star size={14} fill="currentColor"/> <span className="text-xs font-bold text-gray-500">(4.8)</span>
                  </div>
               </div>
            </div>

            <div className="w-full h-[1px] bg-gray-100 my-6"></div>

            {/* Size Selector */}
            <div className="mb-8">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm font-black uppercase tracking-wider text-black">Select Size</h3>
                 <span className="text-xs font-bold text-gray-400 underline">Size Guide</span>
               </div>
               <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                 {Object.entries(product.sizes || {}).map(([size, stock]: [string, any]) => {
                    const isAvailable = stock > 0;
                    return (
                      <button
                        key={size}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        disabled={!isAvailable}
                        className={`min-w-[4rem] h-14 rounded-2xl font-bold flex items-center justify-center transition-all flex-shrink-0 ${
                           selectedSize === size 
                              ? 'bg-black text-white shadow-lg scale-105' 
                              : isAvailable ? 'bg-gray-100 text-black hover:bg-gray-200' : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {size}
                      </button>
                    )
                 })}
               </div>
               {!selectedSize && <p className="text-red-400 text-xs font-bold mt-2 animate-pulse">Please select a size</p>}
            </div>

            {/* Description */}
            <div className="mb-8">
               <h3 className="text-sm font-black uppercase tracking-wider text-black mb-2">About The Product</h3>
               <p className="text-gray-500 text-sm leading-relaxed font-medium">{product.description}</p>
            </div>

         </div>
      </div>

      {/* 3. SIMILAR PRODUCTS */}
      {relatedProducts.length > 0 && (
         <div className="max-w-[1200px] mx-auto px-6 mt-12 mb-20">
            <h3 className="text-xl font-heading font-black mb-6">YOU MIGHT ALSO LIKE</h3>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
               {relatedProducts.map(p => (
                  <div key={p.id} className="w-[180px] flex-shrink-0">
                     <ProductCard product={p} />
                  </div>
               ))}
            </div>
         </div>
      )}

      {/* 4. STICKY BOTTOM ACTION BAR (Mobile & Desktop) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 pb-safe lg:pb-6 z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] rounded-t-[2rem] lg:rounded-none">
         <div className="max-w-[1200px] mx-auto flex gap-4 items-center">
            
            {/* Qty Stepper */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-3 gap-4">
               <button onClick={() => setQty(Math.max(1, qty-1))}><Minus size={16}/></button>
               <span className="font-bold text-sm">{qty}</span>
               <button onClick={() => setQty(qty+1)}><Plus size={16}/></button>
            </div>

            <button 
               onClick={handleAddToCart}
               disabled={!selectedSize}
               className={`flex-1 py-4 rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all shadow-xl ${
                  !selectedSize ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-black text-white hover:scale-[1.02] hover:bg-[#D4AF37] hover:text-black'
               }`}
            >
               {addingToCart ? 'Added!' : 'Add to Bag'}
            </button>
         </div>
         {/* Spacer for bottom nav on mobile if needed, though this sits on top of it usually. 
             In this design, we might want this to be ABOVE the bottom nav on mobile. 
             We added pb-20 to main layout, but this is fixed. 
             Let's adjust bottom position for mobile to sit above bottom nav. */}
         <style>{`
            @media (max-width: 1024px) {
               .fixed.bottom-0 { bottom: 70px; } /* Space for MobileBottomNav */
            }
         `}</style>
      </div>
    </div>
  );
};

export default ProductPage;