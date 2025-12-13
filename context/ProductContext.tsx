import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch failed, falling back to mock data:', error.message);
        setProducts(PRODUCTS);
      } else if (data && data.length > 0) {
        // Map DB columns size_6...size_11 to the sizes object expected by the UI
        const mappedProducts: Product[] = data.map((item: any) => {
          // Check if individual columns exist, otherwise fallback to existing sizes jsonb if present
          const hasIndividualSizes = item.size_6 !== undefined || item.size_7 !== undefined;
          
          let sizesObj: Record<string, number> = {};

          if (hasIndividualSizes) {
             // Explicit mapping ensures correct order (UK6 -> UK11)
             sizesObj = {
                "UK6": item.size_6 ?? 0,
                "UK7": item.size_7 ?? 0,
                "UK8": item.size_8 ?? 0,
                "UK9": item.size_9 ?? 0,
                "UK10": item.size_10 ?? 0,
                "UK11": item.size_11 ?? 0
             };
          } else if (item.sizes) {
             sizesObj = item.sizes;
          }

          return {
            ...item,
            sizes: sizesObj
          };
        });
        
        setProducts(mappedProducts);
      } else {
        // If data is empty (table exists but no rows), use mock data
        console.log('No products in DB, using mock data');
        setProducts(PRODUCTS);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    // Real-time subscription for stock updates
    const subscription = supabase
      .channel('public:products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        console.log('Real-time update:', payload);
        fetchProducts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, refreshProducts: fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};