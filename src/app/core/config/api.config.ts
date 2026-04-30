export const API_BASE_URL = 'http://localhost:3002';

export const PRODUCTS_API_BASE_PATH = '/bp/products';

export const PRODUCTS_API_ENDPOINTS = {
  collection: `${API_BASE_URL}${PRODUCTS_API_BASE_PATH}`,
  byId: (id: string) => `${API_BASE_URL}${PRODUCTS_API_BASE_PATH}/${encodeURIComponent(id)}`,
  verification: (id: string) =>
    `${API_BASE_URL}${PRODUCTS_API_BASE_PATH}/verification/${encodeURIComponent(id)}`
} as const;
