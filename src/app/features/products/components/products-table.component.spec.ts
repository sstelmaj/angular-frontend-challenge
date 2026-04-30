import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Product } from '../models/product.model';
import { ProductsTableComponent } from './products-table.component';

describe('ProductsTableComponent', () => {
  let fixture: ComponentFixture<ProductsTableComponent>;
  let component: ProductsTableComponent;

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
    await TestBed.configureTestingModule({
      imports: [ProductsTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    component.products = products;
    fixture.detectChanges();
  });

  it('should render one row per product', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });

  it('should render product data in the table', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Tarjetas de Credito');
    expect(compiled.textContent).toContain('Cuenta de Ahorro');
    expect(compiled.textContent).toContain('01/01/2025');
    expect(compiled.textContent).toContain('01/02/2026');
  });

  it('should render one actions menu per product', () => {
    const actionButtons = fixture.nativeElement.querySelectorAll('.actions-menu__trigger');
    expect(actionButtons.length).toBe(2);
  });

  it('should emit editRequested when selecting Editar for a product', () => {
    const emitSpy = jest.spyOn(component.editRequested, 'emit');
    const actionButtons = fixture.nativeElement.querySelectorAll(
      '.actions-menu__trigger'
    ) as NodeListOf<HTMLButtonElement>;

    actionButtons[0].click();
    fixture.detectChanges();

    const editButton = fixture.nativeElement.querySelector('.actions-menu__item') as HTMLButtonElement;
    editButton.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith('trj-crd');
  });
});
