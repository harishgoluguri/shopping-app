import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CURRENCY } from '../constants';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { ChevronRight, Star, Truck, ShieldCheck, Loader2, Minus, Plus, Share2, Heart, ChevronDown, AlertCircle, ArrowLeft, Info } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Accordion = ({ title, icon: Icon, children, defaultOpen = false }: { title: string, icon?: any, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-gray-100">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left group select-none"
      >
        <div className="flex items-center gap-3">
             {Icon && <Icon size={18} strokeWidth={1.5} className="text-gray-400" />}
             <span className="font-bold text-xs uppercase tracking-[0.15em] text-black group-hover:text-gold-600 transition-colors">{title}</span>
        </div>
        <ChevronDown 
            size={16} 
            className={`transition-transform duration-300 text-gray-400 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
        <div className="text-sm text-gray-500 leading-relaxed font-medium pl-1">
            {children}
        </div>
      </div>
    </div>
  )
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [qty, setQty] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (products.length > 0 && id) {
      const found = products.find(p => p.id === id);
      if (found) {
        setProduct(found);
        setSelectedSize('');
        setQty(1);
      }
    }
  }, [products, id]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
        const index = Math.round(scrollContainerRef.current.scrollLeft / scrollContainerRef.current.clientWidth);
        setActiveImgIndex(index);
    }
  };

  const scrollToImage = (index: number) => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
            left: index * scrollContainerRef.current.clientWidth,
            behavior: 'smooth'
        });
        setActiveImgIndex(index);
    }
  };

  if (loading) return (
      <div className="min-h-screen flex items-center justify-center bg-white">
          <Loader2 className="animate-spin text-black" size={40}/>
      </div>
  );
  
  if (!product) return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
          <h2 className="font-heading text-2xl font-black">Product Not Found</h2>
          <button onClick={() => navigate('/shop')} className="text-xs font-bold uppercase underline">Return to Shop</button>
      </div>
  );

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const totalStock = Object.values(product.sizes || {}).reduce((a: any, b: any) => a + b, 0);
  const isSoldOut = totalStock === 0;
  const stockForSize = selectedSize ? (product.sizes[selectedSize] || 0) : 0;
  const isLowStock = stockForSize > 0 && stockForSize < 3;

  const handleAddToCart = () => {
    if (!selectedSize) {
        // Find the size selector and shake it or scroll to it
        const sizeSelector = document.getElementById('size-selector');
        if(sizeSelector) {
            sizeSelector.classList.add('animate-shake');
            setTimeout(() => sizeSelector.classList.remove('animate-shake'), 500);
            sizeSelector.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    setAddingToCart(true);
    for(let i=0; i<qty; i++) {
        addToCart(product, selectedSize);
    }
    setTimeout(() => setAddingToCart(false), 1500);
  };

  return (
    <div className="bg-white min-h-screen pt-16 lg:pt-24 pb-32">
        
      {/* Breadcrumbs */}
      <div className="px-6 lg:px-12 py-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
         <Link to="/" className="hover:text-black transition-colors">Home</Link>
         <ChevronRight size={12} />
         <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
         <ChevronRight size={12} />
         <Link to={`/shop?category=${product.category}`} className="hover:text-black transition-colors">{product.category}</Link>
         <ChevronRight size={12} />
         <span className="text-black line-clamp-1">{product.title}</span>
      </div>

      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16">
         
         {/* LEFT: Image Gallery */}
         <div className="lg:col-span-7 xl:col-span-8 bg-white relative">
            
            {/* Mobile/Tablet Carousel (Hidden on large desktop if we want grid, but let's stick to consistent carousel or stack) */}
            {/* Design Choice: Vertical Stack for Desktop, Carousel for Mobile */}
            
            {/* Desktop Vertical Stack */}
            <div className="hidden lg:flex flex-col gap-4 px-12">
                {product.images?.map((img: string, idx: number) => (
                    <div key={idx} className="w-full bg-[#F6F6F6] aspect-[4/5] relative overflow-hidden group cursor-zoom-in">
                        <img src={img} alt={`View ${idx}`} className="w-full h-full object-contain object-center mix-blend-multiply transition-transform duration-700 group-hover:scale-110" />
                    </div>
                ))}
            </div>

            {/* Mobile Carousel */}
            <div className="lg:hidden relative group">
                <div 
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar aspect-[4/5] bg-[#F6F6F6]"
                >
                    {product.images?.map((img: string, idx: number) => (
                        <div key={idx} className="w-full flex-shrink-0 snap-center relative flex items-center justify-center">
                            <img src={img} alt={`View ${idx}`} className="w-full h-full object-contain object-center mix-blend-multiply" />
                        </div>
                    ))}
                </div>
                
                {/* Mobile Dots */}
                {product.images?.length > 1 && (
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                        {product.images.map((_: any, idx: number) => (
                            <button 
                                key={idx}
                                onClick={() => scrollToImage(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${activeImgIndex === idx ? 'w-6 bg-black' : 'w-1.5 bg-black/20'}`}
                            />
                        ))}
                    </div>
                )}
                
                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {isSoldOut && <span className="bg-black text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5">Sold Out</span>}
                    {!isSoldOut && product.price > 5000 && <span className="bg-white text-black border border-black text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5">Free Shipping</span>}
                </div>

                {/* Wishlist Button Mobile */}
                <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg text-black hover:text-red-500 transition-colors"
                >
                    <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-red-500" : ""} />
                </button>
            </div>
         </div>

         {/* RIGHT: Product Details (Sticky) */}
         <div className="lg:col-span-5 xl:col-span-4 px-6 lg:pr-12 lg:pl-0 pt-8 lg:pt-0">
            <div className="lg:sticky lg:top-28 h-fit lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto hide-scrollbar">
                
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-2xl lg:text-4xl font-heading font-black text-black uppercase leading-none mb-2">{product.title}</h1>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{product.category}</p>
                    </div>
                    {/* Desktop Wishlist */}
                    <button 
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className="hidden lg:block p-3 hover:bg-gray-50 rounded-full transition-colors"
                    >
                        <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-red-500" : "text-black"} />
                    </button>
                </div>

                <div className="flex items-center gap-4 mb-8">
                    <span className="text-2xl font-body font-bold text-black">{CURRENCY}{product.price.toLocaleString()}</span>
                    
                    <div className="flex items-center gap-1">
                        <div className="flex text-gold-500">
                            {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                        <span className="text-xs font-bold text-gray-400 ml-1 underline cursor-pointer hover:text-black">128 Reviews</span>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-gray-100 mb-8"></div>

                {/* Size Selector */}
                <div id="size-selector" className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-black">Select Size</span>
                        <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 underline hover:text-black">Size Guide</button>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 lg:gap-3">
                        {Object.entries(product.sizes || {}).map(([size, stock]: [string, any]) => {
                            const isAvailable = stock > 0;
                            return (
                                <button
                                    key={size}
                                    onClick={() => isAvailable && setSelectedSize(size)}
                                    disabled={!isAvailable}
                                    className={`py-3 lg:py-4 rounded-lg lg:rounded-xl text-xs lg:text-sm font-bold border transition-all duration-200 
                                        ${selectedSize === size 
                                            ? 'bg-black text-white border-black shadow-lg scale-[1.02]' 
                                            : isAvailable 
                                                ? 'bg-white text-black border-gray-200 hover:border-black hover:bg-gray-50' 
                                                : 'bg-gray-50 text-gray-300 border-transparent cursor-not-allowed decoration-slice line-through'}`}
                                >
                                    {size}
                                </button>
                            );
                        })}
                    </div>
                    {isLowStock && (
                        <div className="flex items-center gap-2 mt-3 text-amber-600 animate-pulse">
                            <AlertCircle size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Low Stock - Selling Fast</span>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 mb-8">
                    {/* Qty & Add to Cart Container */}
                    <div className="flex gap-4">
                        {/* Qty */}
                        <div className="flex items-center bg-[#F5F5F7] rounded-full px-4 gap-4 h-14">
                            <button onClick={() => setQty(Math.max(1, qty-1))} className="w-8 h-full flex items-center justify-center hover:opacity-60"><Minus size={16}/></button>
                            <span className="font-bold text-sm w-4 text-center">{qty}</span>
                            <button onClick={() => setQty(qty+1)} className="w-8 h-full flex items-center justify-center hover:opacity-60"><Plus size={16}/></button>
                        </div>

                        {/* Add to Cart */}
                        <button 
                            onClick={handleAddToCart}
                            disabled={isSoldOut}
                            className={`flex-1 h-14 rounded-full font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all shadow-xl active:scale-[0.98]
                                ${isSoldOut 
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                    : addingToCart 
                                        ? 'bg-[#20b957] text-white' 
                                        : 'bg-black text-white hover:bg-[#D4AF37] hover:text-black'
                                }`}
                        >
                            {isSoldOut ? 'Sold Out' : addingToCart ? 'Added to Bag' : 'Add to Bag'}
                        </button>
                    </div>

                    <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
                        <span className="flex items-center justify-center gap-2">
                             <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                             Free Shipping on all pre-paid orders
                        </span>
                    </p>
                </div>

                {/* Accordions */}
                <div className="mb-12">
                     <Accordion title="Description" icon={Info} defaultOpen={true}>
                         <p className="mb-4">{product.description}</p>
                         <p>Designed for comfort and style, this piece features premium materials sourced from top-tier suppliers. The silhouette is modern yet timeless, making it a perfect addition to your rotation.</p>
                     </Accordion>
                     <Accordion title="Delivery & Returns" icon={Truck}>
                         <p className="mb-2">We offer free express shipping on all orders across India. Delivery typically takes 3-5 business days.</p>
                         <p>Returns are accepted within 7 days of delivery for size exchanges only. Items must be unworn and in original packaging.</p>
                     </Accordion>
                     <Accordion title="Authenticity" icon={ShieldCheck}>
                         <p>Our Master Copy (7A/10A) products are crafted with 98% precision to the original. We use the same materials and moulds to ensure the weight, feel, and look is indistinguishable.</p>
                     </Accordion>
                </div>

            </div>
         </div>
      </div>

      {/* Similar Products */}
      {relatedProducts.length > 0 && (
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12 mt-20 border-t border-gray-100 pt-20">
             <div className="flex justify-between items-end mb-10">
                <h3 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight">You Might Also Like</h3>
                <Link to="/shop" className="text-xs font-bold uppercase tracking-widest underline hover:text-gold-600 transition-colors">View All</Link>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {relatedProducts.map(p => (
                   <ProductCard key={p.id} product={p} />
                ))}
             </div>
          </div>
      )}

      {/* Mobile Sticky Add To Cart (Appears when scrolling past main button, but for now simple fixed bottom bar) */}
      <div className={`fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 p-4 pb-safe z-40 lg:hidden transition-transform duration-300 ${isSoldOut ? 'translate-y-full' : 'translate-y-0'}`}>
         <div className="flex gap-4">
             <div className="flex-1">
                 <p className="text-xs font-bold text-black line-clamp-1">{product.title}</p>
                 <p className="text-[10px] text-gray-500">{selectedSize ? `Size: ${selectedSize}` : 'Select Size'}</p>
             </div>
             <button 
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`px-8 h-12 rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg ${!selectedSize ? 'bg-gray-200 text-gray-400' : 'bg-black text-white'}`}
             >
                {addingToCart ? 'Added' : 'Add'}
             </button>
         </div>
      </div>
    </div>
  );
};

export default ProductPage;