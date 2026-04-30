import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-actions-menu',
  imports: [NgStyle],
  templateUrl: './product-actions-menu.component.html',
  styleUrl: './product-actions-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductActionsMenuComponent {
  @Input() productName = 'producto';
  @Input() isOpen = false;
  @Input() dropdownStyle: Record<string, string> | null = null;
  @Output() readonly toggleRequested = new EventEmitter<Event>();
  @Output() readonly editSelected = new EventEmitter<void>();
  @Output() readonly deleteSelected = new EventEmitter<void>();

  protected requestToggle(event: Event): void {
    this.toggleRequested.emit(event);
  }

  protected handleEdit(): void {
    this.editSelected.emit();
  }

  protected handleDelete(): void {
    this.deleteSelected.emit();
  }
}
