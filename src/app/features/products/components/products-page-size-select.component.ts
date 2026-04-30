import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { PageSizeOption, PAGE_SIZE_OPTIONS } from '../pages/products-list-page/products-list-page.utils';

@Component({
  selector: 'app-products-page-size-select',
  templateUrl: './products-page-size-select.component.html',
  styleUrl: './products-page-size-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPageSizeSelectComponent {
  @Input() value: PageSizeOption = 5;
  @Input() options: readonly PageSizeOption[] = PAGE_SIZE_OPTIONS;
  @Output() readonly valueChange = new EventEmitter<PageSizeOption>();

  protected onChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.valueChange.emit(Number(select.value) as PageSizeOption);
  }
}
