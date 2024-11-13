import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../category";
import {Shop} from "../shop";
import {Product} from "../product";

@Injectable({
  providedIn: 'root'
})

export class ShopService {
  http = inject(HttpClient);

  getAllShops(){
    return this.http.get<Shop[]>("/api/shops")
  }

  getProductsInAShop(shop: string){
    return this.http.get<Product[]>("/api/products-in-shop/" + shop + "/products")
  }
}
