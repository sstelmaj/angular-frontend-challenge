import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { getHttpErrorMessage } from '../../../../shared/utils/http-error.utils';
import { ProductFormComponent } from '../../components/product-form.component';
import { CreateProductPayload } from '../../models/product.payloads';
import { ProductApiService } from '../../services/product-api.service';

@Component({
  selector: 'app-product-form-page',
  imports: [RouterLink, ProductFormComponent],
  templateUrl: './product-form-page.component.html',
  styleUrl: './product-form-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormPageComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productApiService = inject(ProductApiService);

  protected readonly productId = this.route.snapshot.paramMap.get('id');
  protected readonly mode = computed<'create' | 'edit'>(() =>
    this.productId ? 'edit' : 'create'
  );
  protected readonly isSubmitting = signal(false);
  protected readonly submitError = signal<string | null>(null);

  protected handleCreateProduct(payload: CreateProductPayload): void {
    if (this.mode() !== 'create' || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    this.productApiService
      .createProduct(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          void this.router.navigate(['/products'], {
            state: { feedbackMessage: 'Producto agregado correctamente.' }
          });
        },
        error: (error: unknown) => {
          this.isSubmitting.set(false);
          this.submitError.set(getHttpErrorMessage(error, 'createProduct'));
        }
      });
  }

  protected clearSubmitError(): void {
    this.submitError.set(null);
  }
}
