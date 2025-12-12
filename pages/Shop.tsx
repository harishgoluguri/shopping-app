import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { Filter, X, Search, SlidersHorizontal } from 'lucide-react';

const Shop: React.FC = () => {
  const { products, loading } = useProducts();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const initialCategoryParam = searchParams.get('category');
  const initialSearchParam = searchParams.get('search') || '';

  const initialCategory = initialCategoryParam && initialCategoryParam.toLowerCase() === 'all' 
    ? 'All' 
    : (initialCategoryParam || 'All');

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeSearch, setActiveSearch] = useState(initialSearchParam);

  // Sync state with URL params when they change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    const search = params.get('search') || '';
    
    if (cat) {
        setActiveCategory(cat.toLowerCase() === 'all' ? 'All' : cat);
    }
    setActiveSearch(search);
  }, [location.search]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach(p => p.category && cats.add(p.category.trim()));
    return Array.from(cats).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by Category
    if (activeCategory.toLowerCase() !== 'all') {
      filtered = filtered.filter(p => 
        p.category && 
        p.category.trim().toLowerCase() === activeCategory.trim().toLowerCase()
      );
    }

    // Filter by Search
    if (activeSearch) {
        const query = activeSearch.toLowerCase();
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    }

    return filtered;
  }, [activeCategory, activeSearch, products]);

  const isCategoryActive = (cat: string) => activeCategory.trim().toLowerCase() === cat.trim().toLowerCase();

  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* 1. STICKY HEADER (Mobile) */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 px-4 lg:hidden">
         <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            <button 
               onClick={() => setMobileFiltersOpen(true)}
               className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap"
            >
               <SlidersHorizontal size={14} /> Filter
            </button>
            <button 
               onClick={() => setActiveCategory('All')}
               className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${activeCategory === 'All' ? 'bg-black text-white border-black' : 'bg-white border-gray-200 text-gray-500'}`}
            >
               All
            </button>
            {categories.map(cat => (
               <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${isCategoryActive(cat) ? 'bg-black text-white border-black' : 'bg-white border-gray-200 text-gray-500'}`}
               >
                  {cat}
               </button>
            ))}
         </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 lg:px-12 py-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
             <div className="sticky top-32">
                <h3 className="font-heading font-black text-xl mb-6 uppercase">Collections</h3>
                <ul className="space-y-3">
                   <li 
                      className={`cursor-pointer px-4 py-3 rounded-xl transition-all text-sm font-bold flex justify-between items-center ${activeCategory === 'All' ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-50'}`}
                      onClick={() => setActiveCategory('All')}
                   >
                      View All
                   </li>
                   {categories.map(cat => (
                      <li 
                        key={cat} 
                        className={`cursor-pointer px-4 py-3 rounded-xl transition-all text-sm font-bold flex justify-between items-center ${isCategoryActive(cat) ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-50'}`}
                        onClick={() => setActiveCategory(cat)}
                      >
                        {cat}
                      </li>
                   ))}
                </ul>
             </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
             <div className="hidden lg:flex justify-between items-center mb-8">
               <h1 className="text-4xl font-heading font-black">
                   {activeSearch ? `SEARCH: "${activeSearch}"` : (activeCategory === 'All' ? 'ALL PRODUCTS' : activeCategory.toUpperCase())}
               </h1>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{filteredProducts.length} items</p>
             </div>

             {/* Search Result Header for Mobile */}
             {activeSearch && (
                 <div className="lg:hidden mb-6">
                     <h2 className="text-xl font-heading font-black">Results for "{activeSearch}"</h2>
                     <button onClick={() => setActiveSearch('')} className="text-xs font-bold text-gray-400 underline mt-1">Clear Search</button>
                 </div>
             )}

             <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
               {filteredProducts.map(product => (
                 <ProductCard key={product.id} product={product} />
               ))}
             </div>
             
             {filteredProducts.length === 0 && (
                <div className="py-20 text-center flex flex-col items-center">
                    <Search className="text-gray-200 mb-4" size={48} />
                    <p className="text-lg font-bold text-gray-400">No products found</p>
                    {activeSearch && <button onClick={() => setActiveSearch('')} className="mt-4 bg-black text-white px-6 py-2 rounded-full text-xs font-bold uppercase">Clear Search</button>}
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Filter Modal (Mobile) */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-white p-6 overflow-y-auto animate-fade-in lg:hidden">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-heading font-black uppercase">Refine</h2>
            <button onClick={() => setMobileFiltersOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={24} /></button>
          </div>
          
          <div className="space-y-8">
             <div>
                <h3 className="font-bold mb-4 text-sm uppercase tracking-widest text-gray-400">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => { setActiveCategory('All'); setMobileFiltersOpen(false); }} className={`px-6 py-3 rounded-full text-sm font-bold border ${activeCategory === 'All' ? 'bg-black text-white border-black' : 'border-gray-200 text-black'}`}>All</button>
                  {categories.map(cat => (
                    <button key={cat} onClick={() => { setActiveCategory(cat); setMobileFiltersOpen(false); }} className={`px-6 py-3 rounded-full text-sm font-bold border ${isCategoryActive(cat) ? 'bg-black text-white border-black' : 'border-gray-200 text-black'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;