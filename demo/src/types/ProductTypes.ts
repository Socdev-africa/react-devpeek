// src/types/ProductTypes.ts

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  ratings: number[];
  imageUrl?: string;
  description?: string;
}

export interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  categories: string[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  filterByCategory: (category: string) => void;
  selectProduct: (id: string) => void;
  sortProducts: (key: keyof Product, order: 'asc' | 'desc') => void;
  addRating: (productId: string, rating: number) => void;
}