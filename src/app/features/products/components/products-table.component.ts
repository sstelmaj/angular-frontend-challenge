import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';

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
  @Output() readonly deleteRequested = new EventEmitter<Product>();
  protected readonly openMenuProductId = signal<string | null>(null);
  protected readonly openMenuStyle = signal<Record<string, string> | null>(null);
  protected readonly failedLogoProductIds = signal<Record<string, true>>({});

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

  protected shouldShowLogoImage(product: Product): boolean {
    return this.isUsableLogo(product.logo) && !this.failedLogoProductIds()[product.id];
  }

  protected handleLogoError(productId: string): void {
    this.failedLogoProductIds.update((currentState) => ({
      ...currentState,
      [productId]: true
    }));
  }

  protected isMenuOpen(productId: string): boolean {
    return this.openMenuProductId() === productId;
  }

  protected toggleMenu(productId: string, event: Event): void {
    event.stopPropagation();

    if (this.openMenuProductId() === productId) {
      this.closeMenu();
      return;
    }

    const trigger = event.currentTarget as HTMLElement;
    this.openMenuStyle.set(this.buildDropdownStyle(trigger));
    this.openMenuProductId.set(productId);
  }

  protected requestEdit(productId: string): void {
    this.closeMenu();
    this.editRequested.emit(productId);
  }

  protected requestDelete(product: Product): void {
    this.closeMenu();
    this.deleteRequested.emit(product);
  }

  @HostListener('document:click', ['$event'])
  protected handleDocumentClick(event: MouseEvent): void {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.closest('.actions-menu')) {
      return;
    }

    this.closeMenu();
  }

  @HostListener('document:keydown.escape')
  protected handleEscapeKey(): void {
    this.closeMenu();
  }

  private closeMenu(): void {
    this.openMenuProductId.set(null);
    this.openMenuStyle.set(null);
  }

  private buildDropdownStyle(trigger: HTMLElement): Record<string, string> {
    const rect = trigger.getBoundingClientRect();
    const estimatedMenuHeight = 108;
    const offset = 8;
    const menuWidth = 164;
    const shouldOpenAbove = window.innerHeight - rect.bottom < estimatedMenuHeight;

    return {
      position: 'fixed',
      top: shouldOpenAbove ? `${Math.max(16, rect.top - estimatedMenuHeight - offset)}px` : `${rect.bottom + offset}px`,
      left: `${Math.max(16, rect.right - menuWidth)}px`,
      width: `${menuWidth}px`
    };
  }

  private isUsableLogo(value: unknown): value is string {
    return typeof value === 'string' && value.trim().length > 0;
  }
}
