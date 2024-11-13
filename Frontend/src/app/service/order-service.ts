import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Order} from "../order";
import {AuthService} from "./auth-service";
import {switchMap} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class OrderService{
  http = inject(HttpClient);
  authService = inject(AuthService)

  getProductsOfUser(){
    return this.authService.username$.pipe(
      switchMap(username => this.http.get<Order[]>("/api/orders/order-history?username=" + username))
    )
  }
}
