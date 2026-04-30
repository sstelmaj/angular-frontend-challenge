import {
  API_BASE_URL,
  PRODUCTS_API_BASE_PATH,
  PRODUCTS_API_ENDPOINTS
} from './api.config';

describe('api.config', () => {
  it('should expose the expected base URL and base path', () => {
    expect(API_BASE_URL).toBe('http://localhost:3002');
    expect(PRODUCTS_API_BASE_PATH).toBe('/bp/products');
  });

  it('should build the collection endpoint', () => {
    expect(PRODUCTS_API_ENDPOINTS.collection).toBe('http://localhost:3002/bp/products');
  });

  it('should encode product identifiers in endpoint builders', () => {
    expect(PRODUCTS_API_ENDPOINTS.byId('id con espacio')).toBe(
      'http://localhost:3002/bp/products/id%20con%20espacio'
    );
    expect(PRODUCTS_API_ENDPOINTS.verification('id/compuesto')).toBe(
      'http://localhost:3002/bp/products/verification/id%2Fcompuesto'
    );
  });
});
