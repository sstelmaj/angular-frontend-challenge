import { FormControl, Validators } from '@angular/forms';
import { firstValueFrom, of, throwError } from 'rxjs';

import { productIdAvailableValidator } from './product-id-available.validator';

describe('productIdAvailableValidator', () => {
  it('should return invalid when verifyProductId reports that the ID already exists', async () => {
    const productApiService = {
      verifyProductId: jest.fn().mockReturnValue(of(true))
    };
    const validator = productIdAvailableValidator(productApiService);
    const control = new FormControl('prd-001');

    await expect(firstValueFrom(validator(control))).resolves.toEqual({ productIdTaken: true });
    expect(productApiService.verifyProductId).toHaveBeenCalledWith('prd-001');
  });

  it('should return valid when verifyProductId reports that the ID is available', async () => {
    const productApiService = {
      verifyProductId: jest.fn().mockReturnValue(of(false))
    };
    const validator = productIdAvailableValidator(productApiService);
    const control = new FormControl('prd-002');

    await expect(firstValueFrom(validator(control))).resolves.toBeNull();
    expect(productApiService.verifyProductId).toHaveBeenCalledWith('prd-002');
  });

  it('should return a technical error when the verification request fails', async () => {
    const productApiService = {
      verifyProductId: jest.fn().mockReturnValue(throwError(() => new Error('network')))
    };
    const validator = productIdAvailableValidator(productApiService);
    const control = new FormControl('prd-003');

    await expect(firstValueFrom(validator(control))).resolves.toEqual({
      productIdVerificationFailed: true
    });
  });

  it('should not call the backend when the control is empty or has invalid length', async () => {
    const productApiService = {
      verifyProductId: jest.fn()
    };
    const validator = productIdAvailableValidator(productApiService);
    const emptyControl = new FormControl('', { validators: [Validators.required] });
    emptyControl.updateValueAndValidity({ emitEvent: false });

    const shortControl = new FormControl('ab', { validators: [Validators.minLength(3)] });
    shortControl.updateValueAndValidity({ emitEvent: false });

    await expect(firstValueFrom(validator(emptyControl))).resolves.toBeNull();
    await expect(firstValueFrom(validator(shortControl))).resolves.toBeNull();
    expect(productApiService.verifyProductId).not.toHaveBeenCalled();
  });
});
