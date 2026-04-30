import { Product } from './product.model';

export interface CreateProductPayload extends Product {}

export type UpdateProductPayload = Omit<Product, 'id'>;
