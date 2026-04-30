import { PRODUCTS_API_BASE_PATH, PRODUCTS_API_ENDPOINTS } from './api.config';

describe('api.config', () => {
  it('should expose the expected base path', () => {
    expect(PRODUCTS_API_BASE_PATH).toBe('/bp/products');
  });

  it('should build the collection endpoint', () => {
    expect(PRODUCTS_API_ENDPOINTS.collection).toBe('/bp/products');
  });

  it('should encode product identifiers in endpoint builders', () => {
    expect(PRODUCTS_API_ENDPOINTS.byId('id con espacio')).toBe('/bp/products/id%20con%20espacio');
    expect(PRODUCTS_API_ENDPOINTS.verification('id/compuesto')).toBe(
      '/bp/products/verification/id%2Fcompuesto'
    );
  });
});
