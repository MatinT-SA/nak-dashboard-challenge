import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Attribute {
  id: string;
  name: string;
  type: "text" | "number" | "select" | "boolean";
  values?: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface AttributesState {
  attributes: Attribute[];
  isLoading: boolean;
  error: string | null;
  fetchAttributes: () => Promise<void>;
  fetchAttributeById: (id: string) => Promise<Attribute | null>;
  createAttribute: (
    attribute: Omit<Attribute, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  clearError: () => void;
}

export const useAttributesStore = create<AttributesState>()(
  persist(
    (set, get) => ({
      attributes: [],
      isLoading: false,
      error: null,

      fetchAttributes: async () => {
        set({ isLoading: true });
        try {
          const res = await fetch("/api/attributes");
          if (!res.ok) throw new Error("Failed to fetch attributes");
          const data = await res.json();
          set({ attributes: data, isLoading: false });
        } catch (err: any) {
          set({ error: err.message || "Unknown error", isLoading: false });
        }
      },

      fetchAttributeById: async (id: string) => {
        try {
          const res = await fetch(`/api/attributes/${id}`);
          if (!res.ok) throw new Error("Failed to fetch attribute");
          const data = await res.json();
          return data;
        } catch (err: any) {
          set({ error: err.message || "Unknown error" });
          return null;
        }
      },

      createAttribute: async (attribute) => {
        try {
          const res = await fetch("/api/attributes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(attribute),
          });

          if (!res.ok) throw new Error("Failed to create attribute");

          const newAttr = await res.json();
          set((state) => ({
            attributes: [...state.attributes, newAttr],
            error: null,
          }));
        } catch (err: any) {
          set({ error: err.message || "Unknown error" });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "attributes-storage",
    }
  )
);
