import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ShopProduct} from "../shop-product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})

export class ShopProductService{
  http = inject(HttpClient)

  getShopProductByProductName(name: string): Observable<ShopProduct[]>{
    return this.http.get<ShopProduct[]>("/api/products/shops-products/"+name)
  }
}
