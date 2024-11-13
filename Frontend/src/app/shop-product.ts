import {Shop} from "./shop";
import {Product} from "./product";

export interface ShopProduct{
  id: number;
  shop: Shop;
  product: Product;
  price: number;
}
