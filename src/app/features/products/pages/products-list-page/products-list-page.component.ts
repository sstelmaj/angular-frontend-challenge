import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';

import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal.component';
import { getHttpErrorMessage } from '../../../../shared/utils/http-error.utils';
import { ProductsPageSizeSelectComponent } from '../../components/products-page-size-select.component';
import { ProductsSearchBoxComponent } from '../../components/products-search-box.component';
import { ProductsTableComponent } from '../../components/products-table.component';
import { Product } from '../../models/product.model';
import { ProductApiService } from '../../services/product-api.service';
import {
  filterProducts,
  getVisibleProducts,
  normalizeSearchTerm,
  PAGE_SIZE_OPTIONS,
  PageSizeOption
} from './products-list-page.utils';

@Component({
  selector: 'app-products-list-page',
  imports: [
    RouterLink,
    ConfirmModalComponent,
    ProductsSearchBoxComponent,
    ProductsPageSizeSelectComponent,
    ProductsTableComponent
  ],
  templateUrl: './products-list-page.component.html',
  styleUrl: './products-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListPageComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly productApiService = inject(ProductApiService);

  protected readonly pageSizeOptions = PAGE_SIZE_OPTIONS;
  protected readonly products = signal<Product[]>([]);
  protected readonly searchTerm = signal('');
  protected readonly pageSize = signal<PageSizeOption>(5);
  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly feedbackMessage = signal<string | null>(null);
  protected readonly productPendingDeletion = signal<Product | null>(null);
  protected readonly deleteErrorMessage = signal<string | null>(null);
  protected readonly isDeleting = signal(false);

  protected readonly filteredProducts = computed(() =>
    filterProducts(this.products(), this.searchTerm())
  );
  protected readonly visibleProducts = computed(() =>
    getVisibleProducts(this.filteredProducts(), this.pageSize())
  );
  protected readonly visibleResultsCount = computed(() => this.visibleProducts().length);
  protected readonly totalFilteredResultsCount = computed(() => this.filteredProducts().length);
  protected readonly resultSummary = computed(
    () => `${this.visibleResultsCount()} de ${this.totalFilteredResultsCount()} resultados`
  );
  protected readonly hasSearchTerm = computed(
    () => normalizeSearchTerm(this.searchTerm()).length > 0
  );
  protected readonly isDeleteModalOpen = computed(() => this.productPendingDeletion() !== null);
  protected readonly deleteModalMessage = computed(() => {
    const product = this.productPendingDeletion();
    return product ? `¿Está seguro de eliminar el producto ${product.name}?` : '';
  });

  ngOnInit(): void {
    this.feedbackMessage.set(this.getFeedbackMessage());
    this.loadProducts();
  }

  protected updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  protected updatePageSize(value: PageSizeOption): void {
    this.pageSize.set(value);
  }

  protected navigateToEdit(productId: string): void {
    void this.router.navigate(['/products', productId, 'edit']);
  }

  protected openDeleteModal(product: Product): void {
    this.productPendingDeletion.set(product);
    this.deleteErrorMessage.set(null);
  }

  protected closeDeleteModal(): void {
    if (this.isDeleting()) {
      return;
    }

    this.productPendingDeletion.set(null);
    this.deleteErrorMessage.set(null);
  }

  protected confirmDeleteProduct(): void {
    const product = this.productPendingDeletion();

    if (!product || this.isDeleting()) {
      return;
    }

    this.isDeleting.set(true);
    this.deleteErrorMessage.set(null);

    this.productApiService
      .deleteProduct(product.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.products.update((products) => products.filter((current) => current.id !== product.id));
          this.productPendingDeletion.set(null);
          this.deleteErrorMessage.set(null);
          this.isDeleting.set(false);
          this.feedbackMessage.set('Producto eliminado correctamente.');
        },
        error: (error: unknown) => {
          this.deleteErrorMessage.set(getHttpErrorMessage(error, 'deleteProduct'));
          this.isDeleting.set(false);
        }
      });
  }

  protected loadProducts(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.productApiService
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.products.set(response.data);
          this.isLoading.set(false);
        },
        error: (error: unknown) => {
          this.products.set([]);
          this.errorMessage.set(getHttpErrorMessage(error, 'loadProducts'));
          this.isLoading.set(false);
        }
      });
  }

  protected dismissFeedbackMessage(): void {
    this.feedbackMessage.set(null);
  }

  private getFeedbackMessage(): string | null {
    const currentNavigationMessage = this.router.getCurrentNavigation()?.extras.state?.[
      'feedbackMessage'
    ];
    const historyStateMessage = history.state?.['feedbackMessage'];
    const feedbackMessage = currentNavigationMessage ?? historyStateMessage;

    return typeof feedbackMessage === 'string' ? feedbackMessage : null;
  }
}
