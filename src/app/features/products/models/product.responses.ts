import { Product } from './product.model';
import { UpdateProductPayload } from './product.payloads';

export interface ProductsResponse {
  data: Product[];
}

export interface ProductMutationResponse {
  message: string;
  data: Product | UpdateProductPayload;
}

export interface DeleteProductResponse {
  message: string;
}
