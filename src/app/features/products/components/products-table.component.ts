import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../models/product.model';
import { ProductActionsMenuComponent } from './product-actions-menu.component';

@Component({
  selector: 'app-products-table',
  imports: [ProductActionsMenuComponent],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsTableComponent {
  @Input({ required: true }) products: readonly Product[] = [];
  @Output() readonly editRequested = new EventEmitter<string>();

  protected trackById(index: number, product: Product): string {
    return product.id;
  }

  protected getInitials(productName: string): string {
    return productName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((chunk) => chunk[0]?.toUpperCase() ?? '')
      .join('');
  }

  protected formatDisplayDate(value: string): string {
    const [year, month, day] = value.split('-');

    if (!year || !month || !day) {
      return value;
    }

    return `${day}/${month}/${year}`;
  }

  protected hideBrokenImage(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.style.display = 'none';
  }

  protected requestEdit(productId: string): void {
    this.editRequested.emit(productId);
  }
}
