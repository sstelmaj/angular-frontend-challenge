import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PRODUCTS_API_ENDPOINTS } from '../../../core/config/api.config';
import { Product } from '../models/product.model';
import { CreateProductPayload, UpdateProductPayload } from '../models/product.payloads';
import { ProductApiService } from './product-api.service';

describe('ProductApiService', () => {
  let service: ProductApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(ProductApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get products from the backend collection endpoint', () => {
    const responseData: { data: Product[] } = {
      data: [
        {
          id: 'trj-crd',
          name: 'Tarjetas de Credito',
          description: 'Tarjeta de consumo bajo la modalidad de credito',
          logo: 'https://example.com/visa.png',
          date_release: '2025-01-01',
          date_revision: '2026-01-01'
        }
      ]
    };

    let actualResponse: { data: Product[] } | undefined;

    service.getProducts().subscribe((response) => {
      actualResponse = response;
    });

    const request = httpTestingController.expectOne(PRODUCTS_API_ENDPOINTS.collection);
    expect(request.request.method).toBe('GET');

    request.flush(responseData);

    expect(actualResponse).toEqual(responseData);
  });

  it('should create a product using POST /bp/products', () => {
    const payload: CreateProductPayload = {
      id: 'new-001',
      name: 'Nuevo producto',
      description: 'Descripcion valida para nuevo producto.',
      logo: 'https://example.com/new.png',
      date_release: '2026-05-01',
      date_revision: '2027-05-01'
    };

    let actualResponse: unknown;

    service.createProduct(payload).subscribe((response) => {
      actualResponse = response;
    });

    const request = httpTestingController.expectOne(PRODUCTS_API_ENDPOINTS.collection);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(payload);

    request.flush({ message: 'Product added successfully', data: payload });

    expect(actualResponse).toEqual({ message: 'Product added successfully', data: payload });
  });

  it('should update a product using PUT /bp/products/:id', () => {
    const productId = 'prd-123';
    const payload: UpdateProductPayload = {
      name: 'Producto actualizado',
      description: 'Descripcion actualizada para producto.',
      logo: 'https://example.com/updated.png',
      date_release: '2026-06-01',
      date_revision: '2027-06-01'
    };

    let actualResponse: unknown;

    service.updateProduct(productId, payload).subscribe((response) => {
      actualResponse = response;
    });

    const request = httpTestingController.expectOne(PRODUCTS_API_ENDPOINTS.byId(productId));
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(payload);
    expect(request.request.body.id).toBeUndefined();

    request.flush({ message: 'Product updated successfully', data: payload });

    expect(actualResponse).toEqual({ message: 'Product updated successfully', data: payload });
  });

  it('should delete a product using DELETE /bp/products/:id', () => {
    const productId = 'prd-321';
    let actualResponse: unknown;

    service.deleteProduct(productId).subscribe((response) => {
      actualResponse = response;
    });

    const request = httpTestingController.expectOne(PRODUCTS_API_ENDPOINTS.byId(productId));
    expect(request.request.method).toBe('DELETE');

    request.flush({ message: 'Product removed successfully' });

    expect(actualResponse).toEqual({ message: 'Product removed successfully' });
  });

  it('should verify a product id using GET /bp/products/verification/:id', () => {
    let actualResponse: boolean | undefined;

    service.verifyProductId('prd-777').subscribe((response) => {
      actualResponse = response;
    });

    const request = httpTestingController.expectOne(PRODUCTS_API_ENDPOINTS.verification('prd-777'));
    expect(request.request.method).toBe('GET');

    request.flush(true);

    expect(actualResponse).toBe(true);
  });

  it('should propagate HTTP errors from the backend', () => {
    let actualError: HttpErrorResponse | undefined;

    service.getProducts().subscribe({
      next: () => {
        throw new Error('Expected an error response');
      },
      error: (error) => {
        actualError = error;
      }
    });

    const request = httpTestingController.expectOne(PRODUCTS_API_ENDPOINTS.collection);
    request.flush(
      { message: 'backend error' },
      { status: 500, statusText: 'Internal Server Error' }
    );

    expect(actualError).toBeInstanceOf(HttpErrorResponse);
    expect(actualError?.status).toBe(500);
  });
});
