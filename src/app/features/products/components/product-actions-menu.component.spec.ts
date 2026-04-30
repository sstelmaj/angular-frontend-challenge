import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductActionsMenuComponent } from './product-actions-menu.component';

describe('ProductActionsMenuComponent', () => {
  let fixture: ComponentFixture<ProductActionsMenuComponent>;
  let component: ProductActionsMenuComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductActionsMenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductActionsMenuComponent);
    component = fixture.componentInstance;
    component.productName = 'Producto Demo';
    fixture.detectChanges();
  });

  it('should render an accessible trigger button', () => {
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(trigger.getAttribute('aria-label')).toBe('Abrir acciones de Producto Demo');
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('should emit toggleRequested when clicking the trigger', () => {
    const emitSpy = jest.spyOn(component.toggleRequested, 'emit');
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    trigger.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should render menu actions when it is open', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('dropdownStyle', {
      top: '12px',
      left: '12px',
      position: 'fixed',
      width: '164px'
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Editar');
    expect(fixture.nativeElement.textContent).toContain('Eliminar');
  });

  it('should emit editSelected when choosing Editar', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('dropdownStyle', {
      top: '12px',
      left: '12px',
      position: 'fixed',
      width: '164px'
    });
    fixture.detectChanges();
    const emitSpy = jest.spyOn(component.editSelected, 'emit');

    const editButton = fixture.nativeElement.querySelector('.actions-menu__item') as HTMLButtonElement;
    editButton.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit deleteSelected and keep the destructive class for Eliminar', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('dropdownStyle', {
      top: '12px',
      left: '12px',
      position: 'fixed',
      width: '164px'
    });
    fixture.detectChanges();
    const emitSpy = jest.spyOn(component.deleteSelected, 'emit');

    const deleteButton = fixture.nativeElement.querySelector(
      '.actions-menu__item--danger'
    ) as HTMLButtonElement;

    expect(deleteButton.textContent).toContain('Eliminar');

    deleteButton.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });
});
