import { create } from 'zustand';
import { productsApi, type Product, type CreateProductDto, type UpdateProductDto } from '../services/api';
import toast from 'react-hot-toast';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
  };
  pagination: {
    page: number;
    perPage: number;
    total: number;
  };
  
  // Actions
  fetchProducts: () => Promise<void>;
  createProduct: (product: CreateProductDto) => Promise<void>;
  updateProduct: (id: string, product: UpdateProductDto) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  setFilters: (filters: Partial<ProductsState['filters']>) => void;
  setPagination: (pagination: Partial<ProductsState['pagination']>) => void;
  resetFilters: () => void;
}

const initialFilters = {
  search: '',
};

const initialPagination = {
  page: 1,
  perPage: 10,
  total: 0,
};

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  filters: initialFilters,
  pagination: initialPagination,

  fetchProducts: async () => {
    try {
      set({ loading: true, error: null });
      const { pagination } = get();
      
      const params = {
        page: pagination.page,
        perPage: pagination.perPage,
      };

      const response = await productsApi.getPaginated(params);
      
      set({
        products: response.data,
        pagination: {
          ...pagination,
          total: response.total,
          page: response.page,
          perPage: response.perPage,
        },
        loading: false,
      });
    } catch (error: any) {
      set({ 
        error: error.message, 
        loading: false,
        products: []
      });
      toast.error(error.message || 'Failed to fetch products');
    }
  },

  setFilters: (newFilters) => {
    set({ 
      filters: { ...get().filters, ...newFilters },
      pagination: { ...get().pagination, page: 1 } // Reset to first page when filtering
    });
    get().fetchProducts();
  },

  setPagination: (newPagination) => {
    set({ pagination: { ...get().pagination, ...newPagination } });
    get().fetchProducts();
  },

  resetFilters: () => {
    set({ 
      filters: initialFilters,
      pagination: { ...initialPagination }
    });
    get().fetchProducts();
  },

  createProduct: async (productData) => {
    try {
      set({ loading: true, error: null });
      await productsApi.create(productData);
      toast.success('Product created successfully');
      get().fetchProducts();
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to create product');
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      set({ loading: true, error: null });
      await productsApi.update(id, productData);
      toast.success('Product updated successfully');
      get().fetchProducts();
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to update product');
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      set({ loading: true, error: null });
      await productsApi.delete(id);
      toast.success('Product deleted successfully');
      get().fetchProducts();
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to delete product');
      throw error;
    }
  },
}));