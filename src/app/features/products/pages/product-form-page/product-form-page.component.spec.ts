import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { NEVER, of, throwError } from 'rxjs';

import { ProductApiService } from '../../services/product-api.service';
import { ProductFormPageComponent } from './product-form-page.component';

describe('ProductFormPageComponent', () => {
  let fixture: ComponentFixture<ProductFormPageComponent>;
  let component: ProductFormPageComponent;
  let router: Router;
  let productApiServiceMock: {
    createProduct: jest.Mock;
    verifyProductId: jest.Mock;
  };

  const validPayload = {
    id: 'prd-001',
    name: 'Producto Demo',
    description: 'Descripcion valida para el producto.',
    logo: 'https://example.com/logo.png',
    date_release: '2099-04-30',
    date_revision: '2100-04-30'
  };

  beforeEach(async () => {
    productApiServiceMock = {
      createProduct: jest.fn(),
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
                get: () => null
              }
            }
          }
        },
        { provide: ProductApiService, useValue: productApiServiceMock }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ProductFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call createProduct with a valid payload and navigate to /products on success', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);
    productApiServiceMock.createProduct.mockReturnValue(
      of({ message: 'Product added successfully', data: validPayload })
    );

    component['handleCreateProduct'](validPayload);

    expect(productApiServiceMock.createProduct).toHaveBeenCalledWith(validPayload);
    expect(navigateSpy).toHaveBeenCalledWith(['/products'], {
      state: { feedbackMessage: 'Producto agregado correctamente.' }
    });
  });

  it('should keep the submitting state while the request is in progress', () => {
    productApiServiceMock.createProduct.mockReturnValue(NEVER);

    component['handleCreateProduct'](validPayload);

    expect(component['isSubmitting']()).toBe(true);
  });

  it('should avoid a double submit while a request is already in progress', () => {
    productApiServiceMock.createProduct.mockReturnValue(NEVER);

    component['handleCreateProduct'](validPayload);
    component['handleCreateProduct'](validPayload);

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

    component['handleCreateProduct'](validPayload);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain(
      'No fue posible crear el producto porque la informacion enviada es invalida.'
    );
    expect(component['isSubmitting']()).toBe(false);
  });
});
