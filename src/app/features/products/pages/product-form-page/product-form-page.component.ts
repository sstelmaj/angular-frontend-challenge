import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { getHttpErrorMessage } from '../../../../shared/utils/http-error.utils';
import { ProductFormComponent, ProductFormSubmitPayload } from '../../components/product-form.component';
import { Product } from '../../models/product.model';
import { CreateProductPayload, UpdateProductPayload } from '../../models/product.payloads';
import { ProductApiService } from '../../services/product-api.service';

@Component({
  selector: 'app-product-form-page',
  imports: [RouterLink, ProductFormComponent],
  templateUrl: './product-form-page.component.html',
  styleUrl: './product-form-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormPageComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productApiService = inject(ProductApiService);

  protected readonly productId = this.route.snapshot.paramMap.get('id');
  protected readonly mode = computed<'create' | 'edit'>(() =>
    this.productId ? 'edit' : 'create'
  );
  protected readonly product = signal<Product | null>(null);
  protected readonly isLoadingProduct = signal(false);
  protected readonly loadError = signal<string | null>(null);
  protected readonly isSubmitting = signal(false);
  protected readonly submitError = signal<string | null>(null);

  ngOnInit(): void {
    if (this.mode() === 'edit') {
      this.loadProductForEdit();
    }
  }

  protected handleSubmit(payload: ProductFormSubmitPayload): void {
    if (this.mode() === 'edit') {
      this.handleUpdateProduct(payload as UpdateProductPayload);
      return;
    }

    this.handleCreateProduct(payload as CreateProductPayload);
  }

  protected retryLoadProduct(): void {
    this.loadProductForEdit();
  }

  protected clearSubmitError(): void {
    this.submitError.set(null);
  }

  private handleCreateProduct(payload: CreateProductPayload): void {
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

  private handleUpdateProduct(payload: UpdateProductPayload): void {
    if (this.mode() !== 'edit' || !this.productId || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    this.productApiService
      .updateProduct(this.productId, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          void this.router.navigate(['/products'], {
            state: { feedbackMessage: 'Producto actualizado correctamente.' }
          });
        },
        error: (error: unknown) => {
          this.isSubmitting.set(false);
          this.submitError.set(getHttpErrorMessage(error, 'updateProduct'));
        }
      });
  }

  private loadProductForEdit(): void {
    if (!this.productId) {
      return;
    }

    this.isLoadingProduct.set(true);
    this.loadError.set(null);
    this.submitError.set(null);
    this.product.set(null);

    this.productApiService
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const currentProduct = response.data.find((product) => product.id === this.productId) ?? null;

          if (!currentProduct) {
            this.loadError.set('No se encontró el producto que querés editar.');
            this.isLoadingProduct.set(false);
            return;
          }

          this.product.set(currentProduct);
          this.isLoadingProduct.set(false);
        },
        error: (error: unknown) => {
          this.loadError.set(getHttpErrorMessage(error, 'loadProducts'));
          this.isLoadingProduct.set(false);
        }
      });
  }
}
