import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let fixture: ComponentFixture<ConfirmModalComponent>;
  let component: ConfirmModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    component.title = 'Eliminar producto';
    component.message = '¿Está seguro de eliminar el producto Demo?';
    component.confirmLabel = 'Eliminar';
    fixture.detectChanges();
  });

  it('should render the message and basic accessibility attributes', () => {
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;

    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(fixture.nativeElement.textContent).toContain('¿Está seguro de eliminar el producto Demo?');
  });

  it('should emit cancel when clicking Cancelar', () => {
    const cancelSpy = jest.spyOn(component.cancel, 'emit');
    const cancelButton = fixture.nativeElement.querySelector('.secondary-button') as HTMLButtonElement;

    cancelButton.click();

    expect(cancelSpy).toHaveBeenCalled();
  });

  it('should emit confirm when clicking Eliminar', () => {
    const confirmSpy = jest.spyOn(component.confirm, 'emit');
    const confirmButton = fixture.nativeElement.querySelector('.danger-button') as HTMLButtonElement;

    confirmButton.click();

    expect(confirmSpy).toHaveBeenCalled();
  });

  it('should disable confirmation while loading', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const confirmSpy = jest.spyOn(component.confirm, 'emit');
    const confirmButton = fixture.nativeElement.querySelector('.danger-button') as HTMLButtonElement;

    confirmButton.click();

    expect(confirmSpy).not.toHaveBeenCalled();
  });
});
