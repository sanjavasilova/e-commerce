import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Product} from "../product";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  http = inject(HttpClient);

  getAllProducts(){
    return this.http.get<Product[]>("/api/products")
  }

  getProductByName(name: string){
    return this.http.get<Product>("/api/products/product/"+name)
  }

  getAllProductsWithPrefix(query: string | null)
  {
    if (query && query.length>0) return this.http.get<Product[]>("/api/products/starting-with/"+query)
    else return of([])
  }
}
