import {Category} from "./category";
import {Subcategory} from "./subcategory";

export interface Product{
  id: number;
  name: string;
  description: string;
  category: Category;
  subcategory: Subcategory;
  image: string;
}
