import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { PRODUCTS_API_ENDPOINTS } from '../../../core/config/api.config';
import { CreateProductPayload, UpdateProductPayload } from '../models/product.payloads';
import {
  DeleteProductResponse,
  ProductMutationResponse,
  ProductsResponse
} from '../models/product.responses';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private readonly http = inject(HttpClient);

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(PRODUCTS_API_ENDPOINTS.collection);
  }

  createProduct(payload: CreateProductPayload): Observable<ProductMutationResponse> {
    return this.http.post<ProductMutationResponse>(PRODUCTS_API_ENDPOINTS.collection, payload);
  }

  updateProduct(id: string, payload: UpdateProductPayload): Observable<ProductMutationResponse> {
    return this.http.put<ProductMutationResponse>(PRODUCTS_API_ENDPOINTS.byId(id), payload);
  }

  deleteProduct(id: string): Observable<DeleteProductResponse> {
    return this.http.delete<DeleteProductResponse>(PRODUCTS_API_ENDPOINTS.byId(id));
  }

  verifyProductId(id: string): Observable<boolean> {
    return this.http.get<boolean>(PRODUCTS_API_ENDPOINTS.verification(id));
  }
}
