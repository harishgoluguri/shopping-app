
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  sku: string;
  color: string;
  category: string;
  sizes: Record<string, number>; // JSONB: { "UK6": 10, "UK7": 5 }
  images: string[];
  created_at: string;
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export interface FilterState {
  category: string | 'All';
  minPrice: number;
  maxPrice: number;
  sort: 'latest' | 'price_asc' | 'price_desc';
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue?: number;
  description?: string;
}