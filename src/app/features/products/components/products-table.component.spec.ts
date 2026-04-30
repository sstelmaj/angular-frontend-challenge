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

  afterEach(() => {
    jest.restoreAllMocks();
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

  it('should render the product logo image when the logo value is available', () => {
    const logoImage = fixture.nativeElement.querySelector('.logo-badge img') as HTMLImageElement;

    expect(logoImage).not.toBeNull();
    expect(logoImage.getAttribute('src')).toBe('https://example.com/card.png');
  });

  it('should keep an accessible alt text for the product logo image', () => {
    const logoImage = fixture.nativeElement.querySelector('.logo-badge img') as HTMLImageElement;

    expect(logoImage.getAttribute('alt')).toBe('Logo de Tarjetas de Credito');
  });

  it('should show the initials fallback when the image fails to load', () => {
    const firstRow = fixture.nativeElement.querySelector('tbody tr') as HTMLTableRowElement;
    const logoImage = firstRow.querySelector('.logo-badge img') as HTMLImageElement;

    logoImage.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    const fallback = firstRow.querySelector('.logo-badge span') as HTMLSpanElement;

    expect(firstRow.querySelector('.logo-badge img')).toBeNull();
    expect(fallback.textContent?.trim()).toBe('TD');
  });

  it('should keep only one dropdown open at a time', () => {
    const actionButtons = fixture.nativeElement.querySelectorAll(
      '.actions-menu__trigger'
    ) as NodeListOf<HTMLButtonElement>;

    actionButtons[0].click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.actions-menu__dropdown')).toHaveLength(1);
    expect(actionButtons[0].getAttribute('aria-expanded')).toBe('true');

    actionButtons[1].click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.actions-menu__dropdown')).toHaveLength(1);
    expect(actionButtons[0].getAttribute('aria-expanded')).toBe('false');
    expect(actionButtons[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('should close the dropdown when clicking outside', () => {
    const actionButtons = fixture.nativeElement.querySelectorAll(
      '.actions-menu__trigger'
    ) as NodeListOf<HTMLButtonElement>;

    actionButtons[0].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.actions-menu__dropdown')).toHaveLength(1);

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.actions-menu__dropdown')).toHaveLength(0);
    expect(actionButtons[0].getAttribute('aria-expanded')).toBe('false');
  });

  it('should close the dropdown when pressing Escape', () => {
    const actionButtons = fixture.nativeElement.querySelectorAll(
      '.actions-menu__trigger'
    ) as NodeListOf<HTMLButtonElement>;

    actionButtons[0].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.actions-menu__dropdown')).toHaveLength(1);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.actions-menu__dropdown')).toHaveLength(0);
  });

  it('should emit editRequested and close the dropdown when selecting Editar', () => {
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
    expect(fixture.nativeElement.querySelectorAll('.actions-menu__dropdown')).toHaveLength(0);
  });

  it('should emit deleteRequested and close the dropdown when selecting Eliminar', () => {
    const emitSpy = jest.spyOn(component.deleteRequested, 'emit');
    const actionButtons = fixture.nativeElement.querySelectorAll(
      '.actions-menu__trigger'
    ) as NodeListOf<HTMLButtonElement>;

    actionButtons[0].click();
    fixture.detectChanges();

    const deleteButton = fixture.nativeElement.querySelector(
      '.actions-menu__item--danger'
    ) as HTMLButtonElement;
    deleteButton.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith(products[0]);
    expect(fixture.nativeElement.querySelectorAll('.actions-menu__dropdown')).toHaveLength(0);
  });
});
