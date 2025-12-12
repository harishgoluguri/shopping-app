import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { CURRENCY } from '../constants';
import { useCart } from '../context/CartContext';
import { Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [addedSize, setAddedSize] = useState<string | null>(null);

  const primaryImage = product.images?.[0] || 'https://via.placeholder.com/800';
  const secondaryImage = product.images?.[1] || primaryImage;
  
  const totalStock = Object.values(product.sizes || {}).reduce((a: number, b: number) => a + b, 0);
  const isSoldOut = totalStock === 0;

  // Simulate "New" status based on ID for demo purposes, or date logic
  const isNew = product.created_at && new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.preventDefault(); 
    e.stopPropagation();
    addToCart(product, size);
    setAddedSize(size);
    setTimeout(() => setAddedSize(null), 1500);
  };

  return (
    <div 
        className="group relative flex flex-col h-full select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] bg-[#F6F6F6] overflow-hidden mb-5 lg:mb-6">
         
         {/* Badges */}
         <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
            {isSoldOut ? (
                <span className="bg-black text-white text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1.5">Sold Out</span>
            ) : isNew ? ( 
                 <span className="bg-white text-black border border-black text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1.5">New Season</span>
            ) : null}
         </div>

         {/* Images with Fade Transition */}
         <div className="absolute inset-0 p-8 lg:p-10 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform">
            <img 
                src={primaryImage} 
                alt={product.title} 
                className={`absolute w-full h-full object-contain object-center transition-opacity duration-300 ease-linear ${isHovered && product.images?.length > 1 ? 'opacity-0' : 'opacity-100'}`}
                loading="lazy"
            />
            {product.images?.length > 1 && (
                <img 
                    src={secondaryImage} 
                    alt={product.title} 
                    className={`absolute w-full h-full object-contain object-center transition-opacity duration-300 ease-linear ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                />
            )}
         </div>

         {/* Quick Add Sizes Overlay (Slide Up on Hover) - Desktop Only */}
         {!isSoldOut && (
             <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 p-4 translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] lg:group-hover:translate-y-0 hidden lg:flex flex-col gap-3">
                 <p className="text-[9px] font-black uppercase tracking-[0.2em] text-center text-gray-400">Quick Add Size</p>
                 <div className="flex flex-wrap justify-center gap-2">
                     {Object.entries(product.sizes || {}).slice(0, 5).map(([size, stock]) => (
                         stock > 0 && (
                             <button 
                                key={size}
                                onClick={(e) => handleQuickAdd(e, size)}
                                className={`w-9 h-9 flex items-center justify-center text-[10px] font-bold transition-all border ${addedSize === size ? 'bg-black border-black text-white' : 'border-gray-200 hover:border-black hover:bg-black hover:text-white'}`}
                             >
                                 {addedSize === size ? <Check size={14}/> : size}
                             </button>
                         )
                     ))}
                 </div>
             </div>
         )}
      </Link>

      {/* Product Info */}
      <div className="flex flex-col gap-1">
         <div className="flex justify-between items-start gap-4">
             <Link to={`/product/${product.id}`} className="font-heading font-black text-sm lg:text-base uppercase tracking-tight leading-tight hover:underline decoration-1 underline-offset-4 line-clamp-2">
                {product.title}
             </Link>
             <span className="font-bold text-sm whitespace-nowrap">{CURRENCY}{product.price.toLocaleString()}</span>
         </div>
         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</p>
      </div>
    </div>
  );
};

export default ProductCard;