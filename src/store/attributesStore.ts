import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Attribute {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'boolean';
  values?: string[]; // For select type
  createdAt: Date;
  updatedAt: Date;
}

interface AttributesState {
  attributes: Attribute[];
  isLoading: boolean;
  error: string | null;
  addAttribute: (attribute: Omit<Attribute, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAttribute: (id: string, updates: Partial<Omit<Attribute, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteAttribute: (id: string) => void;
  getAttributeById: (id: string) => Attribute | undefined;
  clearError: () => void;
}

export const useAttributesStore = create<AttributesState>()(
  persist(
    (set, get) => ({
      attributes: [
        {
          id: '1',
          name: 'Color',
          type: 'select',
          values: ['Red', 'Blue', 'Green', 'Yellow'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Size',
          type: 'select',
          values: ['XS', 'S', 'M', 'L', 'XL'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          name: 'Weight',
          type: 'number',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      isLoading: false,
      error: null,
      
      addAttribute: (attribute) => {
        const newAttribute: Attribute = {
          ...attribute,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          attributes: [...state.attributes, newAttribute],
          error: null,
        }));
      },
      
      updateAttribute: (id, updates) => {
        set((state) => ({
          attributes: state.attributes.map((attr) =>
            attr.id === id
              ? { ...attr, ...updates, updatedAt: new Date() }
              : attr
          ),
          error: null,
        }));
      },
      
      deleteAttribute: (id) => {
        set((state) => ({
          attributes: state.attributes.filter((attr) => attr.id !== id),
          error: null,
        }));
      },
      
      getAttributeById: (id) => {
        return get().attributes.find((attr) => attr.id === id);
      },
      
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'attributes-storage',
    }
  )
);