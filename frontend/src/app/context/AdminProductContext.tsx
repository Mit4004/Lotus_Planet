import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AdminProduct {
  id: string;
  name: string;
  category: string;
  shortDescription?: string;
  fullDescription?: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  basePrice: number;
  salePrice?: number | null;
  sizePricing?: { S?: number; M?: number; L?: number };
  stockQuantity: number;
  lowStockAlert: number;
  images: string[];
  sunlight?: 'Full Sun' | 'Partial' | 'Shade';
  watering?: 'Daily' | 'Weekly' | 'Rarely';
  soilType?: string;
  petFriendly?: boolean;
  airPurifying?: boolean;
  growthRate?: 'Slow' | 'Medium' | 'Fast';
  floweringSeason?: string;
  badges: { newArrival: boolean; bestSeller: boolean; onSale: boolean; featured: boolean };
  visibility: 'Active' | 'Draft' | 'Hidden';
}

export interface AdminCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
}

const initialProducts: AdminProduct[] = [
  {
    id: '1', name: 'Monstera Deliciosa', category: 'Tropical Plants', difficulty: 'Easy',
    basePrice: 45, stockQuantity: 20, lowStockAlert: 5, images: ['https://images.unsplash.com/photo-1614887410788-e158d6efb3be?auto=format&fit=crop&q=80&w=1080'],
    badges: { newArrival: false, bestSeller: true, onSale: false, featured: true }, visibility: 'Active'
  },
  {
    id: '2', name: 'Fiddle Leaf Fig', category: 'Statement Plants', difficulty: 'Medium',
    basePrice: 65, stockQuantity: 12, lowStockAlert: 3, images: ['https://images.unsplash.com/photo-1608329857883-5998ebea6f76?auto=format&fit=crop&q=80&w=1080'],
    badges: { newArrival: false, bestSeller: false, onSale: false, featured: true }, visibility: 'Active'
  },
  {
    id: '3', name: 'Golden Pothos', category: 'Hanging Plants', difficulty: 'Easy',
    basePrice: 28, stockQuantity: 40, lowStockAlert: 10, images: ['https://images.unsplash.com/photo-1595524147656-eb5d0a63e9a9?auto=format&fit=crop&q=80&w=1080'],
    badges: { newArrival: false, bestSeller: true, onSale: false, featured: true }, visibility: 'Active'
  },
  {
    id: '4', name: 'Snake Plant', category: 'Air Purifying', difficulty: 'Easy',
    basePrice: 35, stockQuantity: 30, lowStockAlert: 5, images: ['https://images.unsplash.com/photo-1695742339593-9d0488a7dfe7?auto=format&fit=crop&q=80&w=1080'],
    badges: { newArrival: false, bestSeller: false, onSale: false, featured: true }, visibility: 'Active'
  },
  {
    id: 'n1', name: 'Rose Bush', category: 'Flowering Plants', difficulty: 'Medium',
    basePrice: 399, stockQuantity: 15, lowStockAlert: 5, images: ['https://images.unsplash.com/photo-1559564484-e48b3e040ff4?auto=format&fit=crop&q=80&w=1080'],
    badges: { newArrival: true, bestSeller: false, onSale: false, featured: false }, visibility: 'Active'
  },
  {
    id: 'n2', name: 'Lavender', category: 'Herbs & Kitchen', difficulty: 'Easy',
    basePrice: 249, stockQuantity: 25, lowStockAlert: 5, images: ['https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80&w=1080'],
    badges: { newArrival: true, bestSeller: false, onSale: true, featured: false }, visibility: 'Active'
  },
  {
    id: 'n3', name: 'Bamboo Palm', category: 'Indoor Plants', difficulty: 'Easy',
    basePrice: 599, stockQuantity: 8, lowStockAlert: 2, images: ['https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=1080'],
    badges: { newArrival: true, bestSeller: false, onSale: false, featured: false }, visibility: 'Active'
  },
  {
    id: 'n4', name: 'Jade Plant', category: 'Succulents & Cacti', difficulty: 'Easy',
    basePrice: 199, stockQuantity: 50, lowStockAlert: 10, images: ['https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=1080'],
    badges: { newArrival: true, bestSeller: true, onSale: false, featured: false }, visibility: 'Active'
  }
];

const initialCategories: AdminCategory[] = [
  { id: 'c1', name: 'Indoor Plants', description: 'Beautify your home interior', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=1080', isActive: true },
  { id: 'c2', name: 'Outdoor Plants', description: 'Perfect for gardens and balconies', image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&q=80&w=1080', isActive: true },
  { id: 'c3', name: 'Succulents & Cacti', description: 'Low maintenance beauties', image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=800', isActive: true },
  { id: 'c4', name: 'Flowering Plants', description: 'Add color to your space', image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&q=80&w=800', isActive: true }
];

interface AdminProductContextType {
  products: AdminProduct[];
  categories: AdminCategory[];
  addProduct: (product: AdminProduct) => void;
  updateProduct: (id: string, updates: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;
  toggleProductVisibility: (id: string) => void;
  addCategory: (category: AdminCategory) => void;
  updateCategory: (id: string, updates: Partial<AdminCategory>) => void;
  deleteCategory: (id: string) => void;
}

const AdminProductContext = createContext<AdminProductContextType | undefined>(undefined);

export function AdminProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<AdminProduct[]>(() => {
    try {
      const stored = localStorage.getItem('lotusplanet_products');
      return stored ? JSON.parse(stored) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [categories, setCategories] = useState<AdminCategory[]>(() => {
    try {
      const stored = localStorage.getItem('lotusplanet_categories');
      return stored ? JSON.parse(stored) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  useEffect(() => {
    localStorage.setItem('lotusplanet_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('lotusplanet_categories', JSON.stringify(categories));
  }, [categories]);

  const addProduct = (product: AdminProduct) => setProducts(prev => [...prev, product]);
  
  const updateProduct = (id: string, updates: Partial<AdminProduct>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };
  
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));
  
  const toggleProductVisibility = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.visibility === 'Active' ? 'Hidden' : 'Active';
        return { ...p, visibility: nextStatus };
      }
      return p;
    }));
  };

  const addCategory = (category: AdminCategory) => setCategories(prev => [...prev, category]);
  
  const updateCategory = (id: string, updates: Partial<AdminCategory>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };
  
  const deleteCategory = (id: string) => setCategories(prev => prev.filter(c => c.id !== id));

  return (
    <AdminProductContext.Provider value={{
      products, categories,
      addProduct, updateProduct, deleteProduct, toggleProductVisibility,
      addCategory, updateCategory, deleteCategory
    }}>
      {children}
    </AdminProductContext.Provider>
  );
}

export const useAdminProducts = () => {
  const context = useContext(AdminProductContext);
  if (!context) throw new Error('useAdminProducts must be used within AdminProductProvider');
  return context;
};
