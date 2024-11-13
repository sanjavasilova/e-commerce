import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subcategory} from "../subcategory";
import {ShopProduct} from "../shop-product";
import {Product} from "../product";

@Injectable({
  providedIn: "root"
})
export class SubcategoryService{
  http = inject(HttpClient)

  getSubcategoriesByCategory(category: string){
    return this.http.get<Subcategory[]>("/api/subcategory/"+category)
  }

  getProductsBySubcategory(subcategory: string){
    return this.http.get<Product[]>("/api/products/" + subcategory + "/products")
  }
}
