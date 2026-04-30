import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmModalComponent {
  @Input() title = 'Confirmar acción';
  @Input() message = '';
  @Input() confirmLabel = 'Confirmar';
  @Input() cancelLabel = 'Cancelar';
  @Input() isLoading = false;
  @Input() errorMessage: string | null = null;

  @Output() readonly cancel = new EventEmitter<void>();
  @Output() readonly confirm = new EventEmitter<void>();

  protected handleCancel(): void {
    if (this.isLoading) {
      return;
    }

    this.cancel.emit();
  }

  protected handleConfirm(): void {
    if (this.isLoading) {
      return;
    }

    this.confirm.emit();
  }
}
