import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "../category";
import {Subcategory} from "../subcategory";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  http = inject(HttpClient);

  getAllCategories(){
    return this.http.get<Category[]>("/api/category")
  }

  getAllSubCategoriesOfCategory(category: string){
    return this.http.get<Subcategory[]>("/api/subcategory/" + category)
  }
}
