import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-list-page',
  imports: [RouterLink],
  templateUrl: './products-list-page.component.html',
  styleUrl: './products-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListPageComponent {}
