import { Product } from '../../models/product.model';

export const PAGE_SIZE_OPTIONS = [5, 10, 20] as const;

export type PageSizeOption = (typeof PAGE_SIZE_OPTIONS)[number];

export function normalizeSearchTerm(value: string): string {
  return value.trim().toLowerCase();
}

export function filterProducts(products: readonly Product[], searchTerm: string): Product[] {
  const normalizedSearchTerm = normalizeSearchTerm(searchTerm);

  if (!normalizedSearchTerm) {
    return [...products];
  }

  return products.filter((product) =>
    [product.id, product.name, product.description].some((fieldValue) =>
      fieldValue.toLowerCase().includes(normalizedSearchTerm)
    )
  );
}

export function getVisibleProducts(
  products: readonly Product[],
  pageSize: PageSizeOption
): Product[] {
  return products.slice(0, pageSize);
}
