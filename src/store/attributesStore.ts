import { create } from 'zustand';
import { attributesApi, type Attribute } from '../services/api';
import { mockAttributes, mockTypes } from '../services/mockData';
import toast from 'react-hot-toast';

interface AttributesState {
  attributes: Attribute[];
  types: string[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    type: string;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  
  // Actions
  fetchAttributes: () => Promise<void>;
  fetchTypes: () => Promise<void>;
  setFilters: (filters: Partial<AttributesState['filters']>) => void;
  setPagination: (pagination: Partial<AttributesState['pagination']>) => void;
  resetFilters: () => void;
  createAttribute: (attribute: Omit<Attribute, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateAttribute: (id: string, attribute: Partial<Attribute>) => Promise<void>;
  deleteAttribute: (id: string) => Promise<void>;
}

const initialFilters = {
  search: '',
  type: '',
};

const initialPagination = {
  page: 1,
  limit: 10,
  total: 0,
};

// Helper function to filter mock data
const filterMockAttributes = (attributes: Attribute[], filters: any) => {
  return attributes.filter(attribute => {
    const matchesSearch = !filters.search || 
      attribute.name.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesType = !filters.type || attribute.type === filters.type;
    
    return matchesSearch && matchesType;
  });
};

export const useAttributesStore = create<AttributesState>((set, get) => ({
  attributes: [],
  types: ['text', 'number', 'boolean', 'date', 'dropdown'],
  loading: false,
  error: null,
  filters: initialFilters,
  pagination: initialPagination,

  fetchAttributes: async () => {
    try {
      set({ loading: true, error: null });
      const { filters, pagination } = get();
      
      const params = {
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      };

      try {
        const response = await attributesApi.getAll(params);
        
        set({
          attributes: response.data,
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
        
        const filteredAttributes = filterMockAttributes(mockAttributes, filters);
        const startIndex = (pagination.page - 1) * pagination.limit;
        const endIndex = startIndex + pagination.limit;
        const paginatedAttributes = filteredAttributes.slice(startIndex, endIndex);
        
        set({
          attributes: paginatedAttributes,
          pagination: {
            ...pagination,
            total: filteredAttributes.length,
          },
          loading: false,
        });
      }
    } catch (error: any) {
      set({ 
        error: error.message, 
        loading: false,
        attributes: []
      });
      toast.error(error.message || 'Failed to fetch attributes');
    }
  },

  fetchTypes: async () => {
    try {
      const types = await attributesApi.getTypes();
      set({ types });
    } catch (error: any) {
      console.warn('API not available for types, using mock data');
      set({ types: mockTypes });
    }
  },

  setFilters: (newFilters) => {
    set({ 
      filters: { ...get().filters, ...newFilters },
      pagination: { ...get().pagination, page: 1 } // Reset to first page when filtering
    });
    get().fetchAttributes();
  },

  setPagination: (newPagination) => {
    set({ pagination: { ...get().pagination, ...newPagination } });
    get().fetchAttributes();
  },

  resetFilters: () => {
    set({ 
      filters: initialFilters,
      pagination: { ...initialPagination }
    });
    get().fetchAttributes();
  },

  createAttribute: async (attributeData) => {
    try {
      set({ loading: true, error: null });
      await attributesApi.create(attributeData);
      toast.success('Attribute created successfully');
      get().fetchAttributes();
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to create attribute');
      throw error;
    }
  },

  updateAttribute: async (id, attributeData) => {
    try {
      set({ loading: true, error: null });
      await attributesApi.update(id, attributeData);
      toast.success('Attribute updated successfully');
      get().fetchAttributes();
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to update attribute');
      throw error;
    }
  },

  deleteAttribute: async (id) => {
    try {
      set({ loading: true, error: null });
      await attributesApi.delete(id);
      toast.success('Attribute deleted successfully');
      get().fetchAttributes();
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to delete attribute');
      throw error;
    }
  },
}));