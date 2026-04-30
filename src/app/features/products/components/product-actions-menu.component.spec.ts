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
  });

  it('should open and close the menu', () => {
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    trigger.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Editar');
    expect(fixture.nativeElement.textContent).toContain('Eliminar');

    trigger.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('Editar');
  });

  it('should emit edit and close the menu when selecting Editar', () => {
    const emitSpy = jest.spyOn(component.editSelected, 'emit');
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    trigger.click();
    fixture.detectChanges();

    const editButton = fixture.nativeElement.querySelector('.actions-menu__item') as HTMLButtonElement;
    editButton.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).not.toContain('Editar');
  });

  it('should emit delete and mark the action as destructive', () => {
    const emitSpy = jest.spyOn(component.deleteSelected, 'emit');
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    trigger.click();
    fixture.detectChanges();

    const deleteButton = fixture.nativeElement.querySelector(
      '.actions-menu__item--danger'
    ) as HTMLButtonElement;
    expect(deleteButton.textContent).toContain('Eliminar');

    deleteButton.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalled();
  });
});
