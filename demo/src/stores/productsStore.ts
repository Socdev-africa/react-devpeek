// src/stores/productsStore.ts
import { create } from 'zustand';
import { ProductsState, Product } from '../types/ProductTypes';

const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  categories: [],
  loading: false,
  error: null,
  
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockProducts: Product[] = [
        { 
          id: 'p1', 
          name: 'Premium Keyboard', 
          category: 'Electronics', 
          price: 149.99, 
          stock: 34, 
          ratings: [4, 5, 4, 3, 5],
          description: 'A high-quality mechanical keyboard with RGB lighting and customizable keys.'
        },
        { 
          id: 'p2', 
          name: 'Ergonomic Mouse', 
          category: 'Electronics', 
          price: 89.99, 
          stock: 12, 
          ratings: [5, 4, 5, 5],
          description: 'Designed for comfort during long work sessions with adjustable DPI and programmable buttons.'
        },
        { 
          id: 'p3', 
          name: '4K Monitor', 
          category: 'Electronics', 
          price: 299.99, 
          stock: 8, 
          ratings: [4, 4, 3, 5, 4],
          description: 'Ultra-high definition monitor with HDR support and eye care technology.'
        },
        { 
          id: 'p4', 
          name: 'Developer Mug', 
          category: 'Accessories', 
          price: 19.99, 
          stock: 56, 
          ratings: [5, 5, 4, 5],
          description: 'Large ceramic mug with funny programming quotes. Microwave and dishwasher safe.'
        },
        { 
          id: 'p5', 
          name: 'JavaScript Handbook', 
          category: 'Books', 
          price: 49.99, 
          stock: 23, 
          ratings: [4, 3, 5, 4, 4],
          description: 'Comprehensive guide to modern JavaScript with practical examples and best practices.'
        },
        { 
          id: 'p6', 
          name: 'Noise-Cancelling Headphones', 
          category: 'Audio', 
          price: 199.99, 
          stock: 17, 
          ratings: [5, 5, 4, 5, 5],
          description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.'
        },
        { 
          id: 'p7', 
          name: 'Smart Watch', 
          category: 'Wearables', 
          price: 249.99, 
          stock: 6, 
          ratings: [4, 4, 3, 5],
          description: 'Feature-rich smartwatch with health tracking, GPS, and app notifications.'
        },
        { 
          id: 'p8', 
          name: 'Code Stickers Pack', 
          category: 'Accessories', 
          price: 9.99, 
          stock: 120, 
          ratings: [4, 5, 3, 4],
          description: 'Set of 50 vinyl stickers featuring programming languages and tech logos.'
        },
      ];

      const categories = Array.from(new Set(mockProducts.map(p => p.category)));

      set({
        products: mockProducts,
        filteredProducts: mockProducts,
        categories,
        loading: false
      });
    } catch (err) {
      set({ error: 'Failed to fetch products', loading: false });
    }
  },
  
  filterByCategory: (category) => {
    const { products } = get();
    if (category === 'All') {
      set({ filteredProducts: products });
    } else {
      set({
        filteredProducts: products.filter(p => p.category === category)
      });
    }
  },
  
  selectProduct: (id) => {
    const { products } = get();
    const product = products.find(p => p.id === id) || null;
    set({ selectedProduct: product });
  },
  
  sortProducts: (key, order) => {
    const { filteredProducts } = get();
    const sorted = [...filteredProducts].sort((a, b) => {
      if (order === 'asc') {
        return (a[key] ?? 0) > (b[key] ?? 0) ? 1 : -1;
      } else {
        return (a[key] ?? 0) < (b[key] ?? 0) ? 1 : -1;
      }
    });
    set({ filteredProducts: sorted });
  },
  
  addRating: (productId, rating) => {
    set(state => {
      const updatedProducts = state.products.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            ratings: [...p.ratings, rating]
          };
        }
        return p;
      });

      const updatedFilteredProducts = state.filteredProducts.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            ratings: [...p.ratings, rating]
          };
        }
        return p;
      });

      let updatedSelected = state.selectedProduct;
      if (state.selectedProduct?.id === productId) {
        updatedSelected = {
          ...state.selectedProduct,
          ratings: [...state.selectedProduct.ratings, rating]
        };
      }

      return {
        products: updatedProducts,
        filteredProducts: updatedFilteredProducts,
        selectedProduct: updatedSelected
      };
    });
  }
}));

export default useProductsStore;