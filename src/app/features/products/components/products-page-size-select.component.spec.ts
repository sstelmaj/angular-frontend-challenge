import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPageSizeSelectComponent } from './products-page-size-select.component';

describe('ProductsPageSizeSelectComponent', () => {
  let fixture: ComponentFixture<ProductsPageSizeSelectComponent>;
  let component: ProductsPageSizeSelectComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPageSizeSelectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsPageSizeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit the selected page size', () => {
    const emitSpy = jest.spyOn(component.valueChange, 'emit');

    component['onChange']({
      target: { value: '20' }
    } as unknown as Event);

    expect(emitSpy).toHaveBeenCalledWith(20);
  });
});
