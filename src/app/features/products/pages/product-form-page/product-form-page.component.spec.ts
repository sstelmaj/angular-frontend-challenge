import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { NEVER, of, throwError } from 'rxjs';

import { Product } from '../../models/product.model';
import { ProductApiService } from '../../services/product-api.service';
import { ProductFormPageComponent } from './product-form-page.component';

describe('ProductFormPageComponent', () => {
  let fixture: ComponentFixture<ProductFormPageComponent>;
  let component: ProductFormPageComponent;
  let router: Router;
  let routeProductId: string | null;
  let productApiServiceMock: {
    createProduct: jest.Mock;
    getProducts: jest.Mock;
    updateProduct: jest.Mock;
    verifyProductId: jest.Mock;
  };

  const validCreatePayload = {
    id: 'prd-001',
    name: 'Producto Demo',
    description: 'Descripcion valida para el producto.',
    logo: 'https://example.com/logo.png',
    date_release: '2099-04-30',
    date_revision: '2100-04-30'
  };

  const validUpdatePayload = {
    name: 'Producto Demo',
    description: 'Descripcion valida para el producto.',
    logo: 'https://example.com/logo.png',
    date_release: '2099-04-30',
    date_revision: '2100-04-30'
  };

  const products: Product[] = [
    {
      id: 'prd-001',
      name: 'Producto Demo',
      description: 'Descripcion valida para el producto.',
      logo: 'https://example.com/logo.png',
      date_release: '2099-04-30',
      date_revision: '2100-04-30'
    }
  ];

  beforeEach(async () => {
    routeProductId = null;
    productApiServiceMock = {
      createProduct: jest.fn(),
      getProducts: jest.fn(),
      updateProduct: jest.fn(),
      verifyProductId: jest.fn().mockReturnValue(of(false))
    };

    await TestBed.configureTestingModule({
      imports: [ProductFormPageComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? routeProductId : null)
              }
            }
          }
        },
        { provide: ProductApiService, useValue: productApiServiceMock }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(ProductFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should call createProduct with a valid payload and navigate to /products on success', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);
    productApiServiceMock.createProduct.mockReturnValue(
      of({ message: 'Product added successfully', data: validCreatePayload })
    );

    createComponent();
    component['handleSubmit'](validCreatePayload);

    expect(productApiServiceMock.createProduct).toHaveBeenCalledWith(validCreatePayload);
    expect(navigateSpy).toHaveBeenCalledWith(['/products'], {
      state: { feedbackMessage: 'Producto agregado correctamente.' }
    });
  });

  it('should render the brand header on the create product page', () => {
    createComponent();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('BANCO');
    expect(compiled.querySelector('app-brand-header')).not.toBeNull();
  });

  it('should keep the submitting state while the create request is in progress', () => {
    productApiServiceMock.createProduct.mockReturnValue(NEVER);

    createComponent();
    component['handleSubmit'](validCreatePayload);

    expect(component['isSubmitting']()).toBe(true);
  });

  it('should avoid a double submit while creating if a request is already in progress', () => {
    productApiServiceMock.createProduct.mockReturnValue(NEVER);

    createComponent();
    component['handleSubmit'](validCreatePayload);
    component['handleSubmit'](validCreatePayload);

    expect(productApiServiceMock.createProduct).toHaveBeenCalledTimes(1);
  });

  it('should show a visual error state when creation fails', () => {
    productApiServiceMock.createProduct.mockReturnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            statusText: 'Bad Request'
          })
      )
    );

    createComponent();
    component['handleSubmit'](validCreatePayload);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'No fue posible crear el producto porque la informacion enviada es invalida.'
    );
    expect(component['isSubmitting']()).toBe(false);
  });

  it('should load products through getProducts and prefill the form in edit mode', () => {
    routeProductId = 'prd-001';
    productApiServiceMock.getProducts.mockReturnValue(of({ data: products }));

    createComponent();

    expect(productApiServiceMock.getProducts).toHaveBeenCalled();
    expect(component['product']()).toEqual(products[0]);
    expect(component['mode']()).toBe('edit');
  });

  it('should render the brand header on the edit product page', () => {
    routeProductId = 'prd-001';
    productApiServiceMock.getProducts.mockReturnValue(of({ data: products }));

    createComponent();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('BANCO');
    expect(compiled.querySelector('app-brand-header')).not.toBeNull();
  });

  it('should show an error when the product to edit is not found', () => {
    routeProductId = 'prd-001';
    productApiServiceMock.getProducts.mockReturnValue(of({ data: [] }));

    createComponent();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'No se encontró el producto que querés editar.'
    );
  });

  it('should call updateProduct with id in the URL and payload without id', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);
    routeProductId = 'prd-001';
    productApiServiceMock.getProducts.mockReturnValue(of({ data: products }));
    productApiServiceMock.updateProduct.mockReturnValue(
      of({ message: 'Product updated successfully', data: validUpdatePayload })
    );

    createComponent();
    component['handleSubmit'](validUpdatePayload);

    expect(productApiServiceMock.updateProduct).toHaveBeenCalledWith('prd-001', validUpdatePayload);
    expect(navigateSpy).toHaveBeenCalledWith(['/products'], {
      state: { feedbackMessage: 'Producto actualizado correctamente.' }
    });
  });

  it('should show a visual error state when updating fails', () => {
    routeProductId = 'prd-001';
    productApiServiceMock.getProducts.mockReturnValue(of({ data: products }));
    productApiServiceMock.updateProduct.mockReturnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 404,
            statusText: 'Not Found'
          })
      )
    );

    createComponent();
    component['handleSubmit'](validUpdatePayload);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'No se encontro un producto con el identificador indicado.'
    );
    expect(component['isSubmitting']()).toBe(false);
  });
});
