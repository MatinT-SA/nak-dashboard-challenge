const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://nak-interview.darkube.app/api';

// Get token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Default headers for API requests
const getHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: getHeaders(),
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// Products API
export const productsApi = {
  getAll: (params?: {
    search?: string;
    category?: string;
    brand?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.append(key, value.toString());
        }
      });
    }
    const query = searchParams.toString();
    return apiRequest<{
      data: Product[];
      total: number;
      page: number;
      limit: number;
    }>(`/products${query ? `?${query}` : ''}`);
  },

  getById: (id: string) => 
    apiRequest<Product>(`/products/${id}`),

  create: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiRequest<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),

  update: (id: string, product: Partial<Product>) =>
    apiRequest<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),

  delete: (id: string) =>
    apiRequest<void>(`/products/${id}`, {
      method: 'DELETE',
    }),

  getCategories: () =>
    apiRequest<string[]>('/products/categories'),

  getBrands: () =>
    apiRequest<string[]>('/products/brands'),
};

// Attributes API
export const attributesApi = {
  getAll: (params?: {
    search?: string;
    type?: string;
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.append(key, value.toString());
        }
      });
    }
    const query = searchParams.toString();
    return apiRequest<{
      data: Attribute[];
      total: number;
      page: number;
      limit: number;
    }>(`/attributes${query ? `?${query}` : ''}`);
  },

  getById: (id: string) => 
    apiRequest<Attribute>(`/attributes/${id}`),

  create: (attribute: Omit<Attribute, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiRequest<Attribute>('/attributes', {
      method: 'POST',
      body: JSON.stringify(attribute),
    }),

  update: (id: string, attribute: Partial<Attribute>) =>
    apiRequest<Attribute>(`/attributes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(attribute),
    }),

  delete: (id: string) =>
    apiRequest<void>(`/attributes/${id}`, {
      method: 'DELETE',
    }),

  getTypes: () =>
    apiRequest<string[]>('/attributes/types'),
};

// Type definitions
export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  attributes?: { [key: string]: any };
  createdAt: string;
  updatedAt: string;
}

export interface Attribute {
  id: string;
  name: string;
  type: 'text' | 'number' | 'boolean' | 'date' | 'dropdown';
  value?: any;
  options?: string[]; // For dropdown type
  required: boolean;
  createdAt: string;
  updatedAt: string;
}