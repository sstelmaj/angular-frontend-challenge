import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { Product } from '../../models/product.model';
import { ProductApiService } from '../../services/product-api.service';
import { ProductsListPageComponent } from './products-list-page.component';

describe('ProductsListPageComponent', () => {
  let fixture: ComponentFixture<ProductsListPageComponent>;
  let component: ProductsListPageComponent;
  let productApiServiceSpy: {
    getProducts: jest.Mock;
  };

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

  beforeEach(async () => {
    productApiServiceSpy = {
      getProducts: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ProductsListPageComponent],
      providers: [provideRouter([]), { provide: ProductApiService, useValue: productApiServiceSpy }]
    }).compileComponents();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load products and render the summary on init', () => {
    productApiServiceSpy.getProducts.mockReturnValue(of({ data: products }));

    fixture = TestBed.createComponent(ProductsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(productApiServiceSpy.getProducts).toHaveBeenCalled();
    expect(compiled.textContent).toContain('2 de 2 resultados');
    expect(compiled.textContent).toContain('Tarjetas de Credito');
  });

  it('should filter products locally and keep the count in sync', () => {
    productApiServiceSpy.getProducts.mockReturnValue(of({ data: products }));

    fixture = TestBed.createComponent(ProductsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component['updateSearchTerm']('ahorro');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('1 de 1 resultados');
    expect(compiled.textContent).toContain('Cuenta de Ahorro');
    expect(compiled.textContent).not.toContain('Tarjetas de Credito');
  });

  it('should show the error state when loading products fails', () => {
    productApiServiceSpy.getProducts.mockReturnValue(
      throwError(() => new Error('backend unavailable'))
    );

    fixture = TestBed.createComponent(ProductsListPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Error al cargar productos');
  });
});
