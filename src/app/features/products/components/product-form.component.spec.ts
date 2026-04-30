import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { of } from 'rxjs';

import { Product } from '../models/product.model';
import { ProductApiService } from '../services/product-api.service';
import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let fixture: ComponentFixture<ProductFormComponent>;
  let component: ProductFormComponent;
  let productApiServiceMock: {
    verifyProductId: jest.Mock;
  };

  const editingProduct: Product = {
    id: 'prd-001',
    name: 'Producto Demo',
    description: 'Descripcion valida para el producto.',
    logo: 'https://example.com/logo.png',
    date_release: '2099-04-30',
    date_revision: '2100-04-30'
  };

  beforeEach(async () => {
    productApiServiceMock = {
      verifyProductId: jest.fn().mockReturnValue(of(false))
    };

    await TestBed.configureTestingModule({
      imports: [ProductFormComponent],
      providers: [{ provide: ProductApiService, useValue: productApiServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start with an invalid form', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('should show required field errors when the user touches the form without values', () => {
    component.form.markAllAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('El ID es obligatorio.');
    expect(compiled.textContent).toContain('El nombre es obligatorio.');
    expect(compiled.textContent).toContain('El logo es obligatorio.');
  });

  it('should validate min and max rules for id, name and description', async () => {
    component.form.controls.id.setValue('ab');
    component.form.controls.name.setValue('abc');
    component.form.controls.description.setValue('corta');
    component.form.controls.id.markAsTouched();
    component.form.controls.name.markAsTouched();
    component.form.controls.description.markAsTouched();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('El ID debe tener al menos 3 caracteres.');
    expect(compiled.textContent).toContain('El nombre debe tener al menos 5 caracteres.');
    expect(compiled.textContent).toContain('La descripción debe tener al menos 10 caracteres.');
  });

  it('should recalculate date_revision when date_release changes', () => {
    component.form.controls.date_release.setValue('2099-04-30');
    fixture.detectChanges();

    expect(component.form.controls.date_revision.value).toBe('2100-04-30');
  });

  it('should not emit submit when the form is invalid', () => {
    const submittedSpy = jest.fn();
    component.submitted.subscribe(submittedSpy);

    component.submitForm();

    expect(submittedSpy).not.toHaveBeenCalled();
  });

  it('should emit a create payload with id on submit in create mode', async () => {
    const submittedSpy = jest.fn();
    component.submitted.subscribe(submittedSpy);

    component.form.controls.id.setValue('prd-001');
    component.form.controls.name.setValue('Producto Demo');
    component.form.controls.description.setValue('Descripcion valida para el producto.');
    component.form.controls.logo.setValue('https://example.com/logo.png');
    component.form.controls.date_release.setValue('2099-04-30');
    await fixture.whenStable();

    component.submitForm();

    expect(submittedSpy).toHaveBeenCalledWith({
      id: 'prd-001',
      name: 'Producto Demo',
      description: 'Descripcion valida para el producto.',
      logo: 'https://example.com/logo.png',
      date_release: '2099-04-30',
      date_revision: '2100-04-30'
    });
  });

  it('should reset the form to its initial state when reiniciar is triggered in create mode', async () => {
    component.form.controls.id.setValue('prd-001');
    component.form.controls.name.setValue('Producto Demo');
    component.form.controls.description.setValue('Descripcion valida para el producto.');
    component.form.controls.logo.setValue('https://example.com/logo.png');
    component.form.controls.date_release.setValue('2099-04-30');
    await fixture.whenStable();

    component.resetForm();

    expect(component.form.getRawValue()).toEqual({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: ''
    });
  });

  it('should show a technical verification error message for the id control', () => {
    component.form.controls.id.setValue('prd-999');
    component.form.controls.id.markAsTouched();
    component.form.controls.id.setErrors({ productIdVerificationFailed: true });
    fixture.detectChanges();

    expect(component.form.controls.id.hasError('productIdVerificationFailed')).toBe(true);
    expect(component.getControlErrorMessage('id')).toBe(
      'No fue posible verificar el ID en este momento.'
    );
  });

  it('should keep date_revision readonly in the template', () => {
    const dateRevisionInput = fixture.nativeElement.querySelector(
      '#product-date-revision'
    ) as HTMLInputElement;

    expect(dateRevisionInput.readOnly).toBe(true);
  });

  it('should switch the primary button text according to the mode', () => {
    expect(component.getPrimaryActionLabel()).toBe('Agregar');

    component.mode = 'edit';
    component.ngOnChanges({
      mode: new SimpleChange('create', 'edit', false)
    });

    expect(component.getPrimaryActionLabel()).toBe('Guardar');
  });

  it('should disable id and remove async id validation in edit mode', () => {
    component.mode = 'edit';
    component.product = editingProduct;
    component.ngOnChanges({
      mode: new SimpleChange('create', 'edit', false),
      product: new SimpleChange(null, editingProduct, false)
    });

    expect(component.form.controls.id.disabled).toBe(true);
    expect(component.form.controls.id.asyncValidator).toBeNull();
    expect(productApiServiceMock.verifyProductId).not.toHaveBeenCalled();
  });

  it('should emit an update payload without id in edit mode', () => {
    const submittedSpy = jest.fn();
    component.submitted.subscribe(submittedSpy);
    component.mode = 'edit';
    component.product = editingProduct;
    component.ngOnChanges({
      mode: new SimpleChange('create', 'edit', false),
      product: new SimpleChange(null, editingProduct, false)
    });
    fixture.detectChanges();

    component.submitForm();

    expect(submittedSpy).toHaveBeenCalledWith({
      name: 'Producto Demo',
      description: 'Descripcion valida para el producto.',
      logo: 'https://example.com/logo.png',
      date_release: '2099-04-30',
      date_revision: '2100-04-30'
    });
  });
});
