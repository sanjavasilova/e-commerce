import {Product} from "./product";
import {User} from "./user";
import {OrderItem} from "./order-item";

export interface Order{
  id: number,
  user: User
  items: OrderItem[]
}
