import { Routes } from '@angular/router';

import { ProductFormPageComponent } from './features/products/pages/product-form-page/product-form-page.component';
import { ProductsListPageComponent } from './features/products/pages/products-list-page/products-list-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    component: ProductsListPageComponent
  },
  {
    path: 'products/new',
    component: ProductFormPageComponent
  },
  {
    path: 'products/:id/edit',
    component: ProductFormPageComponent
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];
