import { create } from 'zustand';
import { productsApi, type Product } from '../services/api';
import { mockProducts, mockCategories, mockBrands } from '../services/mockData';
import toast from 'react-hot-toast';

interface ProductsState {
  products: Product[];
  categories: string[];
  brands: string[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    category: string;
    brand: string;
    status: string;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  
  // Actions
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchBrands: () => Promise<void>;
  setFilters: (filters: Partial<ProductsState['filters']>) => void;
  setPagination: (pagination: Partial<ProductsState['pagination']>) => void;
  resetFilters: () => void;
  createProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const initialFilters = {
  search: '',
  category: '',
  brand: '',
  status: '',
};

const initialPagination = {
  page: 1,
  limit: 10,
  total: 0,
};

// Helper function to filter mock data
const filterMockProducts = (products: Product[], filters: any) => {
  return products.filter(product => {
    const matchesSearch = !filters.search || 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.sku.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.description?.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesBrand = !filters.brand || product.brand === filters.brand;
    const matchesStatus = !filters.status || product.status === filters.status;
    
    return matchesSearch && matchesCategory && matchesBrand && matchesStatus;
  });
};

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  categories: [],
  brands: [],
  loading: false,
  error: null,
  filters: initialFilters,
  pagination: initialPagination,

  fetchProducts: async () => {
    try {
      set({ loading: true, error: null });
      const { filters, pagination } = get();
      
      const params = {
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      };

      try {
        const response = await productsApi.getAll(params);
        
        set({
          products: response.data,
          pagination: {
            ...pagination,
            total: response.total,
            page: response.page,
            limit: response.limit,
          },
          loading: false,
        });
      } catch (apiError) {
        // Fallback to mock data
        console.warn('API not available, using mock data:', apiError);
        
        const filteredProducts = filterMockProducts(mockProducts, filters);
        const startIndex = (pagination.page - 1) * pagination.limit;
        const endIndex = startIndex + pagination.limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
        
        set({
          products: paginatedProducts,
          pagination: {
            ...pagination,
            total: filteredProducts.length,
          },
          loading: false,
        });
      }
    } catch (error: any) {
      set({ 
        error: error.message, 
        loading: false,
        products: []
      });
      toast.error(error.message || 'Failed to fetch products');
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await productsApi.getCategories();
      set({ categories });
    } catch (error: any) {
      console.warn('API not available for categories, using mock data');
      set({ categories: mockCategories });
    }
  },

  fetchBrands: async () => {
    try {
      const brands = await productsApi.getBrands();
      set({ brands });
    } catch (error: any) {
      console.warn('API not available for brands, using mock data');
      set({ brands: mockBrands });
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