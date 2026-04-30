import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-form-page',
  imports: [RouterLink],
  templateUrl: './product-form-page.component.html',
  styleUrl: './product-form-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormPageComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly productId = this.route.snapshot.paramMap.get('id');
  protected readonly mode = this.productId ? 'edit' : 'create';
}
