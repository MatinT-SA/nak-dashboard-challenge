import { create } from 'zustand';
import { attributesApi, type Attribute, type CreateAttributeDto } from '../services/api';
import toast from 'react-hot-toast';

interface AttributesState {
  attributes: Attribute[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
  };
  
  // Actions
  fetchAttributes: () => Promise<void>;
  createAttribute: (attribute: CreateAttributeDto) => Promise<void>;
  setFilters: (filters: Partial<AttributesState['filters']>) => void;
  resetFilters: () => void;
}

const initialFilters = {
  search: '',
};



export const useAttributesStore = create<AttributesState>((set, get) => ({
  attributes: [],
  loading: false,
  error: null,
  filters: initialFilters,

  fetchAttributes: async () => {
    try {
      set({ loading: true, error: null });
      const attributes = await attributesApi.getAll();
      set({ attributes, loading: false });
    } catch (error: any) {
      set({ 
        error: error.message, 
        loading: false,
        attributes: []
      });
      toast.error(error.message || 'Failed to fetch attributes');
    }
  },

  createAttribute: async (attributeData) => {
    try {
      set({ loading: true, error: null });
      await attributesApi.create(attributeData);
      toast.success('Attribute created successfully');
      get().fetchAttributes(); // Refresh the list
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to create attribute');
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