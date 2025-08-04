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

// SKUs API (Main focus based on API spec)
export const skusApi = {
  getAll: () => 
    apiRequest<SKU[]>('/skus'),

  getById: (id: string) => 
    apiRequest<SKU>(`/skus/${id}`),

  create: (sku: CreateSKUDto) =>
    apiRequest<SKU>('/skus', {
      method: 'POST',
      body: JSON.stringify(sku),
    }),

  update: (id: string, sku: UpdateSKUDto) =>
    apiRequest<SKU>(`/skus/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(sku),
    }),
};

// Products API (With pagination as per spec)
export const productsApi = {
  getPaginated: (params: { perPage: number; page: number }) => {
    const searchParams = new URLSearchParams({
      perPage: params.perPage.toString(),
      page: params.page.toString(),
    });
    return apiRequest<{
      data: Product[];
      total: number;
      page: number;
      perPage: number;
    }>(`/products?${searchParams.toString()}`);
  },

  getById: (id: string) => 
    apiRequest<Product>(`/products/${id}`),

  create: (product: CreateProductDto) =>
    apiRequest<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),

  update: (id: string, product: UpdateProductDto) =>
    apiRequest<Product>(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(product),
    }),

  delete: (id: string) =>
    apiRequest<void>(`/products/${id}`, {
      method: 'DELETE',
    }),
};

// Attributes API
export const attributesApi = {
  getAll: () => 
    apiRequest<Attribute[]>('/attributes'),

  getById: (id: string) => 
    apiRequest<Attribute>(`/attributes/${id}`),

  create: (attribute: CreateAttributeDto) =>
    apiRequest<Attribute>('/attributes', {
      method: 'POST',
      body: JSON.stringify(attribute),
    }),
};

// Type definitions based on API schema
export interface SKU {
  id: string;
  model: string;
  price: string;
  numberInStock: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSKUDto {
  model: string;
  price: string;
  numberInStock: string;
}

export interface UpdateSKUDto {
  model?: string;
  price?: string;
  numberInStock?: string;
}

export interface Attribute {
  id: string;
  name: string;
  values: string[];
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAttributeDto {
  name: string;
  values: string[];
}

export interface AttrDto {
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  name: string;
  skusIds: string[];
  attributes: AttrDto[];
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductDto {
  name: string;
  skusIds: string[];
  attributes: AttrDto[];
}

export interface UpdateProductDto {
  name?: string;
  skusIds?: string[];
  attributes?: AttrDto[];
}