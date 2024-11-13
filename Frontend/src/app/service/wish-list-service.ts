import {inject, Injectable} from "@angular/core";
import {Product} from "../product";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth-service";
import {LoginService} from "./login-service";
import {switchMap} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class WishListService {
  http = inject(HttpClient)
  authService = inject(AuthService)
  addProduct(product: Product) {
    return this.authService.username$.pipe(
      switchMap(username => this.http.post<Product>(`/api/wish-list?username=${username}`,product))
    )
  }

  getWishListProducts(){
    return this.authService.username$.pipe(
      switchMap(username => this.http.get<Product[]>(`/api/wish-list/my-wishlist?username=${username}`))
    );
  }

  removeProduct(productId: number) {
    return this.authService.username$.pipe(
      switchMap(username=> this.http.delete<Product>(`/api/wish-list/delete-product/${productId}?username=${username}`))
    )
  }
}
