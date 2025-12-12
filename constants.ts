import { Product, Coupon } from './types';

export const WHATSAPP_NUMBER = "919963163777";
export const CURRENCY = "₹";

export const COUPONS: Coupon[] = [
  { 
    code: 'WELCOME10', 
    type: 'percentage', 
    value: 10, 
    description: '10% off on your order' 
  },
  { 
    code: 'FLAT500', 
    type: 'fixed', 
    value: 500, 
    minOrderValue: 5000, 
    description: 'Flat ₹500 off on orders above ₹5000' 
  },
  { 
    code: 'SUMMER20', 
    type: 'percentage', 
    value: 20, 
    description: '20% Summer Sale' 
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Air Jordan 1 Retro High OG",
    description: "The sneaker that started it all. Featuring premium leather, classic color blocking, and the iconic Air cushioning that changed the game forever.",
    price: 3499,
    sku: "NK-AJ1-HIGH",
    color: "Chicago / Red / White",
    category: "Sneakers",
    sizes: { "UK7": 10, "UK8": 10, "UK9": 5, "UK10": 2 },
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556906781-9a412961d289?q=80&w=2070&auto=format&fit=crop"
    ],
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    title: "Yeezy Slide Pure",
    description: "Minimalist design, maximum comfort. The EVA foam construction provides lightweight durability while the soft top layer in the footbed offers immediate step-in comfort.",
    price: 1299,
    sku: "AD-YZ-SLIDE",
    color: "Bone / Pure",
    category: "Slides",
    sizes: { "UK6": 20, "UK7": 15, "UK8": 10, "UK9": 10 },
    images: [
      "https://images.unsplash.com/photo-1606206591513-39d12d46e336?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617251722822-721245051834?q=80&w=1200&auto=format&fit=crop"
    ],
    created_at: "2024-01-02T00:00:00Z"
  },
  {
    id: "3",
    title: "Nike Dunk Low Panda",
    description: "The street style staple. Black and white colorway that goes with absolutely everything. Crisp leather overlays and the heritage Dunk silhouette.",
    price: 2699,
    sku: "NK-DL-PANDA",
    color: "Black / White",
    category: "Sneakers",
    sizes: { "UK6": 5, "UK7": 20, "UK8": 15, "UK9": 10 },
    images: [
      "https://images.unsplash.com/photo-1635669049909-5c421b145693?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628551174620-3b9994c927f8?q=80&w=2000&auto=format&fit=crop"
    ],
    created_at: "2024-01-07T00:00:00Z"
  },
  {
    id: "4",
    title: "Yeezy Foam Runner",
    description: "Futuristic aerodynamics. The unique foam compound blends lightweight durability with futuristic design lines.",
    price: 1999,
    sku: "AD-YZ-FOAM",
    color: "Sand",
    category: "Clogs",
    sizes: { "UK7": 8, "UK8": 8, "UK9": 8 },
    images: [
      "https://images.unsplash.com/photo-1664188612179-8266224ce17a?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1659614264628-9844439c2c62?q=80&w=2000&auto=format&fit=crop"
    ],
    created_at: "2024-01-04T00:00:00Z"
  },
  {
    id: "5",
    title: "Crocs Echo Clog",
    description: "The Echo Collection is for those who want comfort without compromising their look. Fully molded style with bold sculpting and sport inspiration.",
    price: 1899,
    sku: "CR-ECHO-005",
    color: "Atmosphere",
    category: "Clogs",
    sizes: { "UK6": 12, "UK7": 12, "UK8": 12 },
    images: [
      "https://images.unsplash.com/photo-1647448834789-9831c19d45e5?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628253747716-0c4f5c90fdda?q=80&w=2000&auto=format&fit=crop"
    ],
    created_at: "2024-01-05T00:00:00Z"
  },
  {
    id: "6",
    title: "Adidas Ultraboost 22",
    description: "Incredible energy return. The boost midsole makes you feel like you're walking on clouds. Primeknit upper hugs your foot.",
    price: 2999,
    sku: "AD-UB-006",
    color: "Core Black",
    category: "Shoes",
    sizes: { "UK7": 10, "UK8": 15, "UK9": 5 },
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aef4?q=80&w=2000&auto=format&fit=crop"
    ],
    created_at: "2024-01-06T00:00:00Z"
  },
  {
    id: "7",
    title: "New Balance 550",
    description: "Simple & Clean, not overbuilt. A tribute to the 90s pro ballers and the streetwear that defined a hoops generation.",
    price: 2799,
    sku: "NB-550-WHT",
    color: "White / Grey",
    category: "Sneakers",
    sizes: { "UK7": 10, "UK8": 15, "UK9": 5 },
    images: [
      "https://images.unsplash.com/photo-1622359487771-4608c02c6110?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1663499479261-75574dc6f6d0?q=80&w=2000&auto=format&fit=crop"
    ],
    created_at: "2024-01-08T00:00:00Z"
  },
  {
    id: "8",
    title: "Jordan 4 Retro Military Black",
    description: "Industrial blue accents and neutral grey overlays make this AJ4 a versatile addition to any rotation.",
    price: 3899,
    sku: "NK-AJ4-MIL",
    color: "White / Black / Grey",
    category: "Sneakers",
    sizes: { "UK7": 5, "UK8": 5, "UK9": 5 },
    images: [
      "https://images.unsplash.com/photo-1695627230462-811c7625121b?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=2000&auto=format&fit=crop"
    ],
    created_at: "2024-01-09T00:00:00Z"
  }
];

export const CATEGORIES = ["Sneakers", "Slides", "Clogs", "Shoes"];

export const REVIEWS = [
  { name: "Rahul S.", rating: 5, text: "The quality is 99% close to original. Packaging was also premium." },
  { name: "Amit K.", rating: 4, text: "Good comfort for the price. Delivery took 2 days extra but worth the wait." },
  { name: "Priya M.", rating: 5, text: "Love the slides! Super soft and look exactly like the branding." }
];