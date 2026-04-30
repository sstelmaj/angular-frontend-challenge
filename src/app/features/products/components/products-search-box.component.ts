import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-products-search-box',
  templateUrl: './products-search-box.component.html',
  styleUrl: './products-search-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsSearchBoxComponent {
  @Input() value = '';
  @Output() readonly valueChange = new EventEmitter<string>();

  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }
}
