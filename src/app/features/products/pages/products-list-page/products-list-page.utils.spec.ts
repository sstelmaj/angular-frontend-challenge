import { Product } from '../../models/product.model';
import {
  filterProducts,
  getVisibleProducts,
  normalizeSearchTerm
} from './products-list-page.utils';

describe('products-list-page utils', () => {
  const products: Product[] = [
    {
      id: 'trj-crd',
      name: 'Tarjetas de Credito',
      description: 'Tarjeta de consumo bajo la modalidad de credito',
      logo: 'https://example.com/card.png',
      date_release: '2025-01-01',
      date_revision: '2026-01-01'
    },
    {
      id: 'cta-aho',
      name: 'Cuenta de Ahorro',
      description: 'Cuenta para ahorro programado',
      logo: 'https://example.com/save.png',
      date_release: '2025-02-01',
      date_revision: '2026-02-01'
    }
  ];

  it('should normalize search terms trimming spaces and lowercasing the text', () => {
    expect(normalizeSearchTerm('  TarJetAS  ')).toBe('tarjetas');
  });

  it('should filter locally by id, name or description ignoring case', () => {
    expect(filterProducts(products, 'TRJ').map((product) => product.id)).toEqual(['trj-crd']);
    expect(filterProducts(products, 'ahorro').map((product) => product.id)).toEqual(['cta-aho']);
    expect(filterProducts(products, 'consumo').map((product) => product.id)).toEqual(['trj-crd']);
  });

  it('should limit visible products to the selected page size', () => {
    const expandedProducts = [...products, ...products, ...products];

    expect(getVisibleProducts(expandedProducts, 5)).toHaveLength(5);
    expect(getVisibleProducts(expandedProducts, 10)).toHaveLength(6);
  });
});
