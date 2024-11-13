import { inject, Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Product } from '../product';
import { ProductService } from './product-service';
import { SubcategoryService } from './subcategory-service';
import { ShopService } from './shop-service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShowingProductsService {
  products: Product[] = [];
  productService = inject(ProductService)
  subcategoryService = inject(SubcategoryService);
  shopService = inject(ShopService);
  activeRoute = inject(ActivatedRoute);
  loading: Boolean = false;

  getAllProducts(): Observable<Product[]> {
    this.loading = true;
    return this.productService.getAllProducts().pipe(
      tap((products: Product[]) => {
        this.products = products;
        this.loading = false;
      })
    );
  }

  givenSubcategory(subcategory: string): Observable<Product[]> {
    this.loading = true;
    return this.subcategoryService.getProductsBySubcategory(subcategory).pipe(
      tap((subcategoryProducts: Product[]) => {
        if (subcategoryProducts) {
          const appearences = new Set<string>();
          const newProducts: Product[] = [];

          for (const product of this.products) {
            appearences.add(product.name);
          }

          for (const product of subcategoryProducts) {
            if (appearences.has(product.name)) newProducts.push(product);
          }

          this.products = newProducts;
          this.loading = false;
        } else {
          this.products = [];
          this.loading = false;
        }
      })
    );
  }

  givenStore(store: string): Observable<Product[]> {
    this.loading = true;
    return this.shopService.getProductsInAShop(store).pipe(
      tap((storeProducts: Product[]) => {
        if (storeProducts) {
          const appearences = new Set<string>();
          const newProducts: Product[] = [];

          for (const product of this.products) {
            appearences.add(product.name);
          }

          for (const product of storeProducts) {
            if (appearences.has(product.name)) newProducts.push(product);
          }

          this.products = newProducts;
          this.loading = false;
        } else {
          this.products = [];
          this.loading = false;
        }
      })
    );
  }

  loadProducts(store: string | null, subcategory: string | null) {
    this.getAllProducts().pipe(
      switchMap(() => {
        const observables: Observable<Product[]>[] = [];
        if (store) {
          observables.push(this.givenStore(store));
        }
        if (subcategory) {
          observables.push(this.givenSubcategory(subcategory));
        }
        return forkJoin(observables);
      })
    ).subscribe();
  }
}
