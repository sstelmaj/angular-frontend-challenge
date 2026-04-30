import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';

import { Product } from '../../models/product.model';
import { ProductApiService } from '../../services/product-api.service';
import { ProductsListPageComponent } from './products-list-page.component';

describe('ProductsListPageComponent', () => {
  let fixture: ComponentFixture<ProductsListPageComponent>;
  let component: ProductsListPageComponent;
  let router: Router;
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

    router = TestBed.inject(Router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show the loading state while the products request is in progress', () => {
    const response$ = new Subject<{ data: Product[] }>();
    productApiServiceSpy.getProducts.mockReturnValue(response$.asObservable());

    fixture = TestBed.createComponent(ProductsListPageComponent);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Cargando productos');

    response$.next({ data: products });
    response$.complete();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('2 de 2 resultados');
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

  it('should render an empty state when the list is empty', () => {
    productApiServiceSpy.getProducts.mockReturnValue(of({ data: [] }));

    fixture = TestBed.createComponent(ProductsListPageComponent);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'No hay productos disponibles para mostrar.'
    );
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

  it('should limit visible records according to the selected page size', () => {
    const expandedProducts = Array.from({ length: 7 }, (_, index) => ({
      id: `prd-${index + 1}`,
      name: `Producto ${index + 1}`,
      description: `Descripcion valida ${index + 1}`,
      logo: 'https://example.com/logo.png',
      date_release: '2026-05-01',
      date_revision: '2027-05-01'
    }));
    productApiServiceSpy.getProducts.mockReturnValue(of({ data: expandedProducts }));

    fixture = TestBed.createComponent(ProductsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component['updatePageSize'](5);
    fixture.detectChanges();

    expect(component['visibleProducts']()).toHaveLength(5);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('5 de 7 resultados');
  });

  it('should navigate to the edit route when edit is requested', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);
    productApiServiceSpy.getProducts.mockReturnValue(of({ data: products }));

    fixture = TestBed.createComponent(ProductsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component['navigateToEdit']('trj-crd');

    expect(navigateSpy).toHaveBeenCalledWith(['/products', 'trj-crd', 'edit']);
  });

  it('should show the error state when loading products fails', () => {
    productApiServiceSpy.getProducts.mockReturnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 0,
            statusText: 'Unknown Error'
          })
      )
    );

    fixture = TestBed.createComponent(ProductsListPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Error al cargar productos');
    expect(compiled.textContent).toContain('No fue posible conectar con el backend local');
  });

  it('should show success feedback when it arrives through router state', () => {
    productApiServiceSpy.getProducts.mockReturnValue(of({ data: products }));
    jest.spyOn(router, 'getCurrentNavigation').mockReturnValue({
      extras: { state: { feedbackMessage: 'Producto agregado correctamente.' } }
    } as ReturnType<Router['getCurrentNavigation']>);

    fixture = TestBed.createComponent(ProductsListPageComponent);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Producto agregado correctamente.'
    );
  });
});
