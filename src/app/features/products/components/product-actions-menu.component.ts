import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-product-actions-menu',
  templateUrl: './product-actions-menu.component.html',
  styleUrl: './product-actions-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductActionsMenuComponent {
  @Input() productName = 'producto';
  @Output() readonly editSelected = new EventEmitter<void>();

  protected readonly isOpen = signal(false);

  protected toggleMenu(): void {
    this.isOpen.update((value) => !value);
  }

  protected handleEdit(): void {
    this.editSelected.emit();
    this.isOpen.set(false);
  }
}
