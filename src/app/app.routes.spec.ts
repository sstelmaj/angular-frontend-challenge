import { routes } from './app.routes';
import { ProductFormPageComponent } from './features/products/pages/product-form-page/product-form-page.component';
import { ProductsListPageComponent } from './features/products/pages/products-list-page/products-list-page.component';

describe('app.routes', () => {
  it('should redirect the empty path to /products', () => {
    expect(routes[0]).toEqual({
      path: '',
      pathMatch: 'full',
      redirectTo: 'products'
    });
  });

  it('should expose the products list and form routes', () => {
    expect(routes).toContainEqual({
      path: 'products',
      component: ProductsListPageComponent
    });
    expect(routes).toContainEqual({
      path: 'products/new',
      component: ProductFormPageComponent
    });
    expect(routes).toContainEqual({
      path: 'products/:id/edit',
      component: ProductFormPageComponent
    });
  });

  it('should redirect unknown routes to /products', () => {
    expect(routes[routes.length - 1]).toEqual({
      path: '**',
      redirectTo: 'products'
    });
  });
});
