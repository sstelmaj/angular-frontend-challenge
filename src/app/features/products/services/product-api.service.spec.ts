import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { PRODUCTS_API_ENDPOINTS } from '../../../core/config/api.config';
import { Product } from '../models/product.model';
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
});
