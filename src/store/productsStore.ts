import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image?: string;
  status: 'active' | 'inactive';
  attributes?: { [key: string]: any };
  createdAt: Date;
  updatedAt: Date;
}

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  clearError: () => void;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [
        {
          id: '1',
          name: 'Classic T-Shirt',
          price: 29.99,
          category: 'Clothing',
          description: 'A comfortable classic t-shirt made from 100% cotton',
          status: 'active',
          attributes: {
            color: 'Blue',
            size: 'M',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Running Shoes',
          price: 89.99,
          category: 'Footwear',
          description: 'Professional running shoes with advanced cushioning',
          status: 'active',
          attributes: {
            color: 'Black',
            size: '42',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          name: 'Wireless Headphones',
          price: 159.99,
          category: 'Electronics',
          description: 'Premium wireless headphones with noise cancellation',
          status: 'inactive',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      isLoading: false,
      error: null,
      
      addProduct: (product) => {
        const newProduct: Product = {
          ...product,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          products: [...state.products, newProduct],
          error: null,
        }));
      },
      
      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, ...updates, updatedAt: new Date() }
              : product
          ),
          error: null,
        }));
      },
      
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
          error: null,
        }));
      },
      
      getProductById: (id) => {
        return get().products.find((product) => product.id === id);
      },
      
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'products-storage',
    }
  )
);