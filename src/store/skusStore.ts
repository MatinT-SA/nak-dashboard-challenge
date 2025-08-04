import { create } from 'zustand';
import { skusApi, type SKU, type CreateSKUDto, type UpdateSKUDto } from '../services/api';
import toast from 'react-hot-toast';

interface SKUsState {
  skus: SKU[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    priceRange: string;
    stockLevel: string;
  };
  
  // Actions
  fetchSKUs: () => Promise<void>;
  createSKU: (sku: CreateSKUDto) => Promise<void>;
  updateSKU: (id: string, sku: UpdateSKUDto) => Promise<void>;
  setFilters: (filters: Partial<SKUsState['filters']>) => void;
  resetFilters: () => void;
}

const initialFilters = {
  search: '',
  priceRange: '',
  stockLevel: '',
};



export const useSKUsStore = create<SKUsState>((set, get) => ({
  skus: [],
  loading: false,
  error: null,
  filters: initialFilters,

  fetchSKUs: async () => {
    try {
      set({ loading: true, error: null });
      const skus = await skusApi.getAll();
      set({ skus, loading: false });
    } catch (error: any) {
      set({ 
        error: error.message, 
        loading: false,
        skus: []
      });
      toast.error(error.message || 'Failed to fetch SKUs');
    }
  },

  createSKU: async (skuData) => {
    try {
      set({ loading: true, error: null });
      await skusApi.create(skuData);
      toast.success('SKU created successfully');
      get().fetchSKUs(); // Refresh the list
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to create SKU');
      throw error;
    }
  },

  updateSKU: async (id, skuData) => {
    try {
      set({ loading: true, error: null });
      await skusApi.update(id, skuData);
      toast.success('SKU updated successfully');
      get().fetchSKUs(); // Refresh the list
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to update SKU');
      throw error;
    }
  },

  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
  },

  resetFilters: () => {
    set({ filters: initialFilters });
  },
}));