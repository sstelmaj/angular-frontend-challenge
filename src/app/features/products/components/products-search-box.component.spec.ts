import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSearchBoxComponent } from './products-search-box.component';

describe('ProductsSearchBoxComponent', () => {
  let fixture: ComponentFixture<ProductsSearchBoxComponent>;
  let component: ProductsSearchBoxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsSearchBoxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit the typed search value', () => {
    const emitSpy = jest.spyOn(component.valueChange, 'emit');

    component['onInput']({
      target: { value: 'ahorro' }
    } as unknown as Event);

    expect(emitSpy).toHaveBeenCalledWith('ahorro');
  });
});
