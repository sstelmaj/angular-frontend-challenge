export const PRODUCTS_API_BASE_PATH = '/bp/products';

export const PRODUCTS_API_ENDPOINTS = {
  collection: PRODUCTS_API_BASE_PATH,
  byId: (id: string) => `${PRODUCTS_API_BASE_PATH}/${encodeURIComponent(id)}`,
  verification: (id: string) =>
    `${PRODUCTS_API_BASE_PATH}/verification/${encodeURIComponent(id)}`
} as const;
