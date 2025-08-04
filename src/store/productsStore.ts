import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  description: string;
  image?: string;
  status: "active" | "inactive";
  attributes?: { [key: string]: any };
  createdAt: Date;
  updatedAt: Date;
}

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  addProduct: (
    product: Omit<Product, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateProduct: (
    id: string,
    updates: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>
  ) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  clearError: () => void;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [],
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
      name: "products-storage",
    }
  )
);
