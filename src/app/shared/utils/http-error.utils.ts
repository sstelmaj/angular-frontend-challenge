import { HttpErrorResponse } from '@angular/common/http';

export type HttpErrorContext =
  | 'loadProducts'
  | 'createProduct'
  | 'updateProduct'
  | 'deleteProduct'
  | 'verifyProductId';

const DEFAULT_ERROR_MESSAGES: Record<HttpErrorContext, string> = {
  loadProducts: 'No fue posible cargar los productos financieros. Intenta nuevamente.',
  createProduct: 'No fue posible crear el producto. Intenta nuevamente.',
  updateProduct: 'No fue posible actualizar el producto. Intenta nuevamente.',
  deleteProduct: 'No fue posible eliminar el producto. Intenta nuevamente.',
  verifyProductId: 'No fue posible verificar el ID en este momento.'
};

export function getHttpErrorMessage(error: unknown, context: HttpErrorContext): string {
  if (!(error instanceof HttpErrorResponse)) {
    return DEFAULT_ERROR_MESSAGES[context];
  }

  if (error.status === 0) {
    return 'No fue posible conectar con el backend local. Verifica que el servicio este disponible.';
  }

  if (error.status === 400) {
    return getBadRequestMessage(context);
  }

  if (error.status === 404) {
    return getNotFoundMessage(context);
  }

  return DEFAULT_ERROR_MESSAGES[context];
}

function getBadRequestMessage(context: HttpErrorContext): string {
  switch (context) {
    case 'createProduct':
      return 'No fue posible crear el producto porque la informacion enviada es invalida.';
    case 'updateProduct':
      return 'No fue posible actualizar el producto porque la informacion enviada es invalida.';
    case 'deleteProduct':
      return 'La solicitud para eliminar el producto no fue valida.';
    case 'verifyProductId':
      return 'No fue posible verificar el ID porque la solicitud no fue valida.';
    case 'loadProducts':
    default:
      return 'La solicitud para cargar productos no fue valida.';
  }
}

function getNotFoundMessage(context: HttpErrorContext): string {
  switch (context) {
    case 'updateProduct':
    case 'deleteProduct':
      return 'No se encontro un producto con el identificador indicado.';
    case 'createProduct':
      return 'No se encontro el recurso de productos en el backend.';
    case 'verifyProductId':
      return 'No fue posible verificar el ID porque el recurso no esta disponible.';
    case 'loadProducts':
    default:
      return 'No se encontro el recurso de productos financieros.';
  }
}
