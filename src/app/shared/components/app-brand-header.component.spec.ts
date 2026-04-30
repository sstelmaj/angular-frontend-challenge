import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBrandHeaderComponent } from './app-brand-header.component';

describe('AppBrandHeaderComponent', () => {
  let fixture: ComponentFixture<AppBrandHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppBrandHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppBrandHeaderComponent);
    fixture.detectChanges();
  });

  it('should render the icon and BANCO text', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('BANCO');
    expect(compiled.querySelector('svg')).not.toBeNull();
  });
});
