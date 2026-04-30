import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ProductApiService } from '../../features/products/services/product-api.service';

export function productIdAvailableValidator(
  productApiService: Pick<ProductApiService, 'verifyProductId'>
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = (control.value as string | null)?.trim() ?? '';

    if (!value || control.hasError('required') || control.hasError('minlength') || control.hasError('maxlength')) {
      return of(null);
    }

    return productApiService.verifyProductId(value).pipe(
      map((exists) => (exists ? { productIdTaken: true } : null)),
      catchError(() => of({ productIdVerificationFailed: true }))
    );
  };
}
