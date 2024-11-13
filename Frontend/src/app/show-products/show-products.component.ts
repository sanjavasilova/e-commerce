import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {RouterModule} from '@angular/router';
import {AddToCartService} from '../service/add-to-cart-service';
import {AmountService} from '../service/amount-service';
import {PaginationService} from '../service/paginator-service';
import {ShowingProductsService} from '../service/showing-products.service';
import {HeaderComponent} from '../header/header.component';
import {MatIcon} from "@angular/material/icon";
import {Product} from "../product";
import {WishListService} from "../service/wish-list-service";
import {LoginService} from "../service/login-service";
import {catchError, combineLatest, finalize, of, switchMap, tap} from "rxjs";
import {AuthService} from "../service/auth-service";

@Component({
  selector: 'app-show-products',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterModule,
    MatPaginator,
    HeaderComponent,
    MatIcon
  ],
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {
  addToCartService = inject(AddToCartService);
  amountService = inject(AmountService);
  showProductsService = inject(ShowingProductsService);
  paginatorService = inject(PaginationService);
  activeRoute = inject(ActivatedRoute);
  wishListService = inject(WishListService)
  loginService = inject(LoginService)
  router = inject(Router)
  authService = inject(AuthService)

  pageIndex: number = 0;
  pageSize: number = 10;
  shop: string | null = null;
  subcategory: string | null = null;
  wishListProducts: Product[] = []
  productIcons: Map<number, string> = new Map();

  ngOnInit() {
    this.loginService.loggedIn$.pipe(
      switchMap(loggedIn => {
        return this.authService.username$.pipe(
          switchMap(username => {
            const wishListObservable = username
              ? this.wishListService.getWishListProducts()
              : of([]);

            return combineLatest([
              this.activeRoute.paramMap,
              wishListObservable
            ]).pipe(
              switchMap(([params, wishListProducts]) => {
                this.wishListProducts = wishListProducts;
                this.shop = params.get('shop');
                this.subcategory = params.get('subcategory');

                return this.showProductsService.getAllProducts().pipe(
                  tap(products => {
                    products.forEach(product => this.onInit(product));

                    if (this.shop) {
                      this.showProductsService.givenStore(this.shop).subscribe();
                    }

                    if (this.subcategory) {
                      this.showProductsService.givenSubcategory(this.subcategory).subscribe();
                    }
                  }),
                  finalize(() => {
                    this.addToCartService.cartItems.forEach(cartItem => this.amountService.ResetAmount(cartItem.name));
                  })
                );
              })
            );
          })
        );
      })
    ).subscribe();

    this.paginatorService.setPageIndex(0);
    this.paginatorService.pageIndex$.subscribe(index => this.pageIndex = index);
    this.paginatorService.pageSize$.subscribe(size => this.pageSize = size);
  }


  resetNumber(name: string) {
    this.amountService.ResetAmount(name);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    if (this.pageSize !== event.pageSize) {
      this.pageSize = event.pageSize;
      this.paginatorService.setPageSize(this.pageSize);
    }
    this.paginatorService.setPageIndex(this.pageIndex);
  }

  onInit(product: Product) {
    if (this.wishListProducts.some(p => p.id == product.id)) {
      this.productIcons.set(product.id, "star")
    } else {
      this.productIcons.set(product.id, "star_border")
    }
  }


  wishlist(product: Product) {
    this.loginService.loggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        if (this.wishListProducts.some(p => p.id == product.id)) {
          this.wishListService.removeProduct(product.id).pipe(
            tap(response => {
              const index = this.wishListProducts.findIndex(p=>p.id==product.id)
              this.wishListProducts.splice(index,1)
            }),
            catchError(error => {
              throw error;
            }),
            finalize(() => {
            })
          ).subscribe();
          this.productIcons.set(product.id, "star_border")
        } else {
          this.wishListService.addProduct(product).pipe(
            tap(response => {
            }),
            catchError(error => {
              throw error;
            }),
            finalize(() => {
            })
          ).subscribe()
          this.productIcons.set(product.id, "star")
          this.wishListProducts.push(product)
        }
      } else {
        this.router.navigate(['/login'])
      }
    })

  }
}
