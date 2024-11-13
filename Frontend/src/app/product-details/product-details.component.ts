import {Component, inject, OnInit} from '@angular/core';
import {ShopProductService} from "../service/shop-product-service";
import {ShopProduct} from "../shop-product";
import {catchError, combineLatest, finalize, Observable, of, switchMap, tap} from "rxjs";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AsyncPipe, CurrencyPipe} from "@angular/common";
import {Product} from "../product";
import {ProductService} from "../service/product-service";
import {FormsModule} from "@angular/forms";
import {AddToCartService} from "../service/add-to-cart-service";
import {HeaderComponent} from "../header/header.component";
import {WishListService} from "../service/wish-list-service";
import {LoginService} from "../service/login-service";
import {AuthService} from "../service/auth-service";
import {AmountService} from "../service/amount-service";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    CurrencyPipe,
    HeaderComponent,
    RouterLink
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  shopProductService = inject(ShopProductService)
  productService = inject(ProductService)
  addToCartService = inject(AddToCartService)
  loginService = inject(LoginService)
  router = inject(Router)
  wishListText = ""
  wishListService = inject(WishListService)
  wishListProducts: Product[] = []
  authService = inject(AuthService)
  amountService = inject(AmountService)

  active_route = inject(ActivatedRoute)
  name: string | null = null

  quantity = 1;

  product$?: Observable<Product>

  shop_products$ ?: Observable<ShopProduct[]>

  ngOnInit() {
    this.active_route.paramMap.subscribe(params => {
      this.name = params.get('name');
      if (this.name) {
        this.product$ = this.productService.getProductByName(this.name);
        this.shop_products$ = this.shopProductService.getShopProductByProductName(this.name);

        combineLatest([
          this.product$,
          this.authService.username$
        ]).pipe(
          switchMap(([product, username]) => {
            if (username) {
              return this.wishListService.getWishListProducts().pipe(
                tap(wishListProducts => {
                  this.wishListProducts = wishListProducts;
                  this.wishListText = this.wishListProducts.some(p => p.id === product.id)
                    ? "Избриши од Омилени"
                    : "Додади во Омилени";
                })
              );
            } else {
              this.wishListProducts = [];
              this.wishListText = "Додади во Омилени";
              return of(product);
            }
          })
        ).subscribe();
      }
    });
  }


  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  addProduct(product: Product) {
    this.loginService.loggedIn$.subscribe(loggedIn => {
      if (!loggedIn) {
        this.router.navigate(['/login']);
        return
      }
      if (this.wishListProducts.some(p => p.id == product.id)) {
        this.wishListService.removeProduct(product.id).pipe(
          tap(response => {
            const index = this.wishListProducts.findIndex(p => p.id == product.id)
            this.wishListText = "Додади во Омилени"
            this.wishListProducts.splice(index, 1)
          }),
          catchError(error => {
            throw error;
          }),
          finalize(() => {
          })
        ).subscribe();
      } else {
        this.wishListService.addProduct(product).pipe(
          tap(response => {
            this.wishListText = "Избриши од омилени"
            this.wishListProducts.push(product)
          }),
          catchError(error => {
            throw error;
          }),
          finalize(() => {
          })
        ).subscribe()
      }
    })
  }
}
