import { HttpErrorResponse } from '@angular/common/http';

import { getHttpErrorMessage } from './http-error.utils';

describe('http-error utils', () => {
  it('should return a network message when the backend is unreachable', () => {
    const error = new HttpErrorResponse({ status: 0, statusText: 'Unknown Error' });

    expect(getHttpErrorMessage(error, 'loadProducts')).toContain(
      'No fue posible conectar con el backend local'
    );
  });

  it('should return a specific message for create bad requests', () => {
    const error = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });

    expect(getHttpErrorMessage(error, 'createProduct')).toBe(
      'No fue posible crear el producto porque la informacion enviada es invalida.'
    );
  });

  it('should return a specific message for not found product operations', () => {
    const error = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });

    expect(getHttpErrorMessage(error, 'deleteProduct')).toBe(
      'No se encontro un producto con el identificador indicado.'
    );
  });

  it('should return the context fallback for unknown errors', () => {
    expect(getHttpErrorMessage(new Error('unexpected'), 'verifyProductId')).toBe(
      'No fue posible verificar el ID en este momento.'
    );
  });
});
